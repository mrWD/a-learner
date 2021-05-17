import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Button } from '../../components/button';
import { Icon } from '../../components/icon';

import { SIDE_FIX_INDENT, CONTROL_TOGGLER_SIZE, BOTTOM_FIX_INDENT } from './constants';

interface Props {
  isVisible: boolean;
  onPress: () => void;
}

export const PlayerNaviator: React.FC<Props> = (props) => {
  if (!props.isVisible) {
    return null;
  }

  return (
    <Button
      style={styles.fixedBtn}
      type="info"
      onPress={() => props.onPress()}
    >
      <Icon style={styles.icon} icon="Play" />
    </Button>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 38,
    height: 38,
    color: '#222222',
  },
  fixedBtn: {
    position: 'absolute',
    right: SIDE_FIX_INDENT,
    bottom: BOTTOM_FIX_INDENT,
    width: CONTROL_TOGGLER_SIZE,
    borderRadius: CONTROL_TOGGLER_SIZE / 2,
  },
});
