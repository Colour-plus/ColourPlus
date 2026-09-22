import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

function getId(request: NextRequest) {
  const parts = request.nextUrl.pathname.split("/");
  return Number(parts[parts.length - 1]);
}

// GET /api/ar-flooring/:id
export async function GET(request: NextRequest) {
  try {
    const id = getId(request);

    if (!Number.isInteger(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid flooring system ID." },
        { status: 400 }
      );
    }

    const systems = await sql`
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
      WHERE id = ${id}
      LIMIT 1
    `;

    if (systems.length === 0) {
      return NextResponse.json(
        { success: false, message: "Flooring system not found." },
        { status: 404 }
      );
    }

    const options = await sql`
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
      WHERE "systemId" = ${id}
      ORDER BY "sortOrder" ASC, id ASC
    `;

    return NextResponse.json({
      success: true,
      system: {
        ...systems[0],
        options,
      },
    });
  } catch (error) {
    console.error("AR_FLOORING_GET_ONE_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load flooring system.",
      },
      { status: 500 }
    );
  }
}

// PATCH /api/ar-flooring/:id
export async function PATCH(request: NextRequest) {
  try {
    const id = getId(request);

    if (!Number.isInteger(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid flooring system ID." },
        { status: 400 }
      );
    }

    const body = await request.json();

    const existing = await sql`
      SELECT *
      FROM "aRFlooringSystem"
      WHERE id = ${id}
      LIMIT 1
    `;

    if (existing.length === 0) {
      return NextResponse.json(
        { success: false, message: "Flooring system not found." },
        { status: 404 }
      );
    }

    const current = existing[0];

    const name =
      body.name !== undefined ? String(body.name).trim() : current.name;

    const description =
      body.description !== undefined
        ? body.description === null
          ? null
          : String(body.description).trim()
        : current.description;

    const image =
      body.image !== undefined
        ? body.image === null
          ? null
          : String(body.image).trim()
        : current.image;

    const isActive =
      body.isActive !== undefined
        ? Boolean(body.isActive)
        : current.isActive;

    const sortOrder =
      body.sortOrder !== undefined
        ? Number(body.sortOrder)
        : current.sortOrder;

    if (!name) {
      return NextResponse.json(
        { success: false, message: "Flooring system name is required." },
        { status: 400 }
      );
    }

    if (!Number.isFinite(sortOrder)) {
      return NextResponse.json(
        { success: false, message: "Sort order must be a number." },
        { status: 400 }
      );
    }

    const updated = await sql`
      UPDATE "aRFlooringSystem"
      SET
        name = ${name},
        description = ${description},
        image = ${image},
        "isActive" = ${isActive},
        "sortOrder" = ${sortOrder},
        "updatedAt" = NOW()
      WHERE id = ${id}
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

    return NextResponse.json({
      success: true,
      system: updated[0],
    });
  } catch (error) {
    console.error("AR_FLOORING_PATCH_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update flooring system.",
      },
      { status: 500 }
    );
  }
}

// DELETE /api/ar-flooring/:id
export async function DELETE(request: NextRequest) {
  try {
    const id = getId(request);

    if (!Number.isInteger(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid flooring system ID." },
        { status: 400 }
      );
    }

    const existing = await sql`
      SELECT id
      FROM "aRFlooringSystem"
      WHERE id = ${id}
      LIMIT 1
    `;

    if (existing.length === 0) {
      return NextResponse.json(
        { success: false, message: "Flooring system not found." },
        { status: 404 }
      );
    }

    await sql`
      DELETE FROM "aRFlooringOption"
      WHERE "systemId" = ${id}
    `;

    await sql`
      DELETE FROM "aRFlooringSystem"
      WHERE id = ${id}
    `;

    return NextResponse.json({
      success: true,
      message: "Flooring system deleted.",
    });
  } catch (error) {
    console.error("AR_FLOORING_DELETE_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete flooring system.",
      },
      { status: 500 }
    );
  }
}