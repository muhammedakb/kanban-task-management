/* eslint-disable no-param-reassign */
import type { Board, BoardForm, Boards, Task } from '@@types/types';

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { generateID } from '@utils/index';

import data from '../../data/data.json';

const initialState: Boards = {
  boards: data.boards ?? [],
};

export const boardSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
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
          id: generateID(),
        });
      }
    },
    // 6) Edit Task
    editTask: (
      state,
      action: PayloadAction<{
        boardId: string;
        taskId: string;
        values: Task;
      }>
    ) => {
      const { boardId, taskId, values } = action.payload;
      const activeBoard = state.boards.find((board) => board.id === boardId);

      const activeColumn = activeBoard?.columns?.find((column) =>
        column?.tasks?.find((task) => task?.id === taskId)
      );

      const openedTaskIndex = activeColumn?.tasks.findIndex(
        (task) => task.id === taskId
      );

      if (openedTaskIndex !== -1) {
        const newTask = {
          description: values.description,
          status: values.status,
          subtasks: values.subtasks,
          title: values.title,
          id: taskId,
        };
        if (
          activeColumn?.tasks[openedTaskIndex as number]?.status !==
          values.status
        ) {
          activeColumn?.tasks?.splice(openedTaskIndex as number, 1);

          activeBoard?.columns
            ?.find((column) => column.name === values.status)
            ?.tasks.push(newTask);
        } else {
          activeColumn.tasks[openedTaskIndex as number] = newTask;
        }
      }
    },
    // 7) Delete Task
    deleteTask: (
      state,
      action: PayloadAction<{
        boardId: string;
        taskId: string;
      }>
    ) => {
      const { boardId, taskId } = action.payload;
      const activeBoard = state.boards.find((board) => board.id === boardId);

      const activeColumn = activeBoard?.columns?.find((column) =>
        column?.tasks?.find((task) => task?.id === taskId)
      );

      const openedTaskIndex = activeColumn?.tasks.findIndex(
        (task) => task.id === taskId
      );

      if (openedTaskIndex !== -1) {
        activeColumn?.tasks?.splice(openedTaskIndex as number, 1);
      }
    },
    // 8) Subtask checkboxes (checked-unchecked)
    toggleSubtaskStatus: (
      state,
      action: PayloadAction<{
        boardId: string;
        checked: boolean;
        subtaskId: string;
        taskId: string;
      }>
    ) => {
      const { boardId, checked, subtaskId, taskId } = action.payload;
      const activeBoard = state.boards.find((board) => board.id === boardId);

      const activeColumn = activeBoard?.columns?.find((column) =>
        column?.tasks?.find((task) => task?.id === taskId)
      );

      const openedTask = activeColumn?.tasks.find((task) => task.id === taskId);

      const subtaskIndex = openedTask?.subtasks?.findIndex(
        (subtask) => subtask?.id === subtaskId
      );

      if (subtaskIndex !== -1 && openedTask) {
        openedTask.subtasks[subtaskIndex as number].isCompleted = checked;
      }
    },
    // 9) Task status change (select box)
    toggleTaskStatus: (
      state,
      action: PayloadAction<{
        boardId: string;
        status: string;
        taskId: string;
      }>
    ) => {
      const { boardId, status, taskId } = action.payload;
      const activeBoard = state.boards.find((board) => board.id === boardId);

      const activeColumn = activeBoard?.columns?.find((column) =>
        column?.tasks?.find((task) => task?.id === taskId)
      );

      const openedTaskIndex = activeColumn?.tasks.findIndex(
        (task) => task.id === taskId
      );

      if (openedTaskIndex !== -1 && activeColumn) {
        const currentTask = activeColumn.tasks[openedTaskIndex as number];

        activeColumn?.tasks?.splice(openedTaskIndex as number, 1);

        activeBoard?.columns
          ?.find((column) => column.name === status)
          ?.tasks.push({ ...currentTask, status });
      }
    },
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
} = boardSlice.actions;

export default boardSlice.reducer;
