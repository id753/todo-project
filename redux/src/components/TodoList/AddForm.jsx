import React from 'react';
import { Formik, Field, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { addNewTodo } from '../../redux/TodoListSlice';
import { addTodoThunk } from '../../redux/operations';
import { useTranslation } from 'react-i18next';

const AddForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
          <Field name="todo" placeholder={t('addPlaceholder')} />
          <button type="submit">{t('addButton')}</button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddForm;
