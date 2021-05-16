import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../../../components/Themed';

import { OrderBreaker } from './OrderBreaker';

type Props = React.FC<{
  delayText: string;
  orderValues: JSX.Element[];
}>;

export const OrderValues: Props = (props) => {
  const orderValuesDefault = ['T', 'F'].map((item, i) => (
    <OrderBreaker
      style={{ opacity: 0.5 }}
      maxQuantity={2}
      text={item}
      delayText={props.delayText}
      index={i}
      key={`${i}-default-order-item`}
    />
  ));

  return (
    <View style={styles.orderValues}>
      {props.orderValues.length ? props.orderValues : orderValuesDefault}
    </View>
  );
};

const styles = StyleSheet.create({
  orderValues: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 32,
    padding: 8,
    borderWidth: 1,
    borderColor: '#222222',
    borderRadius: 3,
    backgroundColor: 'rgba(207, 185, 255, 0.3)',
  },
  orderValuesWrapperBorder: {
    height: 10,
    width: '100%',
    borderBottomWidth: 2,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#aaa',
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    backgroundColor: 'red',
  },
});
