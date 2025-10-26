import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { dictionary } from './dictionary';

//  формат, который использует i18next
const resources = {
  uk: {
    translation: dictionary.uk, // Ключ 'translation' — стандарт для i18next
  },
  en: {
    translation: dictionary.en,
  },
};

i18n.use(initReactI18next).init({
  resources, // Используем наши ресурсы
  lng: 'en', // Язык по умолчанию, который будет соответствовать вашему начальному состоянию
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // Разрешаем HTML (например, в footerText)
  },
});

export default i18n;
