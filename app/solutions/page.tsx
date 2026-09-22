"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Droplets,
  Layers3,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

const solutionFamilies = [
  {
    number: "01",
    eyebrow: "FLOORING SYSTEMS",
    title: "Epoxy",
    italic: "engineered.",
    description:
      "Seamless flooring systems developed for durability, abrasion resistance, hygiene and demanding industrial environments.",
    image: "/images/solutions/epoxy.jpg",
    icon: Layers3,
    products: [
      "Epoxy Floor Coatings",
      "Epoxy Self-Levelling Matt Finish",
      "High-Build Epoxy Mortar",
      "Epoxy Matt Finish Flooring",
    ],
    detail: "01 / 06",
  },
  {
    number: "02",
    eyebrow: "POLYMER SYSTEMS",
    title: "Polyurethane",
    italic: "performance.",
    description:
      "Polyurethane and hybrid coating systems designed around demanding operating conditions and long-term surface performance.",
    image: "/images/solutions/polyurethane.jpg",
    icon: ShieldCheck,
    products: [
      "Polyurethane Coating",
      "Epoxy Polyurethane (EPU) Coating",
      "Polycrete Flooring",
    ],
    detail: "02 / 06",
  },
  {
    number: "03",
    eyebrow: "SPECIALISED FLOORING",
    title: "Performance",
    italic: "protection.",
    description:
      "Specialised flooring systems where electrical control, slip resistance and surface safety become critical.",
    image: "/images/solutions/esd.jpg",
    icon: Zap,
    products: [
      "ESD Coating Flooring",
      "Dielectric Insulation Flooring",
      "Anti-Skid Coating Flooring",
    ],
    detail: "03 / 06",
  },
  {
    number: "04",
    eyebrow: "SURFACE PROTECTION",
    title: "Protection",
    italic: "beyond floors.",
    description:
      "Complementary systems for walls, structures and substrates that extend surface protection across the built environment.",
    image: "/images/solutions/protective-coatings.jpg",
    icon: ShieldCheck,
    products: [
      "Hygienic Wall Coatings",
      "Anti-Corrosive Coatings",
      "Cementitious Underlays",
    ],
    detail: "04 / 06",
  },
  {
    number: "05",
    eyebrow: "WATER MANAGEMENT",
    title: "Waterproofing",
    italic: "systems.",
    description:
      "Waterproofing systems designed to protect surfaces and structures from moisture-related deterioration.",
    image: "/images/solutions/waterproofing.jpg",
    icon: Droplets,
    products: ["Waterproofing Systems"],
    detail: "05 / 06",
  },
  {
    number: "06",
    eyebrow: "FINISHING SYSTEMS",
    title: "Surface",
    italic: "infrastructure.",
    description:
      "Essential finishing and detailing systems that complete the engineered flooring installation.",
    image: "/images/solutions/anti-skid.jpg",
    icon: Sparkles,
    products: ["Coving", "Industrial Floor Marking Systems"],
    detail: "06 / 06",
  },
];

