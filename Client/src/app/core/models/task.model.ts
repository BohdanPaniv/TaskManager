export interface TaskItem {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  status: 'todo' | 'inprogress' | 'done';
  createdAt: string;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  status: 'todo' | 'inprogress' | 'done';
}

export interface UpdateTaskRequest {
  title: string;
  description: string;
  isCompleted: boolean;
  status: 'todo' | 'inprogress' | 'done';
}

export interface BoardColumn {
  id: 'todo' | 'inprogress' | 'done';
  title: string;
  tasks: TaskItem[];
}