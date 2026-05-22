import { Component, inject, OnInit, signal, ElementRef, ViewChild } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms';
import { BoardService } from './services/board.service';
import { BoardListService } from './services/board-list.service';
import { TaskItem } from '@core/models/task.model';
import { UpdateBoardRequest } from '@core/models/board.model';
import { ErrorHandlerService } from '@core/services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BoardListComponent } from './components/board-list/board-list.component';
import { AddBoardListCardComponent } from './components/add-board-list-card/add-board-list-card.component';
import { ActivatedRoute } from '@angular/router';
import { AddTaskModalComponent } from './components/add-task-modal/add-task-modal.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [ReactiveFormsModule, DragDropModule, BoardListComponent, AddBoardListCardComponent, AddTaskModalComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {
  private boardService = inject(BoardService);
  private boardListService = inject(BoardListService);
  private route = inject(ActivatedRoute);
  private errorHandler = inject(ErrorHandlerService);

  @ViewChild('titleInput') titleInput?: ElementRef<HTMLInputElement>;

  isLoading = this.boardService.isLoading;
  errorMessage = signal('');
  boardLists = this.boardService.boardLists;
  board = this.boardService.board;
  isChangeTitle = signal(false);
  boardTitle = this.boardService.boardTitle;

  showTaskModal  = signal(false);
  selectedBoardListId = signal<number | null>(null);
  editingTask = signal<TaskItem | null>(null);

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

  changeBoardTitle(event: Event){
    event.preventDefault();

    this.isChangeTitle.set(true);

    setTimeout(() => {
      this.titleInput?.nativeElement.focus();
    });
  }

  saveTitle(event: Event){
    event.preventDefault();
    const value = (event.target as HTMLInputElement).value;
    const request: UpdateBoardRequest = {
      title: value
    };

    const boardId = this.board()?.id;

    if (!boardId) {
      return;
    }
    
    this.boardService.saveTitle(boardId, request).subscribe({
      next: () => this.isChangeTitle.set(false),
      error: (err: HttpErrorResponse) => {
        this.errorMessage.set(this.errorHandler.handle(err));
        this.isLoading.set(false);
      }
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

  openAddTaskModal(boardListId: number) {
    this.selectedBoardListId.set(boardListId);
    this.editingTask.set(null);
    this.showTaskModal.set(true);
  }

  openEditModal(task: TaskItem) {
    this.selectedBoardListId.set(task.boardListId);
    this.editingTask.set(task);
    this.showTaskModal.set(true);
  }

  closeModal() {
    this.showTaskModal.set(false)
  }
}