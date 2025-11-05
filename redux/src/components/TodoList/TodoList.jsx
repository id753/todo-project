import React from 'react';
import AddForm from './AddForm';
import SearchBar from './SearchBar';
import List from './List';
const TodoList = () => {
  return (
    <div>
      <AddForm />
      <SearchBar />
      <List />
    </div>
  );
};

export default TodoList;
