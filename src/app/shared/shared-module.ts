import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { DateRangeFilterComponent } from './components/date-range-filter/date-range-filter.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';
import { ImageUrlPipe } from './pipes/image-url.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MovieCardComponent,
    PaginationComponent,
    SearchBarComponent,
    DateRangeFilterComponent,
    LoaderComponent,
    NavbarComponent,
    InfiniteScrollDirective,
    ImageUrlPipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MovieCardComponent,
    PaginationComponent,
    SearchBarComponent,
    DateRangeFilterComponent,
    LoaderComponent,
    NavbarComponent,
    InfiniteScrollDirective,
    ImageUrlPipe
  ]
})
export class SharedModule { }