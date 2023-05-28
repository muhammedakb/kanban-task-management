import { useLocation } from 'react-router-dom';
import { useAppSelector } from 'store';

import { createSelector } from '@reduxjs/toolkit';

import { getBoards } from '@slices/selector';

export const useGetActiveBoard = () => {
  const activeBoard = useAppSelector((state) => state.board);

  const { pathname } = useLocation();
  const id = pathname.split('/').at(-1);

  const findedBoard = createSelector(getBoards, (boards) =>
    boards.find((board) => board.id === id)
  );

  const activeTask = findedBoard({ board: activeBoard });

  return activeTask;
};
