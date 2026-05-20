import { Component, inject, input, WritableSignal, signal  } from '@angular/core';
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

    showModal = input.required<WritableSignal<boolean>>();
    editingTask = signal<TaskItem | null>(null);
    isSubmitting = this.taskService.isSubmitting;
    boardListId = input.required<number>();
    
    taskForm = this.fb.group({
        title: ['', [Validators.required, Validators.maxLength(200)]],
        description: ['', [Validators.maxLength(200)]]
    });

    closeModal() {
        this.showModal().set(false);
        this.taskForm.reset();
    }

    openEditModal(task: TaskItem) {
        this.editingTask.set(task);
        this.taskForm.patchValue({
            title: task.title,
            description: task.description
        });
        this.showModal().set(true);
    }

  saveTask() {
    if (this.taskForm.invalid){
        return;
    }
    
    const { title, description } = this.taskForm.value;
    const editing = this.editingTask();
    
    if (editing) {
        const task: UpdateTaskRequest = {
            title: title!,
            description: description ?? '',
            isCompleted: editing.isCompleted,
            boardListId: this.boardListId(),
        };
        this.taskService.update(editing.id, task).subscribe({ next: () => this.closeModal() });
    } else {
      const task : CreateTaskRequest = {
          title: title!,
          description: description ?? '',
          isCompleted: false,
          boardListId: this.boardListId(),
      };
      this.taskService.create(task).subscribe({ next: () => this.closeModal() });
    }
  }
}