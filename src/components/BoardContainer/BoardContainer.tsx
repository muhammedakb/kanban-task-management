import type { ReactNode } from 'react';

import './boardContainer.scss';

type BoardContainerProps = {
  children: ReactNode;
};

const BoardContainer = ({ children }: BoardContainerProps) => (
  <main className="container">{children}</main>
);
export default BoardContainer;
