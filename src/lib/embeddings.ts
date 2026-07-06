import OpenAI from "openai";
import type { Artifact } from "@/types/artifact";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/** 1536-dim model — matches vector(1536) in supabase/schema.sql */
const EMBEDDING_MODEL = "text-embedding-3-small";

export async function embed(text: string): Promise<number[]> {
  const res = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: text.slice(0, 8000),
  });
  return res.data[0].embedding;
}

/**
 * Builds the text we embed for an artifact.
 * Concatenating catalog fields + provenance gives the search
 * both literal matches ("kente") and conceptual ones
 * ("cloth worn for ceremonies of status").
 */
export function artifactToEmbeddingText(
  a: Pick<
    Artifact,
    | "title"
    | "maker"
    | "origin"
    | "era"
    | "medium"
    | "category"
    | "provenance_story"
  >
): string {
  return [
    a.title,
    a.maker,
    a.origin,
    a.era,
    a.medium,
    a.category,
    a.provenance_story,
  ]
    .filter(Boolean)
    .join(" · ");
}
