import { Component, input, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BoardInfo } from '@core/models/board.model'
import { RouterModule } from '@angular/router';
import { BoardsService} from '../../services/boards.service';
import { DeleteButtonComponent } from '../../../../shared/components/delete-button/delete-button.component';
import { HttpErrorResponse, } from "@angular/common/http";
import { ErrorHandlerService } from '@core/services/error-handler.service';

@Component({
  selector: 'app-board-card',
  imports: [ReactiveFormsModule, RouterModule, DeleteButtonComponent],
  templateUrl: './board-card.component.html',
  styleUrl: './board-card.component.scss',
})
export class BoardCardComponent {
  private boardsService = inject(BoardsService);
   private errorHandler = inject(ErrorHandlerService);

  board = input.required<BoardInfo>();
  errorMessage = signal('');

  deleteBoard(event: Event) {
    event.stopPropagation();

    this.boardsService.delete(this.board().id).subscribe({
      error: (err: HttpErrorResponse) => {
        this.errorMessage.set(this.errorHandler.handle(err));
      }
    });
  }
}