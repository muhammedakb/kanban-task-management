import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import type { ReactNode } from 'react';

import useWindowSize from '../hooks/useWindowSize';

type NavbarVisibilityProps = {
  children: ReactNode;
};

type NavbarVisibilityContextType = {
  isOpened: boolean;
  isMobileMenu: boolean;
  setIsOpened: () => void;
};

export const NavbarVisibilityContext =
  createContext<NavbarVisibilityContextType>({
    isOpened: true,
    isMobileMenu: false,
    setIsOpened: () => {},
  });

const NavbarVisibilityProvider = ({ children }: NavbarVisibilityProps) => {
  const { width } = useWindowSize();
  const [isOpened, setIsOpened] = useState(true);
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  const toggleVisibility = useCallback(() => {
    setIsOpened((prevValue) => !prevValue);
  }, []);

  useEffect(() => {
    if (width < 570) {
      setIsOpened(false);
      setIsMobileMenu(true);
    }
    return () => setIsMobileMenu(false);
  }, [width]);

  return (
    <NavbarVisibilityContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ isMobileMenu, isOpened, setIsOpened: toggleVisibility }}
    >
      {children}
    </NavbarVisibilityContext.Provider>
  );
};

const useNavbarVisibility = () => useContext(NavbarVisibilityContext);

export { NavbarVisibilityProvider, useNavbarVisibility };
