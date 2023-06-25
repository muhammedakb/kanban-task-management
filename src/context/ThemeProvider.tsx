import { createContext, useCallback, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';

import { Themes } from '@@types/enums';

import useLocalStorage from '@hooks/useLocalStorage';

type ThemeContextProps = {
  children: ReactNode;
};

type Theme = Themes.Dark | Themes.Light;

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: Themes.Light,
  toggleTheme: () => {},
});

const ThemeProvider = ({ children }: ThemeContextProps) => {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', Themes.Light);

  const toggleTheme = useCallback(() => {
    setTheme(theme === Themes.Dark ? Themes.Light : Themes.Dark);
  }, [setTheme, theme]);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, useTheme };
