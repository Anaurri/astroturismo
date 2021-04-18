import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  es: { translation: require('../utils/locales/es.json') },
  en: { translation: require('../utils/locales/en.json') },
};

export const initialize = () => {
  const browserLang = navigator.language || navigator.userLanguage;
  const lastConfiguredLang = localStorage.getItem('lng');
  i18n.use(initReactI18next).init({
    resources,
    lng: lastConfiguredLang || browserLang,
    fallbackLng: 'es',
  });
}
  

initialize();

export const changeLanguage = (lang) => {
  localStorage.setItem('lng', lang);
  i18n.changeLanguage(lang);
}
