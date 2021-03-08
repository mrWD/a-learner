import * as React from 'react';
import { StyleSheet, GestureResponderEvent } from 'react-native';

import { Button } from '../../components/button';
import { InlineElements } from '../../components/inline-elements';

import { Icons } from '../../constants/Icons';

interface Props {
  isFreeList: boolean;
  handleListRemovePress: (event: GestureResponderEvent) => void;
  handleAddPress: (event: GestureResponderEvent) => void;
  handleListEditPress: (event: GestureResponderEvent) => void;
}

export const EditButtons: React.FC<Props> = (props) => (
  <InlineElements>
    {!props.isFreeList && (
      <Button style={styles.btn} type="danger" onPress={props.handleListRemovePress}>
        <Icons.Close style={styles.icon} />
      </Button>
    )}

    <Button style={styles.btn} type="success" onPress={props.handleAddPress}>
      <Icons.Plus style={styles.icon} />
    </Button>

    {!props.isFreeList && (
      <Button style={styles.btn} type="info" onPress={props.handleListEditPress}>
        <Icons.Edit style={styles.icon} />
      </Button>
    )}
  </InlineElements>
);

const styles = StyleSheet.create({
  icon: {
    width: 38,
    height: 38,
    color: '#222222',
  },
  btn: {
    flexGrow: 1,
  },
});
