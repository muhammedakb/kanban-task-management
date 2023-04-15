import { createContext, useCallback, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';

import useLocalStorage from '@hooks/useLocalStorage';

type ThemeContextProps = {
  children: ReactNode;
};

type Theme = 'dark' | 'light';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

const ThemeProvider = ({ children }: ThemeContextProps) => {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'light');

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [setTheme, theme]);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, useTheme };
