import { useTheme } from '@context/ThemeProvider';

import './boardItem.scss';

type BoardItemProps = {
  completedSubTasks: number;
  onItemClick: () => void;
  subTasks: number;
  taskTitle: string;
};

const BoardItem = ({
  completedSubTasks,
  onItemClick,
  subTasks,
  taskTitle,
}: BoardItemProps) => {
  const { theme } = useTheme();
  return (
    <div className={`board__item ${theme}`} onClick={onItemClick}>
      <p className="boar__item__title fw-700-m">{taskTitle}</p>
      <p className="board__item__subtask fw-700-xs">
        {completedSubTasks} of {subTasks} subtasks
      </p>
    </div>
  );
};
export default BoardItem;
