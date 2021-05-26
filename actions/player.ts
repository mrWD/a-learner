import { Audio } from 'expo-av';
import moment from 'moment';

import { removeAudios as removeAudiosUtils } from '../utils/fileSystem';
import * as playerUtils from '../utils/player';

import { Word } from '../types';

import * as constantsStore from '../constants/Store';

import { PlayerDispatch } from './index';

export interface PlayListConfig {
  isRepeating: boolean;
  delay: number;
  timer: number;
  order: Array<'T' | 'F'>;
  listId: string;
}

export const stopPlayingSound = (dispatch: PlayerDispatch) => async (sound: Audio.Sound | null = null, cleanIndex = false) => {
  const status = await sound?.getStatusAsync();

  if (status?.isLoaded) {
    await sound?.stopAsync();
    await sound?.unloadAsync();
  }

  dispatch({ type: constantsStore.STOP_PLAYER, payload: cleanIndex });
};

async function* generatePlayList(
  dispatch: PlayerDispatch,
  wordList: Word[],
  index = 0,
  config: PlayListConfig,
) {
  const audioTypeList = playerUtils.getOrder(config.order);

  for (let wordIndex = index; wordIndex < wordList.length; wordIndex++) {
    const word = wordList[wordIndex];

    dispatch({ type: constantsStore.UPDATE_INDEX, payload: wordIndex });
    dispatch({ type: constantsStore.UPDATE_PLAYING_WORD, payload: word });

    for (let audioTypeIndex = 0; audioTypeIndex < audioTypeList.length; audioTypeIndex++) {
      const type = audioTypeList[audioTypeIndex];
      const prevType = audioTypeList[audioTypeIndex - 1];
      const url = word[type];

      yield;

      const player = await playerUtils.getSound(url);

      yield;

      if (prevType === 'tAudio') {
        await playerUtils.doDelay(word.fAudio, config.delay);
      }

      yield;

      if (player) {
        dispatch({ type: constantsStore.UPDATE_SOUND, payload: player.sound });
        await playerUtils.playSound(player);
      }

      yield;

      if (type === 'fAudio') {
        await playerUtils.doDelay(url, config.delay);
      }

      yield;
    }

    if (config.isRepeating && wordIndex === wordList.length - 1) {
      wordIndex = -1;
    }
  }

  stopPlayingSound(dispatch)(null, true);

  return;
};

export const createAndRunPlayList = (dispatch: PlayerDispatch) => (...args: [Word[], number, PlayListConfig]) => {
  const config = args[2];
  const playList = generatePlayList(dispatch, ...args);
  const endDate = config.timer && moment().add(config.timer, 'm');

  dispatch({ type: constantsStore.UPDATE_PLAYLIST, payload: playList });
  dispatch({ type: constantsStore.UPDATE_CURRENT_LIST_ID, payload: config.listId });

  playerUtils.runPlayer(playList, endDate, stopPlayingSound(dispatch));
};

export const removeAudios = removeAudiosUtils;
export const playSound = playerUtils.playSound;
export const getSound = playerUtils.getSound;
