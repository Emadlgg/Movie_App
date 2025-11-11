import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { MovieService } from '../../../../core/services/movie.service';
import { MovieDetail, MovieCredits } from '../../../../core/models/movie-detail.interface';
import { Movie } from '../../../../core/models/movie.interface';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { ImageUrlPipe } from '../../../../shared/pipes/image-url.pipe';
import { CastListComponent } from '../../components/cast-list/cast-list.component';
import { CrewListComponent } from '../../components/crew-list/crew-list.component';
import { RelatedMoviesComponent } from '../../components/related-movies/related-movies.component';
import { VoteButtonComponent } from '../../components/vote-button/vote-button.component';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [
    CommonModule,
    LoaderComponent,
    ImageUrlPipe,
    CastListComponent,
    CrewListComponent,
    RelatedMoviesComponent,
    VoteButtonComponent
  ],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  movie: MovieDetail | null = null;
  credits: MovieCredits | null = null;
  similarMovies: Movie[] = [];
  isLoading = true;
  errorMessage = '';
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const movieId = +params['id'];
      if (movieId) {
        this.loadMovieDetails(movieId);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadMovieDetails(movieId: number): void {
    this.isLoading = true;
    this.errorMessage = '';

    forkJoin({
      movie: this.movieService.getMovieDetail(movieId),
      credits: this.movieService.getMovieCredits(movieId),
      similar: this.movieService.getSimilarMovies(movieId)
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        this.movie = response.movie;
        this.credits = response.credits;
        this.similarMovies = response.similar.results.slice(0, 10);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading movie details:', error);
        this.errorMessage = 'Error al cargar los detalles de la película';
        this.isLoading = false;
      }
    });
  }

  onVote(rating: number): void {
    if (this.movie) {
      this.movieService.rateMovie(this.movie.id, rating)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            alert(`¡Has votado ${rating}/10 por esta película!`);
          },
          error: (error) => {
            console.error('Error voting:', error);
            alert('Error al votar. Esta funcionalidad requiere autenticación de TMDB.');
          }
        });
    }
  }

  onRelatedMovieClick(movieId: number): void {
    this.router.navigate(['/movies/detail', movieId]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  goBack(): void {
    window.history.back();
  }

  getRatingColor(rating: number): string {
    if (rating >= 7) return 'text-green-500';
    if (rating >= 5) return 'text-yellow-500';
    return 'text-red-500';
  }

  getRatingPercentage(rating: number): number {
    return Math.round(rating * 10);
  }

  getRuntime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  }
}