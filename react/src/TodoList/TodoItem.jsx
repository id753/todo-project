import React, { useState } from 'react';
import {
  FavoriteIcon,
  EditIcon,
  DeleteIcon,
} from '../components/Icons/ActionIcons';
import s from './TodoList.module.css';

const TodoItem = ({
  id,
  title,
  completed,
  isFavorite,
  onDeleteTodo,
  onToggleFavorite,
  onToggleComplete,
  onEditTodo,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState(title);
  const handleEdit = () => {
    setIsEdit(true);
    setEditValue(title);
  };
  const handleEditSave = () => {
    onEditTodo(id, editValue);
    setIsEdit(false);
  };
  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      handleEditSave();
    }
  };
  const handleBlur = () => {
    handleEditSave();
  };

  return (
    <li className={s.list_item}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggleComplete(id)}
        className={s.list_checkbox}
      />
      {isEdit ? (
        <input
          type="text"
          value={editValue}
          onChange={e => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className={s.edit_input}
          autoFocus
        />
      ) : (
        <span className={s.list_title}>{title}</span>
      )}
      <div className={s.list_actions}>
        <button onClick={() => onToggleFavorite(id)}>
          <FavoriteIcon isFavorite={isFavorite} />
        </button>
        <button onClick={() => handleEdit(id)}>
          <EditIcon />
        </button>
        <button onClick={() => onDeleteTodo(id)}>
          <DeleteIcon />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
