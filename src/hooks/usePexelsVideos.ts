import { useEffect, useState } from "react";
import { searchVideos, type PexelsVideo } from "../services/pexelsApi";

export function usePexelsVideos(query: string, perPage = 6) {
  const [videos, setVideos] = useState<PexelsVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    searchVideos(query, perPage).then((results) => {
      if (!cancelled) {
        setVideos(results);
        setLoading(false);
        if (results.length === 0) setError("No results");
      }
    });
    return () => { cancelled = true; };
  }, [query, perPage]);

  return { videos, loading, error };
}
