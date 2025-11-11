import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesRoutingModule } from './movies-routing-module';
import { NowPlayingComponent } from './pages/now-playing/now-playing.component';
import { TopRatedComponent } from './pages/top-rated/top-rated.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { CastListComponent } from './components/cast-list/cast-list.component';
import { CrewListComponent } from './components/crew-list/crew-list.component';
import { RelatedMoviesComponent } from './components/related-movies/related-movies.component';
import { VoteButtonComponent } from './components/vote-button/vote-button.component';
import { SharedModule } from '../../shared/shared-module';

@NgModule({
  imports: [
    CommonModule,
    MoviesRoutingModule,
    SharedModule,
    NowPlayingComponent,
    TopRatedComponent,
    MovieDetailComponent,
    CastListComponent,
    CrewListComponent,
    RelatedMoviesComponent,
    VoteButtonComponent
  ]
})
export class MoviesModule { }