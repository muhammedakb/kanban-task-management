import type { FC } from 'react';
import type { Column } from 'types/types';

import BoardCategoryTitle from '../BoardCategoryTitle';
import BoardItem from '../BoardItem';

import './boardColumn.scss';

type BoardColumnProps = {
  categoryTitleColor: string;
  columnData: Column;
  onItemClick: (item: Column['tasks'][0]) => void;
};

const BoardColumn: FC<BoardColumnProps> = ({
  categoryTitleColor,
  columnData,
  onItemClick,
}) => (
  <section className="board__column">
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
            onItemClick={() => onItemClick(item)}
            subTasks={item.subtasks.length}
            taskTitle={item.title}
          />
        );
      })}
    </main>
  </section>
);

export default BoardColumn;
