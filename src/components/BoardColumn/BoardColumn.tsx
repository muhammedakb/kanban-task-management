import { type FC, useState } from 'react';
import classNames from 'classnames';

import type { Column } from '@@types/types';

import BoardCategoryTitle from '../BoardCategoryTitle';
import BoardItem from '../BoardItem';

import './boardColumn.scss';

type BoardColumnProps = {
  categoryTitleColor: string;
  columnData: Column;
  id: string;
  onItemClick: (itemId: string) => void;
};

const BoardColumn: FC<BoardColumnProps> = ({
  categoryTitleColor,
  columnData,
  id,
  onItemClick,
}) => {
  const [, setIsDragLeave] = useState<boolean>();

  const toggleDragStatus = (status: boolean) => {
    setIsDragLeave(status);
  };

  return (
    <section className={classNames('board__column', id)}>
      <header className="board__column__title">
        <BoardCategoryTitle
          color={categoryTitleColor}
          piece={columnData.tasks.length}
          text={columnData.name}
        />
      </header>

      <main className="board__column__items flex-column">
        {columnData.tasks.map((item) => {
          const completedSubTasks = item.subtasks.filter(
            (subtask) => subtask.isCompleted
          ).length;
          return (
            <BoardItem
              key={item.title}
              completedSubTasks={completedSubTasks}
              onItemClick={() => onItemClick(item.id ?? '')}
              subTasks={item.subtasks.length}
              taskTitle={item.title}
              toggleDragStatus={toggleDragStatus}
            />
          );
        })}
      </main>
    </section>
  );
};
export default BoardColumn;
