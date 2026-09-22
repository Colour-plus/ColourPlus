import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

function getId(request: NextRequest) {
  const parts = request.nextUrl.pathname.split("/");
  return Number(parts[parts.length - 1]);
}

// PATCH /api/ar-flooring/options/:id
export async function PATCH(request: NextRequest) {
  try {
    const id = getId(request);

    if (!Number.isInteger(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid option ID.",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    const existing = await sql`
      SELECT *
      FROM "aRFlooringOption"
      WHERE id = ${id}
      LIMIT 1
    `;

    if (existing.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "AR flooring option not found.",
        },
        { status: 404 }
      );
    }

    const current = existing[0];

    const name =
      body.name !== undefined ? String(body.name).trim() : current.name;

    const color =
      body.color !== undefined
        ? body.color === null
          ? null
          : String(body.color).trim()
        : current.color;

    const texture =
      body.texture !== undefined
        ? body.texture === null
          ? null
          : String(body.texture).trim()
        : current.texture;

    const previewUrl =
      body.previewUrl !== undefined
        ? body.previewUrl === null
          ? null
          : String(body.previewUrl).trim()
        : current.previewUrl;

    const sortOrder =
      body.sortOrder !== undefined
        ? Number(body.sortOrder)
        : current.sortOrder;

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          message: "Option name is required.",
        },
        { status: 400 }
      );
    }

    const updated = await sql`
      UPDATE "aRFlooringOption"
      SET
        name = ${name},
        color = ${color},
        texture = ${texture},
        "previewUrl" = ${previewUrl},
        "sortOrder" = ${sortOrder}
      WHERE id = ${id}
      RETURNING
        id,
        "systemId",
        name,
        color,
        texture,
        "previewUrl",
        "sortOrder",
        "createdAt"
    `;

    return NextResponse.json({
      success: true,
      option: updated[0],
    });
  } catch (error) {
    console.error("AR_FLOORING_OPTION_PATCH_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update AR flooring option.",
      },
      { status: 500 }
    );
  }
}

// DELETE /api/ar-flooring/options/:id
export async function DELETE(request: NextRequest) {
  try {
    const id = getId(request);

    if (!Number.isInteger(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid option ID.",
        },
        { status: 400 }
      );
    }

    const existing = await sql`
      SELECT id
      FROM "aRFlooringOption"
      WHERE id = ${id}
      LIMIT 1
    `;

    if (existing.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "AR flooring option not found.",
        },
        { status: 404 }
      );
    }

    await sql`
      DELETE FROM "aRFlooringOption"
      WHERE id = ${id}
    `;

    return NextResponse.json({
      success: true,
      message: "AR flooring option deleted.",
    });
  } catch (error) {
    console.error("AR_FLOORING_OPTION_DELETE_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete AR flooring option.",
      },
      { status: 500 }
    );
  }
}