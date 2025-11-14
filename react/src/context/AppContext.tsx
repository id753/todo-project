import React, { createContext, FC, useEffect, useState } from 'react';
import i18n from '../dictionary/i18n';
import { AppContextType } from '../types';

interface AppProviderProps {
  children: React.ReactNode;
}

const initialContext: AppContextType = {
  theme: 'light',
  toggleTheme: () => {},
  lang: 'en',
  toggleLang: () => {},
};

export const AppContext = createContext<AppContextType>(initialContext);

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
  );
  const toggleTheme = () => {
    setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
  };
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme === 'dark' ? 'dark_theme' : '';
  }, [theme]);

  const [lang, setLang] = useState<'en' | 'uk'>(
    (localStorage.getItem('lang') as 'en' | 'uk') || 'en'
  );
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
