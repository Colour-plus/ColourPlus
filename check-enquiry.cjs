require("dotenv/config");

const postgres = require("@prisma/orm-postgres/runtime").default;
const fs = require("fs");

const contract = JSON.parse(
  fs.readFileSync("./prisma/contract.json", "utf8")
);

const db = postgres({
  contractJson: contract,
  url: process.env.DATABASE_URL,
});

async function main() {
  const result = db.sql`
    SELECT
      column_name,
      data_type
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'enquiry'
    ORDER BY ordinal_position
  `;

  console.log(result);
  console.log("Result type:", typeof result);
  console.log("Result keys:", Object.keys(result));

  await db.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});