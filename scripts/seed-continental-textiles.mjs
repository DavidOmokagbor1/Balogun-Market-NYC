/**
 * Continental textile expansion — Africa-wide coverage for Àṣà Archive.
 *
 *   node scripts/seed-continental-textiles.mjs
 * Requires: .env.local + dev server on :3000 (for /api/provenance).
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

/**
 * CEO thesis: the archive must map Africa's textile languages across
 * regions — West, Sahel, Central, East, Southern, North, Indian Ocean —
 * so the world searches a continent, not a single market.
 */
const TEXTILES = [
  // WEST
  {
    region: "West Africa",
    key: "adire-nigeria",
    title: "Adire Indigo Resist Cloth",
    maker: "Yorùbá adire artisan (name unrecorded)",
    origin: "Southwestern Nigeria (Yorùbáland)",
    era: "c. late 20th–early 21st century",
    medium: "Indigo resist-dyed cotton (adire)",
    category: "textile",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Adire_clothes.jpg/1920px-Adire_clothes.jpg",
    credit: "Wikimedia Commons — Adire clothes.jpg (CC BY-SA 4.0)",
    known_history:
      "Adire is the Yorùbá indigo resist-dye tradition of southwestern Nigeria — starch (eleko), tie-dye, and related resist methods produce patterned cloth against deep indigo. Historic centres include Abeokuta and surrounding Yorùbá towns; skill is transmitted through workshops and family lines, often led by women. This length is contemporary market adire. Maker unrecorded. Image: Wikimedia Commons CC BY-SA 4.0. Gaps: exact workshop, dyer name, year.",
  },
  {
    region: "West Africa",
    key: "kente-ewe-ghana",
    title: "Ewe Kente Cloth (Volta Region)",
    maker: "Ewe weaver (name unrecorded)",
    origin: "Volta Region, Ghana",
    era: "c. late 20th century",
    medium: "Handwoven narrow-strip kente (silk and cotton)",
    category: "textile",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Ewe_kente_2%2C_Ghana.JPG/1920px-Ewe_kente_2%2C_Ghana.JPG",
    credit: "Wikimedia Commons — Ewe kente 2, Ghana.JPG (CC BY-SA 3.0)",
    known_history:
      "Ewe kente of Ghana's Volta Region is strip-woven on narrow looms then sewn into cloth — related to Asante kente but with its own figurative and proverb-linked weft vocabularies. Weaver unrecorded. Image: Wikimedia Commons CC BY-SA 3.0. Gaps: weaver, village, commission context.",
  },
  {
    region: "West Africa",
    key: "aso-oke-nigeria",
    title: "Aso-Oke Prestige Strip Cloth",
    maker: "Yorùbá aso-oke weaver (name unrecorded)",
    origin: "Yorùbáland, Nigeria",
    era: "c. late 20th–early 21st century",
    medium: "Handwoven aso-oke (strip-woven cotton, silk, or lurex)",
    category: "textile",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Aso-Oke.jpg/1920px-Aso-Oke.jpg",
    credit: "Wikimedia Commons — Aso-Oke.jpg (CC BY-SA 4.0)",
    known_history:
      "Aso-oke ('top cloth') is Yorùbá prestige strip-weave from centres such as Iseyin and Ilorin, sewn into ceremonial wrappers and agbada. Metallic lurex appears in many later market lengths. Weaver unrecorded. Image: Wikimedia Commons CC BY-SA 4.0. Gaps: weaver, loom town, exact year.",
  },
  {
    region: "West Africa",
    key: "ndop-cameroon",
    title: "Ndop Resist-Dyed Boubou Cloth (Cameroon)",
    maker: "Cameroonian ndop artisan (name unrecorded)",
    origin: "Cameroon (Grassfields / related ndop traditions)",
    era: "c. late 20th–early 21st century",
    medium: "Indigo resist-dyed cotton (ndop), tailored as boubou",
    category: "fashion",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Boubou_en_ndop.jpg/1920px-Boubou_en_ndop.jpg",
    credit: "Wikimedia Commons — Boubou en ndop.jpg (CC BY-SA 4.0)",
    known_history:
      "Ndop is a resist-dyed indigo cloth associated with Cameroonian Grassfields prestige dress, often seen in boubou and ceremonial garments with geometric resist reserves. This example is photographed as a boubou in ndop cloth. Maker unrecorded. Image: Wikimedia Commons CC BY-SA 4.0. Gaps: artisan, kingdom workshop, exact date.",
  },

  // SAHEL
  {
    region: "Sahel",
    key: "bogolanfini-mali",
    title: "Bògòlanfini Mud Cloth (Mali)",
    maker: "Bamana bògòlanfini artist (name unrecorded)",
    origin: "Mali (Bamana mud-cloth tradition)",
    era: "c. late 20th century",
    medium: "Handwoven cotton with fermented mud dye (bògòlanfini)",
    category: "textile",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/BogolanMali4.JPG/1920px-BogolanMali4.JPG",
    credit: "Wikimedia Commons — BogolanMali4.JPG (CC BY-SA 3.0)",
    known_history:
      "Bògòlanfini (mud cloth) of Mali is cotton cloth patterned with fermented mud dyes and plant fixatives; motifs are taught within Bamana and related ateliers and carry social and ritual meanings. This panel is documented Malian bogolan. Artist unrecorded. Image: Wikimedia Commons CC BY-SA 3.0. Gaps: artist, village atelier, exact year.",
  },

  // CENTRAL
  {
    region: "Central Africa",
    key: "kuba-raffia-drc",
    title: "Kuba Raffia Prestige Cloth",
    maker: "Kuba raffia artist (name unrecorded)",
    origin: "Democratic Republic of the Congo (Kuba)",
    era: "c. early 20th century",
    medium: "Raffia palm fiber, cut-pile embroidery",
    category: "textile",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/ad/Brooklyn_Museum_22.553_Raffia_Cloth_%282%29.jpg",
    credit:
      "Wikimedia Commons — Brooklyn Museum 22.553 Raffia Cloth (CC BY 3.0)",
    known_history:
      "Kuba raffia cloth is woven from raffia palm; prestige panels carry cut-pile embroidery in interlocking geometries linked to Kuba title and court aesthetics in Central Africa. Men historically wove; women embroidered. Artist unrecorded. Image: Wikimedia Commons museum release. Gaps: workshop, embroiderer, first collection date.",
  },

  // EAST
  {
    region: "East Africa",
    key: "kikoi-kenya",
    title: "Kikoi / Shuka Wrap Cloth",
    maker: "East African textile workshop (name unrecorded)",
    origin: "Kenya / Tanzania",
    era: "c. early 21st century",
    medium: "Woven cotton wrap (kikoi / shuka)",
    category: "textile",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Colorful_Kikoi_Shukas.jpg/1920px-Colorful_Kikoi_Shukas.jpg",
    credit: "Wikimedia Commons — Colorful Kikoi Shukas.jpg (CC BY-SA 4.0)",
    known_history:
      "Kikoi wraps of the Kenyan/Tanzanian coast and related shuka cloths of highland East Africa are striped or checked cotton wraps for everyday and ceremonial wear. Machine and handloom versions circulate regionally. Maker unrecorded. Image: Wikimedia Commons CC BY-SA 4.0. Gaps: mill or loom, exact country of weave.",
  },
  {
    region: "East Africa",
    key: "kanga-east-africa",
    title: "Kanga Printed Cloth (East Africa)",
    maker: "East African kanga printer (name unrecorded)",
    origin: "Kenya / Tanzania (Swahili coast kanga tradition)",
    era: "c. late 20th–early 21st century",
    medium: "Factory-printed cotton kanga with border and central field",
    category: "textile",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Cloth-roll.jpg/1920px-Cloth-roll.jpg",
    credit: "Wikimedia Commons — Cloth-roll.jpg (CC BY-SA 4.0)",
    known_history:
      "Kanga are rectangular printed cotton cloths of the Swahili coast — Kenya, Tanzania, and related markets — typically with a wide border (pindo), central field (mji), and often a proverb (jina) printed in Kiswahili. Worn in pairs by women as wrap dress. Printer and proverb for this roll are not verified from the file alone; catalogued within the East African printed-wrap tradition. Image: Wikimedia Commons CC BY-SA 4.0. Gaps: printer, proverb text, exact year.",
  },
  {
    region: "East Africa",
    key: "barkcloth-uganda",
    title: "Barkcloth (Mutuba) — Uganda",
    maker: "Ugandan barkcloth maker (name unrecorded)",
    origin: "Uganda (Buganda / Great Lakes)",
    era: "c. late 20th–early 21st century",
    medium: "Beaten bark fiber of the mutuba (Ficus natalensis)",
    category: "textile",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Bark_cloth_inside_Igongo_Cultural_Centre_Museum.jpg/1920px-Bark_cloth_inside_Igongo_Cultural_Centre_Museum.jpg",
    credit:
      "Wikimedia Commons — Bark cloth inside Igongo Cultural Centre Museum.jpg (CC BY-SA 4.0)",
    known_history:
      "Ugandan barkcloth is beaten from the inner bark of the mutuba fig — a UNESCO-recognized practice especially associated with Buganda, used historically for royal and ritual dress. Photographed at Igongo Cultural Centre Museum. Maker unrecorded. Image: Wikimedia Commons CC BY-SA 4.0. Gaps: maker, forest source, year.",
  },

  // SOUTHERN
  {
    region: "Southern Africa",
    key: "shweshwe-sa",
    title: "Shweshwe Printed Cotton (South Africa)",
    maker: "South African shweshwe industrial printer (tradition of Da Gama and related mills)",
    origin: "South Africa",
    era: "c. late 20th–early 21st century",
    medium: "Indigo discharge-printed cotton (isishweshwe)",
    category: "textile",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Blue_shweshwe.jpg/1920px-Blue_shweshwe.jpg",
    credit: "Wikimedia Commons — Blue shweshwe.jpg (CC BY-SA 3.0)",
    known_history:
      "Shweshwe (isishweshwe) is finely printed cotton central to Southern African dress among Sotho, Xhosa, Zulu and related communities. Indigo discharge prints were historically imported and are now strongly identified with South African industrial production. Exact mill stamp not read from this photograph. Image: Wikimedia Commons CC BY-SA 3.0. Gaps: mill confirmation, design number.",
  },

  // NORTH
  {
    region: "North Africa",
    key: "berber-carpet-morocco",
    title: "Amazigh (Berber) Carpet — Morocco",
    maker: "Amazigh weaver (name unrecorded)",
    origin: "Morocco (Amazigh / Berber weaving tradition)",
    era: "c. 20th century",
    medium: "Handwoven wool pile or flatweave carpet",
    category: "textile",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/2/23/Berber_carpet_from_Morocco.jpg",
    credit: "Wikimedia Commons — Berber carpet from Morocco.jpg (Public domain)",
    known_history:
      "Amazigh (Berber) carpets of Morocco are handwoven wool textiles — pile and flatweave — with geometric fields that vary by region (Middle Atlas, High Atlas, and others). Weaving is often women's work within tribal and village economies. Weaver and exact tribal attribution unrecorded for this piece. Image: Wikimedia Commons public domain. Gaps: weaver, tribe/region within Morocco, exact date.",
  },

  // INDIAN OCEAN
  {
    region: "Indian Ocean Africa",
    key: "lambahoany-madagascar",
    title: "Lambahoany Printed Lamba — Madagascar",
    maker: "Malagasy textile printer (name unrecorded)",
    origin: "Madagascar",
    era: "c. late 20th century",
    medium: "Factory-printed cotton lamba (lambahoany)",
    category: "textile",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Lamba_of_Madagascar_-_detail_lambahoany.jpg/1920px-Lamba_of_Madagascar_-_detail_lambahoany.jpg",
    credit:
      "Wikimedia Commons — Lamba of Madagascar - detail lambahoany.jpg (CC BY 3.0)",
    known_history:
      "Lambahoany are printed cotton lamba of Madagascar, often carrying figurative scenes and proverb texts — distinct from highland handwoven silk lamba. Everyday and ceremonial wraps. Printer unrecorded. Image: Wikimedia Commons CC BY 3.0. Gaps: printer, proverb translation, year.",
  },
];

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

