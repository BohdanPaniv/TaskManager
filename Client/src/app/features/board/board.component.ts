import { Component, inject, OnInit, signal } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms';
import { BoardService } from './services/board.service';
import { BoardListService } from './services/board-list.service';
import { TaskItem } from '@core/models/task.model';
import { ErrorHandlerService } from '@core/services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BoardListComponent } from './components/board-list/board-list.component';
import { AddBoardListCardComponent } from './components/add-board-list-card/add-board-list-card.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [ReactiveFormsModule, DragDropModule, BoardListComponent, AddBoardListCardComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {
  private boardService = inject(BoardService);
  private boardListService = inject(BoardListService);
  private route = inject(ActivatedRoute);
  private errorHandler = inject(ErrorHandlerService);

  isLoading = this.boardService.isLoading;
  errorMessage = signal('');
  boardLists = this.boardService.boardLists;
  board = this.boardService.board;

  ngOnInit() {
     this.route.paramMap.subscribe(params => {
      const identNumber = params.get('identNumber');

      if (!identNumber) return;

      this.boardService.getBoardInfo(identNumber).subscribe({
        error: (err: HttpErrorResponse) =>
          this.errorMessage.set(this.errorHandler.handle(err))
      });

      this.boardService.getBoardLists(identNumber).subscribe({
        error: (err: HttpErrorResponse) =>
          this.errorMessage.set(this.errorHandler.handle(err))
      });
    });
  }

  onTaskDrop(event: CdkDragDrop<TaskItem[]>, targetColumnId: number) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const task = event.previousContainer.data[event.previousIndex];

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.boardListService.move(task.id, targetColumnId)
        .subscribe({
          error: (err: HttpErrorResponse) =>
            this.errorMessage.set(this.errorHandler.handle(err))
        });
    }
  }
}