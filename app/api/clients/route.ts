import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function GET(request: NextRequest) {
  try {
    const all = request.nextUrl.searchParams.get("all") === "true";

    const clients = all
      ? await sql`
          SELECT
            id,
            name,
            logo,
            sector,
            "isActive",
            "sortOrder",
            "createdAt",
            "updatedAt"
          FROM "client"
          ORDER BY "sortOrder" ASC, "createdAt" ASC, id ASC
        `
      : await sql`
          SELECT
            id,
            name,
            logo,
            sector,
            "isActive",
            "sortOrder",
            "createdAt",
            "updatedAt"
          FROM "client"
          WHERE "isActive" = true
          ORDER BY "sortOrder" ASC, "createdAt" ASC, id ASC
        `;

    return NextResponse.json({
      success: true,
      clients,
    });
  } catch (error) {
    console.error("CLIENTS GET ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Could not load clients.",
        error:
          error instanceof Error
            ? error.message
            : String(error),
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const name = String(body.name ?? "").trim();
    const logo = body.logo
      ? String(body.logo).trim()
      : null;
    const sector = body.sector
      ? String(body.sector).trim()
      : null;

    const isActive =
      typeof body.isActive === "boolean"
        ? body.isActive
        : true;

    const sortOrder =
      Number.isFinite(Number(body.sortOrder))
        ? Number(body.sortOrder)
        : 0;

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          message: "Client name is required.",
        },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO "client"
        (
          name,
          logo,
          sector,
          "isActive",
          "sortOrder",
          "createdAt",
          "updatedAt"
        )
      VALUES
        (
          ${name},
          ${logo},
          ${sector},
          ${isActive},
          ${sortOrder},
          NOW(),
          NOW()
        )
      RETURNING
        id,
        name,
        logo,
        sector,
        "isActive",
        "sortOrder",
        "createdAt",
        "updatedAt"
    `;

    return NextResponse.json(
      {
        success: true,
        client: result[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CLIENT POST ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Could not create client.",
        error:
          error instanceof Error
            ? error.message
            : String(error),
      },
      { status: 500 }
    );
  }
}