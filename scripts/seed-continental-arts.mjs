/**
 * Continental arts expansion — sculpture, masks, metalwork, beadwork
 * across Africa for Balogun Market NYC (same map logic as textiles).
 *
 *   node scripts/seed-continental-arts.mjs
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
 * CEO thesis: the archive must map Africa's art languages across regions —
 * West, Sahel, Central, East, Southern, Horn — so the world searches a
 * continent of makers, not a single ethnography.
 *
 * Sources: Wikimedia Commons OA + Cleveland Museum of Art Open Access.
 * Digital surrogates only — not physical museum transfers.
 */
const ARTS = [
  // WEST — Kingdom of Benin / Nigeria
  {
    region: "West Africa",
    key: "benin-bronzes-plaque",
    title: "Benin Bronze Plaque (Palace Relief Tradition)",
    maker: "Edo court brasscaster (name unrecorded)",
    origin: "Benin City, Kingdom of Benin (Nigeria)",
    era: "c. 16th–17th century (tradition); museum display photograph",
    medium: "Cast brass / bronze relief plaque",
    category: "art",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/be/Benin_Bronzes.jpg",
    credit: "Wikimedia Commons — Benin Bronzes.jpg (CC BY-SA 3.0)",
    known_history:
      "Benin plaques are cast brass reliefs made for the royal palace of the Kingdom of Benin (Edo). They depict court life, warriors, and ritual hierarchy and belong to the wider Benin bronze corpus. Many were looted in the 1897 British Punitive Expedition and are now dispersed in Western museums. Maker name unrecorded. Image: Wikimedia Commons CC BY-SA 3.0 (museum display photograph). Gaps: exact plaque identity, caster guild name, pre-1897 palace location; this digital surrogate is not a physical transfer.",
  },
  {
    region: "West Africa",
    key: "benin-commemorative-head",
    title: "Benin Ancestral Commemorative Head (Uhunmwun-elao)",
    maker: "Edo court brasscaster (name unrecorded)",
    origin: "Kingdom of Benin, Nigeria",
    era: "c. 18th–19th century (museum attribution ranges)",
    medium: "Cast brass commemorative head",
    category: "art",
    image: "https://openaccess-cdn.clevelandart.org/1938.6/1938.6_web.jpg",
    credit:
      "Cleveland Museum of Art Open Access — Ancestral Commemorative Head (uhunmwun-elao), 1938.6",
    known_history:
      "Uhunmwun-elao (ancestral commemorative heads) were cast for Benin royal ancestor altars. Cleveland Museum of Art Open Access object 1938.6. Maker unrecorded. Digital surrogate from CMA OA — not a physical transfer. Gaps: caster name, exact reign association, pre-museum ownership chain beyond museum credit.",
  },
  {
    region: "West Africa",
    key: "ife-head-king",
    title: "Ife Head of a King (Copper-Alloy)",
    maker: "Ife court sculptor (name unrecorded)",
    origin: "Ile-Ife, Nigeria (Yorùbá)",
    era: "c. 12th–15th century (tradition date range)",
    medium: "Copper-alloy cast head",
    category: "art",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/51/British_Museum_Room_25_Head_of_a_king_Ife_17022019_5147.jpg",
    credit:
      "Wikimedia Commons — British Museum Head of a king Ife (CC0)",
    known_history:
      "Naturalistic copper-alloy heads from Ile-Ife are among the most celebrated works of West African court sculpture, associated with Yorùbá sacred kingship. This photograph shows a British Museum display example. Sculptor unrecorded. Image: Wikimedia Commons CC0. Gaps: exact excavation/find context for the photographed object, maker name; digital surrogate only.",
  },
  {
    region: "West Africa",
    key: "gelede-mask-yoruba",
    title: "Gelede Mask (Yorùbá)",
    maker: "Yorùbá gelede carver (name unrecorded)",
    origin: "Yorùbáland, Nigeria / Benin Republic",
    era: "c. late 19th–20th century",
    medium: "Carved and painted wood mask",
    category: "art",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/f3/Mask%2C_Yoruba%2C_Gelede_-_Glenbow_Museum_-_DSC00322.JPG",
    credit:
      "Wikimedia Commons — Mask, Yoruba, Gelede - Glenbow Museum (CC0)",
    known_history:
      "Gelede masquerade honours 'our mothers' (awon iya wa) among the Yorùbá — carved headdresses worn in performance that satirise, teach, and celebrate social order. Carver unrecorded. Image: Glenbow Museum photograph on Wikimedia Commons (CC0). Gaps: village workshop, carver, performance lineage.",
  },
  {
    region: "West Africa",
    key: "nok-terracotta",
    title: "Nok Terracotta Figure",
    maker: "Nok culture sculptor (name unrecorded)",
    origin: "Central Nigeria (Nok culture region)",
    era: "c. 500 BCE–200 CE (Nok tradition range)",
    medium: "Fired terracotta sculpture",
    category: "art",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Erected_Nok_Terracotta.jpg",
    credit: "Wikimedia Commons — Erected Nok Terracotta.jpg (CC BY-SA 4.0)",
    known_history:
      "Nok terracottas from central Nigeria are among the earliest large-scale sculptural traditions in sub-Saharan Africa, known for stylised heads and tubular eyes. Most excavated pieces lack named makers; looting has also damaged archaeological context for many market pieces. Image: Wikimedia Commons CC BY-SA 4.0. Gaps: exact findspot, stratigraphic date for this figure, maker.",
  },
  {
    region: "West Africa",
    key: "akan-goldweight",
    title: "Akan Goldweight (Abrammoɔ)",
    maker: "Akan brasscaster (name unrecorded)",
    origin: "Ghana / Côte d'Ivoire (Akan)",
    era: "c. 18th–19th century (typical range)",
    medium: "Cast brass figurative goldweight",
    category: "object",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/11/Akan_Gold_Weight_MHNT_bovid_head.jpg",
    credit: "Wikimedia Commons — Akan Gold Weight MHNT bovid head.jpg (CC BY-SA 4.0)",
    known_history:
      "Akan goldweights (abrammoɔ) measured gold dust in market and court economies; figurative weights encode proverbs and social commentary. Caster unrecorded. Image: MHNT collection photograph on Wikimedia Commons CC BY-SA 4.0. Gaps: caster, exact Akan polity, proverb identification.",
  },
  {
    region: "West Africa",
    key: "akan-nsodie",
    title: "Akan Memorial Head (Nsodie)",
    maker: "Akan terracotta sculptor (name unrecorded)",
    origin: "Ghana (Akan)",
    era: "c. 17th–19th century (museum range)",
    medium: "Terracotta memorial head",
    category: "art",
    image: "https://openaccess-cdn.clevelandart.org/1990.22/1990.22_web.jpg",
    credit: "Cleveland Museum of Art Open Access — Memorial head (nsodie), 1990.22",
    known_history:
      "Nsodie are Akan terracotta memorial heads associated with royal and elite funerary commemorations. Cleveland Museum of Art OA 1990.22. Maker unrecorded. Digital surrogate — not a physical transfer. Gaps: exact Akan state, maker, full pre-museum chain.",
  },

  // SAHEL
  {
    region: "Sahel",
    key: "dogon-sculpture-louvre",
    title: "Dogon Standing Figure",
    maker: "Dogon sculptor (name unrecorded)",
    origin: "Mali (Dogon country)",
    era: "c. 16th–20th century (broad stylistic range)",
    medium: "Carved wood figure",
    category: "art",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/f9/Dogon_sculpture_Louvre_70-1999-9-2.jpg",
    credit: "Wikimedia Commons — Dogon sculpture Louvre 70-1999-9-2.jpg (Public domain)",
    known_history:
      "Dogon wood sculpture of the Bandiagara escarpment region of Mali includes ancestral and ritual figures with elongated forms. Louvre photograph on Wikimedia Commons (public domain). Sculptor unrecorded. Gaps: village atelier, ritual use, exact date.",
  },
  {
    region: "Sahel",
    key: "dogon-satimbe",
    title: "Dogon Satimbe Face Mask",
    maker: "Dogon mask carver (name unrecorded)",
    origin: "Mali (Dogon)",
    era: "c. early–mid 20th century",
    medium: "Carved wood face mask with female figure",
    category: "art",
    image: "https://openaccess-cdn.clevelandart.org/1960.169/1960.169_web.jpg",
    credit:
      "Cleveland Museum of Art Open Access — Face Mask with Female Figure (satimbe), 1960.169",
    known_history:
      "Satimbe masks of the Dogon include a female figure atop the face board and appear in dama and related performances. Cleveland Museum of Art OA 1960.169. Carver unrecorded. Digital surrogate — not a physical transfer. Gaps: village, carver, performance commission.",
  },

  // CENTRAL
  {
    region: "Central Africa",
    key: "fang-ngil",
    title: "Fang Ngil Mask (Gabon)",
    maker: "Fang carver (name unrecorded)",
    origin: "Gabon (Fang)",
    era: "c. late 19th–early 20th century",
    medium: "Carved and painted wood mask",
    category: "art",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/2/24/1224_0606_Ngil_Mask%2C_Fang_Gabon_%286604879767%29.jpg",
    credit: "Wikimedia Commons — Ngil Mask, Fang Gabon (CC BY 2.0)",
    known_history:
      "Ngil masks of the Fang (Gabon / Equatorial Guinea / Cameroon borderlands) are elongated white-faced masks associated with judicial and initiatory societies suppressed under colonial rule. Carver unrecorded. Image: Wikimedia Commons CC BY 2.0. Gaps: exact Fang subgroup, carver, pre-collection context.",
  },
  {
    region: "Central Africa",
    key: "chokwe-pwevo",
    title: "Chokwe Mask (Pwo / Related)",
    maker: "Chokwe carver (name unrecorded)",
    origin: "Angola / DRC / Zambia (Chokwe)",
    era: "c. early–mid 20th century",
    medium: "Carved wood mask",
    category: "art",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Angola%2C_chokwe%2C_maschera%2C_1900-50_ca.jpg/1280px-Angola%2C_chokwe%2C_maschera%2C_1900-50_ca.jpg",
    credit: "Wikimedia Commons — Angola, chokwe, maschera, 1900-50 ca.jpg (CC BY 3.0)",
    known_history:
      "Chokwe masks of Angola and neighbouring regions include female ideal types (often called pwo/pwevo) used in initiation and social performance. Carver unrecorded. Image: Wikimedia Commons CC BY 3.0. Gaps: exact mask type name confirmation, carver, village.",
  },
  {
    region: "Central Africa",
    key: "senufo-helmet-mask",
    title: "Senufo Helmet Mask",
    maker: "Senufo carver (name unrecorded)",
    origin: "Côte d'Ivoire / Mali / Burkina Faso (Senufo)",
    era: "c. early–mid 20th century",
    medium: "Carved wood helmet mask",
    category: "art",
    image: "https://openaccess-cdn.clevelandart.org/1975.152/1975.152_web.jpg",
    credit: "Cleveland Museum of Art Open Access — Helmet Mask, 1975.152",
    known_history:
      "Senufo helmet masks appear in poro and related initiation contexts across northern Côte d'Ivoire and neighbouring Sahelian zones. Cleveland Museum of Art OA 1975.152. Carver unrecorded. Digital surrogate — not a physical transfer. Gaps: exact Senufo subgroup, carver, performance use.",
  },
  {
    region: "Central Africa",
    key: "luba-staff",
    title: "Luba Staff of Office",
    maker: "Luba sculptor (name unrecorded)",
    origin: "Democratic Republic of the Congo (Luba)",
    era: "c. late 19th–early 20th century",
    medium: "Carved wood staff of office",
    category: "object",
    image: "https://openaccess-cdn.clevelandart.org/2004.85/2004.85_web.jpg",
    credit: "Cleveland Museum of Art Open Access — Staff of Office, 2004.85",
    known_history:
      "Luba staffs of office encode memory and political authority through carved female figures and mnemonic forms. Cleveland Museum of Art OA 2004.85. Sculptor unrecorded. Digital surrogate — not a physical transfer. Gaps: sculptor, court commission, full ownership chain.",
  },
  {
    region: "Central Africa",
    key: "bamileke-elephant-mask",
    title: "Bamileke Elephant Mask (Cameroon Grassfields)",
    maker: "Bamileke beadwork / mask maker (name unrecorded)",
    origin: "Cameroon Grassfields (Bamileke)",
    era: "c. early–mid 20th century",
    medium: "Cloth, beads, and fiber elephant mask",
    category: "art",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bamileke_Elephant_Mask.jpg/1280px-Bamileke_Elephant_Mask.jpg",
    credit: "Wikimedia Commons — Bamileke Elephant Mask.jpg (CC0)",
    known_history:
      "Bamileke elephant masks of the Cameroon Grassfields use cloth, beads, and fiber in elongated 'elephant' forms worn by prestige societies. Maker unrecorded. Image: Wikimedia Commons CC0. Gaps: kingdom workshop, maker, exact performance society.",
  },

  // EAST / HORN
  {
    region: "East Africa",
    key: "makonde-shetani",
    title: "Makonde Carved Figure",
    maker: "Makonde sculptor (name unrecorded)",
    origin: "Tanzania / Mozambique (Makonde)",
    era: "c. mid–late 20th century",
    medium: "Carved wood figure",
    category: "art",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Makonde_sculpture_Elephant.jpg/1280px-Makonde_sculpture_Elephant.jpg",
    credit: "Wikimedia Commons — Makonde sculpture Elephant.jpg (CC BY-SA 4.0)",
    known_history:
      "Makonde carving of Tanzania and Mozambique includes mid-20th-century modernist wood sculpture — elongated and interlocking forms, including shetani ('spirit') vocabularies — distinct from earlier lipico mask traditions. This photograph documents a Makonde carved figure. Sculptor unrecorded. Image: Wikimedia Commons CC BY-SA 4.0. Gaps: sculptor name, workshop town, year, exact motif reading.",
  },
  {
    region: "Horn of Africa",
    key: "ethiopian-processional-cross",
    title: "Ethiopian Processional Cross",
    maker: "Ethiopian metalworker (name unrecorded)",
    origin: "Ethiopia (Orthodox Christian tradition)",
    era: "c. 19th–20th century (typical range)",
    medium: "Cast and pierced metal processional cross",
    category: "object",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Brooklyn_Museum_2000.123.1_Processional_Cross_cropped.jpg/960px-Brooklyn_Museum_2000.123.1_Processional_Cross_cropped.jpg",
    credit:
      "Wikimedia Commons — Brooklyn Museum 2000.123.1 Processional Cross cropped.jpg (CC BY-SA 4.0)",
    known_history:
      "Ethiopian processional crosses are carried in Orthodox liturgy; lattice and interlace designs vary by period and region. Metalworker unrecorded. Image: Brooklyn Museum object photograph on Wikimedia Commons CC BY-SA 4.0. Gaps: maker, church commission, exact date.",
  },

  // SOUTHERN
  {
    region: "Southern Africa",
    key: "zulu-umphapheni",
    title: "Zulu Beaded Neckpiece (Umphapheni)",
    maker: "Zulu beadworker (name unrecorded)",
    origin: "South Africa (Zulu)",
    era: "c. late 19th–early 20th century",
    medium: "Glass beadwork neckpiece with panel",
    category: "object",
    image: "https://openaccess-cdn.clevelandart.org/2010.207/2010.207_web.jpg",
    credit:
      "Cleveland Museum of Art Open Access — Neckpiece with panel (umphapheni), 2010.207",
    known_history:
      "Zulu beadwork encodes colour languages of courtship, status, and regional style; umphapheni-type neckpieces with panels are prestige personal adornment. Cleveland Museum of Art OA 2010.207. Beadworker unrecorded. Digital surrogate — not a physical transfer. Gaps: beadworker, exact region within Zululand, colour-message reading.",
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
    headers: { "User-Agent": "AsaArchive/0.1 (educational continental arts seed)" },
  });
  if (!res.ok) throw new Error(`download ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function upload(key, bytes) {
  const path = `seed/continental-art-${key}.jpg`;
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

async function insert(a, imageUrl) {
  const body = {
    title: a.title,
    maker: a.maker,
    origin: a.origin,
    era: a.era,
    medium: a.medium,
    category: a.category,
    acquisition_note: `Continental arts map exemplar (${a.region}). Digital surrogate: ${a.credit}. Not a physical museum transfer.`,
    image_url: imageUrl,
    image_alt: `${a.title} — ${a.origin}`,
    provenance_verified: false,
    metadata: {
      source: "continental_arts_map_v1",
      region: a.region,
      known_history: a.known_history,
      credit: a.credit,
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
  console.log("Balogun Market NYC Continental Arts Map");
  console.log("Regions: West · Sahel · Central · East · Horn · Southern\n");
  console.log(`Seeding ${ARTS.length} exemplars…\n`);

  let ok = 0;
  for (const a of ARTS) {
    if (await existsTitle(a.title)) {
      console.log(`· skip (exists)  ${a.title}`);
      continue;
    }
    process.stdout.write(`→ [${a.region}] ${a.title} … `);
    try {
      const bytes = await download(a.image);
      const url = await upload(a.key, bytes);
      const id = await insert(a, url);
      const story = await provenance(id, a.known_history);
      console.log(`ok ${story.length}c`);
      ok++;
    } catch (e) {
      console.log(`FAIL ${e.message || e}`);
    }
  }
  console.log(
    `\nAdded ${ok} arts. Search: Benin bronze, Ife head, Gelede, Dogon, Fang, Chokwe, Makonde, Nok, Akan goldweight…`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
