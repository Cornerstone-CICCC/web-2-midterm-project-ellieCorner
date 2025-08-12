import { Calendar, Crown, Play, TrendingUp } from "lucide-react";
import { useMemo } from "react";
import type { MovieCategory } from "../types/tmdb";
import { Selector } from "./Selector";

interface NavigationProps {
  category: MovieCategory;
  setCategory: (category: MovieCategory) => void;
  selectedGenre: number | null;
  setSelectedGenre: (genreId: number | null) => void;
  genres: { id: number; name: string }[];
}

export const Navigation = ({
  category,
  setCategory,
  selectedGenre,
  setSelectedGenre,
  genres,
}: NavigationProps) => {
  const navigationConfig = useMemo(
    () => [
      {
        key: "popular",
        label: "🔥 Popular",
        icon: TrendingUp,
        color: "from-orange-500 to-red-500",
      },
      {
        key: "top_rated",
        label: "⭐ Top Rated",
        icon: Crown,
        color: "from-yellow-500 to-orange-500",
      },
      {
        key: "upcoming",
        label: "🚀 Upcoming",
        icon: Calendar,
        color: "from-blue-500 to-purple-500",
      },
      {
        key: "now_playing",
        label: "🎬 Now Playing",
        icon: Play,
        color: "from-green-500 to-blue-500",
      },
      {
        key: "on_the_air",
        label: "📺 On The Air",
        icon: Play,
        color: "from-purple-500 to-pink-500",
      },
      {
        key: "airing_today",
        label: "📅 Airing Today",
        icon: Play,
        color: "from-pink-500 to-red-500",
      },
    ],
    []
  );

  return (
    <nav className="bg-white/90 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-40 backdrop-blur-md">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row md:justify-between items-center space-y-2 md:space-y-0">
        <div className="flex space-x-2 overflow-x-auto -mx-2 px-2">
          {navigationConfig.map(({ key, label, icon: Icon, color }) => (
            <button
              key={key}
              onClick={() => setCategory(key as MovieCategory)}
              className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-full font-semibold transition-all whitespace-nowrap ${
                category === key
                  ? `bg-gradient-to-r ${color} text-white shadow-lg`
                  : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm md:text-base">{label}</span>
            </button>
          ))}
        </div>

        <Selector
          genres={genres}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
        />
      </div>
    </nav>
  );
};
