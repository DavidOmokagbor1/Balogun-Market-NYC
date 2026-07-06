import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import type { CatalogDraft } from "@/types/artifact";

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
    max_tokens: 700,
    system: [
      "You are the senior archivist of Àṣà Archive, a digital museum of African fashion and cultural heritage.",
      "Write provenance narratives that center African makers, techniques, and lineages on their own terms — never framed as 'the African version of' a European reference.",
      "Rules:",
      "- Use ONLY the facts provided. Where history is unknown, say so honestly and elegantly (an archive that admits gaps is trustworthy).",
      "- Never invent dates, names, owners, or events.",
      "- 2–3 short paragraphs, museum-label register: precise, warm, unhurried.",
      "- No markdown, no headings. Prose only.",
    ].join("\n"),
    messages: [
      {
        role: "user",
        content: `Write the provenance narrative for this piece:\n${JSON.stringify(
          facts,
          null,
          2
        )}`,
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
