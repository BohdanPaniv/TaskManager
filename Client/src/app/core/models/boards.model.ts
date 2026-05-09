import { BoardList } from "./board-list.model";

export interface Board {
  id: number;
  title: string;
  boardLists: BoardList[];
}