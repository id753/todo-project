import React, { useEffect } from 'react';
import AddForm from './AddForm';
import SearchBar from './SearchBar';
import List from './List';
import { useDispatch } from 'react-redux';
import { fetchData } from '../../redux/operations';

const TodoList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  return (
    <div>
      <AddForm />
      <SearchBar />
      <List />
    </div>
  );
};

export default TodoList;
