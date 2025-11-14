import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import {
  FavoriteIcon,
  EditIcon,
  DeleteIcon,
} from '../components/Icons/ActionIcons';
import s from './TodoList.module.css';
import { Todo } from '../types';

interface TodoItemProps extends Todo {
  onDeleteTodo: (id: string) => Promise<void>;
  onToggleFavorite: (id: string) => Promise<void>;
  onToggleComplete: (id: string) => Promise<void>;
  onEditTodo: (id: string, newTitle: string) => Promise<void>;
}
const TodoItem: FC<TodoItemProps> = ({
  id,
  title,
  completed,
  isFavorite,
  onDeleteTodo,
  onToggleFavorite,
  onToggleComplete,
  onEditTodo,
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>(title);
  const handleEdit = () => {
    setIsEdit(true);
    setEditValue(title);
  };
  const handleEditSave = () => {
    onEditTodo(id, editValue);
    setIsEdit(false);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
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
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEditValue(e.target.value)
          }
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
        <button onClick={handleEdit}>
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
