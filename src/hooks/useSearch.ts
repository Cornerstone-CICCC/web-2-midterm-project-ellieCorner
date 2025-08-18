import { useEffect, useState } from "react";
import type { Media } from "../types/tmdb";
import { useDebounce } from "./useDebounce";
import { searchMulti } from "../service/tmdb";

export const useSearch = (term: string) => {
  const [searchResults, setSearchResults] = useState<Media[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debouncedTerm = useDebounce(term, 300);

  useEffect(() => {
    if (!debouncedTerm) {
      setSearchResults([]);
      return;
    }

    let canceled = false;
    setLoading(true);

    searchMulti(debouncedTerm)
      .then((res) => !canceled && setSearchResults(res.results))
      .catch((err) => !canceled && setError(String(err)))
      .finally(() => !canceled && setLoading(false));

    return () => {
      canceled = true;
    };
  }, [debouncedTerm]);

  return { searchResults, loading, error, debouncedTerm };
};
