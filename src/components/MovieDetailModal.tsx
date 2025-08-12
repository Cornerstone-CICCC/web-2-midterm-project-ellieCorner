import { memo } from "react";
import type { MovieDetails } from "../types/tmdb";
import {
  BookmarkPlus,
  Calendar,
  Clock,
  Heart,
  Play,
  Share2,
  Star,
  Users,
} from "lucide-react";
import { getImageUrl, getNumber, getYear } from "../utils/formatters";

interface MovieDetailModalProps {
  movie: MovieDetails;
  isFavorite: boolean;
  onClose: () => void;
  onFavoriteToggle: (movieId: number) => void;
}

export const MovieDetailModal = memo(
  ({ movie, isFavorite, onClose, onFavoriteToggle }: MovieDetailModalProps) => (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl max-w-5xl w-full max-h-[95vh] overflow-y-auto">
        <div className="relative">
          <img
            src={getImageUrl(movie.backdrop_path, "backdrop")}
            alt={movie.title}
            className="w-full h-80 object-cover rounded-t-3xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
          <button
            onClick={onClose}
            className="z-50 absolute top-6 right-6 bg-black/50 backdrop-blur-sm rounded-full p-3 text-white hover:bg-black/70 transition-all hover:scale-110"
          >
            <span className="text-xl">✕</span>
          </button>

          <div className="absolute inset-0 flex items-center justify-center">
            <button className="bg-red-600/80 backdrop-blur-sm hover:bg-red-600 rounded-full p-6 text-white transition-all hover:scale-110 group">
              <Play className="h-12 w-12 fill-current group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        <div className="p-8">
          <div className="flex items-start space-x-8 mb-8">
            <div className="relative">
              <img
                src={getImageUrl(movie.poster_path)}
                alt={movie.title}
                className="w-40 h-60 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-yellow-500 rounded-full p-3">
                <Star className="h-6 w-6 text-white fill-current" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-4xl font-bold text-white mb-2">
                    {movie.title}
                  </h2>
                  {movie.tagline && (
                    <p className="text-xl text-purple-300 italic mb-2">
                      "{movie.tagline}"
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Star className="h-6 w-6 text-yellow-400 fill-current" />
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {movie.vote_average.toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-400">Rating</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {getNumber(movie.vote_count)}
                  </div>
                  <div className="text-sm text-gray-400">Votes</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Calendar className="h-6 w-6 text-green-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {getYear(movie.release_date)}
                  </div>
                  <div className="text-sm text-gray-400">Release</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="h-6 w-6 text-purple-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {movie.runtime}m
                  </div>
                  <div className="text-sm text-gray-400">Runtime</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <div className="flex space-x-4">
                <button className="bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-3 rounded-full flex items-center space-x-3 hover:shadow-2xl transition-all hover:scale-105 font-bold">
                  <Play className="h-5 w-5" />
                  <span>Watch Now</span>
                </button>
                <button
                  onClick={() => onFavoriteToggle(movie.id)}
                  className={`px-8 py-3 rounded-full flex items-center space-x-3 transition-all hover:scale-105 font-bold ${
                    isFavorite
                      ? "bg-red-500 text-white"
                      : "bg-white/10 text-white hover:bg-red-500"
                  }`}
                >
                  <Heart
                    className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`}
                  />
                  <span>
                    {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                  </span>
                </button>
                <button className="bg-white/10 text-white px-8 py-3 rounded-full flex items-center space-x-3 hover:bg-white/20 transition-all hover:scale-105 font-bold">
                  <BookmarkPlus className="h-5 w-5" />
                  <span>Watchlist</span>
                </button>
                <button className="bg-white/10 text-white px-8 py-3 rounded-full flex items-center space-x-3 hover:bg-white/20 transition-all hover:scale-105 font-bold">
                  <Share2 className="h-5 w-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
                <span>📖</span>
                <span>Overview</span>
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                {movie.overview}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-bold text-white mb-3 flex items-center space-x-2">
                  <span>ℹ️</span>
                  <span>Details</span>
                </h4>
                <div className="space-y-2 text-gray-300">
                  <div className="flex justify-between">
                    <span>Original Title:</span>
                    <span className="text-white">{movie.original_title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="text-green-400">{movie.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Language:</span>
                    <span className="text-white uppercase">
                      {movie.original_language}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Popularity:</span>
                    <span className="text-white">
                      {getNumber(movie.popularity)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
);
