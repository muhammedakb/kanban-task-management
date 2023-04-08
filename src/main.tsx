import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { NavbarVisibilityProvider } from './context/NavbarVisibilityProvider';
import { ThemeProvider } from './context/ThemeProvider';
import Router from './router';

import './style/main.scss';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ThemeProvider>
      <NavbarVisibilityProvider>
        <Router />
      </NavbarVisibilityProvider>
    </ThemeProvider>
  </StrictMode>
);

// TODO: light-dark theme(css)
