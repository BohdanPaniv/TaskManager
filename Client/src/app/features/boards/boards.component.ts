import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ErrorHandlerService } from '@core/services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BoardsService } from './services/boards.service';

@Component({
  selector: 'app-boards',
  standalone: true,
  imports: [],
  templateUrl: './boards.component.html',
  styleUrl: './boards.component.scss'
})
export class BoardsComponent implements OnInit {
  private boardsService = inject(BoardsService);
  private errorHandler = inject(ErrorHandlerService);
  private fb = inject(FormBuilder);
  errorMessage = signal('');

  boardForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(200)]],
  });

  ngOnInit() {
    this.boardsService.getAll().subscribe({
      error: (err: HttpErrorResponse) =>
        this.errorMessage.set(this.errorHandler.handle(err))
    });
  }
}