import { Component, output, input } from "@angular/core";
import { CdkDropList, CdkDrag, CdkDragDrop, CdkDragPlaceholder  } from '@angular/cdk/drag-drop';
import { BoardColumn, TaskItem } from "@core/models/task.model";
import { TaskCardComponent } from "../task-card/task-card.component";

@Component({
    selector: "app-board-column",
    standalone: true,
    imports: [TaskCardComponent, CdkDropList, CdkDrag, CdkDragPlaceholder],
    templateUrl: './board-column.component.html',
    styleUrl: './board-column.component.scss'
})
export class BoardColumnComponent {
    column = input.required<BoardColumn>();
    connectedTo = input<string[]>([]);
    addCard = output<string>();
    deleteTask = output<number>();
    editTask = output<TaskItem>();
    taskDrop = output<CdkDragDrop<TaskItem[]>>();

  addBoardColumnComponentClick() {
    this.addCard.emit(this.column().id);
  }
}