import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then(r => r.authRoutes)
  },
  {
    path: '',
    loadComponent: () =>
      import('./layout/main-layout/main-layout.component').then(c => c.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'boards',
        loadChildren: () =>
          import('./features/boards/boards.routes').then(r => r.boardsRoutes),
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];