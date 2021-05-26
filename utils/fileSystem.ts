import * as FileSystem from 'expo-file-system';

import { State } from '../store/words';

import { WORD_LIST, PLAYER_SETTINGS } from '../constants/Store';

import { PlayListConfig } from '../types';

export const jsonDir = `${FileSystem.documentDirectory}/a-learner/`;
export const wordFileUri = jsonDir + WORD_LIST;
export const playerFileUri = jsonDir + PLAYER_SETTINGS;

export const ensureDirExists = async (state: State | PlayListConfig, uri = wordFileUri) => {
  try {
    const dirInfo = await FileSystem.getInfoAsync(jsonDir);

    if (!dirInfo.exists) {
      console.log('json directory doesn\'t exist, creating...');
      await FileSystem.makeDirectoryAsync(jsonDir);
    }

    const jsonInfo = await FileSystem.getInfoAsync(uri);

    if (!jsonInfo.exists) {
      console.log('json file doesn\'t exist, creating...');
      await FileSystem.writeAsStringAsync(uri, JSON.stringify(state));
    }
  } catch (err) {
    console.error('ensureDirExists', err);
  }
};

const storeData = async (state: State | PlayListConfig, uri: string) => {
  try {
    await ensureDirExists(state, uri);
    await FileSystem.writeAsStringAsync(uri, JSON.stringify(state));
  } catch (err) {
    console.error('storeData', err);
  }
};

export const storeWordsData = (state: State) => storeData(state, wordFileUri);
export const storePlayerData = (state: PlayListConfig) => storeData(state, playerFileUri);

export const removeAudios = async (...args: string[]) => {
  const removeAudio = async (uriList: string[], i = 0) => {
    if (uriList[i]) {
      await FileSystem.deleteAsync(uriList[i]);
      removeAudio(uriList, i + 1);
    }
  };

  try {
    await removeAudio(args);
  } catch (err) {
    console.error(err);
  }
};

const getState = async (state: State | PlayListConfig, uri: string, callback: Function) => {
  try {
    await ensureDirExists(state, uri);

    const oldState = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    if (oldState) {
      callback(JSON.parse(oldState));
    }
  } catch(err) {
    console.error('getState', err);
  }
};

export const getWordsState = (state: State, callback: (arg: State) => void) => getState(state, wordFileUri, callback);
export const getPlayerState = (state: PlayListConfig, callback: (arg: PlayListConfig) => void) => getState(state, playerFileUri, callback);
