import { ActionTypes as WordsActionTypes, State as WordState } from '../store/words';
import { ActionTypes as PlayerActionTypes } from '../store/player';
import { Audio, AVPlaybackStatus } from 'expo-av';

import { Player } from '../utils/player';

import { Word } from '../types';

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

export interface Actions {
  getWords: (state: WordState) => Promise<void>;
  addList: (payload: any) => void;
  updateList: (payload: any) => void;
  removeList: (payload: any) => void;
  addWord: (payload: any) => void;
  updateWord: (payload: any) => void;
  removeWord: (payload: Word) => Promise<void>;
  createAndRunPlayList: (wordList: Word[], index: number, config: playerActions.PlayListConfig) => void;
  stopPlayingSound: (sound?: Audio.Sound | null, cleanIndex?: boolean) => Promise<void>;
  playSound: (player: Player | null) => Promise<void>;
  getSound: (uri: string | null, isMuted?: boolean) => Promise<{ sound: Audio.Sound; status: AVPlaybackStatus } | null>;
  removeAudios: (...args: string[]) => Promise<void>;
}

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
