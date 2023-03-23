import { memo, useCallback } from 'react';
import type { FC } from 'react';

import { useNavbarVisibility } from '../../context/NavbarVisibilityProvider';
import useWindowSize from '../../hooks/useWindowSize';
import Button from '../Button';
import Menu from '../Menu';
import type { MenuProps } from '../Menu/Menu';

import './header.scss';

const AddIcon = () => (
  <svg height="12" width="12" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
      fill="#FFF"
    />
  </svg>
);

const ChevronUp = () => (
  <svg height="7" width="10" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 6 5 2 1 6" fill="none" stroke="#635FC7" strokeWidth="2" />
  </svg>
);

const ChevronDown = () => (
  <svg height="7" width="10" xmlns="http://www.w3.org/2000/svg">
    <path d="m1 1 4 4 4-4" fill="none" stroke="#635FC7" strokeWidth="2" />
  </svg>
);

type HeaderProps = {
  menuItems: MenuProps['menuItems'];
  onAddNewTaskClick: () => void;
  title: string;
};

const Header: FC<HeaderProps> = ({ menuItems, onAddNewTaskClick, title }) => {
  const { width } = useWindowSize();
  const { isOpened, setIsOpened } = useNavbarVisibility();

  const toggleMobileBar = useCallback(() => {
    if (width < 570) setIsOpened();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  return (
    <header className="header horizontal-center">
      {(!isOpened || width < 570) && <div className="header__logo" />}
      <div
        className="header__title horizontal-center"
        onClick={toggleMobileBar}
      >
        {title} {width < 570 && (isOpened ? <ChevronUp /> : <ChevronDown />)}
      </div>
      <div className="header__process horizontal-center">
        <Button
          onClick={onAddNewTaskClick}
          size={width > 570 ? 'small' : 'xsmall'}
          text={width > 570 ? '+ Add New Task' : <AddIcon />}
        />
        <Menu menuItems={menuItems} />
      </div>
    </header>
  );
};

export default memo(Header);
