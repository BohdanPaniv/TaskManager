import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@core/auth/auth.service';
import { TaskService } from './services/task.service';
import { BoardColumn, TaskItem } from '@core/models/task.model';
import { BoardColumnComponent } from './components/board-column/board-column.component';
import { ErrorHandlerService } from '@core/services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [BoardColumnComponent, ReactiveFormsModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {
  private authService = inject(AuthService);
  private taskService = inject(TaskService);
  private errorHandler = inject(ErrorHandlerService);
  private fb = inject(FormBuilder);

  isLoading = this.taskService.isLoading;
  errorMessage = signal('');
  showModal = signal(false);
  editingTask = signal<TaskItem | null>(null);
  activeColumn = signal<string>('todo');

  taskForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(200)]],
    description: ['', Validators.maxLength(2000)]
  });

  columns = computed<BoardColumn[]>(() => [
    {
      id: 'todo',
      title: 'To Do',
      tasks: this.taskService.tasks().filter(t => t.status === 'todo')
    },
    {
      id: 'inprogress',
      title: 'In Progress',
      tasks: this.taskService.tasks().filter(t => t.status === 'inprogress')
    },
    {
      id: 'done',
      title: 'Done',
      tasks: this.taskService.tasks().filter(t => t.status === 'done')
    }
  ]);

  ngOnInit() {
    this.taskService.getAll().subscribe({
      error: (err: HttpErrorResponse) =>
        this.errorMessage.set(this.errorHandler.handle(err))
    });
  }

  openAddModal(columnId: string) {
    this.editingTask.set(null);
    this.activeColumn.set(columnId);
    this.taskForm.reset();
    this.showModal.set(true);
  }

  openEditModal(task: TaskItem) {
    this.editingTask.set(task);
    this.taskForm.patchValue({
      title: task.title,
      description: task.description
    });
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.taskForm.reset();
  }

  saveTask() {
    if (this.taskForm.invalid) return;
    const { title, description } = this.taskForm.value;
    const editing = this.editingTask();

    if (editing) {
      this.taskService.update(editing.id, {
        title: title!,
        description: description ?? '',
        isCompleted: editing.isCompleted,
        status: editing.status
      }).subscribe({ next: () => this.closeModal() });
    } else {
      this.taskService.create({
        title: title!,
        description: description ?? '',
        status: this.activeColumn() as 'todo' | 'inprogress' | 'done'
      }).subscribe({ next: () => this.closeModal() });
    }
  }

  deleteTask(id: number) {
    this.taskService.delete(id).subscribe();
  }

  logout() {
    this.authService.logout();
  }

  get userEmail() {
    return this.authService.currentUser()?.email ?? '';
  }
}