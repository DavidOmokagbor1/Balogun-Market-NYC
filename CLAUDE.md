# Balogun Market NYC — Project Rules

This file is the design and engineering law for this project. Read it before every task.
When any instruction conflicts with these rules, STOP and ask instead of improvising.

## What this project is

A curated luxury marketplace for African fashion — bridging African design with global
fashion culture. Inspired by Lagos's Balogun Market; positioned alongside Dover Street
Market, Browns, and The Folklore. Fashion only — no fine art, no artist-archive framing,
no agentic AI search.

Phase now: showcase site (browse collections, designer roster, brand story, Fashion
Week presence). E-commerce checkout comes in a later phase, not now.

Tone: luxury, editorial, restrained. Same visual language as before — a lit object in
deep shadow — now applied to garments and collections instead of archival artifacts.

## Design system — UNCHANGED, NON-NEGOTIABLE

### Colors (exact values — never substitute)
- `--background: #0A0A0A` · `--card: #111111` · `--secondary: #161616` · `--muted: #1A1A1A`
- `--foreground: #F5F1E8` (bone) · `--muted-foreground: #888880`
- `--accent: #C9A86A` (gold — the ONLY accent color)
- `--border: rgba(245, 241, 232, 0.08)`
- NEVER introduce a new color. No Tailwind gray/zinc/slate, no arbitrary hex.
- The emerald AIDiscovery exception is GONE along with AIDiscovery — do not carry it forward.

### Typography
- Display: Cormorant Garamond (weight 400, line-height 1.05) — bone roman + gold italic pairing
- Body/UI: Inter · Labels/data: DM Mono
- Never add or swap fonts.

### Shape & texture
- `--radius: 0` everywhere. Custom cursor. 2px gold scrollbar. Gold text selection.
- Image treatment: `brightness(0.35) saturate(1.1)` under text overlays, as before.

### Section order (revised — fashion only)
Navbar → HeroSection → CollectionsGrid → Lookbook → MasonryGallery → Designers
(formerly ArtistProfiles) → BrandStory (formerly Timeline) → VideoReel → Membership →
Journal (fashion editorial) → Footer

## What changed from Àṣà Archive — READ THIS BEFORE TOUCHING CODE

### Removed entirely (delete component, route, and DB dependency)
- `AIDiscovery` component and `/api/search` — no semantic search
- `/api/provenance` — no AI-generated provenance narratives
- `/api/catalog` — no Claude-vision image-to-catalog drafting
- `VirtualExhibition` component
- pgvector, OpenAI embeddings, `match_artifacts` RPC, embedding refresh logic
- `provenance_verified` / unverified-draft data model

### Repurposed (keep component + design, change content/copy/name)
- `ArtistProfiles` → `Designers` — features curated fashion houses/artisans, NOT fine
  artists. This is core to the business model (curated designer roster) — do not delete.
- `Timeline` → `BrandStory` — founder story, not art-historical timeline
- `Journal` → fashion editorial (trend pieces, designer spotlights, Fashion Week
  coverage), not archive/culture writing

### Unchanged
- `HeroSection`, `CollectionsGrid`, `Lookbook`, `MasonryGallery`, `VideoReel`,
  `Membership`, `Footer`, `Navbar` — same components, same design, recopy only.
- The entire visual/design system above.

## Data model (simplify — no seed script for "artifacts" anymore)
- Rename conceptually: artifacts → pieces/collection items. Fields needed: designer,
  collection/season, category, image(s), short description, origin (optional
  provenance-lite line is fine — e.g. "Handwoven, Kano, Nigeria" — but NOT an
  AI-generated narrative).
- No embeddings column needed. No provenance_verified flag needed.
- Manual data entry via Supabase is fine for this phase — no AI drafting pipeline.

## Brand copy reference (from finalized brand deck — use this, not placeholders)

- Tagline/positioning: "A curated luxury marketplace bridging African creativity with
  global fashion culture."
- Mission: "To elevate African luxury by giving designers a world-class platform to be
  discovered, celebrated, and purchased — starting in New York City."
- Four pillars (use for BrandStory or an About section):
  1. Cultural Authority — honoring African heritage through curation & storytelling
  2. Luxury Craftsmanship — designers selected for tailoring, textile, artisanal excellence
  3. Global Access — connecting African designers to U.S. consumers, stylists, editors
  4. Community & Commerce — a cultural hub and a commercial engine
- Offering categories (for CollectionsGrid/Designers): ready-to-wear, accessories,
  jewelry, scarves & textiles, occasionwear
- Fashion Week narrative line: "The First Look at Balogun Market NYC's Founding
  Designer" — use for Hero or a Fashion Week teaser section
- E-commerce feature language (Phase 2, not built now, but copy can foreshadow it):
  "Shop the Show," designer storytelling, editorial product photography, limited-
  edition drops
- Audience (do not display verbatim, but informs tone): luxury shoppers seeking
  newness, Fashion Week attendees, stylists/editors/curators, diaspora consumers
- Long-term vision line (for Footer/About): "A multi-brand luxury retailer championing
  African designers, with physical locations, global pop-ups, and a cultural footprint
  that rivals Dover Street Market, Browns, and The Folklore."
- CTA line: "Balogun Market NYC invites partners, press, and collaborators to join us
  in shaping the future of African luxury. This is the beginning of a new fashion
  chapter."

When Cursor writes copy for Hero, Designers, BrandStory, Membership, or Footer: pull
from this section first. Do not invent new taglines or mission language.

## Stack — do not change without asking
- Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + React 19
- Supabase: Postgres + Storage, RLS enabled, separate anon/service-role clients
  (pgvector no longer needed — do not remove the extension from prod without checking,
  but no new dependency on it)
- No Anthropic/OpenAI calls required for this phase unless explicitly reintroduced later
- motion (framer-motion) + lucide-react for UI, as before

## Engineering rules
1. Never commit secrets. All keys live in .env.local (gitignored).
2. Service-role Supabase client is server-only.
3. Prefer editing existing files over creating new ones. Ask before adding dependencies.
4. Do not restyle existing components while doing unrelated work.
5. If a needed style/pattern doesn't exist: ASK before inventing one.

## Current phase
- Phase 1 (NOW): strip agentic/archive features per the list above, repurpose Designers/
  BrandStory/Journal, recopy content to Balogun Market brand, seed a real showcase
  collection (no AI pipeline), deploy to Vercel.
- Phase 2 (LATER, per original strategy): e-commerce checkout, Fashion Week
  presentation features, pop-up/activation pages.
- Agentic search / AI provenance: NOT part of this project anymore. Do not reintroduce
  without an explicit new decision.
