import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { SwipeRow,  } from 'react-native-swipe-list-view';

import { View, Text } from '../../components/Themed';
import { Button } from '../../components/button';
import { Icon } from '../../components/icon';

interface Props {
  isFirst?: boolean;
  isPlaying?: boolean;
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
    disableLeftSwipe={!!props.disableSwipe}
    preview={!props.disableSwipe && !!props.isFirst}
    disableRightSwipe
  >
    <View style={styles.btnWrapper}>
      {props.onEdit && (
        <Button
          style={styles.hidenBtn}
          type="info"
          onPress={() => props.onEdit && props.onEdit(props)}
        >
          <Icon icon="Edit" />
        </Button>
      )}

      {props.onRemove && (
        <Button
          style={styles.hidenBtn}
          type="danger"
          onPress={() => props.onRemove && props.onRemove(props)}
        >
          <Icon icon="Close" />
        </Button>
      )}
    </View>

    <TouchableOpacity style={styles.contentWrapper}>
      <TouchableOpacity style={styles.textWrapper} onPress={() => props.onPress(props)}>
        <Text style={styles.text} numberOfLines={1}>{props.title}</Text>

        {props.isPlaying && <Icon style={styles.playIcon} icon="Play" />}
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
    height: '100%',
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    flexGrow: 1,
    maxWidth: '95%',
    fontSize: 20,
  },
  btn: {
    width: 16,
    height: 16,
    padding: 0,
    backgroundColor: 'transparent',
  },
  playIcon: {
    width: 16,
    height: 16,
  },
});
