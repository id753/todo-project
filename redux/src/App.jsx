import { useState } from 'react';

import './App.css';
import Header from './components/Header/Header';
import TodoList from './components/TodoList/TodoList';
import Footer from './components/Footer/Footer';
import ScrollToTopButton from './components/ScrollToTopButton/ScrollToTopButton';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectLanguage, selectTheme } from './redux/settingsSlice';

function App() {
  return (
    <div>
      <Header />
      <TodoList />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

export default App;
