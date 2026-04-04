import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { ApiResponse } from "@core/models/api-response.model";
import { CreateTaskRequest, TaskItem, UpdateTaskRequest, TaskStatus } from "@core/models/task.model";
import { environment } from "@env/environment";
import { throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: "root"})
export class TaskService {
    private http = inject(HttpClient);
    private readonly API = `${environment.apiUrl}/api/tasks`;

    tasks = signal<TaskItem[]>([]);
    isLoading = signal(false);
    isSubmitting = signal(false);

    getAll() {
        this.isLoading.set(true);
        return this.http.get<ApiResponse<TaskItem[]>>(this.API).pipe(
            tap(response  => {
                this.tasks.set(response.data);
                this.isLoading.set(false);
            }),
            catchError(err => {
                this.isLoading.set(false);
                return throwError(() => err);
            })
        );
    }

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

    delete(id: number) {
        return this.http.delete(`${this.API}/${id}`).pipe(
            tap(() => this.tasks.update(tasks => tasks.filter(t => t.id !== id))),
            catchError(err => throwError(() => err))
        );
    }

    move(id: number, status: TaskStatus){
        const task = this.tasks().find(t => t.id === id);

        if (!task) {
            return throwError(() => new Error('Task not found'));
        }

        return this.http.patch<ApiResponse<TaskItem>>(`${this.API}/${id}/move`, {
            status
        }).pipe(
            tap(response => {
                this.tasks.update(task => 
                    task.map(t => t.id === id ? response.data : t)
                );
            }),
            catchError(err => throwError(() => err))
        )
    }
}