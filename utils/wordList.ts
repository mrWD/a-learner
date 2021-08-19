import { FREE_LIST, FULL_LIST } from '../constants/Store';

import { getLocalizedText } from './localizedText';

import { Word } from '../types';

export const getTitle = (id: string, defaultVal?: string) => {
  const mapIdToTitle: Record<string, string> = {
    [FREE_LIST]: getLocalizedText('Not connected items'),
    [FULL_LIST]: getLocalizedText('All items'),
  };

  return defaultVal || mapIdToTitle[id];
};

export const filterWordList = (wordList: Word[], id: string) => {
  if (!id || id === FULL_LIST) {
    return wordList;
  }

  if (id === FREE_LIST) {
    return wordList.filter((item) => !item.contained[0]);
  }

  return wordList.filter((item) => item.contained.includes(id))
};

export const shuffleArray = (wordList: Word[], isShuffle: boolean) => {
  if (!isShuffle) {
    return wordList;
  }

  return wordList
    .map((word) => ({ sort: Math.random(), word }))
    .sort((a, b) => a.sort - b.sort)
    .map((item) => item.word);
};
