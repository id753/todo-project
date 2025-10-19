// =====================
// Константы и данные
// =====================
const BASE_URL = 'http://localhost:3000/todos';
import { dictionary } from './dictionary.js';

const THEME_KEY = 'theme';
const LANG_KEY = 'lang';

let todos = [];
let currentLang = localStorage.getItem(LANG_KEY) || 'uk';
let t = dictionary[currentLang];

// =====================
// DOM элементы
// =====================
const form = document.querySelector('.todo-add-form');
const container = document.querySelector('.list');
const select = document.querySelector('.select');
const searchForm = document.querySelector('.todo-search-form');
const searchInput = document.querySelector('.input-search-form');
const themeToggle = document.querySelector('.theme-toggle');
const langToggle = document.querySelector('.lang-toggle');
const scrollBtn = document.querySelector('.scroll-to-top');

searchInput.value = ''; // очищаем поиск при загрузке

// =====================
// Слушатели событий
// =====================
form.addEventListener('submit', handleSubmit);
select.addEventListener('change', handleFilter);
container.addEventListener('click', handleUpdate);
container.addEventListener('click', handleDelete);
container.addEventListener('click', handleEdit);
container.addEventListener('click', handleToggleFavorite);
searchInput.addEventListener('input', handleFilter);
themeToggle.addEventListener('click', toggleTheme);
langToggle.addEventListener('click', toggleLanguage);

// =====================
// Настройка темы
// =====================
const savedTheme = localStorage.getItem(THEME_KEY);

const sunIcon = `
  <svg class="icon actions-icon" height="20">
    <use href="./public/symbol-defs.svg#icon-sun"></use>
  </svg>
`;
const moonIcon = `
  <svg class="icon actions-icon" height="15">
    <use href="./public/symbol-defs.svg#icon-moon"></use>
  </svg>
`;

if (savedTheme === 'dark') {
  document.body.classList.add('dark-theme');
  themeToggle.innerHTML = sunIcon;
  // !
  themeToggle.setAttribute('aria-label', t.themeLightLabel);
  themeToggle.setAttribute('title', t.themeLightLabel);
} else {
  themeToggle.innerHTML = moonIcon;
  // !
  themeToggle.setAttribute('aria-label', t.themeDarkLabel);
  themeToggle.setAttribute('title', t.themeDarkLabel);
}

// =====================
// Работа с сервером
// =====================
function fetchData(url = BASE_URL, options = {}) {
  return fetch(url, options).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

// Загружаем данные при старте
fetchData(BASE_URL)
  .then(data => {
    todos = data;
    handleFilter(); // отрисовка списка
  })
  .catch(error => console.log(error));

// =====================
// Разметка задач
// =====================
function createMarkup(arr) {
  // !
  t = dictionary[currentLang];
  const deleteLabel = t.deleteLabel;
  const favoriteAddLabel = t.favoriteAddLabel;
  const favoriteRemoveLabel = t.favoriteRemoveLabel;
  const editLabel = t.editLabel;
  //
  const markLabel = t.markLabel;
  const unmarkLabel = t.unmarkLabel;
  return arr
    .map(({ id, title, completed, isFavorite }) => {
      const favoriteIcon = isFavorite
        ? `
          <svg class="icon actions-icon" height="18">
            <use href="./public/symbol-defs.svg#icon-heart-fill"></use>
          </svg>
        `
        : `
          <svg class="icon actions-icon" height="18">
            <use href="./public/symbol-defs.svg#icon-heart"></use>
          </svg>
        `;

      const favoriteLabel = isFavorite
        ? `${favoriteRemoveLabel} ${title}`
        : `${favoriteAddLabel} ${title}`;

      const editIcon = `
        <svg class="icon actions-icon" height="18">
          <use href="./public/symbol-defs.svg#icon-pencil"></use>
        </svg>
      `;

      const deleteIcon = `
        <svg class="icon actions-icon" height="18">
          <use href="./public/symbol-defs.svg#icon-trash"></use>
        </svg>
      `;

      return `
        <li  class="list-item" data-id="${id}">
        <input 
        type="checkbox" 
        class="list-checkbox" 
        aria-label="${completed ? unmarkLabel : markLabel} ${title}" ${
        completed ? 'checked' : ''
      }
                   >
          <h2 class="list-title">${title}</h2>
          <div class="list-actions">
            <button 
                class="favorite-button" 
                data-favorite="${isFavorite}" 
                aria-label="${favoriteLabel}" 
                title="${favoriteLabel}" 
            >
              ${favoriteIcon}
            </button>
            <button class="edit-button" aria-label="${editLabel} ${title}">
              ${editIcon}
            </button>
            <button class="delete-button" aria-label="${deleteLabel} ${title}">
              ${deleteIcon}
            </button>
          </div>
        </li>
      `;
    })
    .join('');
}

// =====================
// Добавление задачи
// =====================
function handleSubmit(e) {
  e.preventDefault();
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
      todos.push(data);
      handleFilter();
    })
    .catch(error => console.log(error))
    .finally(() => e.target.reset());
}

