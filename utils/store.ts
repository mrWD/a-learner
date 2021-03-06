import { State, List, Word } from '../store/words';

const generateId = () => {
  const date = new Date();

  return parseInt(`${date.getTime()}`, 36);
};

export const replaceItem = (key: 'wordList' | 'allLists') => (state: State, payload: Word | List) => ({
  ...state,
  [key]: (state[key] as (Word | List)[]).map((item) => item.id !== payload.id ? item : payload),
});

export const addItem = (key: 'wordList' | 'allLists') => (state: State, payload: Word | List) => ({
  ...state,
  [key]: [...state[key], { ...payload, id: generateId() }],
});
