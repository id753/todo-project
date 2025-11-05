import React from 'react';
import Item from './Item';
import { useSelector } from 'react-redux';
import { selectTodos } from '../../redux/TodoListSlice';

const List = () => {
  const todos = useSelector(selectTodos);
  return (
    <ul>
      {todos.map(item => (
        <Item {...item} key={item.id} />
      ))}
    </ul>
  );
};

export default List;
