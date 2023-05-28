import type { RootState } from 'store';

const getBoards = (state: RootState) => state.board.boards;

export { getBoards };
