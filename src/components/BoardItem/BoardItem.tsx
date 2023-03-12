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
}: BoardItemProps) => (
  <div className="board__item">
    <p className="boar__item__title fw-700-m">{taskTitle}</p>
    <p className="board__item__subtask fw-700-xs">
      {completedSubTasks} of {subTasks} subtasks
    </p>
  </div>
);
export default BoardItem;
