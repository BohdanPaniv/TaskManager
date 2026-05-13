import { Component, signal, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { BoardsService } from '../../services/boards.service';

@Component({
  selector: 'app-add-board-card',
  imports: [ReactiveFormsModule],
  templateUrl: './add-board-card.component.html',
  styleUrl: './add-board-card.component.scss',
})
export class AddBoardCardComponent {
  showAddBoard = signal(false);
  private fb = inject(FormBuilder);
  private boardsService = inject(BoardsService);

  boardForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(200)]]
  });
  
  addBoardCardClick(){
    this.showAddBoard.set(true);
  }

  resetAddingBoard(event: Event){
    event.stopPropagation();

    this.showAddBoard.set(false);
  }

  closeCard() {
    this.showAddBoard.set(false);
    this.boardForm.reset();
  }

  saveBoard() {
    if (this.boardForm.invalid){
      return;
    }

    const { title } = this.boardForm.value;
    const board = {
      title: title! 
    };
    this.boardsService.create(board).subscribe({ next: () => this.closeCard() });
  }
}
