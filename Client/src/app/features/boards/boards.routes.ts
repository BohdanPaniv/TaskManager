import { Routes } from '@angular/router';

export const boardsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../boards/boards.component').then(c => c.BoardsComponent)
  }
];