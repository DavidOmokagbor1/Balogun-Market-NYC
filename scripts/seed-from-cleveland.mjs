/**
 * Seed from Cleveland Museum of Art Open Access records.
 * Images already uploaded to Supabase Storage (see scripts/data/cma_asa_uploaded.json).
 *
 *   node scripts/seed-from-cleveland.mjs
 * (dev server on :3000 required for provenance generation)
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnv() {
  const env = {};
  for (const line of readFileSync(resolve(__dirname, "../.env.local"), "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#") || !t.includes("=")) continue;
    const i = t.indexOf("=");
    env[t.slice(0, i)] = t.slice(i + 1);
  }
  return env;
}

function categoryFor(o) {
  const typeStr = Array.isArray(o.type) ? o.type.join(" ") : String(o.type || "");
  const blob = `${o.title} ${o.technique || ""} ${typeStr}`.toLowerCase();
  if (/bead|crown|necklace|headdress|bag|figure|mask|hat|cap/.test(blob)) {
    if (/figure|mask|sculpture|lefem/.test(blob)) return "art";
    return "object";
  }
  if (/photo|photograph/.test(blob)) return "photography";
  if (/dress|skirt|shawl|wrapper|tunic|garment|fashion|overskirt/.test(blob)) return "fashion";
  return "textile";
}

function originFor(o) {
  // culture string already like "Africa, West Africa, Nigeria, Yorùbá-style maker"
  const c = o.culture || "";
  const parts = c.split(",").map((s) => s.trim()).filter(Boolean);
  // drop leading "Africa" / "West Africa" redundancy for display
  const filtered = parts.filter(
    (p) => !/^africa$/i.test(p) && !/^(west|east|central|north|southern) africa$/i.test(p)
  );
  return filtered.slice(0, 3).join(", ") || c || "Africa";
}

function makerFor(o) {
  if (o.artist && !/^unknown/i.test(o.artist) && o.artist !== "—") {
    // "Ateu Atsa (Bangwa, c. 1840–1910)" → keep full
    return o.artist.replace(/\s+/g, " ").trim();
  }
  // culture-attributed anonymous maker — honest museum convention
  const c = o.culture || "";
  if (/yorùbá|yoruba/i.test(c)) return "Yorùbá artist (name unrecorded)";
  if (/asante|ashanti|akan/i.test(c)) return "Asante artist (name unrecorded)";
  if (/bamana|bambara/i.test(c)) return "Bamana artist (name unrecorded)";
  if (/kuba/i.test(c)) return "Kuba artist (name unrecorded)";
  if (/xhosa/i.test(c)) return "Xhosa artist (name unrecorded)";
  if (/bamum|bamun/i.test(c)) return "Bamum artist (name unrecorded)";
  if (/baga/i.test(c)) return "Baga artist (name unrecorded)";
  if (/merina|madagascar/i.test(c)) return "Merina artist (name unrecorded)";
  if (/côte d’ivoire|cote d'ivoire|ivory coast/i.test(c))
    return "Ivorian artist (name unrecorded)";
  if (/congo|kongo/i.test(c)) return "Congolese artist (name unrecorded)";
  if (/morocco/i.test(c)) return "Moroccan artist (name unrecorded)";
  return "Unknown maker";
}

function knownHistory(o) {
  const bits = [];
  if (o.tombstone) bits.push(`Museum tombstone: ${o.tombstone}`);
  if (o.description) bits.push(`Curatorial note: ${String(o.description).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()}`);
  if (o.technique) bits.push(`Technique recorded as: ${o.technique}.`);
  if (o.date) bits.push(`Dated: ${o.date}.`);
  if (o.credit) bits.push(`Credit line: ${o.credit}.`);
  if (o.url) bits.push(`Open-access source record: ${o.url} (Cleveland Museum of Art).`);
  bits.push(
    "This Balogun Market NYC entry is catalogued from Cleveland Museum of Art Open Access data for demonstration of provenance-first archival practice. Image rehosted in Balogun Market NYC storage; object remains in CMA collection — not a physical transfer."
  );
  bits.push(
    "Gaps: where the CMA record does not name a maker, do not invent one. State cultural attribution and what the record leaves unknown."
  );
  return bits.join(" ");
}

const env = loadEnv();
const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;
const APP_URL = process.env.APP_URL || "http://localhost:3000";

const headers = {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

const uploaded = JSON.parse(
  readFileSync(resolve(__dirname, "data/cma_asa_uploaded.json"), "utf8")
);

async function clear() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/artifacts?id=neq.00000000-0000-0000-0000-000000000000`,
    { method: "DELETE", headers: { ...headers, Prefer: "return=minimal" } }
  );
  if (!res.ok) throw new Error(`clear failed ${res.status} ${await res.text()}`);
}

async function insert(o) {
  const known_history = knownHistory(o);
  const row = {
    title: o.title,
    maker: makerFor(o),
    origin: originFor(o),
    era: o.date || null,
    medium:
      o.technique ||
      (Array.isArray(o.type) ? o.type.join(", ") : o.type) ||
      null,
    category: categoryFor(o),
    acquisition_note: `Open-access reference catalogued from Cleveland Museum of Art (${o.credit || "see source record"}). Physical object remains at CMA.`,
    image_url: o.storage_url,
    image_alt: `${o.title}${o.culture ? ` — ${o.culture}` : ""}`,
    provenance_story: null,
    provenance_verified: false,
    metadata: {
      source: "cleveland_oa_v1",
      cma_id: o.id,
      cma_url: o.url,
      known_history,
      tombstone: o.tombstone,
    },
  };
  const res = await fetch(`${SUPABASE_URL}/rest/v1/artifacts`, {
    method: "POST",
    headers,
    body: JSON.stringify(row),
  });
  if (!res.ok) throw new Error(`insert ${o.title}: ${res.status} ${await res.text()}`);
  const [out] = await res.json();
  return { id: out.id, title: o.title, known_history };
}

async function provenance(id, known_history) {
  const res = await fetch(`${APP_URL}/api/provenance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ artifactId: id, known_history }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(data));
  return data.provenance_story;
}

async function main() {
  console.log(`Seeding ${uploaded.length} CMA Open Access works…`);
  await clear();
  console.log("Cleared.");

  const rows = [];
  for (const o of uploaded) {
    const row = await insert(o);
    rows.push(row);
    console.log(`+ ${row.title}`);
  }

  console.log("\nProvenance…\n");
  for (const row of rows) {
    process.stdout.write(`→ ${row.title.slice(0, 48)} … `);
    try {
      const story = await provenance(row.id, row.known_history);
      console.log(`ok (${story.length}c) /archive/${row.id}`);
    } catch (e) {
      console.log("FAIL", e.message || e);
    }
  }
  console.log("\nDone.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
