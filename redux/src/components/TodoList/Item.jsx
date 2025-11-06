import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteTodo,
  toggleComplete,
  toggleFavorite,
  editTodo,
} from '../../redux/TodoListSlice';
import {
  deleteTodoThunk,
  editTodoThunk,
  toggleCompleteThunk,
  toggleFavoriteThunk,
} from '../../redux/operations';

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
      dispatch(editTodoThunk({ id: id, title: editValue.trim() }));
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
        onChange={() =>
          dispatch(
            toggleCompleteThunk({
              id,
              title,
              completed: !completed,
              isFavorite,
            })
          )
        }
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
        <button
          onClick={() =>
            dispatch(
              toggleFavoriteThunk({
                id,
                title,
                completed,
                isFavorite: !isFavorite,
              })
            )
          }
        >
          {isFavorite ? 'like' : 'dislike'}
        </button>
        <button onClick={() => handleEdit(id)}>edit</button>
        <button onClick={() => dispatch(deleteTodoThunk(id))}>delete</button>
      </div>
    </li>
  );
};
export default Item;
