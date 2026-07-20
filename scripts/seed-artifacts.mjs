/**
 * Seed Àṣà Archive with a small curated collection, then generate
 * provenance narratives via the running Next.js /api/provenance route.
 *
 * Usage (dev server must be running on :3000):
 *   node scripts/seed-artifacts.mjs
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnvLocal() {
  const path = resolve(__dirname, "../.env.local");
  const env = {};
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    env[t.slice(0, i)] = t.slice(i + 1);
  }
  return env;
}

const env = loadEnvLocal();
const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;
const APP_URL = process.env.APP_URL || "http://localhost:3000";

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("Missing Supabase env in .env.local");
  process.exit(1);
}

const headers = {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

/**
 * Each entry: catalog fields + known_history (verified archivist notes).
 * Images: Unsplash stand-ins until Storage uploads replace them.
 * known_history is the ONLY free-text Claude may expand — keep it factual.
 */
const SEEDS = [
  {
    title: "Adire Eleko Wrapper Cloth",
    maker: "Unknown maker",
    origin: "Abeokuta, Nigeria",
    era: "c. 1970s",
    medium: "Hand-dyed adire eleko on cotton",
    category: "textile",
    acquisition_note:
      "Gifted to the archive by a Lagos-based collector family, 2024. Previously held in private domestic use in Abeokuta.",
    image_url:
      "https://images.unsplash.com/photo-1578509566163-068acd11b8e7?w=800&h=1000&fit=crop&auto=format",
    image_alt: "Indigo adire eleko patterned cotton wrapper cloth",
    known_history: [
      "Yoruba adire eleko: cassava-starch resist drawn by hand, then indigo-dyed.",
      "Attributed to Abeokuta dye practice of the 1970s based on paste-line density and indigo depth; no workshop stamp or signed maker mark.",
      "Used as a woman's wrapper (iro) in domestic and ceremonial dress, per the donor family's oral account.",
      "Donor: private family collection, Abeokuta → Lagos; gifted 2024. No prior exhibition record in the accompanying papers.",
      "Gaps: dyer's name, exact year, and earlier ownership before the donor family are unrecorded.",
    ].join(" "),
  },
  {
    title: "Kente Strip Cloth (Oyokoman)",
    maker: "Asante weaver (name unrecorded)",
    origin: "Bonwire, Ghana",
    era: "c. 1960s–1970s",
    medium: "Handwoven silk and cotton kente strips, sewn into cloth",
    category: "textile",
    acquisition_note:
      "Purchased from a Kumasi textile dealer for the archive founding collection, 2025.",
    image_url:
      "https://images.unsplash.com/photo-1713845784497-fe3d7ed176d8?w=800&h=1000&fit=crop&auto=format",
    image_alt: "Asante kente cloth with gold and crimson strip patterning",
    known_history: [
      "Asante kente woven on a narrow double-heddle loom in strip format, then sewn selvedge-to-selvedge.",
      "Palette and geometry consistent with oyokoman-associated color language (gold, crimson, green, navy) as identified by the Kumasi dealer; not a royal commission on paper.",
      "Attributed to Bonwire-area production mid-to-late 20th century by the dealer; no weaver's name on the cloth.",
      "Acquired 2025 from a Kumasi textile dealer; prior owners not documented beyond the dealer's stock.",
      "Gaps: weaver identity, exact year, and any chieftaincy or ceremonial use remain unverified.",
    ].join(" "),
  },
  {
    title: "Bògòlanfini Mud Cloth Panel",
    maker: "Unknown Bamana artist",
    origin: "Ségou region, Mali",
    era: "c. 1980s",
    medium: "Handwoven cotton with fermented mud dye (bògòlanfini)",
    category: "textile",
    acquisition_note:
      "Transferred from a Bamako cultural NGO partner collection, 2025.",
    image_url:
      "https://images.unsplash.com/photo-1552710307-537199cd41c0?w=800&h=1000&fit=crop&auto=format",
    image_alt: "Bamana bògòlanfini mud-dyed cotton panel with geometric motifs",
    known_history: [
      "Bamana bògòlanfini: cotton cloth patterned with fermented mud dyes and plant fixatives; motifs traditionally taught within family and community ateliers.",
      "Ségou-region attribution based on motif vocabulary and dye tone per the NGO's catalog card; artist name not listed.",
      "Held by a Bamako cultural NGO before transfer to Àṣà Archive in 2025; card notes domestic and ceremonial textile use without a named wearer.",
      "Gaps: artist name, exact village workshop, and continuous ownership chain before the NGO are unknown.",
    ].join(" "),
  },
  {
    title: "Aso-Oke Agbada Ensemble (Incomplete)",
    maker: "Unknown Yoruba weaver",
    origin: "Ilorin, Nigeria",
    era: "c. 1990s",
    medium: "Handwoven aso-oke (strip-woven silk and cotton), tailored agbada",
    category: "fashion",
    acquisition_note:
      "Donated by the wearer's nephew after the owner's death, Ibadan, 2023.",
    image_url:
      "https://images.unsplash.com/photo-1664662566408-ef40c502a66b?w=800&h=1000&fit=crop&auto=format",
    image_alt: "Yoruba aso-oke agbada with metallic strip accents",
    known_history: [
      "Yoruba aso-oke strip weave tailored as an agbada (flowing men's gown); fila (cap) and buba not present in this accession.",
      "Ilorin weaving attribution from the donor's family memory; weaver not named.",
      "Worn by the donor's uncle at naming and wedding ceremonies in Ibadan through the 1990s–2000s, per oral history recorded at donation.",
      "Donated 2023 by the nephew after the uncle's death; family retained related pieces.",
      "Gaps: weaver, tailor, and exact commission date unknown.",
    ].join(" "),
  },
  {
    title: "Lagos Night Market — Colour Negative Series",
    maker: "Unknown photographer",
    origin: "Lagos, Nigeria",
    era: "c. 1990s",
    medium: "Colour negative photography (digitized print)",
    category: "photography",
    acquisition_note:
      "Digitized from a family photo album lent for scanning; physical negatives remain with the family.",
    image_url:
      "https://images.unsplash.com/photo-1707914883484-03115dea98fb?w=800&h=1000&fit=crop&auto=format",
    image_alt: "Night street scene suggestive of Lagos market photography",
    known_history: [
      "Street and market scenes of Lagos nightlife attributed to the mid-1990s by the family's dating of the album.",
      "Photographer unidentified; album captions name places (Balogun / Idumota area) but no byline.",
      "Archive holds a digitized surrogate only; family retains the negatives and album.",
      "Gaps: photographer identity, exact dates, and whether images were ever published commercially.",
    ].join(" "),
  },
  {
    title: "Ankara Wax-Print Day Dress",
    maker: "Unknown atelier",
    origin: "Accra, Ghana",
    era: "c. 2010s",
    medium: "Machine-sewn dress in Dutch/West African wax-print cotton",
    category: "fashion",
    acquisition_note:
      "Purchased from a Kaneshie market seamstress stall for the contemporary fashion series, 2024.",
    image_url:
      "https://images.unsplash.com/photo-1659522761084-79196b64abe4?w=800&h=1000&fit=crop&auto=format",
    image_alt: "Wax-print day dress in bold geometric pattern",
    known_history: [
      "Ready-to-wear day dress in wax-print cotton, cut and finished by a Kaneshie market seamstress (name not recorded on the receipt).",
      "Cloth brand mark partially illegible; pattern language consistent with Accra market stock of the 2010s.",
      "Acquired new from the stall in 2024; no prior wearer.",
      "Gaps: seamstress name, cloth manufacturer batch, and designer attribution (none claimed).",
    ].join(" "),
  },
  {
    title: "Beaded Coronet (Yoruba Style)",
    maker: "Unknown bead artist",
    origin: "Ile-Ife / Yoruba region, Nigeria",
    era: "c. mid-20th century",
    medium: "Glass seed beads on fabric and cane frame",
    category: "object",
    acquisition_note:
      "On long-term loan from a private Nigerian collector; loan agreement 2025.",
    image_url:
      "https://images.unsplash.com/photo-1571375814199-4072612351aa?w=800&h=1000&fit=crop&auto=format",
    image_alt: "Beaded Yoruba-style coronet with dense polychrome surface",
    known_history: [
      "Beaded coronet in Yoruba court-associated form; glass seed beads on a shaped frame.",
      "Regional attribution (Ile-Ife / broader Yoruba) from the collector's notes; not verified by a palace inventory.",
      "Collector states mid-20th-century make; no artist name or commissioning Oba recorded in the loan file.",
      "Long-term loan to Àṣà Archive, 2025; ownership remains with the private collector.",
      "Gaps: maker, commissioning authority, and continuous custody before the present collector are undocumented.",
    ].join(" "),
  },
  {
    title: "Studio Portrait — Dakar Tailoring Client",
    maker: "Studio photographer (stamp illegible)",
    origin: "Dakar, Senegal",
    era: "c. 1970s",
    medium: "Black-and-white studio photograph, gelatin silver print",
    category: "photography",
    acquisition_note:
      "Purchased from a Dakar flea-market dealer of studio archives, 2025.",
    image_url:
      "https://images.unsplash.com/photo-1539701938214-0d9736e1c16b?w=800&h=1000&fit=crop&auto=format",
    image_alt: "Studio portrait of a sitter in tailored West African dress",
    known_history: [
      "Formal studio portrait; sitter wears tailored ensemble consistent with Dakar fashion of the 1970s.",
      "Studio stamp on verso is partially abraded; city of Dakar legible, studio name not.",
      "Acquired 2025 from a flea-market dealer specializing in orphaned studio archives; no named sitter.",
      "Gaps: photographer, sitter, and exact studio identity remain unknown.",
    ].join(" "),
  },
];

