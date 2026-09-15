export type HouseLook = {
  title: string;
  note: string;
  img: string;
};

export type HouseSlug = "ywandelag" | "mokhueleigbe";

export type CampaignSlide = {
  kind: "image" | "video";
  src: string;
  poster?: string;
  alt: string;
  house: string;
  houseSlug: HouseSlug;
  line: string;
};

export type House = {
  slug: HouseSlug;
  name: string;
  country: string;
  category: string;
  city: string;
  founded: string;
  signature: string;
  collections: string[];
  img: string;
  featured: string;
  quote: string;
  looks: HouseLook[];
  films?: CampaignSlide[];
};

const YWANDE = {
  house: "Y'WANDELAG",
  houseSlug: "ywandelag" as const,
  line: "Lagos Fashion Week 2025 — heritage embroidery, shown first in New York.",
};

const MOKH = {
  house: "Mokhueleigbe",
  houseSlug: "mokhueleigbe" as const,
  line: "Élan and Oath & Bloom — Lekki-made haute and bridal, shown in New York.",
};

export const FOUNDING_HERO: CampaignSlide[] = [
  {
    kind: "video",
    src: "/designers/ywande-lfw2025-reel.mp4",
    poster: "/designers/ywande-lfw2025-26.jpg",
    alt: "Y'WANDELAG at Lagos Fashion Week 2025 — the film",
    ...YWANDE,
  },
  {
    kind: "image",
    src: "/designers/mokhueleigbe-portrait.jpg",
    alt: "Mokhueleigbe — Élan, the 2025 haute collection",
    ...MOKH,
  },
  {
    kind: "image",
    src: "/designers/ywande-lfw2025-26.jpg",
    alt: "Y'WANDELAG — heritage embroidery, LFW 2025",
    ...YWANDE,
  },
  {
    kind: "image",
    src: "/designers/mokhueleigbe-elan-02.jpg",
    alt: "Mokhueleigbe — Élan mermaid train",
    ...MOKH,
  },
  {
    kind: "image",
    src: "/designers/ywande-lfw2025-02.jpg",
    alt: "Y'WANDELAG — fringe caftan, LFW 2025",
    ...YWANDE,
  },
  {
    kind: "image",
    src: "/designers/mokhueleigbe-featured.jpg",
    alt: "Mokhueleigbe — Oath & Bloom bridal",
    ...MOKH,
  },
  {
    kind: "image",
    src: "/designers/ywande-lfw2025-11.jpg",
    alt: "Y'WANDELAG — chartreuse column, LFW 2025",
    ...YWANDE,
  },
  {
    kind: "image",
    src: "/designers/mokhueleigbe-elan-03.jpg",
    alt: "Mokhueleigbe — Élan, front",
    ...MOKH,
  },
  {
    kind: "image",
    src: "/designers/ywande-lfw2025-20.jpg",
    alt: "Y'WANDELAG — vermillion look, LFW 2025",
    ...YWANDE,
  },
  {
    kind: "image",
    src: "/designers/mokhueleigbe-bridal-01.jpg",
    alt: "Mokhueleigbe — Oath & Bloom, veil",
    ...MOKH,
  },
  {
    kind: "image",
    src: "/designers/ywande-lfw2025-08.jpg",
    alt: "Y'WANDELAG — cutwork dress, LFW 2025",
    ...YWANDE,
  },
  {
    kind: "image",
    src: "/designers/mokhueleigbe-bridal-02.jpg",
    alt: "Mokhueleigbe — Oath & Bloom, standing",
    ...MOKH,
  },
];

