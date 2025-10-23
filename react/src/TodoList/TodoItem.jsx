import React from 'react';
import s from './TodoList.module.css';

const TodoItem = ({ id, title, completed, isFavorite, onDeleteTodo }) => {
  return (
    <li className={s.list_item}>
      <input type="checkbox" className={s.list_checkbox} />
      <span className={s.list_title}>{title}</span>
      <div className={s.list_actions}>
        <button onClick={() => onFavoriteTodo(id)}>Favorite</button>
        <button onClick={() => onEditTodo(id)}>Edit</button>
        <button onClick={() => onDeleteTodo(id)}>Delete</button>
      </div>
    </li>
  );
};

export default TodoItem;
