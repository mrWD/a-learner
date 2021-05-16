import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../../../components/Themed';
import { Button } from '../../../components/button';

type Props = React.FC<{
  index: number;
  maxQuantity: number;
  text: string;
  delayText: string;
  style?: object;
  onRemove?: (event: number) => void;
}>;

export const OrderBreaker: Props = (props) => {
  const isDealyVisible = props.maxQuantity === 1 || props.index !== props.maxQuantity - 1;

  const handlePress = () => {
    if (props.onRemove) {
      props.onRemove(props.index);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Button style={{ ...styles.btn, ...props.style }} onPress={handlePress}>
        <Text>{props.text}</Text>
      </Button>

      {isDealyVisible && (
        <Text style={styles.text}>{props.delayText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  btn: {
    width: 40,
    height: 40,
    padding: 4,
    borderRadius: 3,
  },
  text: {
    paddingHorizontal: 4,
    fontSize: 10,
  },
});
