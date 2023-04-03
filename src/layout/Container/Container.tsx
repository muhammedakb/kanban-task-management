import { useMemo, useState } from 'react';
import type { FC } from 'react';
import type { ColumnData } from 'types/types';

import BoardColumn from '@components/BoardColumn';
import BoardContainer from '@components/BoardContainer';
import Button from '@components/Button';

import NewColumn from '../Layout/newColumn';

import ItemDetailModal from './ItemDetailModal';

type ContainerProps = {
  columns: ColumnData[];
};

const Container: FC<ContainerProps> = ({ columns }) => {
  const [istheModalOpen, toggleModal] = useState(false);
  const [istheNewColumnModalOpen, toggleNewColumnModal] = useState(false);
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

  const onNewColumnClick = () => {
    toggleNewColumnModal(true);
  };

  const closeNewColumnModal = () => {
    toggleNewColumnModal(false);
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
          <Button
            onClick={onNewColumnClick}
            size="medium"
            text="+ Add New Column"
          />
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
          {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
          <section
            className="container__new-column fw-700-xl center-flex"
            onClick={onNewColumnClick}
            role="button"
          >
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
      <NewColumn
        closeModal={closeNewColumnModal}
        istheModalOpen={istheNewColumnModalOpen}
      />
    </BoardContainer>
  );
};

export default Container;
