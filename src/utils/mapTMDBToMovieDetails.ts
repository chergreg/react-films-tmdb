import type { TMDBMovie } from '../types/TMDBMovie';
import type { TMDBCredits } from '../types/TMDBCredits';
import type { TMDBVideos } from '../types/TMDBVideos';
import type { TMDBWatchProviders } from '../types/TMDBWatchProviders';
import type { MovieDetails } from '../types/MovieDetails';

export function mapTMDBToMovieDetails(
  movie: TMDBMovie,
  credits: TMDBCredits,
  videos: TMDBVideos,
  providers: TMDBWatchProviders
): MovieDetails {
  // Trouver le réalisateur principal
  const directorObj = credits.crew.find(
    member => member.job === 'Director'
  );
  const director = directorObj
    ? { id: directorObj.id, name: directorObj.name }
    : null;

  // Prendre les 10 premiers acteurs principaux
  const cast = credits.cast.slice(0, 10).map(actor => ({
    id: actor.id,
    name: actor.name,
    character: actor.character,
    photoUrl: actor.profile_path
      ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
      : null,
  }));

  // Bande-annonce principale en français, sinon la première "Trailer" dispo
  let trailer: string | null = null;
  const trailerFR = videos.results.find(
    vid =>
      vid.type === 'Trailer' &&
      vid.site === 'YouTube' &&
      vid.iso_639_1 === 'fr'
  );
  const trailerAny = videos.results.find(
    vid => vid.type === 'Trailer' && vid.site === 'YouTube'
  );
  trailer = (trailerFR ?? trailerAny)?.key ?? null;

  // Lien IMDb
  const imdbUrl = movie.imdb_id
    ? `https://www.imdb.com/title/${movie.imdb_id}`
    : null;

  // Plateformes de streaming FR
  const streaming = providers.results?.FR?.flatrate ?? [];
  const streamingProviders = streaming.map(p => ({
    name: p.provider_name,
    logoUrl: `https://image.tmdb.org/t/p/w45${p.logo_path}`,
  }));

  return {
    id: movie.id,
    title: movie.title,
    originalTitle: movie.original_title,
    tagline: movie.tagline,
    overview: movie.overview,
    releaseDate: movie.release_date,
    posterUrl: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : null,
    backdropUrl: movie.backdrop_path
      ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
      : null,
    voteAverage: movie.vote_average,
    voteCount: movie.vote_count,
    runtime: movie.runtime,
    genres: movie.genres.map(g => ({ id: g.id, name: g.name })),
    productionCountries: movie.production_countries.map(c => c.name),
    originalLanguage: movie.original_language,
    budget: movie.budget,
    revenue: movie.revenue,
    homepage: movie.homepage,
    imdbUrl,
    director,
    cast,
    trailerYoutubeId: trailer,
    streamingProviders,
  };
}
