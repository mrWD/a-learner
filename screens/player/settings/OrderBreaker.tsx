import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, } from '../../../components/Themed';
import { Button } from '../../../components/button';

type Props = React.FC<{
  index: number;
  maxQuantity: number;
  text: string;
  style?: object;
  onRemove?: (event: number) => void;
}>;

const getBtnStyles = (index: number, length: number, defaultStyles?: object) => {
  const marginRight = index < length - 1 ? 8 : 0;
  return { ...styles.btn, ...defaultStyles, marginRight };
};

export const OrderBreaker: Props = (props) => {
  const styles = getBtnStyles(props.index, props.maxQuantity, props.style);

  const handlePress = () => {
    if (props.onRemove) {
      props.onRemove(props.index);
    }
  };

  return (
    <Button style={styles} onPress={handlePress}>
      <Text>{props.text}</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: 44,
    height: 44,
    padding: 4,
    borderRadius: 3,
  },
  text: {
    fontSize: 16,
  },
});
