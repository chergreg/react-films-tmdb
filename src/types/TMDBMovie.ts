// src/types/TMDBMovie.ts
export interface TMDBMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
  runtime: number | null;
  genres: { id: number; name: string }[];
  production_countries: { iso_3166_1: string; name: string }[];
  original_language: string;
  budget: number;
  revenue: number;
  homepage: string | null;
  imdb_id: string | null;
}
