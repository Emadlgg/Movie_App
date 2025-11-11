import { Movie } from './movie.interface';

export interface ApiResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface MoviesResponse extends ApiResponse<Movie> {
  dates?: {
    maximum: string;
    minimum: string;
  };
}