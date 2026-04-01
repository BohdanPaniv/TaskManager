import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { ApiResponse } from "@core/models/api-response.model";
import { CreateTaskRequest, TaskItem, UpdateTaskRequest } from "@core/models/task.model";
import { environment } from "@env/environment";
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: "root"})
export class TaskService {
    private http = inject(HttpClient);
    private readonly API = `${environment.apiUrl}/api/tasks`;

    tasks = signal<TaskItem[]>([]);
    isLoading = signal(false);

    getAll() {
        this.isLoading.set(true);
        return this.http.get<ApiResponse<TaskItem[]>>(this.API).pipe(
            tap(response  => {
                this.tasks.set(response.data);
                this.isLoading.set(false);
            })
        );
    }

    create(request: CreateTaskRequest) {
        return this.http.post<ApiResponse<TaskItem>>(this.API, request).pipe(
            tap(response => this.tasks.update(tasks => [...tasks, response.data]))
        );
    }

    update(id: number, request: UpdateTaskRequest) {
        return this.http.put<ApiResponse<TaskItem>>(`${this.API}/${id}`, request).pipe(
            tap(response => this.tasks.update(tasks => tasks.map(t => t.id === id ? response.data : t)))
        );
    }

    delete(id: number) {
        return this.http.delete(`${this.API}/${id}`).pipe(
            tap(() => this.tasks.update(tasks => tasks.filter(t => t.id !== id)))
        );
    }
}