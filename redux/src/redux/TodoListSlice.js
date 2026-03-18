import React from 'react';
import { createSlice } from '@reduxjs/toolkit';
import { toast } from '../utils/toast';
import i18next from 'i18next';
import {
  addTodoThunk,
  deleteTodoThunk,
  editTodoThunk,
  fetchData,
  toggleCompleteThunk,
  toggleFavoriteThunk,
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

  isLoading: false,
  isError: null,
};

const slice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // addNewTodo: (state, action) => {
    //   state.todos.push(action.payload);
    // },
    // deleteTodo: (state, action) => {
    //   state.todos = state.todos.filter(item => item.id !== action.payload);
    // },
    // toggleComplete: (state, action) => {
    //   const item = state.todos.find(item => {
    //     return item.id === action.payload;
    //   });
    //   item.completed = !item.completed;
    // },
    // toggleFavorite: (state, action) => {
    //   const item = state.todos.find(item => {
    //      console.log(action.payload.id);

    //     return item.id === action.payload;
    //   });
    //   item.isFavorite = !item.isFavorite;
    // },
    editTodo: (state, action) => {
      const item = state.todos.find(item => {
        // console.log(action.payload);
        return item.id === action.payload.id;
      });
      if (item) {
        item.title = action.payload.title;
      }
    },
    changeFilter: (state, action) => {
      state.filter = action.payload;
    },
    filterStatus: (state, action) => {
      state.filterByStatus = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.isError = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchData.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isError = action.payload;
        state.isLoading = false;
      })

      .addCase(deleteTodoThunk.fulfilled, (state, action) => {
        state.todos = state.todos.filter(item => item.id !== action.payload);
        toast.success(i18next.t('deleteSuccess'));
      })
      .addCase(addTodoThunk.fulfilled, (state, action) => {
        state.todos.push(action.payload);
        toast.success(i18next.t('addSuccess'));
      })
      .addCase(editTodoThunk.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          item => item.id === action.payload.id
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
        toast.success(i18next.t('editSuccess'));
      })
      .addCase(toggleCompleteThunk.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          item => item.id === action.payload.id
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
        toast.success(i18next.t('completeSuccess'));
      })
      .addCase(toggleFavoriteThunk.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          item => item.id === action.payload.id
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
        toast.success(i18next.t('favoriteSuccess'));
      })
      //  Универсальные матчеры для ВСЕХ Thunks
      .addMatcher(
        action => action.type.endsWith('/pending'),
        state => {
          state.isLoading = true;
          state.isError = null;
        }
      )
      .addMatcher(
        action => action.type.endsWith('/fulfilled'),
        state => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        (state, action) => {
          state.isLoading = false;
          state.isError = action.payload;
          toast.error(i18next.t('networkError'));
        }
      );
    // .addCase(toggleCompleteThunk.rejected, (state, action) => {
    //   state.isError = action.payload;
    // })
    // .addCase(toggleFavoriteThunk.rejected, (state, action) => {
    //   state.isError = action.payload;
    //   toast.error(i18next.t('favoriteError'));
    // });
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
  setLoading,
  setError,
} = slice.actions;

export const selectTodos = state => state.todos.todos || [];
export const selectFilter = state => state.todos.filter;
export const selectFilterByStatus = state => state.todos.filterByStatus;

export const selectIsLoading = state => state.todos.isLoading;
export const selectIsError = state => state.todos.isError;
