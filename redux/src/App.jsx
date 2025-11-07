import { useEffect, useState } from 'react';
import i18n from './dictionary/i18n';

import './App.css';
import Header from './components/Header/Header';
import TodoList from './components/TodoList/TodoList';
import Footer from './components/Footer/Footer';
import ScrollToTopButton from './components/ScrollToTopButton/ScrollToTopButton';
import { useSelector } from 'react-redux';
import { selectLanguage, selectTheme } from './redux/settingsSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectLanguage, selectTheme } from './redux/settingsSlice';

function App() {
  const lang = useSelector(selectLanguage);
  const theme = useSelector(selectTheme);

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark_theme' : '';
  }, [theme]);

  return (
    <div className="app">
      <Header />
      <TodoList />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

export default App;
