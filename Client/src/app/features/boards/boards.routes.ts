import { Routes } from '@angular/router';

export const boardsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../boards/boards.component').then(c => c.BoardsComponent)
  },
  {
    path: ':identNumber',
    loadComponent: () =>
      import('../board/board.component').then(c => c.BoardComponent)
  }
];