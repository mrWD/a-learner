export type RootStackParamList = {
  Root: undefined;
  EditList: { id: string } | undefined;
  WordList: { id: string };
  EditWord: { id?: string; listId?: string } | undefined;
  Player: { id: string, songId?: string };
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  EditWord: undefined;
};

export type TabTwoParamList = {
  WordList: undefined;
};

export interface Word {
  duration: number;
  id: string;
  name: string;
  fAudio: string;
  tAudio: string;
  description: string;
  contained: string[];
}

export interface List {
  id: string;
  name: string;
  description: string;
}

export interface PlayListConfig {
  isShuffle: boolean;
  isRepeating: boolean;
  delay: number;
  timer: number;
  order: Array<'T' | 'F'>;
}
