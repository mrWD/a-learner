import * as React from 'react';
import { StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { Text, View } from '../../components/Themed';
import { Title } from '../../components/title';
import { Button } from '../../components/button';
import { Icon } from '../../components/icon';

import { filterWordList, getTitle, shuffleArray } from '../../utils/wordList';

import { useStore } from '../../store';
import { Word } from '../../store/words';

import * as PlayerSettings from '../../constants/PlayerSettings';

import { RootStackParamList } from '../../types';

import { PlayButtons } from './PlayButtons';
import { OrderType, Settings } from './settings';

type Props = React.FC<StackScreenProps<RootStackParamList, 'Player'>>;

export const Player: Props = ({ navigation, route: { params } }) => {
  const [isSettingsVisible, setIsSettingsVisible] = React.useState(false);
  const [isShuffle, setIsShuffle] = React.useState(false);
  const [isRepeating, setIsRepeating] = React.useState(true);
  const [delay, setDelay] = React.useState(1);
  const [title, setTitle] = React.useState(getTitle(params.id));
  const [order, setOrder] = React.useState<OrderType[]>(PlayerSettings.ORDER);
  const [currentAudio, setCurrentAudio] = React.useState<Word | null>(null);
  const [wordList, setWordList] = React.useState<Word[]>([]);

  const store = useStore();

  const handleChangeSettingsVisibility = () => {
    setIsSettingsVisible(!isSettingsVisible);
  };

  const handlePlayPress = async (index: number) => {
    await store.createAndRunPlayList(wordList, index, { order, delay, isRepeating });
  };

  const interruptPlayer = async (index?: number | null) => {
    await store.stopPlayingSound(store.currentSound);

    if (typeof index === 'number') {
      await handlePlayPress(index);
    }
  };

  const handlePrevPress = () => {
    const playIndex = store.currentIndex || wordList.length;
    interruptPlayer(playIndex - 1);
  };

  const handleNextPress = () => {
    const nextPlayIndex = Number(store.currentIndex) + 1;
    interruptPlayer(nextPlayIndex < wordList.length ? nextPlayIndex : 0);
  };

  React.useEffect(() => {
    const formattedWordList = shuffleArray(filterWordList(store.wordList, params.id), isShuffle);
    setWordList(formattedWordList);
  }, [isShuffle, isRepeating, delay, order]);

  React.useEffect(() => {
    const currentList = store.allLists.find(({ id }) => id === params.id);
    setTitle(getTitle(params.id, currentList?.name));
  }, [params.id]);

  // TODO: Problems with playing continue
  React.useEffect(() => {
    if (params.songId && wordList[0]) {
      const index = wordList.findIndex(({ id }) => id === params.songId);
      interruptPlayer();
      handlePlayPress(index);
    }
  }, [params.songId, wordList]);

  React.useEffect(() => {
    if (wordList[0] && typeof store.currentIndex === 'number') {
      setCurrentAudio(wordList[store.currentIndex as number]);
    }
  }, [store.currentIndex, wordList]);

  return (
    <View style={styles.container}>
      <Title title={title} />

      {isSettingsVisible && (
        <Settings
          order={order}
          delay={delay}
          changeOrder={setOrder}
          changeDelay={setDelay}
          onClose={handleChangeSettingsVisibility}
        />
      )}

      <View style={styles.wrapper}>
        <View style={styles.info}>
          <Text style={styles.text}>{currentAudio?.name}</Text>
          <Text style={styles.description}>{currentAudio?.description}</Text>
        </View>

        <View style={styles.btnWrapper}>
          <Button
            style={styles.btn}
            onPress={() => navigation.navigate('WordList', { id: params.id })}
          >
            <Icon style={styles.icon} icon="List" />
          </Button>

          <View style={styles.btnWrapper}>
            <Button style={styles.btn} onPress={() => setIsRepeating(!isRepeating)}>
              <Icon style={styles.icon} icon={isRepeating ? 'Repeat' : 'Arrow'} />
            </Button>

            <Button style={styles.btn} onPress={() => setIsShuffle(!isShuffle)}>
              <Icon style={styles.icon} icon={isShuffle ? 'Shuffle' : 'Queue'} />
            </Button>

            <Button
              style={{ ...styles.btn, marginRight: 0 }}
              onPress={handleChangeSettingsVisibility}
            >
              <Icon style={styles.icon} icon="Settings" />
            </Button>
          </View>
        </View>
      </View>

      <PlayButtons
        isPlaying={!!store.currentSound}
        onStopPress={() => interruptPlayer()}
        onPlayPress={() => handlePlayPress(store.currentIndex || 0)}
        onForwardPrevPress={() => interruptPlayer(store.currentIndex)}
        onForwardNextPress={() => interruptPlayer(store.currentIndex)}
        onPrevPress={handlePrevPress}
        onNextPress={handleNextPress}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    paddingBottom: 32,
    paddingHorizontal: 16,
  },
  info: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    width: 44,
    height: 44,
    marginRight: 16,
    padding: 4,
    borderRadius: 3,
  },
  icon: {
    width: '100%',
    height: '100%',
    color: '#222222',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
});
