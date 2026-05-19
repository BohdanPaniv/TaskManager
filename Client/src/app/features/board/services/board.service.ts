import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { ApiResponse } from "@core/models/api-response.model";
import { CreateBoardListRequest, BoardList, UpdateBoardListRequest } from "@core/models/board-list.model";
import { BoardInfo } from "@core/models/board.model";
import { environment } from "@env/environment";
import { throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: "root"})
export class BoardService {
    private http = inject(HttpClient);
    private readonly boardAPI = `${environment.apiUrl}/api/boards`;
    private readonly boardListAPI = `${environment.apiUrl}/api/boardList`;

    boardLists = signal<BoardList[]>([]);
    boardListIds = signal<string[]>([]);
    isLoading = signal(false);
    isSubmitting = signal(false);
    title = signal<string>('');

    getBoardInfo(identNumber: string) {
        this.isLoading.set(true);
        return this.http.get<ApiResponse<BoardInfo>>(this.boardAPI + '/' + identNumber).pipe(
            tap(response => {
                this.title.set(response.data.title);
            }),
            catchError(err => {
                this.isLoading.set(false);
                return throwError(() => err);
            })
        );
    }

    getBoardLists(identNumber: string) {
        this.isLoading.set(true);
        return this.http.get<ApiResponse<BoardList[]>>(this.boardListAPI + '/' + identNumber).pipe(
            tap(response => {
                this.boardLists.set(response.data);
                const boardListIds = this.boardLists().map(list => list.id.toString());
                this.boardListIds.set(boardListIds)
                this.isLoading.set(false);
            }),
            catchError(err => {
                this.isLoading.set(false);
                return throwError(() => err);
            })
        );
    }

    create(request: CreateBoardListRequest) {
        this.isSubmitting.set(true);
        return this.http.post<ApiResponse<BoardList>>(this.boardListAPI, request).pipe(
            tap(response => {
                this.boardLists.update(tasks => [...tasks, response.data]);
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
        return this.http.put<ApiResponse<BoardList>>(`${this.boardListAPI}/${id}`, request).pipe(
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
        return this.http.delete(`${this.boardListAPI}/${id}`).pipe(
            tap(() => this.boardLists.update(tasks => tasks.filter(t => t.id !== Number(id)))),
            catchError(err => throwError(() => err))
        );
    }

    move(id: number, boardListId: number){
        const task = this.boardLists().find(t => t.id === id);

        if (!task) {
            return throwError(() => new Error('Task not found'));
        }

        return this.http.patch<ApiResponse<BoardList>>(`${this.boardListAPI}/${id}/move`, {
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