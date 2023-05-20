import type { Board, Boards, Task } from 'types/types';

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import data from '../../data/data.json';

const initialState: Boards = {
  boards: data.boards ?? [],
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    // TODO
    // 1) Add New Board
    addNewBoard: (state, action: PayloadAction<Board>) => {
      state.boards.push(action.payload);
    },
    // 2) Add New Task
    addNewTask: (state, action: PayloadAction<{ id: string; task: Task }>) => {
      const { id, task } = action.payload;

      const activeBoard = state?.boards?.find((board) => board.id === id);

      if (activeBoard) {
        const activeColumn = activeBoard.columns.find(
          (column) => column.name === task.status
        );
        activeColumn?.tasks.push(task);
      }
    },
    // 3) Edit Board
    editBoard: (state, action) => {},
    // 4) Delete Board
    deleteBoard: (state, action) => {},
    // 5) Add New Column
    addNewColumn: (state, action) => {},
    // 6) Edit Task
    editTask: (state, action) => {},
    // 7) Delete Task
    deleteTask: (state, action) => {},
    // 8) Subtask checkboxes (checked-unchecked)
    toggleSubtaskStatus: (state, action) => {},
    // 9) Task status change (select box)
    toggleTaskStatus: (state, action) => {},
  },
});

export const {
  addNewBoard,
  addNewColumn,
  addNewTask,
  deleteBoard,
  deleteTask,
  editBoard,
  editTask,
  toggleSubtaskStatus,
  toggleTaskStatus,
} = taskSlice.actions;

export default taskSlice.reducer;
