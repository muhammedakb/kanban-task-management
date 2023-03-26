import { memo } from 'react';
import classNames from 'classnames';
import type { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { slugify } from '../../utils';

import './boardBarItem.scss';

type BoardBarItemProps = {
  isCreateButton?: boolean;
  onClick?: () => void;
  text: string;
  type?: 'navbarItem' | 'hideSidebar';
};

const BoardBarItem: FC<BoardBarItemProps> = ({
  isCreateButton = false,
  onClick,
  text,
  type = 'navbarItem',
}) =>
  type === 'navbarItem' && !isCreateButton ? (
    <NavLink
      className={({ isActive }) =>
        classNames('bar__item horizontal-center', {
          createBtn: isCreateButton,
          active: isActive,
        })
      }
      onClick={() => onClick?.()}
      to={`/${slugify(text)}`}
    >
      <span className="bar__item__icon" />
      <span className="bar__item__text fw-700-m">{text}</span>
    </NavLink>
  ) : (
    <button
      className={classNames('bar__item horizontal-center', {
        createBtn: isCreateButton,
        hideSidebar: !isCreateButton,
      })}
      onClick={() => onClick?.()}
    >
      <span className="bar__item__icon" />
      <span className="bar__item__text fw-700-m">{text}</span>
    </button>
  );

export default memo(BoardBarItem);
