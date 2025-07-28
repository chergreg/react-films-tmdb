export interface TMDBPersonMovieCredits {
  cast: {
    id: number;
    title: string;
    character: string;
    poster_path: string | null;
    release_date: string;
    vote_average: number;
    genre_ids: number[];
  }[];
  crew: any[]; // (optionnel)
}
