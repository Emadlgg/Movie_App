import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../../../core/models/movie.interface';
import { ImageUrlPipe } from '../../../../shared/pipes/image-url.pipe';

@Component({
  selector: 'app-related-movies',
  standalone: true,
  imports: [CommonModule, ImageUrlPipe],
  templateUrl: './related-movies.component.html',
  styleUrls: ['./related-movies.component.scss']
})
export class RelatedMoviesComponent {
  @Input() movies: Movie[] = [];
  @Output() movieClick = new EventEmitter<number>();

  onMovieClick(movieId: number): void {
    this.movieClick.emit(movieId);
  }

  getRatingColor(rating: number): string {
    if (rating >= 7) return 'text-green-500';
    if (rating >= 5) return 'text-yellow-500';
    return 'text-red-500';
  }
}