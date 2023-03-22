import { createContext, useCallback, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type ThemeContextProps = {
  children: ReactNode;
};

type Theme = 'dark' | 'light';

type ThemeContextType = {
  theme: Theme;
  setTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
});

const ThemeProvider = ({ children }: ThemeContextProps) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <ThemeContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ theme, setTheme: toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = (): ThemeContextType => useContext(ThemeContext);

export { ThemeProvider, useTheme };
