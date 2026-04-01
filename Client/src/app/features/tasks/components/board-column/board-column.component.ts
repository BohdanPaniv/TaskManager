import { Component, output, input } from "@angular/core";
import { BoardColumn, TaskItem } from "@core/models/task.model";
import { TaskCardComponent } from "../task-card/task-card.component";

@Component({
    selector: "app-board-column",
    standalone: true,
    imports: [TaskCardComponent],
    templateUrl: './board-column.component.html',
    styleUrl: './board-column.component.scss'
})
export class BoardColumnComponent {
    column = input.required<BoardColumn>();
    addCard = output<string>();
    deleteTask = output<number>();
    editTask = output<TaskItem>();

  addBoardColumnComponentClick() {
    this.addCard.emit(this.column().id);
  }
}