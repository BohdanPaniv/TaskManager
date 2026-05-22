import { TaskItem } from './task.model';

export interface UpdateBoardListRequest {
  title: string;
  description: string;
  isCompleted: boolean;
  boardListId: number;
}

export interface BoardList {
  id: number;
  title: string;
  createdAt: Date;
  boardId: number;
  tasks: TaskItem[];
}

export interface MoveBoardListItemRequest {
  boadListId: number;
}

export interface CreateBoardListRequest{
  title: string;
  boardId: number;
}

export interface BoardListItem {
  id: number;
  name: string;
  boardId: number;
}