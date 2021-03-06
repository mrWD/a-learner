import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { SwipeRow,  } from 'react-native-swipe-list-view';

import { View, Text } from '../../components/Themed';
import { Button } from '../../components/button';

import { Icons } from '../../constants/Icons';

interface Props {
  isFirst?: boolean;
  disableSwipe?: boolean;
  isPlaying?: boolean;
  id: string;
  title: string;
  style?: object;
  onPress: (arg: React.PropsWithChildren<Props>) => void;
  onEdit?: (arg: React.PropsWithChildren<Props>) => void;
  onRemove?: (arg: React.PropsWithChildren<Props>) => void;
  onStop?: (arg: React.PropsWithChildren<Props>) => void;
  onPlay?: (arg: React.PropsWithChildren<Props>) => void;
}

export const ListItem: React.FC<Props> = (props) => {
  const style = { ...styles.container, ...props.style };

  const handlePlayPress = () => {
    if (props.isPlaying) {
      props.onStop && props.onStop(props);
      return;
    }

    props.onPress(props);
  };

  return (
    <SwipeRow
      style={style}
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
            <Icons.Edit style={styles.icon} />
          </Button>
        )}

        {props.onRemove && (
          <Button
            style={styles.hidenBtn}
            type="danger"
            onPress={() => props.onRemove && props.onRemove(props)}
          >
            <Icons.Close style={styles.icon} />
          </Button>
        )}
      </View>

      <TouchableOpacity style={styles.contentWrapper}>
        <TouchableOpacity style={styles.textWrapper} onPress={() => props.onPress(props)}>
          <Text style={styles.text} numberOfLines={1}>{props.title}</Text>
        </TouchableOpacity>

        {props.onPlay && (
          <Button style={styles.btn} onPress={handlePlayPress}>
            {props.isPlaying
              ? <Icons.Pause style={styles.icon} />
              : <Icons.Play style={styles.icon} />
            }
          </Button>
        )}
      </TouchableOpacity>
    </SwipeRow>
  );
};

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
    borderColor: '#000000',
  },
  contentWrapper: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#000000',
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
    color: '#000000',
  },
});
