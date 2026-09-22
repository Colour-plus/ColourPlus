import "dotenv/config";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

try {
  const tables = await sql.query(`
    SELECT
      table_schema,
      table_name
    FROM information_schema.tables
    WHERE table_schema NOT IN ('pg_catalog', 'information_schema')
    ORDER BY table_schema, table_name
  `);

  console.log("\n==============================");
  console.log("DATABASE TABLES");
  console.log("==============================\n");

  console.table(tables);

  const columns = await sql.query(`
    SELECT
      table_name,
      column_name,
      data_type
    FROM information_schema.columns
    WHERE table_schema = 'public'
    ORDER BY table_name, ordinal_position
  `);

  console.log("\n==============================");
  console.log("DATABASE COLUMNS");
  console.log("==============================\n");

  console.table(columns);

} catch (error) {
  console.error("\n==============================");
  console.error("DATABASE CHECK FAILED");
  console.error("==============================\n");

  console.error(error);

  process.exit(1);
}