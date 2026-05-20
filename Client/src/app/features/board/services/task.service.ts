import { Injectable, signal, inject } from "@angular/core";
import { CreateTaskRequest, UpdateTaskRequest } from '@core/models/task.model';
import { HttpClient } from "@angular/common/http";
import { environment } from "@env/environment";
import { TaskItem } from '@core/models/task.model';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from "rxjs";
import { ApiResponse } from "@core/models/api-response.model";

@Injectable({ providedIn: "root"})
export class TaskService {
    private http = inject(HttpClient);
    private readonly API = `${environment.apiUrl}/api/boardlist`;
  
    tasks = signal<TaskItem[]>([]);
    isSubmitting = signal(false);
    
    create(request: CreateTaskRequest) {
        this.isSubmitting.set(true);

        return this.http.post<ApiResponse<TaskItem>>(this.API, request).pipe(
            tap(response => {
                this.tasks.update(tasks => [...tasks, response.data]);
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
                this.tasks.update(tasks => tasks.map(t => t.id === id ? response.data : t));
                this.isSubmitting.set(false);
            }),
            catchError(err => {
                this.isSubmitting.set(false);
                return throwError(() => err);
            })
        );
    }
}