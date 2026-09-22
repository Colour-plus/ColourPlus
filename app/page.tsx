import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  Factory,
  ShieldCheck,
  Droplets,
} from "lucide-react";

const solutions = [
  {
    number: "01",
    title: "Industrial Flooring",
    text: "High-performance flooring systems engineered for demanding industrial environments.",
    image: "/images/home/industrial-flooring.jpg",
    href: "/solutions",
    icon: Factory,
  },
  {
    number: "02",
    title: "Waterproofing",
    text: "Advanced protection systems designed to control moisture, leakage and long-term deterioration.",
    image: "/images/home/waterproofing.jpg",
    href: "/solutions",
    icon: Droplets,
  },
  {
    number: "03",
    title: "Protective Coatings",
    text: "Durable surface protection engineered around performance, exposure and application.",
    image: "/images/home/protective-coatings.jpg",
    href: "/solutions",
    icon: ShieldCheck,
  },
];

const industries = [
  "Automotive",
  "Pharmaceutical",
  "Food & Beverage",
  "Healthcare",
  "Warehousing & Logistics",
  "Textile",
  "FMCG",
  "Heavy Engineering",
  "Data Centres",
];

const projects = [
  {
    title: "Industrial Manufacturing",
    location: "India",
    image: "/images/projects/industrial-manufacturing.jpg",
  },
  {
    title: "Advanced Facility",
    location: "India",
    image: "/images/projects/advanced-facility.jpg",
  },
  {
    title: "Commercial Facility",
    location: "India",
    image: "/images/projects/commercial-facility.jpg",
  },
];

