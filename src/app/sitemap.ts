import type { MetadataRoute } from "next";
import { JOURNAL_ARTICLES } from "@/lib/journal";
import { HOUSES } from "@/lib/houses";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://balogun-market-nyc.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const journal = JOURNAL_ARTICLES.map((article) => article.slug);

  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/shop`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/fitting`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/journal`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${siteUrl}/policies`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    ...HOUSES.map((house) => ({
      url: `${siteUrl}/houses/${house.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...journal.map((slug) => ({
      url: `${siteUrl}/journal/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
