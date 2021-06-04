import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ConfiguredAdMobBanner } from '../../utils/ads';

interface Props {
  title: string;
  style?: object;
}

export const Title: React.FC<Props> = (props) => (
  <View style={{ ...styles.title, ...props.style }}>
    <Text style={styles.titleText}>{props.title}</Text>

    <ConfiguredAdMobBanner />
  </View>
);

const styles = StyleSheet.create({
  title: {
    width: '100%',
    paddingTop: 40,
    paddingBottom: 24,
  },
  titleText: {
    paddingBottom: 4,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222222',
    textAlign: 'center',
  },
});
