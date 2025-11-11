import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TmdbApiService } from './tmdb-api.service';
import { MoviesResponse } from '../models/api-response.interface';
import { MovieDetail, MovieCredits, SimilarMoviesResponse } from '../models/movie-detail.interface';
import { MovieFilters } from '../models/movie-filters.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private tmdbApi: TmdbApiService) {}

  getNowPlaying(page: number = 1, filters?: MovieFilters): Observable<MoviesResponse> {
    const params: any = {
      page: page,
      language: 'es-ES'
    };

    if (filters?.searchTerm) {
      return this.searchMovies(filters.searchTerm, page);
    }

    if (filters?.startDate) {
      params['primary_release_date.gte'] = filters.startDate;
    }

    if (filters?.endDate) {
      params['primary_release_date.lte'] = filters.endDate;
    }

    return this.tmdbApi.get<MoviesResponse>('/movie/now_playing', params);
  }

  getTopRated(page: number = 1, filters?: MovieFilters): Observable<MoviesResponse> {
    const params: any = {
      page: page,
      language: 'es-ES'
    };

    if (filters?.searchTerm) {
      return this.searchMovies(filters.searchTerm, page);
    }

    if (filters?.startDate) {
      params['primary_release_date.gte'] = filters.startDate;
    }

    if (filters?.endDate) {
      params['primary_release_date.lte'] = filters.endDate;
    }

    return this.tmdbApi.get<MoviesResponse>('/movie/top_rated', params);
  }

  getMovieDetail(movieId: number): Observable<MovieDetail> {
    return this.tmdbApi.get<MovieDetail>(`/movie/${movieId}`, {
      language: 'es-ES'
    });
  }

  getMovieCredits(movieId: number): Observable<MovieCredits> {
    return this.tmdbApi.get<MovieCredits>(`/movie/${movieId}/credits`, {
      language: 'es-ES'
    });
  }

  getSimilarMovies(movieId: number, page: number = 1): Observable<SimilarMoviesResponse> {
    return this.tmdbApi.get<SimilarMoviesResponse>(`/movie/${movieId}/similar`, {
      page: page,
      language: 'es-ES'
    });
  }

  rateMovie(movieId: number, rating: number): Observable<any> {
    return this.tmdbApi.post(`/movie/${movieId}/rating`, {
      value: rating
    });
  }

  searchMovies(query: string, page: number = 1): Observable<MoviesResponse> {
    return this.tmdbApi.get<MoviesResponse>('/search/movie', {
      query: query,
      page: page,
      language: 'es-ES'
    });
  }

  getImageUrl(path: string | null, size: 'poster' | 'backdrop' | 'profile' = 'poster'): string {
    if (!path) {
      return 'assets/images/placeholder.png';
    }
    
    const sizeMap = {
      poster: 'w500',
      backdrop: 'w1280',
      profile: 'w185'
    };

    return `https://image.tmdb.org/t/p/${sizeMap[size]}${path}`;
  }
}