async function download(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "AsaArchive/0.1 (educational continental seed)" },
  });
  if (!res.ok) throw new Error(`download ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function upload(key, bytes) {
  const path = `seed/continental-${key}.jpg`;
  const uploadUrl = `${SUPABASE_URL}/storage/v1/object/artifacts/${path}`;
  for (const method of ["POST", "PUT"]) {
    const res = await fetch(uploadUrl, {
      method,
      headers: {
        Authorization: `Bearer ${SERVICE_KEY}`,
        apikey: SERVICE_KEY,
        "Content-Type": "image/jpeg",
        "x-upsert": "true",
      },
      body: bytes,
    });
    if (res.ok) {
      return `${SUPABASE_URL}/storage/v1/object/public/artifacts/${path}`;
    }
    if (method === "PUT") throw new Error(`upload ${res.status} ${await res.text()}`);
  }
}

async function existsTitle(title) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/artifacts?title=eq.${encodeURIComponent(title)}&select=id`,
    { headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` } }
  );
  const rows = await res.json();
  return Array.isArray(rows) && rows.length > 0;
}

async function insert(t, imageUrl) {
  const body = {
    title: t.title,
    maker: t.maker,
    origin: t.origin,
    era: t.era,
    medium: t.medium,
    category: t.category,
    acquisition_note: `Continental textile map exemplar (${t.region}). Digital surrogate: ${t.credit}. Not a physical museum transfer.`,
    image_url: imageUrl,
    image_alt: `${t.title} — ${t.origin}`,
    provenance_verified: false,
    metadata: {
      source: "continental_textile_map_v1",
      region: t.region,
      known_history: t.known_history,
      credit: t.credit,
    },
  };
  const res = await fetch(`${SUPABASE_URL}/rest/v1/artifacts`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`insert ${res.status} ${await res.text()}`);
  const [row] = await res.json();
  return row.id;
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
  console.log("Àṣà Continental Textile Map");
  console.log("Regions: West · Sahel · Central · East · Southern · North · Indian Ocean\n");
  console.log(`Seeding ${TEXTILES.length} exemplars…\n`);

  let ok = 0;
  for (const t of TEXTILES) {
    if (await existsTitle(t.title)) {
      console.log(`· skip (exists)  ${t.title}`);
      continue;
    }
    process.stdout.write(`→ [${t.region}] ${t.title} … `);
    try {
      const bytes = await download(t.image);
      const url = await upload(t.key, bytes);
      const id = await insert(t, url);
      const story = await provenance(id, t.known_history);
      console.log(`ok ${story.length}c`);
      ok++;
    } catch (e) {
      console.log(`FAIL ${e.message || e}`);
    }
  }
  console.log(`\nAdded ${ok} textiles. Search the map: adire, kente, bogolan, kanga, shweshwe, berber…`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
