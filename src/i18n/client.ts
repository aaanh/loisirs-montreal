import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { defaultLanguage, defaultNS, resources } from "./resources";

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: defaultLanguage,
    fallbackLng: defaultLanguage,
    defaultNS,
    initAsync: false,
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
  });
}

export default i18n;
