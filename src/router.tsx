import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import data from '../data/data.json';

import Container from './layout/Container/Container';
import NoMatch from './layout/Container/NoMatch';
import Layout from './layout/Layout/Layout';
import { slugify } from './utils';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />} path="/">
        <Route
          element={<Navigate to={slugify(data.boards.at(0)?.name as string)} />}
          path="/"
        />
        {data.boards.map((board) => (
          <Route
            key={board.name}
            element={<Container columns={board.columns} />}
            path={slugify(board.name)}
          />
        ))}

        <Route element={<NoMatch />} path="*" />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
