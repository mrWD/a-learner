import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import { Text, View } from '../../components/Themed';
import { Button } from '../../components/button';

import { Icons } from '../../constants/Icons';
import { useColor } from '../../hooks/useColor';

interface ItemProps {
  isLast: boolean;
  isChecked: boolean;
  label: string;
  value: string;
  onPress: (arg: string) => void;
}

interface DropdownProps {
  required: boolean;
  label: string;
  value: string[];
  items: Array<{ id: string; name: string }>;
  style: object;
  onChange: (arg: string[]) => void;
}

export const Item: React.FC<ItemProps> = (props) => (
  <Button
    style={{ ...styles.item, borderBottomWidth: Number(!props.isLast) }}
    onPress={() => props.onPress(props.value)}
  >
    <Text style={{ ...styles.text, paddingLeft: 0 }}>{props.label}</Text>

    {props.isChecked && <Icons.Check style={styles.itemIcon} />}
  </Button>
);

export const Dropdown: React.FC<DropdownProps> = (props) => {
  const [isOpened, setIsOpened] = React.useState(false);

  const handleChange = (id: string) => {
    if (props.value.includes(id)) {
      props.onChange(props.value.filter((item: string) => item !== id));
    } else {
      props.onChange([...props.value, id]);
    }
  };

  const label = props.value.reduce<string>((res, id) => {
    const currentList = props.items.find((item) => item.id === id);

    if (!currentList) {
      return res;
    }

    if (!res) {
      return currentList.name;
    }

    return `${res} | ${currentList.name}`;
  }, '');

  const list = props.items.map((item, i) => (
    <Item
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

      <Button
        style={{ ...styles.input, borderColor: useColor(props) }}
        onPress={() => setIsOpened(!isOpened)}
      >
        <Text style={{ ...styles.text, color: useColor(props) }} numberOfLines={1}>
          {label || 'Choose a list'}
        </Text>

        <Icons.ChevronDown
          style={{
            ...styles.itemIcon,
            transform: [{
              rotate: `${isOpened ? -180 : 0}deg`,
            }],
          }}
        />
      </Button>

      {isOpened && (
        <ScrollView style={styles.list}>
          {list}
        </ScrollView>
      )}
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
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: '#222222',
    borderRadius: 3,
    backgroundColor: 'rgba(207, 185, 255, 0.3)',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
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
