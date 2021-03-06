import * as React from 'react';
import { StyleSheet, GestureResponderEvent } from 'react-native';

import { Button } from '../../components/button';
import { InlineElements } from '../../components/inline-elements';

import { Icons } from '../../constants/Icons';

interface Props {
  isPlaying: boolean;
  onPrevPress: (event: GestureResponderEvent) => void;
  onStopPress: (event: GestureResponderEvent) => void;
  onPlayPress: (event: GestureResponderEvent) => void;
  onNextPress: (event: GestureResponderEvent) => void;
}

export const PlayButtons: React.FC<Props> = (props) => (
  <InlineElements>
    <Button style={styles.btn} onPress={props.onPrevPress}>
      <Icons.Prev style={styles.icon} />
    </Button>

    <Button
      style={styles.btn}
      type="info"
      onPress={props.isPlaying ? props.onStopPress : props.onPlayPress}
    >
      {props.isPlaying
        ? <Icons.Pause style={styles.icon} />
        : <Icons.Play style={styles.icon} />
      }
    </Button>

    <Button style={styles.btn} onPress={props.onNextPress}>
      <Icons.Next style={styles.icon} />
    </Button>
  </InlineElements>
);

const styles = StyleSheet.create({
  icon: {
    width: 38,
    height: 38,
    color: '#000000',
  },
  btn: {
    flexGrow: 1,
  },
});
