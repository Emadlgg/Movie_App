import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'movies',
    loadChildren: () => import('./features/movies/movies-routing-module').then(m => m.MoviesRoutingModule),
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: '/movies/now-playing',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/movies/now-playing'
  }
];