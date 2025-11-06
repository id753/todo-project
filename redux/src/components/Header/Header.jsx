import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLanguage,
  selectTheme,
  toggleLang,
  toggleTheme,
} from '../../redux/settingsSlice';
import { MoonIcon, SunIcon } from '../Icons/ActionIcons';

const Header = () => {
  const dispatch = useDispatch();

  const theme = useSelector(selectTheme);
  const language = useSelector(selectLanguage);

  return (
    <header>
      <a href="./index.html">
        <img
          src="/undraw_add-notes_9xls-removebg-preview2.png"
          width="50"
          alt="Todo List logo"
        />

        <h1>todo list</h1>
      </a>

      <div>
        <button onClick={() => dispatch(toggleTheme())} type="button">
          {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>
        <button onClick={() => dispatch(toggleLang())} type="button">
          {language === 'en' ? 'УКР' : 'EN'}
        </button>
      </div>
    </header>
  );
};

export default Header;
