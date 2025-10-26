import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';
export const fetchData = async () => {
  const { data } = await axios.get('/todos');
  return data;
};

export const createTodo = async newTodo => {
  const response = await axios.post('/todos', newTodo);
  return response.data;
};

export const deleteTodoApi = async id => {
  await axios.delete(`/todos/${id}`);
};

export const favoriteTodoApi = async (id, newFavoriteStatus) => {
  await axios.patch(`/todos/${id}`, {
    isFavorite: newFavoriteStatus,
  });
};

export const completedTodoApi = async (id, newCompletedStatus) => {
  await axios.patch(`/todos/${id}`, {
    completed: newCompletedStatus,
  });
};

export const editTodoApi = async (id, newTitle) => {
  await axios.patch(`/todos/${id}`, {
    title: newTitle,
  });
};
