import { Component, output, input } from "@angular/core";
import { CdkDropList, CdkDrag, CdkDragDrop, CdkDragPlaceholder  } from '@angular/cdk/drag-drop';
import { BoardList, TaskItem } from "@core/models/board-list.model";
import { TaskCardComponent } from "../task-card/task-card.component";

@Component({
    selector: "app-board-list",
    standalone: true,
    imports: [TaskCardComponent, CdkDropList, CdkDrag, CdkDragPlaceholder],
    templateUrl: './board-list.component.html',
    styleUrl: './board-list.component.scss'
})
export class BoardListComponent {
    boardList = input.required<BoardList>();
    addCard = output<string>();
    connectedTo = input<string[]>([]);
    deleteBoardList = output<number>();
    editBoardList = output<TaskItem>();
    boardListDrop = output<CdkDragDrop<TaskItem[]>>();

  addBoardColumnComponentClick() {
    this.addCard.emit(this.boardList().id.toString());
  }
}