import { Component, output, input, signal } from "@angular/core";
import { TaskItem } from "@core/models/task.model";
import { DatePipe } from '@angular/common';
import { AddTaskModalComponent } from '../add-task-modal/add-task-modal.component';

@Component({
    selector: 'app-task-card',
    standalone: true,
    imports: [DatePipe, AddTaskModalComponent],
    templateUrl: './task-card.component.html',
    styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
  task = input.required<TaskItem>();
  taskDelete = output<number>();
  taskEdit = output<TaskItem>();
  showModal = signal(false);
  
  deleteTaskCard(event: Event){
    event.stopPropagation();
    this.taskDelete.emit(this.task().id);
  }
  
  editTaskCard() {
    this.taskEdit.emit(this.task());
  }
}