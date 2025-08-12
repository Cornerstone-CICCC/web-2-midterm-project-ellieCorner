import React from "react";
import type { SortKey } from "../types/tmdb";

interface SortOptionsProps {
  sortBy: SortKey;
  onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SortOptions = ({ sortBy, onSortChange }: SortOptionsProps) => {
  return (
    <div className="flex items-center space-x-2 text-gray-400">
      <span>Sort by:</span>
      <select
        value={sortBy}
        onChange={onSortChange}
        className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white text-sm"
      >
        <option value="popularity" className="bg-gray-800">
          Popularity
        </option>
        <option value="release_date" className="bg-gray-800">
          Release Date
        </option>
        <option value="vote_average" className="bg-gray-800">
          Rating
        </option>
        <option value="title" className="bg-gray-800">
          Title
        </option>
      </select>
    </div>
  );
};
