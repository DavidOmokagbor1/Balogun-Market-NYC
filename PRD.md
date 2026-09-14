# Balogun Market NYC — Product Requirements Document

| | |
|---|---|
| **Status** | Launch v1 in market; first drop blocked on Shopify |
| **Owner** | Balogun Market NYC |
| **Last updated** | 14 September 2026 |
| **Related** | `CLAUDE.md` (design & engineering law) · `README.md` (setup) |

This document is the product source of truth. `CLAUDE.md` is the design and engineering law. When they conflict on **what to build**, this PRD wins. When they conflict on **how it looks or how code is written**, `CLAUDE.md` wins.

---

## 1. Summary

Balogun Market NYC is a **curated luxury marketplace for African fashion**, starting in New York City. It is not a fine-art archive, not an AI product, and not a department-store catalogue.

The roster *is* the product. Visitors should meet the houses, understand the craft, and buy when pieces are live — with the same restraint as Dover Street Market, Browns, or The Folklore.

**Positioning:** A curated luxury marketplace bridging African creativity with global fashion culture.

**Mission:** To elevate African luxury by giving designers a world-class platform to be discovered, celebrated, and purchased — starting in New York City.

**Long-term vision:** A multi-brand luxury retailer championing African designers, with physical locations, global pop-ups, and a cultural footprint that rivals Dover Street Market, Browns, and The Folklore.

---

## 2. Problem

African luxury fashion is made, shown, and celebrated — then hard to buy from the United States with the trust, presentation, and operations that luxury shoppers expect.

- Houses in Lagos and across the continent lack a world-class storefront that treats the work as fashion, not as “craft curiosity” or archive.
- U.S. luxury shoppers, stylists, and editors who want newness have no considered path to those houses.
- Generic marketplaces flatten the roster. Balogun exists to **select**, **tell**, and **sell**.

If a visitor cannot (1) know who we are in ten seconds, (2) meet the houses, (3) buy or clearly see a piece is coming, (4) learn what is next, and (5) trust shipping, returns, and contact — the product has failed.

---

## 3. Audience

Do not display this list on the site. It informs tone, merchandising, and Journal.

| Audience | What they need |
|---|---|
| Luxury shoppers seeking newness | Editorial presentation, honest stock, a size they can trust |
| Fashion Week attendees | The First Look, runway context, “Shop the Show” |
| Stylists, editors, curators | House story, contact for press/partners, lookbook |
| Diaspora consumers | Cultural authority without costume; commerce without apology |

Primary geography for v1: **United States**, with Lagos-made goods and NYC as the showing city.

---

## 4. Goals and non-goals

### Goals (Launch v1 — now)

1. A public site that reads as African luxury, not as a demo or an archive.
2. Two founding houses presented with real photography and real copy.
3. Headless Shopify: browse → bag → hosted checkout → confirmation.
4. Honest empty states until a drop is published.
5. Journal as the calendar of next season, pop-ups, and briefs — dated only when true.
6. Contact and policies a press or client can use.

### Non-goals

- Agentic AI search, provenance narratives, image-to-catalog drafting.
- Fine art, artifact pages, “collector” framing.
- Invented drop calendars, fake membership prices, fake bylines.
- Copying Nuuly, SSENSE, or any other house **visually**. Structure may be borrowed; the look may not.
- Expanding the roster before the first drop can be bought.
- Physical retail, pop-up microsites, or Fashion Week live-ops until v1 commerce works.

---

## 5. Brand law (product constraints)

Full tokens live in `CLAUDE.md`. Product and design must not invent around them.

- **Tone:** Luxury, editorial, restrained. A lit object in deep shadow.
- **Palette:** Near-black `#0A0A0A`, bone `#F5F1E8`, gold `#C9A86A` as the only accent. No new colors.
- **Type:** Cormorant Garamond (display, bone roman + gold italic), Inter (body), DM Mono (labels).
- **Shape:** `border-radius: 0`. Custom cursor. 2px gold scrollbar.
- **Copy:** Use brand-deck language. Do not invent taglines.
- **Fashion Week line:** “The First Look at Balogun Market NYC's Founding Designer.”
- **Commerce language:** “Shop the Show,” designer storytelling, editorial photography, limited-edition drops.

**CTA (press / partners):** Balogun Market NYC invites partners, press, and collaborators to join us in shaping the future of African luxury. This is the beginning of a new fashion chapter.

### Four pillars

1. Cultural Authority — honoring African heritage through curation and storytelling
2. Luxury Craftsmanship — designers selected for tailoring, textile, artisanal excellence
3. Global Access — connecting African designers to U.S. consumers, stylists, editors
4. Community & Commerce — a cultural hub and a commercial engine

---

## 6. Current product

### Founding houses

| House | Designer | City | Lane |
|---|---|---|---|
| **Y'WANDELAG** | Fatima Wande Lagundoye | Lagos | Ready-to-wear. Heritage embroidery — Zubi, Tinko, tie-dye — on minimal, locally made silhouettes. |
| **Mokhueleigbe** | Margaret Okhueleigbe | Lekki | Occasionwear. Bridal, haute, and ready-to-wear; heritage cut, modern silhouette. Rebranded 2025 from 3&4 Fashion. |

