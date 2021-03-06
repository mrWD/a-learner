import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Audio } from 'expo-av';

import { Text, View } from '../../components/Themed';

import { Icons } from '../../constants/Icons';

import { Word } from '../../store/words';

import { SIDE_FIX_INDENT, BOTTOM_FIX_INDENT, CONTROL_TOGGLER_SIZE } from './constants';

interface Props {
  word?: Word | null;
  sound: Audio.Sound | null;
  index: number | null;
}

export const PlayingSound: React.FC<Props> = ({ word, sound, index }) => {
  if (!word) {
    return null;
  }

  const description = !word.description ? null : (
    <Text style={styles.playingSoundText} numberOfLines={1}>
      {word.description}
    </Text>
  );

  return (
    <View style={styles.playingSound}>
      {sound
        ? <Icons.Play style={styles.playingSoundIcon} />
        : <Icons.Pause style={styles.playingSoundIcon} />
      }

      <View style={styles.playingSoundTextWrapper}>
        <Text style={styles.playingSoundTitle} numberOfLines={1}>
          {index}. {word.name}
        </Text>

        {description}
      </View>
    </View>
  );
};

const allIndents = SIDE_FIX_INDENT * 2 + CONTROL_TOGGLER_SIZE + 10;
const styles = StyleSheet.create({
  playingSound: {
    position: 'absolute',
    left: SIDE_FIX_INDENT,
    bottom: BOTTOM_FIX_INDENT + 5,
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: Dimensions.get('window').width - allIndents,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: 'rgba(2, 2, 2, 0.8)',
  },
  playingSoundIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
    color: '#ffffff',
  },
  playingSoundTextWrapper: {
    maxWidth: '90%',
    backgroundColor: 'transparent',
  },
  playingSoundTitle: {
    fontSize: 16,
    color: '#ffffff',
  },
  playingSoundText: {
    paddingLeft: 8,
    fontSize: 8,
    color: '#ffffff',
  },
});
