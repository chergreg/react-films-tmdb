import type { TMDBMovieListItem } from './TMDBMovieListItem';

export interface TMDBSearchMoviesResponse {
  page: number;
  results: TMDBMovieListItem[];
  total_pages: number;
  total_results: number;
}
