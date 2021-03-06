import React from 'react';

import { createContext, useContext, useReducer } from 'react';

import { mapDispatchToActions } from '../actions';

import { initState as wordsInitState, reducer as wordsReducer } from './words';
import { initState as playerInitState, reducer as playerReducer } from './player';

const WordListContext = createContext({ ...wordsInitState, ...playerInitState });

export const useStore = () => useContext(WordListContext);

export const Store: React.FC = ({ children }) => {
  const [wordState, wordsDispatch] = useReducer(wordsReducer, wordsInitState);
  const [playerState, playerDispatch] = useReducer(playerReducer, playerInitState);
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
