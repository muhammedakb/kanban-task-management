import { memo, useMemo } from 'react';
import type { FC } from 'react';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';

import AddNewBoard from '@components/Modals/AddNewBoard';
import AddNewTask from '@components/Modals/AddNewTask';
import DeleteModal from '@components/Modals/DeleteModal';
import EditBoard from '@components/Modals/EditBoard';

import type { modalInitialState } from '@layout/Layout/reducer';

import { deleteBoard } from '@slices/boardSlice';
import { getBoards } from '@slices/selector';

import { addEllipsis } from '@utils/index';

type ActionModalsProps = {
  modalState: typeof modalInitialState;
  title: string;
  toggleAddNewBoard: () => void;
  toggleAddNewTask: () => void;
  toggleDeleteBoard: () => void;
  toggleEditBoard: () => void;
};

const ActionModals: FC<ActionModalsProps> = ({
  modalState,
  title,
  toggleAddNewBoard,
  toggleAddNewTask,
  toggleDeleteBoard,
  toggleEditBoard,
}) => {
  const boards = useAppSelector(getBoards);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // TODO: dont pass string[] => pass Column[]
  const boardColumns = useMemo(
    () =>
      boards
        ?.filter((board) => board.name === title)?.[0]
        ?.columns?.map((column) => column.name),
    [boards, title]
  );

  const onBoardDelete = () => {
    dispatch(deleteBoard({ id: pathname.split('/').at(-1) ?? '' }));
    navigate('/');
    toast.success(`${addEllipsis(title)} board is deleted.`);
    toggleDeleteBoard();
  };

  return (
    <>
      <AddNewBoard
        closeModal={toggleAddNewBoard}
        istheModalOpen={modalState.isAddNewBoardModalOn}
      />
      <AddNewTask
        closeModal={toggleAddNewTask}
        istheModalOpen={modalState.isAddNewTaskModalOn}
      />
      <EditBoard
        boardName={title}
        closeModal={toggleEditBoard}
        columns={boardColumns}
        istheModalOpen={modalState.isEditBoardModalOn}
      />
      <DeleteModal
        boardName={title}
        closeModal={toggleDeleteBoard}
        istheModalOpen={modalState.isDeleteBoardModalOn}
        onDelete={onBoardDelete}
        type="board"
      />
    </>
  );
};
export default memo(ActionModals);
