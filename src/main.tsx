import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from 'store';

import { NavbarVisibilityProvider } from './context/NavbarVisibilityProvider';
import { ThemeProvider } from './context/ThemeProvider';
import Router from './router';

import './style/main.scss';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ThemeProvider>
      <NavbarVisibilityProvider>
        <Provider store={store}>
          <Router />
        </Provider>
      </NavbarVisibilityProvider>
    </ThemeProvider>
  </StrictMode>
);
