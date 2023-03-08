import { ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';
import './modal.scss';

type ModalProps = {
  children: ReactNode;
  toggle?: () => void;
  visible: boolean;
};

const Modal = ({ children, toggle, visible }: ModalProps) => {
  const modalRef = useRef(null);

  return visible
    ? createPortal(
        <div className='modal__backdrop' id='root_modal' ref={modalRef}>
          <main className='modal__content'>{children}</main>
        </div>,
        document.body
      )
    : null;
};

export default Modal;
