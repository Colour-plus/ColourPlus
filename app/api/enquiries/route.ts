import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

type EnquiryBody = {
  full_name?: string;
  company?: string;
  email?: string;
  phone?: string;
  facility_type?: string;
  flooring_area?: string;
  project_requirement?: string;
  project_start_timeline?: string;
  project_role?: string;
  project_city?: string;
  message?: string;

  // Also accept camelCase in case another frontend
  // component submits the form that way.
  name?: string;
  facilityType?: string;
  flooringArea?: string;
  projectRequirement?: string;
  projectStartTimeline?: string;
  projectRole?: string;
  projectCity?: string;
};

function clean(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();

  return trimmed.length > 0 ? trimmed : null;
}

export async function POST(request: Request) {
  try {
    /* ---------------------------------------------------------
       DATABASE CONFIGURATION CHECK
       --------------------------------------------------------- */

    if (!process.env.DATABASE_URL) {
      console.error(
        "ENQUIRY_ERROR: DATABASE_URL is not configured."
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Server configuration error. Please try again later.",
        },
        { status: 500 }
      );
    }


    /* ---------------------------------------------------------
       READ REQUEST BODY
       --------------------------------------------------------- */

    let body: EnquiryBody;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request data.",
        },
        { status: 400 }
      );
    }


    /* ---------------------------------------------------------
       NORMALIZE FORM FIELDS
       --------------------------------------------------------- */

    const name =
      clean(body.full_name) ??
      clean(body.name);

    const company =
      clean(body.company);

    const email =
      clean(body.email);

    const phone =
      clean(body.phone);

    const facilityType =
      clean(body.facility_type) ??
      clean(body.facilityType);

    const flooringArea =
      clean(body.flooring_area) ??
      clean(body.flooringArea);

    const projectRequirement =
      clean(body.project_requirement) ??
      clean(body.projectRequirement);

    const projectStartTimeline =
      clean(body.project_start_timeline) ??
      clean(body.projectStartTimeline);

    const projectRole =
      clean(body.project_role) ??
      clean(body.projectRole);

    const projectCity =
      clean(body.project_city) ??
      clean(body.projectCity);

    const message =
      clean(body.message);


    /* ---------------------------------------------------------
       SERVER-SIDE VALIDATION
       --------------------------------------------------------- */

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter your full name.",
          field: "full_name",
        },
        { status: 400 }
      );
    }

    if (!phone) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter your phone number.",
          field: "phone",
        },
        { status: 400 }
      );
    }


    /* ---------------------------------------------------------
       BASIC PHONE VALIDATION
       --------------------------------------------------------- */

    const normalizedPhone = phone.replace(
      /[\s\-().]/g,
      ""
    );

    if (!/^\+?\d{10,15}$/.test(normalizedPhone)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter a valid phone number.",
          field: "phone",
        },
        { status: 400 }
      );
    }


    /* ---------------------------------------------------------
       EMAIL VALIDATION
       --------------------------------------------------------- */

    if (email) {
      const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email)) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Please enter a valid email address.",
            field: "email",
          },
          { status: 400 }
        );
      }
    }


    /* ---------------------------------------------------------
       INSERT INTO NEON
       --------------------------------------------------------- */

    const result = await sql`
      INSERT INTO "enquiry" (
        "name",
        "company",
        "email",
        "phone",
        "facilityType",
        "flooringArea",
        "projectRequirement",
        "projectStartTimeline",
        "projectRole",
        "projectCity",
        "message",
        "source",
        "status",
        "createdAt",
        "updatedAt"
      )
      VALUES (
        ${name},
        ${company},
        ${email},
        ${normalizedPhone},
        ${facilityType},
        ${flooringArea},
        ${projectRequirement},
        ${projectStartTimeline},
        ${projectRole},
        ${projectCity},
        ${message},
        'WEBSITE',
        'NEW',
        NOW(),
        NOW()
      )
      RETURNING
        "id",
        "name",
        "company",
        "email",
        "phone",
        "facilityType",
        "flooringArea",
        "projectRequirement",
        "projectStartTimeline",
        "projectRole",
        "projectCity",
        "message",
        "source",
        "status",
        "createdAt",
        "updatedAt"
    `;


    /* ---------------------------------------------------------
       SUCCESS
       --------------------------------------------------------- */

    const enquiry = result[0];

    console.log(
      "ENQUIRY_CREATED:",
      enquiry?.id
    );

    return NextResponse.json(
      {
        success: true,
        message:
          "Project brief submitted successfully.",
        enquiryId: enquiry?.id,
      },
      { status: 201 }
    );

  } catch (error) {

    console.error(
      "ENQUIRY_CREATE_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to submit the project brief right now. Please try again.",
      },
      { status: 500 }
    );
  }
}


/* ============================================================
   OPTIONAL GET — ADMIN / DEBUG FRIENDLY
   ============================================================ */

export async function GET() {
  try {
    const enquiries = await sql`
      SELECT
        "id",
        "name",
        "company",
        "email",
        "phone",
        "facilityType",
        "flooringArea",
        "projectRequirement",
        "projectStartTimeline",
        "projectRole",
        "projectCity",
        "message",
        "source",
        "status",
        "createdAt",
        "updatedAt"
      FROM "enquiry"
      ORDER BY "createdAt" DESC
      LIMIT 20
    `;

    return NextResponse.json({
      success: true,
      enquiries,
    });

  } catch (error) {

    console.error(
      "ENQUIRY_GET_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to load enquiries.",
      },
      { status: 500 }
    );
  }
}