import type { FC } from 'react';

import Button from '@components/Button/Button';
import Modal from '@components/Modal/Modal';

import './deleteModal.scss';

type DeleteModalProps =
  | {
      closeModal: () => void;
      istheModalOpen: boolean;
      onDelete: () => void;
    } & (
      | {
          boardName: string;
          taskName?: never;
          type: 'board';
        }
      | {
          boardName?: never;
          taskName: string;
          type: 'task';
        }
    );

const DeleteModal: FC<DeleteModalProps> = ({
  boardName,
  closeModal,
  istheModalOpen,
  onDelete,
  taskName,
  type,
}) => (
  <Modal
    title={{
      text: `Delete this ${type === 'board' ? 'board' : 'task'}?`,
      variant: 'destructive',
    }}
    toggle={closeModal}
    visible={istheModalOpen}
  >
    <p className="fw-500-md">
      {type === 'board'
        ? `Are you sure you want to delete the ‘${boardName}’ board? This action
        will remove all columns and tasks and cannot be reversed.`
        : `Are you sure you want to delete the ‘${taskName}’ task and its subtasks?
        This action cannot be reversed.`}
    </p>

    <footer className="horizontal-center">
      <Button onClick={onDelete} text="Delete" variant="destructive" />
      <Button onClick={closeModal} text="Cancel" variant="secondary" />
    </footer>
  </Modal>
);

export default DeleteModal;
