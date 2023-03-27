import type { ReactNode } from 'react';

import './boardContainer.scss';

type Props = {
  children: ReactNode;
};

const BoardContainer = ({ children }: Props) => (
  <main className="container">{children}</main>
);
export default BoardContainer;
