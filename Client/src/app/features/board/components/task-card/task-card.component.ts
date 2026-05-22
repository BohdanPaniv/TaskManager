import { Component, output, input, signal, inject } from "@angular/core";
import { TaskItem } from "@core/models/task.model";
import { DatePipe } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandlerService } from '@core/services/error-handler.service';

@Component({
    selector: 'app-task-card',
    standalone: true,
    imports: [DatePipe],
    templateUrl: './task-card.component.html',
    styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
  private taskService = inject(TaskService);
  private errorHandler = inject(ErrorHandlerService);

  task = input.required<TaskItem>();
  taskEdit = output<TaskItem>();
  showModal = signal(false);
  errorMessage = signal('');
  
  deleteTaskCard(event: Event){
    event.stopPropagation();
    
    this.taskService.delete(this.task()).subscribe({
      error: (err: HttpErrorResponse) => {
        this.errorMessage.set(this.errorHandler.handle(err));
      }
    });
  }
  
  editTaskCard() {
    this.taskEdit.emit(this.task());
  }
}