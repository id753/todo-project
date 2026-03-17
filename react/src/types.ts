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

export interface BackendResponse {
  status: number;
  message: string;
  data: {
    todos: Todo[];
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface CreateResponse {
  status: number;
  message: string;
  data: Todo;
}

export type TodoCreateInput = Omit<Todo, 'id'>;
