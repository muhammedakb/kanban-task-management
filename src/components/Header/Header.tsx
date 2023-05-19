import { memo, useCallback } from 'react';
import type { FC } from 'react';

import { useNavbarVisibility } from '@context/NavbarVisibilityProvider';
import { useTheme } from '@context/ThemeProvider';

import { useBoardId } from '@hooks/useBoardId';
import useWindowSize from '@hooks/useWindowSize';

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
  const activeTask = useBoardId();

  const { width } = useWindowSize();
  const { isOpened, setIsOpened } = useNavbarVisibility();
  const { theme } = useTheme();

  const toggleMobileBar = useCallback(() => {
    if (width < 570) setIsOpened();
  }, [width, setIsOpened]);

  return (
    <header className={`header horizontal-center ${theme}`}>
      {(!isOpened || width < 570) && <div className="header__logo" />}
      <div
        className="header__title horizontal-center"
        onClick={toggleMobileBar}
      >
        {title || 'Not Found'}
        {width < 570 && (isOpened ? <ChevronUp /> : <ChevronDown />)}
      </div>
      <div className="header__process horizontal-center">
        <Button
          disabled={(activeTask?.columns?.length ?? 0) < 1}
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
