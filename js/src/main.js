const BASE_URL = 'http://localhost:3000/todos';
import { dictionary } from './dictionary.js';

const form = document.querySelector('.todo-add-form');
const container = document.querySelector('.list');
const select = document.querySelector('.select');
let todos = [];
const searchInput = document.querySelector('.input-search-form');

searchInput.value = '';

const themeToggle = document.querySelector('.theme-toggle');
const langToggle = document.querySelector('.lang-toggle');
const THEME_KEY = 'theme';

const LANG_KEY = 'lang';
let currentLang = localStorage.getItem(LANG_KEY) || 'uk';

form.addEventListener('submit', handleSubmit);
select.addEventListener('change', handleFilter);
container.addEventListener('click', handleUpdate);
container.addEventListener('click', handleDelete);
container.addEventListener('click', handleEdit);
container.addEventListener('click', handleToggleFavorite);
searchInput.addEventListener('input', handleFilter);
themeToggle.addEventListener('click', toggleTheme);
langToggle.addEventListener('click', toggleLanguage);

const savedTheme = localStorage.getItem(THEME_KEY);
updateTexts();

const sunIcon = `
          <svg class="icon actions-icon" height="20">
            <use href="../public/symbol-defs.svg#icon-sun"></use>
          </svg>
        `;
const moonIcon = `
          <svg class="icon actions-icon" height="15">
            <use href="../public/symbol-defs.svg#icon-moon"></use>
          </svg>
        `;
if (savedTheme === 'dark') {
  document.body.classList.add('dark-theme');
  themeToggle.innerHTML = sunIcon;
} else {
  themeToggle.innerHTML = moonIcon;
}

function fetchData(url = BASE_URL, options = {}) {
  return fetch(url, options).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    // console.log(response);
    return response.json();
  });
}
fetchData(BASE_URL)
  .then(data => {
    todos = data;
    // container.insertAdjacentHTML('afterbegin', createMarkup(data));
    // container.insertAdjacentHTML('beforeend', createMarkup(data.reverse()));
    handleFilter();
  })
  .catch(error => console.log(error));

function createMarkup(arr) {
  return arr
    .map(({ id, title, completed, isFavorite }) => {
      const favoriteIcon = isFavorite
        ? `
              <svg class="icon actions-icon"  height="18">
                <use href="../public/symbol-defs.svg#icon-heart-fill"></use>
              </svg>
            `
        : `
              <svg class="icon actions-icon"  height="18">
                <use href="../public/symbol-defs.svg#icon-heart"></use>
              </svg>
            `;

      const editIcon = `
          <svg class="icon actions-icon"  height="18">
            <use href="../public/symbol-defs.svg#icon-pencil"></use>
          </svg>
        `;

      const deleteIcon = `
          <svg class="icon actions-icon"  height="18">
            <use href="../public/symbol-defs.svg#icon-trash"></use>
          </svg>
        `;

      return `
          <li class="list-item" data-id="${id}">
            <input type="checkbox" class="list-checkbox" ${
              completed ? 'checked' : ''
            }>
            <h2 class="list-title">${title}</h2>
            <div class="list-actions">
              <button class="favorite-button" data-favorite="${isFavorite}">
                ${favoriteIcon}
              </button>
              <button class="edit-button">
                ${editIcon}
              </button>
              <button class="delete-button">
                ${deleteIcon}
              </button>
            </div>
          </li>
        `;
    })
    .join('');
}

function handleSubmit(e) {
  e.preventDefault();
  // console.log(e.target.elements);
  const todo = e.target.elements.todo;

  if (!todo.value.trim()) return;

  fetchData(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: todo.value,
      completed: false,
      isFavorite: false,
    }),
  })
    .then(data => {
      // console.log(response);
      todos.push(data); //favorite
      handleFilter();
      // container.insertAdjacentHTML('beforeend', createMarkup([data]));
    })
    .catch(error => console.log(error))
    .finally(() => e.target.reset());
}
// обновление статуса задачи
function handleUpdate(e) {
  if (!e.target.classList.contains('list-checkbox')) {
    return;
  }

  const parent = e.target.closest('.list-item');
  const id = parent.dataset.id;

  fetchData(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: e.target.checked }),
  })
    .then(data => {
      console.log('Успешно обновлено', data);

      e.target.checked = data.completed;

      const index = todos.findIndex(todo => todo.id === data.id);
      if (index !== -1) {
        todos[index].completed = data.completed;
      }
      //
      handleFilter();
    })
    .catch(error => {
      console.log(error);
    });
}

// удаление
function handleDelete(e) {
  if (!e.target.classList.contains('delete-button')) {
    return;
  }
  const parent = e.target.closest('.list-item');
  const id = parent.dataset.id;

  fetchData(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  })
    .then(data => {
      parent.remove();
      todos = todos.filter(todo => todo.id !== id);
      //
      handleFilter();
    })
    .catch(error => console.log(error));
}

