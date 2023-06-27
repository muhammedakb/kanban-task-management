import { useTheme } from '@context/ThemeProvider';

import './boardItem.scss';

type BoardItemProps = {
  completedSubTasks: number;
  onItemClick: () => void;
  subTasks: number;
  taskTitle: string;
  toggleDragStatus: (status: boolean) => void;
};

const BoardItem = ({
  completedSubTasks,
  onItemClick,
  subTasks,
  taskTitle,
  toggleDragStatus,
}: BoardItemProps) => {
  const { theme } = useTheme();
  return (
    <div
      draggable
      className={`board__item ${theme}`}
      onClick={onItemClick}
      onDragEnd={(e) => {
        console.log('onDragEnd', e.target);
        toggleDragStatus(false);
      }}
      onDragStart={(e) => {
        console.log('started', e.target);
        toggleDragStatus(true);
      }}
    >
      <p className="boar__item__title fw-700-m">{taskTitle}</p>
      <p className="board__item__subtask fw-700-xs">
        {completedSubTasks} of {subTasks} subtasks
      </p>
    </div>
  );
};
export default BoardItem;
