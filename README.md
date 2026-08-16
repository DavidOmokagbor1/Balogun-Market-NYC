# Balogun Market NYC

**African fashion, art, and cultural luxury — connecting heritage, contemporary design, and collectors from New York to the world.**

AI-native from the ground up: semantic search over the collection (RAG on pgvector), provenance narratives written by Claude from verified facts, and image-to-catalog automation using Claude vision.

Balogun Market NYC combines a provenance-first digital archive, Native AI
fashion intelligence, and a Shopify-powered collector marketplace.

## Architecture

```
┌─────────────────────────────────────────────────────┐
│  Next.js 15 (App Router, TypeScript, Tailwind v4)   │
│                                                      │
│  /api/search      query → embedding → pgvector      │
│  /api/provenance  facts → Claude → narrative → save  │
│  /api/catalog     image → Claude vision → draft      │
│  /api/shopify/cart  Shopify cart → hosted checkout   │
└──────────────┬───────────────────────┬───────────────┘
               │                       │
        ┌──────▼──────┐        ┌───────▼────────┐
        │  Supabase   │        │  Anthropic     │
        │  Postgres + │        │  Claude API    │
        │  pgvector + │        │  (generation + │
        │  Storage    │        │   vision)      │
        └─────────────┘        └────────────────┘
                        OpenAI text-embedding-3-small
                        powers the vector space (1536-d)
```

**Design decisions worth noting:**

- **Provenance is generated from verified facts only.** The Claude system prompt forbids invention; unknown history is stated honestly. An archive that admits gaps is an archive you can trust.
- **AI catalogs, humans verify.** Image-to-catalog inserts drafts flagged `provenance_verified: false`. The AI accelerates the archivist; it doesn't replace them.
- **Embeddings refresh when stories change.** Saving a provenance narrative re-embeds the artifact, so semantic search always reflects the fullest record.
- **Writes go through the service role only.** Public users get read access via RLS; all mutations happen server-side.

## Setup

**1. Install**

```bash
npm install
```

**2. Supabase**

- Create a project at [supabase.com](https://supabase.com)
- Open SQL Editor → run `supabase/schema.sql`
- Create a public Storage bucket named `artifacts`

**3. Environment**

```bash
cp .env.example .env.local
```

Fill in your Anthropic, OpenAI, and Supabase keys.

**4. Shopify (optional commerce layer)**

- Create or open a Shopify store and publish products.
- Install Shopify's **Headless** sales channel.
- Create a storefront with product, inventory, cart, and checkout access.
- Add the store's `.myshopify.com` domain and Storefront access token:

```bash
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
SHOPIFY_API_VERSION=2026-07
```

Shopify owns product prices, variants, inventory, carts, orders, and checkout.
Supabase remains the source of truth for archive and provenance records.

**5. Run**

```bash
npm run dev
```

## API routes

| Route | Purpose |
|---|---|
| `POST /api/search` | Semantic search: `{ query }` → ranked artifact matches |
| `POST /api/provenance` | Generate + save a provenance narrative: `{ artifactId, known_history? }` |
| `POST /api/catalog` | Draft a catalog entry from a photo: `{ imageBase64, mediaType, imageUrl?, hint? }` |
| `POST /api/shopify/cart` | Restore, create, update, or remove Shopify cart lines |

## Roadmap

- [ ] Artifact detail pages with full provenance display
- [ ] Archivist dashboard (verify drafts, edit narratives)
- [ ] Image upload flow → Supabase Storage → `/api/catalog`
- [ ] Collection browsing without search (era / origin / technique facets)
- [ ] Public launch with a seeded collection

## Stack

Next.js 15 · React 19 · TypeScript · Tailwind CSS v4 · Supabase (Postgres + pgvector + Storage) · Shopify Storefront API · Anthropic Claude API · OpenAI embeddings · Zod
