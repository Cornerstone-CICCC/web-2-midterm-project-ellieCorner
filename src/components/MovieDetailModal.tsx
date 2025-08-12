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

const InfoCard = ({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) => (
  <div className="rounded-xl p-4 text-center bg-gray-100 dark:bg-white/5">
    <div className="flex items-center justify-center mb-2">{icon}</div>
    <div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
      {value}
    </div>
    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
      {label}
    </div>
  </div>
);

const ActionButton = ({
  variant,
  icon,
  label,
  onClick,
}: {
  variant: "primary" | "secondary" | "favorite";
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) => {
  const base =
    "px-5 sm:px-6 py-2.5 rounded-full flex items-center gap-2 font-medium transition-all hover:scale-105";
  const variants = {
    primary:
      "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg hover:shadow-xl",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20",
    favorite: "bg-red-500 text-white hover:bg-red-600 shadow-md",
  };
  return (
    <button onClick={onClick} className={`${base} ${variants[variant]}`}>
      {icon}
      <span>{label}</span>
    </button>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
      {title}
    </h3>
    {children}
  </div>
);

const DetailRow = ({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
}) => (
  <div className="flex justify-between text-sm sm:text-base">
    <span>{label}:</span>
    <span
      className={
        highlight
          ? "text-green-600 dark:text-green-400 font-medium"
          : "text-gray-900 dark:text-white"
      }
    >
      {value}
    </span>
  </div>
);

interface MovieDetailModalProps {
  movie: MovieDetails;
  isFavorite: boolean;
  onClose: () => void;
  onFavoriteToggle: (movieId: number) => void;
}

export const MovieDetailModal = memo(
  ({ movie, isFavorite, onClose, onFavoriteToggle }: MovieDetailModalProps) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 dark:bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-5xl max-h-[95vh] overflow-y-auto rounded-3xl shadow-2xl bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 transition-colors">
        <div className="relative">
          <img
            src={getImageUrl(movie.backdrop_path, "backdrop")}
            alt={movie.title}
            className="w-full h-56 sm:h-72 md:h-80 object-cover rounded-t-3xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent rounded-t-3xl" />
          <button
            onClick={onClose}
            className="z-50 absolute top-4 right-4 sm:top-6 sm:right-6 bg-black/50 dark:bg-white/20 backdrop-blur-sm rounded-full p-2.5 sm:p-3 text-white hover:bg-black/70 dark:hover:bg-white/30 transition-all hover:scale-110"
          >
            <span className="text-lg sm:text-xl">✕</span>
          </button>

          <div className="absolute inset-0 flex items-center justify-center">
            <button className="bg-red-600/90 hover:bg-red-600 rounded-full p-5 sm:p-6 text-white transition-all hover:scale-105 shadow-lg group">
              <Play className="h-10 w-10 sm:h-12 sm:w-12 fill-current group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:space-x-8 mb-8 md:gap-4">
            <div className="relative mx-auto md:mx-0 mb-6 md:mb-0 w-32 sm:w-40 shrink-0">
              <img
                src={getImageUrl(movie.poster_path)}
                alt={movie.title}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>

            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {movie.title}
              </h2>
              {movie.tagline && (
                <p className="text-base sm:text-lg text-purple-600 dark:text-purple-300 italic mb-4">
                  "{movie.tagline}"
                </p>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <InfoCard
                  icon={
                    <Star className="h-6 w-6 text-yellow-400 fill-current" />
                  }
                  value={movie.vote_average.toFixed(1)}
                  label="Rating"
                />
                <InfoCard
                  icon={<Users className="h-6 w-6 text-blue-500" />}
                  value={getNumber(movie.vote_count)}
                  label="Votes"
                />
                <InfoCard
                  icon={<Calendar className="h-6 w-6 text-green-500" />}
                  value={getYear(movie.release_date)}
                  label="Release"
                />
                <InfoCard
                  icon={<Clock className="h-6 w-6 text-purple-500" />}
                  value={`${movie.runtime}m`}
                  label="Runtime"
                />
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1.5 rounded-full text-sm font-medium bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <ActionButton
                  variant="primary"
                  icon={<Play className="h-5 w-5" />}
                  label="Watch Now"
                />
                <ActionButton
                  onClick={() => onFavoriteToggle(movie.id)}
                  variant={isFavorite ? "favorite" : "secondary"}
                  icon={
                    <Heart
                      className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`}
                    />
                  }
                  label={
                    isFavorite ? "Remove from Favorites" : "Add to Favorites"
                  }
                />
                <ActionButton
                  variant="secondary"
                  icon={<BookmarkPlus className="h-5 w-5" />}
                  label="Watchlist"
                />
                <ActionButton
                  variant="secondary"
                  icon={<Share2 className="h-5 w-5" />}
                  label="Share"
                />
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <Section title="📖 Overview">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
                {movie.overview}
              </p>
            </Section>

            <Section title="ℹ️ Details">
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <DetailRow
                  label="Original Title"
                  value={movie.original_title}
                />
                <DetailRow label="Status" value={movie.status} highlight />
                <DetailRow
                  label="Language"
                  value={movie.original_language.toUpperCase()}
                />
                <DetailRow
                  label="Popularity"
                  value={getNumber(movie.popularity)}
                />
              </div>
            </Section>
          </div>
        </div>
      </div>
    </div>
  )
);
