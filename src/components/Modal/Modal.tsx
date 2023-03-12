import { useRef } from 'react';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

import './modal.scss';

const CloseIcon = () => (
  <svg height="15" width="15" xmlns="http://www.w3.org/2000/svg">
    <g fill="#828FA3" fillRule="evenodd">
      <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
      <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
    </g>
  </svg>
);

type ModalProps = {
  children: ReactNode;
  toggle?: () => void;
  title?: {
    text: string;
    variant?: 'primary' | 'destructive';
  };
  visible: boolean;
};

const Modal = ({ children, toggle, title, visible }: ModalProps) => {
  const modalRef = useRef(null);

  return visible
    ? createPortal(
        <div
          ref={modalRef}
          className="modal__backdrop center-flex"
          id="root_modal"
        >
          <main className="modal__content">
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
              <button
                className="modal__content__header__close"
                onClick={toggle}
                title="Close"
                type="button"
              >
                <CloseIcon />
              </button>
            </header>
            {children}
          </main>
        </div>,
        document.body
      )
    : null;
};

export default Modal;
