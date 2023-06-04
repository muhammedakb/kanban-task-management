import { useMemo } from 'react';
import type { Task } from 'types/types';

import { useGetActiveBoard } from './useGetActiveBoard';

export const useGetOpenedItem = (itemId: string) => {
  const activeBoard = useGetActiveBoard();

  if (activeBoard) {
    const openedItem = useMemo(
      () =>
        activeBoard?.columns?.reduce((result: Task[], column) => {
          const findedTask = column.tasks.find((task) => task.id === itemId);
          if (findedTask !== undefined) {
            result.push(findedTask);
          }
          return result;
        }, []),
      [activeBoard?.columns, itemId]
    );

    return { activeBoard, openedItem: openedItem?.[0] };
  }
  throw new Error('Board not found!');
};
