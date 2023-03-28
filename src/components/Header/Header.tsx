import { memo, useCallback } from 'react';
import type { FC } from 'react';

import { useNavbarVisibility } from '../../context/NavbarVisibilityProvider';
import useWindowSize from '../../hooks/useWindowSize';
import Button from '../Button';
import AddIcon from '../Icons/AddIcon';
import ChevronDown from '../Icons/ChevronDown';
import ChevronUp from '../Icons/ChevronUp';
import Menu from '../Menu';
import type { MenuProps } from '../Menu/Menu';

import './header.scss';

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
  }, [width, setIsOpened]);

  return (
    <header className="header horizontal-center">
      {(!isOpened || width < 570) && <div className="header__logo" />}
      <div
        className="header__title horizontal-center"
        onClick={toggleMobileBar}
      >
        {title || 'Not Found'}
        {width < 570 && (isOpened ? <ChevronUp /> : <ChevronDown />)}
      </div>
      <div className="header__process horizontal-center">
        {/* TODO: disable if no column data. */}
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
