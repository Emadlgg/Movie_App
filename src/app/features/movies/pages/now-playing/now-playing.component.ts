import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MovieService } from '../../../../core/services/movie.service';
import { Movie } from '../../../../core/models/movie.interface';
import { MovieFilters } from '../../../../core/models/movie-filters.interface';
import { MovieCardComponent } from '../../../../shared/components/movie-card/movie-card.component';
import { SearchBarComponent } from '../../../../shared/components/search-bar/search-bar.component';
import { DateRangeFilterComponent } from '../../../../shared/components/date-range-filter/date-range-filter.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { InfiniteScrollDirective } from '../../../../shared/directives/infinite-scroll.directive';
import { NotificationService } from '../../../../core/services/notification.service';


@Component({
  selector: 'app-now-playing',
  standalone: true,
  imports: [
    CommonModule,
    MovieCardComponent,
    SearchBarComponent,
    DateRangeFilterComponent,
    PaginationComponent,
    LoaderComponent,
    InfiniteScrollDirective
  ],
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.scss']
})
export class NowPlayingComponent implements OnInit, OnDestroy {
  movies: Movie[] = [];
  currentPage = 1;
  totalPages = 1;
  isLoading = false;
  isLoadingMore = false;
  filters: MovieFilters = {};
  private destroy$ = new Subject<void>();

  constructor(
    private movieService: MovieService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

 loadMovies(append: boolean = false): void {
  if (append) {
    this.isLoadingMore = true;
  } else {
    this.isLoading = true;
    this.movies = [];
  }

  this.movieService.getNowPlaying(this.currentPage, this.filters)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        if (append) {
          this.movies = [...this.movies, ...response.results];
        } else {
          this.movies = response.results;
        }
        this.totalPages = response.total_pages;
        this.isLoading = false;
        this.isLoadingMore = false;
        
        if (response.results.length === 0 && !append) {
          this.notificationService.showInfo('No se encontraron películas con los filtros aplicados');
        }
      },
      error: (error) => {
        console.error('Error loading movies:', error);
        this.notificationService.showError('Error al cargar las películas. Por favor, intenta nuevamente.');
        this.isLoading = false;
        this.isLoadingMore = false;
      }
    });
}

  onSearch(searchTerm: string): void {
    this.filters.searchTerm = searchTerm;
    this.currentPage = 1;
    this.loadMovies();
  }

  onDateRangeChange(dateRange: { start: string | null; end: string | null }): void {
    this.filters.startDate = dateRange.start || undefined;
    this.filters.endDate = dateRange.end || undefined;
    this.currentPage = 1;
    this.loadMovies();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadMovies();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onScroll(): void {
    if (!this.isLoadingMore && this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadMovies(true);
    }
  }

  onMovieClick(movieId: number): void {
    this.router.navigate(['/movies/detail', movieId]);
  }
}