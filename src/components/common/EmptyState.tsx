import { memo } from "react";

interface EmptyStateProps {
  searchTerm: string;
}

export const EmptyState = memo(({ searchTerm }: EmptyStateProps) => (
  <div className="text-center py-20">
    <div className="text-6xl mb-4">🎬</div>
    <h3 className="text-2xl font-bold text-white mb-2">
      {searchTerm ? "No movies found" : "No movies available"}
    </h3>
    <p className="text-gray-400">
      {searchTerm
        ? "Try adjusting your search or filter criteria"
        : "Check back later for new releases"}
    </p>
    {searchTerm && (
      <p className="text-gray-500 mt-2">
        Searching for: "
        <span className="text-purple-400 font-semibold">{searchTerm}</span>"
      </p>
    )}
  </div>
));
