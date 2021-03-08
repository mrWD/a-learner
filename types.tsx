export type RootStackParamList = {
  Root: undefined;
  EditList: { id: string } | undefined;
  WordList: { id: string };
  EditWord: { id: string } | undefined;
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