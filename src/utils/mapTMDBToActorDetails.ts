import type { TMDBPerson } from '../types/TMDBPerson';
import type { TMDBPersonMovieCredits } from '../types/TMDBPersonMovieCredits';
import type { ActorDetails } from '../types/ActorDetails';

export function mapTMDBToActorDetails(
  person: TMDBPerson,
  credits: TMDBPersonMovieCredits
): ActorDetails {
  return {
    id: person.id,
    name: person.name,
    profileUrl: person.profile_path
      ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
      : null,
    birthday: person.birthday,
    deathday: person.deathday,
    biography: person.biography,
    placeOfBirth: person.place_of_birth,
    popularity: person.popularity,
    imdbUrl: person.imdb_id ? `https://www.imdb.com/name/${person.imdb_id}` : null,
    homepage: person.homepage,
    alsoKnownAs: person.also_known_as,
    gender:
      person.gender === 1 ? 'Femme' :
      person.gender === 2 ? 'Homme' : 'Inconnu',
    filmography: (credits.cast ?? [])
      .filter(f => f.title && f.id)
      .sort((a, b) => (b.release_date ?? '').localeCompare(a.release_date ?? '')) // Tri: récents d'abord
      .map(f => ({
        id: f.id,
        title: f.title,
        character: f.character,
        posterUrl: f.poster_path
          ? `https://image.tmdb.org/t/p/w342${f.poster_path}`
          : null,
        releaseYear: f.release_date?.slice(0, 4) || "?",
        voteAverage: f.vote_average,
      })),
  };
}
