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
    <div className="w-full">
      <Formik initialValues={initialState} onSubmit={onSubmit}>
        <Form className="mb-[25px] flex w-full flex-wrap justify-center gap-[15px]">
          <Field
            className="font-alt h-[38px] w-full max-w-[400px] flex-1 rounded-md border-2 border-solid border-(--color-accent) bg-(--color-surface) px-4 py-2 text-[16px] text-(--color-text) transition duration-(--transition) outline-none"
            name="todo"
            placeholder={t('addPlaceholder')}
          />
          <button
            className="flex w-[85px] transform cursor-pointer items-center justify-center gap-[6px] rounded-md border-none bg-(--color-accent) px-4 py-2 text-[15px] font-[600] text-(--color-white) transition duration-(--transition) hover:-translate-y-[1px] hover:bg-(--color-accent-hover)"
            type="submit"
          >
            {t('addButton')}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddForm;
