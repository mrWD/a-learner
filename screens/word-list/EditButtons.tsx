import * as React from 'react';
import { StyleSheet, GestureResponderEvent } from 'react-native';

import { Button } from '../../components/button';
import { InlineElements } from '../../components/inline-elements';
import { Icon } from '../../components/icon';

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
        <Icon style={styles.icon} icon="Close" />
      </Button>
    )}

    <Button style={styles.btn} type="success" onPress={props.handleAddPress}>
      <Icon style={styles.icon} icon="Plus" />
    </Button>

    {!props.isFreeList && (
      <Button style={styles.btn} type="info" onPress={props.handleListEditPress}>
        <Icon style={styles.icon} icon="Edit" />
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
