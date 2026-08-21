export type JournalCategory = "Season" | "Pop-up" | "House" | "Brief";

export interface JournalArticle {
  slug: string;
  category: JournalCategory;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  img: string;
  featured: boolean;
  body: string[];
}

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    slug: "first-look-founding-houses",
    category: "Season",
    title: "The First Look at the Founding Houses",
    excerpt:
      "Y'WANDELAG and Mokhueleigbe open Balogun Market NYC — Lagos-made collections, shown first in New York. What is live now, and what arrives as each house publishes.",
    date: "August 2026",
    readTime: "4 min",
    img: "/designers/ywande-featured.jpg",
    featured: true,
    body: [
      "Balogun Market NYC opens with two houses, not a catalogue of dozens. The roster is the product: designers selected for tailoring, textile, and artisanal excellence, given a world-class platform to be discovered, celebrated, and purchased — starting in New York City.",
      "Y'WANDELAG, founded in Lagos by Fatima Wande Lagundoye, brings heritage embroidery — Zubi, Tinko, and tie-dye — onto minimal, locally made silhouettes. Mokhueleigbe, Margaret Okhueleigbe's house in Lekki, arrives with bridal, haute, and ready-to-wear: heritage cut, modern silhouette.",
      "Pieces appear in the shop as each house publishes. There is no invented drop calendar here. When a new collection is ready, it will be dated on this Journal first — season, house, and what to expect — then it will be shoppable.",
      "This is the beginning of a new fashion chapter. Return here for what is coming next.",
    ],
  },
  {
    slug: "new-york-first-chapter",
    category: "Pop-up",
    title: "New York, the First Chapter",
    excerpt:
      "Physical locations, global pop-ups, and a cultural footprint built to stand beside Dover Street Market, Browns, and The Folklore — beginning in NYC.",
    date: "August 2026",
    readTime: "3 min",
    img: "/designers/mokhueleigbe-featured.jpg",
    featured: false,
    body: [
      "The long-term vision is a multi-brand luxury retailer championing African designers, with physical locations, global pop-ups, and a cultural footprint that rivals the world's most considered fashion destinations.",
      "New York is the first chapter, not the whole map. Fashion Week, stylists, editors, and the diaspora consumer are the first audience. Activations will be announced here with a place and a date — never as a rumour.",
      "Until a pop-up is dated, this page is the holding room: the houses, the collection, and the invitation to partners, press, and collaborators shaping African luxury in the city.",
    ],
  },
  {
    slug: "ywande-lag-studio-lagos",
    category: "House",
    title: "Y'WANDELAG: Heritage Embroidery, Minimal Line",
    excerpt:
      "Fatima Wande Lagundoye's Lagos studio — Zubi, Tinko, and tie-dye on locally made silhouettes, including the 2024 Lagos Fashion Week runway.",
    date: "August 2026",
    readTime: "3 min",
    img: "/designers/ywande-shop.jpg",
    featured: false,
    body: [
      "Y'WANDELAG was founded in June 2021 in Lagos by Fatima Wande Lagundoye. The house is ready-to-wear with a clear signature: heritage embroidery — Zubi, Tinko, and tie-dye — set on minimal, locally made silhouettes.",
      "The Zubi Collection, Zare Collection, and the Lagos Fashion Week 2024 runway are the lines to know now. African craft, approached with intention and innovation, is the through-line.",
      "Shop live pieces under Shop the Show. Next-season work from the studio will be posted in this lane before it is merchandised.",
    ],
  },
  {
    slug: "mokhueleigbe-oath-and-elan",
    category: "House",
    title: "Mokhueleigbe: Oath & Bloom, Élan, Eko Muse",
    excerpt:
      "Margaret Okhueleigbe's Lekki house — bridal, haute, and ready-to-wear after the 2025 rebrand from 3&4 Fashion.",
    date: "August 2026",
    readTime: "3 min",
    img: "/designers/mokhueleigbe-portrait.jpg",
    featured: false,
    body: [
      "Mokhueleigbe began in 2018 in Lagos as 3&4 Fashion and rebranded in 2025. Margaret Okhueleigbe works from Lekki: bridal, haute, and ready-to-wear, heritage cut with a modern silhouette.",
      "Oath & Bloom is the bridal line. Élan is haute. Eko Muse is ready-to-wear. The rebrand marks a new era for the studio while the house continues to deliver elegance and innovation in Nigerian fashion.",
      "Occasionwear from Mokhueleigbe will land in the shop as inventory is published. Watch this Journal for the next collection date.",
    ],
  },
  {
    slug: "african-luxury-in-focus",
    category: "Brief",
    title: "African Luxury, in Focus",
    excerpt:
      "Why Balogun Market NYC leads with cultural authority and craft — not a trend report, and not an archive of objects.",
    date: "August 2026",
    readTime: "3 min",
    img: "/designers/ywande-featured.jpg",
    featured: false,
    body: [
      "The brief is fashion only. Balogun Market NYC exists to elevate African luxury by giving designers a world-class platform — honoring heritage through curation and storytelling, selecting houses for craft, and connecting them to U.S. consumers, stylists, and editors.",
      "This Journal will carry short notes on African top-tier fashion as it relates to the roster: a runway, a textile, a house we carry or are preparing to. It will not become a general culture magazine, and it will not invent news.",
      "If you are a house with a next-season collection, or press covering African luxury in New York, this is the page to watch — and the contact page to write.",
    ],
  },
];

export const JOURNAL_CATEGORIES = [
  "All",
  "Season",
  "Pop-up",
  "House",
  "Brief",
] as const;

export function getJournalArticle(slug: string): JournalArticle | undefined {
  return JOURNAL_ARTICLES.find((article) => article.slug === slug);
}
