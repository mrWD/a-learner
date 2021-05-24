import { Audio } from 'expo-av';

import * as constantsStore from '../constants/Store';

import { Word } from '../types';

type PlayList = AsyncGenerator<undefined, void, unknown>;

export interface State {
  currentWord: Word | null;
  playList: PlayList | null,
  currentSound: Audio.Sound | null;
  currentIndex: number | null;
  currentListId: string | null;
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
};

export const mapActionTypeToReducer = {
  [constantsStore.UPDATE_SOUND]: replace('currentSound'),
  [constantsStore.UPDATE_INDEX]: replace('currentIndex'),
  [constantsStore.UPDATE_PLAYING_WORD]: replace('currentWord'),
  [constantsStore.UPDATE_PLAYLIST]: replace('playList'),
  [constantsStore.UPDATE_CURRENT_LIST_ID]: replace('currentListId'),
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
  return mapActionTypeToReducer[action.type](state, action.payload);
};
