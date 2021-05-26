import { Audio } from 'expo-av';

import * as constantsStore from '../constants/Store';
import * as PlayerSettings from '../constants/PlayerSettings';

import { storePlayerData } from '../utils/fileSystem';

import { Word, PlayListConfig } from '../types';

type PlayList = AsyncGenerator<undefined, void, unknown>;

export interface State {
  currentWord: Word | null;
  playList: PlayList | null,
  currentSound: Audio.Sound | null;
  currentIndex: number | null;
  currentListId: string | null;
  settings: PlayListConfig;
}

export type ActionTypes = keyof typeof mapActionTypeToReducer;

const replace = (key: string) => <A>(state: State, payload: A) => ({
  ...state,
  [key]: payload,
});

export const initState: State = {
  currentWord: null,
  currentSound: null,
  currentIndex: null,
  playList: null,
  currentListId: null,
  settings: {
    isShuffle: false,
    isRepeating: true,
    delay: 1,
    timer: 0,
    order: PlayerSettings.ORDER,
  },
};

export const mapActionTypeToReducer = {
  [constantsStore.UPDATE_SOUND]: replace('currentSound'),
  [constantsStore.UPDATE_INDEX]: replace('currentIndex'),
  [constantsStore.UPDATE_PLAYING_WORD]: replace('currentWord'),
  [constantsStore.UPDATE_PLAYLIST]: replace('playList'),
  [constantsStore.UPDATE_CURRENT_LIST_ID]: replace('currentListId'),
  [constantsStore.UPDATE_SETTINGS]: replace('settings'),
  [constantsStore.STOP_PLAYER]: (state: State, payload: boolean): State => {
    state.playList?.return();

    return {
      ...state,
      playList: null,
      currentListId: null,
      currentWord: null,
      currentSound: null,
      currentIndex: !payload ? state.currentIndex : null,
    };
  },
};

export const reducer = (state: State, action: { type: ActionTypes, payload: any }) => {
  const newStore = mapActionTypeToReducer[action.type](state, action.payload);

  if (action.type === constantsStore.UPDATE_SETTINGS) {
    storePlayerData(action.payload);
  }

  return newStore;
};
