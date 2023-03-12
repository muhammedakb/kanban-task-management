import { useRef, useState } from 'react';
import classNames from 'classnames';

import useOnClickOutside from '../../hooks/useOnClickOutside';

import './menu.scss';

const Ellipsis = () => (
  <svg
    height="20"
    id="ellipsisBtn"
    width="5"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="#828FA3" fillRule="evenodd" id="ellipsisBtn">
      <circle cx="2.308" cy="2.308" id="ellipsisBtn" r="2.308" />
      <circle cx="2.308" cy="10" id="ellipsisBtn" r="2.308" />
      <circle cx="2.308" cy="17.692" id="ellipsisBtn" r="2.308" />
    </g>
  </svg>
);

type MenuProps = {
  menuItems: Array<{
    text: string;
    variant: 'primary' | 'danger';
    onClick: () => void;
  }>;
};

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
