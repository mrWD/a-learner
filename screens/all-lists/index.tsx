import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { View } from '../../components/Themed';
import { Button } from '../../components/button';
import { InlineElements } from '../../components/inline-elements';
import { Title } from '../../components/title';
import { ListItem } from '../../components/list-item';
import { Icon } from '../../components/icon';
import { PlayerNavigator } from '../../components/player-navigator';

import { FREE_LIST, FULL_LIST } from '../../constants/Store';
import { CONTROL_TOGGLER_SIZE, BOTTOM_FIX_INDENT, LIST_ITEM_INDENT } from '../../constants/Styles';

import { useStore } from '../../store';

import { RootStackParamList } from '../../types';
import { setMobInterstitial, ConfiguredAdMobBanner } from '../../utils/ads';

type Props = React.FC<StackScreenProps<RootStackParamList, 'Root'>>;

export const AllLists: Props = ({ navigation }) => {
  const store = useStore();

  setMobInterstitial();

  const handleListPress = ({ id }: { id: string }) => {
    navigation.navigate('WordList', { id });
  };

  const handleEditItem = ({ id }: { id: string }) => {
    navigation.navigate('EditList', { id });
  };

  const handleRemoveItem = ({ id }: { id: string }) => {
    store.removeList(id);
  };

  const handleAddList = () => {
    navigation.navigate('EditList');
  };

  const handleAddWord = () => {
    navigation.navigate('EditWord');
  };

  const allLists = store.allLists.map((item, i) => (
    <ListItem
      style={styles.listItem}
      isFirst={i === 0}
      id={item.id}
      isPlaying={item.id === store.currentListId}
      title={item.name}
      onEdit={handleEditItem}
      onRemove={handleRemoveItem}
      onPress={handleListPress}
      key={item.id}
    />
  ));

  return (
    <View style={styles.container}>
      <Title title="All Lists" />

      <ScrollView style={styles.wordsWrapper}>
        {allLists}

        <ListItem
          style={styles.listItem}
          id={FREE_LIST}
          isPlaying={FREE_LIST === store.currentListId}
          title="Not connected items"
          onPress={handleListPress}
          disableSwipe
          key={FREE_LIST}
        />

        <ListItem
          style={styles.lastListItem}
          id={FULL_LIST}
          isPlaying={FULL_LIST === store.currentListId}
          title="All items"
          onPress={handleListPress}
          disableSwipe
          key={FULL_LIST}
        />
      </ScrollView>

      <PlayerNavigator />

      <InlineElements>
        <Button style={styles.btn} type="success" onPress={handleAddWord}>
          <Icon style={styles.icon} icon="Plus" />
        </Button>

        <Button style={styles.btn} type="info" onPress={handleAddList}>
          <Icon style={styles.icon} icon="AddList" />
        </Button>
      </InlineElements>

      <ConfiguredAdMobBanner />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wordsWrapper: {
    flex: 1,
    width: '100%',
    paddingBottom: BOTTOM_FIX_INDENT + CONTROL_TOGGLER_SIZE + 10,
    paddingHorizontal: 16,
    overflow: 'scroll',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
  listItem: {
    marginBottom: LIST_ITEM_INDENT,
  },
  lastListItem: {
    marginBottom: LIST_ITEM_INDENT + BOTTOM_FIX_INDENT,
  },
  icon: {
    width: 38,
    height: 38,
    color: '#222222',
  },
  btn: {
    width: `${100 / 2}%`,
  },
});
