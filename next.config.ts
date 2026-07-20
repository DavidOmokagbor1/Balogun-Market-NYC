import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Supabase Storage — public bucket for artifact imagery
      { protocol: "https", hostname: "**.supabase.co" },
      // Seed / design-reference imagery (Unsplash)
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
};

export default nextConfig;
