import { Component, output, input } from "@angular/core";
import { TaskItem } from "@core/models/task.model";
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-task-card',
    standalone: true,
    imports: [DatePipe],
    templateUrl: './task-card.component.html',
    styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
    task = input.required<TaskItem>();
    taskDelete = output<number>();
    taskEdit = output<TaskItem>();

    deleteTaskCard(event: Event){
        event.stopPropagation();
        this.taskDelete.emit(this.task().id);
    }

    editTaskCard() {
        this.taskEdit.emit(this.task());
    }
}