import React from 'react';

import { createContext, useContext, useReducer } from 'react';

import { mapDispatchToActions, Actions } from '../actions';

import * as wordsState from './words';
import * as playersState from './player';

const WordListContext = createContext({ ...wordsState.initState, ...playersState.initState });

export const useStore = () => useContext(WordListContext) as wordsState.State & playersState.State & Actions;

export const Store: React.FC = ({ children }) => {
  const [wordState, wordsDispatch] = useReducer(wordsState.reducer, wordsState.initState);
  const [playerState, playerDispatch] = useReducer(playersState.reducer, playersState.initState);
  const actions = mapDispatchToActions(wordsDispatch, playerDispatch);

  React.useEffect(() => {
    actions.getWords(wordState);
  }, []);

  return (
    <WordListContext.Provider
      value={{
        ...wordState,
        ...playerState,
        ...actions,
      }}
    >
      {children}
    </WordListContext.Provider>
  );
};
