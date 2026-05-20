import { Component, signal, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { BoardListService } from '../../services/board-list.service';
import { CreateBoardListRequest } from '@core/models/board-list.model';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-add-board-list-card',
  imports: [ReactiveFormsModule],
  templateUrl: './add-board-list-card.component.html',
  styleUrl: './add-board-list-card.component.scss',
})
export class AddBoardListCardComponent {
  showAddBoardListCard = signal(false);
  private fb = inject(FormBuilder);
  private boardListService = inject(BoardListService);
  private boardService = inject(BoardService);

  boardListForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(200)]]
  });
  
  addListCardClick(){
    this.showAddBoardListCard.set(true);
  }

  resetAddingList(event: Event){
    event.stopPropagation();

    this.showAddBoardListCard.set(false);
  }

  closeBoardListCard() {
    this.showAddBoardListCard.set(false);
    this.boardListForm.reset();
  }

  saveBoardList() {
    if (this.boardListForm.invalid){
      return;
    }

    const { title } = this.boardListForm.value;
    const board = this.boardService.board();

    if (board == null) {
      return;
    }

    const boardList: CreateBoardListRequest  = {
      title: title!,
      boardId: board.id
    };
    this.boardListService.create(boardList).subscribe({ next: () => this.closeBoardListCard() });
  }
}
