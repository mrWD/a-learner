import * as React from 'react';
import Constants from 'expo-constants';
import { Platform, AppState, AppStateStatus, StyleSheet, View } from 'react-native';
import { AdMobBanner, AdMobInterstitial } from 'expo-ads-admob';

import * as AdIdsConstants from '../constants/AdIds';

const getAdIdList = () => {
  const isProd = Constants.isDevice && !__DEV__;
  const isIOS = Platform.OS === 'ios';

  if (!isProd) {
    return [AdIdsConstants.TEST_UNIT_ID, AdIdsConstants.TEST_INTERSTITIA_ID];
  }
  
  if (isIOS) {
    return [AdIdsConstants.IOS_UNIT_ID, AdIdsConstants.IOS_INTERSTITIAL_ID];
  }

  return [AdIdsConstants.ANDROID_UNIT_ID, AdIdsConstants.ANDROID_INTERSTITIAL_ID];
};

const [adUnitID, adMobInterstitialId] = getAdIdList();

export const setMobInterstitial = () => {
  React.useEffect(() => {
    if (AppState.currentState === 'background') {
      return;
    }

    (async () => {
      try {
        await AdMobInterstitial.setAdUnitID(adMobInterstitialId);
        await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
        await AdMobInterstitial.showAdAsync();
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);
};

export const ConfiguredAdMobBanner = () => {
  const appState = React.useRef(AppState.currentState);
  const [isAdBlockVisible, setisAdBlockVisible] = React.useState(appState.current !== 'background');

  const _handleAppStateChange = (nextAppState: AppStateStatus) => {
    appState.current = nextAppState;
    setisAdBlockVisible(appState.current !== 'background');
  };

  React.useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  return (
    <View style={styles.adBlock}>
      {isAdBlockVisible && (
        <AdMobBanner
          bannerSize="banner"
          adUnitID={adUnitID}
          servePersonalizedAds
          onDidFailToReceiveAdWithError={console.error}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  adBlock: {
    height: 50,
  },
});