// редактирование
function handleEdit(e) {
  if (!e.target.classList.contains('edit-button')) {
    return;
  }
  const parent = e.target.closest('.list-item');
  const id = parent.dataset.id;
  const titleEl = parent.querySelector('.list-title');

  const currentTitle = titleEl.textContent;
  const inputEl = document.createElement('input');
  inputEl.type = 'text';
  inputEl.className = 'edit-input';
  inputEl.value = currentTitle;

  // Скрываем заголовок и вставляем поле ввода на его место
  titleEl.style.display = 'none';
  titleEl.insertAdjacentElement('afterend', inputEl);
  inputEl.focus();

  // Функция для обработки сохранения (вынесена для чистоты)
  function saveEdit() {
    const newTitle = inputEl.value.trim();

    if (newTitle === currentTitle || !newTitle) {
      inputEl.remove();
      titleEl.style.display = ''; // Показываем h2 обратно
      return;
    }

    fetchData(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' }, // Важно для PATCH
      body: JSON.stringify({ title: newTitle }),
    })
      .then(data => {
        console.log('Успешно обновлен заголовок', data);
        titleEl.textContent = data.title; // Обновляем текст в h2
        const todoUpdate = todos.find(todo => todo.id === id);
        if (todoUpdate) {
          todoUpdate.title = data.title;
        }
        //
        handleFilter();
      })
      .catch(error => console.log('Ошибка при обновлении заголовка:', error))
      .finally(() => {
        inputEl.remove();
        titleEl.style.display = ''; //пустая строка '' сбрасывает инлайновый стиль
      });
  }

  inputEl.addEventListener('keydown', e => {
    if (e.key === 'Enter') saveEdit();
  });
  inputEl.addEventListener('blur', saveEdit);
}

// фейворит
function handleToggleFavorite(e) {
  if (!e.target.classList.contains('favorite-button')) {
    return;
  }
  const favoriteButton = e.target;
  const parent = e.target.closest('.list-item');
  const id = parent.dataset.id;

  const currentFavoriteStatus = favoriteButton.dataset.favorite === 'true';
  const newFavoriteStatus = !currentFavoriteStatus;

  fetchData(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isFavorite: newFavoriteStatus }),
  })
    .then(data => {
      console.log('Успешно обновлено избранное', data);
      const favoriteIcon = data.isFavorite
        ? `
              <svg class="icon actions-icon" width="10" height="10">
                <use href="../public/symbol-defs.svg#icon-heart-fill"></use>
              </svg>
            `
        : `
              <svg class="icon actions-icon" width="10" height="10">
                <use href="../public/symbol-defs.svg#icon-heart"></use>
              </svg>
            `;
      favoriteButton.dataset.favorite = data.isFavorite;
      favoriteButton.textContent = favoriteIcon;

      const todoUpdate = todos.find(todo => todo.id === id);
      if (todoUpdate) {
        todoUpdate.isFavorite = data.isFavorite;
      }
      //
      handleFilter();
    })
    .catch(error => console.log(error));
}

function handleFilter() {
  // const filterValue = e.target.value;
  const filterValue = select.value;
  const searchValue = searchInput.value.toLowerCase().trim();

  let filteredTodos = [];

  switch (filterValue) {
    case 'all':
      filteredTodos = todos;
      break;
    case 'complete':
      filteredTodos = todos.filter(todo => todo.completed === true);
      break;
    case 'incomplete':
      filteredTodos = todos.filter(todo => todo.completed === false);
      break;
    case 'favorite':
      filteredTodos = todos.filter(todo => todo.isFavorite === true);
      break;
    default:
      filteredTodos = todos;
  }

  if (searchValue) {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(searchValue)
    );
  }

  container.innerHTML = '';

  if (filteredTodos.length === 0) {
    container.innerHTML = '<h3 class="empty-message">Empty...</h3>';
  } else {
    container.insertAdjacentHTML('afterbegin', createMarkup(filteredTodos));
  }
}

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-theme');

  if (isDark) {
    localStorage.setItem(THEME_KEY, 'dark');
    // themeToggle.textContent = '☀️';
    themeToggle.innerHTML = sunIcon;
  } else {
    localStorage.setItem(THEME_KEY, 'light');
    themeToggle.innerHTML = moonIcon;
  }
}

function updateTexts() {
  const t = dictionary[currentLang];

  document.querySelector('.title').textContent = t.title;
  document.querySelector('.input-form').placeholder = t.addPlaceholder;
  document.querySelector('.input-search-form').placeholder =
    t.searchPlaceholder;
  document.querySelector('.button-form').textContent = t.addButton;
  document.querySelector('.lang-toggle').textContent = t.langToggle;

  // select для фильтров:
  const select = document.querySelector('.select');
  if (select) {
    select.options[0].textContent = t.optionAll;
    select.options[1].textContent = t.optionComplete;
    select.options[2].textContent = t.optionIncomplete;
    select.options[3].textContent = t.optionFavorite;
  }

  const emptyMsg = document.querySelector('.empty-message');
  if (emptyMsg) {
    emptyMsg.textContent = t.emptyMessage;
  }
}
function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'uk' : 'en';
  localStorage.setItem(LANG_KEY, currentLang);
  updateTexts();
}

// !scroll-to-top
const scrollBtn = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    scrollBtn.classList.add('show');
  } else {
    scrollBtn.classList.remove('show');
  }
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
