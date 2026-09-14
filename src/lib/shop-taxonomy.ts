import type { ShopifyProduct } from "@/types/shopify";

export type ShopFilters = {
  house?: string;
  category?: string;
  occasion?: string;
  edit?: string;
};

export type ShopLane = {
  slug: string;
  label: string;
  forthcoming?: boolean;
  keywords: string[];
};

export const SHOP_HOUSES: ShopLane[] = [
  {
    slug: "ywandelag",
    label: "Y'WANDELAG",
    keywords: ["y'wandelag", "ywandelag", "ywande", "wande", "lagundoye"],
  },
  {
    slug: "mokhueleigbe",
    label: "Mokhueleigbe",
    keywords: ["mokhueleigbe", "okhueleigbe", "3&4"],
  },
];

export function houseSlugFromText(text?: string | null): string | undefined {
  if (!text?.trim()) return undefined;
  const hay = text.toLowerCase();
  return SHOP_HOUSES.find((house) =>
    house.keywords.some((keyword) => hay.includes(keyword))
  )?.slug;
}

const SCARVES_KEYWORDS = [
  "scarf",
  "scarves",
  "textile",
  "textiles",
  "cloth",
  "gele",
  "aso oke",
];
const ACCESSORY_KEYWORDS = ["accessory", "accessories", "bag", "belt"];
const JEWELRY_KEYWORDS = ["jewelry", "jewellery", "necklace", "earring"];

export const SHOP_CATEGORIES: ShopLane[] = [
  {
    slug: "ready-to-wear",
    label: "Ready-to-Wear",
    keywords: ["ready-to-wear", "ready to wear", "rtw", "zubi", "zare", "eko muse"],
  },
  {
    slug: "occasionwear",
    label: "Occasionwear",
    keywords: ["occasionwear", "occasion", "bridal", "haute", "elan", "élan", "oath"],
  },
  {
    slug: "scarves-textiles",
    label: "Scarves & Textiles",
    keywords: SCARVES_KEYWORDS,
  },
  {
    slug: "accessories",
    label: "Accessories",
    forthcoming: true,
    keywords: ACCESSORY_KEYWORDS,
  },
  {
    slug: "jewelry",
    label: "Jewelry",
    forthcoming: true,
    keywords: JEWELRY_KEYWORDS,
  },
];

export const SHOP_OCCASIONS: ShopLane[] = [
  {
    slug: "everyday",
    label: "Everyday",
    keywords: ["everyday", "daywear", "daily", "zubi", "zare"],
  },
  {
    slug: "evening",
    label: "Evening",
    keywords: ["evening", "night", "gala", "haute", "elan", "élan"],
  },
  {
    slug: "bridal",
    label: "Bridal",
    keywords: ["bridal", "bride", "wedding", "oath"],
  },
  {
    slug: "fashion-week",
    label: "Fashion Week",
    keywords: ["fashion week", "lfw", "runway"],
  },
];

export const SHOP_EDITS: ShopLane[] = [
  { slug: "first-look", label: "The First Look", keywords: [] },
  {
    slug: "lfw-2025",
    label: "Lagos Fashion Week 2025",
    keywords: ["fashion week", "lfw", "runway", "2025"],
  },
  { slug: "new-in", label: "New In", keywords: [] },
];

export const SHOP_FEATURED = {
  eyebrow: "The First Look",
  title: "Y'WANDELAG at Lagos Fashion Week",
  credit: "Founding house · 2025 runway",
  href: "/shop?edit=first-look",
  img: "/designers/ywande-lfw2025-26.jpg",
};

const FILTER_KEYS = ["house", "category", "occasion", "edit"] as const;

