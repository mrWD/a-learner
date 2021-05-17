import { Audio } from 'expo-av';

import { removeAudios as removeAudiosUtils } from '../utils/fileSystem';
import * as playerUtils from '../utils/player';

import { Word } from '../store/words';

import * as constantsStore from '../constants/Store';

import { PlayerDispatch } from './index';

interface PlayListConfig {
  isRepeating: boolean;
  delay: number;
  order: Array<'T' | 'F'>;
}

export const stopPlayingSound = (dispatch: PlayerDispatch) => async (sound: Audio.Sound | null, cleanIndex = false) => {
  const status = await sound?.getStatusAsync();

  if (status?.isLoaded) {
    await sound?.stopAsync();
    await sound?.unloadAsync();
  }

  dispatch({ type: constantsStore.STOP_PLAYER, payload: cleanIndex });
};

async function* generatePlayList(dispatch: PlayerDispatch, wordList: Word[], index = 0, config: PlayListConfig) {
  const audioTypeList = playerUtils.getOrder(config.order);

  for (let wordIndex = index; wordIndex < wordList.length; wordIndex++) {
    const word = wordList[wordIndex];

    dispatch({ type: constantsStore.UPDATE_INDEX, payload: wordIndex });

    for (let audioTypeIndex = 0; audioTypeIndex < audioTypeList.length; audioTypeIndex++) {
      const type = audioTypeList[audioTypeIndex];
      const url = word[type];
      const player = await playerUtils.getSound(url);

      if (player) {
        dispatch({ type: constantsStore.UPDATE_SOUND, payload: player.sound });
        await playerUtils.playSound(player);
      }

      if (type === 'fAudio' && config.delay) {
        for (let index = config.delay; index > 0; index--) {
          const delayer = await playerUtils.getSound(url, true);
          await playerUtils.playSound(delayer);
        }
      }
    }

    if (config.isRepeating && wordIndex === wordList.length - 1) {
      wordIndex = -1;
    }
  }

  stopPlayingSound(dispatch)(null, true);

  return;
};

export const createAndRunPlayList = (dispatch: PlayerDispatch) => (...args: [Word[], number, PlayListConfig]) => {
  const playList = generatePlayList(dispatch, ...args);

  dispatch({ type: constantsStore.UPDATE_PLAYLIST, payload: playList });

  playList?.next();
};

export const removeAudios = removeAudiosUtils;
export const playSound = playerUtils.playSound;
export const getSound = playerUtils.getSound;