const YWANDE_LOOKS: HouseLook[] = [
  { title: "Look 01", note: "LFW 2025", img: "/designers/ywande-lfw2025-01.jpg" },
  { title: "Look 02", note: "LFW 2025", img: "/designers/ywande-lfw2025-02.jpg" },
  { title: "Look 03", note: "LFW 2025", img: "/designers/ywande-lfw2025-03.jpg" },
  { title: "Look 04", note: "LFW 2025", img: "/designers/ywande-lfw2025-04.jpg" },
  { title: "Look 05", note: "LFW 2025", img: "/designers/ywande-lfw2025-05.jpg" },
  { title: "Look 06", note: "LFW 2025", img: "/designers/ywande-lfw2025-06.jpg" },
  { title: "Look 08", note: "LFW 2025", img: "/designers/ywande-lfw2025-08.jpg" },
  { title: "Look 09", note: "LFW 2025", img: "/designers/ywande-lfw2025-09.jpg" },
  { title: "Look 11", note: "LFW 2025", img: "/designers/ywande-lfw2025-11.jpg" },
  { title: "Look 14", note: "LFW 2025", img: "/designers/ywande-lfw2025-14.jpg" },
  { title: "Look 16", note: "LFW 2025", img: "/designers/ywande-lfw2025-16.jpg" },
  { title: "Look 17", note: "LFW 2025", img: "/designers/ywande-lfw2025-17.jpg" },
  { title: "Look 19", note: "LFW 2025", img: "/designers/ywande-lfw2025-19.jpg" },
  { title: "Look 20", note: "LFW 2025", img: "/designers/ywande-lfw2025-20.jpg" },
  { title: "Look 23", note: "LFW 2025", img: "/designers/ywande-lfw2025-23.jpg" },
  { title: "Look 24", note: "LFW 2025", img: "/designers/ywande-lfw2025-24.jpg" },
  { title: "Look 26", note: "The runway", img: "/designers/ywande-lfw2025-26.jpg" },
  { title: "Look 28", note: "LFW 2025", img: "/designers/ywande-lfw2025-28.jpg" },
  { title: "Look 30", note: "LFW 2025", img: "/designers/ywande-lfw2025-30.jpg" },
  { title: "Look 31", note: "LFW 2025", img: "/designers/ywande-lfw2025-31.jpg" },
  { title: "Look 32", note: "LFW 2025", img: "/designers/ywande-lfw2025-32.jpg" },
  { title: "Look 33", note: "LFW 2025", img: "/designers/ywande-lfw2025-33.jpg" },
  { title: "Look 34", note: "LFW 2025", img: "/designers/ywande-lfw2025-34.jpg" },
  { title: "Zare", note: "Studio, Lagos", img: "/designers/ywande-studio.jpg" },
];

export const HOUSES: House[] = [
  {
    slug: "ywandelag",
    name: "Y'WANDELAG",
    country: "Nigeria",
    category: "Ready-to-Wear",
    city: "Lagos",
    founded: "June 2021, Lagos · Fatima Wande Lagundoye",
    signature:
      "Heritage embroidery — Zubi, Tinko, and tie-dye — on minimal, locally made silhouettes",
    collections: ["The Zubi Collection", "Zare Collection", "Lagos Fashion Week 2025"],
    img: "/designers/ywande-lfw2025-24.jpg",
    featured: "/designers/ywande-lfw2025-26.jpg",
    quote:
      "African craft holds endless possibilities when approached with intention and innovation.",
    looks: YWANDE_LOOKS,
    films: [
      {
        kind: "video",
        src: "/designers/ywande-lfw2025-reel.mp4",
        poster: "/designers/ywande-lfw2025-26.jpg",
        alt: "Y'WANDELAG at Lagos Fashion Week 2025",
      },
      {
        kind: "video",
        src: "https://www.ywande.com/cdn/shop/videos/c/vp/bafd77291c73442586ee45bc8a9a4da4/bafd77291c73442586ee45bc8a9a4da4.HD-1080p-7.2Mbps-65427129.mp4",
        poster: "/designers/ywande-lfw2025-02.jpg",
        alt: "Y'WANDELAG — Lagos Fashion Week 2025, the show",
      },
    ],
  },
  {
    slug: "mokhueleigbe",
    name: "Mokhueleigbe",
    country: "Nigeria",
    category: "Occasionwear",
    city: "Lekki",
    founded: "2018, Lagos · Margaret Okhueleigbe — as 3&4 Fashion; rebranded 2025",
    signature:
      "Bridal, haute, and ready-to-wear from Lekki — heritage cut with a modern silhouette",
    collections: ["Oath & Bloom — Bridal", "Élan — Haute", "Eko Muse — Ready-to-Wear"],
    img: "/designers/mokhueleigbe-portrait.jpg",
    featured: "/designers/mokhueleigbe-featured.jpg",
    quote:
      "This successful rebrand and collection marks a new era for Mokhueleigbe Studios as it steps into a fresh identity while continuing to deliver elegance and innovation in Nigerian fashion.",
    looks: [
      {
        title: "Élan",
        note: "Haute — the 2025 rebrand",
        img: "/designers/mokhueleigbe-portrait.jpg",
      },
      {
        title: "Élan — the train",
        note: "Haute",
        img: "/designers/mokhueleigbe-elan-02.jpg",
      },
      {
        title: "Élan — front",
        note: "Haute",
        img: "/designers/mokhueleigbe-elan-03.jpg",
      },
      {
        title: "Élan — the arch",
        note: "Haute",
        img: "/designers/mokhueleigbe-rebrand-01.jpg",
      },
      {
        title: "Oath & Bloom",
        note: "Bridal",
        img: "/designers/mokhueleigbe-featured.jpg",
      },
      {
        title: "Oath & Bloom — standing",
        note: "Bridal",
        img: "/designers/mokhueleigbe-bridal-02.jpg",
      },
      {
        title: "Oath & Bloom — veil",
        note: "Bridal",
        img: "/designers/mokhueleigbe-bridal-01.jpg",
      },
    ],
  },
];

export function getHouse(slug: string): House | undefined {
  return HOUSES.find((house) => house.slug === slug);
}

export function houseHref(slug: string): string {
  return `/houses/${slug}`;
}
