import type { TMDBMovieListItem } from './TMDBMovieListItem';

export interface TMDBMoviesByGenreResponse {
  page: number;
  results: TMDBMovieListItem[];
  total_pages: number;
  total_results: number;
}
