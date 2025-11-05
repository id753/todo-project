import { configureStore } from '@reduxjs/toolkit';
import { todosReducer } from './TodoListSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});
