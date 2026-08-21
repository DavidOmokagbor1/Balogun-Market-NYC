# Balogun Market NYC

**Live:** Vercel project `balogun-market-nyc` — set `NEXT_PUBLIC_SITE_URL` to the production host.

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

- `/` — Hero, offering, roster, lookbook, gallery, brand story, Journal
- `/shop` — the collection, via headless Shopify
- `/journal` — next-season collections, pop-ups, briefs
- `/contact`, `/policies`
- `/#designers`, `/#lookbook`, `/#story`, `/#journal`

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
| `NEXT_PUBLIC_SITE_URL` | Public site origin for Open Graph and sitemap, e.g. `https://www.balogunmarketnyc.com` |
| `SHOPIFY_STORE_DOMAIN` | Store host only, e.g. `balogun-market-nyc.myshopify.com` — not the admin Headless URL |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Storefront API access token (public, read-only) |
| `SHOPIFY_API_VERSION` | Storefront API version (optional; defaults to `2026-07`) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service-role key — **server-only, never exposed to client** |

Never commit `.env.local`. Rotate any key that's ever been pasted somewhere public.

## Commerce

Product catalog, inventory, cart, and checkout are handled by Shopify via the Storefront
API. The Next.js app queries products, keeps cart state on the site, and hands off to
Shopify's hosted checkout for payment.

**Products will not appear on `/shop` until they are published to the Headless sales channel.**

In Shopify Admin:

1. Open the product
2. **Publishing** → enable **Headless** (Headless channel / Hydrogen)
3. Confirm a price, inventory greater than zero, and at least one image
4. Reload `/shop`, add to bag, complete a test checkout

Checkout currently opens on the Shopify primary host (`balogunmarketnyc.com`). That is
correct for payments. The Vercel site is the storefront, not the checkout.

The Shopify Online Store is currently **password-protected** (public catalog returns 401).
Turn that off before launch: **Shopify Admin → Online Store → Preferences → uncheck
password protection.** Otherwise customers leaving our bag for checkout may hit a
password wall on `balogunmarketnyc.com`.

Designer bios and Journal copy that are not products live on the Next.js site.

## Custom domain (Dynadot)

Shopify already uses `balogunmarketnyc.com` as the checkout host. Do **not** add that
same hostname to Vercel — the site and checkout will fight.

When you have Dynadot login:

1. Keep checkout on `balogunmarketnyc.com` (Shopify) **or** move it to `checkout.balogunmarketnyc.com`
2. Add **`www.balogunmarketnyc.com`** (or another host you own) in Vercel → Project → Domains
3. At Dynadot, add the CNAME/A records Vercel shows for **that** host only
4. Set `NEXT_PUBLIC_SITE_URL` in Vercel to the public storefront URL (the www host)

Never add `*.myshopify.com` in Vercel Domains.

## Roadmap

- [x] Founding houses live: Y'WANDELAG, Mokhueleigbe
- [x] Headless Shopify store created
- [x] Storefront API wiring — site linked live to Shopify
- [ ] Publish at least one product to the Headless channel and complete a test checkout
- [ ] Dynadot: point `www` at Vercel; keep Shopify checkout on the apex (or a checkout subdomain)
- [ ] Fashion Week presentation content
- [ ] Additional designer onboarding (roster expansion)

## License

Private — © 2026 Balogun Market NYC. All rights reserved.
