import { Audio } from 'expo-av';

import * as constantsStore from '../constants/Store';

type PlayList = AsyncGenerator<undefined, void, unknown>;

export interface State {
  playList: PlayList | null,
  currentSound: Audio.Sound | null;
  currentIndex: number | null;
}

export type ActionTypes = keyof typeof mapActionTypeToReducer;

export const initState: State = {
  currentSound: null,
  currentIndex: null,
  playList: null,
};

export const mapActionTypeToReducer = {
  [constantsStore.UPDATE_SOUND]: (state: State, payload: Audio.Sound | null): State => ({
    ...state,
    currentSound: payload,
  }),
  [constantsStore.UPDATE_INDEX]: (state: State, payload: number | null): State => ({
    ...state,
    currentIndex: payload,
  }),
  [constantsStore.UPDATE_PLAYLIST]: (state: State, payload: PlayList | null): State => ({
    ...state,
    playList: payload,
  }),
  [constantsStore.STOP_PLAYER]: (state: State, payload: boolean): State => {
    state.playList?.return();

    return {
      ...state,
      playList: null,
      currentSound: null,
      currentIndex: !payload ? state.currentIndex : null,
    };
  },
};

export const reducer = (state: State, action: { type: ActionTypes, payload: any }) => {
  return mapActionTypeToReducer[action.type](state, action.payload);
};
