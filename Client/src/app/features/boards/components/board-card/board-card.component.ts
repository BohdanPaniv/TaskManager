import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BoardInfo } from '@core/models/board.model'
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-board-card',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './board-card.component.html',
  styleUrl: './board-card.component.scss',
})
export class BoardCardComponent {
  board = input.required<BoardInfo>();
}