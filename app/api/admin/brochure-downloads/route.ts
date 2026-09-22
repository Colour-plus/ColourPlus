import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const leads = await sql`
      SELECT
        "id",
        "name",
        "mobile",
        "createdAt"
      FROM "brochureLead"
      ORDER BY "createdAt" DESC
    `;

    const stats = await sql`
      SELECT
        COUNT(*)::int AS "total",
        COUNT(*) FILTER (
          WHERE "createdAt" >= CURRENT_DATE
        )::int AS "today",
        COUNT(*) FILTER (
          WHERE "createdAt" >= DATE_TRUNC('month', CURRENT_DATE)
        )::int AS "thisMonth"
      FROM "brochureLead"
    `;

    return NextResponse.json({
      success: true,
      leads,
      stats: stats[0] || {
        total: 0,
        today: 0,
        thisMonth: 0,
      },
    });
  } catch (error) {
    console.error(
      "BROCHURE_DOWNLOADS_ADMIN_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load brochure downloads.",
      },
      { status: 500 }
    );
  }
}