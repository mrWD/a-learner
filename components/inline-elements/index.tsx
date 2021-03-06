import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../Themed';

interface Props {
  style?: object;
}

export const InlineElements: React.FC<Props> = (props) => (
  <View style={{ ...styles.container, ...props.style }}>{props.children}</View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
  },
});
