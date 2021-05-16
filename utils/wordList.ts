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
