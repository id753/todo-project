const THEME_KEY = 'theme';

const themeToggle = document.querySelector('.theme-toggle');

themeToggle.addEventListener('click', toggleTheme);

const sunIcon = `
<svg class="icon actions-icon" height="20">
<use href="./js/public/symbol-defs.svg#icon-sun"></use>
</svg>
`;
const moonIcon = `
<svg class="icon actions-icon" height="15">
<use href="./js/public/symbol-defs.svg#icon-moon"></use>
</svg>
`;

const savedTheme = localStorage.getItem(THEME_KEY);

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-theme');
  localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
  const nextTitle = isDark ? 'Светлая тема' : 'Темная тема';
  themeToggle.setAttribute('title', nextTitle);
}

if (savedTheme === 'dark') {
  document.body.classList.add('dark-theme');
  themeToggle.innerHTML = sunIcon;
  themeToggle.setAttribute('title', 'Светлая тема');
} else {
  themeToggle.innerHTML = moonIcon;
  themeToggle.setAttribute('title', 'Темная тема');
}
