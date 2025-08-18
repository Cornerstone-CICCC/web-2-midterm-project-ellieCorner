import React from "react";
import type { SortKey } from "../types/tmdb";

interface SortOptionsProps {
  sortBy: SortKey;
  onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SortOptions = ({ sortBy, onSortChange }: SortOptionsProps) => {
  return (
    <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
      <span>Sort by:</span>
      <select
        value={sortBy}
        onChange={onSortChange}
        className="bg-white/80 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-1 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
      >
        <option value="popularity">Popularity</option>
        <option value="release_date">Release Date</option>
        <option value="vote_average">Rating</option>
        <option value="title">Title</option>
      </select>
    </div>
  );
};
