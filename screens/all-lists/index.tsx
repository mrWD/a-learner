import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { View } from '../../components/Themed';
import { Button } from '../../components/button';
import { InlineElements } from '../../components/inline-elements';
import { Title } from '../../components/title';
import { ListItem } from '../../components/list-item';

import { Icons } from '../../constants/Icons';
import { FREE_LIST, FULL_LIST } from '../../constants/Store';

import { useStore } from '../../store';

import { RootStackParamList } from '../../types';

type Props = React.FC<StackScreenProps<RootStackParamList, 'Root'>>;

export const AllLists: Props = ({ navigation }) => {
  const store = useStore();

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
          title="Not connected items"
          onPress={handleListPress}
          disableSwipe
          key={FREE_LIST}
        />

        <ListItem
          id={FULL_LIST}
          title="All items"
          onPress={handleListPress}
          disableSwipe
          key={FULL_LIST}
        />
      </ScrollView>

      <InlineElements>
        <Button style={styles.btn} type="success" onPress={handleAddWord}>
          <Icons.Plus style={styles.icon} />
        </Button>

        <Button style={styles.btn} type="info" onPress={handleAddList}>
          <Icons.AddList style={styles.icon} />
        </Button>
      </InlineElements>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wordsWrapper: {
    overflow: 'scroll',
    flex: 1,
    width: '100%',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
  listItem: {
    marginBottom: 16,
  },
  icon: {
    width: 38,
    height: 38,
    color: '#000000',
  },
  bottomIndent: {
    marginBottom: 16,
  },
  bottomLastIndent: {
    marginBottom: 40,
  },
  btn: {
    width: `${100 / 2}%`,
  },
});