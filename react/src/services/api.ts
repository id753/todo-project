import axios from 'axios';
import { Todo, BackendResponse, CreateResponse } from '../types';

axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const fetchData = async (page = 1, search = ''): Promise<Todo[]> => {
  const response = await axios.get<BackendResponse>('/todos', {
    params: { page, search },
  });
  return response.data.data.todos;
};

export const createTodo = async (newTodo: Omit<Todo, 'id'>): Promise<Todo> => {
  const response = await axios.post('/todos', newTodo);
  const savedItem = response.data;
  return savedItem;
};

export const deleteTodoApi = async (id: string): Promise<void> => {
  await axios.delete(`/todos/${id}`);
};

export const favoriteTodoApi = async (
  id: string,
  newFavoriteStatus: boolean
): Promise<void> => {
  await axios.patch(`/todos/${id}`, {
    isFavorite: newFavoriteStatus,
  });
};

export const completedTodoApi = async (
  id: string,
  newCompletedStatus: boolean
): Promise<void> => {
  await axios.patch(`/todos/${id}`, {
    completed: newCompletedStatus,
  });
};

export const editTodoApi = async (
  id: string,
  newTitle: string
): Promise<void> => {
  await axios.patch(`/todos/${id}`, {
    title: newTitle,
  });
};