### Information architecture

| Route | Purpose |
|---|---|
| `/` | First Look: hero, shop preview, offering, roster, lookbook, gallery, brand story, video, membership lanes, Journal |
| `/shop` | Collection. Filter by house, category, occasion, edit |
| `/shop/[handle]` | Piece: gallery, story, size note, add to bag |
| `/fitting` | Measurements kept on this device; size suggestion per house |
| `/journal`, `/journal/[slug]` | Season, pop-up, house, brief |
| `/contact` | Press, partners, collaborators — `hello@balogunmarketnyc.com` |
| `/policies` | Orders, shipping, returns, privacy |

**Nav (local, not yet on production):** Shop curtain (featured First Look + houses / category / occasion) and The House curtain (Fitting, lookbook, Journal, story, contact).

### Shop taxonomy

Many ways in, one checkout.

| Axis | Live lanes | Forthcoming |
|---|---|---|
| House | Y'WANDELAG, Mokhueleigbe | — |
| Category | Ready-to-Wear, Occasionwear, Scarves & Textiles | Accessories, Jewelry → Journal |
| Occasion | Everyday, Evening, Bridal, Fashion Week | — |
| Edit | The First Look, Lagos Fashion Week 2025, New In | — |

Forthcoming lanes must not open empty shop pages.

### Commerce architecture

- **Storefront:** Next.js on Vercel (`balogun-market-nyc`).
- **Catalog, cart, payment, tax, shipping:** Shopify Storefront API + hosted checkout.
- **Checkout host:** `balogunmarketnyc.com` (Shopify). Do not point the same hostname at Vercel.
- **API host:** `balogun-market-nyc.myshopify.com` — env var only, never a Vercel domain.

Products appear on `/shop` only when published to the **Headless** sales channel, with a price, inventory, and at least one image.

**Shopify vendor** must be `Y'WANDELAG` or `Mokhueleigbe` so filters and The Fitting can match. Tags/type may carry category and occasion (e.g. `bridal`, `lfw`, `zubi`).

### The Fitting

Every house cuts differently. Measurements (bust, waist, hip, height, usual US size) are stored in **browser localStorage only** — not an account.

- Y'WANDELAG: closer to true ready-to-wear; suggest the chart size.
- Mokhueleigbe: structured occasionwear; if between sizes, take the larger.
- Product page shows a size note and may preselect the matching variant if it exists and is in stock.

### What is shipped vs local

| Layer | On `main` / Vercel | On this machine, uncommitted |
|---|---|---|
| Showcase homepage, Journal, contact, policies | Yes | Recopy + LFW 2025 photography, Zare lookbook |
| Shopify browse / cart / checkout path | Yes | Checkout URLs rewritten to `balogunmarketnyc.com` |
| Shop lanes + mega menu | No | Yes |
| The Fitting | No | Yes |
| First published product | **No** | **No** |

---

## 7. User journeys

### J1 — First look (must work without inventory)

Visitor lands → understands African luxury / NYC / curated houses in ten seconds → meets Y'WANDELAG and Mokhueleigbe → reads Journal or writes to the house.

**Success:** No archive language. No fake “buy now” on empty stock.

### J2 — Shop the Show (blocked until Headless has products)

Visitor chooses a house or occasion → opens a piece → size note (if fitted) → add to bag → Shopify checkout → order confirmation.

**Success:** One real test order on production.

### J3 — Fit before buy

Visitor adds measurements on `/fitting` → returns to a house’s piece → sees a suggested size → can edit fitting. One-size pieces say so. Missing size in this drop is stated, not guessed.

### J4 — Press / partner

Visitor uses Contact or footer → `hello@balogunmarketnyc.com`. No subscribe-form theatre.

---

## 8. Requirements

Priority: **P0** launch-blocking · **P1** first-drop quality · **P2** after the first sale.

### P0 — Make the first sale possible

| ID | Requirement | Status |
|---|---|---|
| P0.1 | At least one product per founding house published to Headless, with image, price, inventory | **Open — Shopify Admin** |
| P0.2 | Vendor + tags set so house / category / occasion filters resolve | **Open — merchandising** |
| P0.3 | Complete a test checkout on production (cart → payment → confirmation) | **Open** |
| P0.4 | Shopify Online Store password protection **off**, or checkout moved to a host that is not walled | **Open** |
| P0.5 | Commit and deploy local work (LFW photos, shop lanes, Fitting, nav) | **Open — needs explicit go** |
| P0.6 | Empty shop copy stays honest until P0.1 is true | Done in code |
| P0.7 | Contact + policies reachable from footer | Done |

### P1 — First-drop quality

