import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import { MoonIcon, SunIcon } from '../components/Icons/ActionIcons';
import s from './Header.module.css';

const Header = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme, lang, toggleLang } = useContext(AppContext);
  return (
    <header className={s.header}>
      <a className={s.title_container} href="./index.html">
        <img
          src="/undraw_add-notes_9xls-removebg-preview2.png"
          className={s.icon}
          width="50"
          alt="Todo List logo"
        />

        <h1 className={s.title}>{t('title')}</h1>
      </a>

      <div className={s.toggle_group}>
        <button onClick={toggleTheme} type="button" className={s.theme_toggle}>
          {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>
        <button onClick={toggleLang} type="button" className={s.lang_toggle}>
          {lang === 'en' ? 'УКР' : 'EN'}
        </button>
      </div>
    </header>
  );
};

export default Header;
