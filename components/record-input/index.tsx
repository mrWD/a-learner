import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

import { View, Text } from '../../components/Themed';
import { Button } from '../../components/button';
import { Icon } from '../../components/icon';

import { useStore } from '../../store';

import { useColor } from '../../hooks/useColor';

import { formatTime } from '../../utils/formatTime';
import { getLocalizedText } from '../../utils/localizedText';

interface Props {
  required: boolean;
  value: string;
  label: string;
  style?: object;
  onRecord: (arg: string | null) => void;
  onGetDuration: (durationMillis: number) => void;
}

const RECORDING_STATUS = 'in-progress';

export const RecordInput: React.FC<Props> = (props) => {
  const [record, setRecord] = React.useState<Audio.Recording | null>(null);
  const [sound, setSound] = React.useState<Audio.Sound | null>(null);
  const [currentUri, setCurrentUri] = React.useState<string | null>(props.value);
  const [duration, setDuration] = React.useState(formatTime(0));

  const store = useStore();

  const handleStartRecording = async () => {
    setDuration(RECORDING_STATUS);

    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });

      const recording = new Audio.Recording();

      await recording.prepareToRecordAsync({
        ...Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
        android: {
          ...Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY.android,
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
    props.onGetDuration(durationMillis);
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

      setDuration(formatTime((status as any).durationMillis));
      props.onGetDuration((status as any).durationMillis);
    })();
  }, [props.value]);

  return (
    <View style={props.style}>
      <Text style={styles.label}>
        {props.label}{props.required && ' *'}
      </Text>

      <View style={{ ...styles.input, borderColor: useColor(props) }}>
        {duration !== RECORDING_STATUS
          ? <Text style={{ ...styles.text, color: useColor(props) }}>{duration}</Text>
          : <Text style={{ ...styles.recordText, color: useColor(props) }}>
              {getLocalizedText('Recording is in progress')}
            </Text>
        }

        <Button
          style={styles.btn}
          onPress={record ? handleStopRecording : handleStartRecording}
        >
          <Icon style={styles.icon} icon={record ? 'StopRec' : 'Mic'} />
        </Button>

        <Button
          style={styles.btn}
          onPress={sound ? handleStopPlaying : handleStartPlaying}
        >
          <Icon style={styles.icon} icon={sound ? 'Pause' : 'Play'} />
        </Button>
      </View>

      {duration === RECORDING_STATUS && (
        <Text style={styles.tip}>{getLocalizedText('Click on the Circle icon to finish')}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: '#222222',
    borderRadius: 3,
    backgroundColor: 'rgba(207, 185, 255, 0.3)',
  },
  recordText: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
    paddingLeft: 16,
    paddingRight: 8,
    fontSize: 13,
  },
  text: {
    flexGrow: 1,
    paddingLeft: 24,
    paddingRight: 8,
    overflow: 'hidden',
    fontSize: 20,
  },
  tip: {
    textAlign: 'center',
    fontSize: 13,
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
