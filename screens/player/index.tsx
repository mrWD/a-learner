import * as React from 'react';
import { StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';

import { Text, View } from '../../components/Themed';
import { Title } from '../../components/title';
import { Button } from '../../components/button';

import { filterWordList, getTitle } from '../../utils/wordList';

import { useStore } from '../../store';

import { Icons } from '../../constants/Icons';

import { RootStackParamList } from '../../types';

import { PlayButtons } from './PlayButtons';
import { Settings } from './settings';

type Props = React.FC<StackScreenProps<RootStackParamList, 'Player'>>;

export const Player: Props = ({ navigation, route: { params: { id, songIndex } } }) => {
  const [title, setTitle] = React.useState(getTitle(id));
  const [itemName, setItemName] = React.useState('');
  const [isSettingsVisible, setIsSettingsVisible] = React.useState(false);

  const store = useStore();
  const filteredWordList = filterWordList(store.wordList, id);

  const handleToggleSettingsVisibility = () => {
    setIsSettingsVisible(!isSettingsVisible);
  };

  const handlePlayPress = async (index = store.currentIndex) => {
    store.createAndRunPlayList(filteredWordList, index);
  };

  const interruptPlayer = (index?: number) => {
    store.stopPlayingSound(store.currentSound);

    if (typeof index === 'number') {
      handlePlayPress(index);
    }
  };

  const onForwardPrevPress = () => {};
  const onForwardNextPress = () => {};

  const handlePrevPress = () => {
    const playIndex = store.currentIndex || filteredWordList.length;
    interruptPlayer(playIndex - 1);
  };

  const handleNextPress = () => {
    const nextPlayIndex = Number(store.currentIndex) + 1;
    interruptPlayer(nextPlayIndex < filteredWordList.length ? nextPlayIndex : 0);
  };

  React.useEffect(() => {
    const currentList = store.allLists.find((item) => item.id === id);

    setTitle(`Current list: ${getTitle(id, currentList?.name)}`);

    handlePlayPress(songIndex);
  }, [id]);

  React.useEffect(() => {
    if (typeof store.currentIndex === 'number') {
      setItemName(filteredWordList[store.currentIndex as number]?.name);
    }
  }, [store]);

  useFocusEffect(
    React.useCallback(() => {
      store.stopPlayingSound(store.currentSound, true);
    }, [])
  );

  return (
    <View style={styles.container}>
      <Title title={title} />

      {isSettingsVisible && <Settings onClose={handleToggleSettingsVisibility} />}

      <View style={styles.wrapper}>
        <View style={styles.info}>
          <Text style={styles.text}>{itemName}</Text>
        </View>

        <View style={styles.btnWrapper}>
          <Button
            style={styles.btn}
            onPress={() => navigation.navigate('WordList', { id })}
          >
            <Icons.List style={styles.icon} />
          </Button>

          <View style={styles.btnWrapper}>
            <Button style={styles.btn} onPress={handleToggleSettingsVisibility}>
              <Icons.Repeat style={styles.icon} />
            </Button>

            <Button style={styles.btn} onPress={handleToggleSettingsVisibility}>
              <Icons.Shuffle style={styles.icon} />
            </Button>

            <Button
              style={{ ...styles.btn, marginRight: 0 }}
              onPress={handleToggleSettingsVisibility}
            >
              <Icons.Settings style={styles.icon} />
            </Button>
          </View>
        </View>
      </View>

      <PlayButtons
        isPlaying={!!store.currentSound}
        onStopPress={() => interruptPlayer()}
        onPlayPress={() => handlePlayPress(0)}
        onForwardPrevPress={onForwardPrevPress}
        onForwardNextPress={onForwardNextPress}
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
    width: 40,
    height: 40,
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
});
