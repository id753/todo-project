import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Item from './Item';

import {
  selectFilter,
  selectFilterByStatus,
  selectTodos,
} from '../../redux/TodoListSlice';

const List = () => {
  const { t } = useTranslation();

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
      <ul>
        {getSortedData().length === 0 && (
          <li>
            <div>
              <img
                src="/undraw_completed-tasks_1j9z-removebg-preview.png"
                width="120"
                alt="No todos"
              />
              <h2>{t('emptyMessage')}</h2>
            </div>
          </li>
        )}

        {getSortedData().length > 0 &&
          getSortedData().map(item => <Item {...item} key={item.id} />)}
      </ul>
    </ul>
  );
};

export default List;
