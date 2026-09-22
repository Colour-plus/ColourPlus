import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

// POST /api/ar-flooring/options
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const systemId = Number(body.systemId);
    const name = String(body.name || "").trim();

    const color =
      body.color === undefined || body.color === null
        ? null
        : String(body.color).trim();

    const texture =
      body.texture === undefined || body.texture === null
        ? null
        : String(body.texture).trim();

    const previewUrl =
      body.previewUrl === undefined || body.previewUrl === null
        ? null
        : String(body.previewUrl).trim();

    const sortOrder =
      body.sortOrder === undefined ? 0 : Number(body.sortOrder);

    if (!Number.isInteger(systemId)) {
      return NextResponse.json(
        {
          success: false,
          message: "A valid flooring system is required.",
        },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          message: "Option name is required.",
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

    const system = await sql`
      SELECT id
      FROM "aRFlooringSystem"
      WHERE id = ${systemId}
      LIMIT 1
    `;

    if (system.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Flooring system not found.",
        },
        { status: 404 }
      );
    }

    const inserted = await sql`
      INSERT INTO "aRFlooringOption"
      (
        "systemId",
        name,
        color,
        texture,
        "previewUrl",
        "sortOrder",
        "createdAt"
      )
      VALUES
      (
        ${systemId},
        ${name},
        ${color},
        ${texture},
        ${previewUrl},
        ${sortOrder},
        NOW()
      )
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

    return NextResponse.json(
      {
        success: true,
        option: inserted[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("AR_FLOORING_OPTION_POST_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create AR flooring option.",
      },
      { status: 500 }
    );
  }
}