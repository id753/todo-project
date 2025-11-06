import React from 'react';
import Item from './Item';
import { useSelector } from 'react-redux';
import {
  selectFilter,
  selectFilterByStatus,
  selectTodos,
} from '../../redux/TodoListSlice';

const List = () => {
  const todos = useSelector(selectTodos);
  const filter = useSelector(selectFilter);
  const filterByStatus = useSelector(selectFilterByStatus);

  const filteredData = todos.filter(item =>
    item.title.toLowerCase().includes(filter.toLowerCase())
  );

  const getSortedData = () => {
    switch (filterByStatus) {
      case 'complete':
        return filteredData.filter(item => item.completed === true);
      case 'incomplete':
        return filteredData.filter(item => item.completed === false);
      case 'favorite':
        return filteredData.filter(item => item.isFavorite === true);
      default:
        return filteredData;
    }
  };
  return (
    <ul>
      {getSortedData().map(item => (
        <Item {...item} key={item.id} />
      ))}
    </ul>
  );
};

export default List;
