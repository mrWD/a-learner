import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../../../components/Themed';

import { OrderBreaker } from './OrderBreaker';

type Props = React.FC<{
  orderValues: JSX.Element[],
}>;

export const OrderValues: Props = (props) => {
  const orderValuesDefault = ['T', 'F'].map((item, i) => (
    <OrderBreaker
      style={{ opacity: 0.5 }}
      maxQuantity={2}
      text={item}
      index={i}
      key={i}
    />
  ));

  return (
    <View style={styles.orderValues}>
      <View style={styles.orderValuesWrapper}>
        {props.orderValues.length ? props.orderValues : orderValuesDefault}
      </View>

      <View style={styles.orderValuesWrapperBorder} pointerEvents="none" />
    </View>
  );
};

const styles = StyleSheet.create({
  orderValues: {
    alignSelf: 'center',
    marginBottom: 16,
  },
  orderValuesWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  orderValuesWrapperBorder: {
    height: 10,
    borderBottomWidth: 2,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#aaa',
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    backgroundColor: 'transparent',
  },
});
