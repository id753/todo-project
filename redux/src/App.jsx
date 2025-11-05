import { useState } from 'react';

import './App.css';
import Header from './components/Header/Header';
import TodoList from './components/TodoList/TodoList';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div>
      <Header />
      <TodoList />
      <Footer />
    </div>
  );
}

export default App;
