import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);


/* =========================================================
   GET SINGLE PROJECT
   GET /api/projects/:id
========================================================= */

export async function GET(
  request: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await context.params;

    const projectId = Number(id);

    if (!Number.isInteger(projectId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid project ID.",
        },
        { status: 400 }
      );
    }

    const result = await sql`
      SELECT
        p."id",
        p."title",
        p."location",
        p."industry",
        p."description",
        p."image",
        p."category",
        p."isFeatured",
        p."isActive",
        p."sortOrder",
        p."createdAt",
        p."updatedAt",

        COALESCE(
          (
            SELECT json_agg(
              json_build_object(
                'id', pi."id",
                'imageUrl', pi."imageUrl",
                'altText', pi."altText",
                'sortOrder', pi."sortOrder"
              )
              ORDER BY pi."sortOrder" ASC, pi."id" ASC
            )
            FROM "projectImage" pi
            WHERE pi."projectId" = p."id"
          ),
          '[]'::json
        ) AS "images"

      FROM "project" p

      WHERE p."id" = ${projectId}

      LIMIT 1
    `;

    if (result.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      project: result[0],
    });
  } catch (error) {
    console.error("PROJECT_GET_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Could not load project.",
      },
      { status: 500 }
    );
  }
}


/* =========================================================
   UPDATE PROJECT
   PATCH /api/projects/:id
========================================================= */

export async function PATCH(
  request: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await context.params;

    const projectId = Number(id);

    if (!Number.isInteger(projectId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid project ID.",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    const title =
      body.title !== undefined
        ? String(body.title || "").trim()
        : undefined;

    const location =
      body.location !== undefined
        ? String(body.location || "").trim()
        : undefined;

    const industry =
      body.industry !== undefined
        ? String(body.industry || "").trim()
        : undefined;

    const description =
      body.description !== undefined
        ? String(body.description || "").trim()
        : undefined;

    const image =
      body.image !== undefined
        ? String(body.image || "").trim()
        : undefined;

    const category =
      body.category !== undefined
        ? String(body.category || "").trim()
        : undefined;

    const isFeatured =
      body.isFeatured !== undefined
        ? body.isFeatured === true
        : undefined;

    const isActive =
      body.isActive !== undefined
        ? body.isActive === true
        : undefined;

    const sortOrder =
      body.sortOrder !== undefined
        ? Number(body.sortOrder)
        : undefined;

    /* ---------- Validate title ---------- */

    if (
      title !== undefined &&
      !title
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Project title cannot be empty.",
        },
        { status: 400 }
      );
    }

    /* ---------- Update project ---------- */

    const updated = await sql`
      UPDATE "project"
      SET
        "title" =
          COALESCE(${title ?? null}, "title"),

        "location" =
          COALESCE(${location ?? null}, "location"),

        "industry" =
          COALESCE(${industry ?? null}, "industry"),

        "description" =
          COALESCE(${description ?? null}, "description"),

        "image" =
          COALESCE(${image ?? null}, "image"),

        "category" =
          COALESCE(${category ?? null}, "category"),

        "isFeatured" =
          COALESCE(${isFeatured ?? null}, "isFeatured"),

        "isActive" =
          COALESCE(${isActive ?? null}, "isActive"),

        "sortOrder" =
          COALESCE(${sortOrder ?? null}, "sortOrder"),

        "updatedAt" = NOW()

      WHERE "id" = ${projectId}

      RETURNING
        "id",
        "title",
        "location",
        "industry",
        "description",
        "image",
        "category",
        "isFeatured",
        "isActive",
        "sortOrder",
        "createdAt",
        "updatedAt"
    `;

    if (updated.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found.",
        },
        { status: 404 }
      );
    }

    /* ---------- Replace gallery images ---------- */

    if (Array.isArray(body.images)) {
      await sql`
        DELETE FROM "projectImage"
        WHERE "projectId" = ${projectId}
      `;

      for (
        let index = 0;
        index < body.images.length;
        index++
      ) {
        const item = body.images[index];

        const imageUrl =
          typeof item === "string"
            ? item.trim()
            : String(
                item?.imageUrl || ""
              ).trim();

        const altText =
          typeof item === "string"
            ? null
            : String(
                item?.altText || ""
              ).trim();

        if (!imageUrl) {
          continue;
        }

        await sql`
          INSERT INTO "projectImage" (
            "projectId",
            "imageUrl",
            "altText",
            "sortOrder"
          )
          VALUES (
            ${projectId},
            ${imageUrl},
            ${altText || null},
            ${index}
          )
        `;
      }
    }

    return NextResponse.json({
      success: true,
      message: "Project updated successfully.",
      project: updated[0],
    });
  } catch (error) {
    console.error("PROJECT_UPDATE_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Could not update project.",
      },
      { status: 500 }
    );
  }
}


/* =========================================================
   DELETE PROJECT
   DELETE /api/projects/:id
========================================================= */

export async function DELETE(
  request: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await context.params;

    const projectId = Number(id);

    if (!Number.isInteger(projectId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid project ID.",
        },
        { status: 400 }
      );
    }

    /* ---------- Delete gallery images ---------- */

    await sql`
      DELETE FROM "projectImage"
      WHERE "projectId" = ${projectId}
    `;

    /* ---------- Delete project ---------- */

    const deleted = await sql`
      DELETE FROM "project"
      WHERE "id" = ${projectId}
      RETURNING "id"
    `;

    if (deleted.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully.",
    });
  } catch (error) {
    console.error("PROJECT_DELETE_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Could not delete project.",
      },
      { status: 500 }
    );
  }
}