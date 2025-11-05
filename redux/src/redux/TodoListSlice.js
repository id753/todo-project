import React from 'react';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [
    {
      id: '150ac32b-2ede-4c10-a121-8e127d50b725',
      title: 'Связать шарф',
      completed: true,
      isFavorite: false,
    },
  ],
  //   filter: '',
};

const slice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addNewTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(item => item.id !== action.payload);
    },
    toggleComplete: (state, action) => {
      const item = state.todos.find(item => {
        return item.id === action.payload;
      });
      item.completed = !item.completed;
    },
    toggleFavorite: (state, action) => {
      const item = state.todos.find(item => {
        // console.log(action.payload.id);

        return item.id === action.payload;
      });
      item.isFavorite = !item.isFavorite;
    },
    editTodo: (state, action) => {
      const item = state.todos.find(item => {
        return item.id === action.payload.id;
      });
      item.title = action.payload.title;
    },
  },
});

export const todosReducer = slice.reducer;

export const {
  deleteTodo,
  addNewTodo,
  toggleComplete,
  toggleFavorite,
  editTodo,
} = slice.actions;

export const selectTodos = state => state.todos.todos;
