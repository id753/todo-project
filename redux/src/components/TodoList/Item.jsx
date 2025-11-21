import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
// import {
//   deleteTodo,
//   toggleComplete,
//   toggleFavorite,
//   editTodo,
// } from '../../redux/TodoListSlice';
import {
  deleteTodoThunk,
  editTodoThunk,
  toggleCompleteThunk,
  toggleFavoriteThunk,
} from '../../redux/operations';
import { EditIcon, DeleteIcon, FavoriteIcon } from '../Icons/ActionIcons';

const itemsButtons =
  ' size-[30px] mr-[3px] bg-(--color-accent) border-none rounded-[20%] hover:bg-(--color-accent-hover) transition  duration-(--transition) hover:-translate-y-[1px] ';

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
    <div className="w-full">
      <li className="mb-[10px] flex min-h-[80px] items-center justify-between rounded-[8px] border-1 border-solid border-(--color-border) bg-(--color-surface) px-[10px] py-[5px] transition duration-(--transition) hover:bg-(--color-hover)">
        <input
          className="h-[1.5em] min-w-[1.5em] accent-(--color-accent)"
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
              className="m-[15px] w-full px-[15px] py-[5px] text-[16px] leading-1.5"
              type="text"
              value={editValue}
              onChange={e => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              autoFocus
            />
          </>
        ) : (
          <span className="font-4 my-0 px-[15px] py-[5px] text-base">
            {title}
          </span>
        )}

        <div className="flex">
          <button
            className={itemsButtons}
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
            {/* {isFavorite ? 'like' : 'dislike'} */}
            <FavoriteIcon isFavorite={isFavorite} />
          </button>
          <button className={itemsButtons} onClick={() => handleEdit(id)}>
            <EditIcon />
          </button>
          <button
            className={itemsButtons}
            onClick={() => dispatch(deleteTodoThunk(id))}
          >
            <DeleteIcon />
          </button>
        </div>
      </li>
    </div>
  );
};
export default Item;
