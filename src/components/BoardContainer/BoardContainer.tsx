import type { ReactNode } from 'react';

import { useTheme } from '@context/ThemeProvider';

import './boardContainer.scss';

type BoardContainerProps = {
  children: ReactNode;
};

const BoardContainer = ({ children }: BoardContainerProps) => {
  const { theme } = useTheme();
  return <main className={`container ${theme}`}>{children}</main>;
};
export default BoardContainer;
