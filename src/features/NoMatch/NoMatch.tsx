import { Link } from 'react-router-dom';

import './noMatch.scss';

const NoMatch = () => (
  <div className="no-match center-flex">
    <main className="no-match__main center-flex flex-column">
      <h2 className="no-match__main__title fw-700-xl">Nothing to see here!</h2>
      <Link className="no-match__main__redirect fw-700-m" to="/">
        Go to the home page
      </Link>
    </main>
  </div>
);

export default NoMatch;
