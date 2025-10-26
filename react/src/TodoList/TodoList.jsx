import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TodoItem from './TodoItem';
import todosData from './../assets/db.json';
import {
  createTodo,
  fetchData,
  deleteTodoApi,
  favoriteTodoApi,
  completedTodoApi,
  editTodoApi,
} from '../services/api';
import s from '../TodoList/TodoList.module.css';

const TodoList = () => {
  const { t } = useTranslation();

  const FILTER_STATUS_KEY = 'filterStatus';
  const SEARCH_QUERY_KEY = 'SearchQuery';

  const [todos, setTodos] = useState([]);
  const [newValue, setNewValue] = useState('');
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem(SEARCH_QUERY_KEY) || ''
  );
  const [filterStatus, setFilterStatus] = useState(
    localStorage.getItem(FILTER_STATUS_KEY) || 'all'
  );

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const serverTodos = await fetchData();
        if (serverTodos && serverTodos.length > 0) {
          setTodos(serverTodos);
          return;
        }
        if (todosData) {
          setTodos(todosData);
          //   Одновременно сохраняем дефолтные данные на сервер
          for (const todo of todosData) {
            await createTodo(todo);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    loadTodos();
  }, []);

  useEffect(() => {
    localStorage.setItem(SEARCH_QUERY_KEY, searchQuery);
    localStorage.setItem(FILTER_STATUS_KEY, filterStatus);
  }, [searchQuery, filterStatus]);

  const handleSubmit = e => {
    e.preventDefault();
    addNewTodo();
  };
  const handleSearchSubmit = e => {
    e.preventDefault();
  };
  const filteredTodos = todos.filter(item => {
    const searchValue = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    //   const matchesStatus =
    //     filterStatus === 'all' ||
    //     (filterStatus === 'complete' && item.completed) ||
    //     (filterStatus === 'incomplete' && !item.completed) ||
    //     (filterStatus === 'favorite' && item.isFavorite);
    let searchStatus = true;
    switch (filterStatus) {
      case 'complete':
        searchStatus = item.completed === true;
        break;
      case 'incomplete':
        searchStatus = item.completed === false;
        break;
      case 'favorite':
        searchStatus = item.isFavorite === true;
        break;
      case 'all':
      default:
        searchStatus = true;
        break;
    }
    return searchValue && searchStatus;
  });

  const deleteTodo = async id => {
    try {
      await deleteTodoApi(id);
      setTodos(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const addNewTodo = async () => {
    if (!newValue.trim()) return;

    const newTodo = {
      id: crypto.randomUUID(),
      title: newValue,
      completed: false,
      isFavorite: false,
    };

    try {
      const saveTodo = await createTodo(newTodo);
      setTodos(prev => [...prev, saveTodo]);
      setNewValue('');
    } catch (error) {
      console.error(error);
    }
  };

  const toggleFavorite = async id => {
    const todoUpdate = todos.find(todo => todo.id === id);
    if (!todoUpdate) return;
    const newFavoriteStatus = !todoUpdate.isFavorite;
    try {
      await favoriteTodoApi(id, newFavoriteStatus);
      setTodos(prev =>
        prev.map(todo =>
          todo.id === id ? { ...todo, isFavorite: newFavoriteStatus } : todo
        )
      );
    } catch (error) {
      console.log(error);
    }
  };
  const toggleComplete = async id => {
    const todoUpdate = todos.find(todo => todo.id === id);
    if (!todoUpdate) return;
    const newCompletedStatus = !todoUpdate.completed;
    try {
      await completedTodoApi(id, newCompletedStatus);
      setTodos(prev =>
        prev.map(todo =>
          todo.id === id ? { ...todo, completed: newCompletedStatus } : todo
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const editTodo = async (id, newTitle) => {
    if (!newTitle.trim()) return;
    try {
      await editTodoApi(id, newTitle.trim());
      setTodos(prev =>
        prev.map(todo =>
          todo.id === id ? { ...todo, title: newTitle.trim() } : todo
        )
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={s.wrapper}>
      <form onSubmit={handleSubmit} className={s.todoForm}>
        <input
          onChange={e => setNewValue(e.target.value)}
          value={newValue}
          name="todo"
          placeholder={t('addPlaceholder')}
          required
          className={s.input_form}
        />
        <button type="submit" className={s.button_form}>
          {t('addButton')}
        </button>
      </form>

      <form onSubmit={handleSearchSubmit} className={s.todoForm}>
        <input
          // 3 filter
          onChange={e => setSearchQuery(e.target.value)}
          value={searchQuery}
          placeholder={t('searchPlaceholder')}
          name="search"
          className={s.input_form}
        />
        <select
          // 3 filter
          onChange={e => setFilterStatus(e.target.value)}
          value={filterStatus}
          type="text"
          name="select"
          className={s.select}
        >
          <option value="all">{t('optionAll')}</option>
          <option value="complete">{t('optionComplete')}</option>
          <option value="incomplete">{t('optionIncomplete')}</option>
          <option value="favorite">{t('optionFavorite')}</option>
        </select>
      </form>
      {/* Если filteredTodos пуст */}
      {filteredTodos.length === 0 && (
        <li className={s.list_item_empty}>
          <div className={s.image_container}>
            <img
              src="./public/undraw_completed-tasks_1j9z-removebg-preview.png"
              className={s.img_empty}
              width="120"
              alt=""
            />
            <h2 className={s.empty_message}>{t('emptyMessage')}</h2>
          </div>
        </li>
      )}
      {filteredTodos.length > 0 && (
        <ul className={s.list}>
          {filteredTodos.map(item => (
            <TodoItem
              key={item.id}
              {...item}
              onDeleteTodo={deleteTodo}
              onToggleFavorite={toggleFavorite}
              onToggleComplete={toggleComplete}
              onEditTodo={editTodo}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
