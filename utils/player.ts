import { Audio, AVPlaybackStatus } from 'expo-av';

import * as PlayerSettings from '../constants/PlayerSettings';

interface Player {
  sound: Audio.Sound;
  status: AVPlaybackStatus;
}

Audio.setAudioModeAsync({
  playsInSilentModeIOS: true,
  staysActiveInBackground: true,
});

export const runPlayer = async (playList: AsyncGenerator) => {
  const result = await playList?.next();

  if (!result.done) {
    await runPlayer(playList);
  }
};

export const getSound = async (uri: string | null) => {
  if (!uri) {
    return null;
  }

  return Audio.Sound.createAsync({ uri });
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
    player.sound.setOnPlaybackStatusUpdate(async (playbackStatus: AVPlaybackStatus) => {
      if (playbackStatus.didJustFinish) {
        await player.sound?.unloadAsync();
        resolve(1);
      }
    });
  });
};
