import { useMemo, useReducer } from 'react';
import classNames from 'classnames';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'store';

import BoardBar from '@components/BoardBar';
import Header from '@components/Header';
import AddNewBoard from '@components/Modals/AddNewBoard';
import AddNewTask from '@components/Modals/AddNewTask';
import DeleteModal from '@components/Modals/DeleteModal';
import EditBoard from '@components/Modals/EditBoard';

import { useNavbarVisibility } from '@context/NavbarVisibilityProvider';
import { useTheme } from '@context/ThemeProvider';

import { deleteBoard } from '@slices/boardSlice';
import { getBoards } from '@slices/selector';

import { deslugify } from '@utils/index';

import { modalInitialState, modalReducer, Toggles } from './reducer';

import '@components/Modals/addNew.scss';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  const reduxDispatch = useAppDispatch();
  const boards = useAppSelector(getBoards);
  const { theme } = useTheme();
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const { isOpened, isMobileMenu } = useNavbarVisibility();

  const [state, dispatch] = useReducer(modalReducer, modalInitialState);

  const toggleAddNewBoard = () => {
    dispatch({ type: Toggles.ADD_NEW_BOARD });
  };

  const toggleAddNewTask = () => {
    dispatch({ type: Toggles.ADD_NEW_TASK });
  };

  const toggleDeleteBoard = () => {
    dispatch({ type: Toggles.DELETE_BOARD });
  };

  const toggleEditBoard = () => {
    dispatch({ type: Toggles.EDIT_BOARD });
  };

  const boardItems = useMemo(
    () => boards.map((board) => ({ id: board.id, text: board.name })),
    [boards]
  );

  const title = useMemo(() => deslugify(pathname.split('/')[1]), [pathname]);

  const boardColumns = useMemo(
    () =>
      boards
        ?.filter((board) => board.name === title)?.[0]
        ?.columns?.map((column) => column.name),
    [boards, title]
  );

  const onDelete = () => {
    reduxDispatch(deleteBoard({ id: pathname.split('/').at(-1) ?? '' }));
    navigate('/');
    toast.success(`${title} is deleted.`);
    toggleDeleteBoard();
  };

  return (
    <>
      <BoardBar boardItems={boardItems} onCreateClick={toggleAddNewBoard} />
      <main
        className={classNames('main', {
          isOpened: isOpened && !isMobileMenu,
        })}
      >
        <Header
          menuItems={[
            {
              text: 'Edit Board',
              variant: 'primary',
              onClick: toggleEditBoard,
            },
            {
              text: 'Delete Board',
              variant: 'danger',
              onClick: toggleDeleteBoard,
            },
          ]}
          onAddNewTaskClick={toggleAddNewTask}
          title={title}
        />
        <Outlet />
        <AddNewBoard
          closeModal={toggleAddNewBoard}
          istheModalOpen={state.isAddNewBoardModalOn}
        />
        <AddNewTask
          closeModal={toggleAddNewTask}
          istheModalOpen={state.isAddNewTaskModalOn}
        />
        <EditBoard
          boardName={title}
          closeModal={toggleEditBoard}
          columns={boardColumns}
          istheModalOpen={state.isEditBoardModalOn}
        />
        <DeleteModal
          boardName={title}
          closeModal={toggleDeleteBoard}
          istheModalOpen={state.isDeleteBoardModalOn}
          onDelete={onDelete}
          type="board"
        />
        <ToastContainer autoClose={2000} theme={theme} />
      </main>
    </>
  );
};

export default Layout;
