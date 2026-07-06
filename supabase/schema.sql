-- ============================================================
-- Àṣà Archive · Supabase schema
-- Postgres + pgvector foundation for semantic collection search
-- Run this in the Supabase SQL editor (Dashboard → SQL → New query)
-- ============================================================

-- 1. Enable pgvector
create extension if not exists vector;

-- 2. Artifacts — the core table. One row per garment / artwork / object.
create table if not exists artifacts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- Catalog fields (AI-drafted from images, human-verified)
  title text not null,
  maker text,                        -- designer, artist, atelier, or "Unknown maker"
  origin text,                       -- e.g. "Yoruba, Nigeria" / "Accra, Ghana"
  era text,                          -- e.g. "c. 1970s" / "2021"
  medium text,                       -- e.g. "Hand-dyed adire eleko on cotton"
  category text not null default 'fashion'
    check (category in ('fashion','textile','art','object','photography')),

  -- Provenance: the core interaction of the platform
  provenance_story text,             -- AI-generated narrative, editable
  provenance_verified boolean not null default false,
  acquisition_note text,             -- how it entered the archive

  -- Media
  image_url text,
  image_alt text,

  -- Search
  -- text-embedding-3-small → 1536 dimensions
  embedding vector(1536),

  -- Free-form structured extras (colors, techniques, exhibition history…)
  metadata jsonb not null default '{}'::jsonb
);

-- 3. ANN index for fast cosine search (build after you have some rows)
create index if not exists artifacts_embedding_idx
  on artifacts using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- 4. Semantic search RPC
--    Called from the Next.js API route via supabase.rpc('match_artifacts', …)
create or replace function match_artifacts (
  query_embedding vector(1536),
  match_threshold float default 0.3,
  match_count int default 12
)
returns table (
  id uuid,
  title text,
  maker text,
  origin text,
  era text,
  medium text,
  category text,
  provenance_story text,
  image_url text,
  image_alt text,
  similarity float
)
language sql stable
as $$
  select
    a.id, a.title, a.maker, a.origin, a.era, a.medium, a.category,
    a.provenance_story, a.image_url, a.image_alt,
    1 - (a.embedding <=> query_embedding) as similarity
  from artifacts a
  where a.embedding is not null
    and 1 - (a.embedding <=> query_embedding) > match_threshold
  order by a.embedding <=> query_embedding
  limit match_count;
$$;

-- 5. Row Level Security
alter table artifacts enable row level security;

-- Public read (it's an archive — the collection is meant to be seen)
create policy "Public read access"
  on artifacts for select
  using (true);

-- Writes only via the service role key (server-side API routes)
-- No insert/update/delete policies for anon = anon cannot write.

-- 6. Storage bucket for artifact imagery
-- Create via Dashboard → Storage → New bucket: "artifacts" (public)
-- or with: insert into storage.buckets (id, name, public) values ('artifacts','artifacts', true);
