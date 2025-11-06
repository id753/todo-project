import React from 'react';
import { createSlice } from '@reduxjs/toolkit';
import {
  addTodoThunk,
  deleteTodoThunk,
  editTodoThunk,
  fetchData,
} from './operations';

const initialState = {
  todos: [
    // {
    //   id: '150ac32b-2ede-4c10-a121-8e127d50b725',
    //   title: 'Связать шарф',
    //   completed: true,
    //   isFavorite: false,
    // },
  ],
  filter: '',
  filterByStatus: 'all',
  // добавить лоадинг,ерор позже
};

const slice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addNewTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    // deleteTodo: (state, action) => {
    //   state.todos = state.todos.filter(item => item.id !== action.payload);
    // },
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
        // console.log(action.payload);
        return item.id === action.payload.id;
      });
      item.title = action.payload.title;
    },
    changeFilter: (state, action) => {
      state.filter = action.payload;
    },
    filterStatus: (state, action) => {
      state.filterByStatus = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      // add rej pend with load err
      .addCase(deleteTodoThunk.fulfilled, (state, action) => {
        state.todos = state.todos.filter(item => item.id !== action.payload.id);
      })
      .addCase(addTodoThunk.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(editTodoThunk.fulfilled, (state, action) => {
        const item = state.todos.find(item => {
          return item.id === action.payload.id;
        });
        item.title = action.payload.title;
      });
  },
});

export const todosReducer = slice.reducer;

export const {
  deleteTodo,
  addNewTodo,
  toggleComplete,
  toggleFavorite,
  editTodo,
  changeFilter,
  filterStatus,
} = slice.actions;

export const selectTodos = state => state.todos.todos;
export const selectFilter = state => state.todos.filter;
export const selectFilterByStatus = state => state.todos.filterByStatus;
