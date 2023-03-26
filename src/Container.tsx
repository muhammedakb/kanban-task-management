import type { FC } from 'react';

import BoardColumn from './components/BoardColumn';
import BoardContainer from './components/BoardContainer';
import type { ColumnData } from './types';

type ContainerProps = {
  columns: ColumnData[];
};

const Container: FC<ContainerProps> = ({ columns }) => {
  const handleColor = (index: number): string => {
    switch (index) {
      case 0:
        return '#49C4E5';
      case 1:
        return '#8471F2';
      case 2:
        return '#67E2AE';
      default:
        return '#49C4E5';
    }
  };
  return (
    <BoardContainer>
      {columns.map((column, index) => (
        <BoardColumn
          key={column.name}
          categoryTitleColor={handleColor(index)}
          columnData={column}
          onItemClick={(item) => console.log('ITEM', item)}
        />
      ))}
    </BoardContainer>
  );
};

export default Container;
