import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../../../components/Themed';
import { Button } from '../../../components/button';

type Props = React.FC<{
  value: string;
  label: string;
  onPress: (event: string) => void;
}>;

export const OrderSwitcher: Props = (props) => {
  return (
    <View style={styles.definition}>
      <Button style={styles.definitionBtn} onPress={() => props.onPress(props.value)}>
        <Text>{props.value}</Text>
      </Button>

      <Text style={styles.text}>: {props.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  definition: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  definitionBtn: {
    width: 40,
    height: 40,
    marginRight: 8,
    padding: 4,
    borderRadius: 3,
  },
  text: {
    fontSize: 16,
  },
});
