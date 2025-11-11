import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';
import { NowPlayingComponent } from './pages/now-playing/now-playing.component';
import { TopRatedComponent } from './pages/top-rated/top-rated.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { authGuard } from '../../core/guards/auth-guard';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'now-playing',
        component: NowPlayingComponent
      },
      {
        path: 'top-rated',
        component: TopRatedComponent
      },
      {
        path: 'detail/:id',
        component: MovieDetailComponent
      },
      {
        path: '',
        redirectTo: 'now-playing',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }