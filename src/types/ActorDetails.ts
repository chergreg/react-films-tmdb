export interface ActorDetails {
  id: number;
  name: string;
  profileUrl: string | null;
  birthday: string | null;
  deathday: string | null;
  biography: string | null;
  placeOfBirth: string | null;
  popularity: number;
  imdbUrl: string | null;
  homepage: string | null;
  alsoKnownAs: string[];
  gender: 'Homme' | 'Femme' | 'Inconnu';
  filmography: {
    id: number;
    title: string;
    character: string;
    posterUrl: string | null;
    releaseYear: string;
    voteAverage: number;
  }[];
}
