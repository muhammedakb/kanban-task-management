/* eslint-disable no-param-reassign */
import type { Board, BoardForm, Boards, Task } from 'types/types';

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
    editBoard: (state, action: PayloadAction<BoardForm>) => {
      const { columns, id, name } = action.payload;

      const activeBoardIndex = state.boards.findIndex(
        (board) => board.id === id
      );

      if (activeBoardIndex !== -1) {
        const activeBoard = state.boards[activeBoardIndex];

        if (name !== activeBoard.name) {
          activeBoard.name = name;
        }

        const columnMap = new Map();
        const columnsDiff = columns.filter(
          (column) => column.newValue !== column.oldValue
        );

        columnsDiff.forEach((diff) => {
          columnMap.set(diff.oldValue, diff.newValue);
        });

        activeBoard.columns.forEach((column) => {
          if (columnMap.has(column.name)) {
            const newName = columnMap.get(column.name);
            column.name = newName;
            column.tasks.forEach((task) => {
              task.status = newName;
            });
          }
        });

        state.boards[activeBoardIndex] = activeBoard;
      }
    },
    // 4) Delete Board
    deleteBoard: (state, action: PayloadAction<{ id: string }>) => {
      state.boards = state.boards.filter(
        (board) => board.id !== action.payload.id
      );
    },
    // 5) Add New Column
    addNewColumn: (
      state,
      action: PayloadAction<{ columnName: string; id: string }>
    ) => {
      const { columnName, id } = action.payload;
      const activeBoard = state?.boards?.find((board) => board.id === id);

      if (activeBoard) {
        activeBoard.columns.push({
          name: columnName,
          tasks: [],
        });
      }
    },
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
