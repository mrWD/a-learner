import * as FileSystem from 'expo-file-system';

import { State } from '../store/words';

import { WORD_LIST } from '../constants/Store';

export const jsonDir = `${FileSystem.documentDirectory}/a-learner/`;
export const fileUri = jsonDir + WORD_LIST;

export const ensureDirExists = async (state: State) => {
  try {
    const dirInfo = await FileSystem.getInfoAsync(jsonDir);

    if (!dirInfo.exists) {
      console.log('json directory doesn\'t exist, creating...');
      await FileSystem.makeDirectoryAsync(jsonDir);
    }

    const jsonInfo = await FileSystem.getInfoAsync(fileUri);

    if (!jsonInfo.exists) {
      console.log('json file doesn\'t exist, creating...');
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(state));
    }
  } catch (err) {
    console.error('ensureDirExists', err);
  }
};

export const storeData = async (state: State) => {
  try {
    await ensureDirExists(state);

    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(state));
  } catch (err) {
    console.error('storeData', err);
  }
};

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
