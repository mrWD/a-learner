import { ActionTypes as WordsActionTypes } from '../store/words';
import { ActionTypes as PlayerActionTypes } from '../store/player';

import * as wordsActions from './words';
import * as playerActions from './player';

export type WordsDispatch = React.Dispatch<{
  type: WordsActionTypes,
  payload: any,
}>;

export type PlayerDispatch = React.Dispatch<{
  type: PlayerActionTypes,
  payload: any,
}>

export const mapDispatchToActions = (wordsDispatch: WordsDispatch, actionDispatch: PlayerDispatch) => ({
  getWords: wordsActions.getWords(wordsDispatch),
  addList: wordsActions.addList(wordsDispatch),
  updateList: wordsActions.updateList(wordsDispatch),
  removeList: wordsActions.removeList(wordsDispatch),
  addWord: wordsActions.addWord(wordsDispatch),
  updateWord: wordsActions.updateWord(wordsDispatch),
  removeWord: wordsActions.removeWord(wordsDispatch),

  createAndRunPlayList: playerActions.createAndRunPlayList(actionDispatch),
  stopPlayingSound: playerActions.stopPlayingSound(actionDispatch),
  playSound: playerActions.playSound,
  getSound: playerActions.getSound,
  removeAudios: playerActions.removeAudios,
});
