import { createSlice } from '@reduxjs/toolkit';
import i18n from '../dictionary/i18n.jsx';

const initialState = {
  theme: 'light',
  language: 'en',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleTheme: (state, action) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    toggleLang: (state, action) => {
      state.language = state.language === 'en' ? 'uk' : 'en';
      i18n.changeLanguage(state.language); // синхронизация с i18next
    },
  },
});

export const settingsReducer = settingsSlice.reducer;

export const { toggleTheme, toggleLang } = settingsSlice.actions;

export const selectTheme = state => state.settings.theme;
export const selectLanguage = state => state.settings.language;
