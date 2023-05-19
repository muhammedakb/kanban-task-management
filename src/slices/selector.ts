import type { RootState } from 'store';

const getBoards = (state: RootState) => state.task.boards;

export { getBoards };
