import { useRef } from 'react';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

import useOnClickOutside from '@hooks/useOnClickOutside';

import Menu from '../Menu';
import type { MenuProps } from '../Menu/Menu';

import './modal.scss';

type ModalProps = {
  children: ReactNode;
  menuItems?: MenuProps['menuItems'];
  toggle?: () => void;
  title?: {
    text: string;
    variant?: 'primary' | 'destructive';
  };
  visible: boolean;
};

const Modal = ({ children, menuItems, toggle, title, visible }: ModalProps) => {
  const modalRef = useRef(null);

  useOnClickOutside(
    modalRef,
    () => toggle?.(),
    (event) => (event?.target as Record<string, any>)?.id === 'root_modal'
  );

  return visible
    ? createPortal(
        <div className="modal__backdrop center-flex" id="root_modal">
          <main ref={modalRef} className="modal__content">
            <header className="modal__content__header space-between">
              {title ? (
                <p
                  className={classNames(
                    'modal__content__header__title fw-700-lg',
                    title.variant
                  )}
                >
                  {title.text}
                </p>
              ) : null}
              {menuItems && menuItems.length > 0 && (
                <button
                  className="modal__content__header__close"
                  title="Menu"
                  type="button"
                >
                  <Menu menuItems={menuItems ?? []} />
                </button>
              )}
            </header>
            {children}
          </main>
        </div>,
        document.body
      )
    : null;
};

export default Modal;
