import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import { Text, View } from '../Themed';
import { Button } from '../button';

import { useColor } from '../../hooks/useColor';

import { Icons } from '../../constants/Icons';

interface CheckboxProps {
  isLast: boolean;
  isChecked: boolean;
  label: string;
  value: string;
  onPress: (arg: string) => void;
}

interface CheckListProps {
  required: boolean;
  label: string;
  value: string[];
  items: Array<{ id: string; name: string }>;
  style: object;
  onChange: (arg: string[]) => void;
}

export const Checkbox: React.FC<CheckboxProps> = (props) => (
  <Button
    style={{ ...styles.item, borderBottomWidth: Number(!props.isLast) }}
    onPress={() => props.onPress(props.value)}
  >
    <Text style={{ ...styles.text, paddingLeft: 0 }}>{props.label}</Text>

    {props.isChecked && <Icons.Check style={styles.itemIcon} />}
  </Button>
);

export const CheckList: React.FC<CheckListProps> = (props) => {
  const handleChange = (id: string) => {
    if (props.value.includes(id)) {
      props.onChange(props.value.filter((item: string) => item !== id));
    } else {
      props.onChange([...props.value, id]);
    }
  };

  const checkList = props.items.map((item, i) => (
    <Checkbox
      label={item.name}
      value={item.id}
      isChecked={props.value.includes(item.id)}
      isLast={i >= props.items.length - 1}
      onPress={handleChange}
      key={item.id}
    />
  ));

  return (
    <View style={props.style}>
      <Text style={{ ...styles.label, color: useColor(props) }}>
        {props.label}{props.required && ' *'}
      </Text>

      <ScrollView style={styles.list}>{checkList}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    width: '100%',
    marginBottom: 8,
    fontSize: 20,
    textAlign: 'left',
  },
  list: {
    flex: 1,
    width: '100%',
    maxHeight: 300,
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: '#222222',
    borderRadius: 3,
    backgroundColor: 'rgba(207, 185, 255, 0.3)',
  },
  text: {
    flexGrow: 1,
    marginRight: 'auto',
    fontSize: 20,
  },
  item: {
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#222222',
    backgroundColor: 'transparent',
  },
  itemIcon: {
    width: 16,
    height: 16,
    color: '#222222',
  },
});
