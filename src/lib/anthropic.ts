import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import type { ArtifactMatch, CatalogDraft, FashionBrainBrief } from "@/types/artifact";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const MODEL = "claude-sonnet-4-6";

/* ────────────────────────────────────────────────────────────
 * 1. Provenance narration
 *    Takes verified facts about a piece and writes the
 *    provenance story — the core interaction of the archive.
 * ──────────────────────────────────────────────────────────── */

export interface ProvenanceFacts {
  title: string;
  maker?: string | null;
  origin?: string | null;
  era?: string | null;
  medium?: string | null;
  acquisition_note?: string | null;
  known_history?: string; // free-text facts supplied by the archivist
}

export async function generateProvenance(
  facts: ProvenanceFacts
): Promise<string> {
  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 1100,
    system: [
      "You are the senior archivist of Àṣà Archive, a digital museum of African fashion and cultural heritage.",
      "Write provenance narratives that center African makers, techniques, and lineages on their own terms — never framed as 'the African version of' a European reference.",
      "Rules:",
      "- Use ONLY the facts provided. Where history is unknown, say so honestly and elegantly (an archive that admits gaps is trustworthy).",
      "- Never invent dates, names, owners, workshops, exhibition histories, or events.",
      "- You MAY briefly explain a named technique or place that already appears in the facts (e.g. adire eleko, kente, bògòlanfini) in craft terms — do not invent a specific maker or ownership chain to fill space.",
      "- Treat known_history as the primary source. Ignore acquisition_note if it is administrative, a test label, or otherwise not part of the object's cultural record.",
      "- Cover, in order when facts allow: (1) what the object is and where/when it was made; (2) technique and cultural setting named in the facts; (3) custody — who kept or transferred it, how it entered the archive — and what remains unknown.",
      "- 3 short paragraphs, museum-label register: precise, warm, unhurried. Dense with verified detail, not padded.",
      "- No markdown, no headings. Prose only.",
    ].join("\n"),
    messages: [
      {
        role: "user",
        content: `Write the provenance narrative for this piece.\n\nCatalog fields:\n${JSON.stringify(
          {
            title: facts.title,
            maker: facts.maker,
            origin: facts.origin,
            era: facts.era,
            medium: facts.medium,
            acquisition_note: facts.acquisition_note,
          },
          null,
          2
        )}\n\nVerified history from the archivist (authoritative — expand only what is stated here):\n${facts.known_history?.trim() || "(none supplied — state gaps honestly from catalog fields alone)"}`,
      },
    ],
  });

  const block = response.content.find((b) => b.type === "text");
  if (!block || block.type !== "text") {
    throw new Error("No text returned from Claude");
  }
  return block.text.trim();
}

/* ────────────────────────────────────────────────────────────
 * 2. Image → catalog draft
 *    Claude vision drafts a structured catalog entry from a
 *    photograph. Always marked as a draft for human review.
 * ──────────────────────────────────────────────────────────── */

const catalogSchema = z.object({
  title: z.string(),
  maker: z.string().nullable(),
  origin: z.string().nullable(),
  era: z.string().nullable(),
  medium: z.string().nullable(),
  category: z.enum(["fashion", "textile", "art", "object", "photography"]),
  description: z.string(),
  confidence_notes: z.string(),
});

export async function draftCatalogFromImage(
  imageBase64: string,
  mediaType: "image/jpeg" | "image/png" | "image/webp",
  hint?: string
): Promise<CatalogDraft> {
  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 900,
    system: [
      "You are a cataloguer for an archive of African fashion, textiles, and art.",
      "From the photograph, draft a catalog entry. Identify visible techniques (adire resist-dyeing, kente strip-weaving, bògòlanfini mud cloth, aso oke, embroidery styles) only when visually supported.",
      "Be honest about uncertainty: use null for unknowable fields and explain your confidence in confidence_notes.",
      "Respond with ONLY a JSON object — no markdown fences, no preamble — with keys:",
      `title, maker, origin, era, medium, category (one of "fashion"|"textile"|"art"|"object"|"photography"), description, confidence_notes`,
    ].join("\n"),
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: { type: "base64", media_type: mediaType, data: imageBase64 },
          },
          {
            type: "text",
            text: hint
              ? `Draft the catalog entry. Archivist's note: ${hint}`
              : "Draft the catalog entry.",
          },
        ],
      },
    ],
  });

  const block = response.content.find((b) => b.type === "text");
  if (!block || block.type !== "text") {
    throw new Error("No text returned from Claude");
  }

  const clean = block.text.replace(/```json|```/g, "").trim();
  return catalogSchema.parse(JSON.parse(clean));
}

