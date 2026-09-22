import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import fs from "fs/promises";
import path from "path";

function getSecret() {
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("AUTH_SECRET is missing.");
  }

  return new TextEncoder().encode(secret);
}

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get("token");

    if (!token) {
      return new NextResponse("Unauthorized.", {
        status: 401,
      });
    }

    const { payload } = await jwtVerify(
      token,
      getSecret()
    );

    if (
      payload.purpose !== "brochure-download" ||
      !payload.leadId
    ) {
      return new NextResponse("Invalid download token.", {
        status: 401,
      });
    }

    const filePath = path.join(
      process.cwd(),
      "private",
      "downloads",
      "colourplus-brochure.pdf"
    );

    const file = await fs.readFile(filePath);

    return new NextResponse(file, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="Colourplus-Industrial-Flooring-Brochure.pdf"',
        "Cache-Control":
          "private, no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("BROCHURE_DOWNLOAD_ERROR:", error);

    return new NextResponse(
      "Brochure is currently unavailable.",
      {
        status: 500,
      }
    );
  }
}