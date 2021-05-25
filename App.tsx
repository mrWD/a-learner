import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import { AdMobBanner } from 'expo-ads-admob';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';

import Navigation from './navigation';

import { Store } from './store';

const ANDROID_UNIT_ID = 'ca-app-pub-9068470363255705/6926520094';
const IOS_UNIT_ID = 'ca-app-pub-9068470363255705/7730667000';

const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const adUnitID = Platform.OS === 'ios' ? IOS_UNIT_ID : ANDROID_UNIT_ID;

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <Store>
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />

        <AdMobBanner
          bannerSize="banner"
          adUnitID={adUnitID}
          servePersonalizedAds
          onDidFailToReceiveAdWithError={console.error}
        />
      </SafeAreaProvider>
    </Store>
  );
};

export default App;
