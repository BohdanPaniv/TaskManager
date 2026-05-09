export interface TaskItem {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: string;
}

export interface CreateBoardListRequest {
  title: string;
  description: string;
  boardListId: number;
}

export interface UpdateBoardListRequest {
  title: string;
  description: string;
  isCompleted: boolean;
  boardListId: number;
}

export interface BoardList {
  id: number;
  title: string;
  tasks: TaskItem[];
}

export interface MoveBoardListItemRequest {
  boadListId: number;
}

export interface CreateListRequest{
    title: string;
}

export interface ListItem {
  id: number;
  name: string;
}