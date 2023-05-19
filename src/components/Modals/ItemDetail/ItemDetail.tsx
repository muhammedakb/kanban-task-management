import type { Column } from 'types/types';

import Checkbox from '@components/Checkbox';
import Modal from '@components/Modal';
import Select from '@components/Select';

import './itemDetail.scss';

type ItemDetailProps = {
  closeModal: () => void;
  completedSubTasks: number;
  istheModalOpen: boolean;
  onDelete?: () => void;
  onEdit?: () => void;
  openedItem?: Column['tasks'][0];
  options: Array<{ value: string; text: string }>;
};

const ItemDetail = ({
  closeModal,
  completedSubTasks,
  istheModalOpen,
  onDelete,
  onEdit,
  openedItem,
  options,
}: ItemDetailProps) => (
  <Modal
    menuItems={[
      {
        text: 'Edit Task',
        variant: 'primary',
        onClick: () => onEdit?.(),
      },
      {
        text: 'Delete Task',
        variant: 'danger',
        onClick: () => onDelete?.(),
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
      onSelect={(value) => console.log(value)}
      options={options}
    />
  </Modal>
);

export default ItemDetail;
