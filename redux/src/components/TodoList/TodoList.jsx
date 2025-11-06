import React, { useEffect } from 'react';
import AddForm from './AddForm';
import SearchBar from './SearchBar';
import List from './List';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../redux/operations';
import { selectIsError, selectIsLoading } from '../../redux/TodoListSlice';

const TodoList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const isError = useSelector(selectIsError);
  const isLoading = useSelector(selectIsLoading);

  return (
    <div>
      <AddForm />
      <SearchBar />
      <List />

      {isError && <h2>Something went wrong!</h2>}
      {isLoading && <h2>Loading...</h2>}
    </div>
  );
};

export default TodoList;
