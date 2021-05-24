import { addItem, replaceItem } from '../utils/store';
import { storeData } from '../utils/fileSystem';

import * as constantsStore from '../constants/Store';

import { Word, List } from '../types';

export interface State {
  wordList: Word[];
  allLists: List[];
  freeWordList: string[];
}

export type ActionTypes = keyof typeof mapActionTypeToReducer;

export const initState: State = {
  wordList: [],
  allLists: [],
  freeWordList: [],
};

export const mapActionTypeToReducer = {
  [constantsStore.ADD_LIST]: addItem('allLists'),
  [constantsStore.ADD_WORD]: addItem('wordList'),
  [constantsStore.UPDATE_LIST]: replaceItem('allLists'),
  [constantsStore.UPDATE_WORD]:  replaceItem('wordList'),

  [constantsStore.GET_WORDS]: (state: State, payload: State) => ({ ...state, ...payload }),

  [constantsStore.REMOVE_LIST]: (state: State, payload: string) => ({
    ...state,
    allLists: state.allLists.filter(item => item.id !== payload),
    wordList: state.wordList.map(word => ({
      ...word,
      contained: word.contained.filter(item => item !== payload),
    })),
  }),

  [constantsStore.REMOVE_WORD]: (state: State, payload: string) => ({
    ...state,
    wordList: state.wordList.filter(item => item.id !== payload),
  }),
};

export const reducer = (state: State, action: { type: ActionTypes, payload: any }) => {
  const newStore = mapActionTypeToReducer[action.type](state, action.payload);

  storeData(newStore);

  return newStore;
};
