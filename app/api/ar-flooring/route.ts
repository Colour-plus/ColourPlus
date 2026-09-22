import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

// GET /api/ar-flooring
// Public: returns active flooring systems and their active options
// Admin: ?all=true returns everything
export async function GET(request: NextRequest) {
  try {
    const all = request.nextUrl.searchParams.get("all") === "true";

    const systems = all
      ? await sql`
          SELECT
            id,
            name,
            description,
            image,
            "isActive",
            "sortOrder",
            "createdAt",
            "updatedAt"
          FROM "aRFlooringSystem"
          ORDER BY "sortOrder" ASC, id ASC
        `
      : await sql`
          SELECT
            id,
            name,
            description,
            image,
            "isActive",
            "sortOrder",
            "createdAt",
            "updatedAt"
          FROM "aRFlooringSystem"
          WHERE "isActive" = true
          ORDER BY "sortOrder" ASC, id ASC
        `;

    const systemIds = systems.map((system) => system.id);

    let options: any[] = [];

    if (systemIds.length > 0) {
      options = all
        ? await sql`
            SELECT
              id,
              "systemId",
              name,
              color,
              texture,
              "previewUrl",
              "sortOrder",
              "createdAt"
            FROM "aRFlooringOption"
            WHERE "systemId" = ANY(${systemIds})
            ORDER BY "sortOrder" ASC, id ASC
          `
        : await sql`
            SELECT
              id,
              "systemId",
              name,
              color,
              texture,
              "previewUrl",
              "sortOrder",
              "createdAt"
            FROM "aRFlooringOption"
            WHERE "systemId" = ANY(${systemIds})
            ORDER BY "sortOrder" ASC, id ASC
          `;
    }

    const result = systems.map((system) => ({
      ...system,
      options: options.filter(
        (option) => option.systemId === system.id
      ),
    }));

    return NextResponse.json({
      success: true,
      systems: result,
    });
  } catch (error) {
    console.error("AR_FLOORING_GET_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load AR flooring data.",
      },
      { status: 500 }
    );
  }
}
// POST /api/ar-flooring
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const name = String(body.name || "").trim();
    const description =
      body.description === undefined || body.description === null
        ? null
        : String(body.description).trim();

    const image =
      body.image === undefined || body.image === null
        ? null
        : String(body.image).trim();

    const isActive =
      body.isActive === undefined ? true : Boolean(body.isActive);

    const sortOrder =
      body.sortOrder === undefined ? 0 : Number(body.sortOrder);

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          message: "Flooring system name is required.",
        },
        { status: 400 }
      );
    }

    if (!Number.isFinite(sortOrder)) {
      return NextResponse.json(
        {
          success: false,
          message: "Sort order must be a number.",
        },
        { status: 400 }
      );
    }

    const inserted = await sql`
      INSERT INTO "aRFlooringSystem"
      (
        name,
        description,
        image,
        "isActive",
        "sortOrder",
        "createdAt",
        "updatedAt"
      )
      VALUES
      (
        ${name},
        ${description},
        ${image},
        ${isActive},
        ${sortOrder},
        NOW(),
        NOW()
      )
      RETURNING
        id,
        name,
        description,
        image,
        "isActive",
        "sortOrder",
        "createdAt",
        "updatedAt"
    `;

    return NextResponse.json(
      {
        success: true,
        system: inserted[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("AR_FLOORING_POST_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create flooring system.",
      },
      { status: 500 }
    );
  }
}