import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { environment } from "@env/environment";
import { CreateBoardListRequest, UpdateBoardListRequest, BoardList } from '@core/models/board-list.model';
import { ApiResponse } from "@core/models/api-response.model";
import { catchError, tap } from 'rxjs/operators';
import { throwError } from "rxjs";
import { BoardService } from "./board.service";

@Injectable({ providedIn: "root"})
export class BoardListService {
  private http = inject(HttpClient);
  private readonly API = `${environment.apiUrl}/api/boardlist`;
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

  move(id: number, boardListId: number){
      const task = this.boardLists().find(t => t.id === id);

      if (!task) {
          return throwError(() => new Error('Task not found'));
      }

      return this.http.patch<ApiResponse<BoardList>>(`${this.API}/${id}/move`, {
          boardListId
      }).pipe(
          tap(response => {
              this.boardLists.update(task => 
                  task.map(t => t.id === id ? response.data : t)
              );
          }),
          catchError(err => throwError(() => err))
      )
  }
}