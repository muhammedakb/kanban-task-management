import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from 'store';

import NoMatch from '@features/NoMatch';

import { getBoards } from '@slices/selector';

import Container from './layout/Container';
import Layout from './layout/Layout';
import { slugify } from './utils';

const Router = () => {
  const boards = useAppSelector(getBoards);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />} path="/">
          <Route
            element={
              <Navigate
                to={`${slugify(boards?.at?.(0)?.name ?? '')}/${
                  boards?.at?.(0)?.id ?? ''
                }`}
              />
            }
            path="/"
          />
          {boards.map((board) => (
            <Route
              key={board.id}
              element={<Container columns={board.columns} />}
              path={`${slugify(board.name)}/${board.id}`}
            />
          ))}

          <Route element={<NoMatch />} path="*" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
