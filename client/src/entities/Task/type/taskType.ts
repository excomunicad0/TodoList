export type Task = {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  userId: number;
  categoryId: number;
  priorityId: number;
};

export type TaskWithoutId = Omit<Task, 'id'>;

export type TaskId = Task['id'];
