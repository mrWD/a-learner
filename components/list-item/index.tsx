import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { SwipeRow,  } from 'react-native-swipe-list-view';

import { View, Text } from '../../components/Themed';
import { Button } from '../../components/button';
import { Icon } from '../../components/icon';

interface Props {
  isFirst?: boolean;
  disableSwipe?: boolean;
  id: string;
  title: string;
  style?: object;
  onPress: (arg: React.PropsWithChildren<Props>) => void;
  onEdit?: (arg: React.PropsWithChildren<Props>) => void;
  onRemove?: (arg: React.PropsWithChildren<Props>) => void;
  onStop?: (arg: React.PropsWithChildren<Props>) => void;
  onPlay?: (arg: React.PropsWithChildren<Props>) => void;
}

export const ListItem: React.FC<Props> = (props) => (
  <SwipeRow
    style={{ ...styles.container, ...props.style }}
    rightOpenValue={-106}
    disableLeftSwipe={props.disableSwipe}
    preview={!props.disableSwipe && props.isFirst}
    disableRightSwipe
  >
    <View style={styles.btnWrapper}>
      {props.onEdit && (
        <Button
          style={styles.hidenBtn}
          type="info"
          onPress={() => props.onEdit && props.onEdit(props)}
        >
          <Icon style={styles.icon} icon="Edit" />
        </Button>
      )}

      {props.onRemove && (
        <Button
          style={styles.hidenBtn}
          type="danger"
          onPress={() => props.onRemove && props.onRemove(props)}
        >
          <Icon style={styles.icon} icon="Close" />
        </Button>
      )}
    </View>

    <TouchableOpacity style={styles.contentWrapper}>
      <TouchableOpacity style={styles.textWrapper} onPress={() => props.onPress(props)}>
        <Text style={styles.text} numberOfLines={1}>{props.title}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  </SwipeRow>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'stretch',
  },
  btnWrapper: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  hidenBtn: {
    width: 54,
    height: 48,
    marginLeft: -1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#222222',
  },
  contentWrapper: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#222222',
    backgroundColor: '#B9DDFF',
  },
  textWrapper: {
    flexGrow: 1,
  },
  text: {
    fontSize: 20,
  },
  btn: {
    width: 16,
    height: 16,
    padding: 0,
    backgroundColor: 'transparent',
  },
  icon: {
    width: 16,
    height: 16,
    color: '#222222',
  },
});
