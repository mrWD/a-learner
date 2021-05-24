import { State } from '../store/words';

import { Word, List } from '../types';

interface StoreHelper {
  (key: 'wordList'): (state: State, payload: Word) => State;
  (key: 'allLists'): (state: State, payload: List) => State;
}

const generateId = () => {
  const date = new Date();

  return parseInt(`${date.getTime()}`, 36);
};

export const replaceItem: StoreHelper = (key) => (state, payload) => ({
  ...state,
  [key]: state[key].map((item) => item.id !== payload.id ? item : payload),
});

export const addItem: StoreHelper = (key) => (state, payload) => ({
  ...state,
  [key]: [...state[key], { ...payload, id: generateId() }],
});