export default function SolutionsPage() {
  const [active, setActive] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(false);
  const pageRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = event.clientX;
      const y = event.clientY;

      document.documentElement.style.setProperty(
        "--mouse-x",
        `${x}px`
      );

      document.documentElement.style.setProperty(
        "--mouse-y",
        `${y}px`
      );

      setCursorVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <main ref={pageRef} className="solutions-page">

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="solutions-hero">
        <div className="hero-background">
          <div className="hero-image" />
          <div className="hero-gradient" />
          <div className="hero-grid" />
        </div>

        <div className="floating-orb orb-one" />
        <div className="floating-orb orb-two" />
        <div className="floating-orb orb-three" />

        <div className="hero-content">
          <div className="hero-top">
            <span>COLOURPLUS / SOLUTIONS</span>
            <span>ENGINEERED SURFACES / INDIA</span>
          </div>

          <div className="hero-center">
            <div className="hero-index">
              <span>01</span>
              <div />
              <span>06</span>
            </div>

            <p className="hero-eyebrow">
              ENGINEERED SURFACE SYSTEMS
            </p>

            <h1>
              Built around
              <br />
              the <em>surface.</em>
            </h1>

            <p className="hero-description">
              A complete range of engineered flooring, specialised
              performance systems, protective coatings and waterproofing
              solutions for demanding environments.
            </p>
          </div>

          <div className="hero-bottom">
            <span>EXPLORE SYSTEMS</span>

            <div className="scroll-indicator">
              <ArrowDownRight size={18} />
            </div>

            <span>SCROLL TO DISCOVER</span>
          </div>
        </div>
      </section>

      {/* =========================================================
          APPROACH
      ========================================================= */}

      <section className="intro-section">

        <div className="approach-number">
          <span>02</span>
          <small>APPROACH</small>
        </div>

        <div className="approach-layout">

          <div className="approach-copy">

            <div className="approach-topline">
              <span>COLOURPLUS / APPROACH</span>
              <span>02 / 06</span>
            </div>

            <h2>
              Surface
              <br />
              requirements
              <br />
              are <em>different.</em>
            </h2>

            <div className="approach-rule" />

            <p className="approach-statement">
              The system
              <br />
              <em>should be too.</em>
            </p>

            <div className="approach-bottom">

              <p>
                Colourplus develops engineered surface systems around
                application requirements, environmental exposure,
                durability and the final performance expected from
                the space.
              </p>

              <div className="approach-tags">
                <span>FLOORING</span>
                <span>COATINGS</span>
                <span>WATERPROOFING</span>
                <span>PROTECTION</span>
              </div>

            </div>

          </div>

          <div className="approach-visual">

            <div className="approach-image-frame">

              <div
                className="approach-image"
                style={{
                  backgroundImage:
                    'url("/images/solutions/approach.jpg")',
                }}
              />

              <div className="approach-image-shade" />

              <div className="approach-image-label">
                <span>CP</span>
                <small>SURFACE SYSTEMS</small>
              </div>

              <div className="approach-image-index">
                02 / APPROACH
              </div>

            </div>

            <div className="approach-floating-card">
              <span>01</span>

              <div>
                <strong>REQUIREMENT</strong>
                <small>UNDERSTAND THE ENVIRONMENT</small>
              </div>

              <ArrowUpRight size={16} />
            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          MAIN SOLUTION EXPERIENCE
      ========================================================= */}

      <section className="systems-section">

        <div className="section-header">

          <div>
            <p className="eyebrow">03 / SOLUTION SYSTEMS</p>

            <h2>
              One surface.
              <br />
              <em>Many demands.</em>
            </h2>
          </div>

          <p>
            Explore the Colourplus system portfolio through the
            environments and performance requirements each system is
            designed to address.
          </p>

        </div>

        <div className="system-layout">

          {/* LEFT NAVIGATION */}

          <div className="system-navigation">

            {solutionFamilies.map((solution, index) => {
              const Icon = solution.icon;

              return (
                <button
                  key={solution.number}
                  className={`system-nav-item ${
                    active === index ? "active" : ""
                  }`}
                  onClick={() => setActive(index)}
                >

                  <span className="nav-number">
                    {solution.number}
                  </span>

                  <span className="nav-icon">
                    <Icon size={15} />
                  </span>

                  <span className="nav-name">
                    {solution.title}
                  </span>

                  <ArrowUpRight
                    className="nav-arrow"
                    size={17}
                  />

                </button>
              );
            })}

          </div>

          {/* MAIN VISUAL */}

          <div className="system-stage">

            {solutionFamilies.map((solution, index) => {
              const Icon = solution.icon;

              return (
                <article
                  key={solution.number}
                  className={`system-card ${
                    active === index ? "visible" : ""
                  }`}
                >

                  <div className="system-image-wrap">

                    <div
                      className="system-image"
                      style={{
                        backgroundImage: `url("${solution.image}")`,
                      }}
                    />

                    <div className="image-overlay" />

                    <div className="floating-label label-top">
                      <span>{solution.number}</span>
                      <span>{solution.eyebrow}</span>
                    </div>

                    <div className="floating-label label-bottom">
                      <Icon size={16} />
                      <span>COLOURPLUS SYSTEM</span>
                    </div>

                    <div className="image-index">
                      {solution.detail}
                    </div>

                  </div>

                  <div className="system-copy">

                    <div className="system-heading">

                      <span className="system-number">
                        {solution.number}
                      </span>

                      <div>
                        <p>{solution.eyebrow}</p>

                        <h3>
                          {solution.title}
                          <br />
                          <em>{solution.italic}</em>
                        </h3>
                      </div>

                    </div>

                    <div className="system-information">

                      <p className="system-description">
                        {solution.description}
                      </p>

                      <div className="product-list">

                        <span className="product-label">
                          SYSTEMS / PRODUCTS
                        </span>

                        {solution.products.map((product) => (
                          <div
                            className="product-row"
                            key={product}
                          >
                            <Check size={15} />
                            <span>{product}</span>
                            <ArrowUpRight size={14} />
                          </div>
                        ))}

                      </div>

                    </div>

                  </div>

                </article>
              );
            })}

          </div>

        </div>

      </section>

      {/* =========================================================
          PRODUCT MARQUEE
      ========================================================= */}

      <section className="marquee-section">

        <div className="marquee-track">

          <span>EPOXY</span>
          <i>+</i>

          <span>POLYURETHANE</span>
          <i>+</i>

          <span>EPU</span>
          <i>+</i>

          <span>ESD</span>
          <i>+</i>

          <span>ANTI-SKID</span>
          <i>+</i>

          <span>WATERPROOFING</span>
          <i>+</i>

          <span>PROTECTIVE COATINGS</span>
          <i>+</i>

          <span>HYGIENIC SURFACES</span>
          <i>+</i>

          <span>POLYCRETE</span>
          <i>+</i>

          <span>FLOOR MARKING</span>
          <i>+</i>

        </div>

      </section>

      {/* =========================================================
          PERFORMANCE
      ========================================================= */}

      <section className="performance-section">

        <div className="performance-background" />

        <div className="performance-content">

          <div className="performance-left">

            <p className="eyebrow light">
              04 / ENGINEERED PERFORMANCE
            </p>

            <h2>
              Designed for
              <br />
              <em>real conditions.</em>
            </h2>

            <p className="performance-copy">
              The Colourplus portfolio is positioned around durability,
              impact and abrasion resistance, hygiene, seamless
              construction, chemical and environmental resistance,
              aesthetics, installation efficiency and long-term value.
            </p>

          </div>

          <div className="performance-orbit">

            <div className="orbit-ring ring-one" />
            <div className="orbit-ring ring-two" />
            <div className="orbit-ring ring-three" />

            <div className="orbit-core">
              <span>CP</span>
              <small>SURFACE</small>
            </div>

            <div className="orbit-tag tag-one">
              DURABILITY
            </div>

            <div className="orbit-tag tag-two">
              HYGIENE
            </div>

            <div className="orbit-tag tag-three">
              RESISTANCE
            </div>

            <div className="orbit-tag tag-four">
              PERFORMANCE
            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}

      <section className="solutions-cta">

        <div className="cta-glow glow-one" />
        <div className="cta-glow glow-two" />

        <div className="cta-inner">

          <p className="eyebrow light">
            05 / FIND THE RIGHT SYSTEM
          </p>

          <h2>
            Start with
            <br />
            the <em>surface.</em>
          </h2>

          <p>
            Tell us about your environment, operating conditions and
            requirements. Build the right Colourplus surface direction
            around the project.
          </p>

          {/* =====================================================
              CTA BUTTON
              NOW NAVIGATES TO /CONTACT
          ===================================================== */}

          <Link href="/contact" className="cta-button">
            <span className="cta-button-text">
              Start a Project
            </span>

            <span className="cta-button-icon">
              <ArrowUpRight size={18} />
            </span>
          </Link>

        </div>

      </section>

      {/* =========================================================
          CURSOR
      ========================================================= */}

      {cursorVisible && (
        <div className="cursor-orb">
          <div />
        </div>
      )}

      {/* =========================================================
          STYLES
      ========================================================= */}

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .solutions-page {
          --blue: #073b78;
          --dark: #071522;
          --ink: #111b25;
          --muted: #6e7884;
          --line: rgba(7, 59, 120, 0.14);
          background: #f5f6f7;
          color: var(--ink);
          overflow: hidden;
        }

        /* =====================================================
           HERO
        ===================================================== */

        .solutions-hero {
          position: relative;
          min-height: 92vh;
          background: #071522;
          color: white;
          overflow: hidden;
          isolation: isolate;
        }

        .hero-background,
        .hero-image,
        .hero-gradient,
        .hero-grid {
          position: absolute;
          inset: 0;
        }

        .hero-image {
          background-image: url("/images/solutions/hero-industrial.png");
          background-size: cover;
          background-position: center;
          transform: scale(1.05);
          animation: heroZoom 14s ease-in-out infinite alternate;
        }

        .hero-gradient {
          background:
            linear-gradient(
              90deg,
              rgba(4, 16, 27, 0.92) 0%,
              rgba(4, 16, 27, 0.72) 42%,
              rgba(4, 16, 27, 0.25) 100%
            ),
            linear-gradient(
              0deg,
              rgba(4, 16, 27, 0.85),
              transparent 55%
            );
          z-index: 1;
        }

        .hero-grid {
          opacity: 0.13;
          z-index: 2;
          background-image:
            linear-gradient(
              rgba(255, 255, 255, 0.35) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.35) 1px,
              transparent 1px
            );
          background-size: 80px 80px;
          mask-image: linear-gradient(
            to bottom,
            transparent,
            black 25%,
            black 75%,
            transparent
          );
        }

        .hero-content {
          position: relative;
          z-index: 5;
          min-height: 92vh;
          padding: 34px 5vw 28px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .hero-top,
        .hero-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .hero-top {
          opacity: 0.72;
        }

        .hero-center {
          max-width: 900px;
          padding-top: 60px;
        }

        .hero-index {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 34px;
          font-size: 10px;
          letter-spacing: 0.2em;
        }

        .hero-index div {
          width: 80px;
          height: 1px;
          background: rgba(255, 255, 255, 0.45);
        }

        .hero-eyebrow,
        .eyebrow {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin: 0 0 22px;
        }

        .hero-center h1 {
          margin: 0;
          font-size: clamp(62px, 9vw, 145px);
          line-height: 0.84;
          font-weight: 500;
          letter-spacing: -0.065em;
        }

        .hero-center h1 em,
        h2 em,
        h3 em {
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 400;
        }

        .hero-description {
          max-width: 520px;
          margin: 42px 0 0;
          color: rgba(255, 255, 255, 0.72);
          font-size: 15px;
          line-height: 1.7;
        }

        .hero-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.22);
          padding-top: 18px;
          color: rgba(255, 255, 255, 0.65);
        }

        .scroll-indicator {
          width: 42px;
          height: 42px;
          border: 1px solid rgba(255, 255, 255, 0.35);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: floating 3s ease-in-out infinite;
        }

        /* =====================================================
           FLOATING OBJECTS
        ===================================================== */

        .floating-orb {
          position: absolute;
          z-index: 3;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(1px);
        }

        .orb-one {
          width: 180px;
          height: 180px;
          right: 8%;
          top: 18%;
          background:
            radial-gradient(
              circle at 35% 30%,
              rgba(93, 164, 255, 0.3),
              rgba(17, 74, 135, 0.04) 60%,
              transparent 70%
            );
          animation: floatOne 8s ease-in-out infinite;
        }

        .orb-two {
          width: 95px;
          height: 95px;
          right: 24%;
          bottom: 18%;
          background:
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.14),
              transparent 70%
            );
          animation: floatTwo 6s ease-in-out infinite;
        }

        .orb-three {
          width: 35px;
          height: 35px;
          left: 54%;
          top: 28%;
          background: rgba(255, 255, 255, 0.18);
          box-shadow: 0 0 40px rgba(255, 255, 255, 0.2);
          animation: floatThree 5s ease-in-out infinite;
        }

        /* =====================================================
           APPROACH
        ===================================================== */

        .intro-section {
          position: relative;
          padding: 85px 7vw 95px;
          background: #f5f6f7;
          overflow: hidden;
        }

        .intro-section::before {
          content: "";
          position: absolute;
          width: 520px;
          height: 520px;
          right: -220px;
          top: -240px;
          border-radius: 50%;
          background: rgba(7, 59, 120, 0.035);
          pointer-events: none;
        }

        .approach-number {
          position: absolute;
          left: 7vw;
          top: 90px;
          display: flex;
          flex-direction: column;
          gap: 5px;
          color: var(--blue);
          z-index: 2;
        }

        .approach-number span {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
        }

        .approach-number small {
          font-size: 8px;
          letter-spacing: 0.18em;
          writing-mode: vertical-rl;
          opacity: 0.65;
        }

        .approach-layout {
          max-width: 1320px;
          margin: 0 auto;
          padding-left: 110px;
          display: grid;
          grid-template-columns: 1.02fr 0.98fr;
          gap: 6vw;
          align-items: center;
        }

        .approach-copy {
          position: relative;
          padding: 8px 0;
        }

        .approach-topline {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 600px;
          margin-bottom: 28px;
          color: var(--blue);
          font-size: 8px;
          letter-spacing: 0.18em;
        }

        .approach-copy h2 {
          margin: 0;
          max-width: 650px;
          font-size: clamp(42px, 4.8vw, 72px);
          line-height: 0.91;
          font-weight: 500;
          letter-spacing: -0.055em;
        }

        .approach-copy h2 em {
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 400;
        }

        .approach-rule {
          width: 100%;
          max-width: 610px;
          height: 1px;
          margin: 25px 0 20px;
          background: rgba(7, 59, 120, 0.16);
        }

        .approach-statement {
          margin: 0;
          font-size: clamp(32px, 3.4vw, 52px);
          line-height: 0.95;
          letter-spacing: -0.045em;
          font-weight: 500;
        }

        .approach-statement em {
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 400;
        }

        .approach-bottom {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 35px;
          align-items: end;
          margin-top: 28px;
          max-width: 640px;
        }

        .approach-bottom p {
          margin: 0;
          max-width: 390px;
          color: var(--muted);
          font-size: 13px;
          line-height: 1.7;
        }

        .approach-tags {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
        }

        .approach-tags span {
          font-size: 7px;
          color: var(--blue);
          letter-spacing: 0.16em;
          white-space: nowrap;
        }

        .approach-visual {
          position: relative;
          min-height: 465px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .approach-image-frame {
          position: relative;
          width: 100%;
          height: 465px;
          overflow: hidden;
          background: #0b1a28;
          box-shadow:
            0 30px 70px rgba(7, 22, 38, 0.16),
            0 5px 20px rgba(7, 59, 120, 0.08);
        }

        .approach-image {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transform: scale(1.04);
          animation: approachImageFloat 10s ease-in-out infinite alternate;
          transition:
            transform 1s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .approach-image-frame:hover .approach-image {
          transform: scale(1.09);
        }

        .approach-image-shade {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              180deg,
              rgba(5, 20, 34, 0.08),
              transparent 45%,
              rgba(5, 20, 34, 0.72)
            );
        }

        .approach-image-label {
          position: absolute;
          top: 22px;
          left: 22px;
          display: flex;
          align-items: center;
          gap: 10px;
          color: white;
        }

        .approach-image-label span {
          width: 34px;
          height: 34px;
          border: 1px solid rgba(255, 255, 255, 0.55);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 600;
        }

        .approach-image-label small {
          font-size: 8px;
          letter-spacing: 0.16em;
        }

        .approach-image-index {
          position: absolute;
          right: 22px;
          bottom: 20px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 8px;
          letter-spacing: 0.16em;
        }

        .approach-floating-card {
          position: absolute;
          left: -38px;
          bottom: 34px;
          width: 235px;
          padding: 17px 18px;
          display: grid;
          grid-template-columns: 28px 1fr 18px;
          align-items: center;
          gap: 12px;
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(14px);
          box-shadow: 0 20px 45px rgba(7, 22, 38, 0.16);
          z-index: 4;
          animation: approachCardFloat 5s ease-in-out infinite;
        }

        .approach-floating-card > span {
          color: var(--blue);
          font-size: 9px;
          letter-spacing: 0.1em;
        }

        .approach-floating-card div {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .approach-floating-card strong {
          font-size: 8px;
          letter-spacing: 0.15em;
          color: var(--blue);
        }

        .approach-floating-card small {
          color: #7b858e;
          font-size: 7px;
          letter-spacing: 0.08em;
        }

        .approach-floating-card svg {
          color: var(--blue);
        }

        /* =====================================================
           SYSTEMS
        ===================================================== */

        .systems-section {
          padding: 65px 5vw 125px;
          background: #fff;
        }

        .section-header {
          display: grid;
          grid-template-columns: 1fr 0.55fr;
          gap: 10vw;
          margin-bottom: 42px;
        }

        .section-header h2 {
          margin: 0;
          font-size: clamp(48px, 6vw, 90px);
          line-height: 0.9;
          letter-spacing: -0.055em;
          font-weight: 500;
        }

        .section-header > p {
          align-self: end;
          margin: 0;
          max-width: 410px;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.8;
        }

        .system-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 50px;
        }

        .system-navigation {
          display: flex;
          flex-direction: column;
          gap: 3px;
          align-self: start;
          position: sticky;
          top: 100px;
        }

        .system-nav-item {
          width: 100%;
          border: 0;
          border-bottom: 1px solid rgba(7, 59, 120, 0.12);
          background: transparent;
          padding: 20px 4px;
          display: grid;
          grid-template-columns: 30px 30px 1fr 20px;
          align-items: center;
          text-align: left;
          gap: 8px;
          cursor: pointer;
          color: #8a929a;
          transition: 0.4s ease;
        }

        .system-nav-item:hover,
        .system-nav-item.active {
          color: var(--blue);
          padding-left: 12px;
        }

        .nav-number {
          font-size: 9px;
          letter-spacing: 0.1em;
        }

        .nav-icon {
          opacity: 0.8;
        }

        .nav-name {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: -0.01em;
        }

        .nav-arrow {
          opacity: 0;
          transition: 0.35s ease;
        }

        .system-nav-item.active .nav-arrow {
          opacity: 1;
          transform: translate(3px, -3px);
        }

        .system-stage {
          position: relative;
          min-height: 700px;
        }

        .system-card {
          position: absolute;
          inset: 0;
          opacity: 0;
          pointer-events: none;
          transform: translateY(30px) scale(0.97);
          transition:
            opacity 0.7s ease,
            transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .system-card.visible {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0) scale(1);
        }

        .system-image-wrap {
          height: 490px;
          position: relative;
          overflow: hidden;
          background: #101c28;
        }

        .system-image {
          position: absolute;
          inset: -20px;
          background-size: cover;
          background-position: center;
          transition:
            transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1),
            filter 0.8s ease;
        }

        .system-card.visible .system-image {
          transform: scale(1.04);
        }

        .system-image-wrap:hover .system-image {
          transform: scale(1.09);
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              180deg,
              rgba(4, 15, 26, 0.35),
              transparent 45%,
              rgba(4, 15, 26, 0.82)
            );
        }

        .floating-label {
          position: absolute;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 10px;
          color: white;
          font-size: 9px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .label-top {
          top: 25px;
          left: 28px;
        }

        .label-top span:first-child {
          width: 31px;
          height: 31px;
          border: 1px solid rgba(255, 255, 255, 0.45);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .label-bottom {
          bottom: 25px;
          left: 28px;
          opacity: 0.85;
        }

        .image-index {
          position: absolute;
          right: 28px;
          bottom: 25px;
          color: rgba(255, 255, 255, 0.65);
          font-size: 9px;
          letter-spacing: 0.15em;
        }

        .system-copy {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 7vw;
          padding: 38px 12px 0;
        }

        .system-heading {
          display: flex;
          gap: 22px;
        }

        .system-number {
          color: var(--blue);
          font-size: 10px;
          letter-spacing: 0.15em;
          padding-top: 8px;
        }

        .system-heading p {
          margin: 0 0 12px;
          font-size: 9px;
          color: var(--blue);
          letter-spacing: 0.18em;
        }

        .system-heading h3 {
          margin: 0;
          font-size: clamp(38px, 4vw, 64px);
          line-height: 0.9;
          font-weight: 500;
          letter-spacing: -0.05em;
        }

        .system-information {
          max-width: 470px;
        }

        .system-description {
          margin: 0 0 26px;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.7;
        }

        .product-label {
          display: block;
          margin-bottom: 10px;
          font-size: 8px;
          color: var(--blue);
          letter-spacing: 0.17em;
        }

        .product-row {
          display: grid;
          grid-template-columns: 20px 1fr 20px;
          align-items: center;
          gap: 5px;
          border-top: 1px solid rgba(7, 59, 120, 0.12);
          padding: 12px 0;
          font-size: 12px;
          transition: 0.3s ease;
        }

        .product-row:hover {
          color: var(--blue);
          padding-left: 8px;
        }

        .product-row svg:last-child {
          opacity: 0.4;
        }

        /* =====================================================
           MARQUEE
        ===================================================== */

        .marquee-section {
          overflow: hidden;
          background: var(--blue);
          color: white;
          padding: 28px 0;
          transform: rotate(-1deg) scale(1.02);
          margin: 10px 0;
        }

        .marquee-track {
          display: flex;
          align-items: center;
          width: max-content;
          gap: 30px;
          animation: marquee 35s linear infinite;
        }

        .marquee-track span {
          font-size: 12px;
          letter-spacing: 0.18em;
          white-space: nowrap;
        }

        .marquee-track i {
          font-style: normal;
          opacity: 0.5;
        }

        /* =====================================================
           PERFORMANCE
        ===================================================== */

        .performance-section {
          position: relative;
          min-height: 500px;
          background: #06121d;
          color: white;
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        .performance-background {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              90deg,
              rgba(4, 18, 31, 0.92) 0%,
              rgba(4, 24, 42, 0.82) 45%,
              rgba(4, 30, 52, 0.72) 100%
            ),
            url("/images/solutions/performance-bg.jpg")
              center center / cover no-repeat;
          transform: scale(1.03);
          animation: performanceBackgroundFloat 16s ease-in-out infinite alternate;
        }

        @keyframes performanceBackgroundFloat {
          from {
            transform: scale(1.03);
          }

          to {
            transform: scale(1.08);
          }
        }

        .performance-content {
          position: relative;
          z-index: 2;
          width: 100%;
          padding: 52px 7vw;
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          align-items: center;
          gap: 4vw;
        }

        .performance-left h2 {
          margin: 0;
          font-size: clamp(48px, 5.3vw, 78px);
          line-height: 0.88;
          letter-spacing: -0.055em;
          font-weight: 500;
        }

        .light {
          color: rgba(255, 255, 255, 0.72);
        }

        .performance-copy {
          max-width: 450px;
          margin-top: 28px;
          color: rgba(255, 255, 255, 0.58);
          line-height: 1.7;
          font-size: 13px;
        }

        .performance-orbit {
          height: 360px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .orbit-ring {
          position: absolute;
          border: 1px solid rgba(150, 205, 255, 0.2);
          border-radius: 50%;
        }

        .ring-one {
          width: 190px;
          height: 190px;
          animation: orbitRotate 18s linear infinite;
        }

        .ring-two {
          width: 275px;
          height: 275px;
          animation: orbitRotateReverse 25s linear infinite;
        }

        .ring-three {
          width: 355px;
          height: 355px;
          animation: orbitRotate 35s linear infinite;
        }

        .orbit-core {
          width: 108px;
          height: 108px;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background:
            radial-gradient(
              circle at 35% 30%,
              #2c78b9,
              #073b78 55%,
              #06121d
            );
          box-shadow:
            0 0 60px rgba(31, 119, 192, 0.3),
            inset 0 0 25px rgba(255, 255, 255, 0.08);
          animation: coreFloat 4s ease-in-out infinite;
        }

        .orbit-core span {
          font-size: 32px;
          font-weight: 700;
          letter-spacing: -0.08em;
        }

        .orbit-core small {
          margin-top: 4px;
          font-size: 6px;
          letter-spacing: 0.2em;
        }

        .orbit-tag {
          position: absolute;
          padding: 8px 12px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(5, 19, 31, 0.45);
          backdrop-filter: blur(10px);
          font-size: 7px;
          letter-spacing: 0.15em;
          animation: floating 4s ease-in-out infinite;
        }

        .tag-one {
          top: 45px;
          right: 20%;
        }

        .tag-two {
          right: 3%;
          top: 45%;
          animation-delay: -1s;
        }

        .tag-three {
          bottom: 65px;
          left: 18%;
          animation-delay: -2s;
        }

        .tag-four {
          left: 5%;
          top: 32%;
          animation-delay: -3s;
        }

        /* =====================================================
           CTA
        ===================================================== */

        .solutions-cta {
          min-height: 650px;
          position: relative;
          background: #06121d;
          color: white;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .cta-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
          pointer-events: none;
        }

        .glow-one {
          width: 400px;
          height: 400px;
          background: rgba(24, 91, 160, 0.3);
          top: -150px;
          left: 5%;
          animation: floatOne 8s ease-in-out infinite;
        }

        .glow-two {
          width: 350px;
          height: 350px;
          background: rgba(21, 82, 144, 0.22);
          bottom: -150px;
          right: 5%;
          animation: floatTwo 7s ease-in-out infinite;
        }

        .cta-inner {
          position: relative;
          z-index: 2;
          max-width: 800px;
          padding: 80px 30px;
        }

        .cta-inner h2 {
          margin: 0;
          font-size: clamp(64px, 8vw, 120px);
          line-height: 0.82;
          letter-spacing: -0.06em;
          font-weight: 500;
        }

        .cta-inner p:not(.eyebrow) {
          max-width: 500px;
          margin: 38px auto;
          color: rgba(255, 255, 255, 0.58);
          font-size: 14px;
          line-height: 1.8;
        }

        /* =====================================================
           FINAL CTA BUTTON
           FIXED HORIZONTAL LAYOUT
        ===================================================== */

        .cta-button {
          display: inline-flex !important;
          flex-direction: row !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 16px !important;

          width: auto !important;
          min-width: 190px;
          min-height: 54px;

          padding: 16px 22px !important;

          border: 1px solid rgba(255, 255, 255, 0.3);
          background: white;
          color: var(--blue);

          font-family: inherit;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;
          line-height: 1 !important;
          text-transform: uppercase;
          text-decoration: none;

          cursor: pointer;

          white-space: nowrap !important;

          transition:
            transform 0.35s ease,
            box-shadow 0.35s ease,
            background 0.35s ease;
        }

        .cta-button:hover {
          transform: translateY(-5px);
          box-shadow: 0 18px 50px rgba(0, 0, 0, 0.25);
        }

        .cta-button-text {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          white-space: nowrap !important;
          line-height: 1 !important;
        }

        .cta-button-icon {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 18px;
          height: 18px;
          flex: 0 0 18px !important;
          line-height: 0 !important;
        }

        .cta-button-icon svg {
          display: block !important;
          width: 18px;
          height: 18px;
          flex: 0 0 auto !important;
          margin: 0 !important;
          position: static !important;
        }

        /* =====================================================
           CURSOR
        ===================================================== */

        .cursor-orb {
          position: fixed;
          z-index: 100;
          left: var(--mouse-x);
          top: var(--mouse-y);
          width: 10px;
          height: 10px;
          transform: translate(-50%, -50%);
          pointer-events: none;
          mix-blend-mode: difference;
        }

        .cursor-orb div {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: white;
        }

        /* =====================================================
           ANIMATIONS
        ===================================================== */

        @keyframes heroZoom {
          from {
            transform: scale(1.05);
          }

          to {
            transform: scale(1.12);
          }
        }

        @keyframes floating {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes floatOne {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(-30px, 25px, 0);
          }
        }

        @keyframes floatTwo {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(25px, -35px, 0);
          }
        }

        @keyframes floatThree {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(20px, -20px, 0);
          }
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        @keyframes orbitRotate {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes orbitRotateReverse {
          from {
            transform: rotate(360deg);
          }

          to {
            transform: rotate(0deg);
          }
        }

        @keyframes coreFloat {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }

          50% {
            transform: translateY(-12px) scale(1.03);
          }
        }

        @keyframes approachImageFloat {
          from {
            transform: scale(1.04) translate3d(0, 0, 0);
          }

          to {
            transform: scale(1.08) translate3d(-8px, -5px, 0);
          }
        }

        @keyframes approachCardFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-8px);
          }
        }

        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 1000px) {

          .approach-layout {
            padding-left: 75px;
            grid-template-columns: 1fr;
            gap: 55px;
          }

          .approach-visual {
            max-width: 700px;
          }

          .intro-section {
            padding-top: 75px;
          }

          .section-header,
          .performance-content {
            grid-template-columns: 1fr;
          }

          .system-layout {
            grid-template-columns: 1fr;
          }

          .system-navigation {
            position: relative;
            top: auto;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
          }

          .system-stage {
            min-height: 800px;
          }

          .system-copy {
            grid-template-columns: 1fr;
            gap: 35px;
          }

          .performance-content {
            padding: 55px 7vw;
          }

          .performance-orbit {
            height: 400px;
          }
        }

        @media (max-width: 700px) {

          .solutions-hero,
          .hero-content {
            min-height: 800px;
          }

          .hero-content {
            padding: 25px 22px;
          }

          .hero-top span:last-child,
          .hero-bottom span:last-child {
            display: none;
          }

          .hero-center h1 {
            font-size: 62px;
          }

          /* APPROACH MOBILE */

          .intro-section {
            padding: 70px 22px 80px;
          }

          .approach-number {
            position: relative;
            left: auto;
            top: auto;
            margin-bottom: 30px;
            flex-direction: row;
            align-items: center;
            gap: 10px;
          }

          .approach-number small {
            writing-mode: horizontal-tb;
          }

          .approach-layout {
            padding-left: 0;
            display: flex;
            flex-direction: column;
            gap: 42px;
          }

          .approach-topline {
            margin-bottom: 22px;
          }

          .approach-copy h2 {
            font-size: 43px;
          }

          .approach-statement {
            font-size: 34px;
          }

          .approach-bottom {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .approach-tags {
            align-items: flex-start;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 8px 16px;
          }

          .approach-visual {
            width: 100%;
            min-height: 350px;
          }

          .approach-image-frame {
            height: 350px;
          }

          .approach-floating-card {
            left: 15px;
            bottom: 20px;
            width: 220px;
          }

          .systems-section {
            padding: 60px 22px;
          }

          .system-navigation {
            grid-template-columns: repeat(2, 1fr);
          }

          .system-nav-item {
            grid-template-columns: 24px 24px 1fr;
          }

          .system-nav-item .nav-arrow {
            display: none;
          }

          .system-image-wrap {
            height: 380px;
          }

          .system-stage {
            min-height: 760px;
          }

          /* PERFORMANCE MOBILE */

          .performance-section {
            min-height: auto;
          }

          .performance-content {
            padding: 65px 22px;
          }

          .performance-left h2 {
            font-size: 48px;
          }

          .performance-copy {
            margin-top: 24px;
            font-size: 12px;
            line-height: 1.7;
          }

          .performance-orbit {
            height: 320px;
            transform: scale(0.7);
            margin-top: -15px;
          }

          .ring-three {
            width: 350px;
            height: 350px;
          }

          .ring-two {
            width: 270px;
            height: 270px;
          }

          .ring-one {
            width: 190px;
            height: 190px;
          }

          .cta-inner h2 {
            font-size: 70px;
          }

          /* CTA BUTTON MOBILE */

          .cta-button {
            display: inline-flex !important;
            flex-direction: row !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 14px !important;
            min-width: 185px;
          }

          .cta-button-text,
          .cta-button-icon {
            display: inline-flex !important;
          }

          .cursor-orb {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {

          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

    </main>
  );
}