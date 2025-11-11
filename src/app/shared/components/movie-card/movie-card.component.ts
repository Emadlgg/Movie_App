import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../../core/models/movie.interface';
import { ImageUrlPipe } from '../../pipes/image-url.pipe';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, ImageUrlPipe],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  @Input() movie!: Movie;
  @Output() movieClick = new EventEmitter<number>();

  onCardClick(): void {
    this.movieClick.emit(this.movie.id);
  }

  getRatingColor(rating: number): string {
    if (rating >= 7) return 'text-green-500';
    if (rating >= 5) return 'text-yellow-500';
    return 'text-red-500';
  }

  getRatingPercentage(rating: number): number {
    return Math.round(rating * 10);
  }
}