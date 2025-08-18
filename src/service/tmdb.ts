import { API_CONFIG } from "../constants/api";
import type {
  Media,
  MovieCategory,
  TVCategory,
  TMDBListResponse,
  TMDBResult,
  Genre,
  TMDBTvDetails,
  MovieDetails,
} from "../types/tmdb";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY as string;

async function request<T>(
  path: string,
  params: Record<string, string | number | undefined> = {}
): Promise<T> {
  const url = new URL(`${API_CONFIG.BASE_URL}${path}`);
  url.searchParams.set("api_key", API_KEY);

  Object.entries(params).forEach(([k, v]) => {
    if (v != null) url.searchParams.set(k, String(v));
  });

  const res = await fetch(url.toString());

  if (!res.ok) {
    const txt = await res.text();
    if (res.status === 404) {
      throw new Error("TMDB_NOT_FOUND");
    }
    throw new Error(`TMDB ${res.status}: ${txt}`);
  }

  return res.json() as Promise<T>;
}

function getMediaList<T extends Media>(
  media: "movie" | "tv",
  category: MovieCategory | TVCategory,
  page = 1
): Promise<TMDBListResponse<T>> {
  const invalidMovieCategory = ["airing_today", "on_the_air"];
  const invalidTvCategory = ["upcoming", "now_playing"];

  if (
    (media === "movie" && invalidMovieCategory.includes(category as string)) ||
    (media === "tv" && invalidTvCategory.includes(category as string))
  ) {
    return Promise.resolve({
      page: 1,
      results: [],
      total_pages: 0,
      total_results: 0,
    });
  }

  return request<TMDBListResponse<T>>(`/${media}/${category}`, { page });
}

export function getTrending(
  media: "movie" | "tv",
  timeWindow: "day" | "week" = "day"
): Promise<TMDBListResponse<TMDBResult>> {
  return request<TMDBListResponse<TMDBResult>>(
    `/trending/${media}/${timeWindow}`
  );
}

export function searchMulti(
  query: string,
  page = 1
): Promise<TMDBListResponse<TMDBResult>> {
  return request<TMDBListResponse<TMDBResult>>(`/search/multi`, {
    query,
    page,
  });
}

export function getGenres(media: "movie" | "tv"): Promise<{ genres: Genre[] }> {
  return request<{ genres: Genre[] }>(`/genre/${media}/list`);
}

export function getMediaByCategory(
  media: "movie" | "tv",
  category: MovieCategory | TVCategory,
  page = 1
): Promise<TMDBListResponse<Media>> {
  return getMediaList(media, category, page);
}

export function createTvDetailsAsMovie(tv: TMDBTvDetails): MovieDetails {
  return {
    id: tv.id,
    title: tv.name,
    original_title: tv.original_name,
    overview: tv.overview,
    poster_path: tv.poster_path,
    backdrop_path: tv.backdrop_path,
    release_date: tv.first_air_date || "",
    vote_average: tv.vote_average,
    vote_count: tv.vote_count,
    genre_ids: tv.genres.map((g) => g.id),
    popularity: tv.popularity,
    adult: false,
    original_language: tv.original_language,
    video: false,
    budget: 0,
    revenue: 0,
    runtime: tv.episode_run_time?.[0] || 0,
    status: tv.status,
    tagline: tv.tagline || "",
    homepage: tv.homepage || "",
    genres: tv.genres,
    production_companies: tv.production_companies.map((pc) => ({
      id: pc.id,
      name: pc.name,
      logo_path: null,
      origin_country: "",
    })),
    production_countries: tv.production_countries,
    spoken_languages: tv.spoken_languages.map((sl) => ({
      iso_639_1: sl.iso_639_1,
      name: sl.name,
      english_name: "",
    })),
    media_type: "tv",
  };
}

export async function getMovieDetails(movieId: number): Promise<MovieDetails> {
  const movie = await request<MovieDetails>(`/movie/${movieId}`);
  return movie;
}

export async function getTvDetails(tvId: number): Promise<MovieDetails> {
  const tv = await request<TMDBTvDetails>(`/tv/${tvId}`);
  return createTvDetailsAsMovie(tv);
}
