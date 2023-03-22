import { createContext, useCallback, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type NavbarVisibilityProps = {
  children: ReactNode;
};

type NavbarVisibilityContextType = {
  isOpened: boolean;
  setIsOpened: () => void;
};

export const NavbarVisibilityContext =
  createContext<NavbarVisibilityContextType>({
    isOpened: true,
    setIsOpened: () => {},
  });

const NavbarVisibilityProvider = ({ children }: NavbarVisibilityProps) => {
  const [isOpened, setIsOpened] = useState(true);

  const toggleVisibility = useCallback(() => {
    setIsOpened((prevValue) => !prevValue);
  }, []);

  return (
    <NavbarVisibilityContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ isOpened, setIsOpened: toggleVisibility }}
    >
      {children}
    </NavbarVisibilityContext.Provider>
  );
};

const useNavbarVisibility = () => useContext(NavbarVisibilityContext);

export { NavbarVisibilityProvider, useNavbarVisibility };
