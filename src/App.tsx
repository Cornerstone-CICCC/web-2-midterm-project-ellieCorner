import { Flame, Heart } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Header } from "./components/common/Header";
import { MovieCard } from "./components/MovieCard";
import type {
  Media,
  MovieCategory,
  MovieDetails,
  ViewMode,
} from "./types/tmdb";
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

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [category, setCategory] = useState<MovieCategory>("popular");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [favorites, setFavorites] = useLocalStorage<number[]>("favorites", []);
  const [hearts, setHearts] = useState<number[]>([]);
  const [isHeartAnimating, setIsHeartAnimating] = useState(false);

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

    return baseList.filter((m) =>
      selectedGenre ? m.genre_ids.includes(selectedGenre) : true
    );
  }, [movies, tv, searchResults, debouncedTerm, selectedGenre]);

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

  const handleSearchChange = useCallback(
    (term: string) => setSearchTerm(term),
    []
  );
  const handleViewModeChange = useCallback(
    (mode: ViewMode) => setViewMode(mode),
    []
  );
  const handleSoundToggle = useCallback(
    () => setSoundEnabled((prev) => !prev),
    []
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

  if (mediaLoading || searchLoading) return <Loading />;
  if (mediaError) return <div className="text-red-500 p-6">{mediaError}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        soundEnabled={soundEnabled}
        onSoundToggle={handleSoundToggle}
      />

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

      <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6 py-3 flex justify-between text-sm">
          <div className="flex items-center space-x-6 text-gray-300">
            <span className="flex items-center space-x-2">
              <Flame className="h-4 w-4 text-orange-400" />
              <span>{displayedMovies.length} movies found</span>
            </span>
            <span className="flex items-center space-x-2">
              <Heart className="h-4 w-4 text-red-400" />
              <span>{favorites.length} in favorites</span>
            </span>
          </div>
          <div className="flex items-center space-x-2 text-gray-400">
            <span>Sort by:</span>
            <select className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white text-sm">
              <option value="popularity" className="bg-gray-800">
                Popularity
              </option>
              <option value="release_date" className="bg-gray-800">
                Release Date
              </option>
              <option value="vote_average" className="bg-gray-800">
                Rating
              </option>
              <option value="title" className="bg-gray-800">
                Title
              </option>
            </select>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-8">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {displayedMovies.map((movie, index) => (
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

      {hearts.map((id) => (
        <Heart key={id} />
      ))}

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
}

export default App;
