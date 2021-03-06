import * as FileSystem from 'expo-file-system';

import { ensureDirExists, fileUri, removeAudios } from '../utils/fileSystem';

import { State, Word, ActionTypes } from '../store/words';

import * as constantsStore from '../constants/Store';

import { WordsDispatch } from './index';

const bindAction = (type: ActionTypes) => (dispatch: WordsDispatch) => (payload: any) => dispatch({
  type,
  payload,
});

export const getWords = (dispatch: WordsDispatch) => async (state: State) => {
  try {
    await ensureDirExists(state);

    const oldState = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    if (oldState) {
      dispatch({ type: constantsStore.GET_WORDS, payload: JSON.parse(oldState) });
    }
  } catch(err) {
    console.error('getData', err);
  }
};

export const addList = bindAction(constantsStore.ADD_LIST);
export const updateList = bindAction(constantsStore.UPDATE_LIST);
export const removeList = bindAction(constantsStore.REMOVE_LIST);

export const addWord = bindAction(constantsStore.ADD_WORD);
export const updateWord = bindAction(constantsStore.UPDATE_WORD);
export const removeWord = (dispatch: WordsDispatch) => async (payload: Word) => {
  await removeAudios(payload.tAudio, payload.fAudio);

  dispatch({ type: constantsStore.REMOVE_WORD, payload: payload.id });
};
