import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { ApiResponse } from "@core/models/api-response.model";
import { BoardList } from "@core/models/board-list.model";
import { BoardInfo, UpdateBoardRequest } from "@core/models/board.model";
import { environment } from "@env/environment";
import { throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: "root"})
export class BoardService {
    private http = inject(HttpClient);
    private readonly boardAPI = `${environment.apiUrl}/api/Boards`;
    private readonly boardListAPI = `${environment.apiUrl}/api/BoardList`;

    boardLists = signal<BoardList[]>([]);
    boardListIds = signal<string[]>([]);
    isLoading = signal(false);
    isSubmitting = signal(false);
    board = signal<BoardInfo | null>(null);
    boardTitle = signal('');

    getBoardInfo(identNumber: string) {
        this.isLoading.set(true);
        
        return this.http.get<ApiResponse<BoardInfo>>(this.boardAPI + '/' + identNumber).pipe(
            tap(response => {
                this.board.set(response.data);
                this.boardTitle.set(this.board()?.title ?? '');
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

    saveTitle(id: number, request: UpdateBoardRequest) {
        this.isSubmitting.set(true);

        return this.http.put<ApiResponse<BoardInfo>>(this.boardAPI + '/' + id, request).pipe(
            tap(response => {
                this.board.set(response.data);
                this.boardTitle.set(this.board()?.title ?? '');
                this.isSubmitting.set(false);
            }),
            catchError(err => {
                this.isSubmitting.set(false);
                return throwError(() => err);
            })
        );
    }
}