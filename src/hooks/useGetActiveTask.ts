import { useLocation } from 'react-router-dom';
import { useAppSelector } from 'store';

import { createSelector } from '@reduxjs/toolkit';

import { getBoards } from '@slices/selector';

export const useGetActiveTask = () => {
  const task = useAppSelector((state) => state.task);

  const { pathname } = useLocation();
  const id = pathname.split('/').at(-1);

  const findedTask = createSelector(getBoards, (boards) =>
    boards.find((board) => board.id === id)
  );

  const activeTask = findedTask({ task });

  return activeTask;
};
