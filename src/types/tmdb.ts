export interface Media {
  id: number;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
  adult: boolean;
  original_language: string;
  video: boolean;
  media_type: "movie" | "tv";
}
export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetails extends Media {
  budget: number;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  homepage: string;
  genres: Genre[];
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
}

export interface TMDBTvDetails {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  genres: Genre[];
  popularity: number;
  original_language: string;
  episode_run_time: number[];
  status: string;
  tagline: string;
  homepage: string;
  production_companies: { id: number; name: string }[];
  production_countries: { iso_3166_1: string; name: string }[];
  spoken_languages: { iso_639_1: string; name: string }[];
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface APIResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export type MovieCategory =
  | "popular"
  | "top_rated"
  | "upcoming"
  | "now_playing";

export type TVCategory =
  | "popular"
  | "top_rated"
  | "airing_today"
  | "on_the_air";

export type ViewMode = "grid" | "list";

export type TMDBResult = Media;

export interface TMDBListResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
