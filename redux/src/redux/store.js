import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import { todosReducer } from './TodoListSlice';
import { settingsReducer } from './settingsSlice';

const todosPersistConfig = {
  key: 'todos',
  storage,
  whitelist: ['filter', 'filterByStatus'],
};

const settingsPersistConfig = {
  key: 'settings',
  storage,
  whitelist: ['theme', 'language'],
};

const rootReducer = combineReducers({
  todos: persistReducer(todosPersistConfig, todosReducer),
  settings: persistReducer(settingsPersistConfig, settingsReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/FLUSH',
          'persist/PURGE',
          'persist/REGISTER',
        ],
      },
    }),
});
export const persistor = persistStore(store);
