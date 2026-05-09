import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { ApiResponse } from "@core/models/api-response.model";
import { Board } from "@core/models/boards.model";
import { catchError, tap } from 'rxjs/operators';
import { environment } from "@env/environment";
import { throwError } from "rxjs";

@Injectable({ providedIn: "root"})
export class BoardsService {
    private http = inject(HttpClient);
    private readonly API = `${environment.apiUrl}/api/boards`;

    boards = signal<Board[]>([]);
    boardIds = signal<string[]>([]);
    isLoading = signal(false);
    isSubmitting = signal(false);
    
    getAll() {
        this.isLoading.set(true);
        return this.http.get<ApiResponse<Board[]>>(this.API).pipe(
            tap(response => {
                this.boards.set(response.data);
                const boardIds = this.boards().map(board => board.id.toString());
                this.boardIds.set(boardIds)
                this.isLoading.set(false);
            }),
            catchError(err => {
                this.isLoading.set(false);
                return throwError(() => err);
            })
        );
    }
}