import { useMemo, useReducer } from 'react';
import classNames from 'classnames';
import { Outlet, useLocation } from 'react-router-dom';

import BoardBar from '@components/BoardBar';
import DeleteModal from '@components/DeleteModal/DeleteModal';
import Header from '@components/Header';
import AddNewBoard from '@components/Modals/AddNewBoard';
import AddNewTask from '@components/Modals/AddNewTask';
import EditBoard from '@components/Modals/EditBoard';

import { useNavbarVisibility } from '@context/NavbarVisibilityProvider';

import { deslugify } from '@utils/index';

import data from '../../../data/data.json';

import { modalInitialState, modalReducer, Toggles } from './reducer';

import '@components/Modals/addNew.scss';

const Layout = () => {
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
    () => data.boards.map((board) => ({ text: board.name })),
    []
  );

  const title = useMemo(() => deslugify(pathname.replace('/', '')), [pathname]);

  const boardColumns = useMemo(
    () =>
      data.boards
        ?.filter((board) => board.name === title)?.[0]
        ?.columns?.map((column) => column.name),
    [title]
  );

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
          onDelete={() => {
            alert(`${title} - deleted`);
          }}
          type="board"
        />
      </main>
    </>
  );
};

export default Layout;
