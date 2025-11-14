import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './App.css';
import { I18nextProvider } from 'react-i18next';
import i18n from './dictionary/i18n.jsx';
import App from './App.jsx';
import { AppProvider } from './context/AppContext.jsx';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <AppProvider>
        <App />
      </AppProvider>
    </I18nextProvider>
  </StrictMode>
);
