import { memo } from 'react';
import classNames from 'classnames';
import type { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { useTheme } from '@context/ThemeProvider';

import './boardBarItem.scss';

type BoardBarItemProps = {
  isCreateButton?: boolean;
  onClick?: () => void;
  text: string;
  to?: string;
  type?: 'navbarItem' | 'hideSidebar';
};

const BoardBarItem: FC<BoardBarItemProps> = ({
  isCreateButton = false,
  onClick,
  text,
  to,
  type = 'navbarItem',
}) => {
  const { theme } = useTheme();

  return type === 'navbarItem' && !isCreateButton ? (
    <NavLink
      className={({ isActive }) =>
        classNames('bar__item horizontal-center', {
          dark: theme === 'dark',
          active: isActive,
        })
      }
      onClick={() => onClick?.()}
      to={to ?? ''}
    >
      <span className="bar__item__icon" />
      <span className="bar__item__text fw-700-m">{text}</span>
    </NavLink>
  ) : (
    <button
      className={classNames('bar__item horizontal-center', {
        createBtn: isCreateButton,
        createBtn__dark: isCreateButton && theme === 'dark',
        hideSidebar: !isCreateButton,
        hideSidebar__dark: !isCreateButton && theme === 'dark',
      })}
      onClick={() => onClick?.()}
    >
      <span className="bar__item__icon" />
      <span className="bar__item__text fw-700-m">{text}</span>
    </button>
  );
};

export default memo(BoardBarItem);
