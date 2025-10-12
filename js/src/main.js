const BASE_URL = 'http://localhost:3000/todos';

const form = document.querySelector('.todo-form');
const container = document.querySelector('.list');

form.addEventListener('submit', handleSubmit);

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
    // console.log(data);
    container.insertAdjacentHTML('beforeend', createMarkup(data));
  })
  .catch(error => console.log(error));

function createMarkup(arr) {
  return arr
    .map(
      ({ id, title, completed }) => `
    <li class="list-item" data-id="${id}">
    <input type="checkbox" class="list-checkbox" ${completed && 'checked'}>
    <h2 class="list-title">${title}</h2>
    <button class="list-button">X</button>
    </li>
  `
    )
    .join('');
}

function handleSubmit(e) {
  e.preventDefault();
  console.log(e.target.elements);
  const todo = e.target.elements.search;
}
