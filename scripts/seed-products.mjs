import "dotenv/config";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

const products = [
  {
    number: 1,
    name: "Epoxy Floor Coatings",
    family: "Epoxy",
    short: "Seamless industrial flooring for demanding environments.",
    description:
      "Durable epoxy flooring designed for heavy traffic, chemical exposure and hygienic environments.",
    tag: "CORE",
    benefits: [
      "Seamless and hygienic finish",
      "Excellent chemical resistance",
      "Withstands heavy traffic",
      "Easy to clean and maintain",
      "Long-lasting glossy appearance",
    ],
  },
  {
    number: 2,
    name: "Epoxy Self Leveling Flooring (Matt Finish)",
    family: "Epoxy",
    short: "Uniform matt finish for controlled environments.",
    description:
      "Self-leveling epoxy flooring providing a smooth matt surface with strong stain and chemical resistance.",
    tag: "MATT",
    benefits: [
      "Uniform matt surface",
      "Stain and chemical resistance",
      "Low-maintenance and durable",
      "Improves visibility and aesthetics",
      "Ideal for controlled environments",
    ],
  },
  {
    number: 3,
    name: "Anti Skid Coating Floorings",
    family: "Performance",
    short: "Textured flooring designed to improve workplace safety.",
    description:
      "Anti-skid flooring systems designed for areas where slip resistance is critical.",
    tag: "SAFETY",
    benefits: [
      "Improves workplace safety",
      "Durable under heavy use",
      "Custom texture options",
      "Suitable for wet areas",
      "Reduces risk of slipping",
    ],
  },
  {
    number: 4,
    name: "ESD Coating Floorings",
    family: "Performance",
    short: "Electrostatic control for sensitive environments.",
    description:
      "ESD flooring designed to control electrostatic discharge and protect sensitive electronic equipment.",
    tag: "ESD",
    benefits: [
      "Prevents electrostatic damage",
      "Safe for electronic equipment",
      "Seamless and grounded surface",
      "Long-term static protection",
      "Ideal for sensitive zones",
    ],
  },
  {
    number: 5,
    name: "Epoxy Matt Finish Floorings",
    family: "Epoxy",
    short: "Clean matt flooring for premium interiors.",
    description:
      "Matt-finish epoxy flooring combining durability, stain resistance and a refined appearance.",
    tag: "MATT",
    benefits: [
      "Clean and stylish look",
      "Resists stains and scratches",
      "Low maintenance requirements",
      "Enhances ambient appearance",
      "Suitable for interiors",
    ],
  },
  {
    number: 6,
    name: "High Build Epoxy Mortar Floorings",
    family: "Epoxy",
    short: "Heavy-duty flooring for extreme industrial loads.",
    description:
      "High-build epoxy mortar flooring designed for worn concrete and areas exposed to extreme mechanical loads.",
    tag: "HEAVY DUTY",
    benefits: [
      "Extreme load resistance",
      "Repairs worn-out surfaces",
      "Durable and seamless",
      "Excellent bond to concrete",
      "Ideal for industrial zones",
    ],
  },
  {
    number: 7,
    name: "Epoxy PU Coatings",
    family: "Polyurethane",
    short: "Tough protective coating for harsh conditions.",
    description:
      "Epoxy PU coating systems combining toughness, flexibility, chemical resistance and environmental durability.",
    tag: "EPU",
    benefits: [
      "Resistant to UV and heat",
      "High chemical tolerance",
      "Flexible yet tough",
      "Retains finish over time",
      "Suitable for harsh conditions",
    ],
  },
  {
    number: 8,
    name: "Polyurethane Coatings",
    family: "Polyurethane",
    short: "Flexible UV-resistant protection for demanding surfaces.",
    description:
      "Polyurethane coating systems offering flexibility, UV protection and long-term colour and gloss retention.",
    tag: "PU",
    benefits: [
      "Excellent UV protection",
      "High elasticity and flexibility",
      "Retains gloss and color",
      "Withstands outdoor conditions",
      "Ideal for heavy use",
    ],
  },
  {
    number: 9,
    name: "Anti Corrosive Coatings",
    family: "Protection",
    short: "Protective coatings designed to resist corrosion.",
    description:
      "Anti-corrosive coating systems designed to protect surfaces and equipment in harsh environments.",
    tag: "PROTECTION",
    benefits: [
      "Prevents rust and corrosion",
      "Extends equipment lifespan",
      "Strong chemical resistance",
      "Bonds firmly to surfaces",
      "Ideal for harsh environments",
    ],
  },
  {
    number: 10,
    name: "Cementitious Underlay",
    family: "Preparation",
    short: "Smooth substrate preparation for coating systems.",
    description:
      "Cementitious underlay providing a smooth, even and well-bonded base for final coating systems.",
    tag: "BASE",
    benefits: [
      "Smooth, even surface",
      "Quick-setting formula",
      "Excellent bonding capability",
      "Enhances final finish",
      "Suitable for all coatings",
    ],
  },
  {
    number: 11,
    name: "Dielectric Insulation Floorings",
    family: "Performance",
    short: "Electrical insulation for sensitive working zones.",
    description:
      "Dielectric flooring systems designed to provide high electrical insulation in sensitive industrial environments.",
    tag: "DIELECTRIC",
    benefits: [
      "High electrical insulation",
      "Safe for sensitive zones",
      "Resistant to chemicals",
      "Durable under stress",
      "Ideal for control rooms",
    ],
  },
  {
    number: 12,
    name: "PU Polycrete Floorings",
    family: "Polyurethane",
    short: "Heavy-duty polyurethane flooring for extreme environments.",
    description:
      "PU Polycrete flooring designed for impact, chemical and environmental resistance in demanding processing areas.",
    tag: "POLYCRETE",
    benefits: [
      "Exceptional impact resistance",
      "Handles extreme conditions",
      "Resistant to harsh chemicals",
      "Quick curing and use",
      "Suitable for processing units",
    ],
  },
  {
    number: 13,
    name: "Industrial Wall Coatings",
    family: "Protection",
    short: "Seamless wall protection for hygienic environments.",
    description:
      "Industrial wall coatings providing seamless, non-porous and hygienic surfaces for demanding environments.",
    tag: "HYGIENE",
    benefits: [
      "Seamless, non-porous surface",
      "Resistant to splashes and stains",
      "Available in matte or gloss",
      "Long-term hygiene protection",
      "Complies with clean room needs",
    ],
  },
  {
    number: 14,
    name: "Waterproofing Coatings",
    family: "Waterproofing",
    short: "Protective moisture barriers for multiple surfaces.",
    description:
      "Waterproofing coating systems designed to resist moisture, cracking, UV exposure and seepage.",
    tag: "WATERPROOFING",
    benefits: [
      "Long-term moisture barrier",
      "Crack and UV resistant",
      "Prevents mold and seepage",
      "Compatible with various surfaces",
      "Protects structural integrity",
    ],
  },
  {
    number: 15,
    name: "Coving Floorings",
    family: "Hygiene",
    short: "Seamless floor-to-wall transitions for sterile areas.",
    description:
      "Coving systems designed to create hygienic floor-to-wall transitions and reduce dirt accumulation.",
    tag: "HYGIENE",
    benefits: [
      "Eliminates dirt accumulation",
      "Easy to sanitize",
      "Impact and moisture resistant",
      "Matches floor finishes",
      "Essential for sterile areas",
    ],
  },
  {
    number: 16,
    name: "Floor Marking",
    family: "Safety",
    short: "High-visibility markings for organized workplaces.",
    description:
      "Durable floor marking systems designed to improve visibility, safety and workspace organization.",
    tag: "SAFETY",
    benefits: [
      "High visibility markings",
      "Fast drying application",
      "Abrasion resistant surface",
      "Improves safety compliance",
      "Organizes workspace efficiently",
    ],
  },
];

