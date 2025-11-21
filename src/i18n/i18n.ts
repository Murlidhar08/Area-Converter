import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Languages
import enTranslation from "../locales/en/translation.ts";
import hiTranslation from "../locales/hi/translation.ts";
import guTranslation from "../locales/gu/translation.ts";

// Load saved language (fallback to English)
const savedLang = localStorage.getItem("app_language") || "en";

i18n.use(initReactI18next).init({
    lng: savedLang,
    fallbackLng: "en",
    resources: {
        en: { translation: enTranslation },
        hi: { translation: hiTranslation },
        gu: { translation: guTranslation },
    },
});

export default i18n;
