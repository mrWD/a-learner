import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';

import { Text, View } from '../../components/Themed';
import { Title } from '../../components/title';
import { ListItem } from '../../components/list-item';

import { FREE_LIST, FULL_LIST } from '../../constants/Store';

import { useStore } from '../../store';
import { Word } from '../../store/words';

import { RootStackParamList } from '../../types';

import { PlayButtons } from './PlayButtons';
import { EditButtons } from './EditButtons';
import { PlayingSound } from './PlayingSound';

import { CONTROL_TOGGLER_SIZE, BOTTOM_FIX_INDENT, LIST_ITEM_INDENT } from './constants';

import { ControlToggler } from './ControlToggler';

type Props = React.FC<StackScreenProps<RootStackParamList, 'WordList'>>;

const getTitle = (id: string, defaultVal?: string) => {
  const mapIdToTitle: Record<string, string> = {
    [FREE_LIST]: 'Free Items',
    [FULL_LIST]: 'All Items',
  };

  return defaultVal || mapIdToTitle[id];
};

const filterWordList = (wordList: Word[], id: string) => {
  if (!id || id === FULL_LIST) {
    return wordList;
  }

  if (id === FREE_LIST) {
    return wordList.filter((item) => !item.contained[0]);
  }

  return wordList.filter((item) => item.contained.includes(id))
};

export const WordList: Props = ({ navigation, route: { params: { id } } }) => {
  const [title, setTitle] = React.useState(getTitle(id));
  const [isPlayButtonsVisible, setIsPlayButtonsVisible] = React.useState(false);

  const store = useStore();

  const isFreeList = id === FREE_LIST;
  const isFullList = id === FULL_LIST;
  const filteredWordList = filterWordList(store.wordList, id);

  const handlePlayPress = async (index = store.currentIndex || 0) => {
    store.createAndRunPlayList(filteredWordList, index);
  };

  const interruptPlayer = (index?: number) => {
    store.stopPlayingSound(store.currentSound);

    if (typeof index === 'number') {
      handlePlayPress(index);
    }
  };

  const handlePrevPress = () => {
    const playIndex = store.currentIndex || filteredWordList.length;
    interruptPlayer(playIndex - 1);
  };

  const handleNextPress = () => {
    const nextPlayIndex = Number(store.currentIndex) + 1;
    interruptPlayer(nextPlayIndex < filteredWordList.length ? nextPlayIndex : 0);
  };

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
      isPlaying={!!store.currentSound && store.currentIndex === i}
      onStop={() => interruptPlayer()}
      onPlay={() => handlePlayPress(i)}
      onPress={() => handlePlayPress(i)}
      onEdit={() => navigation.navigate('EditWord', { id: item.id })}
      onRemove={() => store.removeWord(item)}
      key={item.id}
    />
  ));

  React.useEffect(() => {
    const currentList = store.allLists.find((item) => item.id === id);

    setIsPlayButtonsVisible(!!filteredWordList.length);
    setTitle(getTitle(id, currentList?.name));
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      store.stopPlayingSound(store.currentSound, true);
    }, [])
  );

  return (
    <View style={styles.container}>
      <Title title={title} />

      <ScrollView style={styles.wordsWrapper}>
        {wordList[0]
          ? wordList
          : <Text style={styles.text}>List is empty. Add a new word.</Text>
        }
      </ScrollView>

      <PlayingSound
        word={filteredWordList[store.currentIndex as number]}
        sound={store.currentSound}
        index={Number(store.currentIndex) + 1}
      />

      <ControlToggler
        isVisible={!!wordList[0]}
        isPlayButtonsVisible={isPlayButtonsVisible}
        onPress={setIsPlayButtonsVisible}
      />

      {isPlayButtonsVisible && wordList[0]
        ? <PlayButtons
            isPlaying={!!store.currentSound}
            onStopPress={() => interruptPlayer()}
            onPlayPress={() => handlePlayPress()}
            onPrevPress={handlePrevPress}
            onNextPress={handleNextPress}
          />
        : <EditButtons
            isFreeList={isFreeList || isFullList}
            handleListRemovePress={handleListRemovePress}
            handleAddPress={() => navigation.navigate('EditWord')}
            handleListEditPress={() => navigation.navigate('EditList', { id })}
          />
      }
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
    paddingBottom: BOTTOM_FIX_INDENT + CONTROL_TOGGLER_SIZE + 10,
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
  icon: {
    width: 38,
    height: 38,
    color: '#000000',
  },
});
