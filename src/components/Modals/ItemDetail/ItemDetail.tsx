import { useAppDispatch } from 'store';

import Checkbox from '@components/Checkbox';
import Modal from '@components/Modal';
import Select from '@components/Select';

import { useGetOpenedItem } from '@hooks/useGetOpenedItem';

import { toggleSubtaskStatus, toggleTaskStatus } from '@slices/boardSlice';

import './itemDetail.scss';

type ItemDetailProps = {
  closeModal: () => void;
  completedSubTasks: number;
  istheModalOpen: boolean;
  onDelete?: () => void;
  onEdit?: () => void;
  openedItemID?: string;
  options: Array<{ value: string; text: string }>;
};

const ItemDetail = ({
  closeModal,
  completedSubTasks,
  istheModalOpen,
  onDelete,
  onEdit,
  openedItemID,
  options,
}: ItemDetailProps) => {
  const dispatch = useAppDispatch();
  const { activeBoard, openedItem } = useGetOpenedItem(openedItemID ?? '');

  const onSubtaskCheck = (checked: boolean, subtaskId: string) => {
    dispatch(
      toggleSubtaskStatus({
        boardId: activeBoard?.id ?? '',
        checked,
        subtaskId,
        taskId: openedItem?.id ?? '',
      })
    );
  };

  const onStatusSelect = (value: string) => {
    dispatch(
      toggleTaskStatus({
        boardId: activeBoard?.id ?? '',
        status: value,
        taskId: openedItem?.id ?? '',
      })
    );
  };

  return (
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
            onChange={(value) => onSubtaskCheck(value, subtask.id ?? '')}
            text={subtask.title}
          />
        ))}
      </div>
      <Select
        defaultValue={openedItem?.status}
        label="Current Status"
        onSelect={onStatusSelect}
        options={options}
      />
    </Modal>
  );
};

export default ItemDetail;
