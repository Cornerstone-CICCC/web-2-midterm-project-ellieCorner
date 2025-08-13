import { Flame, Heart } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { MovieCard } from "./components/MovieCard";
import type { Media, MovieCategory, MovieDetails, SortKey } from "./types/tmdb";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { createMovieDetails } from "./utils/movieUtils";
import { Loading } from "./components/common/Loading";
import { HeroSlideSection } from "./components/HeroSlideSection";
import { MovieListView } from "./components/MovieListView";
import { EmptyState } from "./components/common/EmptyState";
import { MovieDetailModal } from "./components/MovieDetailModal";
import { useMedia } from "./hooks/useMedia";
import { useSearch } from "./hooks/useSearch";
import { Navigation } from "./components/Navigation";
import { HeartAnimation } from "./components/Heart";
import { SortOptions } from "./components/SortOptions";
import { sortMedia } from "./utils/sort";
import { MovieCardSkeleton } from "./components/MovieCardSkeleton";
import { useControls } from "./layout/RootLayout";

export const Home = () => {
  const { searchTerm, viewMode } = useControls();

  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [category, setCategory] = useState<MovieCategory>("popular");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [favorites, setFavorites] = useLocalStorage<number[]>("favorites", []);
  const [hearts, setHearts] = useState<number[]>([]);
  const [isHeartAnimating, setIsHeartAnimating] = useState(false);
  const [sortBy, setSortBy] = useState<SortKey>("popularity");

  const {
    movies,
    tv,
    trendingMovies,
    genres,
    loading: mediaLoading,
    error: mediaError,
  } = useMedia(category);
  const {
    searchResults,
    loading: searchLoading,
    debouncedTerm,
  } = useSearch(searchTerm);

  const displayedMovies = useMemo(() => {
    const baseList = debouncedTerm ? searchResults : [...movies, ...tv];
    const filtered = selectedGenre
      ? baseList.filter((m) => m.genre_ids?.includes(selectedGenre))
      : baseList;
    return sortMedia(filtered, sortBy);
  }, [movies, tv, searchResults, debouncedTerm, selectedGenre, sortBy]);

  const handleFavoriteToggle = useCallback(
    (movieId: number) => {
      setFavorites((prev) =>
        prev.includes(movieId)
          ? prev.filter((id) => id !== movieId)
          : [...prev, movieId]
      );
      setHearts((prev) => [...prev, movieId]);
      setIsHeartAnimating(true);
    },
    [setFavorites]
  );

  const handleMovieSelect = useCallback(
    (movie: Media) => {
      const movieDetails = createMovieDetails(movie, genres);
      setSelectedMovie(movieDetails);
    },
    [genres]
  );

  const handleSlideChange = useCallback(
    (index: number) => setCurrentSlide(index),
    []
  );
  const handleAutoPlayToggle = useCallback(
    () => setIsAutoPlay((prev) => !prev),
    []
  );
  const handleCategoryChange = useCallback(
    (category: MovieCategory) => setCategory(category),
    []
  );
  const handleSelectedGenreChange = useCallback(
    (genreId: number | null) => setSelectedGenre(genreId),
    []
  );
  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value as SortKey;
      setSortBy(value);
    },
    []
  );

  const isInitialLoading = mediaLoading && displayedMovies.length === 0;
  if (isInitialLoading) return <Loading />;
  if (mediaError) return <div className="text-red-500 p-6">{mediaError}</div>;

  return (
    <div className="min-h-screen">
      <HeroSlideSection
        movies={trendingMovies}
        currentSlide={currentSlide}
        isAutoPlay={isAutoPlay}
        favorites={favorites}
        onSlideChange={handleSlideChange}
        onAutoPlayToggle={handleAutoPlayToggle}
        onFavoriteToggle={handleFavoriteToggle}
        onMovieSelect={handleMovieSelect}
      />

      <Navigation
        category={category}
        setCategory={handleCategoryChange}
        selectedGenre={selectedGenre}
        setSelectedGenre={handleSelectedGenreChange}
        genres={genres}
      />

      <div className="bg-gradient-to-r from-purple-100/50 to-blue-100/50 dark:from-purple-900/50 dark:to-blue-900/50 backdrop-blur-sm border-b border-gray-200 dark:border-white/10">
        <div className="container mx-auto px-6 py-3 flex justify-between text-sm">
          <div className="flex items-center space-x-6 text-gray-700 dark:text-gray-300">
            <span className="flex items-center space-x-2">
              <Flame className="h-4 w-4 text-orange-500 dark:text-orange-400" />
              <span>{displayedMovies.length} movies found</span>
            </span>
            <span className="flex items-center space-x-2">
              <Heart className="h-4 w-4 text-red-500 dark:text-red-400" />
              <span>{favorites.length} in favorites</span>
            </span>
          </div>
          <SortOptions sortBy={sortBy} onSortChange={handleSortChange} />
        </div>
      </div>

      <main className="container mx-auto px-6 py-8">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {mediaLoading || searchLoading
              ? Array.from({ length: 10 }).map((_, i) => (
                  <MovieCardSkeleton key={i} />
                ))
              : displayedMovies.map((movie, index) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    genres={genres}
                    isFavorite={favorites.includes(movie.id)}
                    onFavoriteToggle={handleFavoriteToggle}
                    onMovieSelect={handleMovieSelect}
                    index={index}
                  />
                ))}
          </div>
        ) : (
          <MovieListView
            movies={displayedMovies}
            genres={genres}
            favorites={favorites}
            onFavoriteToggle={handleFavoriteToggle}
            onMovieSelect={handleMovieSelect}
          />
        )}
        {displayedMovies.length === 0 && (
          <EmptyState searchTerm={debouncedTerm} />
        )}
      </main>

      {isHeartAnimating && (
        <HeartAnimation
          movieId={hearts[0]}
          onEnd={() => setIsHeartAnimating(false)}
        />
      )}

      {selectedMovie && (
        <MovieDetailModal
          movie={selectedMovie}
          isFavorite={favorites.includes(selectedMovie.id)}
          onClose={() => setSelectedMovie(null)}
          onFavoriteToggle={handleFavoriteToggle}
        />
      )}
    </div>
  );
};
