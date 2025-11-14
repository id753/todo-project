import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
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
import { Todo } from '../types';

type FilterStatus = 'all' | 'complete' | 'incomplete' | 'favorite';

const TodoList = () => {
  const { t } = useTranslation();

  const FILTER_STATUS_KEY = 'filterStatus';
  const SEARCH_QUERY_KEY = 'SearchQuery';

  const [todos, setTodos] = useState<Todo[]>(todosData.todos || []);
  const [newValue, setNewValue] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>(
    localStorage.getItem(SEARCH_QUERY_KEY) || ''
  );
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(
    (localStorage.getItem(FILTER_STATUS_KEY) as FilterStatus) || 'all'
  );

  useEffect(() => {
    const loadTodos = async (): Promise<void> => {
      try {
        const serverTodos: Todo[] = await fetchData();
        if (serverTodos && serverTodos.length > 0) {
          setTodos(serverTodos);
          return;
        }
      } catch (error: unknown) {
        setTodos(todosData.todos as Todo[]);
        console.error(error);
      }
    };
    loadTodos();
  }, []);

  useEffect(() => {
    localStorage.setItem(SEARCH_QUERY_KEY, searchQuery);
    localStorage.setItem(FILTER_STATUS_KEY, filterStatus);
  }, [searchQuery, filterStatus]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    addNewTodo();
  };
  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };
  const filteredTodos = todos.filter(item => {
    const searchValue: boolean = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    //   const matchesStatus =
    //     filterStatus === 'all' ||
    //     (filterStatus === 'complete' && item.completed) ||
    //     (filterStatus === 'incomplete' && !item.completed) ||
    //     (filterStatus === 'favorite' && item.isFavorite);

    let searchStatus: boolean = true;
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

  const deleteTodo = async (id: string): Promise<void> => {
    setTodos(prev => prev.filter(item => item.id !== id));
    try {
      await deleteTodoApi(id);
    } catch (error: unknown) {
      console.error(error);
    }
  };

  const addNewTodo = async () => {
    if (!newValue.trim()) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: newValue,
      completed: false,
      isFavorite: false,
    };
    setTodos(prev => [...prev, newTodo]);
    setNewValue('');
    try {
      const saveTodo: Todo = await createTodo(newTodo);
    } catch (error: unknown) {
      console.error(error);
    }
  };

  const toggleFavorite = async (id: string) => {
    const todoUpdate = todos.find(todo => todo.id === id);
    if (!todoUpdate) return;
    const newFavoriteStatus = !todoUpdate.isFavorite;
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, isFavorite: newFavoriteStatus } : todo
      )
    );
    try {
      await favoriteTodoApi(id, newFavoriteStatus);
    } catch (error: unknown) {
      console.log(error);
    }
  };
  const toggleComplete = async (id: string) => {
    const todoUpdate = todos.find(todo => todo.id === id);
    if (!todoUpdate) return;
    const newCompletedStatus = !todoUpdate.completed;
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: newCompletedStatus } : todo
      )
    );
    try {
      await completedTodoApi(id, newCompletedStatus);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  const editTodo = async (id: string, newTitle: string) => {
    if (!newTitle.trim()) return;
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, title: newTitle.trim() } : todo
      )
    );
    try {
      await editTodoApi(id, newTitle.trim());
    } catch (error: unknown) {
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
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
          value={searchQuery}
          placeholder={t('searchPlaceholder')}
          name="search"
          className={s.input_form}
        />
        <select
          // 3 filter
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setFilterStatus(e.target.value as FilterStatus)
          }
          value={filterStatus}
          // type="text"
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
              src="/undraw_completed-tasks_1j9z-removebg-preview.png"
              className={s.img_empty}
              width="120"
              alt="No todos"
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
