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
  const [isDragLeave, setIsDragLeave] = useState<boolean>();

  const toggleDragStatus = (status: boolean) => {
    setIsDragLeave(status);
  };

  const style = {
    opacity: '0.3',
  };

  const style2 = {
    backgroundColor: '#7acf64',
    borderRadius: '5px',
  };

  // sütüklediğim item'ın bulunduğu column'u bul ve diğer columnları ayır
  // ayırdığın columnlara stil ata kendi bulunduğum column'a ayrı stil ata
  // how can i do sometimessssss

  // aldığım id'lerin sadece baş karakterini alarak yeni id'yi class'a ekle

  return (
    <section
      className={classNames('board__column', id)}
      style={isDragLeave ? style : style2}
    >
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
