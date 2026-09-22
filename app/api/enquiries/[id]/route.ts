import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

function getId(
  context: { params: Promise<{ id: string }> }
) {
  return context.params.then(({ id }) => {
    const parsed = Number(id);

    if (
      !Number.isInteger(parsed) ||
      parsed <= 0
    ) {
      return null;
    }

    return parsed;
  });
}

// --------------------------------------------------
// GET SINGLE ENQUIRY
// --------------------------------------------------

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const id = await getId(context);

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid enquiry ID.",
        },
        { status: 400 }
      );
    }

    const enquiries = await sql`
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
      WHERE id = ${id}
      LIMIT 1
    `;

    if (enquiries.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Enquiry not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      enquiry: enquiries[0],
    });
  } catch (error) {
    console.error(
      "GET_ENQUIRY_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load enquiry.",
      },
      { status: 500 }
    );
  }
}

// --------------------------------------------------
// PATCH ENQUIRY
// --------------------------------------------------

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const id = await getId(context);

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid enquiry ID.",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    const allowedStatuses = [
      "NEW",
      "CONTACTED",
      "QUALIFIED",
      "SITE_VISIT",
      "QUOTATION",
      "NEGOTIATION",
      "WON",
      "LOST",
    ];

    const status = body.status;

    if (
      !status ||
      !allowedStatuses.includes(status)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid enquiry status.",
        },
        { status: 400 }
      );
    }

    const existing = await sql`
      SELECT id
      FROM "enquiry"
      WHERE id = ${id}
      LIMIT 1
    `;

    if (existing.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Enquiry not found.",
        },
        { status: 404 }
      );
    }

    const updated = await sql`
      UPDATE "enquiry"
      SET
        "status" = ${status},
        "updatedAt" = NOW()
      WHERE id = ${id}
      RETURNING
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
    `;

    return NextResponse.json({
      success: true,
      message: "Enquiry updated successfully.",
      enquiry: updated[0],
    });
  } catch (error) {
    console.error(
      "PATCH_ENQUIRY_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update enquiry.",
      },
      { status: 500 }
    );
  }
}

// --------------------------------------------------
// DELETE ENQUIRY
// --------------------------------------------------

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const id = await getId(context);

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid enquiry ID.",
        },
        { status: 400 }
      );
    }

    const existing = await sql`
      SELECT id
      FROM "enquiry"
      WHERE id = ${id}
      LIMIT 1
    `;

    if (existing.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Enquiry not found.",
        },
        { status: 404 }
      );
    }

    await sql`
      DELETE FROM "enquiry"
      WHERE id = ${id}
    `;

    return NextResponse.json({
      success: true,
      message: "Enquiry deleted successfully.",
    });
  } catch (error) {
    console.error(
      "DELETE_ENQUIRY_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete enquiry.",
      },
      { status: 500 }
    );
  }
}