function haystack(product: ShopifyProduct): string {
  return [
    product.vendor,
    product.productType,
    product.title,
    product.description,
    ...product.tags,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function hasKeyword(hay: string, keywords: string[]): boolean {
  return keywords.some((keyword) => hay.includes(keyword));
}

function laneBySlug(lanes: ShopLane[], slug?: string): ShopLane | undefined {
  return slug ? lanes.find((lane) => lane.slug === slug) : undefined;
}

export function matchesHouse(product: ShopifyProduct, slug: string): boolean {
  const house = laneBySlug(SHOP_HOUSES, slug);
  return house ? hasKeyword(haystack(product), house.keywords) : false;
}

export function matchesCategory(product: ShopifyProduct, slug: string): boolean {
  const category = laneBySlug(SHOP_CATEGORIES, slug);
  if (!category) return false;

  const hay = haystack(product);
  if (hasKeyword(hay, category.keywords)) return true;

  const isSpecialty =
    hasKeyword(hay, SCARVES_KEYWORDS) ||
    hasKeyword(hay, ACCESSORY_KEYWORDS) ||
    hasKeyword(hay, JEWELRY_KEYWORDS);

  if (isSpecialty) return false;
  if (slug === "ready-to-wear") return matchesHouse(product, "ywandelag");
  if (slug === "occasionwear") return matchesHouse(product, "mokhueleigbe");
  return false;
}

export function matchesOccasion(product: ShopifyProduct, slug: string): boolean {
  const occasion = laneBySlug(SHOP_OCCASIONS, slug);
  if (!occasion) return false;

  const hay = haystack(product);
  if (hasKeyword(hay, occasion.keywords)) return true;

  if (slug === "everyday") {
    const dressed =
      hasKeyword(hay, ["evening", "night", "gala", "bridal", "wedding", "lfw", "runway"]);
    return !dressed && matchesCategory(product, "ready-to-wear");
  }

  return false;
}

export function matchesEdit(product: ShopifyProduct, slug: string): boolean {
  if (slug === "new-in") return true;
  if (slug === "first-look") return matchesHouse(product, "ywandelag");

  const edit = laneBySlug(SHOP_EDITS, slug);
  return edit ? hasKeyword(haystack(product), edit.keywords) : false;
}

export function filterProducts(
  products: ShopifyProduct[],
  filters: ShopFilters
): ShopifyProduct[] {
  return products.filter((product) => {
    if (filters.house && !matchesHouse(product, filters.house)) return false;
    if (filters.category && !matchesCategory(product, filters.category)) return false;
    if (filters.occasion && !matchesOccasion(product, filters.occasion)) return false;
    if (filters.edit && !matchesEdit(product, filters.edit)) return false;
    return true;
  });
}

function readParam(
  value: string | string[] | undefined
): string | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  const trimmed = raw?.trim();
  return trimmed || undefined;
}

export function parseShopFilters(
  searchParams: Record<string, string | string[] | undefined>
): ShopFilters {
  const house = readParam(searchParams.house);
  const category = readParam(searchParams.category);
  const occasion = readParam(searchParams.occasion);
  const edit = readParam(searchParams.edit);

  return {
    house: laneBySlug(SHOP_HOUSES, house)?.slug,
    category: laneBySlug(SHOP_CATEGORIES, category)?.slug,
    occasion: laneBySlug(SHOP_OCCASIONS, occasion)?.slug,
    edit: laneBySlug(SHOP_EDITS, edit)?.slug,
  };
}

export function shopHref(filters: ShopFilters = {}): string {
  const params = new URLSearchParams();
  for (const key of FILTER_KEYS) {
    const value = filters[key];
    if (value) params.set(key, value);
  }
  const query = params.toString();
  return query ? `/shop?${query}` : "/shop";
}

export function toggleShopFilter(
  current: ShopFilters,
  key: keyof ShopFilters,
  value: string
): ShopFilters {
  const next = { ...current };
  if (next[key] === value) delete next[key];
  else next[key] = value;
  return next;
}

export function hasActiveFilters(filters: ShopFilters): boolean {
  return FILTER_KEYS.some((key) => Boolean(filters[key]));
}

export function shopCopy(filters: ShopFilters): {
  eyebrow: string;
  title: string;
  body: string;
} {
  const house = laneBySlug(SHOP_HOUSES, filters.house);
  const category = laneBySlug(SHOP_CATEGORIES, filters.category);
  const occasion = laneBySlug(SHOP_OCCASIONS, filters.occasion);
  const edit = laneBySlug(SHOP_EDITS, filters.edit);

  if (edit?.slug === "first-look") {
    return {
      eyebrow: "The First Look",
      title: "Y'WANDELAG.",
      body: "The founding house — heritage embroidery on the Lagos Fashion Week runway, shown first in New York.",
    };
  }

  if (edit?.slug === "lfw-2025") {
    return {
      eyebrow: "Lagos Fashion Week",
      title: "The 2025 runway.",
      body: "Looks from the houses on the Lagos Fashion Week 2025 runway.",
    };
  }

  if (edit?.slug === "new-in") {
    return {
      eyebrow: "New In",
      title: "Just published.",
      body: "The newest pieces from the roster, as each house releases them.",
    };
  }

  if (house && occasion) {
    return {
      eyebrow: house.label,
      title: `${occasion.label}.`,
      body: `${occasion.label} from ${house.label} — Lagos-made, shown in New York.`,
    };
  }

  if (house && category) {
    return {
      eyebrow: house.label,
      title: `${category.label}.`,
      body: `${category.label} from ${house.label} — selected for tailoring, textile, and artisanal excellence.`,
    };
  }

  if (house) {
    return {
      eyebrow: "The House",
      title: `${house.label}.`,
      body: `Pieces from ${house.label} — Lagos-made, shown first in New York.`,
    };
  }

  if (occasion) {
    return {
      eyebrow: "Shop by Occasion",
      title: `${occasion.label}.`,
      body: `${occasion.label} from the roster — ready when the moment is.`,
    };
  }

  if (category) {
    return {
      eyebrow: "Shop by Category",
      title: `${category.label}.`,
      body: `${category.label} from houses selected for craft.`,
    };
  }

  return {
    eyebrow: "Shop the Show",
    title: "The Collection.",
    body: "Pieces from Y'WANDELAG and Mokhueleigbe — Lagos-made, shown in New York.",
  };
}
