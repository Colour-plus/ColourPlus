import { NextRequest, NextResponse } from "next/server";

import {
  COOKIE_NAME,
  verifyAdminToken,
} from "@/lib/auth";

export async function middleware(
  request: NextRequest
) {
  const { pathname } = request.nextUrl;

  const token =
    request.cookies.get(COOKIE_NAME)?.value;

  const isAuthenticated =
    !!token &&
    (await verifyAdminToken(token));

  // --------------------------------------------------
  // ADMIN PAGES
  // --------------------------------------------------

  if (
    pathname.startsWith("/admin") &&
    pathname !== "/admin/login"
  ) {
    if (!isAuthenticated) {
      return NextResponse.redirect(
        new URL(
          "/admin/login",
          request.url
        )
      );
    }
  }

  // --------------------------------------------------
  // ENQUIRY API
  //
  // POST = public website form
  // GET / PATCH / DELETE = admin only
  // --------------------------------------------------

  if (
    pathname.startsWith("/api/enquiries")
  ) {
    if (
      request.method !== "POST" &&
      !isAuthenticated
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        { status: 401 }
      );
    }
  }

  // --------------------------------------------------
  // PRODUCT API
  //
  // GET = public website
  // POST / PATCH / DELETE = admin only
  // --------------------------------------------------

  if (
    pathname.startsWith("/api/products")
  ) {
    if (
      request.method !== "GET" &&
      !isAuthenticated
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        { status: 401 }
      );
    }
  }

  // --------------------------------------------------
  // PROJECT API
  //
  // GET = public website
  // POST / PATCH / DELETE = admin only
  // --------------------------------------------------

  if (
    pathname.startsWith("/api/projects")
  ) {
    if (
      request.method !== "GET" &&
      !isAuthenticated
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        { status: 401 }
      );
    }
  }

  // --------------------------------------------------
  // CLIENT API
  //
  // GET = public website
  // POST / PATCH / DELETE = admin only
  // --------------------------------------------------

  if (
    pathname.startsWith("/api/clients")
  ) {
    if (
      request.method !== "GET" &&
      !isAuthenticated
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        { status: 401 }
      );
    }
  }

  // --------------------------------------------------
  // AR FLOORING API
  //
  // GET = public website
  // POST / PATCH / DELETE = admin only
  // --------------------------------------------------

  if (
    pathname.startsWith("/api/ar-flooring")
  ) {
    if (
      request.method !== "GET" &&
      !isAuthenticated
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        { status: 401 }
      );
    }
  }

  // --------------------------------------------------
  // ADMIN DASHBOARD API
  //
  // GET = admin only
  // --------------------------------------------------

  if (
    pathname.startsWith(
      "/api/admin/dashboard"
    )
  ) {
    if (!isAuthenticated) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        { status: 401 }
      );
    }
  }

  // --------------------------------------------------
  // ALLOW REQUEST
  // --------------------------------------------------

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/enquiries/:path*",
    "/api/products/:path*",
    "/api/projects/:path*",
    "/api/clients/:path*",
    "/api/ar-flooring/:path*",
    "/api/admin/dashboard/:path*",
  ],
};