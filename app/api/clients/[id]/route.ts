import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

// ======================================================
// GET SINGLE CLIENT
// GET /api/clients/:id
// ======================================================

export async function GET(
  request: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await context.params;

    const clientId = Number(id);

    if (!Number.isInteger(clientId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid client ID.",
        },
        { status: 400 }
      );
    }

    const result = await sql`
      SELECT
        "id",
        "name",
        "logo",
        "sector",
        "isActive",
        "sortOrder",
        "createdAt",
        "updatedAt"
      FROM "client"
      WHERE "id" = ${clientId}
      LIMIT 1
    `;

    if (result.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Client not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        client: result[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET_CLIENT_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Could not load client.",
      },
      { status: 500 }
    );
  }
}

// ======================================================
// UPDATE CLIENT
// PATCH /api/clients/:id
//
// Admin only through middleware
// ======================================================

export async function PATCH(
  request: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await context.params;

    const clientId = Number(id);

    if (!Number.isInteger(clientId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid client ID.",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    // --------------------------------------------------
    // CHECK CLIENT EXISTS
    // --------------------------------------------------

    const existing = await sql`
      SELECT
        "id",
        "name",
        "logo",
        "sector",
        "isActive",
        "sortOrder"
      FROM "client"
      WHERE "id" = ${clientId}
      LIMIT 1
    `;

    if (existing.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Client not found.",
        },
        { status: 404 }
      );
    }

    const current = existing[0];

    // --------------------------------------------------
    // KEEP EXISTING VALUES IF FIELD NOT PROVIDED
    // --------------------------------------------------

    const name =
      body.name !== undefined
        ? String(body.name || "").trim()
        : current.name;

    const logo =
      body.logo !== undefined
        ? String(body.logo || "").trim()
        : current.logo;

    const sector =
      body.sector !== undefined
        ? String(body.sector || "").trim()
        : current.sector;

    const isActive =
      body.isActive !== undefined
        ? Boolean(body.isActive)
        : current.isActive;

    const sortOrder =
      body.sortOrder !== undefined &&
      Number.isFinite(Number(body.sortOrder))
        ? Number(body.sortOrder)
        : current.sortOrder;

    // --------------------------------------------------
    // VALIDATION
    // --------------------------------------------------

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          message: "Client name is required.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // UPDATE
    // --------------------------------------------------

    const result = await sql`
      UPDATE "client"
      SET
        "name" = ${name},
        "logo" = ${logo || null},
        "sector" = ${sector || null},
        "isActive" = ${isActive},
        "sortOrder" = ${sortOrder},
        "updatedAt" = NOW()
      WHERE "id" = ${clientId}
      RETURNING
        "id",
        "name",
        "logo",
        "sector",
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
      { status: 200 }
    );
  } catch (error) {
    console.error("UPDATE_CLIENT_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Could not update client.",
      },
      { status: 500 }
    );
  }
}

// ======================================================
// DELETE CLIENT
// DELETE /api/clients/:id
//
// Admin only through middleware
// ======================================================

export async function DELETE(
  request: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await context.params;

    const clientId = Number(id);

    if (!Number.isInteger(clientId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid client ID.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // CHECK CLIENT EXISTS
    // --------------------------------------------------

    const existing = await sql`
      SELECT "id"
      FROM "client"
      WHERE "id" = ${clientId}
      LIMIT 1
    `;

    if (existing.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Client not found.",
        },
        { status: 404 }
      );
    }

    // --------------------------------------------------
    // DELETE
    // --------------------------------------------------

    await sql`
      DELETE FROM "client"
      WHERE "id" = ${clientId}
    `;

    return NextResponse.json(
      {
        success: true,
        message: "Client deleted successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE_CLIENT_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Could not delete client.",
      },
      { status: 500 }
    );
  }
}