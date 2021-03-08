import { PlayerDispatch } from './index';
import { Audio, AVPlaybackStatus } from 'expo-av';

import { removeAudios as removeAudiosUtils } from '../utils/fileSystem';

import { Word } from '../store/words';

import * as constantsStore from '../constants/Store';
import { DELAY_COEFFICIENT } from '../constants/Limits';

interface Player {
  sound: Audio.Sound;
  status: AVPlaybackStatus;
}

Audio.setAudioModeAsync({
  playsInSilentModeIOS: true,
  staysActiveInBackground: true,
});

const doDelay = async (delay: number) => {
  await new Promise(resolve => setTimeout(resolve, delay));
};

const runPlayer = async (playList: AsyncGenerator) => {
  const result = await playList?.next();

  if (!result.done) {
    await runPlayer(playList);
  }
};

export const getSound = async (uri: string | null) => {
  if (!uri) {
    return null;
  }

  const player = await Audio.Sound.createAsync({ uri });

  return player;
};

export const stopPlayingSound = (dispatch: PlayerDispatch) => async (sound: Audio.Sound | null, cleanIndex = false) => {
  const status = await sound?.getStatusAsync();

  if (status?.isLoaded) {
    await sound?.stopAsync();
    await sound?.unloadAsync();
  }

  dispatch({ type: constantsStore.STOP_PLAYER, payload: cleanIndex });
};

export const playSound = async (player: Player | null): Promise<number> => {
  if (!player) {
    return 0;
  }

  const { durationMillis } = player.status;

  await player.sound?.playAsync();

  await doDelay(durationMillis);

  await player.sound?.unloadAsync();

  return durationMillis;
};

const playList = async (dispatch: PlayerDispatch, url: string, coefficient = 1) => {
  const player = await getSound(url);
  let duration = 0;

  if (player) {
    dispatch({ type: constantsStore.UPDATE_SOUND, payload: player.sound });

    duration = await playSound(player);
  }

  await doDelay(duration * coefficient);

  return duration;
};

async function* generatePlayList(dispatch: PlayerDispatch, wordList: Word[], index = 0) {
  for (let i = index; i < wordList.length; i++) {
    dispatch({ type: constantsStore.UPDATE_INDEX, payload: i });

    const word = wordList[i];

    await playList(dispatch, word.fAudio, DELAY_COEFFICIENT);

    yield;

    await playList(dispatch, word.tAudio);

    yield;
  }

  stopPlayingSound(dispatch)(null, true);

  return;
};

export const createAndRunPlayList = (dispatch: PlayerDispatch) => (...args: [Word[], number]) => {
  const playList = generatePlayList(dispatch, ...args);

  dispatch({ type: constantsStore.UPDATE_PLAYLIST, payload: playList });

  runPlayer(playList);
};

export const removeAudios = removeAudiosUtils;
