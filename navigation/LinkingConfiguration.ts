import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              EditWord: 'one',
            },
          },
          TabTwo: {
            screens: {
              WordList: 'two',
            },
          },
          TabThree: {
            screens: {
              WordList: 'three',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
