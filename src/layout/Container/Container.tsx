import { useCallback, useMemo, useReducer, useState } from 'react';
import type { FC } from 'react';
import toast from 'react-hot-toast';
import { useAppDispatch } from 'store';

import type { Column } from '@@types/types';

import BoardColumn from '@components/BoardColumn';
import BoardContainer from '@components/BoardContainer';
import Button from '@components/Button';
import AddNewColumn from '@components/Modals/AddNewColumn';
import EditTask from '@components/Modals/AddNewTask';
import DeleteModal from '@components/Modals/DeleteModal';
import ItemDetail from '@components/Modals/ItemDetail';

import { useGetOpenedItem } from '@hooks/useGetOpenedItem';

import { deleteTask } from '@slices/boardSlice';

import { addEllipsis, handleColor } from '@utils/index';

import { modalInitialState, modalReducer } from './reducer';

type ContainerProps = {
  columns: Column[];
};

const Container: FC<ContainerProps> = ({ columns }) => {
  const reduxDispatch = useAppDispatch();
  const [state, dispatch] = useReducer(modalReducer, modalInitialState);

  const [openedItemID, setOpenedItemID] = useState<string>();

  const { activeBoard, openedItem } = useGetOpenedItem(openedItemID ?? '');

  const completedSubTasks = useMemo(
    () => openedItem?.subtasks?.filter((item) => item.isCompleted).length,
    [openedItem]
  );

  const options = columns.map((column) => ({
    value: column.name,
    text: column.name,
  }));

  const toggleItemDetail = () => {
    dispatch({ type: 'ITEM_DETAIL' });
  };

  const toggleAddNewColumn = () => {
    dispatch({ type: 'ADD_NEW_COLUMN' });
  };

  const toggleTask = useCallback(
    (type: 'edit' | 'delete') => {
      if (state.isItemDetailModalOn) toggleItemDetail();
      dispatch({
        type: type === 'edit' ? 'EDIT_TASK' : 'DELETE_TASK',
      });
    },
    [state.isItemDetailModalOn]
  );

  const onItemClick = (itemId: string) => {
    setOpenedItemID(itemId);
    toggleItemDetail();
  };

  const onTaskDelete = () => {
    reduxDispatch(
      deleteTask({
        boardId: activeBoard?.id ?? '',
        taskId: openedItem?.id ?? '',
      })
    );
    toggleTask('delete');
    toast.success(`${addEllipsis(openedItem?.title ?? '')} task deleted.`);
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
              id={column.id}
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
            openedItemID={openedItemID}
            options={options}
          />
          <EditTask
            editMode
            closeModal={() => toggleTask('edit')}
            istheModalOpen={state.isEditTaskModalOn}
            taskValues={{
              id: openedItem?.id ?? '',
              status: openedItem?.status ?? '',
              title: openedItem?.title ?? '',
              description: openedItem?.description ?? '',
              subtasks: openedItem?.subtasks ?? [],
            }}
          />
          <DeleteModal
            closeModal={() => toggleTask('delete')}
            istheModalOpen={state.isDeleteTaskModalOn}
            onDelete={onTaskDelete}
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
