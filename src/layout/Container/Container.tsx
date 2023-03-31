import { useMemo, useState } from 'react';
import type { FC } from 'react';

import BoardColumn from 'components/BoardColumn';
import BoardContainer from 'components/BoardContainer';
import Button from 'components/Button';

import type { ColumnData } from 'types';

import ItemDetailModal from './ItemDetailModal';

type ContainerProps = {
  columns: ColumnData[];
};

const Container: FC<ContainerProps> = ({ columns }) => {
  const [istheModalOpen, toggleModal] = useState(false);
  const [openedItem, setOpenedItem] = useState<ColumnData['tasks'][0]>();

  const completedSubTasks = useMemo(
    () => openedItem?.subtasks?.filter((item) => item.isCompleted).length,
    [openedItem]
  );

  const options = columns.map((column) => ({
    value: column.name,
    text: column.name,
  }));

  const onItemClick = (item: ColumnData['tasks'][0]) => {
    setOpenedItem(item);
    toggleModal(true);
  };

  const closeModal = () => {
    toggleModal(false);
    setOpenedItem(undefined);
  };

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
      {!columns || columns.length < 1 ? (
        <div className="container__empty-board center-flex flex-column">
          <p className="fw-700-lg">
            This board is empty. Create a new column to get started.
          </p>
          <Button size="medium" text="+ Add New Column" />
        </div>
      ) : (
        <>
          {columns.map((column, index) => (
            <BoardColumn
              key={column.name}
              categoryTitleColor={handleColor(index)}
              columnData={column}
              onItemClick={onItemClick}
            />
          ))}
          <section className="container__new-column fw-700-xl center-flex">
            + New Column
          </section>
          <ItemDetailModal
            closeModal={closeModal}
            completedSubTasks={completedSubTasks ?? 0}
            istheModalOpen={istheModalOpen}
            openedItem={openedItem}
            options={options}
          />
        </>
      )}
    </BoardContainer>
  );
};

export default Container;
