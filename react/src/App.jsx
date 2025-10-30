import './App.css';
import TodoList from './TodoList/TodoList';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import ScrollToTopButton from './components/ScrollToTopButton/ScrollToTopButton';

const App = () => {
  return (
    <div className="app">
      <Header />
      <TodoList />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default App;

// npm install react-i18next
