import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

function getDatabase() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is missing.");
  }

  return neon(databaseUrl);
}

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

/**
 * GET /api/products/:id
 *
 * Returns one product with all of its benefits.
 */
export async function GET(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const productId = Number(id);

    if (!Number.isInteger(productId) || productId <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid product ID.",
        },
        { status: 400 }
      );
    }

    const sql = getDatabase();

    const result = await sql`
      SELECT
        p."id",
        p."number",
        p."name",
        p."family",
        p."short",
        p."description",
        p."image",
        p."tag",
        p."isActive",
        p."sortOrder",
        p."createdAt",
        p."updatedAt",
        COALESCE(
          json_agg(
            json_build_object(
              'id', b."id",
              'text', b."text",
              'sortOrder', b."sortOrder"
            )
            ORDER BY b."sortOrder" ASC, b."id" ASC
          ) FILTER (WHERE b."id" IS NOT NULL),
          '[]'::json
        ) AS "benefits"
      FROM "Product" p
      LEFT JOIN "ProductBenefit" b
        ON b."productId" = p."id"
      WHERE p."id" = ${productId}
      GROUP BY p."id"
      LIMIT 1
    `;

    if (result.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      product: result[0],
    });
  } catch (error) {
    console.error("PRODUCT_GET_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Could not load product.",
      },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/products/:id
 *
 * Updates a product and optionally replaces its benefits.
 */
export async function PATCH(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const productId = Number(id);

    if (!Number.isInteger(productId) || productId <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid product ID.",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    const sql = getDatabase();

    // Check product exists.
    const existing = await sql`
      SELECT
        "id",
        "number",
        "name",
        "family",
        "short",
        "description",
        "image",
        "tag",
        "isActive",
        "sortOrder"
      FROM "Product"
      WHERE "id" = ${productId}
      LIMIT 1
    `;

    if (existing.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found.",
        },
        { status: 404 }
      );
    }

    const current = existing[0];

    // Keep existing values when a field isn't supplied.
    const number =
      body.number === undefined
        ? Number(current.number)
        : Number(body.number);

    const name =
      body.name === undefined
        ? String(current.name)
        : String(body.name).trim();

    const family =
      body.family === undefined
        ? String(current.family)
        : String(body.family).trim();

    const short =
      body.short === undefined
        ? current.short
        : body.short === null
          ? null
          : String(body.short).trim() || null;

    const description =
      body.description === undefined
        ? current.description
        : body.description === null
          ? null
          : String(body.description).trim() || null;

    const image =
      body.image === undefined
        ? current.image
        : body.image === null
          ? null
          : String(body.image).trim() || null;

    const tag =
      body.tag === undefined
        ? current.tag
        : body.tag === null
          ? null
          : String(body.tag).trim() || null;

    const isActive =
      body.isActive === undefined
        ? Boolean(current.isActive)
        : Boolean(body.isActive);

    const sortOrder =
      body.sortOrder === undefined
        ? Number(current.sortOrder)
        : Number(body.sortOrder);

    if (!Number.isInteger(number) || number <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "A valid product number is required.",
        },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          message: "Product name is required.",
        },
        { status: 400 }
      );
    }

    if (!family) {
      return NextResponse.json(
        {
          success: false,
          message: "Product family is required.",
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

    // Check whether another product already uses this number.
    const duplicate = await sql`
      SELECT "id"
      FROM "Product"
      WHERE "number" = ${number}
        AND "id" <> ${productId}
      LIMIT 1
    `;

    if (duplicate.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Product number ${number} is already in use.`,
        },
        { status: 409 }
      );
    }

    // Update product.
    await sql`
      UPDATE "Product"
      SET
        "number" = ${number},
        "name" = ${name},
        "family" = ${family},
        "short" = ${short},
        "description" = ${description},
        "image" = ${image},
        "tag" = ${tag},
        "isActive" = ${isActive},
        "sortOrder" = ${sortOrder},
        "updatedAt" = NOW()
      WHERE "id" = ${productId}
    `;

    // If benefits were supplied, replace the existing benefits.
    if (Array.isArray(body.benefits)) {
      const benefits = body.benefits
        .map((benefit: unknown) => String(benefit).trim())
        .filter(Boolean);

      await sql`
        DELETE FROM "ProductBenefit"
        WHERE "productId" = ${productId}
      `;

      for (let index = 0; index < benefits.length; index++) {
        await sql`
          INSERT INTO "ProductBenefit" (
            "productId",
            "text",
            "sortOrder"
          )
          VALUES (
            ${productId},
            ${benefits[index]},
            ${index}
          )
        `;
      }
    }

    // Return updated product.
    const updated = await sql`
      SELECT
        p."id",
        p."number",
        p."name",
        p."family",
        p."short",
        p."description",
        p."image",
        p."tag",
        p."isActive",
        p."sortOrder",
        p."createdAt",
        p."updatedAt",
        COALESCE(
          json_agg(
            json_build_object(
              'id', b."id",
              'text', b."text",
              'sortOrder', b."sortOrder"
            )
            ORDER BY b."sortOrder" ASC, b."id" ASC
          ) FILTER (WHERE b."id" IS NOT NULL),
          '[]'::json
        ) AS "benefits"
      FROM "Product" p
      LEFT JOIN "ProductBenefit" b
        ON b."productId" = p."id"
      WHERE p."id" = ${productId}
      GROUP BY p."id"
      LIMIT 1
    `;

    return NextResponse.json({
      success: true,
      product: updated[0],
    });
  } catch (error) {
    console.error("PRODUCT_UPDATE_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Could not update product.",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/products/:id
 *
 * Deletes a product and its benefits.
 *
 * Product enquiries are checked first so we don't accidentally
 * delete historical enquiry relationships.
 */
export async function DELETE(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const productId = Number(id);

    if (!Number.isInteger(productId) || productId <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid product ID.",
        },
        { status: 400 }
      );
    }

    const sql = getDatabase();

    const existing = await sql`
      SELECT
        "id",
        "name"
      FROM "Product"
      WHERE "id" = ${productId}
      LIMIT 1
    `;

    if (existing.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found.",
        },
        { status: 404 }
      );
    }

    const enquiryLinks = await sql`
      SELECT COUNT(*)::int AS "count"
      FROM "ProductEnquiry"
      WHERE "productId" = ${productId}
    `;

    const enquiryCount = Number(
      enquiryLinks[0]?.count || 0
    );

    if (enquiryCount > 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This product is linked to enquiries and cannot be deleted. Deactivate it instead.",
        },
        { status: 409 }
      );
    }

    // Remove benefits first.
    await sql`
      DELETE FROM "ProductBenefit"
      WHERE "productId" = ${productId}
    `;

    // Remove product.
    await sql`
      DELETE FROM "Product"
      WHERE "id" = ${productId}
    `;

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    console.error("PRODUCT_DELETE_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Could not delete product.",
      },
      { status: 500 }
    );
  }
}