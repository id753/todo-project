export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  isFavorite: boolean;
}

export interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  lang: 'en' | 'uk';
  toggleLang: () => void;
}
