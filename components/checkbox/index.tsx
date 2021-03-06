import * as React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  GestureResponderEvent,
} from 'react-native';

import { Icons } from '../../constants/Icons';

import { Text } from '../Themed';

interface Props {
  value: boolean;
  label: string;
  style?: object;
  boxStyles?: object;
  iconStyles?: object;
  labelStyles?: object;
  onChange: (arg: boolean) => void;
}

export const Checkbox: React.FC<Props> = (props) => {
  const [value, setValue] = React.useState(false);

  const containerStyles = { ...styles.container, ...props.style };
  const boxStyles = { ...styles.checkbox, ...props.boxStyles };
  const iconStyles = { ...styles.icon, ...props.iconStyles };
  const labelStyles = { ...styles.label, ...props.labelStyles };

  const handleChangeText = () => {
    setValue(!value);
    props.onChange(!value);
  };

  React.useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <TouchableOpacity
      style={containerStyles}
      activeOpacity={0.95}
      onPress={handleChangeText}
    >
      <View style={boxStyles}>
        {value && <Icons.Check style={iconStyles} />}
      </View>

      <Text style={labelStyles}>{props.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
  },
  label: {
    width: '100%',
    fontSize: 20,
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  checkbox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 42,
    height: 42,
    borderWidth: 1,
    marginRight: 16,
    borderColor: '#000000',
    borderRadius: 3,
    backgroundColor: 'rgba(207, 185, 255, 0.3)',
    color: '#000000',
  },
  icon: {
    width: 30,
    height: 30,
    color: '#000000',
  },
});
