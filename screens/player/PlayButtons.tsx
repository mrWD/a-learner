import * as React from 'react';
import { StyleSheet, GestureResponderEvent } from 'react-native';

import { Button } from '../../components/button';
import { InlineElements } from '../../components/inline-elements';
import { Icon } from '../../components/icon';


interface Props {
  isPlaying: boolean;
  onStopPress: (event: GestureResponderEvent) => void;
  onPlayPress: (event: GestureResponderEvent) => void;
  onPrevPress: (event: GestureResponderEvent) => void;
  onNextPress: (event: GestureResponderEvent) => void;
  onForwardPrevPress: (event: GestureResponderEvent) => void;
  onForwardNextPress: (event: GestureResponderEvent) => void;
}

export const PlayButtons: React.FC<Props> = (props) => (
  <InlineElements>
    <Button style={styles.btn} onPress={props.onForwardPrevPress}>
      <Icon style={styles.icon} icon="RepeatAndPlay" />
    </Button>

    <Button style={styles.btn} type="success" onPress={props.onPrevPress}>
      <Icon style={styles.icon} icon="Prev" />
    </Button>

    <Button
      style={styles.btn}
      type="info"
      onPress={props.isPlaying ? props.onStopPress : props.onPlayPress}
    >
      <Icon style={styles.icon} icon={props.isPlaying ? 'Pause' : 'Play'} />
    </Button>

    <Button style={styles.btn} type="success" onPress={props.onNextPress}>
      <Icon style={styles.icon} icon="Next" />
    </Button>

    <Button style={styles.btn} onPress={props.onForwardNextPress}>
      <Icon style={styles.icon} icon="Settings" />
    </Button>
  </InlineElements>
);

const styles = StyleSheet.create({
  icon: {
    width: 38,
    height: 38,
    color: '#222222',
  },
  btn: {
    flexGrow: 1,
    width: `${100 / 5}%`,
  },
});
