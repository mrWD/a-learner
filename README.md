# ALearner

A small Expo / React Native app for learning foreign words by ear. You record a word and its translation with the phone microphone, put the pair into a list, and then play the list back like a playlist: on repeat, shuffled, with a pause between items and a timer that stops it when you fall asleep.

There is no live demo. It was a native mobile app; see the status line below.

## What it does

- Record audio pairs. Each word has a name, an optional description, a "foreign" recording and a "translation" recording. Recording uses expo-av and the phone microphone.
- Organize words into lists. A word can belong to several lists. Words that are in no list show up under "Not connected items", and there is an "All items" list too.
- Play a list. The player walks through the words and plays both recordings for each one. Settings: which side plays first (translation then foreign, or the other way round), repeat, shuffle, a pause between recordings, and a timer that stops playback after N minutes.
- Keeps playing in the background (UIBackgroundModes audio, staysActiveInBackground).
- Light and dark theme, following the system setting.
- UI strings in English, Russian, Polish, Italian, German, Spanish and French, picked from the device locale.
- AdMob banner and interstitial ads. Test ad ids are used in development builds.

## How it is built

- Expo SDK 40, React Native 0.63, React 16.13, TypeScript 4.
- React Navigation 5 (stack + bottom tabs).
- State: one React context with two reducers (`store/words.ts`, `store/player.ts`). Each reducer is a map from action type to a pure function. After every change to the word list or the player settings the state is written as JSON to the app's document directory with expo-file-system, so the data survives restarts without a database.
- Playback: `actions/player.ts` builds an async generator over the word list, and `utils/player.ts` drives it, awaiting each sound's `didJustFinish` before moving on. The delay between items is not a timer: the player plays the foreign recording muted N times, so the pause is measured in repeats of the recording.
- Icons are SVG files loaded through react-native-svg-transformer.

## Running it

```
yarn
yarn start
```

Then open it in Expo Go on a phone, or with `yarn ios` / `yarn android`. Ads need a real device; on a simulator and in dev builds the test unit ids are used. The dependency versions are from 2021 and will need an Expo upgrade to run on a current toolchain.

## Status

Built in 2021 for my own use and prepared for the app stores (bundle id `com.lvigtor.alearner.v1`, version 1.2.1). Not maintained since October 2021.

## License

MIT, see [LICENSE](LICENSE).
