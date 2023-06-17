import { useMemo, useReducer } from 'react';
import classNames from 'classnames';
import { Toaster } from 'react-hot-toast';
import { Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from 'store';

import { Themes } from '@@types/enums';

import BoardBar from '@components/BoardBar';
import Header from '@components/Header';

import { useNavbarVisibility } from '@context/NavbarVisibilityProvider';
import { useTheme } from '@context/ThemeProvider';

import ActionModals from '@features/ActionModals';

import { getBoards } from '@slices/selector';

import { deslugify } from '@utils/index';

import { modalInitialState, modalReducer } from './reducer';

import '@components/Modals/addNew.scss';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  const boards = useAppSelector(getBoards);
  const { theme } = useTheme();

  const { pathname } = useLocation();
  const { isOpened, isMobileMenu } = useNavbarVisibility();

  const [modalState, dispatch] = useReducer(modalReducer, modalInitialState);

  const toggleAddNewBoard = () => {
    dispatch({ type: 'ADD_NEW_BOARD' });
  };

  const toggleAddNewTask = () => {
    dispatch({ type: 'ADD_NEW_TASK' });
  };

  const toggleDeleteBoard = () => {
    dispatch({ type: 'DELETE_BOARD' });
  };

  const toggleEditBoard = () => {
    dispatch({ type: 'EDIT_BOARD' });
  };

  const boardItems = useMemo(
    () => boards.map((board) => ({ id: board.id, text: board.name })),
    [boards]
  );

  const title = useMemo(() => deslugify(pathname.split('/')[1]), [pathname]);

  const toastStyle = useMemo(
    () => ({
      background: theme === Themes.Dark ? '#fff' : '#2b2c37',
      color: theme === Themes.Dark ? '#2b2c37' : '#fff',
    }),
    [theme]
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
        <ActionModals
          modalState={modalState}
          title={title}
          toggleAddNewBoard={toggleAddNewBoard}
          toggleAddNewTask={toggleAddNewTask}
          toggleDeleteBoard={toggleDeleteBoard}
          toggleEditBoard={toggleEditBoard}
        />
        <Toaster
          toastOptions={{
            style: toastStyle,
          }}
        />
      </main>
    </>
  );
};

export default Layout;
