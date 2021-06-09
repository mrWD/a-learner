import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../../../components/Themed';
import { Button } from '../../../components/button';
import { Icon } from '../../../components/icon';
import { InlineElements } from '../../../components/inline-elements';

import { getLocalisedText } from '../../../utils/localisedText';

import * as PlayerSettings from '../../../constants/PlayerSettings';

import { TimerController } from './TimerController';
import { OrderSwitcher } from './OrderSwitcher';
import { OrderBreaker } from './OrderBreaker';
import { OrderValues } from './OrderValues';

export type OrderType = 'F' | 'T';

export interface Form {
  order: OrderType[];
  delay: number;
  timer: number;
}

type Props = React.FC<{
  order: OrderType[];
  delay: number;
  timer: number;
  onClose: () => void;
  onSave: (arg: Form) => void;
}>;

const MAX_ORDER_LENGTH = 4;
const DELAY_CHANGE_STEP = 1;
const MIN_DELAY = 0;
const MAX_DELAY = 2;

const orderBtns = [
  { value: PlayerSettings.FOREIGN_TYPE, label: getLocalisedText('Foreign sentence') },
  { value: PlayerSettings.TRANSLATE_TYPE, label: getLocalisedText('Translation') },
] as const;

export const Settings: Props = (props) => {
  const [order, setOrder] = React.useState<OrderType[]>(PlayerSettings.ORDER);
  const [delay, setDelay] = React.useState(1);
  const [timer, setTimer] = React.useState(0);

  const delayText = `${delay}x`;

  const handleSetOrder = (newItem: string) => {
    if (order.length < MAX_ORDER_LENGTH) {
      setOrder([...order, newItem as OrderType]);
    }
  };

  const handleRemoveOrder = (removedElIndex: number) => {
    const newOrder = order.filter((_, i) => i !== removedElIndex);
    setOrder(newOrder);
  };

  const handleChangeDelay = () => {
    const newDelay = delay < MAX_DELAY
      ? delay + DELAY_CHANGE_STEP
      : MIN_DELAY;

    setDelay(newDelay);
  };

  const handleSave = () => {
    props.onSave({ timer, delay, order });
  };

  const orderValues = order.map((item, i) => (
    <OrderBreaker
      maxQuantity={order.length}
      text={item}
      index={i}
      delayText={delayText}
      key={i}
      onRemove={handleRemoveOrder}
    />
  ));

  const orderBtnList = orderBtns.map((order, index) => (
    <OrderSwitcher
      value={order.value}
      label={order.label}
      key={index}
      onPress={handleSetOrder}
    />
  ));

  React.useEffect(() => {
    setOrder(props.order);
    setDelay(props.delay);
    setTimer(props.timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>{getLocalisedText('Settings')}</Text>

        <Button style={styles.closeBtn} onPress={props.onClose}>
          <Icon icon="Close" />
        </Button>

        <OrderValues orderValues={orderValues} delayText={delayText} />

        <View style={styles.definitionWrapper}>
          {orderBtnList}

          <OrderSwitcher
            value={delayText}
            label={getLocalisedText('delay between the audios')}
            onPress={handleChangeDelay}
          />

          <TimerController timer={timer} changeTimer={setTimer} />
        </View>
      </View>

      <InlineElements>
        <Button style={styles.btn} type="danger" onPress={props.onClose}>
          <Icon icon="Close" />
        </Button>

        <Button style={styles.btn} type="success" onPress={handleSave}>
          <Icon icon="Check" />
        </Button>
      </InlineElements>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(220, 220, 220, 0.5)',
  },
  wrapper: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowOffset: { width: 0, height: -2 },
    shadowColor: '#cccccc',
    shadowOpacity: 1.0,
    backgroundColor: '#ffffff',
  },
  title: {
    marginBottom: 32,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  definitionWrapper: {
    alignSelf: 'center',
    maxWidth: 500,
  },
  closeBtn: {
    position: 'absolute',
    top: 15,
    right: 20,
    width: 24,
    height: 24,
    padding: 4,
    borderRadius: 3,
    backgroundColor: 'transparent',
  },
  btn: {
    width: '50%',
    padding: 8,
  },
});
