import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const showAll = searchParams.get("all") === "true";

    const products = showAll
      ? await sql`
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
                  'id', pb."id",
                  'text', pb."text",
                  'sortOrder', pb."sortOrder"
                )
                ORDER BY pb."sortOrder"
              ) FILTER (WHERE pb."id" IS NOT NULL),
              '[]'::json
            ) AS "benefits"
          FROM "product" p
          LEFT JOIN "productBenefit" pb
            ON pb."productId" = p."id"
          GROUP BY
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
            p."updatedAt"
          ORDER BY
            p."sortOrder" ASC,
            p."number" ASC
        `
      : await sql`
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
                  'id', pb."id",
                  'text', pb."text",
                  'sortOrder', pb."sortOrder"
                )
                ORDER BY pb."sortOrder"
              ) FILTER (WHERE pb."id" IS NOT NULL),
              '[]'::json
            ) AS "benefits"
          FROM "product" p
          LEFT JOIN "productBenefit" pb
            ON pb."productId" = p."id"
          WHERE p."isActive" = true
          GROUP BY
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
            p."updatedAt"
          ORDER BY
            p."sortOrder" ASC,
            p."number" ASC
        `;

    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("PRODUCTS_GET_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Could not load products.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const number = Number(body.number);
    const name = String(body.name || "").trim();
    const family = String(body.family || "").trim();
    const short = body.short
      ? String(body.short).trim()
      : null;
    const description = body.description
      ? String(body.description).trim()
      : null;
    const image = body.image
      ? String(body.image).trim()
      : null;
    const tag = body.tag
      ? String(body.tag).trim()
      : null;

    const isActive =
      typeof body.isActive === "boolean"
        ? body.isActive
        : true;

    const sortOrder =
      body.sortOrder !== undefined
        ? Number(body.sortOrder)
        : 0;

    const benefits = Array.isArray(body.benefits)
      ? body.benefits
          .map((item: unknown) =>
            String(item).trim()
          )
          .filter(Boolean)
      : [];

    if (!Number.isInteger(number) || number <= 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Product number must be a positive integer.",
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

    const existing = await sql`
      SELECT "id"
      FROM "product"
      WHERE "number" = ${number}
      LIMIT 1
    `;

    if (existing.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "A product with this number already exists.",
        },
        { status: 409 }
      );
    }

    const productResult = await sql`
      INSERT INTO "product" (
        "number",
        "name",
        "family",
        "short",
        "description",
        "image",
        "tag",
        "isActive",
        "sortOrder"
      )
      VALUES (
        ${number},
        ${name},
        ${family},
        ${short},
        ${description},
        ${image},
        ${tag},
        ${isActive},
        ${sortOrder}
      )
      RETURNING
        "id",
        "number",
        "name",
        "family",
        "short",
        "description",
        "image",
        "tag",
        "isActive",
        "sortOrder",
        "createdAt",
        "updatedAt"
    `;

    const product = productResult[0];

    for (let index = 0; index < benefits.length; index++) {
      await sql`
        INSERT INTO "productBenefit" (
          "productId",
          "text",
          "sortOrder"
        )
        VALUES (
          ${product.id},
          ${benefits[index]},
          ${index}
        )
      `;
    }

    return NextResponse.json(
      {
        success: true,
        product: {
          ...product,
          benefits,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("PRODUCT_CREATE_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Could not create product.",
      },
      { status: 500 }
    );
  }
}