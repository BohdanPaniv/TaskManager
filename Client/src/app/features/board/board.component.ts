import { Component, inject, OnInit, signal } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { BoardService } from './services/board.service';
import { TaskItem } from '@core/models/board-list.model';
import { ErrorHandlerService } from '@core/services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BoardListComponent } from './components/board-list/board-list.component';
import { AddListCardComponent } from './components/add-list-card/add-list-card.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [ReactiveFormsModule, DragDropModule, BoardListComponent, AddListCardComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {
  private boardService = inject(BoardService);
  private route = inject(ActivatedRoute);
  private errorHandler = inject(ErrorHandlerService);
  private fb = inject(FormBuilder);

  isLoading = this.boardService.isLoading;
  errorMessage = signal('');
  showModal = signal(false);
  editingBoardList = signal<TaskItem | null>(null);
  activeBoardList = signal<string>('todo');
  isSubmitting = this.boardService.isSubmitting;
  boardLists = this.boardService.boardLists;
  boardListIds = this.boardService.boardListIds;
  title = this.boardService.title;

  boardListForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(200)]],
    description: ['', Validators.maxLength(2000)],
    boardListId: [null, Validators.required]
  });

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

      this.boardService.move(task.id, targetColumnId)
        .subscribe({
          error: (err: HttpErrorResponse) =>
            this.errorMessage.set(this.errorHandler.handle(err))
        });
    }
  }

  openAddModal(columnId: string) {
    this.editingBoardList.set(null);
    this.activeBoardList.set(columnId);
    this.boardListForm.reset();
    this.showModal.set(true);
  }

  openEditModal(task: TaskItem) {
    this.editingBoardList.set(task);
    this.boardListForm.patchValue({
      title: task.title,
      description: task.description
    });
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.boardListForm.reset();
  }

  saveBoardList() {
    if (this.boardListForm.invalid) return;
    const { title, description, boardListId } = this.boardListForm.value;
    const editing = this.editingBoardList();

    if (editing) {
      const boardList = {
        title: title!,
        description: description ?? '',
        isCompleted: editing.isCompleted,
        boardListId: Number(boardListId),
      };
      this.boardService.update(editing.id, boardList).subscribe({ next: () => this.closeModal() });
    } else {
      const boardList = {
        title: title!,
        description: description ?? '',
        boardListId: Number(boardListId)
      };
      this.boardService.create(boardList).subscribe({ next: () => this.closeModal() });
    }
  }

  deleteBoardList(id: number) {
    this.boardService.delete(id).subscribe();
  }
}