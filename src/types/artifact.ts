export type ArtifactCategory =
  | "fashion"
  | "textile"
  | "art"
  | "object"
  | "photography";

export interface Artifact {
  id: string;
  created_at: string;
  title: string;
  maker: string | null;
  origin: string | null;
  era: string | null;
  medium: string | null;
  category: ArtifactCategory;
  provenance_story: string | null;
  provenance_verified: boolean;
  acquisition_note: string | null;
  image_url: string | null;
  image_alt: string | null;
  metadata: Record<string, unknown>;
}

/** Shape returned by the match_artifacts RPC (semantic search). */
export interface ArtifactMatch
  extends Pick<
    Artifact,
    | "id"
    | "title"
    | "maker"
    | "origin"
    | "era"
    | "medium"
    | "category"
    | "provenance_story"
    | "image_url"
    | "image_alt"
  > {
  similarity: number;
}

/** Draft catalog entry produced by Claude from an image. */
export interface CatalogDraft {
  title: string;
  maker: string | null;
  origin: string | null;
  era: string | null;
  medium: string | null;
  category: ArtifactCategory;
  description: string;
  confidence_notes: string;
}
