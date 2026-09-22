"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronDown,
} from "lucide-react";

const facilityTypes = [
  "Manufacturing / Factory",
  "Warehouse / Logistics",
  "Pharmaceutical",
  "Food & Beverage",
  "Automotive",
  "Healthcare",
  "Commercial",
  "Institutional",
  "Other",
];

const flooringAreas = [
  "< 5,000 sq. ft.",
  "5,000–10,000 sq. ft.",
  "10,000–25,000 sq. ft.",
  "25,000–50,000 sq. ft.",
  "50,000+ sq. ft.",
  "I will specify the area",
];

const projectRequirements = [
  "New Flooring",
  "Floor Renovation / Upgrade",
  "Protective Coating",
  "Waterproofing",
  "Repair / Restoration",
  "Need Technical Guidance",
  "Other",
];

const projectStartTimelines = [
  "Immediately",
  "Within 1 month",
  "1–3 months",
  "3–6 months",
  "6+ months",
  "Planning / Not decided",
];

const projectRoles = [
  "Owner",
  "Architect",
  "Consultant",
  "Contractor",
  "Project Manager",
  "Procurement",
  "Facility Manager",
  "Other",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const revealRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    revealRefs.current.forEach((element) => {
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            element.classList.add("is-visible");
          }
        },
        {
          threshold: 0.12,
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const addRevealRef = (element: HTMLElement | null) => {
    if (element && !revealRefs.current.includes(element)) {
      revealRefs.current.push(element);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const getValue = (field: string) => {
      const value = formData.get(field);
      return typeof value === "string" ? value.trim() : "";
    };

    const payload = {
      full_name: getValue("full_name"),
      company: getValue("company"),
      email: getValue("email"),
      phone: getValue("phone"),
      facility_type: getValue("facility_type"),
      flooring_area: getValue("flooring_area"),
      project_requirement: getValue("project_requirement"),
      project_start_timeline: getValue("project_start_timeline"),
      project_role: getValue("project_role"),
      project_city: getValue("project_city"),
      message: getValue("message"),
    };

    const requiredFields: Array<[keyof typeof payload, string]> = [
      ["full_name", "Full name"],
      ["company", "Company / organisation"],
      ["email", "Email address"],
      ["phone", "Phone number"],
      ["facility_type", "Facility type"],
      ["flooring_area", "Flooring area"],
      ["project_requirement", "Project requirement"],
      ["project_start_timeline", "Project start timeline"],
      ["project_role", "Your role"],
      ["project_city", "Project city"],
    ];

    const missingField = requiredFields.find(([key]) => !payload[key]);

    if (missingField) {
      setSubmitError(`Please complete ${missingField[1]}.`);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        throw new Error(
          result?.message || "Unable to submit your project brief."
        );
      }

      console.log("ENQUIRY CREATED:", result.enquiryId);

      setSubmitted(true);
      form.reset();
    } catch (error) {
      console.error("CONTACT_FORM_ERROR:", error);

      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to submit your project brief. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <main className="contact-page">

        {/* =========================================================
            SECTION 1 — HERO
        ========================================================= */}

        <section className="contact-hero">

          <div className="contact-hero-image">
            <img
              src="/images/contact/start-project-hero.jpg"
              alt="Colourplus engineered surface project"
            />
          </div>

          <div className="contact-hero-overlay" />

          <div className="contact-hero-top">
            <span>COLOURPLUS / CONTACT</span>
            <span>ENGINEERED SURFACES / INDIA</span>
          </div>

          <div className="contact-hero-content">

            <div className="contact-hero-index">
              01 / START A PROJECT
            </div>

            <h1>
              Let's build the
              <br />
              <em>right surface</em>
              <br />
              for the space.
            </h1>

            <p>
              Tell us about your project, environment and surface
              requirements. We&apos;ll help move the requirement towards
              the right technical direction.
            </p>

            <a
              href="#project-enquiry"
              className="contact-hero-link"
            >
              START YOUR ENQUIRY
              <ArrowDownRight
                size={17}
                strokeWidth={1.5}
              />
            </a>

          </div>

          <div className="contact-hero-bottom">
            <span>CONTACT / 01</span>
            <span>PROJECT ENQUIRY</span>
            <span>SCROLL TO BEGIN</span>
          </div>

          <div className="contact-hero-line" />

        </section>


        {/* =========================================================
            SECTION 2 — HOW WE WORK
        ========================================================= */}

        <section
          className="contact-process"
          ref={addRevealRef}
        >

          <div className="process-top">

            <div>

              <p className="eyebrow">
                02 / HOW WE WORK
              </p>

              <h2>
                Start with the
                <br />
                <em>requirement.</em>
              </h2>

            </div>

            <div className="process-intro">

              <p>
                Every project starts differently. A new facility, an
                existing floor, a waterproofing problem or an architectural
                surface requirement can all demand a different approach.
              </p>

              <p>
                We begin by understanding the environment and the
                requirement before moving towards the appropriate surface
                system.
              </p>

            </div>

          </div>

          <div className="process-line">

            {[
              {
                no: "01",
                title: "ENQUIRE",
              },
              {
                no: "02",
                title: "ASSESS",
              },
              {
                no: "03",
                title: "SPECIFY",
              },
              {
                no: "04",
                title: "EXECUTE",
              },
            ].map((item) => (

              <div
                className="process-step"
                key={item.no}
              >

                <span className="process-step-number">
                  {item.no}
                </span>

                <div className="process-step-dot" />

                <span className="process-step-title">
                  {item.title}
                </span>

              </div>

            ))}

          </div>

        </section>


        {/* =========================================================
            SECTION 3 — PROJECT BRIEF
        ========================================================= */}

        <section
          id="project-enquiry"
          className="project-brief"
          ref={addRevealRef}
        >

          <div className="project-brief-grid" />

          <div className="project-brief-scan" />

          <div className="project-brief-inner">

            {/* PROJECT HEADER */}

            <div className="project-brief-header">

              <div className="project-brief-kicker">

                <span className="brief-kicker-line" />

                <span>
                  03 / PROJECT BRIEF
                </span>

              </div>

              <div className="project-brief-meta">

                <span>COLOURPLUS</span>
                <span>ENGINEERED SURFACES</span>
                <span>INDIA</span>

              </div>

            </div>


            {/* MAIN TWO COLUMN AREA */}

            <div className="project-brief-layout">

              {/* =====================================================
                  LEFT EDITORIAL SIDE
              ===================================================== */}

              <div className="project-brief-intro">

                <div className="brief-large-number">
                  03
                </div>

                <div className="brief-accent-line" />

                <div className="brief-small-label">
                  PROJECT / REQUIREMENT
                </div>

                <div className="brief-heading-wrap">

                  <h2>
                    Tell us about
                    <br />
                    the{" "}
                    <em>
                      surface.
                    </em>
                  </h2>

                  <div className="heading-underline" />

                  <p>
                    Give us the project context. The more we understand
                    about the environment, the better we can direct the
                    surface solution.
                  </p>

                </div>


                {/* LEFT INFORMATION */}

                <div className="brief-information">

                  <div className="brief-info-item">

                    <span>
                      01
                    </span>

                    <div>
                      <strong>
                        REQUIREMENT
                      </strong>

                      <p>
                        What needs to be solved?
                      </p>
                    </div>

                  </div>


                  <div className="brief-info-item">

                    <span>
                      02
                    </span>

                    <div>
                      <strong>
                        CONDITION
                      </strong>

                      <p>
                        What is the environment?
                      </p>
                    </div>

                  </div>


                  <div className="brief-info-item">

                    <span>
                      03
                    </span>

                    <div>
                      <strong>
                        DIRECTION
                      </strong>

                      <p>
                        What should the surface achieve?
                      </p>
                    </div>

                  </div>

                </div>


                <div className="brief-left-footer">

                  <span>
                    COLOURPLUS / 03
                  </span>

                  <div />

                  <span>
                    SURFACE INTELLIGENCE
                  </span>

                </div>

              </div>


              {/* =====================================================
                  FORM
              ===================================================== */}

              <div className="project-form-column">

                {!submitted ? (

                  <form
                    className="project-form"
                    onSubmit={handleSubmit}
                  >

                    {/* FORM HEADER */}

                    <div className="form-header">

                      <div className="form-header-number">
                        01
                      </div>

                      <div>

                        <span className="project-information-title">
                          PROJECT INFORMATION
                        </span>

                        <p>
                          Tell us what you are working on.
                        </p>

                      </div>

                    </div>


                    {/* FULL NAME */}

                    <div className="form-row">

                      <div className="form-label">
                        <span className="form-number">01</span>
                        <span>FULL NAME</span>
                      </div>

                      <div className="form-field">
                        <input
                          type="text"
                          name="full_name"
                          placeholder="Your full name"
                          autoComplete="name"
                          required
                        />
                      </div>

                    </div>


                    {/* COMPANY */}

                    <div className="form-row">

                      <div className="form-label">
                        <span className="form-number">02</span>
                        <span>COMPANY / ORGANISATION</span>
                      </div>

                      <div className="form-field">
                        <input
                          type="text"
                          name="company"
                          placeholder="Company or organisation name"
                          autoComplete="organization"
                          required
                        />
                      </div>

                    </div>


                    {/* EMAIL */}

                    <div className="form-row">

                      <div className="form-label">
                        <span className="form-number">03</span>
                        <span>EMAIL</span>
                      </div>

                      <div className="form-field">
                        <input
                          type="email"
                          name="email"
                          placeholder="Email address"
                          autoComplete="email"
                          required
                        />
                      </div>

                    </div>


                    {/* PHONE */}

                    <div className="form-row">

                      <div className="form-label">
                        <span className="form-number">04</span>
                        <span>PHONE</span>
                      </div>

                      <div className="form-field">
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone number"
                          autoComplete="tel"
                          required
                        />
                      </div>

                    </div>


                    {/* FACILITY TYPE */}

                    <div className="form-row">

                      <div className="form-label">
                        <span className="form-number">05</span>
                        <span>FACILITY TYPE</span>
                      </div>

                      <div className="form-field">
                        <select
                          name="facility_type"
                          required
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Select facility type
                          </option>
                          {facilityTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>

                        <ChevronDown size={16} strokeWidth={1.3} />
                      </div>

                    </div>


                    {/* FLOORING AREA */}

                    <div className="form-row">

                      <div className="form-label">
                        <span className="form-number">06</span>
                        <span>FLOORING AREA</span>
                      </div>

                      <div className="form-field">
                        <select
                          name="flooring_area"
                          required
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Select approximate area
                          </option>
                          {flooringAreas.map((area) => (
                            <option key={area} value={area}>
                              {area}
                            </option>
                          ))}
                        </select>

                        <ChevronDown size={16} strokeWidth={1.3} />
                      </div>

                    </div>


                    {/* PROJECT REQUIREMENT */}

                    <div className="form-row">

                      <div className="form-label">
                        <span className="form-number">07</span>
                        <span>PROJECT REQUIREMENT</span>
                      </div>

                      <div className="form-field">
                        <select
                          name="project_requirement"
                          required
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Select project requirement
                          </option>
                          {projectRequirements.map((requirement) => (
                            <option key={requirement} value={requirement}>
                              {requirement}
                            </option>
                          ))}
                        </select>

                        <ChevronDown size={16} strokeWidth={1.3} />
                      </div>

                    </div>


                    {/* PROJECT START TIMELINE */}

                    <div className="form-row">

                      <div className="form-label">
                        <span className="form-number">08</span>
                        <span>PROJECT START TIMELINE</span>
                      </div>

                      <div className="form-field">
                        <select
                          name="project_start_timeline"
                          required
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Select expected timeline
                          </option>
                          {projectStartTimelines.map((timeline) => (
                            <option key={timeline} value={timeline}>
                              {timeline}
                            </option>
                          ))}
                        </select>

                        <ChevronDown size={16} strokeWidth={1.3} />
                      </div>

                    </div>


                    {/* PROJECT ROLE */}

                    <div className="form-row">

                      <div className="form-label">
                        <span className="form-number">09</span>
                        <span>YOUR ROLE</span>
                      </div>

                      <div className="form-field">
                        <select
                          name="project_role"
                          required
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Select your role
                          </option>
                          {projectRoles.map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>

                        <ChevronDown size={16} strokeWidth={1.3} />
                      </div>

                    </div>


                    {/* PROJECT CITY */}

                    <div className="form-row">

                      <div className="form-label">
                        <span className="form-number">10</span>
                        <span>PROJECT CITY</span>
                      </div>

                      <div className="form-field">
                        <input
                          type="text"
                          name="project_city"
                          placeholder="City where the project is located"
                          autoComplete="address-level2"
                          required
                        />
                      </div>

                    </div>


                    {/* MESSAGE */}

                    <div className="form-row form-row-message">

                      <div className="form-label">
                        <span className="form-number">11</span>
                        <span>MESSAGE</span>
                      </div>

                      <div className="form-field">
                        <textarea
                          name="message"
                          rows={4}
                          placeholder="Tell us about the facility, surface condition, approximate area, environment or any specific requirement."
                          required
                        />
                      </div>

                    </div>

                    {/* FORM FOOTER */}

                    <div className="form-footer">

                      <div className="form-footer-note">

                        <span>
                          PROJECT BRIEF / 03
                        </span>

                        <p>
                          Your information helps us understand the
                          requirement before the technical discussion.
                        </p>

                      </div>

                      <button
  type="submit"
  className="brief-submit"
  disabled={isSubmitting}
>
  <span>
    {isSubmitting
      ? "SENDING PROJECT BRIEF..."
      : "SEND PROJECT BRIEF"}
  </span>

  <span className="brief-submit-icon">
    <ArrowUpRight size={18} strokeWidth={1.4} />
  </span>
</button>
{submitError && (
  <p
    style={{
      marginTop: "14px",
      color: "#b42318",
      fontSize: "11px",
      lineHeight: 1.6,
    }}
  >
    {submitError}
  </p>
)}

                    </div>

                  </form>

                ) : (

                  <div className="project-success">

                    <div className="success-number">
                      03
                    </div>

                    <div className="success-icon">

                      <Check
                        size={28}
                        strokeWidth={1.4}
                      />

                    </div>

                    <p className="success-eyebrow">
                      PROJECT BRIEF RECEIVED
                    </p>

                    <h3>
                      Thank you.
                      <br />
                      <em>
                        We&apos;ll take it from here.
                      </em>
                    </h3>

                    <p className="success-copy">
                      Your project information has been captured. The next
                      step is understanding the requirement and moving
                      towards the right technical direction.
                    </p>

                    <button
                      type="button"
                      className="success-reset"
                      onClick={() => setSubmitted(false)}
                    >
                      SEND ANOTHER BRIEF
                      <ArrowUpRight size={15} />
                    </button>

                  </div>

                )}

              </div>

            </div>


            {/* BOTTOM STRIP */}

            <div className="project-brief-bottom">

              <span>
                COLOURPLUS / PROJECT BRIEF
              </span>

              <div className="brief-bottom-line" />

              <span>
                SURFACE / PERFORMANCE / ENVIRONMENT
              </span>

            </div>

          </div>

        </section>

      </main>


      <style jsx>{`

        * {
          box-sizing: border-box;
        }

        .contact-page {
          background: #f4f3ef;
          color: #07172b;
          overflow: hidden;
        }

        .eyebrow {
          margin: 0 0 20px;
          font-size: 9px;
          letter-spacing: .18em;
          font-weight: 700;
          color: #526071;
        }


        /* =====================================================
           HERO
        ===================================================== */

        .contact-hero {
          position: relative;
          min-height: 88vh;
          color: white;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: #07172b;
        }

        .contact-hero-image {
          position: absolute;
          inset: 0;
        }

        .contact-hero-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.025);
          animation: heroImage 14s ease-in-out infinite alternate;
        }

        .contact-hero-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              90deg,
              rgba(5,17,31,.93) 0%,
              rgba(5,17,31,.76) 38%,
              rgba(5,17,31,.38) 70%,
              rgba(5,17,31,.28) 100%
            );
        }

        .contact-hero-top,
        .contact-hero-bottom {
          position: absolute;
          left: 7vw;
          right: 7vw;
          display: flex;
          justify-content: space-between;
          font-size: 8px;
          letter-spacing: .14em;
          text-transform: uppercase;
          z-index: 3;
        }

        .contact-hero-top {
          top: 32px;
        }

        .contact-hero-bottom {
          bottom: 27px;
          color: rgba(255,255,255,.65);
        }

        .contact-hero-content {
          position: relative;
          z-index: 3;
          width: 100%;
          padding: 130px 7vw 110px;
        }

        .contact-hero-index {
          font-size: 9px;
          letter-spacing: .18em;
          margin-bottom: 25px;
          color: rgba(255,255,255,.68);
          font-weight: 600;
        }

        .contact-hero h1 {
          margin: 0;
          max-width: 800px;
          font-size: clamp(48px, 7vw, 102px);
          line-height: .91;
          letter-spacing: -.055em;
          font-weight: 500;
        }

        .contact-hero h1 em {
          font-family: Georgia, serif;
          font-weight: 500;
        }

        .contact-hero-content p {
          max-width: 440px;
          margin: 34px 0 32px;
          font-size: 13px;
          line-height: 1.75;
          color: rgba(255,255,255,.74);
        }

        .contact-hero-link {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: white;
          text-decoration: none;
          font-size: 9px;
          letter-spacing: .15em;
          font-weight: 600;
          border-bottom: 1px solid rgba(255,255,255,.45);
          padding-bottom: 9px;
          transition: gap .3s ease;
        }

        .contact-hero-link:hover {
          gap: 18px;
        }

        .contact-hero-line {
          position: absolute;
          left: 7vw;
          right: 7vw;
          bottom: 53px;
          height: 1px;
          background: rgba(255,255,255,.18);
          z-index: 3;
        }

        @keyframes heroImage {

          from {
            transform: scale(1.025);
          }

          to {
            transform: scale(1.07);
          }

        }


        /* =====================================================
           SECTION 2 — PROCESS
        ===================================================== */

        .contact-process {
          padding: 90px 7vw 75px;
          background: #f4f3ef;
          opacity: 0;
          transform: translateY(30px);
          transition:
            opacity .8s ease,
            transform .8s ease;
        }

        .contact-process.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .process-top {
          display: grid;
          grid-template-columns: 1fr .7fr;
          gap: 7vw;
          align-items: end;
        }

        .process-top h2 {
          margin: 0;
          font-size: clamp(43px, 5.4vw, 78px);
          line-height: .95;
          letter-spacing: -.05em;
          font-weight: 500;
        }

        .process-top h2 em {
          font-family: Georgia, serif;
          font-weight: 500;
        }

        .process-intro {
          max-width: 440px;
        }

        .process-intro p {
          margin: 0 0 16px;
          color: #697382;
          font-size: 12px;
          line-height: 1.7;
          font-weight: 450;
        }

        .process-line {
          margin-top: 65px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          position: relative;
        }

        .process-line::before {
          content: "";
          position: absolute;
          top: 25px;
          left: 0;
          right: 0;
          height: 1px;
          background: #c8cbd0;
        }

        .process-step {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .process-step-number {
          font-size: 8px;
          letter-spacing: .14em;
          color: #89909a;
          font-weight: 600;
        }

        .process-step-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #07172b;
          position: relative;
          z-index: 2;
        }

        .process-step-title {
          font-size: 9px;
          letter-spacing: .14em;
          font-weight: 800;
        }


        /* =====================================================
           PROJECT BRIEF
        ===================================================== */

        .project-brief {
          position: relative;
          min-height: auto;
          padding: 52px 7vw 32px;
          background: #ffffff;
          color: #07172b;
          overflow: hidden;
          opacity: 0;
          transform: translateY(35px);
          transition:
            opacity .9s ease,
            transform .9s ease;
          border-top: 1px solid #e2e4e7;
        }

        .project-brief.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .project-brief-grid {
          position: absolute;
          inset: 0;
          opacity: .38;
          background-image:
            linear-gradient(
              rgba(7,23,43,.045) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(7,23,43,.045) 1px,
              transparent 1px
            );
          background-size: 72px 72px;
          mask-image:
            linear-gradient(
              90deg,
              black 0%,
              rgba(0,0,0,.55) 55%,
              transparent 100%
            );
          pointer-events: none;
        }

        .project-brief-scan {
          position: absolute;
          top: 0;
          bottom: 0;
          left: -20%;
          width: 32%;
          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(46,145,223,.075),
              transparent
            );
          transform: skewX(-16deg);
          animation: projectScan 9s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes projectScan {

          0% {
            left: -30%;
          }

          45%,
          100% {
            left: 115%;
          }

        }

        .project-brief-inner {
          position: relative;
          z-index: 2;
          max-width: 1450px;
          margin: 0 auto;
        }


        /* =====================================================
           PROJECT HEADER
        ===================================================== */

        .project-brief-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 18px;
          border-bottom: 1px solid rgba(7,23,43,.14);
        }

        .project-brief-kicker {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 8px;
          letter-spacing: .18em;
          color: #526071;
          font-weight: 700;
        }

        .brief-kicker-line {
          display: block;
          width: 32px;
          height: 2px;
          background: #2e91df;
        }

        .project-brief-meta {
          display: flex;
          gap: 22px;
          font-size: 7px;
          letter-spacing: .15em;
          color: #89919d;
          font-weight: 600;
        }


        /* =====================================================
           MAIN TWO COLUMN AREA
        ===================================================== */

        .project-brief-layout {
          display: grid;
          grid-template-columns:
            minmax(340px, .78fr)
            minmax(560px, 1.22fr);
          gap: 5vw;
          padding: 48px 0 30px;
          align-items: start;
        }


        /* =====================================================
           LEFT EDITORIAL SIDE
        ===================================================== */

        .project-brief-intro {
          position: relative;
          min-height: 610px;
          padding-left: 2px;
        }

        .brief-large-number {
          position: absolute;
          right: 0;
          top: -35px;
          font-size: clamp(180px, 18vw, 290px);
          line-height: .75;
          font-weight: 300;
          letter-spacing: -.09em;
          color: rgba(7,23,43,.035);
          user-select: none;
          pointer-events: none;
        }

        .brief-accent-line {
          width: 55px;
          height: 4px;
          background: #2e91df;
          margin-bottom: 18px;
          position: relative;
          z-index: 2;
        }

        .brief-small-label {
          position: relative;
          z-index: 2;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: .19em;
          color: #526071;
          margin-bottom: 25px;
        }

        .brief-heading-wrap {
          position: relative;
          z-index: 2;
        }

        .brief-heading-wrap h2 {
          margin: 0;
          max-width: 650px;
          font-size: clamp(54px, 6.2vw, 94px);
          line-height: .87;
          letter-spacing: -.065em;
          font-weight: 650;
          color: #07172b;
        }

        .brief-heading-wrap h2 em {
          position: relative;
          display: inline-block;
          font-family: Georgia, serif;
          font-weight: 700;
          font-style: italic;
          color: #2e91df;
          padding-right: 7px;
        }

        .heading-underline {
          width: 190px;
          height: 3px;
          margin-top: 18px;
          background: linear-gradient(
            90deg,
            #2e91df 0%,
            rgba(46,145,223,.35) 55%,
            transparent 100%
          );
          transform-origin: left;
          animation: underlineReveal 1.3s ease both;
        }

        @keyframes underlineReveal {

          from {
            transform: scaleX(0);
            opacity: 0;
          }

          to {
            transform: scaleX(1);
            opacity: 1;
          }

        }

        .brief-heading-wrap p {
          max-width: 420px;
          margin: 23px 0 0;
          color: #526071;
          font-size: 12px;
          line-height: 1.7;
          font-weight: 500;
        }


        /* =====================================================
           LEFT INFORMATION
        ===================================================== */

        .brief-information {
          position: relative;
          z-index: 2;
          margin-top: 35px;
          max-width: 420px;
          border-top: 1px solid rgba(7,23,43,.16);
        }

        .brief-info-item {
          display: grid;
          grid-template-columns: 35px 1fr;
          gap: 14px;
          padding: 13px 0;
          border-bottom: 1px solid rgba(7,23,43,.10);
        }

        .brief-info-item > span {
          font-size: 7px;
          letter-spacing: .13em;
          color: #2e91df;
          padding-top: 2px;
          font-weight: 700;
        }

        .brief-info-item strong {
          display: block;
          font-size: 9px;
          letter-spacing: .15em;
          color: #07172b;
          margin-bottom: 4px;
          font-weight: 850;
        }

        .brief-info-item p {
          margin: 0;
          font-size: 9px;
          color: #697483;
          line-height: 1.45;
          font-weight: 500;
        }


        /* =====================================================
           LEFT FOOTER
        ===================================================== */

        .brief-left-footer {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          gap: 13px;
          font-size: 6px;
          letter-spacing: .15em;
          color: #9199a3;
          font-weight: 600;
        }

        .brief-left-footer div {
          height: 1px;
          flex: 1;
          background: rgba(7,23,43,.1);
        }


        /* =====================================================
           FORM PANEL
        ===================================================== */

        .project-form-column {
          min-width: 0;
        }

        .project-form {
          position: relative;
          background: rgba(255,255,255,.98);
          border: 1px solid rgba(7,23,43,.15);
          box-shadow:
            0 20px 60px rgba(7,23,43,.065);
          padding: 0 30px 28px;
        }


        /* =====================================================
           FORM HEADER
        ===================================================== */

        .form-header {
          min-height: 76px;
          display: grid;
          grid-template-columns: 45px 1fr;
          gap: 18px;
          align-items: center;
          border-bottom: 1px solid rgba(7,23,43,.14);
        }

        .form-header-number {
          width: 36px;
          height: 36px;
          border: 1px solid rgba(46,145,223,.5);
          display: grid;
          place-items: center;
          color: #2e91df;
          font-size: 9px;
          letter-spacing: .1em;
          font-weight: 700;
        }

        .form-header .project-information-title {
          display: block;
          font-size: 9px;
          font-weight: 850;
          letter-spacing: .17em;
          color: #07172b;
        }

        .form-header p {
          margin: 6px 0 0;
          font-size: 9px;
          color: #697483;
          font-weight: 500;
        }


        /* =====================================================
           FORM ROW
        ===================================================== */

        .form-row {
          display: grid;
          grid-template-columns: 205px minmax(0, 1fr);
          min-height: 68px;
          border-bottom: 1px solid rgba(7,23,43,.09);
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 8px;
          letter-spacing: .13em;
          color: #07172b;
          font-weight: 900;
        }

        .form-label > span:last-child {
          font-weight: 900;
        }

        .form-number {
          width: 22px;
          flex-shrink: 0;
          color: #2e91df;
          font-size: 7px;
          font-weight: 850;
        }

        .form-field {
          position: relative;
          display: flex;
          align-items: center;
        }

        .form-field input,
        .form-field select,
        .form-field textarea {
          width: 100%;
          border: 0;
          outline: none;
          background: transparent;
          color: #07172b;
          font-family: inherit;
          font-size: 13px;
          font-weight: 450;
          letter-spacing: -.01em;
          resize: none;
        }

        .form-field input,
        .form-field select {
          height: 100%;
        }

        .form-field textarea {
          padding: 18px 0;
          line-height: 1.65;
        }

        .form-field input::placeholder,
        .form-field textarea::placeholder {
          color: #919aa5;
          transition: color .25s ease;
          font-weight: 450;
        }

        .form-field input:focus::placeholder,
        .form-field textarea:focus::placeholder {
          color: #c2c7cc;
        }

        .form-field select {
          appearance: none;
          cursor: pointer;
          padding-right: 35px;
        }

        .form-field select option {
          background: #ffffff;
          color: #07172b;
        }

        .form-field > svg {
          position: absolute;
          right: 4px;
          pointer-events: none;
          color: #637080;
          transition:
            transform .25s ease,
            color .25s ease;
        }

        .form-field:focus-within > svg {
          transform: rotate(180deg);
          color: #2e91df;
        }

        .form-field::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 1px;
          background: rgba(7,23,43,.17);
          transition:
            background .3s ease,
            box-shadow .3s ease;
        }

        .form-field:focus-within::after {
          background: #2e91df;
          box-shadow:
            0 0 14px rgba(46,145,223,.18);
        }

        .form-row-double {
          min-height: 68px;
        }

        .form-double-fields {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
        }

        .form-row-message {
          min-height: 135px;
        }


        /* =====================================================
           FORM FOOTER
        ===================================================== */

        .form-footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 25px;
          padding-top: 27px;
        }

        .form-footer-note {
          max-width: 235px;
        }

        .form-footer-note span {
          font-size: 7px;
          letter-spacing: .16em;
          color: #697483;
          font-weight: 750;
        }

        .form-footer-note p {
          margin: 9px 0 0;
          font-size: 9px;
          line-height: 1.55;
          color: #697483;
          font-weight: 500;
        }


        /* =====================================================
           SUBMIT BUTTON
        ===================================================== */

        .brief-submit {
          min-width: 250px;
          height: 56px;
          border: 1px solid #07172b;
          background: #07172b;
          color: white;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 7px 0 20px;
          cursor: pointer;
          font-family: inherit;
          font-size: 8px;
          letter-spacing: .15em;
          font-weight: 750;
          transition:
            background .3s ease,
            border-color .3s ease,
            transform .3s ease,
            box-shadow .3s ease;
        }

        .brief-submit:hover {
          background: #2e91df;
          border-color: #2e91df;
          transform: translateY(-3px);
          box-shadow:
            0 12px 28px rgba(46,145,223,.2);
        }

        .brief-submit-icon {
          width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
          background: white;
          color: #07172b;
          transition:
            background .3s ease,
            color .3s ease,
            transform .3s ease;
        }

        .brief-submit:hover .brief-submit-icon {
          background: #07172b;
          color: white;
          transform: translate(2px,-2px);
        }


        /* =====================================================
           SUCCESS
        ===================================================== */

        .project-success {
          min-height: 610px;
          border: 1px solid rgba(7,23,43,.13);
          background: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          position: relative;
          padding: 65px;
          box-shadow:
            0 25px 70px rgba(7,23,43,.07);
          overflow: hidden;
        }

        .success-number {
          position: absolute;
          right: -15px;
          top: 20px;
          font-size: 190px;
          line-height: 1;
          color: rgba(7,23,43,.035);
          letter-spacing: -.08em;
        }

        .success-icon {
          width: 54px;
          height: 54px;
          border: 1px solid rgba(46,145,223,.5);
          display: grid;
          place-items: center;
          margin-bottom: 25px;
          color: #2e91df;
        }

        .success-eyebrow {
          margin: 0 0 18px;
          font-size: 8px;
          letter-spacing: .18em;
          color: #7a8490;
          font-weight: 700;
        }

        .project-success h3 {
          margin: 0;
          font-size: clamp(42px, 4.5vw, 68px);
          line-height: .92;
          letter-spacing: -.055em;
          font-weight: 600;
          color: #07172b;
        }

        .project-success h3 em {
          font-family: Georgia, serif;
          font-weight: 600;
          color: #2e91df;
        }

        .success-copy {
          max-width: 400px;
          margin: 25px 0 30px;
          color: #697483;
          font-size: 12px;
          line-height: 1.7;
          font-weight: 500;
        }

        .success-reset {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 0 8px;
          border: 0;
          border-bottom: 1px solid rgba(7,23,43,.35);
          background: transparent;
          color: #07172b;
          font-family: inherit;
          font-size: 8px;
          letter-spacing: .15em;
          font-weight: 750;
          cursor: pointer;
        }


        /* =====================================================
           BOTTOM STRIP
        ===================================================== */

        .project-brief-bottom {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-top: 0;
          font-size: 6px;
          letter-spacing: .15em;
          color: #89929d;
          font-weight: 600;
        }

        .brief-bottom-line {
          height: 1px;
          flex: 1;
          background: rgba(7,23,43,.1);
        }


        /* =====================================================
           TABLET
        ===================================================== */

        @media (max-width: 1100px) {

          .project-brief-layout {
            grid-template-columns:
              minmax(290px, .7fr)
              minmax(480px, 1.3fr);
            gap: 4vw;
          }

          .brief-heading-wrap h2 {
            font-size: clamp(50px, 6vw, 78px);
          }

          .form-row {
            grid-template-columns: 175px minmax(0, 1fr);
          }

          .form-label {
            gap: 10px;
          }

        }


        /* =====================================================
           1000
        ===================================================== */

        @media (max-width: 1000px) {

          .process-top {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .project-brief-layout {
            grid-template-columns: 1fr;
            gap: 45px;
          }

          .project-brief-intro {
            min-height: auto;
            padding-bottom: 15px;
          }

          .brief-large-number {
            right: 5%;
            top: -35px;
          }

          .brief-information {
            max-width: 500px;
          }

          .brief-left-footer {
            position: relative;
            margin-top: 40px;
          }

          .form-row {
            grid-template-columns: 210px 1fr;
          }

        }


        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 700px) {

          .contact-hero {
            min-height: 760px;
          }

          .contact-hero-top,
          .contact-hero-bottom {
            left: 22px;
            right: 22px;
            font-size: 6px;
          }

          .contact-hero-content {
            padding: 120px 22px 100px;
          }

          .contact-hero h1 {
            font-size: clamp(46px, 14vw, 70px);
            font-weight: 500;
          }

          .contact-hero-content p {
            font-size: 11px;
            max-width: 340px;
          }

          .contact-hero-line {
            left: 22px;
            right: 22px;
          }


          /* PROCESS */

          .contact-process {
            padding-left: 22px;
            padding-right: 22px;
            padding-top: 70px;
            padding-bottom: 65px;
          }

          .process-top h2 {
            font-size: 46px;
            font-weight: 550;
          }

          .process-line {
            margin-top: 50px;
            grid-template-columns: 1fr;
            gap: 27px;
          }

          .process-line::before {
            left: 3px;
            top: 0;
            bottom: 0;
            width: 1px;
            height: auto;
          }

          .process-step {
            display: grid;
            grid-template-columns: 25px 15px 1fr;
            align-items: center;
            gap: 10px;
          }

          .process-step-number {
            grid-column: 1;
          }

          .process-step-dot {
            grid-column: 2;
          }

          .process-step-title {
            grid-column: 3;
          }


          /* PROJECT BRIEF */

          .project-brief {
            min-height: auto;
            padding: 42px 22px 28px;
          }

          .project-brief-header {
            align-items: flex-start;
          }

          .project-brief-meta {
            display: none;
          }

          .project-brief-layout {
            grid-template-columns: 1fr;
            gap: 35px;
            padding: 40px 0 30px;
          }

          .project-brief-intro {
            min-height: auto;
          }

          .brief-large-number {
            font-size: 150px;
            top: -25px;
            right: -5px;
          }

          .brief-accent-line {
            width: 42px;
            height: 3px;
          }

          .brief-small-label {
            font-size: 7px;
            margin-bottom: 24px;
          }

          .brief-heading-wrap h2 {
            font-size: clamp(48px, 14vw, 70px);
            font-weight: 650;
            line-height: .88;
          }

          .brief-heading-wrap h2 em {
            font-weight: 700;
          }

          .brief-heading-wrap p {
            font-size: 11px;
            font-weight: 500;
            margin-top: 20px;
          }

          .heading-underline {
            width: 130px;
            height: 3px;
            margin-top: 16px;
          }

          .brief-information {
            margin-top: 30px;
          }

          .brief-info-item {
            padding: 12px 0;
          }


          /* FORM */

          .project-form {
            padding: 0 20px 23px;
          }

          .form-header {
            min-height: 76px;
            grid-template-columns: 38px 1fr;
            gap: 14px;
          }

          .form-header-number {
            width: 34px;
            height: 34px;
          }

          .form-header span {
            font-size: 7px;
          }

          .form-header p {
            font-size: 8px;
          }

          .form-row {
            grid-template-columns: 1fr;
            padding: 17px 0;
            min-height: auto;
            gap: 9px;
          }

          .form-label {
            gap: 10px;
            font-size: 7px;
            font-weight: 900;
          }

          .form-label > span:last-child {
            font-weight: 900;
          }

          .form-field {
            min-height: 43px;
          }

          .form-field input,
          .form-field select {
            font-size: 12px;
            font-weight: 450;
          }

          .form-double-fields {
            grid-template-columns: 1fr;
            gap: 13px;
            width: 100%;
          }

          .form-row-message {
            min-height: 165px;
          }

          .form-footer {
            flex-direction: column;
            align-items: stretch;
            padding-top: 26px;
          }

          .brief-submit {
            width: 100%;
            min-width: 0;
          }

          .project-brief-bottom {
            gap: 10px;
            line-height: 1.5;
          }

          .project-brief-bottom span:last-child {
            display: none;
          }


          /* SUCCESS */

          .project-success {
            min-height: 500px;
            padding: 45px 25px;
          }

          .success-number {
            font-size: 120px;
          }

        }


        /* =====================================================
           REDUCED MOTION
        ===================================================== */

        @media (prefers-reduced-motion: reduce) {

          .contact-hero-image img,
          .project-brief-scan,
          .heading-underline {
            animation: none;
          }

          .contact-process,
          .project-brief {
            transition: none;
            transform: none;
          }

        }

      `}</style>
    </>
  );
}