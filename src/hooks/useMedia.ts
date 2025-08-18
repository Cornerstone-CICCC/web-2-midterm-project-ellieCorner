import { useState, useEffect, useCallback } from "react";
import { getMediaByCategory, getGenres, getTrending } from "../service/tmdb";
import type { Genre, Media, MovieCategory } from "../types/tmdb";

export const useMedia = (category: MovieCategory) => {
  const [movies, setMovies] = useState<Media[]>([]);
  const [tv, setTv] = useState<Media[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Media[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
  }, [category]);

  useEffect(() => {
    let mounted = true;
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const [moviesRes, tvRes, genreRes, trendingRes] = await Promise.all([
          getMediaByCategory("movie", category, page),
          getMediaByCategory("tv", category, 1),
          getGenres("movie"),
          getTrending("movie", "day"),
        ]);
        if (!mounted) return;

        setMovies((prev) =>
          page === 1 ? moviesRes.results : [...prev, ...moviesRes.results]
        );
        if (page === 1) {
          setTv(tvRes.results);
          setGenres(genreRes.genres);
          setTrendingMovies(trendingRes.results);
        }
        setHasMore(page < moviesRes.total_pages);
      } catch (err) {
        if (!mounted) return;
        setError(String(err));
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };
    fetchMovies();
    return () => {
      mounted = false;
    };
  }, [page, category]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage((p) => p + 1);
    }
  }, [loading, hasMore]);

  return {
    movies,
    tv,
    trendingMovies,
    genres,
    loading,
    error,
    loadMore,
    hasMore,
  };
};
