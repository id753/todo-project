import React from 'react';
import { Formik, Form, Field } from 'formik';

const SearchBar = () => {
  return (
    <div>
      <Formik>
        <Form>
          <Field name="todo" placeholder="Filter" />
          <label htmlFor="selectedTodos"></label>
          <Field name="select" id="selectedTodos" as="select">
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