| ID | Requirement | Status |
|---|---|---|
| P1.1 | Shop menu + `/shop` chips: house, category, occasion, edit | Built locally |
| P1.2 | Forthcoming accessories/jewelry link to Journal, not empty shop | Built locally |
| P1.3 | The Fitting + product size note | Built locally |
| P1.4 | Editorial product photography (not only lookbook stills) | Open with houses |
| P1.5 | `www.balogunmarketnyc.com` on Vercel; apex remains Shopify checkout | Open — Dynadot |
| P1.6 | `NEXT_PUBLIC_SITE_URL` set to the public storefront | Open after domain |
| P1.7 | Journal dated only when a house actually publishes | Done (discipline) |

### P2 — After the first sale

| ID | Requirement |
|---|---|
| P2.1 | Fashion Week presentation / “Shop the Show” live-ops |
| P2.2 | Pop-up and activation pages with place and date |
| P2.3 | Additional houses onboarded (roster expansion) |
| P2.4 | Accessories and jewelry lanes when those drops exist |
| P2.5 | Accounts, saved fittings server-side, or CRM — only if explicitly decided |
| P2.6 | Physical location / flagship — long-term vision, not this PRD’s build scope |

---

## 9. Content model

Keep it thin. No AI-generated lineage.

**Piece (Shopify):** designer (vendor), title, description, images, variants/sizes, price, inventory, product type, tags (category / occasion / collection), origin line optional (e.g. “Handwoven, Kano, Nigeria”).

**House (site):** name, designer, city, category, founded line, signature, collections, portrait, featured look, quote, shop lane.

**Journal:** category (Season / Pop-up / House / Brief), title, excerpt, date, body. No invented dates.

**Fitting profile (client-only):** bust, waist, hip, height, usual US size.

Designer bios that are not products may later live in Supabase. v1 houses are in the Next.js app.

---

## 10. Technical constraints

Do not change the stack without an explicit decision.

- Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4
- motion + lucide-react
- Shopify Storefront API (no Admin API in the public app)
- Supabase for optional content; service-role client server-only
- No OpenAI / Anthropic in this phase
- Secrets only in `.env.local` / Vercel env — never committed
- Visual source of truth: `/design-reference/` and `CLAUDE.md`

**Engineering rules:** prefer editing existing files; do not restyle unrelated components; ask before new colors, fonts, radii, or dependencies.

---

## 11. Launch criteria

Call Launch v1 **market-ready** only when all of the following are true:

1. Production storefront loads as Balogun Market NYC (no archive leftovers).
2. Both founding houses are presented with approved photography and copy.
3. At least one Headless-published piece can be added to the bag and paid for.
4. Checkout does not hit a Shopify password wall.
5. `/contact` and `/policies` match how orders actually work.
6. Local shop lanes + Fitting are deployed, or a written decision exists to ship without them.
7. Public URL is the intended host (`www` or current Vercel) with correct Open Graph.

Domain cutover is **hygiene**, not a substitute for a test order.

---

## 12. Success metrics (first 90 days after first drop)

Qualitative first; do not fake a dashboard.

| Signal | Why it matters |
|---|---|
| Completed checkouts | The only proof the commerce path works |
| Add-to-bag → checkout start | Friction before Shopify |
| Shop lane usage (house vs occasion vs category) | Whether merchandising matches how people shop |
| Fitting save → product view | Whether size notes reduce hesitation |
| Press / partner mail to `hello@` | Whether the house is being taken seriously |
| Return visits to Journal | Whether “what’s next” is a reason to come back |

No vanity metrics (followers, empty-shop sessions) as launch proof.

---

## 13. Risks

| Risk | Mitigation |
|---|---|
| Headless channel empty | P0.1 is the first task; shop copy must stay honest |
| Password wall on checkout host | Turn off Online Store password or isolate checkout subdomain |
| Apex domain used for both site and checkout | `www` = Vercel; apex = Shopify; never add `*.myshopify.com` to Vercel |
| Houses cut differently → returns | The Fitting; Mokhueleigbe sizes up when close |
| Uncommitted local work lost or unseen on production | Commit when owner says go |
| Two `next dev` processes corrupt `.next` | One server only |
| Scope creep (AI, more houses, pop-up sites) | This PRD’s non-goals |

---

## 14. Open decisions

1. When to commit and deploy the local shop / Fitting / LFW work.
2. First SKUs: which Y'WANDELAG piece and which Mokhueleigbe piece.
3. Checkout stays on `balogunmarketnyc.com` vs `checkout.balogunmarketnyc.com`.
4. Whether fittings ever leave the device (account) — default **no**.
5. Next house after the founding two — not before a completed test order.

---

## 15. Immediate next actions

1. **Shopify Admin:** publish one piece per house to Headless; set vendor and tags; uncheck store password.
2. **Buy the test piece** on production.
3. **Commit and push** local work when the owner confirms.
4. **Dynadot:** `www` → Vercel; leave apex on Shopify checkout.
5. Only then: Fashion Week presentation, pop-ups, roster expansion.

This is the beginning of a new fashion chapter. The site is ready to show. It is not ready to sell until the first drop is published and paid for.
