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
    <nav className="bg-black/20 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-0 py-4 flex flex-col md:flex-row md:justify-between">
        <div className="-mx-4 overflow-x-auto">
          <div className="flex space-x-4 px-4">
            {navigationConfig.map(({ key, label, icon: Icon, color }) => (
              <button
                key={key}
                onClick={() => setCategory(key as MovieCategory)}
                className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-full font-bold transition-all hover:scale-105 whitespace-nowrap ${
                  category === key
                    ? `bg-gradient-to-r ${color} text-white shadow-2xl`
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-sm md:text-base">{label}</span>
              </button>
            ))}
          </div>
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
