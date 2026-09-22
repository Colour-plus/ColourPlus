import "dotenv/config";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

const SOURCE_BASE =
  "https://www.colourpluscoatings.com/images/clients/";

/*
|--------------------------------------------------------------------------
| FRONTEND CLIENT LOGOS
|--------------------------------------------------------------------------
|
| These are exactly the logo ranges currently used by:
| app/clients/page.tsx
|
| Main clients:
| c1.webp → c102.webp
|
| Automotive:
| c103.webp → c124.webp
|
| Pharma & Food:
| c45.webp → c60.webp
|
| IMPORTANT:
| c45-c60 already exist inside c1-c102.
| We therefore do NOT create duplicate database records.
|
|--------------------------------------------------------------------------
*/

const logoIds = [
  ...Array.from({ length: 102 }, (_, index) => index + 1),
  ...Array.from({ length: 22 }, (_, index) => index + 103),
];

/*
|--------------------------------------------------------------------------
| VERIFIED CLIENT NAMES
|--------------------------------------------------------------------------
|
| Only use names that have already been verified.
|
*/

const VERIFIED_CLIENTS = {
  1: {
    name: "Chromeni Steels",
    sector: "Industrial",
  },

  2: {
    name: "Jindal Steel & Power",
    sector: "Industrial",
  },

  3: {
    name: "L&T Metro Rail Hyderabad",
    sector: "Infrastructure",
  },

  4: {
    name: "Power Grid",
    sector: "Infrastructure",
  },
};

/*
|--------------------------------------------------------------------------
| SECTOR
|--------------------------------------------------------------------------
*/

function getSector(id) {
  /*
   * Automotive logos from the frontend.
   */
  if (id >= 103 && id <= 124) {
    return "Automotive";
  }

  /*
   * Pharma & Food logos from the frontend.
   *
   * These IDs are also inside the main client collection.
   * We keep their sector classification here.
   */
  if (id >= 45 && id <= 60) {
    return "Pharma & Food";
  }

  /*
   * Other frontend client logos.
   */
  return VERIFIED_CLIENTS[id]?.sector || "General";
}

/*
|--------------------------------------------------------------------------
| CLIENT NAME
|--------------------------------------------------------------------------
*/

function getClientName(id) {
  if (VERIFIED_CLIENTS[id]) {
    return VERIFIED_CLIENTS[id].name;
  }

  /*
   * We deliberately do not invent company names.
   *
   * The frontend/source gives us the logo filename,
   * but not a verified company name for every logo.
   */
  return `Client Logo C${String(id).padStart(2, "0")}`;
}

/*
|--------------------------------------------------------------------------
| CHECK WHETHER LOGO EXISTS
|--------------------------------------------------------------------------
*/

async function logoExists(url) {
  try {
    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, 10000);

    const response = await fetch(url, {
      method: "GET",
      signal: controller.signal,
    });

    clearTimeout(timeout);

    return response.ok;
  } catch {
    return false;
  }
}

/*
|--------------------------------------------------------------------------
| MAIN SEED
|--------------------------------------------------------------------------
*/

async function seed() {
  console.log("");
  console.log("==========================================");
  console.log(" COLOURPLUS FRONTEND CLIENT IMPORT");
  console.log("==========================================");
  console.log("");

  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL is missing from your .env file."
    );
  }

  /*
   * Remove duplicate IDs just in case.
   */
  const uniqueLogoIds = [
    ...new Set(logoIds),
  ];

  console.log(
    `Frontend client logo references: ${uniqueLogoIds.length}`
  );

  console.log("");
  console.log("Checking logos...");
  console.log("");

  const availableClients = [];

  for (const id of uniqueLogoIds) {
    const logo =
      `${SOURCE_BASE}c${id}.webp`;

    process.stdout.write(
      `C${String(id).padStart(3, "0")} ... `
    );

    const exists =
      await logoExists(logo);

    if (!exists) {
      console.log("not found");
      continue;
    }

    const client = {
      sourceId: id,
      name: getClientName(id),
      logo,
      sector: getSector(id),
      sortOrder: id,
    };

    availableClients.push(client);

    console.log(
      `found → ${client.name} [${client.sector}]`
    );
  }

  console.log("");
  console.log(
    `Available frontend logos: ${availableClients.length}`
  );

  console.log("");
  console.log("Updating database...");
  console.log("");

  let created = 0;
  let updated = 0;

  for (const client of availableClients) {
    /*
     * First try to find by exact source logo URL.
     *
     * This prevents duplicate records if the script
     * is executed more than once.
     */
    const existingByLogo = await sql`
      SELECT "id"
      FROM "client"
      WHERE "logo" = ${client.logo}
      LIMIT 1
    `;

    if (existingByLogo.length > 0) {
      await sql`
        UPDATE "client"
        SET
          "name" = ${client.name},
          "sector" = ${client.sector},
          "isActive" = true,
          "sortOrder" = ${client.sortOrder},
          "updatedAt" = NOW()
        WHERE "id" = ${existingByLogo[0].id}
      `;

      updated++;

      console.log(
        `Updated: ${client.name}`
      );

      continue;
    }

    /*
     * If there is no matching logo, check whether
     * the verified company name already exists.
     */
    const existingByName = await sql`
      SELECT "id"
      FROM "client"
      WHERE LOWER("name") = LOWER(${client.name})
      LIMIT 1
    `;

    if (existingByName.length > 0) {
      await sql`
        UPDATE "client"
        SET
          "logo" = ${client.logo},
          "sector" = ${client.sector},
          "isActive" = true,
          "sortOrder" = ${client.sortOrder},
          "updatedAt" = NOW()
        WHERE "id" = ${existingByName[0].id}
      `;

      updated++;

      console.log(
        `Updated: ${client.name}`
      );

      continue;
    }

    /*
     * Create new client.
     */
    await sql`
      INSERT INTO "client" (
        "name",
        "logo",
        "sector",
        "isActive",
        "sortOrder",
        "createdAt",
        "updatedAt"
      )
      VALUES (
        ${client.name},
        ${client.logo},
        ${client.sector},
        true,
        ${client.sortOrder},
        NOW(),
        NOW()
      )
    `;

    created++;

    console.log(
      `Created: ${client.name}`
    );
  }

  console.log("");
  console.log("==========================================");
  console.log(" CLIENT IMPORT COMPLETE");
  console.log("==========================================");
  console.log(
    `Frontend logo references : ${uniqueLogoIds.length}`
  );
  console.log(
    `Available logos          : ${availableClients.length}`
  );
  console.log(
    `Created                  : ${created}`
  );
  console.log(
    `Updated                  : ${updated}`
  );
  console.log("==========================================");
  console.log("");
}

seed().catch((error) => {
  console.error("");
  console.error("CLIENT SEED ERROR:");
  console.error(error);
  console.error("");

  process.exit(1);
});