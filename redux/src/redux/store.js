import { configureStore } from '@reduxjs/toolkit';
import { todosReducer } from './TodoListSlice';
import { settingsReducer } from './settingsSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    settings: settingsReducer,
  },
});
