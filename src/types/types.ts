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

export type TaskForm = Omit<Task, 'subtasks'> & { subtasks: string[] };
export type BoardForm = Omit<Board, 'columns'> & {
  columns: Array<{ newValue: string; oldValue: string }>;
};

export type Subtask = {
  title: string;
  isCompleted: boolean;
};
