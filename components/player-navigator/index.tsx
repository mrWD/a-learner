import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Button } from '../button';
import { Icon } from '../icon';

import { useStore } from '../../store';

import { SIDE_FIX_INDENT, CONTROL_TOGGLER_SIZE, BOTTOM_FIX_INDENT } from '../../constants/Styles';

export const PlayerNavigator = () => {
  const store = useStore();
  const navigation = useNavigation();

  if (!store.currentListId) {
    return null;
  }

  return (
    <Button
      style={styles.fixedBtn}
      type="info"
      onPress={() => navigation.navigate('Player', { id: store.currentListId })}
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
