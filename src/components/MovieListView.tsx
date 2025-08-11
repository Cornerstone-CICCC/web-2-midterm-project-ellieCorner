import { memo } from "react";
import type { Genre, Media } from "../types/tmdb";
import { Calendar, Heart, Play, Star, TrendingUp } from "lucide-react";
import { getImageUrl, getNumber, getYear } from "../utils/formatters";
import { getGenreNames } from "../utils/movieUtils";

interface MovieListViewProps {
  movies: Media[];
  genres: Genre[];
  favorites: number[];
  onFavoriteToggle: (movieId: number) => void;
  onMovieSelect: (movie: Media) => void;
}

export const MovieListView = memo(
  ({
    movies,
    genres,
    favorites,
    onFavoriteToggle,
    onMovieSelect,
  }: MovieListViewProps) => (
    <div className="space-y-4">
      {movies.map((movie, index) => (
        <div
          key={movie.id}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all cursor-pointer hover:scale-[1.02] duration-300"
          style={{ animationDelay: `${index * 0.1}s` }}
          onClick={() => onMovieSelect(movie)}
        >
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img
                src={getImageUrl(movie.poster_path)}
                alt={movie.title}
                className="w-24 h-36 object-cover rounded-xl"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors rounded-xl" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {movie.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {movie.original_title !== movie.title &&
                      movie.original_title}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 bg-yellow-500/20 rounded-full px-3 py-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-yellow-400 font-semibold">
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </div>
                  <div className="text-gray-400 text-sm">
                    {getNumber(movie.vote_count)} votes
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onFavoriteToggle(movie.id);
                    }}
                    className={`p-2 rounded-full transition-all hover:scale-110 ${
                      favorites.includes(movie.id)
                        ? "bg-red-500 text-white"
                        : "bg-white/10 text-white hover:bg-red-500"
                    }`}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        favorites.includes(movie.id) ? "fill-current" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>
              <p className="text-gray-300 mb-3 line-clamp-2 leading-relaxed">
                {movie.overview}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6 text-sm text-gray-400">
                  <span className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {getYear(movie.release_date || movie.first_air_date)}
                    </span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <TrendingUp className="h-4 w-4" />
                    <span>{getNumber(movie.popularity)} popularity</span>
                  </span>
                  <span>{getGenreNames(movie.genre_ids, genres)}</span>
                </div>
                <button className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all hover:scale-105">
                  <Play className="h-4 w-4" />
                  <span>Watch</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
);
