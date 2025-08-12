import { useState, useEffect } from "react";
import { getMediaByCategory, getGenres, getTrending } from "../service/tmdb";
import type { Genre, Media, MovieCategory } from "../types/tmdb";

export const useMedia = (category: MovieCategory) => {
  const [movies, setMovies] = useState<Media[]>([]);
  const [tv, setTv] = useState<Media[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Media[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    const fetchData = async () => {
      try {
        const [moviesRes, tvRes, genreRes, trendingRes] = await Promise.all([
          getMediaByCategory("movie", category),
          getMediaByCategory("tv", category),
          getGenres("movie"),
          getTrending("movie", "day"),
        ]);
        if (!mounted) return;

        setMovies(moviesRes.results);
        setTrendingMovies(trendingRes.results);
        setTv(tvRes.results);
        setGenres(genreRes.genres);
      } catch (err) {
        if (!mounted) return;
        setError(String(err));
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    fetchData();
    return () => {
      mounted = false;
    };
  }, [category]);

  return { movies, tv, trendingMovies, genres, loading, error };
};
