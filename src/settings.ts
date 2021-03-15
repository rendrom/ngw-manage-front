import { getLanguage } from '@/utils/storage';

const localSettings = {};
// if (process.env.NODE_ENV === 'development') {
//   try {
//     localSettings = require('../settings.json');
//   } catch {
//     //
//   }
// }

const defaultSettings = {
  title: 'NextGIS Sense',

  defaultLanguage: getLanguage() || 'ru',
  fallbackLanguage: 'en',
  languages: [
    {
      value: 'en',
      label: 'EN',
    },
    {
      value: 'ru',
      label: 'RU',
    },
  ],
};

export default { ...defaultSettings, ...localSettings };
