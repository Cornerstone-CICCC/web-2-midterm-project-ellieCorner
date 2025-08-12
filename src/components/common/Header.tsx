import {
  Armchair,
  Grid,
  List,
  Search,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { memo, useState } from "react";
import type { ViewMode } from "../../types/tmdb";
import { ThemeToggleButton } from "./ThemeToggleButton";

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  soundEnabled: boolean;
  onSoundToggle: () => void;
}

export const Header = memo(
  ({
    searchTerm,
    onSearchChange,
    viewMode,
    onViewModeChange,
    soundEnabled,
    onSoundToggle,
  }: HeaderProps) => {
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

    return (
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/40">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Armchair className="h-8 w-8 text-purple-500 dark:text-purple-400" />
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent dark:from-purple-400 dark:via-pink-400 dark:to-red-400">
              Movie site
            </h1>
            <span className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold rounded-full">
              BETA
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <div className="sm:hidden">
              <button
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                className="p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-gray-600 dark:text-gray-300"
              >
                {mobileSearchOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
              </button>
            </div>

            <div
              className={`absolute top-full left-0 w-full px-4 py-2 sm:static sm:w-auto sm:px-0 sm:py-0 transition-all ${
                mobileSearchOpen ? "block" : "hidden"
              } sm:block`}
            >
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search Movie or TV... 🔍"
                  className="pl-10 pr-4 py-2 w-full sm:w-64 
                             bg-black/5 dark:bg-white/10 
                             backdrop-blur-sm border border-black/10 dark:border-white/20 
                             rounded-full text-gray-900 dark:text-white 
                             placeholder-gray-500 dark:placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-purple-400 
                             focus:border-transparent transition-all 
                             focus:w-full sm:focus:w-72"
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => onViewModeChange("grid")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-purple-500 text-white shadow-lg"
                    : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => onViewModeChange("list")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-purple-500 text-white shadow-lg"
                    : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
                }`}
              >
                <List className="h-5 w-5" />
              </button>
              <button
                onClick={onSoundToggle}
                className={`p-2 rounded-lg transition-all ${
                  soundEnabled
                    ? "bg-green-500 text-white"
                    : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
                }`}
              >
                {soundEnabled ? (
                  <Volume2 className="h-5 w-5" />
                ) : (
                  <VolumeX className="h-5 w-5" />
                )}
              </button>
              <ThemeToggleButton />
            </div>
          </div>
        </div>
      </header>
    );
  }
);
