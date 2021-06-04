import { Audio } from 'expo-av';
import moment from 'moment';
import * as FileSystem from 'expo-file-system';

import { ensureDirExists, getPlayerState, playerFileUri, removeAudios as removeAudiosUtils } from '../utils/fileSystem';
import * as playerUtils from '../utils/player';

import * as constantsStore from '../constants/Store';

import { PlayListConfig, Word } from '../types';

import { PlayerDispatch } from './index';

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
      const nextType = audioTypeList[audioTypeIndex + 1];
      const url = word[type];

      yield;

      const player = await playerUtils.getSound(url);

      yield;

      if (player) {
        dispatch({ type: constantsStore.UPDATE_SOUND, payload: player.sound });
        await playerUtils.playSound(player);
      }

      yield;

      if (type === 'fAudio' || nextType === 'fAudio' || audioTypeList.length === 1) {
        await playerUtils.doDelay(word.fAudio, config.delay);
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

export const createAndRunPlayList = (dispatch: PlayerDispatch) => (...args: [Word[], number, PlayListConfig & { listId: string }]) => {
  const config = args[2];
  const playList = generatePlayList(dispatch, ...args);
  const endDate = config.timer && moment().add(config.timer, 'm');

  dispatch({ type: constantsStore.UPDATE_PLAYLIST, payload: playList });
  dispatch({ type: constantsStore.UPDATE_CURRENT_LIST_ID, payload: config.listId });

  playerUtils.runPlayer(playList, endDate, stopPlayingSound(dispatch));
};

export const setSettings = (dispatch: PlayerDispatch) => (settings: PlayListConfig) => {
  dispatch({ type: constantsStore.UPDATE_SETTINGS, payload: settings });
};

export const getPlayerSettings = (dispatch: PlayerDispatch) => (state: PlayListConfig) => {
  getPlayerState(state, setSettings(dispatch));
};

export const removeAudios = removeAudiosUtils;
export const playSound = playerUtils.playSound;
export const getSound = playerUtils.getSound;
