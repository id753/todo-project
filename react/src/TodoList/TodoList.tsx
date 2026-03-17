import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TodoItem from './TodoItem';
import {
  createTodo,
  fetchData,
  deleteTodoApi,
  favoriteTodoApi,
  completedTodoApi,
  editTodoApi,
} from '../services/api';
import s from '../TodoList/TodoList.module.css';
import { Todo, TodoCreateInput } from '../types';
import { toast } from '../utils/toast';

/**
 * Типизация возможных статусов фильтрации
 */
type FilterStatus = 'all' | 'complete' | 'incomplete' | 'favorite';

const TodoList = () => {
  const { t } = useTranslation();

  // Константы для ключей localStorage, чтобы избежать опечаток
  const FILTER_STATUS_KEY = 'filterStatus';
  const SEARCH_QUERY_KEY = 'SearchQuery';

  // --- STATE ---
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newValue, setNewValue] = useState<string>('');

  // Инициализация состояний значениями из localStorage
  const [searchQuery, setSearchQuery] = useState<string>(
    localStorage.getItem(SEARCH_QUERY_KEY) || ''
  );
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(
    (localStorage.getItem(FILTER_STATUS_KEY) as FilterStatus) || 'all'
  );

  // --- EFFECTS ---

  /** Загрузка данных при первом рендере */
  useEffect(() => {
    const loadTodos = async (): Promise<void> => {
      try {
        const serverTodos: Todo[] = await fetchData();
        if (serverTodos && serverTodos.length > 0) {
          setTodos(serverTodos);
        }
      } catch (error: unknown) {
        console.error('Fetch error:', error);
        toast.error(t('networkError'));
      }
    };
    loadTodos();
  }, [t]);

  /** Синхронизация фильтров с localStorage при их изменении */
  useEffect(() => {
    localStorage.setItem(SEARCH_QUERY_KEY, searchQuery);
    localStorage.setItem(FILTER_STATUS_KEY, filterStatus);
  }, [searchQuery, filterStatus]);

  // --- HANDLERS ---

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    addNewTodo();
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault(); // Предотвращаем перезагрузку при поиске
  };

  /** * Вычисляемое значение: фильтрация и поиск.
   * Выполняется при каждом рендере на основе текущих todos и фильтров.
   */
  const filteredTodos = todos.filter(item => {
    if (!item) return false;

    // Поиск по названию (регистронезависимый)
    const matchesSearch: boolean = (item.title || '')
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // Фильтрация по статусу
    let matchesStatus: boolean = true;
    switch (filterStatus) {
      case 'complete':
        matchesStatus = item.completed === true;
        break;
      case 'incomplete':
        matchesStatus = item.completed === false;
        break;
      case 'favorite':
        matchesStatus = item.isFavorite === true;
        break;
      case 'all':
      default:
        matchesStatus = true;
        break;
    }
    return matchesSearch && matchesStatus;
  });

  // --- API ACTIONS (с применением Optimistic UI) ---

  /** Удаление заметки */
  const deleteTodo = async (id: string): Promise<void> => {
    const todoToRestore = todos.find(item => item.id === id);

    // 1. Оптимистичное удаление из UI
    setTodos(prev => prev.filter(item => item.id !== id));

    try {
      await deleteTodoApi(id);
      toast.success(t('deleteSuccess'));
    } catch (error: unknown) {
      console.error(error);
      toast.error(t('deleteError'));
      // 2. Откат: возвращаем заметку, если сервер ответил ошибкой
      if (todoToRestore) {
        setTodos(prev => [...prev, todoToRestore]);
      }
    }
  };

  /** Добавление новой заметки */
  const addNewTodo = async () => {
    if (!newValue.trim()) return;

    const newTodo: TodoCreateInput = {
      title: newValue,
      completed: false,
      isFavorite: false,
    };

    try {
      const saveTodo: Todo = await createTodo(newTodo);
      setTodos(prev => [...prev, saveTodo]);
      setNewValue('');
      toast.success(t('addSuccess'));
    } catch (error: unknown) {
      console.error(error);
      toast.error(t('addError'));
    }
  };

  /** Переключение статуса "Избранное" */
  const toggleFavorite = async (id: string) => {
    const todoUpdate = todos.find(todo => todo.id === id);
    if (!todoUpdate) return;

    const newFavoriteStatus = !todoUpdate.isFavorite;

    // Оптимистичное обновление
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, isFavorite: newFavoriteStatus } : todo
      )
    );

    try {
      await favoriteTodoApi(id, newFavoriteStatus);
      toast.success(t('favoriteSuccess'));
    } catch (error: unknown) {
      console.error(error);
      toast.error(t('favoriteError'));
      // Откат к предыдущему значению
      setTodos(prev =>
        prev.map(todo =>
          todo.id === id ? { ...todo, isFavorite: !newFavoriteStatus } : todo
        )
      );
    }
  };

  /** Переключение статуса выполнения */
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
      toast.success(t('completeSuccess'));
    } catch (error: unknown) {
      console.error(error);
      toast.error(t('completeError'));

      setTodos(prev =>
        prev.map(todo =>
          todo.id === id ? { ...todo, completed: !newCompletedStatus } : todo
        )
      );
    }
  };

  /** Редактирование текста заметки */
  const editTodo = async (id: string, newTitle: string) => {
    const trimmedTitle = newTitle.trim();
    if (!trimmedTitle) return;

    const oldTodo = todos.find(todo => todo.id === id);
    if (!oldTodo || oldTodo.title === trimmedTitle) return;

    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, title: trimmedTitle } : todo
      )
    );

    try {
      await editTodoApi(id, trimmedTitle);
      toast.success(t('editSuccess'));
    } catch (error: unknown) {
      console.error(error);
      toast.error(t('editError'));
      // Откат к старому заголовку
      setTodos(prev =>
        prev.map(todo =>
          todo.id === id ? { ...todo, title: oldTodo.title } : todo
        )
      );
    }
  };

  return (
    <div className={s.wrapper}>
      {/* Форма добавления */}
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

      {/* Панель поиска и фильтрации */}
      <form onSubmit={handleSearchSubmit} className={s.todoForm}>
        <input
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
          value={searchQuery}
          placeholder={t('searchPlaceholder')}
          name="search"
          className={s.input_form}
        />
        <select
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setFilterStatus(e.target.value as FilterStatus)
          }
          value={filterStatus}
          name="select"
          className={s.select}
        >
          <option value="all">{t('optionAll')}</option>
          <option value="complete">{t('optionComplete')}</option>
          <option value="incomplete">{t('optionIncomplete')}</option>
          <option value="favorite">{t('optionFavorite')}</option>
        </select>
      </form>

      {/* Заглушка при отсутствии заметок */}
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

      {/* Список заметок */}
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