async function seedProducts() {
  console.log("\n================================");
  console.log("COLOURPLUS PRODUCT SEED");
  console.log("================================\n");

  try {
    for (const product of products) {
      const existing = await sql`
        SELECT "id"
        FROM "product"
        WHERE "number" = ${product.number}
        LIMIT 1
      `;

      let productId;

      if (existing.length > 0) {
        productId = existing[0].id;

        await sql`
          UPDATE "product"
          SET
            "name" = ${product.name},
            "family" = ${product.family},
            "short" = ${product.short},
            "description" = ${product.description},
            "tag" = ${product.tag},
            "isActive" = true,
            "sortOrder" = ${product.number},
            "updatedAt" = NOW()
          WHERE "id" = ${productId}
        `;

        await sql`
          DELETE FROM "productBenefit"
          WHERE "productId" = ${productId}
        `;

        console.log(`UPDATED: ${product.number} - ${product.name}`);
      } else {
        const inserted = await sql`
          INSERT INTO "product" (
            "number",
            "name",
            "family",
            "short",
            "description",
            "tag",
            "isActive",
            "sortOrder",
            "createdAt",
            "updatedAt"
          )
          VALUES (
            ${product.number},
            ${product.name},
            ${product.family},
            ${product.short},
            ${product.description},
            ${product.tag},
            true,
            ${product.number},
            NOW(),
            NOW()
          )
          RETURNING "id"
        `;

        productId = inserted[0].id;

        console.log(`CREATED: ${product.number} - ${product.name}`);
      }

      for (let i = 0; i < product.benefits.length; i++) {
        await sql`
          INSERT INTO "productBenefit" (
            "productId",
            "text",
            "sortOrder",
            "createdAt"
          )
          VALUES (
            ${productId},
            ${product.benefits[i]},
            ${i + 1},
            NOW()
          )
        `;
      }
    }

    console.log("\n================================");
    console.log("PRODUCT SEED COMPLETE");
    console.log("================================");
    console.log(`Products processed: ${products.length}`);
    console.log("Benefits: 5 per product\n");

  } catch (error) {
    console.error("\n================================");
    console.error("PRODUCT SEED FAILED");
    console.error("================================\n");
    console.error(error);
    process.exit(1);
  }
}

seedProducts();