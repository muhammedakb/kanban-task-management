import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { NavbarVisibilityProvider } from './context/NavbarVisibilityProvider';
import { ThemeProvider } from './context/ThemeProvider';
import App from './App';

import './style/main.scss';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ThemeProvider>
      <NavbarVisibilityProvider>
        <App />
      </NavbarVisibilityProvider>
    </ThemeProvider>
  </StrictMode>
);
