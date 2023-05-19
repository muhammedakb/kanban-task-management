export type Boards = {
  boards: Board[];
};

export type Board = {
  id: string;
  name: string;
  columns: Column[];
};

export type Column = {
  name: string;
  tasks: Task[];
};

export type Task = {
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
};

export type Subtask = {
  title: string;
  isCompleted: boolean;
};
