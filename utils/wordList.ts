import { FREE_LIST, FULL_LIST } from '../constants/Store';

import { Word } from '../store/words';

export const getTitle = (id: string, defaultVal?: string) => {
  const mapIdToTitle: Record<string, string> = {
    [FREE_LIST]: 'Free Items',
    [FULL_LIST]: 'All Items',
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
