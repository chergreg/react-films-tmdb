// src/types/MovieDetails.ts
export interface MovieDetails {
  id: number;
  title: string;
  originalTitle: string;
  tagline: string;
  overview: string;
  releaseDate: string;
  posterUrl: string | null;
  backdropUrl: string | null;
  voteAverage: number;
  voteCount: number;
  runtime: number | null;
  genres: string[];
  productionCountries: string[];
  originalLanguage: string;
  budget: number;
  revenue: number;
  homepage: string | null;
  imdbUrl: string | null;
  director: { id: number; name: string } | null;
  cast: { id: number; name: string; character: string; photoUrl: string | null }[];
  trailerYoutubeId: string | null;
  streamingProviders: { name: string; logoUrl: string }[];
}
