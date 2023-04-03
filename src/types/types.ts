export type ColumnData = {
  name: string;
  tasks: Array<{
    title: string;
    description: string;
    status: string;
    subtasks: Array<{
      title: string;
      isCompleted: boolean;
    }>;
  }>;
};
