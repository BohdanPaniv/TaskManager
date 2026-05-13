import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Board } from '@core/models/boards.model'
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-board-card',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './board-card.component.html',
  styleUrl: './board-card.component.scss',
})
export class BoardCardComponent {
  board = input.required<Board>();
}