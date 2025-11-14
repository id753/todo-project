import axios from 'axios';
import { Todo } from '../types';

axios.defaults.baseURL = 'http://localhost:3000';

export const fetchData = async (): Promise<Todo[]> => {
  const { data } = await axios.get<Todo[]>('/todos');
  return data;
};

export const createTodo = async (newTodo: Todo): Promise<Todo> => {
  const response = await axios.post<Todo>('/todos', newTodo);
  return response.data;
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
