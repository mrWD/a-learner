import { removeAudios, getWordsState } from '../utils/fileSystem';

import { State, ActionTypes } from '../store/words';

import * as constantsStore from '../constants/Store';

import { Word } from '../types';

import { WordsDispatch } from './index';

const bindAction = (type: ActionTypes) => (dispatch: WordsDispatch) => (payload: any) => dispatch({
  type,
  payload,
});

export const getWords = (dispatch: WordsDispatch) => (state: State) => {
  getWordsState(state, (oldState: State) => {
    dispatch({ type: constantsStore.GET_WORDS, payload: oldState });
  });
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
