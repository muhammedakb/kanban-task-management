import { useCallback, useMemo, useReducer, useState } from 'react';
import type { FC } from 'react';
import type { ColumnData } from 'types/types';

import BoardColumn from '@components/BoardColumn';
import BoardContainer from '@components/BoardContainer';
import Button from '@components/Button';
import DeleteModal from '@components/DeleteModal/DeleteModal';
import AddNewColumn from '@components/Modals/AddNewColumn';
import EditTask from '@components/Modals/AddNewTask';
import ItemDetail from '@components/Modals/ItemDetail';

import { modalInitialState, modalReducer, Toggles } from './reducer';

type ContainerProps = {
  columns: ColumnData[];
};

const Container: FC<ContainerProps> = ({ columns }) => {
  const [state, dispatch] = useReducer(modalReducer, modalInitialState);
  const [openedItem, setOpenedItem] = useState<ColumnData['tasks'][0]>();

  const completedSubTasks = useMemo(
    () => openedItem?.subtasks?.filter((item) => item.isCompleted).length,
    [openedItem]
  );

  const options = columns.map((column) => ({
    value: column.name,
    text: column.name,
  }));

  const toggleItemDetail = () => {
    dispatch({ type: Toggles.ITEM_DETAIL });
  };

  const toggleAddNewColumn = () => {
    dispatch({ type: Toggles.ADD_NEW_COLUMN });
  };

  const toggleTask = useCallback(
    (type: 'edit' | 'delete') => {
      if (state.isItemDetailModalOn) toggleItemDetail();
      dispatch({
        type: type === 'edit' ? Toggles.EDIT_TASK : Toggles.DELETE_TASK,
      });
    },
    [state.isItemDetailModalOn]
  );

  const onItemClick = (item: ColumnData['tasks'][0]) => {
    setOpenedItem(item);
    toggleItemDetail();
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
            onClick={toggleAddNewColumn}
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
            onClick={toggleAddNewColumn}
            role="button"
          >
            + New Column
          </section>
          <ItemDetail
            closeModal={toggleItemDetail}
            completedSubTasks={completedSubTasks ?? 0}
            istheModalOpen={state.isItemDetailModalOn}
            onDelete={() => toggleTask('delete')}
            onEdit={() => toggleTask('edit')}
            openedItem={openedItem}
            options={options}
          />
          <EditTask
            editMode
            closeModal={() => toggleTask('edit')}
            istheModalOpen={state.isEditTaskModalOn}
            taskValues={{
              status: openedItem?.status ?? '',
              title: openedItem?.title ?? '',
              description: openedItem?.description ?? '',
              subtasks: openedItem?.subtasks?.map(
                (subtask) => subtask.title
              ) ?? [''],
            }}
          />
          <DeleteModal
            closeModal={() => toggleTask('delete')}
            istheModalOpen={state.isDeleteTaskModalOn}
            onDelete={() => {
              alert(`${openedItem?.title} - deleted`);
            }}
            taskName={openedItem?.title ?? ''}
            type="task"
          />
        </>
      )}
      <AddNewColumn
        closeModal={toggleAddNewColumn}
        istheModalOpen={state.isAddNewColumnModalOn}
      />
    </BoardContainer>
  );
};

export default Container;
