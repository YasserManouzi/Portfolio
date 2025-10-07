// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Nos fichiers de traduction
import translationEN from './locales/en/translation.json';
import translationFR from './locales/fr/translation.json';

const resources = {
  en: {
    translation: translationEN
  },
  fr: {
    translation: translationFR
  }
};

i18n
  .use(initReactI18next) // Passe i18n à react-i18next
  .use(LanguageDetector) // Détecte la langue de l'utilisateur
  .init({
    resources,
    fallbackLng: 'fr', // Langue par défaut si la langue détectée n'est pas disponible
    interpolation: {
      escapeValue: false // React s'occupe déjà de la protection contre XSS
    },
    detection: {
      // Ordre de détection : 1. localStorage, 2. navigateur
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;