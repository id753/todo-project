import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import { changeFilter, filterStatus } from '../../redux/TodoListSlice';

const SearchBar = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <Formik>
        <Form>
          <Field
            onChange={e => dispatch(changeFilter(e.target.value))}
            name="todo"
            placeholder="search todo"
          />
          <label htmlFor="selectedTodos"></label>
          <Field
            onChange={e => {
              dispatch(filterStatus(e.target.value));
            }}
            name="select"
            id="selectedTodos"
            as="select"
          >
            <option value="all">all</option>
            <option value="complete">complete</option>
            <option value="incomplete">incomplete</option>
            <option value="favorite">favorite</option>
          </Field>
        </Form>
      </Formik>
    </div>
  );
};

export default SearchBar;
