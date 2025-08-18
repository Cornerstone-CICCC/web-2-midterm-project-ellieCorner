import { memo } from "react";

export const Loading = memo(() => (
  <div
    className="min-h-screen flex items-center justify-center overflow-hidden 
                  bg-white dark:bg-slate-900"
  >
    <div className="flex flex-col items-center space-y-6">
      <div className="text-4xl sm:text-5xl animate-bounce">🎬</div>

      <p className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
        Movie site
      </p>

      <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg animate-pulse">
        Exploring the universe of movies...
      </p>

      <div className="w-48 sm:w-64 h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 animate-progress" />
      </div>
    </div>
  </div>
));