/* ────────────────────────────────────────────────────────────
 * 3. Native AI brain — Discovery
 *    Creative fashion intelligence: thinks, forecasts, and
 *    invents African high-fashion / luxury concepts, grounded
 *    in archive heritage when matches exist.
 * ──────────────────────────────────────────────────────────── */

const fashionBrainSchema = z.object({
  concept_title: z.string(),
  vision: z.string(),
  future_signal: z.string(),
  design_moves: z.array(z.string()).min(3).max(5),
  heritage_lineage: z.string(),
  runway_moment: z.string(),
  mood_words: z.array(z.string()).min(3).max(6),
});

export async function generateFashionBrain(
  prompt: string,
  heritage: Pick<
    ArtifactMatch,
    "title" | "maker" | "origin" | "era" | "medium" | "category"
  >[]
): Promise<FashionBrainBrief> {
  const heritageBlock =
    heritage.length > 0
      ? heritage
          .slice(0, 8)
          .map(
            (h, i) =>
              `${i + 1}. ${h.title} — ${[h.maker, h.origin, h.era, h.medium]
                .filter(Boolean)
                .join(" · ")} [${h.category}]`
          )
          .join("\n")
      : "(No close archive matches — invent freely from continental craft knowledge, but do not invent specific museum object titles as if they are in this archive.)";

  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 2000,
    system: [
      "You are the Native AI Brain of Àṣà Archive — Africa's cultural intelligence for high fashion and big-wave luxury.",
      "Your job is not keyword search. You think, forecast, and invent.",
      "",
      "Mandate:",
      "- Turn the user's desire into a couture / luxury fashion concept rooted in African craft, form, metal, textile, and ritual intelligence.",
      "- Predict a near-future signal: how this aesthetic could move runways, culture, or luxury markets in the next 3–7 years.",
      "- Invent boldly (silhouettes, finishes, materials hybrids, show formats) — this IS creative R&D.",
      "- When archive heritage works are provided, weave them in as lineage anchors. Name only those titles; do not invent fake archive pieces.",
      "- Never frame Africa as a derivative of Europe. Lead with African authorship, futurism, and luxury on its own terms.",
      "- Tone: sharp, cinematic, boardroom-ready — the selling point of the product. No fluff, no emoji, no markdown.",
      "",
      "Deliver the brief by calling the compose_brief tool.",
    ].join("\n"),
    tools: [
      {
        name: "compose_brief",
        description: "Deliver the finished Native AI Brain fashion brief.",
        input_schema: {
          type: "object" as const,
          properties: {
            concept_title: {
              type: "string",
              description: "Short, memorable concept name.",
            },
            vision: {
              type: "string",
              description:
                "Two short paragraphs (separated by a blank line): the idea and why it matters.",
            },
            future_signal: {
              type: "string",
              description:
                "One tight paragraph: trend / market / cultural forecast for the next 3–7 years.",
            },
            design_moves: {
              type: "array",
              items: { type: "string" },
              description:
                "3–5 concrete directives: silhouette, textile, metal/finish, construction, or show craft.",
            },
            heritage_lineage: {
              type: "string",
              description:
                "One paragraph linking named archive works or continental techniques to the concept.",
            },
            runway_moment: {
              type: "string",
              description: "One vivid sentence: the image people remember.",
            },
            mood_words: {
              type: "array",
              items: { type: "string" },
              description: "3–6 single words or short compounds.",
            },
          },
          required: [
            "concept_title",
            "vision",
            "future_signal",
            "design_moves",
            "heritage_lineage",
            "runway_moment",
            "mood_words",
          ],
        },
      },
    ],
    tool_choice: { type: "tool", name: "compose_brief" },
    messages: [
      {
        role: "user",
        content: `User desire:\n"${prompt}"\n\nArchive heritage anchors (ground lineage here when relevant):\n${heritageBlock}\n\nCompose the Native AI Brain brief.`,
      },
    ],
  });

  const toolBlock = response.content.find((b) => b.type === "tool_use");
  if (!toolBlock || toolBlock.type !== "tool_use") {
    throw new Error("No brief returned from Claude");
  }

  return fashionBrainSchema.parse(toolBlock.input);
}
