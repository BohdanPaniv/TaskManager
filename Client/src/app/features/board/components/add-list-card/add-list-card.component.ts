import { Component, signal, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { BoardListService } from '../../services/board-list.service';

@Component({
  selector: 'app-add-list-card',
  imports: [ReactiveFormsModule],
  templateUrl: './add-list-card.component.html',
  styleUrl: './add-list-card.component.scss',
})
export class AddListCardComponent {
  showAddCard = signal(false);
  private fb = inject(FormBuilder);
  private boardListService = inject(BoardListService);

  listForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(200)]]
  });
  
  addListCardClick(){
    this.showAddCard.set(true);
  }

  resetAddingList(event: Event){
    event.stopPropagation();

    this.showAddCard.set(false);
  }

  closeCard() {
    this.showAddCard.set(false);
    this.listForm.reset();
  }

  saveList() {
    if (this.listForm.invalid){
      return;
    }

    const { title } = this.listForm.value;
    const list = {
      title: title! 
    };
    this.boardListService.create(list).subscribe({ next: () => this.closeCard() });
  }
}
