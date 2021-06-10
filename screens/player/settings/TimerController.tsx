import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../../../components/Themed';
import { Button } from '../../../components/button';
import { Icon } from '../../../components/icon';

import { getLocalizedText } from '../../../utils/localizedText';

export type OrderType = 'F' | 'T';

type Props = React.FC<{
  timer: number;
  changeTimer: (arg: number) => void;
}>;

const TIMER_STEP = 5;

export const TimerController: Props = (props) => {
  const handleChangeTimer = (isUp = false) => {
    const newTimer = isUp ? props.timer + TIMER_STEP : props.timer - TIMER_STEP;
    props.changeTimer(Math.max(0, newTimer));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{getLocalizedText('Timer to stop player')}</Text>

      <View style={styles.wrapper}>
        <Button style={styles.btn} onPress={() => handleChangeTimer(false)}>
          <Icon icon="Minus" />
        </Button>

        <Text style={styles.text}>{props.timer} min</Text>

        <Button style={styles.btn} onPress={() => handleChangeTimer(true)}>
          <Icon icon="Plus" />
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
  },
  title: {
    marginBottom: 8,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: 40,
    height: 40,
    padding: 4,
    borderRadius: 3,
  },
  text: {
    paddingHorizontal: 16,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