// =====================
// Обновление статуса
// =====================
function handleUpdate(e) {
  if (!e.target.classList.contains('list-checkbox')) return;
  e.preventDefault();

  const parent = e.target.closest('.list-item');
  const id = parent.dataset.id;

  fetchData(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: e.target.checked }),
  })
    .then(data => {
      e.target.checked = data.completed;
      const index = todos.findIndex(todo => todo.id === data.id);
      if (index !== -1) todos[index].completed = data.completed;
      handleFilter();
    })
    .catch(console.log);
}

// =====================
//  Удаление задачи
// =====================
function handleDelete(e) {
  if (!e.target.classList.contains('delete-button')) return;

  const parent = e.target.closest('.list-item');
  const id = parent.dataset.id;

  fetchData(`${BASE_URL}/${id}`, { method: 'DELETE' })
    .then(() => {
      parent.remove();
      todos = todos.filter(todo => todo.id !== id);
      handleFilter();

      // *
      document.querySelector('.input-form').focus();
    })
    .catch(console.log);
}

// =====================
// Редактирование
// =====================
function handleEdit(e) {
  if (!e.target.classList.contains('edit-button')) return;

  const parent = e.target.closest('.list-item');
  const id = parent.dataset.id;
  const titleEl = parent.querySelector('.list-title');

  const currentTitle = titleEl.textContent;
  const inputEl = document.createElement('input');
  inputEl.type = 'text';
  inputEl.className = 'edit-input';
  inputEl.value = currentTitle;

  titleEl.style.display = 'none';
  titleEl.insertAdjacentElement('afterend', inputEl);
  inputEl.focus();

  // Сохранение изменений
  function saveEdit() {
    const newTitle = inputEl.value.trim();
    if (newTitle === currentTitle || !newTitle) {
      inputEl.remove();
      titleEl.style.display = '';
      return;
    }

    fetchData(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle }),
    })
      .then(data => {
        titleEl.textContent = data.title;
        const todoUpdate = todos.find(todo => todo.id === id);
        if (todoUpdate) todoUpdate.title = data.title;
        handleFilter();
      })
      .catch(console.log)
      .finally(() => {
        inputEl.remove();
        titleEl.style.display = '';
      });
  }

  inputEl.addEventListener('keydown', e => e.key === 'Enter' && saveEdit());
  inputEl.addEventListener('blur', saveEdit);
}

// =====================
// Избранные задачи
// =====================
function handleToggleFavorite(e) {
  if (!e.target.classList.contains('favorite-button')) return;

  const favoriteButton = e.target;
  const parent = e.target.closest('.list-item');
  const id = parent.dataset.id;

  const currentStatus = favoriteButton.dataset.favorite === 'true';
  const newStatus = !currentStatus;

  fetchData(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isFavorite: newStatus }),
  })
    .then(data => {
      const favoriteIcon = data.isFavorite
        ? `
          <svg class="icon actions-icon" width="10" height="10">
            <use href="./public/symbol-defs.svg#icon-heart-fill"></use>
          </svg>
        `
        : `
          <svg class="icon actions-icon" width="10" height="10">
            <use href="./public/symbol-defs.svg#icon-heart"></use>
          </svg>
        `;

      favoriteButton.dataset.favorite = data.isFavorite;
      favoriteButton.innerHTML = favoriteIcon;

      const todoUpdate = todos.find(todo => todo.id === id);
      if (todoUpdate) todoUpdate.isFavorite = data.isFavorite;
      handleFilter();
    })
    .catch(console.log);
}

