import classNames from 'classnames';
import type { FC } from 'react';

import './boardBarItem.scss';

type BoardBarItemProps = {
  active?: boolean;
  isCreateButton?: boolean;
  onClick: () => void;
  text: string;
  type?: 'navbarItem' | 'hideSidebar';
};

const BoardBarItem: FC<BoardBarItemProps> = ({
  active = false,
  isCreateButton = false,
  onClick,
  text,
  type = 'navbarItem',
}) => (
  <button
    className={classNames('bar__item horizontal-center', {
      createBtn: isCreateButton,
      active,
      hideSidebar: type === 'hideSidebar',
    })}
    onClick={onClick}
  >
    <span className="bar__item__icon" />
    <span className="bar__item__text fw-700-m">{text}</span>
  </button>
);

export default BoardBarItem;
