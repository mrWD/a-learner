import { Audio } from 'expo-av';

import * as constantsStore from '../constants/Store';

type PlayList = AsyncGenerator<undefined, void, unknown>;

export interface State {
  playList: PlayList | null,
  currentSound: Audio.Sound | null;
  currentIndex: number | null;
}

export type ActionTypes = keyof typeof mapActionTypeToReducer;

const replace = (key: string) => <A>(state: State, payload: A) => ({
  ...state,
  [key]: payload,
});

export const initState: State = {
  currentSound: null,
  currentIndex: null,
  playList: null,
};

export const mapActionTypeToReducer = {
  [constantsStore.UPDATE_SOUND]: replace('currentSound'),
  [constantsStore.UPDATE_INDEX]: replace('currentIndex'),
  [constantsStore.UPDATE_PLAYLIST]: replace('playList'),
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
