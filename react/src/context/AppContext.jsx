import React, { createContext, useEffect, useState } from 'react';
import i18n from '../dictionary/i18n';

export const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const toggleTheme = () => {
    setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
  };
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme === 'dark' ? 'dark_theme' : '';
  }, [theme]);

  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');
  const toggleLang = () => {
    setLang(currentLang => (currentLang === 'en' ? 'uk' : 'en'));
  };
  useEffect(() => {
    i18n.changeLanguage(lang); //!
    localStorage.setItem('lang', lang);
  }, [lang]);
  return (
    <AppContext.Provider value={{ theme, toggleTheme, lang, toggleLang }}>
      {children}
    </AppContext.Provider>
  );
};
