import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteTodo,
  toggleComplete,
  toggleFavorite,
  editTodo,
} from '../../redux/TodoListSlice';

const Item = ({ id, title, completed, isFavorite }) => {
  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState(title);

  const handleEdit = () => {
    setIsEdit(true);
    setEditValue(title);
  };

  const handleEditSave = () => {
    if (editValue.trim() && editValue !== title) {
      dispatch(editTodo({ id: id, title: editValue.trim() }));
    }
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
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => dispatch(toggleComplete(id))}
      />
      {isEdit ? (
        <>
          <input
            type="text"
            value={editValue}
            onChange={e => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            autoFocus
          />
        </>
      ) : (
        <span>{title}</span>
      )}

      <div>
        <button onClick={() => dispatch(toggleFavorite(id))}>
          {isFavorite ? 'like' : 'dislike'}
        </button>
        <button onClick={() => handleEdit(id)}>edit</button>
        <button onClick={() => dispatch(deleteTodo(id))}>delete</button>
      </div>
    </li>
  );
};
export default Item;
