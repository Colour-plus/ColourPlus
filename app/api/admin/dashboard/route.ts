import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    /*
     * --------------------------------------------------
     * PRODUCTS
     * --------------------------------------------------
     */

    const productStats = await sql`
      SELECT
        COUNT(*)::int AS total,
        COUNT(*) FILTER (
          WHERE "isActive" = true
        )::int AS active
      FROM "product"
    `;

    /*
     * --------------------------------------------------
     * PROJECTS
     * --------------------------------------------------
     */

    const projectStats = await sql`
      SELECT
        COUNT(*)::int AS total,
        COUNT(*) FILTER (
          WHERE "isActive" = true
        )::int AS active,
        COUNT(*) FILTER (
          WHERE "isFeatured" = true
        )::int AS featured
      FROM "project"
    `;

    /*
     * --------------------------------------------------
     * CLIENTS
     * --------------------------------------------------
     */

    const clientStats = await sql`
      SELECT
        COUNT(*)::int AS total,
        COUNT(*) FILTER (
          WHERE "isActive" = true
        )::int AS active
      FROM "client"
    `;

    /*
     * --------------------------------------------------
     * ENQUIRIES
     * --------------------------------------------------
     */

    const enquiryStats = await sql`
      SELECT
        COUNT(*)::int AS total,
        COUNT(*) FILTER (
          WHERE "status" = 'NEW'
        )::int AS new,
        COUNT(*) FILTER (
          WHERE "status" = 'CONTACTED'
        )::int AS contacted,
        COUNT(*) FILTER (
          WHERE "status" = 'QUALIFIED'
        )::int AS qualified,
        COUNT(*) FILTER (
          WHERE "status" = 'SITE_VISIT'
        )::int AS siteVisit,
        COUNT(*) FILTER (
          WHERE "status" = 'QUOTATION'
        )::int AS quotation,
        COUNT(*) FILTER (
          WHERE "status" = 'NEGOTIATION'
        )::int AS negotiation,
        COUNT(*) FILTER (
          WHERE "status" = 'WON'
        )::int AS won,
        COUNT(*) FILTER (
          WHERE "status" = 'LOST'
        )::int AS lost
      FROM "enquiry"
    `;

    /*
     * --------------------------------------------------
     * RECENT ENQUIRIES
     * --------------------------------------------------
     */

    const recentEnquiries = await sql`
      SELECT
        id,
        name,
        company,
        email,
        phone,
        city,
        "projectType",
        "projectStage",
        message,
        source,
        status,
        "createdAt",
        "updatedAt"
      FROM "enquiry"
      ORDER BY "createdAt" DESC
      LIMIT 5
    `;

    /*
     * --------------------------------------------------
     * RESPONSE
     * --------------------------------------------------
     */

    return NextResponse.json({
      success: true,

      dashboard: {
        products: {
          total: productStats[0]?.total ?? 0,
          active: productStats[0]?.active ?? 0,
        },

        projects: {
          total: projectStats[0]?.total ?? 0,
          active: projectStats[0]?.active ?? 0,
          featured: projectStats[0]?.featured ?? 0,
        },

        clients: {
          total: clientStats[0]?.total ?? 0,
          active: clientStats[0]?.active ?? 0,
        },

        enquiries: {
          total: enquiryStats[0]?.total ?? 0,
          new: enquiryStats[0]?.new ?? 0,
          contacted:
            enquiryStats[0]?.contacted ?? 0,
          qualified:
            enquiryStats[0]?.qualified ?? 0,
          siteVisit:
            enquiryStats[0]?.siteVisit ?? 0,
          quotation:
            enquiryStats[0]?.quotation ?? 0,
          negotiation:
            enquiryStats[0]?.negotiation ?? 0,
          won: enquiryStats[0]?.won ?? 0,
          lost: enquiryStats[0]?.lost ?? 0,
        },

        recentEnquiries,
      },
    });
  } catch (error) {
    console.error(
      "ADMIN_DASHBOARD_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to load dashboard data.",
      },
      { status: 500 }
    );
  }
}