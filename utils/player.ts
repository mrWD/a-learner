import { Audio, AVPlaybackStatus } from 'expo-av';
import moment from 'moment';

import * as PlayerSettings from '../constants/PlayerSettings';

export interface Player {
  sound: Audio.Sound;
  status: AVPlaybackStatus;
}

Audio.setAudioModeAsync({
  playsInSilentModeIOS: true,
  staysActiveInBackground: true,
});

export const runPlayer = async (playList: AsyncGenerator, endDate: moment.Moment | 0, stopPlayer: Function) => {
  if (endDate && moment().isSameOrAfter(endDate)) {
    stopPlayer();
    return;
  }

  const result = await playList?.next();

  if (!result.done) {
    await runPlayer(playList, endDate, stopPlayer);
  }
};

export const getSound = async (uri: string | null, isMuted = false) => {
  if (!uri) {
    return null;
  }

  return Audio.Sound.createAsync({ uri }, { volume: Number(!isMuted) });
};

export const getOrder = (order: Array<'T' | 'F'>) => {
  const mapOrderToAudioType = {
    [PlayerSettings.FOREIGN_TYPE]: 'fAudio',
    [PlayerSettings.TRANSLATE_TYPE]: 'tAudio',
  } as const;

  const currentOrder = order[0] ? order : PlayerSettings.ORDER;

  return currentOrder.map((orderName) => mapOrderToAudioType[orderName]);
};

export const playSound = async (player: Player | null) => {
  if (!player) {
    return;
  }

  await player.sound.playAsync();
  await new Promise(resolve => {
    player.sound.setOnPlaybackStatusUpdate(async (playbackStatus) => {
      if ((playbackStatus as any).didJustFinish) {
        await player.sound?.unloadAsync();
        resolve(1);
      }
    });
  });
};

export const doDelay = async (url: string, delay: number) => {
  if (!delay) {
    return;
  }

  for (let index = delay; index > 0; index--) {
    const delayer = await getSound(url, true);
    await playSound(delayer);
  }
};
