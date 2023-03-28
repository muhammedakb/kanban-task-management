import { useRef, useState } from 'react';
import classNames from 'classnames';

import useOnClickOutside from '../../hooks/useOnClickOutside';
import Ellipsis from '../Icons/Ellipsis';

import './menu.scss';

export type MenuProps = {
  menuItems: Array<{
    text: string;
    variant: 'primary' | 'danger';
    onClick: () => void;
  }>;
};
// TODO: fix menu position problem
const Menu = ({ menuItems }: MenuProps) => {
  const ellipsisRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef(null);
  const [isOpened, setIsOpened] = useState(false);

  useOnClickOutside(
    menuRef,
    () => setIsOpened(false),
    (event) => (event.target as Record<string, any>)?.id !== 'ellipsisBtn'
  );

  const onClick = () => setIsOpened((prevState) => !prevState);
  return (
    <>
      <button
        ref={ellipsisRef}
        className="ellipsis"
        id="ellipsisBtn"
        onClick={onClick}
        type="button"
      >
        <Ellipsis />
      </button>
      {isOpened && (
        <div ref={menuRef} className="ellipsis__menu">
          {menuItems.map((item, key) => (
            <button
              // eslint-disable-next-line react/no-array-index-key
              key={`menu-${item.text}-${item.variant}-${key}`}
              className={classNames(
                'ellipsis__menu__item fw-500-md horizontal-center',
                item.variant
              )}
              onClick={item.onClick}
              type="button"
            >
              {item.text}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default Menu;
