import React from 'react';
import { Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';

import { getLocalizedText } from './utils/localizedText';

import Navigation from './navigation';

import { Store } from './store';

const checkPermissions = async () => {
  const permissions = await Audio.getPermissionsAsync();

  if (permissions.status !== 'granted') {
    Alert.alert(
      getLocalizedText('Hi there'),
      getLocalizedText('We need permissions for recording audio'),
      [{
        text: getLocalizedText('Give permissions'),
        onPress: Audio.requestPermissionsAsync,
      }],
      { cancelable: false },
    );
  }
};

const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  React.useEffect(() => {
    checkPermissions();
  }, []);

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <Store>
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
      </SafeAreaProvider>
    </Store>
  );
};

export default App;
