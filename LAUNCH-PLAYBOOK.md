# Balogun Market NYC — Launch playbook

**Who this is for:** you, a collaborator, or a room you are presenting to.  
**What this is not:** a chat log. It is the shortest true account of how the live stack works, why it is split, and what not to undo.

Last updated: 14 September 2026  
Public site: [www.balogunmarketnyc.com](https://www.balogunmarketnyc.com)  
Press: [hello@balogunmarketnyc.com](mailto:hello@balogunmarketnyc.com)

### Share this? Keep credentials out of git

| Place | Playbook | Public URL `www.balogunmarketnyc.com` |
|---|---|---|
| Instagram, WhatsApp, TikTok, press | **No** — this is plumbing | **Yes — always** |
| Private teach / deck for a partner | Yes, this file | Yes |
| Public GitHub | Only if stripped of store hosts and env names that invite copy-paste of secrets | Yes |

**Never commit:** `.env`, `.env.local`, Storefront tokens, Admin tokens, Dynadot / Vercel / Google passwords, API keys. Environment **names** can be documented. Environment **values** cannot.

---

## 1. Teach this in 60 seconds

The house and the till cannot share one hostname.

| Address | Who owns it | What the visitor sees |
|---|---|---|
| **www.balogunmarketnyc.com** | Vercel (Next.js) | The luxury site — roster, lookbooks, Journal |
| **balogunmarketnyc.com** (no www) | Shopify | Checkout. The homepage is a dummy store, so it **redirects to www** |
| **`*.myshopify.com`** | Shopify API only | Lives in Vercel env. Never a public URL. Never add it in Vercel |

People do not need to type `www`. Phones send “balogunmarketnyc” to Google. Google is told the public site is **www**. After one visit, the phone remembers it.

Password protection on Shopify stays **off**. A password would hide the dummy shop from Google, and it would also stop anyone from paying.

---

## 2. Why the split (the decision, not the drama)

Shopify hosted checkout must live on a domain Shopify controls. If you point **balogunmarketnyc.com** at Vercel, checkout breaks. If you point **www** at Shopify, visitors see Horizon / Dawn placeholder products — not the house.

So:

- **www** = the brand.
- **Apex** (no www) = the till.
- The Storefront API talks to `*.myshopify.com` in environment variables. That host is invisible to shoppers.

This is the same pattern a lot of headless luxury sites use. It is not a workaround. It is the architecture.

---

## 3. How we got here (the story)

1. **The site existed on Vercel** as an editorial storefront. Shopify was wired for bag and checkout, but the first drop was not published yet.
2. **The custom domain was added.** Dynadot holds DNS. Apex A record → Shopify (`23.227.38.65` / `23.227.38.74`). `www` CNAME → `cname.vercel-dns.com`.
3. **The trap:** Shopify had also claimed `www`. Vercel could not issue a certificate. We **removed www from Shopify**, left the apex as Shopify’s **primary** domain, and pointed only `www` at Vercel. We did **not** move nameservers to Vercel — that would have stolen checkout.
4. **Phones and Google still opened the apex.** No www meant Shopify’s live theme (Horizon), dummy t-shirts. That was not a mobile bug.
5. **Fix:** on the **live** Horizon theme, `layout/theme.liquid`, under `<head>`:

   ```liquid
   {% if request.page_type == 'index' %}
   <script>
     window.location.replace('https://www.balogunmarketnyc.com');
   </script>
   {% endif %}
   ```

   Checkout does not use this theme layout, so payment still runs on the apex.
6. **Google Search Console.** Dynadot blocks DNS saves while Email Settings are on (“turn off email before setting name servers”). We did **not** fight that. We verified the **URL prefix** `https://www.balogunmarketnyc.com` with an HTML file on the Next.js site (`public/googleec8569d15c734819.html`). Sitemap submitted: `https://www.balogunmarketnyc.com/sitemap.xml`.

Inventory from the houses is still in transit. The stack is ready for it.

---

## 4. DNS (Dynadot) — do not “tidy” this

Nameservers stay **Dynadot** (`ns1.dyna-ns.net` / `ns2.dyna-ns.net`).

| Type | Host | Value | Purpose |
|---|---|---|---|
| A | *(blank / @)* | Shopify IP | Checkout on the apex |
| CNAME | **www** | **cname.vercel-dns.com** | Public site |
| TXT | *(blank / @)* | existing `google-site-verification=…` | Older Google proof — leave it |

**Never:**

- Add `balogunmarketnyc.com` (no www) as a Vercel domain.
- Point the apex A record at Vercel (`216.198.79.1` or similar).
- Change nameservers to Vercel.
- Put a CNAME on `@` (apex).
- Turn Shopify password protection on “to hide the dummy shop.”

Dynadot **DNS** and **Name Servers** are different modes on the same screen. To add a record, the top dropdown must be **Dynadot DNS**. If Save says *turn off email settings before setting name servers*, you are in Name Servers mode, or Email Settings is on. Turn email off only if you must save DNS, then turn it **back on** immediately (`hello@` uses it).

---

## 5. Shopify — what must stay true

| Setting | Value |
|---|---|
| Primary domain | `balogunmarketnyc.com` (no www) |
| `www` | **Not** connected to Shopify |
| Password protection | **Off** |
| Live theme | Horizon (or whatever is **Current**) — the redirect lives here, not on a Dawn draft |
| Headless | Products must be **published to the Headless sales channel** or `/shop` stays empty |
| Vendor | `Y'WANDELAG` or `Mokhueleigbe` so house filters and The Fitting match |

If you duplicate or publish a new theme, **re-paste the homepage redirect** into that theme’s `theme.liquid`. Theme copies do not keep the edit.

---

## 6. Vercel — what must stay true

Project: **`balogun-market-nyc`**  
GitHub: `DavidOmokagbor1/Balogun-Market-NYC` (`main` auto-deploys)

| Variable | Production value | In git? |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://www.balogunmarketnyc.com` | Name only; value also in `.env.example` |
| `SHOPIFY_STORE_DOMAIN` | the store’s `*.myshopify.com` host — not admin.shopify.com | **Name only** |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Headless / Storefront token | **Never** |
| `SHOPIFY_CHECKOUT_HOST` | `balogunmarketnyc.com` | Name only |

Search Console HTML file lives under `public/google*.html`. Do not delete it. Do not treat the filename as a secret — it is already on the public site.

---

## 7. Google — how people find it without typing www

1. Someone types `balogunmarketnyc` in Safari/Chrome. That is a **search**, not a URL.
2. Google matches the page title **Balogun Market NYC** on **www**.
3. After the first visit, the phone autocompletes `www.balogunmarketnyc.com`.

Search Console is verified for **https://www.balogunmarketnyc.com/** (URL prefix, not the full-domain DNS method). Charts stay empty for a day or more. That is normal.

Sitemap: `https://www.balogunmarketnyc.com/sitemap.xml`

### Public copy — paste these

Website in every bio, chat, and signature is **www** only. Never the bare domain. Never `*.myshopify.com`.

**Instagram bio (website field + last line of bio)**  
`www.balogunmarketnyc.com`

**WhatsApp Business / link**  
`https://www.balogunmarketnyc.com`

**Email signature**

```
Balogun Market NYC
A curated luxury marketplace for African fashion
www.balogunmarketnyc.com
hello@balogunmarketnyc.com
```

Do not send people to the apex as the “website.” Checkout can still happen there after they add to bag on www.

---

## 8. If you had to do this again (checklist)

1. Keep DNS at the registrar (Dynadot). Do not move nameservers.
2. Apex A → Shopify. `www` CNAME → Vercel.
3. In Shopify: apex primary, **remove www**.
4. In Vercel: add **only** `www.balogunmarketnyc.com`. Wait for the certificate.
5. Set `NEXT_PUBLIC_SITE_URL` and `SHOPIFY_CHECKOUT_HOST` as above.
6. Password protection **off**.
7. Live theme `theme.liquid`: homepage → `https://www.balogunmarketnyc.com`.
8. Search Console: URL prefix on **www**, HTML file in `public/`, submit sitemap.
9. Publish products to **Headless**, then a real test checkout.

---

## 9. While inventory is in transit

The site can already show the houses. It sells when Headless has SKUs.

Still worth locking before the first unit lands:

- Confirm Vercel production `NEXT_PUBLIC_SITE_URL` is the www host (Open Graph and sitemap).
- Confirm Shopify password is still off.
- Confirm a checkout test path: add a $1 test product to Headless, buy it, refund it — so the till is proven empty of fashion, not empty of plumbing.
- When a new Shopify theme is published, re-check the homepage redirect.
- Link-in-bio and email signatures: `www.balogunmarketnyc.com` only.

When pieces arrive: image, price, inventory, vendor name, tags, **Headless publish**. Then `/shop` fills itself. No rebuild required.

---

## 10. One slide for a room

> Balogun Market NYC is a curated luxury house for African fashion, live in New York with two founding designers. The website is the house (Vercel). Shopify is the till. Shoppers meet the work on **www**; they pay on the bare domain. Google is pointed at www. The first drop appears when the houses publish — the pipes are already in.

Longer brand copy: `ONE-PAGER.md`. Product requirements: `PRD.md`. Design law: `CLAUDE.md`.
