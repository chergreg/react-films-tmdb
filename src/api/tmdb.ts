import type { TMDBMovie } from '../types/TMDBMovie';
import type { TMDBCredits } from '../types/TMDBCredits';
import type { TMDBVideos } from '../types/TMDBVideos';
import type { TMDBWatchProviders } from '../types/TMDBWatchProviders';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';


async function safeFetch<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    const text = await response.text();
    console.error("Erreur lors de l’appel TMDB:", url);
    console.error("Réponse TMDB:", text);
    throw new Error(`Erreur TMDB (${response.status})\nURL : ${url}\nMessage : ${text}`);
  }
  return response.json();
}

// 1. Détail du film
export function fetchTMDBMovie(id: string): Promise<TMDBMovie> {
  const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=fr-FR`;
  return safeFetch<TMDBMovie>(url);
}

// 2. Casting et équipe
export function fetchTMDBCredits(id: string): Promise<TMDBCredits> {
  const url = `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=fr-FR`;
  return safeFetch<TMDBCredits>(url);
}

// 3. Vidéos (bande-annonce)
export function fetchTMDBVideos(id: string): Promise<TMDBVideos> {
  const url = `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=fr-FR`;
  return safeFetch<TMDBVideos>(url);
}

// 4. Plateformes de streaming
export function fetchTMDBWatchProviders(id: string): Promise<TMDBWatchProviders> {
  const url = `${BASE_URL}/movie/${id}/watch/providers?api_key=${API_KEY}`;
  return safeFetch<TMDBWatchProviders>(url);
}
