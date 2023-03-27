import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import data from '../data/data.json';

import Container from './layout/Container/Container';
import Layout from './layout/Layout/Layout';
import { slugify } from './utils';

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />} path="/">
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
