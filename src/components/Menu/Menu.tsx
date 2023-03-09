import classNames from 'classnames';
import { useRef, useState } from 'react';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import './menu.scss';

const Ellipsis = () => (
  <svg
    id='ellipsisBtn'
    width='5'
    height='20'
    xmlns='http://www.w3.org/2000/svg'
  >
    <g id='ellipsisBtn' fill='#828FA3' fillRule='evenodd'>
      <circle id='ellipsisBtn' cx='2.308' cy='2.308' r='2.308' />
      <circle id='ellipsisBtn' cx='2.308' cy='10' r='2.308' />
      <circle id='ellipsisBtn' cx='2.308' cy='17.692' r='2.308' />
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
        className='ellipsis'
        id='ellipsisBtn'
        onClick={onClick}
      >
        <Ellipsis />
      </button>
      {isOpened && (
        <div ref={menuRef} className='ellipsis__menu'>
          {menuItems.map((item, key) => (
            <p
              key={`menu-${item.text}-${item.variant}-${key}`}
              className={classNames(
                'ellipsis__menu__item fw-500-md horizontal-center',
                item.variant
              )}
              onClick={item.onClick}
            >
              {item.text}
            </p>
          ))}
        </div>
      )}
    </>
  );
};

export default Menu;
