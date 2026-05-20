export interface TaskItem {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: string;
  boardListId: number;
}

export interface CreateTaskRequest{
  title: string;
  description: string;
  isCompleted: boolean;
  boardListId: number;
}

export interface UpdateTaskRequest {
  title: string;
  description: string;
  isCompleted: boolean;
  boardListId: number;
}