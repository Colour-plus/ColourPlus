import "dotenv/config";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

const systems = [
  {
    name: "Epoxy Floor Coatings",
    description: "Engineered epoxy flooring system for durable industrial surfaces.",
    sortOrder: 1,
  },
  {
    name: "Epoxy Self Leveling Flooring",
    description: "Self-leveling epoxy flooring system with a smooth matt finish.",
    sortOrder: 2,
  },
  {
    name: "Anti Skid Coating Floorings",
    description: "Flooring system designed around slip-resistant surface performance.",
    sortOrder: 3,
  },
  {
    name: "ESD Coating Floorings",
    description: "ESD flooring system for environments requiring controlled electrostatic performance.",
    sortOrder: 4,
  },
  {
    name: "Epoxy Matt Finish Floorings",
    description: "Epoxy flooring system with a matt surface appearance.",
    sortOrder: 5,
  },
  {
    name: "High Build Epoxy Mortar Floorings",
    description: "High-build epoxy mortar flooring system for demanding industrial environments.",
    sortOrder: 6,
  },
  {
    name: "Epoxy PU Coatings",
    description: "Epoxy polyurethane coating system.",
    sortOrder: 7,
  },
  {
    name: "Polyurethane Coatings",
    description: "Polyurethane coating system for engineered floor surfaces.",
    sortOrder: 8,
  },
  {
    name: "Dielectric Insulation Floorings",
    description: "Dielectric insulation flooring system.",
    sortOrder: 9,
  },
  {
    name: "PU Polycrete Floorings",
    description: "PU Polycrete flooring system for industrial environments.",
    sortOrder: 10,
  },
];

async function seed() {
  console.log("Starting AR Flooring seed...\n");

  for (const system of systems) {
    const existing = await sql`
      SELECT id
      FROM "aRFlooringSystem"
      WHERE name = ${system.name}
      LIMIT 1
    `;

    let systemId;

    if (existing.length > 0) {
      systemId = existing[0].id;

      await sql`
        UPDATE "aRFlooringSystem"
        SET
          description = ${system.description},
          "isActive" = true,
          "sortOrder" = ${system.sortOrder},
          "updatedAt" = NOW()
        WHERE id = ${systemId}
      `;

      console.log(`Updated: ${system.name}`);
    } else {
      const inserted = await sql`
        INSERT INTO "aRFlooringSystem"
        (
          name,
          description,
          "isActive",
          "sortOrder",
          "createdAt",
          "updatedAt"
        )
        VALUES
        (
          ${system.name},
          ${system.description},
          true,
          ${system.sortOrder},
          NOW(),
          NOW()
        )
        RETURNING id
      `;

      systemId = inserted[0].id;

      console.log(`Created: ${system.name}`);
    }

    /*
     * Each system gets one initial AR visualization option.
     * These are visualization presets, not additional product claims.
     */
    const existingOption = await sql`
      SELECT id
      FROM "aRFlooringOption"
      WHERE "systemId" = ${systemId}
      LIMIT 1
    `;

    if (existingOption.length === 0) {
      await sql`
        INSERT INTO "aRFlooringOption"
        (
          "systemId",
          name,
          color,
          texture,
          "previewUrl",
          "sortOrder",
          "createdAt"
        )
        VALUES
        (
          ${systemId},
          ${system.name},
          null,
          null,
          null,
          1,
          NOW()
        )
      `;

      console.log(`  Added AR option`);
    }
  }

  console.log("\nAR Flooring seed completed.");
}

seed()
  .then(() => {
    console.log("Done.");
  })
  .catch((error) => {
    console.error("AR FLOORING SEED ERROR:", error);
    process.exit(1);
  });