async function clearCollection() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/artifacts?id=neq.00000000-0000-0000-0000-000000000000`, {
    method: "DELETE",
    headers: { ...headers, Prefer: "return=minimal" },
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Failed to clear artifacts: ${res.status} ${t}`);
  }
  console.log("Cleared existing artifacts.");
}

async function insertSeed(seed) {
  const { known_history, ...row } = seed;
  const body = {
    ...row,
    provenance_story: null,
    provenance_verified: false,
    metadata: {
      known_history,
      source: "seed_v1",
    },
  };
  const res = await fetch(`${SUPABASE_URL}/rest/v1/artifacts`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`Insert failed for ${seed.title}: ${res.status} ${await res.text()}`);
  }
  const [rowOut] = await res.json();
  return { id: rowOut.id, title: seed.title, known_history };
}

async function writeProvenance(id, known_history) {
  const res = await fetch(`${APP_URL}/api/provenance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ artifactId: id, known_history }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Provenance failed for ${id}: ${JSON.stringify(data)}`);
  }
  return data.provenance_story;
}

async function main() {
  console.log(`Seeding ${SEEDS.length} artifacts via ${SUPABASE_URL.replace(/https:\/\//, "")}…`);
  console.log(`Provenance via ${APP_URL}/api/provenance\n`);

  await clearCollection();

  const inserted = [];
  for (const seed of SEEDS) {
    const row = await insertSeed(seed);
    inserted.push(row);
    console.log(`+ inserted  ${row.title}`);
  }

  console.log("\nGenerating provenance narratives…\n");
  for (const row of inserted) {
    process.stdout.write(`→ Claude  ${row.title} … `);
    try {
      const story = await writeProvenance(row.id, row.known_history);
      const preview = story.slice(0, 90).replace(/\s+/g, " ");
      console.log(`ok (${story.length} chars) — ${preview}…`);
      console.log(`   /archive/${row.id}`);
    } catch (err) {
      console.log(`FAIL`);
      console.error(err.message || err);
    }
  }

  console.log(`\nDone. ${inserted.length} artifacts in the collection.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
