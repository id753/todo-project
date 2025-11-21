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
    <div className="w-full">
      <Formik>
        <Form className="mb-[25px] flex w-full flex-wrap justify-center gap-[15px]">
          <Field
            className="font-alt h-[38px] w-full max-w-[400px] flex-1 rounded-md border-2 border-solid border-(--color-accent) bg-(--color-surface) px-4 py-2 text-[16px] text-(--color-text) transition duration-(--transition) outline-none"
            value={filterByValue}
            onChange={e => dispatch(changeFilter(e.target.value))}
            name="todo"
            placeholder={t('searchPlaceholder')}
          />
          <label className="sr-only" htmlFor="selectedTodos"></label>
          <Field
            className="w-[85px] cursor-pointer rounded-[6px] border-none bg-(--color-accent) p-2 text-[15px] font-medium text-(--color-white) transition-colors duration-(--transition) hover:bg-(--color-accent-hover)"
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
