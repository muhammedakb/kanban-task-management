import type { FC } from 'react';

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

type HeaderProps = {
  navMenuVisible?: boolean;
  menuItems: MenuProps['menuItems'];
  onAddNewTaskClick: () => void;
  title: string;
};

const Header: FC<HeaderProps> = ({
  menuItems,
  navMenuVisible = true,
  onAddNewTaskClick,
  title,
}) => {
  const { width } = useWindowSize();
  return (
    <header className="header horizontal-center">
      {(navMenuVisible || width < 570) && <div className="header__logo" />}
      <div className="header__title">{title}</div>
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

export default Header;
