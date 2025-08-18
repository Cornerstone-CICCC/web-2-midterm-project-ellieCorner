import type { Genre, Media, MovieDetails } from "../types/tmdb";

export function getGenreNames(genreIds: number[], genres: Genre[]): string {
  if (!genreIds || genreIds.length === 0) return "";
  return genreIds
    .map((id) => genres.find((g) => g.id === id)?.name)
    .filter(Boolean)
    .join(", ");
}

export function createMovieDetails(
  movie: Media,
  genres: Genre[]
): MovieDetails {
  return {
    ...movie,
    budget: 0,
    revenue: 0,
    runtime: 120 + Math.floor(Math.random() * 60),
    status: "Released",
    tagline: "An epic adventure awaits...",
    homepage: "",
    genres: movie.genre_ids
      .map((id) => genres.find((g) => g.id === id))
      .filter(Boolean) as Genre[],
    production_companies: [],
    production_countries: [],
    spoken_languages: [],
  };
}
