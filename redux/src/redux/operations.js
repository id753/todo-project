import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const fetchData = createAsyncThunk(
  'todos/fetchAllTodos',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/todos');
      return response.data.data.todos;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTodoThunk = createAsyncThunk(
  'todos/deleteTodo',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/todos/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addTodoThunk = createAsyncThunk(
  'todos/addTodo',
  async (body, thunkAPI) => {
    try {
      const response = await axios.post('/todos', body);
      const updatedTodo = response.data.data || response.data;
      return updatedTodo;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editTodoThunk = createAsyncThunk(
  'todos/editTodo',
  async (body, thunkAPI) => {
    try {
      const { id, ...data } = body;
      const response = await axios.patch(`/todos/${id}`, data);
      const updatedTodo = response.data.data || response.data;
      return updatedTodo;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
export const toggleCompleteThunk = createAsyncThunk(
  'todos/toggleComplete',
  async (todo, thunkAPI) => {
    try {
      const response = await axios.patch(`/todos/${todo.id}`, {
        completed: todo.completed,
      });
      const updatedTodo = response.data.data || response.data;
      return updatedTodo;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const toggleFavoriteThunk = createAsyncThunk(
  'todos/toggleFavorite',
  async (todo, thunkAPI) => {
    try {
      const response = await axios.patch(`/todos/${todo.id}`, {
        isFavorite: todo.isFavorite,
      });
      const updatedTodo = response.data.data || response.data;
      return updatedTodo;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
