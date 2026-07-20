import { useEffect, useState } from "react";
import { searchPhotos, type PexelsPhoto } from "../services/pexelsApi";

export function usePexelsPhotos(query: string, perPage = 12) {
  const [photos, setPhotos] = useState<PexelsPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    searchPhotos(query, perPage).then((results) => {
      if (!cancelled) {
        setPhotos(results);
        setLoading(false);
        if (results.length === 0) setError("No results");
      }
    });
    return () => { cancelled = true; };
  }, [query, perPage]);

  return { photos, loading, error };
}