// =====================
// Фильтр и поиск
// =====================

searchForm.addEventListener('submit', e => {
  e.preventDefault();
});
function handleFilter() {
  const filterValue = select.value;
  const searchValue = searchInput.value.toLowerCase().trim();
  const emptyMessageText = dictionary[currentLang].emptyMessage;
  let filteredTodos = [];

  switch (filterValue) {
    case 'complete':
      filteredTodos = todos.filter(todo => todo.completed);
      break;
    case 'incomplete':
      filteredTodos = todos.filter(todo => !todo.completed);
      break;
    case 'favorite':
      filteredTodos = todos.filter(todo => todo.isFavorite);
      break;
    default:
      filteredTodos = todos;
  }

  if (searchValue) {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(searchValue)
    );
  }

  container.innerHTML =
    filteredTodos.length === 0
      ? ` <div class="image-container">
        <img
          src="./public/undraw_completed-tasks_1j9z-removebg-preview.png"
          class="img img-empty"
          width="120"
          alt=""
        />
        <h3 class="empty-message">${emptyMessageText}</h3>
      </div>`
      : createMarkup(filteredTodos);
}

// =====================
// Переключение темы
// =====================
function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-theme');
  localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
  themeToggle.innerHTML = isDark ? sunIcon : moonIcon;

  // !💡 ЛОГИКА ARIA:
  let nextAriaLabel;

  if (isDark) {
    nextAriaLabel = t.themeLightLabel;
  } else {
    nextAriaLabel = t.themeDarkLabel;
  }

  themeToggle.setAttribute('aria-label', nextAriaLabel);
  themeToggle.setAttribute('title', nextAriaLabel);
}

// =====================
// Перевод (язык)
// =====================
function updateTexts() {
  t = dictionary[currentLang];

  document.querySelector('.title').textContent = t.title;
  document.querySelector('.input-form').placeholder = t.addPlaceholder;
  document.querySelector('.input-search-form').placeholder =
    t.searchPlaceholder;
  document.querySelector('.button-form').textContent = t.addButton;
  document.querySelector('.lang-toggle').textContent = t.langToggle;
  document.querySelector('.footer-text').innerHTML = `${t.footerText}`;

  const select = document.querySelector('.select');
  if (select) {
    select.options[0].textContent = t.optionAll;
    select.options[1].textContent = t.optionComplete;
    select.options[2].textContent = t.optionIncomplete;
    select.options[3].textContent = t.optionFavorite;
  }

  const emptyMsg = document.querySelector('.empty-message');
  if (emptyMsg) emptyMsg.textContent = t.emptyMessage;

  const isDark = document.body.classList.contains('dark-theme');
  const themeAriaLabel = isDark ? t.themeLightLabel : t.themeDarkLabel;

  themeToggle.setAttribute('aria-label', themeAriaLabel);
  themeToggle.setAttribute('title', themeAriaLabel);

  const nextLang = currentLang === 'en' ? 'uk' : 'en';

  let langAriaLabel;

  if (nextLang === 'uk') {
    langAriaLabel = t.langUkrLabel;
  } else {
    langAriaLabel = t.langEngLabel;
  }

  langToggle.setAttribute('aria-label', langAriaLabel);
  langToggle.setAttribute('title', langAriaLabel);

  if (scrollBtn) {
    scrollBtn.setAttribute('aria-label', t.toTopLabel);
    scrollBtn.setAttribute('title', t.toTopLabel);
  }

  handleFilter();
}

function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'uk' : 'en';
  localStorage.setItem(LANG_KEY, currentLang);
  updateTexts();
}

// =====================
// Кнопка "Вверх"
// =====================
window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    scrollBtn.classList.add('show');
  } else {
    scrollBtn.classList.remove('show');
  }
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

updateTexts();
