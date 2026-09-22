import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { SignJWT } from "jose";

const sql = neon(process.env.DATABASE_URL!);

function getSecret() {
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("AUTH_SECRET is missing.");
  }

  return new TextEncoder().encode(secret);
}

async function createDownloadToken(leadId: number) {
  return new SignJWT({
    leadId,
    purpose: "brochure-download",
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("10m")
    .sign(getSecret());
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = String(body.name || "").trim();
    const mobile = String(body.mobile || "").trim();

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter your name.",
        },
        { status: 400 }
      );
    }

    if (!mobile) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter your mobile number.",
        },
        { status: 400 }
      );
    }

    const cleanMobile = mobile.replace(/\s+/g, "");

    if (!/^[+]?[0-9]{10,15}$/.test(cleanMobile)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid mobile number.",
        },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO "brochureLead" (
        "name",
        "mobile"
      )
      VALUES (
        ${name},
        ${cleanMobile}
      )
      RETURNING
        "id",
        "name",
        "mobile",
        "createdAt"
    `;

    const lead = result[0];

    const token = await createDownloadToken(Number(lead.id));

    return NextResponse.json({
      success: true,
      message: "Details recorded successfully.",
      downloadUrl: `/api/brochure/download?token=${encodeURIComponent(
        token
      )}`,
    });
  } catch (error) {
    console.error("BROCHURE_LEAD_CREATE_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to process your request. Please try again.",
      },
      { status: 500 }
    );
  }
}