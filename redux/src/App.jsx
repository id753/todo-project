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
    <div className="flex min-h-screen flex-col items-center gap-[35px] px-5 pt-[35px]">
      <Header />
      <TodoList />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

export default App;
