
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

import * as textGroups from '../constants/TextGroups';

i18n.defaultLocale = 'en';
i18n.locale = Localization.locale?.split('-')[0];
i18n.fallbacks = true;
i18n.translations = {
  en: textGroups.ENGLISH_GROUP,
  ru: textGroups.RUSSIAN_GROUP,
  pl: textGroups.POLISH_GROUP,
  it: textGroups.ITALIAN_GROUP,
  de: textGroups.GERMAN_GROUP,
  es: textGroups.SPANISH_GROUP,
  fr: textGroups.FRENCH_GROUP,
};

export const getLocalisedText = (text: string) => i18n.t(text);
