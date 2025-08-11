import {
  ChevronLeft,
  ChevronRight,
  Flame,
  Heart,
  Play,
  Star,
  Zap,
} from "lucide-react";
import { memo, useCallback, useEffect } from "react";
import type { Media } from "../types/tmdb";
import { getImageUrl } from "../utils/formatters";

interface HeroSlideshowProps {
  movies: Media[];
  currentSlide: number;
  isAutoPlay: boolean;
  favorites: number[];
  onSlideChange: (index: number) => void;
  onAutoPlayToggle: () => void;
  onFavoriteToggle: (movieId: number) => void;
  onMovieSelect: (movie: Media) => void;
}

export const HeroSlideSection = memo(
  ({
    movies,
    currentSlide,
    isAutoPlay,
    favorites,
    onSlideChange,
    onAutoPlayToggle,
    onFavoriteToggle,
    onMovieSelect,
  }: HeroSlideshowProps) => {
    const nextSlide = useCallback(() => {
      onSlideChange((currentSlide + 1) % movies.length);
    }, [currentSlide, movies.length, onSlideChange]);

    const prevSlide = useCallback(() => {
      onSlideChange((currentSlide - 1 + movies.length) % movies.length);
    }, [currentSlide, movies.length, onSlideChange]);

    useEffect(() => {
      if (!isAutoPlay || movies.length <= 1) return;

      const interval = setInterval(() => {
        onSlideChange((currentSlide + 1) % movies.length);
      }, 3000);

      return () => clearInterval(interval);
    }, [isAutoPlay, movies.length, onSlideChange, currentSlide]);

    if (movies.length === 0) return null;

    return (
      <section className="relative h-[70vh] overflow-hidden">
        <div className="relative h-full">
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
              <img
                src={getImageUrl(movie.backdrop_path, "backdrop")}
                alt={movie.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                <div className="container mx-auto max-w-2xl">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="flex items-center space-x-1 bg-red-600 px-3 py-1 rounded-full text-sm font-bold">
                      <Flame className="h-4 w-4" />
                      <span>TRENDING</span>
                    </span>
                    <span className="flex items-center space-x-1 bg-yellow-500/20 backdrop-blur-sm rounded-full px-3 py-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-yellow-400 font-semibold">
                        {movie.vote_average.toFixed(1)}
                      </span>
                    </span>
                  </div>

                  <h2 className="text-5xl font-bold text-white mb-4 leading-tight">
                    {movie.title}
                  </h2>

                  <p className="text-xl text-gray-300 mb-6 leading-relaxed line-clamp-3">
                    {movie.overview}
                  </p>

                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => onMovieSelect(movie)}
                      className="flex items-center space-x-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 hover:shadow-2xl"
                    >
                      <Play className="h-6 w-6 fill-current" />
                      <span>Watch Trailer</span>
                    </button>

                    <button
                      onClick={() => onFavoriteToggle(movie.id)}
                      className={`flex items-center space-x-2 px-6 py-4 rounded-full font-bold transition-all hover:scale-105 ${
                        favorites.includes(movie.id)
                          ? "bg-red-500 text-white"
                          : "bg-white/20 backdrop-blur-sm text-white hover:bg-red-500"
                      }`}
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          favorites.includes(movie.id) ? "fill-current" : ""
                        }`}
                      />
                      <span>
                        {favorites.includes(movie.id) ? "Loved" : "Love it"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 z-30 p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-all hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 z-30 p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-all hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
          {movies.map((_, index) => (
            <button
              key={index}
              onClick={() => onSlideChange(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="absolute top-4 right-4 z-30">
          <button
            onClick={onAutoPlayToggle}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full font-semibold transition-all ${
              isAutoPlay
                ? "bg-green-500 text-white"
                : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
            }`}
          >
            <Zap className="h-4 w-4" />
            <span>{isAutoPlay ? "Auto ON" : "Auto OFF"}</span>
          </button>
        </div>
      </section>
    );
  }
);
