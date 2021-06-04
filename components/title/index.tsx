import * as React from 'react';
import { StyleSheet, Text } from 'react-native';

interface Props {
  title: string;
  style?: object;
}

export const Title: React.FC<Props> = (props) => (
  <Text style={{ ...styles.title, ...props.style }}>{props.title}</Text>
);

const styles = StyleSheet.create({
  title: {
    width: '100%',
    paddingTop: 40,
    paddingBottom: 16,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222222',
    textAlign: 'center',
  },
});
