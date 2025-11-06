import React from 'react';
import { Formik, Field, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { addNewTodo } from '../../redux/TodoListSlice';
import { addTodoThunk } from '../../redux/operations';

const AddForm = () => {
  const dispatch = useDispatch();

  const initialState = {
    todo: '',
  };

  const onSubmit = (values, options) => {
    const newTodo = {
      id: nanoid(),
      title: values.todo,
      completed: false,
      isFavorite: false,
    };

    dispatch(addTodoThunk(newTodo));

    // console.log(newTodo);
  };

  return (
    <div>
      <Formik initialValues={initialState} onSubmit={onSubmit}>
        <Form>
          <Field name="todo" placeholder="Add todo" />
          <button type="submit">ADD</button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddForm;
