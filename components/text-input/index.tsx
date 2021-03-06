import * as React from 'react';
import { StyleSheet, TextInput as NativeTextInput } from 'react-native';

import { useColor } from '../../hooks/useColor';

import { Text, View } from '../Themed';

interface Props {
  required?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  label: string;
  value: string;
  style?: object;
  onInput: (arg: string) => void;
}

export const TextInput: React.FC<Props> = (props) => {
  const [value, setValue] = React.useState('');

  const containerStyles = { ...styles.container, ...props.style };

  const handleChangeText = (newValue: string) => {
    setValue(newValue);
    props.onInput(newValue);
  };

  React.useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <View style={containerStyles}>
      <Text style={{ ...styles.label, color: useColor(props) }}>
        {props.label}{props.required && ' *'}
      </Text>

      <NativeTextInput
        style={{
          ...styles.input,
          borderColor: useColor(props),
          textAlignVertical: props.multiline ? 'top' : 'center',
        }}
        value={value}
        numberOfLines={props.numberOfLines}
        multiline={props.multiline}
        maxLength={props.maxLength}
        onChangeText={handleChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    width: '100%',
    marginBottom: 8,
    fontSize: 20,
    textAlign: 'left',
  },
  input: {
    width: '100%',
    padding: 8,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 3,
    fontSize: 20,
    color: '#000000',
    backgroundColor: 'rgba(207, 185, 255, 0.3)',
  },
});
