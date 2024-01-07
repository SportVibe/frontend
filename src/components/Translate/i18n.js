import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import es from './es.json';
import de  from './de.json';


const resources = {
  en: { translation: en },
  es: { translation: es },
  de: { translation: de },
  
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es', 
    fallbackLng: 'es', 
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;