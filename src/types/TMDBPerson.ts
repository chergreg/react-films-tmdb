export interface TMDBPerson {
  id: number;
  name: string;
  profile_path: string | null;
  birthday: string | null;
  deathday: string | null;
  biography: string | null;
  place_of_birth: string | null;
  popularity: number;
  imdb_id: string | null;
  homepage: string | null;
  also_known_as: string[];
  gender: number; // 1: femme, 2: homme
}
