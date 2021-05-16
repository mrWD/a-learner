export type RootStackParamList = {
  Root: undefined;
  EditList: { id: string } | undefined;
  WordList: { id: string };
  EditWord: { id?: string; listId?: string } | undefined;
  Player: { id: string, songIndex: number };
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
