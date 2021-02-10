import Cookies from 'universal-cookie';

import AccountTexts from '@/i18n/AccountTexts';
import CoreTexts from '@/i18n/CoreTexts';
import EventTexts from '@/i18n/EventTexts';
import SettingsTexts from '@/i18n/SettingsTexts';

const getText = (type, text) => {
  const cookies = new Cookies();

  let locale = cookies.get(CoreTexts['en-us'].LOCALE);

  if (locale === undefined) {
    locale = 'en-us';
  }

  const defaultText = 'No text found';

  if (type !== 'ACCOUNT' && type !== 'EVENT' && type !== 'SETTINGS') {
    return defaultText;
  }

  let localeText = '';

  if (type === 'ACCOUNT') {
    localeText = AccountTexts[locale][text];
  } else if (type === 'EVENT') {
    localeText = EventTexts[locale][text];
  } else if (type === 'SETTINGS') {
    localeText = SettingsTexts[locale][text];
  }

  if (localeText === undefined) {
    return defaultText;
  }

  return localeText;
};

export default getText;
