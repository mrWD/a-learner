import * as React from 'react';
import { StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native';

type BtnTypes = 'danger' | 'success' | 'info' | '';

interface Props {
  type?: BtnTypes;
  style?: object;
  onPress: (event: GestureResponderEvent) => void;
}

export const Button: React.FC<Props> = (props) => {
  const containerStyles = { ...styles.btn, ...styles[props.type || 'default'], ...props.style };

  return (
    <TouchableOpacity style={containerStyles} onPress={props.onPress}>
      {props.children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row', 
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222222',
    textTransform: 'uppercase',
  },
  default: {
    backgroundColor: '#B9DDFF',
  },
  danger: {
    backgroundColor: '#FFB9B9',
  },
  success: {
    backgroundColor: '#B9FFBC',
  },
  info: {
    backgroundColor: '#CFB9FF',
  },
});
