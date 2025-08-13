import { memo, useState } from "react";
import type { Genre, Media } from "../types/tmdb";
import { Heart, Play, Star, Users } from "lucide-react";
import { getImageUrl, getMediaTitle, getYear } from "../utils/formatters";
import { getGenreNames } from "../utils/movieUtils";
import clsx from "clsx";

interface MovieCardProps {
  movie: Media;
  genres: Genre[];
  isFavorite: boolean;
  onFavoriteToggle: (movieId: number) => void;
  onMovieSelect: (movie: Media) => void;
  index: number;
}

export const MovieCard = memo(
  ({
    movie,
    genres,
    isFavorite,
    onFavoriteToggle,
    onMovieSelect,
    index,
  }: MovieCardProps) => {
    const [imageError, setImageError] = useState(!movie.poster_path);
    const title = getMediaTitle(movie) || "Untitled";
    const year = getYear(movie) || "Unknown Year";
    const genresText =
      getGenreNames(movie.genre_ids, genres) || "Unknown Genre";

    const handleClick = () => {
      if (!imageError && movie.poster_path) {
        onMovieSelect(movie);
      }
    };

    return (
      <div
        className={clsx(
          `group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-500`,
          imageError
            ? "cursor-not-allowed opacity-60"
            : "hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 cursor-pointer"
        )}
        style={{ animationDelay: `${index * 0.1}s` }}
        onClick={handleClick}
      >
        <div className="aspect-[2/3] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10" />
          {movie.poster_path && !imageError ? (
            <img
              src={getImageUrl(movie.poster_path)}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-gray-500 text-xs">No Image</span>
            </div>
          )}

          <div className="absolute top-3 left-3 right-3 z-20 flex justify-between items-start">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-1 bg-yellow-500/20 backdrop-blur-sm rounded-full px-2 py-1">
                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                <span className="text-xs text-yellow-400 font-bold">
                  {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                </span>
              </div>
              {movie.popularity > 1000 && (
                <div className="bg-red-500/80 backdrop-blur-sm rounded-full px-3 py-1.5">
                  <span className="text-sm text-white font-bold">HOT</span>
                </div>
              )}
            </div>

            {!imageError && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onFavoriteToggle(movie.id);
                }}
                className={`p-2 rounded-full backdrop-blur-sm transition-all hover:scale-110 ${
                  isFavorite
                    ? "bg-red-500 text-white"
                    : "bg-black/30 text-white hover:bg-red-500"
                } z-50`}
              >
                <Heart
                  className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`}
                />
              </button>
            )}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <div className="space-y-2">
              <h3 className="text-white font-bold text-sm line-clamp-2 leading-tight">
                {title}
              </h3>
              <div className="flex items-center justify-between">
                <p className="text-gray-300 text-xs">{getYear(movie)}</p>
                <div className="flex items-center space-x-1 text-gray-400">
                  <Users className="h-3 w-3" />
                  <span className="text-xs"> {year}</span>
                </div>
              </div>
              <p className="text-gray-400 text-xs line-clamp-1">{genresText}</p>
            </div>
          </div>

          {!imageError && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-colors">
                <Play className="h-8 w-8 text-white fill-current" />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);
