import { createI18n } from 'vue-i18n';
import elementRuMessage from 'element-plus/lib/locale/lang/ru';
import elementEnMessage from 'element-plus/lib/locale/lang/en';

import defaultSettings from '@/settings';
import ru from '@/lang/ru';
import en from '../lang/en';

const { defaultLanguage, fallbackLanguage } = defaultSettings;

// const messages = {} as Record<string, any>;
// languages.forEach((l) => {
//   messages[l.value] = {};
// });
const messages = {
  ru: {
    ...ru,
    ...elementRuMessage,
  },
  en: {
    ...en,
    ...elementEnMessage,
  },
};

const i18n = createI18n({
  locale: defaultLanguage, // set locale
  fallbackLocale: fallbackLanguage,
  messages, // set locale messages
  silentTranslationWarn: true,
  silentFallbackWarn: true, // process.env.NODE_ENV === 'production',
});

export default i18n;