export default function Home() {
  return (
    <main className="colourplus-homepage">

      {/* =====================================================
          PAGE-LOCAL CSS
          Homepage only.
          globals.css remains untouched.
      ===================================================== */}

      <style>{`
        /* =====================================================
           COLOURPLUS HOMEPAGE
           ANTIGRAVITY / FLOATING MOTION SYSTEM
        ===================================================== */

        .colourplus-homepage {
          overflow: hidden;
        }

        /* =====================================================
           GLOBAL HOMEPAGE MOTION
        ===================================================== */

        @keyframes cpFadeUp {
          0% {
            opacity: 0;
            transform: translateY(32px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes cpFadeIn {
          0% {
            opacity: 0;
          }

          100% {
            opacity: 1;
          }
        }

        @keyframes cpFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(0, -10px, 0);
          }
        }

        @keyframes cpFloatLarge {
          0%,
          100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }

          50% {
            transform: translate3d(0, -18px, 0) rotate(1deg);
          }
        }

        @keyframes cpFloatSide {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(8px, -12px, 0);
          }
        }

        @keyframes cpSlowScale {
          0%,
          100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.035);
          }
        }

        @keyframes cpHeroImage {
          0%,
          100% {
            transform: scale(1.02) translate3d(0, 0, 0);
          }

          50% {
            transform: scale(1.055) translate3d(-0.5%, -0.5%, 0);
          }
        }

        @keyframes cpLineMove {
          0% {
            transform: translateY(-10%);
          }

          50% {
            transform: translateY(10%);
          }

          100% {
            transform: translateY(-10%);
          }
        }

        @keyframes cpGlow {
          0%,
          100% {
            opacity: 0.18;
            transform: scale(1);
          }

          50% {
            opacity: 0.32;
            transform: scale(1.08);
          }
        }

        /* =====================================================
           HERO
        ===================================================== */

        .colourplus-homepage .hero-creative {
          position: relative;
          overflow: hidden;
        }

        .colourplus-homepage .hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          z-index: 0;

          animation: cpHeroImage 14s ease-in-out infinite;

          transform-origin: center center;

          pointer-events: none;
        }

        .colourplus-homepage .hero-image {
          animation: cpHeroImage 14s ease-in-out infinite;
          transform-origin: center center;
        }

        .colourplus-homepage .hero-shade {
          transition: opacity 0.6s ease;
          z-index: 1;
        }

        .colourplus-homepage .hero-lines {
          animation: cpLineMove 12s ease-in-out infinite;
          transform-origin: center;
          z-index: 2;
        }

        .colourplus-homepage .hero-content {
          position: relative;
          z-index: 3;
        }

        .colourplus-homepage .hero-topline {
          animation: cpFadeIn 1s ease 0.15s both;
        }

        .colourplus-homepage .hero-eyebrow {
          animation:
            cpFadeUp 1s cubic-bezier(0.22, 1, 0.36, 1)
            0.35s both;
        }

        .colourplus-homepage .hero-main h1 {
          animation:
            cpFadeUp 1.15s cubic-bezier(0.22, 1, 0.36, 1)
            0.5s both;
        }

        .colourplus-homepage .hero-bottom {
          animation:
            cpFadeUp 1s cubic-bezier(0.22, 1, 0.36, 1)
            0.7s both;
        }

        .colourplus-homepage .hero-footer {
          animation: cpFadeIn 1s ease 1s both;
        }

        .colourplus-homepage .hero-button {
          transition:
            transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.4s ease;
        }

        .colourplus-homepage .hero-button:hover {
          transform: translateY(-4px);
        }

        .colourplus-homepage .hero-button.light:hover {
          box-shadow: 0 14px 35px rgba(0, 0, 0, 0.18);
        }

        /* =====================================================
           INTRO
        ===================================================== */

        .colourplus-homepage .intro-editorial {
          position: relative;
        }

        .colourplus-homepage .intro-editorial::before {
          content: "";
          position: absolute;
          width: 280px;
          height: 280px;
          border-radius: 50%;
          border: 1px solid rgba(25, 64, 110, 0.08);
          right: -100px;
          top: 15%;
          animation: cpFloatLarge 9s ease-in-out infinite;
          pointer-events: none;
        }

        .colourplus-homepage .intro-editorial .eyebrow {
          animation: cpFadeUp 0.9s ease both;
        }

        .colourplus-homepage .editorial-title {
          animation:
            cpFadeUp 1s cubic-bezier(0.22, 1, 0.36, 1)
            0.15s both;
        }

        .colourplus-homepage .editorial-copy {
          animation:
            cpFadeUp 1s cubic-bezier(0.22, 1, 0.36, 1)
            0.3s both;
        }

        .colourplus-homepage .intro-editorial .solution-link {
          transition:
            transform 0.4s ease,
            gap 0.4s ease;
        }

        .colourplus-homepage .intro-editorial .solution-link:hover {
          transform: translateX(6px);
          gap: 12px;
        }

        /* =====================================================
           SOLUTIONS
        ===================================================== */

        .colourplus-homepage .category-showcase {
          position: relative;
          overflow: hidden;
        }

        .colourplus-homepage .category-showcase::before {
          content: "";
          position: absolute;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          border: 1px solid rgba(25, 64, 110, 0.07);
          left: -220px;
          top: 18%;
          animation: cpFloatLarge 12s ease-in-out infinite;
          pointer-events: none;
        }

        .colourplus-homepage .category-showcase .section-heading {
          animation: cpFadeUp 0.9s ease both;
        }

        /* =====================================================
           SQUARE SOLUTION GRID
        ===================================================== */

        .colourplus-homepage .solution-grid-square {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 22px;
          width: 100%;
          perspective: 1200px;
        }

        .colourplus-homepage
          .solution-grid-square
          .solution-card-square {
          position: relative;
          width: 100%;
          max-width: none;
          height: auto;
          aspect-ratio: 1 / 1;
          margin: 0;
          min-width: 0;
          overflow: hidden;

          transform:
            translate3d(0, 0, 0)
            rotateX(0deg)
            rotateY(0deg);

          transition:
            transform 0.65s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.65s ease;
        }

        .colourplus-homepage
          .solution-card-square:nth-child(1) {
          animation: cpFloat 7s ease-in-out infinite;
          animation-delay: -1s;
        }

        .colourplus-homepage
          .solution-card-square:nth-child(2) {
          animation: cpFloat 8s ease-in-out infinite;
          animation-delay: -3s;
        }

        .colourplus-homepage
          .solution-card-square:nth-child(3) {
          animation: cpFloat 7.5s ease-in-out infinite;
          animation-delay: -5s;
        }

        .colourplus-homepage
          .solution-grid-square
          .solution-card-square
          .solution-overlay {
          position: absolute;
          inset: 0;
          transition:
            opacity 0.6s ease,
            background 0.6s ease;
        }

        .colourplus-homepage
          .solution-grid-square
          .solution-card-square
          .solution-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          z-index: 2;
        }

        .colourplus-homepage
          .solution-grid-square
          .solution-card-square::before {
          content: "";
          position: absolute;
          inset: -5%;
          background: inherit;
          background-size: cover;
          background-position: center;
          z-index: 0;
          transition:
            transform 1.1s cubic-bezier(0.22, 1, 0.36, 1),
            filter 0.8s ease;
        }

        .colourplus-homepage
          .solution-grid-square
          .solution-card-square {
          background-size: 0 0 !important;
        }

        .colourplus-homepage
          .solution-grid-square
          .solution-card-square:hover::before {
          transform: scale(1.08);
          filter: saturate(1.08);
        }

        .colourplus-homepage
          .solution-grid-square
          .solution-card-square:hover {
          animation-play-state: paused;
          transform:
            translate3d(0, -12px, 0)
            rotateX(1deg)
            rotateY(-1deg);
          box-shadow: 0 25px 55px rgba(7, 25, 48, 0.22);
        }

        .colourplus-homepage
          .solution-grid-square
          .solution-card-square:nth-child(2):hover {
          transform:
            translate3d(0, -12px, 0)
            rotateX(1deg)
            rotateY(1deg);
        }

        .colourplus-homepage
          .solution-grid-square
          .solution-card-square:nth-child(3):hover {
          transform:
            translate3d(0, -12px, 0)
            rotateX(1deg)
            rotateY(-1deg);
        }

        .colourplus-homepage
          .solution-grid-square
          .solution-card-square
          .solution-content
          h3 {
          max-width: 90%;
          transition:
            transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .colourplus-homepage
          .solution-grid-square
          .solution-card-square:hover
          .solution-content
          h3 {
          transform: translateY(-3px);
        }

        .colourplus-homepage
          .solution-grid-square
          .solution-card-square
          .solution-link {
          transition:
            transform 0.45s ease,
            gap 0.45s ease;
        }

        .colourplus-homepage
          .solution-grid-square
          .solution-card-square:hover
          .solution-link {
          transform: translateX(6px);
          gap: 10px;
        }

        /* =====================================================
           FINDER
        ===================================================== */

        .colourplus-homepage .finder {
          position: relative;
          overflow: hidden;
        }

        .colourplus-homepage .finder::after {
          content: "";
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.08);
          right: -260px;
          bottom: -250px;
          animation: cpFloatLarge 14s ease-in-out infinite;
          pointer-events: none;
        }

        .colourplus-homepage .finder-grid > div:first-child {
          animation:
            cpFadeUp 1s cubic-bezier(0.22, 1, 0.36, 1)
            both;
        }

        .colourplus-homepage .finder-panel {
          animation:
            cpFadeUp 1s cubic-bezier(0.22, 1, 0.36, 1)
            0.2s both,
            cpFloat 8s ease-in-out 1.2s infinite;
        }

        .colourplus-homepage .finder-options a {
          transition:
            transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
            padding-left 0.45s ease;
        }

        .colourplus-homepage .finder-options a:hover {
          transform: translateX(7px);
        }

        /* =====================================================
           INDUSTRIES
        ===================================================== */

        .colourplus-homepage .industry-section {
          position: relative;
          overflow: hidden;
        }

        .colourplus-homepage .industry-section::after {
          content: "";
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          border: 1px solid rgba(25, 64, 110, 0.06);
          right: -140px;
          top: 10%;
          animation: cpFloatLarge 11s ease-in-out infinite;
          pointer-events: none;
        }

        .colourplus-homepage .industry-list {
          position: relative;
          z-index: 2;
        }

        .colourplus-homepage .industry-row {
          position: relative;
          transition:
            transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
            padding-left 0.5s ease,
            background-color 0.5s ease;
        }

        .colourplus-homepage .industry-row:hover {
          transform: translateX(8px);
          padding-left: 10px;
        }

        .colourplus-homepage .industry-row h3 {
          transition:
            transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .colourplus-homepage .industry-row:hover h3 {
          transform: translateX(5px);
        }

        .colourplus-homepage .industry-arrow {
          transition:
            transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .colourplus-homepage .industry-row:hover .industry-arrow {
          transform: translate3d(5px, -5px, 0);
        }

        /* =====================================================
           PROJECTS
        ===================================================== */

        .colourplus-homepage .projects-editorial {
          position: relative;
          overflow: hidden;
        }

        .colourplus-homepage .projects-editorial::before {
          content: "";
          position: absolute;
          width: 380px;
          height: 380px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.07);
          left: -220px;
          top: 20%;
          animation: cpFloatLarge 13s ease-in-out infinite;
          pointer-events: none;
        }

        .colourplus-homepage .project-heading-row {
          animation:
            cpFadeUp 1s cubic-bezier(0.22, 1, 0.36, 1)
            both;
        }

        .colourplus-homepage .project-card {
          position: relative;
          overflow: hidden;
          transition:
            transform 0.7s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.7s ease;
        }

        .colourplus-homepage .project-card:nth-child(1) {
          animation: cpFloat 9s ease-in-out infinite;
          animation-delay: -2s;
        }

        .colourplus-homepage .project-card:nth-child(2) {
          animation: cpFloat 10s ease-in-out infinite;
          animation-delay: -5s;
        }

        .colourplus-homepage .project-card:nth-child(3) {
          animation: cpFloat 8.5s ease-in-out infinite;
          animation-delay: -7s;
        }

        .colourplus-homepage .project-card:hover {
          animation-play-state: paused;
          transform: translateY(-10px);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.28);
        }

        .colourplus-homepage .project-card::before {
          content: "";
          position: absolute;
          inset: -5%;
          background: inherit;
          background-size: cover;
          background-position: center;
          transition:
            transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }

        .colourplus-homepage .project-card {
          background-size: 0 0 !important;
        }

        .colourplus-homepage .project-card:hover::before {
          transform: scale(1.08);
        }

        .colourplus-homepage .project-shade {
          position: absolute;
          z-index: 1;
          inset: 0;
        }

        /* =====================================================
           PROJECT TEXT — MOVED TO BOTTOM OF IMAGE
        ===================================================== */

        .colourplus-homepage .project-content {
          position: absolute !important;
          left: 0;
          right: 0;
          bottom: 0;
          top: auto !important;

          z-index: 2;

          display: flex;
          flex-direction: row;
          align-items: flex-end;
          justify-content: space-between;

          padding: 110px 28px 28px;

          min-height: 45%;

          background:
            linear-gradient(
              to top,
              rgba(5, 15, 28, 0.82) 0%,
              rgba(5, 15, 28, 0.48) 42%,
              rgba(5, 15, 28, 0) 100%
            );
        }

        .colourplus-homepage .project-content > div {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-end;
        }

        .colourplus-homepage .project-content > div > p {
          margin: 0 0 10px;
        }

        .colourplus-homepage .project-content h3 {
          margin: 0 0 8px;
          max-width: 90%;
          transition:
            transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .colourplus-homepage .project-content > div > span {
          display: block;
        }

        /* =====================================================
           PROJECT CARDS ARE NOW STATIC
           No navigation arrow/button.
        ===================================================== */

        .colourplus-homepage .project-card {
          cursor: default;
        }

        .colourplus-homepage .project-card:hover .project-content h3 {
          transform: translateY(-3px);
        }

        /* =====================================================
           FINAL CTA
        ===================================================== */

        .colourplus-homepage .final-cta {
          position: relative;
          overflow: hidden;
        }

        .colourplus-homepage .final-cta::before {
          content: "";
          position: absolute;
          width: 460px;
          height: 460px;
          border-radius: 50%;
          border: 1px solid rgba(25, 64, 110, 0.08);
          left: -250px;
          top: -180px;
          animation: cpFloatLarge 11s ease-in-out infinite;
          pointer-events: none;
        }

        .colourplus-homepage .final-cta::after {
          content: "";
          position: absolute;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: rgba(25, 64, 110, 0.035);
          right: 8%;
          top: 25%;
          animation: cpGlow 8s ease-in-out infinite;
          pointer-events: none;
        }

        .colourplus-homepage .final-cta-inner {
          position: relative;
          z-index: 2;
          animation:
            cpFadeUp 1s cubic-bezier(0.22, 1, 0.36, 1)
            both;
        }

        .colourplus-homepage .pill-button {
          transition:
            transform 0.55s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.55s ease;
        }

        .colourplus-homepage .pill-button:hover {
          transform: translateY(-7px);
          box-shadow: 0 18px 45px rgba(7, 25, 48, 0.2);
        }

        /* =====================================================
           FOOTER
        ===================================================== */

        .colourplus-homepage + .footer {
          position: relative;
        }

        /* =====================================================
           TABLET
        ===================================================== */

        @media (max-width: 1100px) {
          .colourplus-homepage
            .solution-grid-square {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 18px;
          }

          .colourplus-homepage
            .solution-grid-square
            .solution-card-square {
            width: 100%;
            max-width: none;
            height: auto;
            aspect-ratio: 1 / 1;
          }

          .colourplus-homepage .project-content {
            padding:
              100px
              22px
              22px;
          }
        }

        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 700px) {
          .colourplus-homepage
            .solution-card-square:nth-child(1),
          .colourplus-homepage
            .solution-card-square:nth-child(2),
          .colourplus-homepage
            .solution-card-square:nth-child(3),
          .colourplus-homepage
            .project-card:nth-child(1),
          .colourplus-homepage
            .project-card:nth-child(2),
          .colourplus-homepage
            .project-card:nth-child(3) {
            animation-duration: 10s;
          }

          .colourplus-homepage
            .intro-editorial::before,
          .colourplus-homepage
            .category-showcase::before,
          .colourplus-homepage
            .finder::after,
          .colourplus-homepage
            .industry-section::after,
          .colourplus-homepage
            .projects-editorial::before,
          .colourplus-homepage
            .final-cta::before {
            opacity: 0.5;
          }

          .colourplus-homepage .project-content {
            padding:
              100px
              18px
              20px;
            min-height: 48%;
          }

          .colourplus-homepage .project-content h3 {
            font-size: 25px;
            line-height: 1.05;
          }

          .colourplus-homepage
            .project-content
            > div
            > p {
            margin-bottom: 7px;
          }
        }

        @media (max-width: 560px) {
          .colourplus-homepage
            .solution-grid-square {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .colourplus-homepage
            .solution-grid-square
            .solution-card-square {
            width: 100%;
            max-width: 360px;
            height: auto;
            aspect-ratio: 1 / 1;
            margin: 0 auto;
          }

          .colourplus-homepage
            .solution-card-square:nth-child(1),
          .colourplus-homepage
            .solution-card-square:nth-child(2),
          .colourplus-homepage
            .solution-card-square:nth-child(3) {
            animation: cpFloat 11s ease-in-out infinite;
          }

          .colourplus-homepage .project-content {
            padding:
              90px
              16px
              18px;
            min-height: 50%;
          }

          .colourplus-homepage .project-content h3 {
            font-size: 22px;
          }
        }

        /* =====================================================
           REDUCED MOTION
        ===================================================== */

        @media (prefers-reduced-motion: reduce) {
          .colourplus-homepage *,
          .colourplus-homepage *::before,
          .colourplus-homepage *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }

          .colourplus-homepage
            .solution-grid-square
            .solution-card-square:hover {
            transform: none;
          }

          .colourplus-homepage .project-card:hover {
            transform: none;
          }
        }
      `}</style>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="hero-creative">

        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source
            src="/videos/home-hero.mp4"
            type="video/mp4"
          />
        </video>

        <div className="hero-shade" />

        <div className="hero-lines" />

        <div className="container hero-content">

          <div className="hero-topline">
            <span>
              COLOURPLUS POLYURETHANES PVT. LTD.
            </span>

            <span>
              ENGINEERED SURFACES / INDIA
            </span>
          </div>

          <div className="hero-main">

            <p className="eyebrow hero-eyebrow">
              Surface Intelligence / 18 Years of Experience
            </p>

            <h1>
              Surfaces
              <br />
              engineered
              <br />
              <em>for reality.</em>
            </h1>

            <div className="hero-bottom">

              <p>
                Performance-driven flooring, waterproofing and protective
                coatings built around the way spaces actually work.
              </p>

              <div className="hero-buttons">

                <Link
                  href="/solutions"
                  className="hero-button light"
                >
                  Explore Solutions
                  <ArrowUpRight size={16} />
                </Link>

                <Link
                  href="/contact"
                  className="hero-button ghost"
                >
                  Start a Project
                  <ArrowUpRight size={16} />
                </Link>

              </div>

            </div>

          </div>

          <div className="hero-footer">
            <span>01 / 04</span>
            <span>SCROLL TO EXPLORE</span>
            <ArrowDownRight size={16} />
          </div>

        </div>

      </section>

      {/* =====================================================
          INTRO
      ===================================================== */}

      <section className="intro-editorial">

        <div className="container editorial-grid">

          <div>
            <p className="eyebrow">
              01 / Colourplus
            </p>
          </div>

          <div>

            <h2 className="editorial-title">
              Where technical
              <br />
              performance meets
              <br />
              <em>surface engineering.</em>
            </h2>

            <p className="editorial-copy">
              Colourplus develops engineered surface systems for spaces where
              performance, durability and technical quality have to work
              together. From industrial environments to demanding commercial
              applications, every system begins with understanding the surface,
              the environment and the way it will be used.
            </p>

            <Link
              href="/about"
              className="solution-link"
              style={{
                color: "var(--blue)",
                marginTop: 32,
              }}
            >
              Discover Colourplus
              <ArrowUpRight size={17} />
            </Link>

          </div>

        </div>

      </section>

      {/* =====================================================
          SOLUTIONS
      ===================================================== */}

      <section className="category-showcase">

        <div className="container">

          <div className="section-heading">

            <div>

              <p className="eyebrow">
                02 / Solutions
              </p>

              <h2 className="h2 section-title">
                Built for the
                <br />
                <em>surface.</em>
              </h2>

            </div>

            <p className="section-copy">
              Systems engineered around application requirements,
              environmental exposure, performance and the operating demands of
              each space.
            </p>

          </div>

          <div className="category-grid solution-grid-square">

            {solutions.map((solution) => {

              const Icon = solution.icon;

              return (
                <Link
                  href={solution.href}
                  key={solution.number}
                  className="solution-card solution-card-square"
                  style={{
                    backgroundImage: `url("${solution.image}")`,
                  }}
                >

                  <div className="solution-overlay" />

                  <div className="solution-content">

                    <div className="solution-meta">

                      <span>
                        {solution.number}
                      </span>

                      <span>
                        <Icon size={13} />
                      </span>

                    </div>

                    <div>

                      <h3>
                        {solution.title}
                      </h3>

                      <p>
                        {solution.text}
                      </p>

                      <span className="solution-link">
                        Explore system
                        <ArrowUpRight size={16} />
                      </span>

                    </div>

                  </div>

                </Link>
              );
            })}

          </div>

        </div>

      </section>

      {/* =====================================================
          SOLUTION FINDER
      ===================================================== */}

      <section className="finder">

        <div className="container finder-grid">

          <div>

            <p className="eyebrow light">
              03 / Solution Finder
            </p>

            <h2 className="h2 finder-title">
              Start with
              <br />
              the <em>space.</em>
            </h2>

            <p className="finder-copy">
              Every project has different conditions. Tell us what you are
              building and identify the right surface direction.
            </p>

          </div>

          <div className="finder-panel">

            <span className="finder-step">
              STEP 01 / APPLICATION
            </span>

            <h3>
              What are you working on?
            </h3>

            <div className="finder-options">

              <Link href="/solutions">
                Industrial facility
                <ArrowUpRight size={16} />
              </Link>

              <Link href="/solutions">
                Commercial space
                <ArrowUpRight size={16} />
              </Link>

              <Link href="/solutions">
                Residential project
                <ArrowUpRight size={16} />
              </Link>

              <Link href="/solutions">
                Other environment
                <ArrowUpRight size={16} />
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          INDUSTRIES
      ===================================================== */}

      <section className="industry-section">

        <div className="container">

          <div className="section-heading">

            <div>

              <p className="eyebrow">
                04 / Industries
              </p>

              <h2 className="h2 section-title">
                Engineered around
                <br />
                <em>industry.</em>
              </h2>

            </div>

            <p className="section-copy">
              Different environments demand different surface
              characteristics. Colourplus systems are developed around those
              operating conditions.
            </p>

          </div>

          <div className="industry-list">

            {industries.map((industry, index) => (

              <Link
                href="/industries"
                className="industry-row"
                key={industry}
              >

                <span className="industry-no">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3>
                  {industry}
                </h3>

                <p>
                  Surface systems engineered for the operational demands of
                  the environment.
                </p>

                <span className="industry-arrow">
                  <ArrowUpRight size={20} />
                </span>

              </Link>

            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          PROJECTS
          Static showcase for now — no navigation.
      ===================================================== */}

      <section className="projects-editorial">

        <div className="container">

          <div className="project-heading-row">

            <div>

              <p className="eyebrow light">
                05 / Projects
              </p>

              <h2 className="h2 light-title">
                Surfaces in
                <br />
                <em>context.</em>
              </h2>

            </div>

            <p className="light-copy">
              Explore selected applications and environments where Colourplus
              systems become part of the working environment itself.
            </p>

          </div>

          <div className="project-grid">

            {projects.map((project, index) => (

              <div
                className="project-card"
                key={project.title}
                style={{
                  backgroundImage: `url("${project.image}")`,
                }}
              >

                <div className="project-shade" />

                <div className="project-content">

                  <div>

                    <p>
                      {String(index + 1).padStart(2, "0")} / PROJECT
                    </p>

                    <h3>
                      {project.title}
                    </h3>

                    <span>
                      {project.location}
                    </span>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="final-cta">

        <div className="container final-cta-inner">

          <div>

            <p className="eyebrow">
              06 / Start a Project
            </p>

            <h2 className="h2 final-title">
              Tell us about
              <br />
              your <em>surface.</em>
            </h2>

          </div>

          <Link
            href="/contact"
            className="pill-button"
          >
            Get a Solution
            <ArrowUpRight size={17} />
          </Link>

        </div>

      </section>

    </main>
  );
}

/* ============================================================
   FOOTER
============================================================ */

function Footer() {
  return (
    <footer className="footer">

      <div className="container">

        <div className="footer-top">

          <div className="footer-brand">

            <div className="footer-logo">
              COLOURPLUS
            </div>

            <p>
              Engineered surfaces for industrial, commercial and demanding
              operating environments.
            </p>

          </div>

          <div>

            <p className="eyebrow">
              Explore
            </p>

            <Link href="/solutions">
              Solutions
            </Link>

            <Link href="/industries">
              Industries
            </Link>

            <Link href="/products">
              Products
            </Link>

            <Link href="/projects">
              Projects
            </Link>

            <Link href="/technology">
              Technology
            </Link>

          </div>

          <div>

            <p className="eyebrow">
              Connect
            </p>

            <Link href="/about">
              About Colourplus
            </Link>

            <Link href="/contact">
              Contact
            </Link>

          </div>

        </div>

        <div className="footer-bottom">

          <span>
            © {new Date().getFullYear()} COLOURPLUS POLYURETHANES PVT. LTD.
          </span>

          <span>
            ENGINEERED SURFACES / INDIA
          </span>

        </div>

      </div>

    </footer>
  );
}