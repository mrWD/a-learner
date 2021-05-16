import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import moment from 'moment';

import { View, Text } from '../../components/Themed';
import { Button } from '../../components/button';

import { useStore } from '../../store';

import { useColor } from '../../hooks/useColor';

import { Icons } from '../../constants/Icons';

interface Props {
  required: boolean;
  value: string;
  label: string;
  style?: object;
  onRecord: (arg: string | null) => void;
}

const formatTime = (val: number) => moment.utc(val)
  .format('HH:mm:ss.SSS')
  .replace(/00:/g, '');

export const RecordInput: React.FC<Props> = (props) => {
  const [record, setRecord] = React.useState<Audio.Recording | null>(null);
  const [sound, setSound] = React.useState<Audio.Sound | null>(null);
  const [currentUri, setCurrentUri] = React.useState<string | null>(props.value);
  const [duration, setDuration] = React.useState(formatTime(0));

  const store = useStore();

  const handleStartRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });

      const recording = new Audio.Recording();

      await recording.prepareToRecordAsync({
        android: {
          ...Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY.android,
          extension: '.mp3',
        },
        ios: {
          ...Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY.ios,
          extension: '.mp3',
        },
      });
      await recording.startAsync();

      setRecord(recording);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const handleStopRecording = async () => {
    setRecord(null);

    if (!record) {
      return;
    }

    const { durationMillis } = await record.stopAndUnloadAsync();
    const uri = record.getURI();
    const duration = formatTime(durationMillis);

    setDuration(duration);
    setCurrentUri(uri);

    props.onRecord(uri);
  };

  const handleStartPlaying = async () => {
    if (sound) {
      return;
    }

    const player = await store.getSound(currentUri);

    if (player) {
      setSound(player.sound);
  
      await store.playSound(player);
  
      setSound(null);
    }
  };

  const handleStopPlaying = () => {
    store.stopPlayingSound(sound);

    setSound(null);
  };

  React.useEffect(() => {
    setCurrentUri(props.value);
  }, [props.value]);

  React.useEffect(() => {
    (async () => {
      if (!props.value) {
        setDuration(formatTime(0));
        return;
      }

      const { status } = await Audio.Sound.createAsync({ uri: props.value });

      setDuration(formatTime(status.durationMillis));
    })();
  }, [props.value]);

  return (
    <View style={{ ...styles.container, ...props.style }}>
      <Text style={styles.label}>
        {props.label}{props.required && ' *'}
      </Text>

      <View style={{ ...styles.input, borderColor: useColor(props) }}>
        <Text style={{ ...styles.text, color: useColor(props) }}>{duration}</Text>

        <Button
          style={styles.btn}
          onPress={record ? handleStopRecording : handleStartRecording}
        >
          {record
            ? <Icons.StopRec style={styles.icon} />
            : <Icons.Mic style={styles.icon} />
          }
        </Button>

        <Button
          style={styles.btn}
          onPress={sound ? handleStopPlaying : handleStartPlaying}
        >
          {sound
            ? <Icons.Pause style={styles.icon} />
            : <Icons.Play style={styles.icon} />
          }
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    width: '100%',
    marginBottom: 8,
    fontSize: 20,
    textAlign: 'left',
    color: '#222222',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#222222',
    borderRadius: 3,
    backgroundColor: 'rgba(207, 185, 255, 0.3)',
  },
  text: {
    flexGrow: 1,
    paddingHorizontal: 8,
    paddingLeft: 24,
    fontSize: 20,
  },
  btn: {
    width: 56,
    paddingHorizontal: 8,
    backgroundColor: 'transparent',
  },
  icon: {
    width: 24,
    height: 24,
    color: '#222222',
  },
});
