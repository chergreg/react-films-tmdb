import type { TMDBMovie } from '../types/TMDBMovie';
import type { TMDBCredits } from '../types/TMDBCredits';
import type { TMDBVideos } from '../types/TMDBVideos';
import type { TMDBWatchProviders } from '../types/TMDBWatchProviders';
import type { TMDBMoviesByGenreResponse } from '../types/TMDBMoviesByGenreResponse';
import type { TMDBGenre } from '../types/TMDBGenre';
import type { TMDBSearchMoviesResponse } from '../types/TMDBSearchMoviesResponse';
import type { TMDBPerson } from '../types/TMDBPerson';
import type { TMDBPersonMovieCredits } from '../types/TMDBPersonMovieCredits';


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

// Films par Catégorie
export function fetchMoviesByGenre(genreId: string, page: number = 1): Promise<TMDBMoviesByGenreResponse> {
  const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=fr-FR&page=${page}&sort_by=popularity.desc`;
  return safeFetch<TMDBMoviesByGenreResponse>(url);
}

// Nom des Catégories
export async function fetchGenres(): Promise<TMDBGenre[]> {
  const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=fr-FR`;
  const response = await fetch(url);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Erreur ${response.status} : ${text}\nURL: ${url}`);
  }
  const data = await response.json();
  return data.genres; // TMDB répond { genres: [...] }
}

export function searchMovies(query: string, page: number = 1): Promise<TMDBSearchMoviesResponse> {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=fr-FR&query=${encodeURIComponent(query)}&page=${page}`;
  return safeFetch<TMDBSearchMoviesResponse>(url);
}

export function fetchTMDBPerson(id: string): Promise<TMDBPerson> {
  const url = `${BASE_URL}/person/${id}?api_key=${API_KEY}&language=fr-FR`;
  return safeFetch<TMDBPerson>(url);
}

export function fetchTMDBPersonMovieCredits(id: string): Promise<TMDBPersonMovieCredits> {
  const url = `${BASE_URL}/person/${id}/movie_credits?api_key=${API_KEY}&language=fr-FR`;
  return safeFetch<TMDBPersonMovieCredits>(url);
}