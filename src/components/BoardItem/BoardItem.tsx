import './boardItem.scss';

type BoardItemProps = {
  completedSubTasks: number;
  subTasks: number;
  taskTitle: string;
};

const BoardItem = ({
  completedSubTasks,
  subTasks,
  taskTitle,
}: BoardItemProps) => {
  return (
    <div className='board-item'>
      <p className='board-item-title fw-700-m'>{taskTitle}</p>
      <p className='board-item-subtask fw-700-xs'>
        {completedSubTasks} of {subTasks} substasks
      </p>
    </div>
  );
};

export default BoardItem;
