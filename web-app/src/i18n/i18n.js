import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import fr from './fr.json';

const resources = {
  en: { translation: en },
  fr: { translation: fr },
};

export const defaultLanguage = 'en';

i18n.use(initReactI18next).init({
  resources: resources,
  lng: defaultLanguage,
  fallbackLng: defaultLanguage,
  interpolation: {
    escapeValue: false,
  },
});

export const languages = { English: 'en', French: 'fr' };

export default i18n;
