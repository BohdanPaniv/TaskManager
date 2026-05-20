export interface BoardInfo {
  id: number;
  title: string;
  identNumber: string,
}

export interface CreateBoardRequest {
  title: string;
}

export interface UpdateBoardRequest {
  title: string;
}