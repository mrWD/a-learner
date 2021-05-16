import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import { RootStackParamList } from '../types';

import NotFoundScreen from '../screens/NotFoundScreen';

import { EditWord } from '../screens/edit-word';
import { WordList } from '../screens/word-list';
import { AllLists } from '../screens/all-lists';
import { EditList } from '../screens/edit-list';
import { Player } from '../screens/player';

import LinkingConfiguration from './LinkingConfiguration';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={AllLists} />
      <Stack.Screen name="EditList" component={EditList} />
      <Stack.Screen name="WordList" component={WordList} />
      <Stack.Screen name="EditWord" component={EditWord} />
      <Stack.Screen name="Player" component={Player} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
