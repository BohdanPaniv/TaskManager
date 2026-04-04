export interface TaskItem {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  status: TaskStatus;
  createdAt: string;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  status: TaskStatus;
}

export interface UpdateTaskRequest {
  title: string;
  description: string;
  isCompleted: boolean;
  status: TaskStatus;
}

export interface BoardColumn {
  id: TaskStatus;
  title: string;
  tasks: TaskItem[];
}

export type TaskStatus = 'todo' | 'inprogress' | 'done';

export interface MoveTaskRequest {
  status: TaskStatus;
}