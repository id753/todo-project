import React, { useState } from 'react';
import TodoItem from './TodoItem';
import todosData from './../assets/db.json';
import s from '../TodoList/TodoList.module.css';
const TodoList = () => {
  const [todos, setTodos] = useState(todosData.todos);

  const deleteTodo = id => {
    setTodos(prev => prev.filter(item => item.id !== id));
  };

  const [newValue, setNewValue] = useState('');

  const addNewTodo = () => {
    const newTodo = {
      id: crypto.randomUUID(),
      title: newValue,
      completed: false,
      isFavorite: false,
    };
    setTodos(prev => [...prev, newTodo]);
  };
  return (
    <div className={s.wrapper}>
      <div className={s.todoForm}>
        <input
          onChange={e => setNewValue(e.target.value)}
          value={newValue}
          placeholder="Add todo..."
          required
          className={s.input_form}
        />
        <button onClick={addNewTodo} className={s.button_form}>
          ADD
        </button>
      </div>
      <div className={s.todoForm}>
        <input placeholder="Search todo..." className={s.input_form} />
        <select className={s.select}>
          <option value="all">All</option>
          <option value="complete">Complete</option>
          <option value="incomplete">Incomplete</option>
          <option value="favorite">Favorite</option>
        </select>
      </div>
      {/* <div> */}
      <ul className={s.list}>
        {todos.map(item => (
          <TodoItem key={item.id} {...item} onDeleteTodo={deleteTodo} />
        ))}
      </ul>
      {/* </div> */}
    </div>
  );
};

export default TodoList;
