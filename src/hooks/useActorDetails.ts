import { useEffect, useState } from 'react';
import { fetchTMDBPerson, fetchTMDBPersonMovieCredits } from '../api/tmdb';
import { mapTMDBToActorDetails } from '../utils/mapTMDBToActorDetails';
import type { ActorDetails } from '../types/ActorDetails';

export function useActorDetails(id: string | undefined) {
  const [actor, setActor] = useState<ActorDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    Promise.all([
      fetchTMDBPerson(id),
      fetchTMDBPersonMovieCredits(id),
    ])
      .then(([person, credits]) => {
        setActor(mapTMDBToActorDetails(person, credits));
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { actor, loading, error };
}
