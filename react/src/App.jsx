import { useEffect, useState } from 'react';
import i18n from './dictionary/i18n';
import './App.css';
import TodoList from './TodoList/TodoList';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import ScrollToTopButton from './components/ScrollToTopButton/ScrollToTopButton';

const App = () => {
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
    <div className="app">
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        lang={lang}
        toggleLang={toggleLang}
      />
      <TodoList />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default App;

// npm install react-i18next
