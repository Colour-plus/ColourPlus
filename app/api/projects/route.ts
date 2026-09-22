import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

/* =========================================================
   GET ALL PROJECTS
   GET /api/projects
   GET /api/projects?all=true
========================================================= */

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const showAll = searchParams.get("all") === "true";

    const projects = await sql`
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

      ${
        showAll
          ? sql``
          : sql`WHERE p."isActive" = true`
      }

      ORDER BY
        p."sortOrder" ASC,
        p."createdAt" DESC
    `;

    return NextResponse.json({
      success: true,
      projects,
    });
  } catch (error) {
    console.error("PROJECTS_GET_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Could not load projects.",
      },
      { status: 500 }
    );
  }
}


/* =========================================================
   CREATE PROJECT
   POST /api/projects
========================================================= */

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const title = String(body.title || "").trim();
    const location = String(body.location || "").trim();
    const industry = String(body.industry || "").trim();
    const description = String(body.description || "").trim();
    const image = String(body.image || "").trim();
    const category = String(body.category || "").trim();

    const isFeatured =
      body.isFeatured === true;

    const isActive =
      body.isActive !== false;

    const sortOrder =
      Number.isFinite(Number(body.sortOrder))
        ? Number(body.sortOrder)
        : 0;

    const images = Array.isArray(body.images)
      ? body.images
      : [];

    /* ---------- Validation ---------- */

    if (!title) {
      return NextResponse.json(
        {
          success: false,
          message: "Project title is required.",
        },
        { status: 400 }
      );
    }

    /* ---------- Create project ---------- */

    const projectResult = await sql`
      INSERT INTO "project" (
        "title",
        "location",
        "industry",
        "description",
        "image",
        "category",
        "isFeatured",
        "isActive",
        "sortOrder",
        "updatedAt"
      )
      VALUES (
        ${title},
        ${location || null},
        ${industry || null},
        ${description || null},
        ${image || null},
        ${category || null},
        ${isFeatured},
        ${isActive},
        ${sortOrder},
        NOW()
      )
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

    const project = projectResult[0];

    /* ---------- Add gallery images ---------- */

    for (let index = 0; index < images.length; index++) {
      const item = images[index];

      const imageUrl =
        typeof item === "string"
          ? item.trim()
          : String(item?.imageUrl || "").trim();

      const altText =
        typeof item === "string"
          ? null
          : String(item?.altText || "").trim();

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
          ${project.id},
          ${imageUrl},
          ${altText || null},
          ${index}
        )
      `;
    }

    return NextResponse.json(
      {
        success: true,
        message: "Project created successfully.",
        project,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("PROJECT_CREATE_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Could not create project.",
      },
      { status: 500 }
    );
  }
}