import type { ShopifyProductVariant } from "@/types/shopify";

export const FITTING_STORAGE_KEY = "balogun-fitting-profile";

export type HouseFitId = "ywandelag" | "mokhueleigbe";

export type FittingProfile = {
  bust?: number;
  waist?: number;
  hip?: number;
  height?: number;
  usualUsSize?: string;
};

export type SizeSuggestion = {
  house: HouseFitId;
  houseLabel: string;
  label: string;
  note: string;
  source: "measurements" | "usual-size";
};

type ChartRow = {
  label: string;
  bust: number;
  waist: number;
  hip: number;
};

const US_SIZES = ["0", "2", "4", "6", "8", "10", "12", "14", "16"] as const;

export const FITTING_US_SIZES = [...US_SIZES];

const HOUSE_META: Record<
  HouseFitId,
  {
    label: string;
    cut: string;
    sizeUpIfClose: boolean;
    chart: ChartRow[];
    fromUs: Record<string, string>;
  }
> = {
  ywandelag: {
    label: "Y'WANDELAG",
    cut: "A clean, locally made line — closer to a true ready-to-wear fit.",
    sizeUpIfClose: false,
    chart: [
      { label: "XS", bust: 32.5, waist: 25, hip: 35.5 },
      { label: "S", bust: 34.5, waist: 27, hip: 37.5 },
      { label: "M", bust: 36.5, waist: 29, hip: 39.5 },
      { label: "L", bust: 39, waist: 32, hip: 42 },
      { label: "XL", bust: 42, waist: 35, hip: 45 },
    ],
    fromUs: {
      "0": "XS",
      "2": "XS",
      "4": "S",
      "6": "S",
      "8": "M",
      "10": "M",
      "12": "L",
      "14": "L",
      "16": "XL",
    },
  },
  mokhueleigbe: {
    label: "Mokhueleigbe",
    cut: "Structured occasionwear — if you are between sizes, take the larger.",
    sizeUpIfClose: true,
    chart: [
      { label: "2", bust: 33, waist: 25.5, hip: 36 },
      { label: "4", bust: 34, waist: 26.5, hip: 37 },
      { label: "6", bust: 35, waist: 27.5, hip: 38 },
      { label: "8", bust: 36.5, waist: 29, hip: 39.5 },
      { label: "10", bust: 38, waist: 30.5, hip: 41 },
      { label: "12", bust: 40, waist: 32.5, hip: 43 },
      { label: "14", bust: 42, waist: 34.5, hip: 45 },
    ],
    fromUs: {
      "0": "2",
      "2": "4",
      "4": "6",
      "6": "8",
      "8": "10",
      "10": "12",
      "12": "14",
      "14": "14",
      "16": "14",
    },
  },
};

const SIZE_ALIASES: Record<string, string[]> = {
  XS: ["xs", "extra small", "x-small", "xsmall"],
  S: ["s", "small"],
  M: ["m", "medium"],
  L: ["l", "large"],
  XL: ["xl", "extra large", "x-large", "xlarge"],
  "2": ["2", "us 2", "size 2"],
  "4": ["4", "us 4", "size 4"],
  "6": ["6", "us 6", "size 6"],
  "8": ["8", "us 8", "size 8"],
  "10": ["10", "us 10", "size 10"],
  "12": ["12", "us 12", "size 12"],
  "14": ["14", "us 14", "size 14"],
};

export function isHouseFitId(value?: string): value is HouseFitId {
  return value === "ywandelag" || value === "mokhueleigbe";
}

export function hasFittingBasics(profile: FittingProfile | null): boolean {
  if (!profile) return false;
  const measured = [profile.bust, profile.waist, profile.hip].every(
    (value) => typeof value === "number" && value > 0
  );
  return measured || Boolean(profile.usualUsSize);
}

function pickFromChart(
  profile: FittingProfile,
  rows: ChartRow[],
  sizeUpIfClose: boolean
): string | undefined {
  const { bust, waist, hip } = profile;
  if (!bust || !waist || !hip) return undefined;

  const index = rows.findIndex(
    (row) => bust <= row.bust && waist <= row.waist && hip <= row.hip
  );
  if (index === -1) return rows[rows.length - 1]?.label;

  if (sizeUpIfClose && rows[index + 1]) {
    const row = rows[index];
    const close =
      row.bust - bust < 0.75 || row.waist - waist < 0.75 || row.hip - hip < 0.75;
    if (close) return rows[index + 1].label;
  }

  return rows[index].label;
}

export function suggestSize(
  profile: FittingProfile | null,
  house: HouseFitId
): SizeSuggestion | null {
  if (!hasFittingBasics(profile) || !profile) return null;

  const meta = HOUSE_META[house];
  const fromBody = pickFromChart(profile, meta.chart, meta.sizeUpIfClose);

  if (fromBody) {
    return {
      house,
      houseLabel: meta.label,
      label: fromBody,
      source: "measurements",
      note: `${meta.cut} Your measurements suggest a ${fromBody}.`,
    };
  }

  const fromUsual = profile.usualUsSize
    ? meta.fromUs[profile.usualUsSize]
    : undefined;
  if (!fromUsual) return null;

  return {
    house,
    houseLabel: meta.label,
    label: fromUsual,
    source: "usual-size",
    note: `${meta.cut} From your usual US ${profile.usualUsSize}, this house suggests a ${fromUsual}.`,
  };
}

function variantTokens(variant: ShopifyProductVariant): string[] {
  return [variant.title, ...variant.selectedOptions.map((option) => option.value)]
    .join(" ")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

export function isOneSize(variants: ShopifyProductVariant[]): boolean {
  if (variants.length === 0) return false;
  if (variants.length > 1) return false;
  const tokens = variantTokens(variants[0]);
  return (
    tokens.length === 0 ||
    tokens.every((token) =>
      ["default", "title", "os", "onesize", "one"].includes(token)
    )
  );
}

export function findSuggestedVariant(
  variants: ShopifyProductVariant[],
  label: string
): ShopifyProductVariant | undefined {
  const aliases = SIZE_ALIASES[label] ?? [label.toLowerCase()];
  return variants.find((variant) => {
    const tokens = variantTokens(variant);
    const joined = tokens.join(" ");
    return aliases.some(
      (alias) =>
        tokens.includes(alias.replace(/\s+/g, "")) || joined.includes(alias)
    );
  });
}

export function parseFittingProfile(raw: unknown): FittingProfile | null {
  if (!raw || typeof raw !== "object") return null;
  const value = raw as Record<string, unknown>;
  const numberOrUndefined = (input: unknown) => {
    const n = typeof input === "number" ? input : Number(input);
    return Number.isFinite(n) && n > 0 ? n : undefined;
  };

  const usual =
    typeof value.usualUsSize === "string" &&
    US_SIZES.includes(value.usualUsSize as (typeof US_SIZES)[number])
      ? value.usualUsSize
      : undefined;

  const profile: FittingProfile = {
    bust: numberOrUndefined(value.bust),
    waist: numberOrUndefined(value.waist),
    hip: numberOrUndefined(value.hip),
    height: numberOrUndefined(value.height),
    usualUsSize: usual,
  };

  return hasFittingBasics(profile) || profile.height ? profile : null;
}
