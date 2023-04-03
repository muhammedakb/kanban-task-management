import { useMemo, useState } from 'react';
import classNames from 'classnames';
import { Outlet, useLocation } from 'react-router-dom';

import BoardBar from '@components/BoardBar';
import Header from '@components/Header';

import { useNavbarVisibility } from '@context/NavbarVisibilityProvider';

import { deslugify } from '@utils/index';

import data from '../../../data/data.json';

import AddNewBoard from './newBoard/AddNewBoard';
import AddNewTask from './newTask/AddNewTask';

import './addNew.scss';

const Layout = () => {
  const { pathname } = useLocation();
  const { isOpened, isMobileMenu } = useNavbarVisibility();

  const [addNewTaskModalStatus, addNewTaskSetModalStatus] = useState(false);
  const [addNewBoardModalStatus, addNewBoardSetModalStatus] = useState(false);

  const openAddNewBoard = () => {
    addNewBoardSetModalStatus(true);
  };

  const closeAddNewBoard = () => {
    addNewBoardSetModalStatus(false);
  };

  const openAddNewTask = () => {
    addNewTaskSetModalStatus(true);
  };

  const closeAddNewTask = () => {
    addNewTaskSetModalStatus(false);
  };

  const boardItems = useMemo(
    () => data.boards.map((board) => ({ text: board.name })),
    []
  );

  const title = useMemo(() => deslugify(pathname.replace('/', '')), [pathname]);

  return (
    <>
      <BoardBar boardItems={boardItems} onCreateClick={openAddNewBoard} />
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
              onClick: () => {
                console.log('clicked');
              },
            },
            {
              text: 'Delete Board',
              variant: 'danger',
              onClick: () => {
                console.log('clicked');
              },
            },
          ]}
          onAddNewTaskClick={openAddNewTask}
          title={title}
        />
        <Outlet />
        <AddNewBoard
          closeModal={closeAddNewBoard}
          istheModalOpen={addNewBoardModalStatus}
        />
        <AddNewTask
          closeModal={closeAddNewTask}
          istheModalOpen={addNewTaskModalStatus}
        />
      </main>
    </>
  );
};

export default Layout;
