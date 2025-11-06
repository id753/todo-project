import { createSlice } from '@reduxjs/toolkit';

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
      state.language = state.language === 'EN' ? 'УКР' : 'EN';
    },
  },
});

export const settingsReducer = settingsSlice.reducer;

export const { toggleTheme, toggleLang } = settingsSlice.actions;

export const selectTheme = state => state.settings.theme;
export const selectLanguage = state => state.settings.language;
