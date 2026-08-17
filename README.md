# Balogun Market NYC

**Live:** [asa-agentic-africanfashion.vercel.app](https://asa-agentic-africanfashion.vercel.app/)

A curated luxury marketplace bridging African creativity with global fashion culture —
starting in New York City.

Inspired by Lagos's iconic Balogun Market, and positioned alongside Dover Street Market,
Browns, and The Folklore. Fashion only: garments, houses, and collections — not a fine-art
archive, and not an AI product.

## What this is

Balogun Market NYC exists to elevate African luxury by giving designers a world-class
platform to be discovered, celebrated, and purchased. The site is a showcase first: a
place to meet the houses, see the work, and understand the craft — then shop the
collection when pieces are live.

This is the beginning of a new fashion chapter. The long-term vision is a multi-brand
luxury retailer championing African designers, with physical locations, global pop-ups,
and a cultural footprint that rivals the world's most considered fashion destinations.

## Core goal

**Showcase the designers.** The roster is the product. Every page should make a visitor
understand who the houses are, where they work, and what they make — ready-to-wear,
accessories, jewelry, scarves and textiles, occasionwear.

Four pillars shape the brand:

1. **Cultural Authority** — honoring African heritage through curation and storytelling
2. **Luxury Craftsmanship** — designers selected for tailoring, textile, and artisanal excellence
3. **Global Access** — connecting African designers to U.S. consumers, stylists, and editors
4. **Community & Commerce** — a cultural hub and a commercial engine

## The First Look at the Founding Houses

Founding designers live now:

- **Y'WANDELAG** — Fatima Wande Lagundoye, Lagos. Heritage embroidery, Zubi, Tinko, and
  tie-dye on minimal, locally made silhouettes. Ready-to-wear.
- **Mokhueleigbe** — Margaret Okhueleigbe, Lekki. Bridal, haute, and ready-to-wear.
  Heritage cut, modern silhouette.

The homepage is built around that first look: Hero, then The Roster, then Lookbook
("Shop the Show"). The shop is the collection itself, powered by Shopify when products
are published.

## Site structure

- `/` — Hero (Founding Houses), Designers (The Roster), Lookbook
- `/shop` — the collection, via headless Shopify
- `/#designers`, `/#lookbook` — in-page anchors from the nav

## Stack

- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, React 19
- **Animation:** motion (framer-motion), lucide-react
- **Commerce:** Headless Shopify — Storefront API for products, cart, and checkout
  (inventory, payments, tax, and shipping are Shopify-managed)
- **Content:** Supabase (Postgres) for designer profiles and brand content
- **Deployment:** Vercel

## Design system

- Palette: near-black ground (`#0A0A0A`), warm bone text (`#F5F1E8`), aged gold accent
  (`#C9A86A`) — the only accent color in the product
- Typography: Cormorant Garamond (display), Inter (body), DM Mono (labels)
- `border-radius: 0` throughout — a deliberate editorial choice, not an omission
- Custom cursor, 2px gold scrollbar, gold text selection
- Full design law lives in `CLAUDE.md` — read it before touching UI

## Project structure

```
src/
  app/
    page.tsx               # homepage — Hero, Designers, Lookbook
    shop/                  # Shopify-powered collection page
    api/                   # commerce and content API routes
  components/              # Navbar, HeroSection, Designers, Lookbook, Footer
  lib/                     # Shopify Storefront client, Supabase clients
design-reference/           # visual source of truth
```

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the values below
npm run dev
```

### Environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` | Your Shopify store's `.myshopify.com` domain |
| `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN` | Storefront API access token (public, read-only) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service-role key — **server-only, never exposed to client** |

Never commit `.env.local`. Rotate any key that's ever been pasted somewhere public.

## Commerce

Product catalog, inventory, cart, and checkout are handled by Shopify via the Storefront
API. The Next.js app queries products, keeps cart state on the site, and hands off to
Shopify's hosted checkout for payment. That keeps the editorial design intact while
Shopify handles PCI, tax, shipping, and inventory.

Designer bios and other brand content that is not a product live in Supabase.

Checkout is live in the stack; end-to-end cart testing and Fashion Week presentation
content are still on the roadmap.

## Roadmap

- [x] Founding houses live: Y'WANDELAG, Mokhueleigbe
- [x] Headless Shopify store created
- [x] Storefront API wiring — site linked live to Shopify
- [ ] Cart + checkout handoff fully tested end to end
- [ ] Fashion Week presentation content
- [ ] Additional designer onboarding (roster expansion)

## License

Private — © 2026 Balogun Market NYC. All rights reserved.
