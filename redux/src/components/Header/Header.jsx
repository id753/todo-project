import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  selectLanguage,
  selectTheme,
  toggleLang,
  toggleTheme,
} from '../../redux/settingsSlice';
import { MoonIcon, SunIcon } from '../Icons/ActionIcons';

const buttonToggle =
  'border-none bg-(--color-utility) text-(--color-white) size-[30px] p-[2px] rounded-[8px] cursor-pointer text-[12px] font-semibold font-(--font-main) transition-colors  transition-(--transition) hover:bg-(--color-utility-hover)';

const Header = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const theme = useSelector(selectTheme);
  const language = useSelector(selectLanguage);

  return (
    <header className="flex w-full max-w-[800px] items-center justify-between">
      <a
        href="./index.html"
        className="decoration-none mr-auto ml-auto flex items-center gap-[5px]"
      >
        <img
          src="/undraw_add-notes_9xls-removebg-preview2.png"
          width="50"
          alt="Todo List logo"
        />

        <h1 className="mr-auto ml-auto text-center text-[28px] font-bold text-(--color-text)">
          {t('title')}
        </h1>
      </a>

      <div className="flex gap-[5px]">
        <button
          className={buttonToggle}
          onClick={() => dispatch(toggleTheme())}
          type="button"
        >
          {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>
        <button
          className={buttonToggle}
          onClick={() => dispatch(toggleLang())}
          type="button"
        >
          {language === 'en' ? 'УКР' : 'EN'}
        </button>
      </div>
    </header>
  );
};

export default Header;
