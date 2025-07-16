import { useEffect, useState } from 'react';
import { fetchTMDBMovie, fetchTMDBCredits, fetchTMDBVideos, fetchTMDBWatchProviders } from '../api/tmdb';
import { mapTMDBToMovieDetails } from '../utils/mapTMDBToMovieDetails';
import type { MovieDetails } from '../types/MovieDetails';

export function useMovieDetails(id: string | undefined) {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);

    // Appel toutes les APIs en parallèle
    Promise.all([
      fetchTMDBMovie(id),
      fetchTMDBCredits(id),
      fetchTMDBVideos(id),
      fetchTMDBWatchProviders(id),
    ])
      .then(([movie, credits, videos, providers]) => {
        const details = mapTMDBToMovieDetails(movie, credits, videos, providers);
        setMovieDetails(details);
      })
      .catch(err => {
        setError(err.message ?? 'Erreur inconnue');
      })
      .finally(() => setLoading(false));
  }, [id]);

  return { movieDetails, loading, error };
}
