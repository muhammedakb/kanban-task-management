import type { ReactNode } from 'react';

import './boardContainer.scss';

type Props = {
  children: ReactNode;
};

const BoardContainer = ({ children }: Props) => (
  <main className="container">
    {children}
    <section className="container__new-column fw-700-xl center-flex">
      + New Column
    </section>
  </main>
);
export default BoardContainer;
