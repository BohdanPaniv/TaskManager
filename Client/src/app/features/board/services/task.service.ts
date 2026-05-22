import { Injectable, signal, inject } from "@angular/core";
import { CreateTaskRequest, UpdateTaskRequest } from '@core/models/task.model';
import { HttpClient } from "@angular/common/http";
import { environment } from "@env/environment";
import { TaskItem } from '@core/models/task.model';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from "rxjs";
import { ApiResponse } from "@core/models/api-response.model";
import { BoardService } from "../services/board.service";

@Injectable({ providedIn: "root"})
export class TaskService {
    private http = inject(HttpClient);
    private readonly API = `${environment.apiUrl}/api/task`;
    private boardService = inject(BoardService);
  
    boardLists = this.boardService.boardLists;
    isSubmitting = signal(false);
    
    create(request: CreateTaskRequest) {
        this.isSubmitting.set(true);

        return this.http.post<ApiResponse<TaskItem>>(this.API, request).pipe(
            tap(response => {
                this.boardLists.update(boardLists =>
                    boardLists.map(boardList =>
                        boardList.id === request.boardListId
                        ? {
                            ...boardList,
                            tasks: [...boardList.tasks, response.data]
                        }
                        : boardList
                    )
                );
                this.isSubmitting.set(false);
            }),
            catchError(err => {
                this.isSubmitting.set(false);
                return throwError(() => err);
            })
        );
    }

    update(id: number, request: UpdateTaskRequest) {
        this.isSubmitting.set(true);
        return this.http.put<ApiResponse<TaskItem>>(`${this.API}/${id}`, request).pipe(
            tap(response => {
                this.boardLists.update(boardLists =>
                    boardLists.map(boardList =>
                        boardList.id === request.boardListId
                        ? {
                            ...boardList,
                            tasks: boardList.tasks.map(task =>
                                task.id === id
                                ? response.data
                                : task
                            )
                        }
                        : boardList
                    )
                );
                this.isSubmitting.set(false);
            }),
            catchError(err => {
                this.isSubmitting.set(false);
                return throwError(() => err);
            })
        );
    }

    delete(task: TaskItem) {
        return this.http.delete(`${this.API}/${task.id}`).pipe(
            tap(() => this.boardLists.update(boardLists => boardLists.map(boardList => 
                boardList.id === task.boardListId
                ? {
                    ...boardList,
                    tasks: boardList.tasks.filter(t => t.id != task.id)
                }
                : boardList))),
            catchError(err => throwError(() => err))
        );
    }
}