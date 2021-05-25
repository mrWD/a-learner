import * as React from 'react';

import { Platform } from 'react-native';
import { AdMobBanner, AdMobInterstitial } from 'expo-ads-admob';

import * as AdIdsConstants from '../constants/AdIds';

const adUnitID = Platform.OS === 'ios'
  ? AdIdsConstants.IOS_UNIT_ID
  : AdIdsConstants.ANDROID_UNIT_ID;
const adMobInterstitialId = Platform.OS === 'ios'
  ? AdIdsConstants.IOS_INTERSTITIAL_ID
  : AdIdsConstants.ANDROID_INTERSTITIAL_ID;

export const setMobInterstitial = () => {
  React.useEffect(() => {
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

export const ConfiguredAdMobBanner = () => (
  <AdMobBanner
    bannerSize="banner"
    adUnitID={adUnitID}
    servePersonalizedAds
    onDidFailToReceiveAdWithError={console.error}
  />
);
