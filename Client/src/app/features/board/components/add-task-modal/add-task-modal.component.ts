import { Component, inject, input, effect, output  } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CreateTaskRequest, TaskItem, UpdateTaskRequest } from '@core/models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-add-task-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './add-task-modal.component.html',
  styleUrl: './add-task-modal.component.scss',
})
export class AddTaskModalComponent {
  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);

  task = input<TaskItem | null>(null);
  isSubmitting = this.taskService.isSubmitting;
  boardListId = input.required<number>();
  closed = output<void>();

  taskForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(200)]],
    description: ['', [Validators.maxLength(200)]]
  });

  closeModal() {
    this.taskForm.reset();
    this.closed.emit();
  }

  constructor() {
    effect(() => {
      const task = this.task();

      if (task) {
        this.taskForm.patchValue({
          title: task.title,
          description: task.description
        });
      } else {
        this.taskForm.reset();
      }
    });
  }

  saveTask() {
    if (this.taskForm.invalid){
        return;
    }
    
    const { title, description } = this.taskForm.value;
    const task = this.task();
    
    if (task) {
        const request: UpdateTaskRequest = {
            title: title!,
            description: description ?? '',
            isCompleted: task.isCompleted,
            boardListId: this.boardListId(),
        };
        this.taskService.update(task.id, request).subscribe({ next: () => this.closeModal() });
    } else {
      const request : CreateTaskRequest = {
          title: title!,
          description: description ?? '',
          boardListId: this.boardListId(),
      };
      this.taskService.create(request).subscribe({ next: () => this.closeModal() });
    }
  }
}