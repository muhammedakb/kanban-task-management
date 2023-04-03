import type { ColumnData } from 'types/types';

import Checkbox from '@components/Checkbox';
import Modal from '@components/Modal';
import Select from '@components/Select';

import './itemDetailModal.scss';

type ItemDetailModalProps = {
  closeModal: () => void;
  completedSubTasks: number;
  openedItem?: ColumnData['tasks'][0];
  options: Array<{ value: string; text: string }>;
  istheModalOpen: boolean;
};

const ItemDetailModal = ({
  closeModal,
  completedSubTasks,
  openedItem,
  options,
  istheModalOpen,
}: ItemDetailModalProps) => (
  <Modal
    menuItems={[
      {
        text: 'Edit Task',
        variant: 'primary',
        onClick() {
          console.log('clicked');
        },
      },
      {
        text: 'Delete Task',
        variant: 'danger',
        onClick() {
          console.log('clicked');
        },
      },
    ]}
    title={{ text: openedItem?.title ?? '' }}
    toggle={closeModal}
    visible={istheModalOpen}
  >
    {Boolean(openedItem?.description) && (
      <p className="fw-500-md item-detail-modal__description">
        {openedItem?.description}
      </p>
    )}

    <p className="fw-700-xs item-detail-modal__subtask-label">
      Subtasks ({completedSubTasks} of {openedItem?.subtasks?.length})
    </p>

    <div className="item-detail-modal__subtasks">
      {openedItem?.subtasks?.map((subtask) => (
        <Checkbox
          key={subtask.title}
          checked={subtask.isCompleted}
          onChange={(e) => console.log(e.target.checked)}
          text={subtask.title}
        />
      ))}
    </div>
    <Select
      defaultValue={openedItem?.status}
      label="Current Status"
      onSelect={(value) => console.log('zort', value)}
      options={options}
    />
  </Modal>
);

export default ItemDetailModal;
