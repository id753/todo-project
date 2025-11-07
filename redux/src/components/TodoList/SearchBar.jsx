import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';

import {
  changeFilter,
  filterStatus,
  selectFilter,
  selectFilterByStatus,
} from '../../redux/TodoListSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const filterByStatus = useSelector(selectFilterByStatus);
  const filterByValue = useSelector(selectFilter);

  return (
    <div>
      <Formik>
        <Form>
          <Field
            value={filterByValue}
            onChange={e => dispatch(changeFilter(e.target.value))}
            name="todo"
            placeholder={t('searchPlaceholder')}
          />
          <label htmlFor="selectedTodos"></label>
          <Field
            value={filterByStatus}
            onChange={e => {
              dispatch(filterStatus(e.target.value));
            }}
            name="select"
            id="selectedTodos"
            as="select"
          >
            <option value="all">{t('optionAll')}</option>
            <option value="complete">{t('optionComplete')}</option>
            <option value="incomplete">{t('optionIncomplete')}</option>
            <option value="favorite">{t('optionFavorite')}</option>
          </Field>
        </Form>
      </Formik>
    </div>
  );
};

export default SearchBar;
