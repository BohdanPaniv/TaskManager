import { Component, output, input, inject, signal } from "@angular/core";
import { CdkDropList, CdkDrag, CdkDragDrop, CdkDragPlaceholder  } from '@angular/cdk/drag-drop';
import { BoardList } from "@core/models/board-list.model";
import { TaskItem } from '@core/models/task.model';
import { TaskCardComponent } from "../task-card/task-card.component";
import { DeleteButtonComponent } from "@shared/components/delete-button/delete-button.component";
import { BoardListService } from '../../services/board-list.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from '@core/services/error-handler.service';

@Component({
    selector: "app-board-list",
    standalone: true,
    imports: [TaskCardComponent, CdkDropList, CdkDrag, CdkDragPlaceholder, DeleteButtonComponent],
    templateUrl: './board-list.component.html',
    styleUrl: './board-list.component.scss'
})
export class BoardListComponent {
  private boardListService = inject(BoardListService);
  private errorHandler = inject(ErrorHandlerService);

  boardList = input.required<BoardList>();
  
  addTask = output<number>();
  editTask = output<TaskItem>();
  
  connectedTo = input<string[]>([]);
  boardListDrop = output<CdkDragDrop<TaskItem[]>>();
  
  errorMessage = signal('');

  addTaskClick() {
    this.addTask.emit(this.boardList().id);
  }

  onEditTask(task: TaskItem) {
    this.editTask.emit(task);
  }

  deleteBoardList(event: Event){
    event.stopPropagation();

    this.boardListService.delete(this.boardList().id).subscribe({
      error: (err: HttpErrorResponse) => {
        this.errorMessage.set(this.errorHandler.handle(err));
      }
    });
  }
}