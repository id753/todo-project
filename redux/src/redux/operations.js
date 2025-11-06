import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

export const fetchData = createAsyncThunk(
  'todos/fetchAllTodos',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/todos');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTodoThunk = createAsyncThunk(
  'todos/deleteTodo',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/todos/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addTodoThunk = createAsyncThunk(
  'todos/addTodo',
  async (body, thunkAPI) => {
    try {
      const response = await axios.post('todos', body);
      return response.data;
    } catch (error) {
      return thunkAPI.thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editTodoThunk = createAsyncThunk(
  'todos/editTodo',
  async (body, thunkAPI) => {
    try {
      const response = await axios.put(`/todos/${body.id}`, body);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const toggleCompleteThunk = createAsyncThunk(
  'todos/toggleComplete',
  async (body, thunkAPI) => {
    try {
      //   console.log('body:', body);
      await axios.put(`todos/${body.id}`, body);
      thunkAPI.dispatch(fetchData());
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const toggleFavoriteThunk = createAsyncThunk(
  'todos/toggleFavorite',
  async (body, thunkAPI) => {
    try {
      await axios.put(`todos/${body.id}`, body);
      thunkAPI.dispatch(fetchData());
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
