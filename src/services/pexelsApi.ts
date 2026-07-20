const API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY as string | undefined;
const PHOTOS_BASE = "https://api.pexels.com/v1";
const VIDEOS_BASE = "https://api.pexels.com/videos";

export interface PexelsPhoto {
  id: number;
  url: string;       // large2x
  thumb: string;     // medium
  photographer: string;
  alt: string;
}

export interface PexelsVideo {
  id: number;
  thumbnail: string;
  videoUrl: string;  // best quality MP4
  photographer: string;
  width: number;
  height: number;
}

async function pexelsFetch(url: string): Promise<Response> {
  if (!API_KEY) throw new Error("NEXT_PUBLIC_PEXELS_API_KEY is not set");
  return fetch(url, { headers: { Authorization: API_KEY } });
}

export async function searchPhotos(
  query: string,
  perPage = 12,
): Promise<PexelsPhoto[]> {
  try {
    const res = await pexelsFetch(
      `${PHOTOS_BASE}/search?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=portrait`,
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.photos ?? []).map((p: any): PexelsPhoto => ({
      id: p.id,
      url: p.src.large2x || p.src.large,
      thumb: p.src.medium,
      photographer: p.photographer,
      alt: p.alt || query,
    }));
  } catch {
    return [];
  }
}

export async function searchVideos(
  query: string,
  perPage = 6,
): Promise<PexelsVideo[]> {
  try {
    const res = await pexelsFetch(
      `${VIDEOS_BASE}/search?query=${encodeURIComponent(query)}&per_page=${perPage}`,
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.videos ?? []).map((v: any): PexelsVideo => {
      // Pick highest quality file that is an MP4
      const files: any[] = v.video_files ?? [];
      const mp4s = files.filter((f) => f.file_type === "video/mp4");
      const best =
        mp4s.sort((a, b) => (b.width ?? 0) - (a.width ?? 0))[0] ?? mp4s[0] ?? files[0];
      return {
        id: v.id,
        thumbnail: v.image,
        videoUrl: best?.link ?? "",
        photographer: v.user?.name ?? "",
        width: best?.width ?? 1280,
        height: best?.height ?? 720,
      };
    });
  } catch {
    return [];
  }
}
