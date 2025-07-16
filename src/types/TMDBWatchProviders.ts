// src/types/TMDBWatchProviders.ts
export interface TMDBProvider {
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

export interface TMDBWatchProviders {
  id: number;
  results: {
    [country: string]: {
      link?: string;
      flatrate?: TMDBProvider[];
      rent?: TMDBProvider[];
      buy?: TMDBProvider[];
    }
  }
}
