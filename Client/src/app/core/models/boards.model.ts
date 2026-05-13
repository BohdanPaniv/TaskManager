import { BoardList } from "./board-list.model";

export interface Board {
  id: number;
  title: string;
  identNumber: string,
  boardLists: BoardList[];
}

export interface CreateBoardRequest {
  title: string;
}