import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth.component').then(c => c.AuthComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth.component').then(c => c.AuthComponent)
  }
];