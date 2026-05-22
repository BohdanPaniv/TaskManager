import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { environment } from "@env/environment";
import { CreateBoardListRequest, UpdateBoardListRequest, BoardList } from '@core/models/board-list.model';
import { ApiResponse } from "@core/models/api-response.model";
import { catchError, tap } from 'rxjs/operators';
import { throwError } from "rxjs";
import { BoardService } from "./board.service";
import { TaskItem, MoveTaskRequest } from "@core/models/task.model";

@Injectable({ providedIn: "root"})
export class BoardListService {
  private http = inject(HttpClient);
  private readonly API = `${environment.apiUrl}/api/boardlist`;
  private readonly TaskAPI = `${environment.apiUrl}/api/task`;
  private boardService = inject(BoardService);

  boardLists = this.boardService.boardLists;
  isSubmitting = signal(false);

  create(request: CreateBoardListRequest) {
    this.isSubmitting.set(true);
    
    return this.http.post<ApiResponse<BoardList>>(this.API, request).pipe(
        tap(response => {
            this.boardLists.update(lists => [...lists, response.data]);
            this.isSubmitting.set(false);
        }),
        catchError(err => {
            this.isSubmitting.set(false);
            return throwError(() => err);
        })
    );
  }

  update(id: number, request: UpdateBoardListRequest) {
      this.isSubmitting.set(true);
      
      return this.http.put<ApiResponse<BoardList>>(`${this.API}/${id}`, request).pipe(
          tap(response => {
              this.boardLists.update(tasks => tasks.map(t => t.id === id ? response.data : t));
              this.isSubmitting.set(false);
          }),
          catchError(err => {
              this.isSubmitting.set(false);
              return throwError(() => err);
          })
      );
  }

  delete(id: number) {
      return this.http.delete(`${this.API}/${id}`).pipe(
          tap(() => this.boardLists.update(boardLists => boardLists.filter(t => t.id !== id))),
          catchError(err => throwError(() => err))
      );
  }

  move(id: number, prevBoardListId: number, boardListId: number){
    const boardList = this.boardLists().find(bl => bl.id === prevBoardListId);

    if (!boardList) {
        return throwError(() => new Error('Board list not found'));
    }

    const task = boardList.tasks.find(t => t.id === id);
    if (!task) {
        return throwError(() => new Error('Task not found'));
    }

    const moveRequest: MoveTaskRequest = {
        boardListId
    };
    
    return this.http.patch<ApiResponse<TaskItem>>(`${this.TaskAPI}/${id}/move`, moveRequest).pipe(
        catchError(err => throwError(() => err))
    )
  }
}