import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from '../locales/en/translation.json';
import hiTranslations from '../locales/hi/translation.json';
import guTranslations from '../locales/gu/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      hi: { translation: hiTranslations },
      gu: { translation: guTranslations }
    },
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already safes from XSS
    },
    compatibilityJSON: 'v4', // For React Native
    react: {
      useSuspense: false // For React Native compatibility
    }
  });

export default i18n;