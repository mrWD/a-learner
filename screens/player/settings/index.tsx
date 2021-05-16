import * as React from 'react';
import { StyleSheet, GestureResponderEvent } from 'react-native';

import { Text, View } from '../../../components/Themed';
import { Button } from '../../../components/button';

import { Icons } from '../../../constants/Icons';

import { OrderSwitcher } from './OrderSwitcher';
import { OrderBreaker } from './OrderBreaker';
import { OrderValues } from './OrderValues';

type OrderType = 'F' | 'T';

type Props = React.FC<{
  onClose: (event: GestureResponderEvent) => void,
}>;

const MAX_ORDER_LENGTH = 6;
const availableDelayList = [0, 0.5, 1, 1.5, 2, 2.5];

export const Settings: Props = (props) => {
  const [order, setOrder] = React.useState<OrderType[]>(['T', 'F']);
  const [delay, setDelay] = React.useState(3);

  const orderBtns = [['F', 'Foreign sentence'], ['T', 'Translation']];

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
    const newDelay = delay < availableDelayList.length - 1 ? delay + 1 : 0;

    setDelay(newDelay);
  };

  const orderValues = order.map((item, i) => (
    <OrderBreaker
      maxQuantity={order.length}
      text={item}
      index={i}
      key={`${i}-default`}
      onPress={handleRemoveOrder}
    />
  ));

  const orderBtnList = orderBtns.map(([value, label], index) => (
    <OrderSwitcher
      value={value}
      label={label}
      key={index}
      onPress={handleSetOrder}
    />
  ));

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Settings</Text>

        <Button style={styles.closeBtn} onPress={props.onClose}>
          <Icons.Close style={styles.closeIcon} />
        </Button>

        <OrderValues orderValues={orderValues} />

        <View style={styles.definitionWrapper}>
          {orderBtnList}

          <OrderSwitcher
            value={`${availableDelayList[delay]}x`}
            label='delay between the audios'
            onPress={handleChangeDelay}
          />
        </View>
      </View>
    </View>
  )
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
    paddingHorizontal: 16,
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
  closeIcon: {
    width: '100%',
    height: '100%',
    color: '#222222',
  },
});
