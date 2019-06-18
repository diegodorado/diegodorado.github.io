import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector"

import en from "../translations/en.json"
import es from "../translations/es.json"
import quotes from "../data/quotes.json"


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    quotes : quotes,
    resources: { en, es },
    fallbackLng: 'en',
    whitelist: ['en','es'],
    debug: true,
    load: 'languageOnly',
    saveMissing: true,
    updateMissing: true,
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;
