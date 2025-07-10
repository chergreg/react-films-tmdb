import type { Movie } from '../types/Movie';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchMovie(id: string): Promise<Movie> {
  const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=fr-FR`;
  console.log("Appel API TMDB:", url); // log toujours l’URL, pratique pour le debug
  const response = await fetch(url);
  if (!response.ok) {
    const text = await response.text();
    // log l’url et la réponse en cas d’erreur
    console.error("Erreur lors de l’appel TMDB:", url);
    console.error("Réponse TMDB:", text);
    throw new Error(`Erreur ${response.status} : ${text}\nURL: ${url}`);
  }
  return response.json();
}
