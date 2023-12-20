import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import sp from './sp.json';
import ger  from './ger.json';


const resources = {
  en: { translation: en },
  sp: { translation: sp },
  ger: { translation: ger },
  
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'sp', 
    fallbackLng: 'en', 
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;