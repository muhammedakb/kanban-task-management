import { useMemo } from 'react';
import classNames from 'classnames';
import { Outlet, useLocation } from 'react-router-dom';

import data from '../../../data/data.json';
import BoardBar from '../../components/BoardBar';
import Header from '../../components/Header';
import { useNavbarVisibility } from '../../context/NavbarVisibilityProvider';
import { deslugify } from '../../utils';

const Layout = () => {
  const { pathname } = useLocation();
  const { isOpened, isMobileMenu } = useNavbarVisibility();

  const boardItems = useMemo(
    () => data.boards.map((board) => ({ text: board.name })),
    []
  );

  const title = useMemo(() => deslugify(pathname.replace('/', '')), [pathname]);

  return (
    <>
      <BoardBar boardItems={boardItems} onCreate={() => {}} />
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
          onAddNewTaskClick={() => console.log('onAddNewTaskClick')}
          title={title}
        />
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
