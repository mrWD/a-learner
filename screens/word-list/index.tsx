import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { Text, View } from '../../components/Themed';
import { Title } from '../../components/title';
import { ListItem } from '../../components/list-item';
import { PlayerNavigator } from '../../components/player-navigator';

import { FREE_LIST, FULL_LIST } from '../../constants/Store';
import { CONTROL_TOGGLER_SIZE, BOTTOM_FIX_INDENT, LIST_ITEM_INDENT } from '../../constants/Styles';

import { useStore } from '../../store';

import { filterWordList, getTitle } from '../../utils/wordList';
import { getLocalizedText } from '../../utils/localizedText';
import { setMobInterstitial } from '../../utils/ads';

import { RootStackParamList } from '../../types';

import { EditButtons } from './EditButtons';

type Props = React.FC<StackScreenProps<RootStackParamList, 'WordList'>>;

export const WordList: Props = ({ navigation, route: { params: { id } } }) => {
  const [title, setTitle] = React.useState(getTitle(id));

  const store = useStore();

  const filteredWordList = filterWordList(store.wordList, id);

  setMobInterstitial();

  const handleListRemovePress = () => {
    store.removeList(id);
    navigation.navigate('Root');
  };

  const wordList = filteredWordList.map((item, i) => (
    <ListItem
      style={{
        marginBottom: i < filteredWordList.length - 1
          ? LIST_ITEM_INDENT
          : LIST_ITEM_INDENT + BOTTOM_FIX_INDENT,
      }}
      id={item.id}
      title={`${i + 1}. ${item.name}`}
      isFirst={i === 0}
      isPlaying={item.id === store.currentWord?.id}
      onPress={() => navigation.navigate('Player', { id, songId: item.id })}
      onEdit={() => navigation.navigate('EditWord', { id: item.id })}
      onRemove={() => store.removeWord(item)}
      key={item.id}
    />
  ));

  React.useEffect(() => {
    const currentList = store.allLists.find((item) => item.id === id);
    setTitle(getTitle(id, currentList?.name));
  }, []);

  return (
    <View style={styles.container}>
      <Title title={title} />

      <ScrollView style={styles.wordsWrapper}>
        {wordList[0]
          ? wordList
          : <Text style={styles.text}>{getLocalizedText('List is empty Add a new word')}</Text>
        }
      </ScrollView>

      <PlayerNavigator />

      <EditButtons
        isFreeList={id === FREE_LIST || id === FULL_LIST}
        handleListRemovePress={handleListRemovePress}
        handleAddPress={() => navigation.navigate('EditWord', { listId: id })}
        handleListEditPress={() => navigation.navigate('EditList', { id })}
      />
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
});
