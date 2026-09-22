"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Factory,
  Layers3,
  Ruler,
  ShieldCheck,
  Droplets,
} from "lucide-react";

const capabilities = [
  {
    number: "01",
    title: "Engineered Systems",
    text: "Surface systems developed around application conditions, performance requirements and long-term use.",
    icon: Layers3,
  },
  {
    number: "02",
    title: "Technical Expertise",
    text: "Technical understanding across epoxy, polyurethane, protective coatings and waterproofing applications.",
    icon: Ruler,
  },
  {
    number: "03",
    title: "Application Experience",
    text: "Extensive application experience supported by in-house teams and project execution capability.",
    icon: ShieldCheck,
  },
  {
    number: "04",
    title: "Manufacturing Foundation",
    text: "A manufacturing-led approach connecting material knowledge with practical surface execution.",
    icon: Factory,
  },
];

const portfolio = [
  {
    title: "Epoxy Flooring",
    text: "Industrial flooring systems designed around wear, traffic and operational requirements.",
    icon: Layers3,
    image: "/images/about/portfolio/epoxy-flooring.png",
    position: "center center",
    tone: "blue",
  },
  {
    title: "Polyurethane Systems",
    text: "High-performance systems for demanding environments and long-term surface performance.",
    icon: ShieldCheck,
    image: "/images/about/portfolio/polyurethane-systems.png",
    position: "center center",
    tone: "amber",
  },
  {
    title: "Protective Coatings",
    text: "Surface protection developed around exposure, durability and application conditions.",
    icon: ShieldCheck,
    image: "/images/about/portfolio/protective-coatings.png",
    position: "center center",
    tone: "violet",
  },
  {
    title: "Waterproofing",
    text: "Protection systems designed to control moisture, leakage and deterioration.",
    icon: Droplets,
    image: "/images/about/portfolio/waterproofing.png",
    position: "center center",
    tone: "cyan",
  },
  {
    title: "ESD & Dielectric Flooring",
    text: "Specialised flooring environments where electrical performance and control matter.",
    icon: Ruler,
    image: "/images/about/portfolio/esd-dielectric.png",
    position: "center center",
    tone: "green",
  },
  {
    title: "Hygienic Wall Coatings",
    text: "Seamless wall protection for controlled and hygiene-sensitive environments.",
    icon: Layers3,
    image: "/images/about/portfolio/hygienic-wall-coatings.png",
    position: "center center",
    tone: "pink",
  },
  {
    title: "Anti-Skid Systems",
    text: "Surface systems developed for areas where slip resistance is an important requirement.",
    icon: ShieldCheck,
    image: "/images/about/portfolio/anti-skid.png",
    position: "center center",
    tone: "orange",
  },
  {
    title: "Coving & Floor Marking",
    text: "Surface infrastructure supporting hygiene, movement and operational organisation.",
    icon: Ruler,
    image: "/images/about/portfolio/coving-floor-marking.png",
    position: "center center",
    tone: "lime",
  },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const overviewRef = useRef<HTMLElement | null>(null);
  const proofRef = useRef<HTMLElement | null>(null);
  const capabilityRef = useRef<HTMLElement | null>(null);
  const portfolioRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const sections = [
      heroRef.current,
      overviewRef.current,
      proofRef.current,
      capabilityRef.current,
      portfolioRef.current,
    ].filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="about-page">

      {/* =========================================================
          HERO
      ========================================================= */}

      <section ref={heroRef} className="about-hero">
        <div className="about-hero-image" />
        <div className="about-hero-overlay" />

        <div className="about-hero-grid">
          <div className="about-hero-copy">
            <p className="eyebrow">COLOURPLUS / ABOUT</p>

            <h1>
              Engineered
              <br />
              around the
              <br />
              <em>surface.</em>
            </h1>

            <p className="about-hero-description">
              Colourplus develops engineered surface systems for environments
              where performance, durability and application conditions matter.
            </p>
          </div>

          <div className="about-hero-meta">
            <span>ENGINEERED SURFACES</span>
            <span>INDIA</span>
          </div>
        </div>

        <div className="about-hero-bottom">
          <span>POLYURETHANES / FLOORING / COATINGS</span>

          <span className="about-hero-scroll">
            SCROLL TO EXPLORE
            <span className="scroll-line" />
          </span>
        </div>
      </section>

      {/* =========================================================
          SECTION 2 — COMPANY OVERVIEW
      ========================================================= */}

      <section ref={overviewRef} className="about-overview">
        <div className="overview-topline">
          <span>COMPANY OVERVIEW</span>
          <span>ENGINEERED SURFACES / INDIA</span>
        </div>

        <div className="overview-grid">

          <div className="overview-copy">
            <p className="eyebrow">THE COLOURPLUS APPROACH</p>

            <div className="overview-title-wrap">
              <span className="overview-title-line overview-title-line-left" />

              <h2>
                Surface systems
                <br />
                <em>built for</em>
                <br />
                real environments.
              </h2>

              <span className="overview-title-line overview-title-line-right" />
            </div>

            <div className="overview-accent" />
          </div>

          <div className="overview-copy overview-copy-right">

            <div className="overview-copy-orbit" aria-hidden="true">
              <span />
              <span />
            </div>

            <p className="overview-description">
              Colourplus approaches flooring, coatings and waterproofing as
              engineered surface systems rather than isolated products.
              Solutions are considered around the conditions in which the
              surface will operate, the performance expected from it and the
              application required to achieve it.
            </p>

            <p className="overview-description">
              From industrial manufacturing environments to controlled,
              hygiene-sensitive and high-performance spaces, the focus remains
              on creating surfaces that work with the environment around them.
            </p>

            <Link href="/solutions" className="text-link">
              <span>EXPLORE SOLUTIONS</span>
              <ArrowRight size={17} strokeWidth={1.5} />
            </Link>

          </div>
        </div>

        <div className="overview-side-label">
          <span>01</span>
          <span>ENGINEERED</span>
          <span>SURFACES</span>
        </div>
      </section>

      {/* =========================================================
          SECTION 3 — PROOF & EXPERIENCE
      ========================================================= */}

      <section ref={proofRef} className="about-proof">

        <div className="proof-orbit-field" aria-hidden="true">
          <span className="proof-orbit proof-orbit-large" />
          <span className="proof-orbit proof-orbit-small" />

          <span className="proof-orbit-dot proof-orbit-dot-one" />
          <span className="proof-orbit-dot proof-orbit-dot-two" />
        </div>

        <div className="proof-topline">
          <span>03 / PROOF & EXPERIENCE</span>
          <span>COLOURPLUS / INDIA</span>
        </div>

        <div className="proof-main">

          <div className="proof-intro">
            <p className="proof-title-meta">THE FOUNDATION</p>

            <h2>
              Built through
              <br />
              <em>application.</em>
            </h2>
          </div>

          <div className="proof-intro-copy">
            <span className="proof-copy-line" />

            <p>
              A manufacturing foundation combined with years of application
              experience across demanding surface environments.
            </p>
          </div>

        </div>

        <div className="proof-stats">

          <div className="proof-stat proof-stat-primary">

            <div className="proof-stat-top">
              <span>APPLICATION</span>
              <span>01</span>
            </div>

            <div className="proof-stat-number">
              <strong>17+</strong>
              <span>YEARS</span>
            </div>

            <p>
              Experience across industrial flooring and engineered surface
              applications.
            </p>

            <div className="proof-stat-orbit" aria-hidden="true">
              <span />
            </div>

          </div>

          <div className="proof-stat">

            <div className="proof-stat-top">
              <span>SOLUTION RANGE</span>
              <span>02</span>
            </div>

            <strong className="proof-small-number">
              45+
            </strong>

            <span className="proof-stat-label">
              FLOORING
              <br />
              SOLUTIONS
            </span>

          </div>

          <div className="proof-stat">

            <div className="proof-stat-top">
              <span>COMPANY</span>
              <span>03</span>
            </div>

            <strong className="proof-small-number">
              18+
            </strong>

            <span className="proof-stat-label">
              YEARS OF COMPANY
              <br />
              EXPERIENCE
            </span>

          </div>

        </div>

        <div className="proof-bottom">

          <p>
            Colourplus combines material understanding, application experience
            and manufacturing capability to approach surfaces as complete
            systems.
          </p>

          <Link href="/solutions" className="text-link proof-link">
            <span>VIEW SOLUTION SYSTEMS</span>
            <ArrowRight size={17} strokeWidth={1.5} />
          </Link>

        </div>

      </section>

      {/* =========================================================
          SECTION 4 — WHAT DEFINES COLOURPLUS
          COMPACT / CREATIVE / ANIMATED
      ========================================================= */}

      <section
        ref={capabilityRef}
        className="about-capabilities"
      >

        <div className="capability-background-grid" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="capability-orbit capability-orbit-one" aria-hidden="true" />
        <div className="capability-orbit capability-orbit-two" aria-hidden="true" />

        <div className="capability-topline">
          <span>04 / WHAT DEFINES COLOURPLUS</span>

          <span className="capability-topline-right">
            MATERIAL / KNOWLEDGE / APPLICATION
          </span>
        </div>

        <div className="capability-layout">

          {/* LEFT */}

          <div className="capability-intro">

            <div className="capability-number">
              <span>04</span>
              <i />
            </div>

            <p className="eyebrow">
              WHAT DEFINES COLOURPLUS
            </p>

            <h2>
              From material
              <br />
              <em>to application.</em>
            </h2>

            <p className="capability-intro-copy">
              The value of a surface system extends beyond the material itself.
              It comes from understanding the environment, selecting the right
              system and executing it correctly.
            </p>

          </div>

          {/* RIGHT — COMPACT CARDS */}

          <div className="capability-grid">

            {capabilities.map((item) => {

              const Icon = item.icon;

              return (
                <article
                  className="capability-card"
                  key={item.title}
                >

                  <div className="capability-card-number">
                    {item.number}
                  </div>

                  <div className="capability-icon">
                    <Icon
                      size={19}
                      strokeWidth={1.35}
                    />
                  </div>

                  <div className="capability-card-content">

                    <h3>
                      {item.title}
                    </h3>

                    <p>
                      {item.text}
                    </p>

                  </div>

                  <ArrowUpRight
                    className="capability-arrow"
                    size={18}
                    strokeWidth={1.35}
                  />

                  <span className="capability-card-line" />

                </article>
              );

            })}

          </div>

        </div>

        <div className="capability-bottom-line">
          <span />
          <span>COLOURPLUS / ENGINEERED SURFACES</span>
          <span />
        </div>

      </section>

      {/* =========================================================
          SECTION 5 — SURFACE PORTFOLIO
      ========================================================= */}

      <section
        ref={portfolioRef}
        className="about-portfolio"
      >

        <div className="portfolio-heading">

          <div>

            <p className="eyebrow">
              COLOURPLUS / SYSTEM RANGE
            </p>

            <h2>
              Systems for
              <br />
              different <em>demands.</em>
            </h2>

          </div>

          <p>
            A portfolio of engineered surface systems developed around
            different environments, performance requirements and applications.
          </p>

        </div>

        <div className="portfolio-marquee">

          <div className="portfolio-track">

            {[...portfolio, ...portfolio].map(
              (item, index) => {

                const Icon = item.icon;

                return (
                  <article
                    className={`portfolio-flip-card portfolio-tone-${item.tone}`}
                    key={`${item.title}-${index}`}
                    tabIndex={0}
                    aria-label={`${item.title}. Hover or focus to view details.`}
                  >

                    <div className="portfolio-flip-inner">

                      <div className="portfolio-card-front">

                        <div
                          className="portfolio-card-image"
                          style={{
                            backgroundImage:
                              `url("${item.image}")`,
                            backgroundPosition:
                              item.position,
                          }}
                        />

                        <div className="portfolio-card-image-shade" />

                        <div className="portfolio-colour-wash" />

                        <div className="portfolio-front-content">

                          <div className="portfolio-front-top">

                            <span>
                              COLOURPLUS
                            </span>

                            <Icon
                              size={18}
                              strokeWidth={1.35}
                              className="portfolio-front-icon"
                            />

                          </div>

                          <div className="portfolio-front-bottom">

                            <span>
                              SURFACE SYSTEM
                            </span>

                            <span className="portfolio-front-dot" />

                          </div>

                        </div>

                      </div>

                      <div className="portfolio-card-back">

                        <div className="portfolio-back-top">

                          <Icon
                            size={24}
                            strokeWidth={1.35}
                          />

                          <span>
                            SURFACE SYSTEM
                          </span>

                        </div>

                        <div className="portfolio-back-content">

                          <h3>
                            {item.title}
                          </h3>

                          <p>
                            {item.text}
                          </p>

                        </div>

                        <div className="portfolio-back-bottom">

                          <span>
                            COLOURPLUS
                          </span>

                          <ArrowUpRight
                            size={20}
                            strokeWidth={1.35}
                          />

                        </div>

                      </div>

                    </div>

                  </article>
                );
              }
            )}

          </div>

        </div>

        <div className="portfolio-footer">

          <p>
            Explore the complete range of systems and applications developed
            around real operating conditions.
          </p>

          <Link
            href="/solutions"
            className="text-link"
          >
            <span>EXPLORE SOLUTIONS</span>

            <ArrowRight
              size={17}
              strokeWidth={1.5}
            />
          </Link>

        </div>

      </section>

      {/* =========================================================
          STYLES
      ========================================================= */}

      <style jsx>{`

        /* =========================================================
           BASE
        ========================================================= */

        .about-page {
          background: #f3f0e9;
          color: #101722;
          overflow: hidden;
        }

        .about-page * {
          box-sizing: border-box;
        }

        .eyebrow {
          margin: 0;
          font-size: 10px;
          line-height: 1;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 600;
          color: rgba(16, 23, 34, 0.58);
        }

        .text-link {
          display: inline-flex;
          align-items: center;
          gap: 11px;
          color: #101722;
          text-decoration: none;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 600;
          transition:
            gap 0.3s ease,
            opacity 0.3s ease;
        }

        .text-link:hover {
          gap: 16px;
        }

        /* =========================================================
           HERO
        ========================================================= */

        .about-hero {
          position: relative;
          min-height: 620px;
          height: min(76vh, 760px);
          overflow: hidden;
          background: #101722;
          color: #fff;
          isolation: isolate;
        }

        .about-hero-image {
          position: absolute;
          inset: 0;
          background-image:
            url("/images/about/about-hero.jpg");
          background-position: center;
          background-size: cover;
          transform: scale(1.03);
          animation:
            heroImageScale
            10s ease-out forwards;
          z-index: -3;
        }

        .about-hero-overlay {
          position: absolute;
          inset: 0;
          background: transparent;
          z-index: -2;
          pointer-events: none;
        }

        .about-hero-grid {
          width: 100%;
          height: 100%;
          padding: 85px 7vw 80px;
          display: grid;
          grid-template-columns:
            minmax(0, 1fr)
            auto;
          align-items: center;
          gap: 5vw;
        }

        .about-hero-copy {
          max-width: 760px;
        }

        .about-hero-copy .eyebrow {
          color: rgba(255, 255, 255, 0.64);
          margin-bottom: 24px;
        }

        .about-hero-copy h1 {
          margin: 0;
          font-size:
            clamp(62px, 8vw, 122px);
          line-height: 0.88;
          letter-spacing: -0.055em;
          font-weight: 400;
        }

        .about-hero-copy h1 em {
          font-family:
            Georgia,
            "Times New Roman",
            serif;
          font-weight: 400;
          letter-spacing: -0.04em;
        }

        .about-hero-description {
          max-width: 450px;
          margin: 30px 0 0;
          font-size: 14px;
          line-height: 1.75;
          color: rgba(255, 255, 255, 0.72);
        }

        .about-hero-meta {
          align-self: end;
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-bottom: 15px;
          font-size: 9px;
          letter-spacing: 0.17em;
          color: rgba(255, 255, 255, 0.48);
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }

        .about-hero-bottom {
          position: absolute;
          bottom: 28px;
          left: 7vw;
          right: 7vw;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
          font-size: 8px;
          letter-spacing: 0.16em;
          color: rgba(255, 255, 255, 0.5);
        }

        .about-hero-scroll {
          display: inline-flex;
          align-items: center;
          gap: 12px;
        }

        .scroll-line {
          display: block;
          width: 65px;
          height: 1px;
          background:
            rgba(255, 255, 255, 0.45);
        }

        /* =========================================================
           OVERVIEW
        ========================================================= */

        .about-overview {
          position: relative;
          padding: 70px 7vw 80px;
          background: #f3f0e9;
        }

        .overview-topline {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 18px;
          border-bottom:
            1px solid rgba(16, 23, 34, 0.14);
          font-size: 9px;
          letter-spacing: 0.16em;
          color: rgba(16, 23, 34, 0.48);
        }

        .overview-grid {
          display: grid;
          grid-template-columns:
            minmax(0, 1.05fr)
            minmax(300px, 0.72fr);
          gap: 7vw;
          align-items: center;
          margin-top: 48px;
        }

        .overview-copy {
          max-width: none;
        }

        .overview-copy-right {
          position: relative;
          max-width: 480px;
          justify-self: end;
          padding-top: 10px;
        }

        .overview-copy .eyebrow {
          margin-bottom: 22px;
        }

        .overview-title-wrap {
          display: flex;
          align-items: center;
          gap: 20px;
          width: 100%;
          opacity: 0;
          transform: translateY(28px);
          transition:
            opacity 0.8s ease,
            transform 1s
              cubic-bezier(0.16, 1, 0.3, 1);
        }

        .overview-title-line {
          flex: 1 1 70px;
          max-width: 85px;
          height: 1px;
          background:
            rgba(16, 23, 34, 0.2);
        }

        .overview-title-line-left {
          margin-left: -7vw;
        }

        .overview-title-line-right {
          margin-right: -7vw;
        }

        .overview-copy h2 {
          margin: 0;
          font-size:
            clamp(48px, 5.6vw, 78px);
          line-height: 0.94;
          letter-spacing: -0.05em;
          font-weight: 400;
        }

        .overview-copy h2 em {
          font-family:
            Georgia,
            "Times New Roman",
            serif;
          font-weight: 400;
        }

        .overview-accent {
          width: 52px;
          height: 3px;
          margin: 34px 0 0;
          background: #273a57;
          transform: scaleX(0);
          transform-origin: left center;
          transition:
            transform 0.8s 0.32s
              cubic-bezier(0.16, 1, 0.3, 1);
        }

        .overview-copy-right {
          opacity: 0;
          transform: translateY(34px);
          transition:
            opacity 0.8s 0.14s ease,
            transform 1.05s 0.14s
              cubic-bezier(0.16, 1, 0.3, 1);
        }

        .about-overview.is-visible
          .overview-title-wrap {
          opacity: 1;
          transform: translateY(0);
        }

        .about-overview.is-visible
          .overview-copy-right {
          opacity: 1;
          transform: translateY(0);
        }

        .about-overview.is-visible
          .overview-accent {
          transform: scaleX(1);
        }

        .overview-copy-right::before {
          content: "";
          position: absolute;
          left: -24px;
          top: 8px;
          width: 1px;
          height: 0;
          background:
            rgba(16, 23, 34, 0.16);
          transition:
            height 1s 0.45s
              cubic-bezier(0.16, 1, 0.3, 1);
        }

        .about-overview.is-visible
          .overview-copy-right::before {
          height: calc(100% - 8px);
        }

        .overview-copy-orbit {
          position: absolute;
          right: -18px;
          top: -24px;
          width: 78px;
          height: 78px;
          pointer-events: none;
          opacity: 0.5;
          animation:
            overviewOrbitFloat
            7s ease-in-out infinite;
        }

        .overview-copy-orbit span {
          position: absolute;
          inset: 0;
          border:
            1px solid rgba(39, 58, 87, 0.18);
          border-radius: 50%;
        }

        .overview-copy-orbit span:nth-child(2) {
          inset: 19px;
          border-color:
            rgba(39, 58, 87, 0.28);
        }

        .overview-copy-orbit::after {
          content: "";
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #273a57;
          top: 8px;
          right: 15px;
          box-shadow:
            0 0 0 6px
              rgba(39, 58, 87, 0.06);
        }

        .overview-description {
          max-width: 520px;
          margin: 0 0 17px;
          font-size: 13px;
          line-height: 1.8;
          color:
            rgba(16, 23, 34, 0.66);
          opacity: 0;
          transform: translateY(14px);
          transition:
            opacity 0.7s ease,
            transform 0.8s
              cubic-bezier(0.16, 1, 0.3, 1);
        }

        .about-overview.is-visible
          .overview-description {
          opacity: 1;
          transform: translateY(0);
        }

        .about-overview.is-visible
          .overview-copy-right
          .overview-description:nth-of-type(2) {
          transition-delay: 0.12s;
        }

        .overview-copy .text-link {
          margin-top: 17px;
        }

        .overview-side-label {
          position: absolute;
          right: 2.2vw;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 7px;
          writing-mode: vertical-rl;
          font-size: 7px;
          letter-spacing: 0.15em;
          color:
            rgba(16, 23, 34, 0.32);
        }

        .overview-side-label span:first-child {
          font-size: 9px;
          color:
            rgba(16, 23, 34, 0.6);
        }

        /* =========================================================
           PROOF
        ========================================================= */

        .about-proof {
          position: relative;
          padding: 58px 7vw 48px;
          background: #101722;
          color: #fff;
          overflow: hidden;
          isolation: isolate;
        }

        .proof-orbit-field {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: -1;
        }

        .proof-orbit {
          position: absolute;
          border:
            1px solid rgba(255, 255, 255, 0.09);
          border-radius: 50%;
        }

        .proof-orbit-large {
          width: 430px;
          height: 430px;
          right: -185px;
          top: -255px;
          animation:
            proofOrbitLarge
            12s ease-in-out infinite;
        }

        .proof-orbit-small {
          width: 245px;
          height: 245px;
          right: -92px;
          top: -155px;
          border-color:
            rgba(255, 255, 255, 0.15);
          animation:
            proofOrbitSmall
            8s ease-in-out infinite;
        }

        .proof-orbit-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background:
            rgba(255, 255, 255, 0.72);
          box-shadow:
            0 0 0 7px
              rgba(255, 255, 255, 0.04),
            0 0 20px
              rgba(255, 255, 255, 0.08);
        }

        .proof-orbit-dot-one {
          right: 19%;
          top: 28%;
          animation:
            proofDotOne
            5.5s ease-in-out infinite;
        }

        .proof-orbit-dot-two {
          left: 5%;
          bottom: 18%;
          width: 4px;
          height: 4px;
          opacity: 0.5;
          animation:
            proofDotTwo
            7s ease-in-out infinite;
        }

        .proof-topline {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 34px;
          font-size: 8px;
          letter-spacing: 0.19em;
          color:
            rgba(255, 255, 255, 0.38);
        }

        .proof-main {
          display: grid;
          grid-template-columns:
            minmax(0, 1.05fr)
            minmax(280px, 0.55fr);
          gap: 7vw;
          align-items: end;
          margin-bottom: 34px;
        }

        .proof-title-meta {
          margin: 0 0 15px;
          font-size: 8px;
          letter-spacing: 0.18em;
          color:
            rgba(255, 255, 255, 0.38);
        }

        .proof-intro {
          opacity: 0;
          transform: translateY(25px);
          transition:
            opacity 0.75s ease,
            transform 0.9s
              cubic-bezier(0.16, 1, 0.3, 1);
        }

        .proof-intro h2 {
          margin: 0;
          font-size:
            clamp(42px, 4.7vw, 68px);
          line-height: 0.94;
          letter-spacing: -0.055em;
          font-weight: 400;
        }

        .proof-intro h2 em {
          font-family:
            Georgia,
            "Times New Roman",
            serif;
          font-weight: 400;
        }

        .proof-intro-copy {
          position: relative;
          max-width: 390px;
          padding-left: 22px;
          opacity: 0;
          transform: translateY(28px);
          transition:
            opacity 0.75s 0.12s ease,
            transform 1s 0.12s
              cubic-bezier(0.16, 1, 0.3, 1);
        }

        .proof-copy-line {
          position: absolute;
          left: 0;
          top: 0;
          width: 1px;
          height: 100%;
          background:
            rgba(255, 255, 255, 0.16);
        }

        .proof-intro-copy p {
          margin: 0;
          font-size: 11px;
          line-height: 1.75;
          color:
            rgba(255, 255, 255, 0.52);
        }

        .proof-stats {
          display: grid;
          grid-template-columns:
            1.45fr
            0.72fr
            0.72fr;
          gap: 10px;
          min-height: 205px;
        }

        .proof-stat {
          position: relative;
          min-height: 205px;
          padding: 19px;
          background:
            rgba(255, 255, 255, 0.055);
          border:
            1px solid rgba(255, 255, 255, 0.11);
          overflow: hidden;
          transition:
            transform 0.5s
              cubic-bezier(0.16, 1, 0.3, 1),
            background 0.4s ease,
            border-color 0.4s ease;
        }

        .proof-stat:hover {
          transform: translateY(-5px);
          background:
            rgba(255, 255, 255, 0.085);
          border-color:
            rgba(255, 255, 255, 0.2);
        }

        .proof-stat-primary {
          background: #273a57;
          border-color:
            rgba(255, 255, 255, 0.08);
        }

        .proof-stat-primary:hover {
          background: #2d4261;
        }

        .proof-stat-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 7px;
          letter-spacing: 0.17em;
          color:
            rgba(255, 255, 255, 0.43);
        }

        .proof-stat-top span:last-child {
          color:
            rgba(255, 255, 255, 0.25);
        }

        .proof-stat-number {
          position: absolute;
          left: 19px;
          bottom: 23px;
          display: flex;
          align-items: flex-end;
          gap: 10px;
          z-index: 2;
        }

        .proof-stat-number strong {
          font-size:
            clamp(72px, 8vw, 112px);
          line-height: 0.75;
          letter-spacing: -0.08em;
          font-weight: 300;
          opacity: 0;
          transform: translateY(25px);
          transition:
            opacity 0.8s ease,
            transform 1s
              cubic-bezier(0.16, 1, 0.3, 1);
        }

        .proof-stat-number span {
          padding-bottom: 4px;
          font-size: 8px;
          letter-spacing: 0.18em;
          color:
            rgba(255, 255, 255, 0.46);
          opacity: 0;
          transform: translateY(12px);
          transition:
            opacity 0.7s 0.12s ease,
            transform 0.8s 0.12s
              cubic-bezier(0.16, 1, 0.3, 1);
        }

        .proof-stat-primary > p {
          position: absolute;
          right: 20px;
          bottom: 22px;
          width: 185px;
          margin: 0;
          font-size: 9px;
          line-height: 1.6;
          color:
            rgba(255, 255, 255, 0.48);
          opacity: 0;
          transform: translateY(12px);
          transition:
            opacity 0.7s 0.22s ease,
            transform 0.8s 0.22s
              cubic-bezier(0.16, 1, 0.3, 1);
        }

        .proof-small-number {
          display: block;
          margin-top: 55px;
          font-size:
            clamp(48px, 4.3vw, 68px);
          line-height: 0.85;
          letter-spacing: -0.07em;
          font-weight: 300;
          opacity: 0;
          transform: translateY(18px);
          transition:
            opacity 0.8s 0.1s ease,
            transform 0.9s 0.1s
              cubic-bezier(0.16, 1, 0.3, 1);
        }

        .proof-stat-label {
          position: absolute;
          left: 19px;
          bottom: 19px;
          font-size: 7px;
          line-height: 1.55;
          letter-spacing: 0.15em;
          color:
            rgba(255, 255, 255, 0.38);
          opacity: 0;
          transform: translateY(10px);
          transition:
            opacity 0.7s 0.2s ease,
            transform 0.8s 0.2s
              cubic-bezier(0.16, 1, 0.3, 1);
        }

        .proof-stat-orbit {
          position: absolute;
          width: 270px;
          height: 270px;
          right: -95px;
          bottom: -150px;
          border:
            1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          animation:
            proofStatOrbit
            9s ease-in-out infinite;
        }

        .proof-stat-orbit::before {
          content: "";
          position: absolute;
          inset: 28px;
          border:
            1px solid rgba(255, 255, 255, 0.07);
          border-radius: 50%;
        }

        .proof-stat-orbit span {
          position: absolute;
          width: 6px;
          height: 6px;
          right: 35px;
          top: 32px;
          border-radius: 50%;
          background:
            rgba(255, 255, 255, 0.7);
          box-shadow:
            0 0 0 7px
              rgba(255, 255, 255, 0.04);
        }

        .proof-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
          margin-top: 20px;
          opacity: 0;
          transform: translateY(14px);
          transition:
            opacity 0.7s 0.45s ease,
            transform 0.8s 0.45s
              cubic-bezier(0.16, 1, 0.3, 1);
        }

        .proof-bottom p {
          max-width: 520px;
          margin: 0;
          font-size: 10px;
          line-height: 1.7;
          color:
            rgba(255, 255, 255, 0.36);
        }

        .proof-link {
          color: #fff;
          flex-shrink: 0;
        }

        .about-proof.is-visible
          .proof-intro,
        .about-proof.is-visible
          .proof-intro-copy,
        .about-proof.is-visible
          .proof-bottom {
          opacity: 1;
          transform: translateY(0);
        }

        .about-proof.is-visible
          .proof-stat-number strong,
        .about-proof.is-visible
          .proof-stat-number span,
        .about-proof.is-visible
          .proof-stat-primary > p,
        .about-proof.is-visible
          .proof-small-number,
        .about-proof.is-visible
          .proof-stat-label {
          opacity: 1;
          transform: translateY(0);
        }

        .about-proof.is-visible
          .proof-stat:nth-child(1)
          .proof-stat-number
          strong {
          transition-delay: 0.08s;
        }

        .about-proof.is-visible
          .proof-stat:nth-child(2)
          .proof-small-number {
          transition-delay: 0.18s;
        }

        .about-proof.is-visible
          .proof-stat:nth-child(3)
          .proof-small-number {
          transition-delay: 0.28s;
        }

        /* =========================================================
           SECTION 4
           COMPACT CREATIVE CAPABILITY SECTION
        ========================================================= */

        .about-capabilities {
          position: relative;
          padding: 62px 7vw 50px;
          background: #f3f0e9;
          overflow: hidden;
          isolation: isolate;
        }

        .capability-background-grid {
          position: absolute;
          inset: 0;
          display: grid;
          grid-template-columns:
            repeat(6, 1fr);
          pointer-events: none;
          opacity: 0.42;
          z-index: -2;
        }

        .capability-background-grid span {
          border-left:
            1px solid rgba(16, 23, 34, 0.055);
        }

        .capability-background-grid span:last-child {
          border-right:
            1px solid rgba(16, 23, 34, 0.055);
        }

        .capability-orbit {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: -1;
        }

        .capability-orbit-one {
          width: 360px;
          height: 360px;
          right: -190px;
          top: -210px;
          border:
            1px solid rgba(39, 58, 87, 0.11);
          animation:
            capabilityOrbitOne
            13s ease-in-out infinite;
        }

        .capability-orbit-two {
          width: 210px;
          height: 210px;
          right: -110px;
          top: -135px;
          border:
            1px solid rgba(39, 58, 87, 0.14);
          animation:
            capabilityOrbitTwo
            9s ease-in-out infinite;
        }

        .capability-topline {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 15px;
          border-bottom:
            1px solid rgba(16, 23, 34, 0.12);
          font-size: 8px;
          letter-spacing: 0.18em;
          color:
            rgba(16, 23, 34, 0.42);
        }

        .capability-layout {
          display: grid;
          grid-template-columns:
            minmax(250px, 0.62fr)
            minmax(0, 1.38fr);
          gap: 5vw;
          align-items: center;
          padding-top: 34px;
        }

        .capability-intro {
          position: relative;
          max-width: 470px;
        }

        .capability-number {
          display: flex;
          align-items: center;
          gap: 11px;
          margin-bottom: 18px;
          overflow: hidden;
        }

        .capability-number span {
          font-size: 8px;
          letter-spacing: 0.18em;
          color:
            rgba(16, 23, 34, 0.48);
        }

        .capability-number i {
          display: block;
          width: 46px;
          height: 1px;
          background: #273a57;
          transform-origin: left center;
          transform: scaleX(0);
          transition:
            transform 0.9s 0.25s
              cubic-bezier(0.16, 1, 0.3, 1);
        }

        .about-capabilities.is-visible
          .capability-number i {
          transform: scaleX(1);
        }

        .capability-intro .eyebrow {
          margin-bottom: 17px;
        }

        .capability-intro h2 {
          margin: 0;
          font-size:
            clamp(43px, 4.9vw, 69px);
          line-height: 0.91;
          letter-spacing: -0.055em;
          font-weight: 400;
        }

        .capability-intro h2 em {
          font-family:
            Georgia,
            "Times New Roman",
            serif;
          font-weight: 400;
        }

        .capability-intro-copy {
          max-width: 360px;
          margin: 22px 0 0;
          padding-left: 16px;
          border-left:
            1px solid rgba(16, 23, 34, 0.15);
          font-size: 10px;
          line-height: 1.75;
          color:
            rgba(16, 23, 34, 0.52);
        }

        .capability-grid {
          display: grid;
          grid-template-columns:
            repeat(2, minmax(0, 1fr));
          gap: 8px;
        }

        .capability-card {
          position: relative;
          min-height: 165px;
          padding: 17px 18px 19px;
          background:
            rgba(255, 255, 255, 0.34);
          border:
            1px solid rgba(16, 23, 34, 0.11);
          overflow: hidden;
          opacity: 0;
          transform:
            translateY(25px)
            scale(0.98);
          transition:
            opacity 0.7s ease,
            transform 0.8s
              cubic-bezier(0.16, 1, 0.3, 1),
            background 0.35s ease,
            border-color 0.35s ease;
        }

        .about-capabilities.is-visible
          .capability-card {
          opacity: 1;
          transform:
            translateY(0)
            scale(1);
        }

        .about-capabilities.is-visible
          .capability-card:nth-child(1) {
          transition-delay: 0.08s;
        }

        .about-capabilities.is-visible
          .capability-card:nth-child(2) {
          transition-delay: 0.16s;
        }

        .about-capabilities.is-visible
          .capability-card:nth-child(3) {
          transition-delay: 0.24s;
        }

        .about-capabilities.is-visible
          .capability-card:nth-child(4) {
          transition-delay: 0.32s;
        }

        .capability-card:hover {
          background: #101722;
          border-color: #101722;
          color: #fff;
          transform:
            translateY(-5px)
            scale(1.01);
        }

        .capability-card-number {
          position: absolute;
          top: 13px;
          right: 15px;
          font-size: 7px;
          letter-spacing: 0.16em;
          color:
            rgba(16, 23, 34, 0.32);
          transition:
            color 0.35s ease;
        }

        .capability-card:hover
          .capability-card-number {
          color:
            rgba(255, 255, 255, 0.35);
        }

        .capability-icon {
          width: 33px;
          height: 33px;
          display: grid;
          place-items: center;
          border:
            1px solid rgba(16, 23, 34, 0.14);
          color: #273a57;
          transition:
            color 0.35s ease,
            border-color 0.35s ease,
            transform 0.35s ease;
        }

        .capability-card:hover
          .capability-icon {
          color: #fff;
          border-color:
            rgba(255, 255, 255, 0.2);
          transform: rotate(8deg);
        }

        .capability-card-content {
          position: absolute;
          left: 18px;
          right: 18px;
          bottom: 18px;
        }

        .capability-card-content h3 {
          margin: 0 0 7px;
          font-size: 14px;
          line-height: 1.1;
          font-weight: 400;
          letter-spacing: -0.02em;
        }

        .capability-card-content p {
          max-width: 285px;
          margin: 0;
          font-size: 8.5px;
          line-height: 1.55;
          color:
            rgba(16, 23, 34, 0.52);
          transition:
            color 0.35s ease;
        }

        .capability-card:hover
          .capability-card-content p {
          color:
            rgba(255, 255, 255, 0.52);
        }

        .capability-arrow {
          position: absolute;
          right: 16px;
          bottom: 17px;
          opacity: 0.3;
          transition:
            opacity 0.35s ease,
            transform 0.35s ease;
        }

        .capability-card:hover
          .capability-arrow {
          opacity: 1;
          transform:
            translate(3px, -3px);
        }

        .capability-card-line {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 2px;
          background: #273a57;
          transition:
            width 0.55s
              cubic-bezier(0.16, 1, 0.3, 1);
        }

        .capability-card:hover
          .capability-card-line {
          width: 100%;
          background: #fff;
        }

        .capability-bottom-line {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 14px;
          margin-top: 26px;
          font-size: 7px;
          letter-spacing: 0.17em;
          color:
            rgba(16, 23, 34, 0.34);
        }

        .capability-bottom-line span:first-child,
        .capability-bottom-line span:last-child {
          height: 1px;
          background:
            rgba(16, 23, 34, 0.11);
        }

        /* =========================================================
           PORTFOLIO
        ========================================================= */

        .about-portfolio {
          position: relative;
          padding: 105px 0 95px;
          background: #f3f0e9;
          overflow: hidden;
        }

        .portfolio-heading {
          display: grid;
          grid-template-columns:
            minmax(0, 1fr)
            minmax(280px, 0.5fr);
          gap: 7vw;
          align-items: end;
          padding: 0 7vw;
          margin-bottom: 58px;
        }

        .portfolio-heading .eyebrow {
          margin-bottom: 22px;
        }

        .portfolio-heading h2 {
          margin: 0;
          font-size:
            clamp(50px, 6vw, 82px);
          line-height: 0.91;
          letter-spacing: -0.055em;
          font-weight: 400;
        }

        .portfolio-heading h2 em {
          font-family:
            Georgia,
            "Times New Roman",
            serif;
        }

        .portfolio-heading > p {
          max-width: 400px;
          margin: 0;
          font-size: 12px;
          line-height: 1.75;
          color:
            rgba(16, 23, 34, 0.56);
        }

        .portfolio-marquee {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 15px 0 35px;
        }

        .portfolio-track {
          width: max-content;
          display: flex;
          align-items: stretch;
          gap: 18px;
          padding-left: 7vw;
          animation:
            portfolioMarquee
            34s linear infinite;
          will-change: transform;
        }

        .portfolio-flip-card {
          position: relative;
          flex: 0 0 235px;
          width: 235px;
          height: 300px;
          perspective: 1200px;
          outline: none;
          border-radius: 18px;
        }

        .portfolio-flip-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition:
            transform 0.72s
              cubic-bezier(0.76, 0, 0.24, 1);
          border-radius: 18px;
        }

        .portfolio-flip-card:hover {
          z-index: 20;
        }

        .portfolio-flip-card:hover
          .portfolio-flip-inner,
        .portfolio-flip-card:focus
          .portfolio-flip-inner {
          transform: rotateY(180deg);
        }

        .portfolio-card-front,
        .portfolio-card-back {
          position: absolute;
          inset: 0;
          overflow: hidden;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 18px;
        }

        .portfolio-card-front {
          background: #101722;
          color: #fff;
          transform: translateZ(0);
        }

        .portfolio-card-image {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-repeat: no-repeat;
          transform: scale(1.01);
          filter:
            saturate(1.12)
            contrast(1.05);
          transition:
            transform 0.8s ease;
        }

        .portfolio-flip-card:hover
          .portfolio-card-image,
        .portfolio-flip-card:focus
          .portfolio-card-image {
          transform: scale(1.06);
        }

        .portfolio-card-image-shade {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              180deg,
              rgba(7, 13, 22, 0.48) 0%,
              rgba(7, 13, 22, 0.05) 38%,
              rgba(7, 13, 22, 0.76) 100%
            );
        }

        .portfolio-colour-wash {
          position: absolute;
          inset: 0;
          opacity: 0.28;
          mix-blend-mode: multiply;
          pointer-events: none;
        }

        .portfolio-tone-blue
          .portfolio-colour-wash {
          background: #315b9b;
        }

        .portfolio-tone-amber
          .portfolio-colour-wash {
          background: #d19a36;
        }

        .portfolio-tone-violet
          .portfolio-colour-wash {
          background: #7256a8;
        }

        .portfolio-tone-cyan
          .portfolio-colour-wash {
          background: #38a5b7;
        }

        .portfolio-tone-green
          .portfolio-colour-wash {
          background: #4b8d69;
        }

        .portfolio-tone-pink
          .portfolio-colour-wash {
          background: #b75d78;
        }

        .portfolio-tone-orange
          .portfolio-colour-wash {
          background: #c96c38;
        }

        .portfolio-tone-lime
          .portfolio-colour-wash {
          background: #829b42;
        }

        .portfolio-front-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 16px;
          z-index: 2;
        }

        .portfolio-front-top,
        .portfolio-front-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
        }

        .portfolio-front-top span,
        .portfolio-front-bottom span {
          font-size: 7px;
          letter-spacing: 0.16em;
          font-weight: 600;
          text-shadow:
            0 1px 10px rgba(0, 0, 0, 0.2);
        }

        .portfolio-front-icon {
          opacity: 0.9;
        }

        .portfolio-front-bottom {
          justify-content: flex-start;
          gap: 9px;
        }

        .portfolio-front-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background:
            rgba(255, 255, 255, 0.8);
        }

        .portfolio-card-back {
          transform: rotateY(180deg);
          padding: 18px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: #101722;
          color: #fff;
        }

        .portfolio-tone-blue
          .portfolio-card-back {
          background: #315b9b;
        }

        .portfolio-tone-amber
          .portfolio-card-back {
          background: #c18a29;
        }

        .portfolio-tone-violet
          .portfolio-card-back {
          background: #7256a8;
        }

        .portfolio-tone-cyan
          .portfolio-card-back {
          background: #268b9e;
        }

        .portfolio-tone-green
          .portfolio-card-back {
          background: #397657;
        }

        .portfolio-tone-pink
          .portfolio-card-back {
          background: #a74d69;
        }

        .portfolio-tone-orange
          .portfolio-card-back {
          background: #b85a2d;
        }

        .portfolio-tone-lime
          .portfolio-card-back {
          background: #6f8734;
        }

        .portfolio-back-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding-bottom: 13px;
          border-bottom:
            1px solid rgba(255, 255, 255, 0.2);
        }

        .portfolio-back-top span {
          font-size: 6px;
          letter-spacing: 0.17em;
          color:
            rgba(255, 255, 255, 0.62);
        }

        .portfolio-back-content h3 {
          margin: 0 0 13px;
          max-width: 205px;
          font-size: 25px;
          line-height: 0.98;
          letter-spacing: -0.045em;
          font-weight: 400;
        }

        .portfolio-back-content p {
          max-width: 205px;
          margin: 0;
          font-size: 10px;
          line-height: 1.65;
          color:
            rgba(255, 255, 255, 0.72);
        }

        .portfolio-back-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 13px;
          border-top:
            1px solid rgba(255, 255, 255, 0.2);
        }

        .portfolio-back-bottom span {
          font-size: 7px;
          letter-spacing: 0.16em;
          color:
            rgba(255, 255, 255, 0.62);
        }

        .portfolio-footer {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 35px;
          padding: 25px 7vw 0;
        }

        .portfolio-footer p {
          max-width: 490px;
          margin: 0;
          font-size: 11px;
          line-height: 1.7;
          color:
            rgba(16, 23, 34, 0.48);
        }

        /* =========================================================
           KEYFRAMES
        ========================================================= */

        @keyframes heroImageScale {
          from {
            transform: scale(1.08);
          }

          to {
            transform: scale(1.03);
          }
        }

        @keyframes overviewOrbitFloat {
          0%,
          100% {
            transform:
              translate3d(0, 0, 0)
              rotate(0deg);
          }

          50% {
            transform:
              translate3d(-8px, 9px, 0)
              rotate(8deg);
          }
        }

        @keyframes proofOrbitLarge {
          0%,
          100% {
            transform:
              translate3d(0, 0, 0)
              rotate(0deg);
          }

          50% {
            transform:
              translate3d(-18px, 15px, 0)
              rotate(8deg);
          }
        }

        @keyframes proofOrbitSmall {
          0%,
          100% {
            transform:
              translate3d(0, 0, 0)
              rotate(0deg);
          }

          50% {
            transform:
              translate3d(13px, 10px, 0)
              rotate(-9deg);
          }
        }

        @keyframes proofStatOrbit {
          0%,
          100% {
            transform:
              translate3d(0, 0, 0)
              rotate(0deg);
          }

          50% {
            transform:
              translate3d(-10px, -7px, 0)
              rotate(7deg);
          }
        }

        @keyframes proofDotOne {
          0%,
          100% {
            transform:
              translate3d(0, 0, 0);
            opacity: 0.45;
          }

          50% {
            transform:
              translate3d(-11px, 14px, 0);
            opacity: 1;
          }
        }

        @keyframes proofDotTwo {
          0%,
          100% {
            transform:
              translate3d(0, 0, 0);
          }

          50% {
            transform:
              translate3d(13px, -8px, 0);
          }
        }

        @keyframes capabilityOrbitOne {
          0%,
          100% {
            transform:
              translate3d(0, 0, 0)
              rotate(0deg);
          }

          50% {
            transform:
              translate3d(-18px, 15px, 0)
              rotate(8deg);
          }
        }

        @keyframes capabilityOrbitTwo {
          0%,
          100% {
            transform:
              translate3d(0, 0, 0)
              rotate(0deg);
          }

          50% {
            transform:
              translate3d(13px, 10px, 0)
              rotate(-8deg);
          }
        }

        @keyframes portfolioMarquee {
          from {
            transform: translateX(0);
          }

          to {
            transform:
              translateX(calc(-50% - 9px));
          }
        }

        /* =========================================================
           TABLET
        ========================================================= */

        @media (max-width: 1100px) {

          .about-hero {
            min-height: 680px;
          }

          .proof-main {
            grid-template-columns:
              1fr
              0.65fr;
          }

          .proof-stats {
            grid-template-columns:
              1.2fr
              0.8fr
              0.8fr;
          }

          .capability-layout {
            grid-template-columns:
              minmax(220px, 0.55fr)
              minmax(0, 1.45fr);
            gap: 4vw;
          }

        }

        /* =========================================================
           MOBILE
        ========================================================= */

        @media (max-width: 760px) {

          .about-hero {
            min-height: 560px;
            height: 78vh;
          }

          .about-hero-grid {
            padding: 82px 22px 70px;
            grid-template-columns: 1fr;
          }

          .about-hero-copy h1 {
            font-size:
              clamp(52px, 15vw, 78px);
          }

          .about-hero-description {
            margin-top: 32px;
            max-width: 370px;
            font-size: 12px;
          }

          .about-hero-meta {
            display: none;
          }

          .about-hero-bottom {
            left: 22px;
            right: 22px;
          }

          .about-hero-bottom
            > span:first-child {
            display: none;
          }

          .about-hero-scroll {
            width: 100%;
            justify-content: flex-end;
          }

          /* OVERVIEW */

          .about-overview {
            padding: 50px 22px 60px;
          }

          .overview-topline {
            gap: 20px;
          }

          .overview-grid {
            grid-template-columns: 1fr;
            gap: 38px;
            margin-top: 40px;
          }

          .overview-copy-right {
            max-width: 100%;
            justify-self: stretch;
            padding-top: 0;
          }

          .overview-copy-right::before {
            display: none;
          }

          .overview-copy-orbit {
            right: 0;
            top: -25px;
            width: 58px;
            height: 58px;
          }

          .overview-title-wrap {
            gap: 10px;
          }

          .overview-title-line {
            flex: 0 0 24px;
            max-width: 24px;
          }

          .overview-title-line-left {
            margin-left: -22px;
          }

          .overview-title-line-right {
            margin-right: -22px;
          }

          .overview-copy h2 {
            font-size:
              clamp(45px, 13vw, 65px);
          }

          .overview-side-label {
            display: none;
          }

          /* PROOF */

          .about-proof {
            padding: 48px 22px 35px;
          }

          .proof-topline {
            margin-bottom: 27px;
            font-size: 7px;
          }

          .proof-main {
            grid-template-columns: 1fr;
            gap: 22px;
            margin-bottom: 28px;
          }

          .proof-intro h2 {
            font-size:
              clamp(42px, 12.5vw, 60px);
          }

          .proof-intro-copy {
            max-width: 360px;
            padding-left: 16px;
          }

          .proof-intro-copy p {
            font-size: 11px;
          }

          .proof-stats {
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }

          .proof-stat {
            min-height: 145px;
            padding: 15px;
          }

          .proof-stat-primary {
            grid-column: 1 / -1;
            min-height: 205px;
          }

          .proof-stat-number {
            left: 15px;
            bottom: 18px;
          }

          .proof-stat-number strong {
            font-size:
              clamp(68px, 21vw, 100px);
          }

          .proof-stat-primary > p {
            right: 15px;
            bottom: 18px;
            width: 135px;
            font-size: 8px;
          }

          .proof-small-number {
            margin-top: 42px;
            font-size: 48px;
          }

          .proof-stat-label {
            left: 15px;
            bottom: 15px;
            font-size: 6.5px;
          }

          .proof-stat-orbit {
            width: 220px;
            height: 220px;
            right: -100px;
            bottom: -125px;
          }

          .proof-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 18px;
            margin-top: 19px;
          }

          .proof-bottom p {
            font-size: 9px;
          }

          .proof-link {
            font-size: 9px;
          }

          /* =====================================================
             CAPABILITIES — MOBILE
          ===================================================== */

          .about-capabilities {
            padding: 48px 22px 40px;
          }

          .capability-background-grid {
            grid-template-columns:
              repeat(4, 1fr);
          }

          .capability-background-grid
            span:nth-child(n + 5) {
            display: none;
          }

          .capability-topline {
            gap: 15px;
            font-size: 6.5px;
          }

          .capability-topline-right {
            text-align: right;
          }

          .capability-layout {
            grid-template-columns: 1fr;
            gap: 30px;
            padding-top: 30px;
          }

          .capability-intro {
            max-width: 100%;
          }

          .capability-intro h2 {
            font-size:
              clamp(43px, 13vw, 65px);
          }

          .capability-intro-copy {
            max-width: 330px;
            margin-top: 19px;
            font-size: 9px;
          }

          .capability-grid {
            grid-template-columns: 1fr 1fr;
            gap: 7px;
          }

          .capability-card {
            min-height: 155px;
            padding: 14px;
          }

          .capability-card-content {
            left: 14px;
            right: 14px;
            bottom: 14px;
          }

          .capability-card-content h3 {
            font-size: 12px;
            margin-bottom: 6px;
          }

          .capability-card-content p {
            font-size: 7.5px;
            line-height: 1.5;
          }

          .capability-card-number {
            top: 11px;
            right: 12px;
          }

          .capability-icon {
            width: 29px;
            height: 29px;
          }

          .capability-arrow {
            right: 11px;
            bottom: 13px;
          }

          .capability-bottom-line {
            margin-top: 20px;
            font-size: 6px;
          }

          .capability-orbit-one {
            width: 250px;
            height: 250px;
            right: -145px;
            top: -160px;
          }

          .capability-orbit-two {
            width: 150px;
            height: 150px;
            right: -85px;
            top: -100px;
          }

          /* PORTFOLIO */

          .about-portfolio {
            padding: 75px 0 70px;
          }

          .portfolio-heading {
            grid-template-columns: 1fr;
            gap: 25px;
            padding: 0 22px;
            margin-bottom: 38px;
          }

          .portfolio-heading h2 {
            font-size:
              clamp(46px, 13vw, 68px);
          }

          .portfolio-marquee {
            padding: 10px 0 28px;
          }

          .portfolio-track {
            gap: 13px;
            padding-left: 22px;
            animation-duration: 28s;
          }

          .portfolio-flip-card {
            flex-basis: 205px;
            width: 205px;
            height: 275px;
            border-radius: 16px;
          }

          .portfolio-flip-inner,
          .portfolio-card-front,
          .portfolio-card-back {
            border-radius: 16px;
          }

          .portfolio-front-content {
            padding: 14px;
          }

          .portfolio-card-back {
            padding: 16px;
          }

          .portfolio-back-content h3 {
            font-size: 22px;
          }

          .portfolio-back-content p {
            font-size: 9px;
          }

          .portfolio-footer {
            flex-direction: column;
            align-items: flex-start;
            padding: 20px 22px 0;
            gap: 20px;
          }

        }

        /* =========================================================
           SMALL MOBILE
        ========================================================= */

        @media (max-width: 430px) {

          .about-hero {
            min-height: 520px;
          }

          .about-hero-copy h1 {
            font-size: 49px;
          }

          .about-hero-description {
            font-size: 11px;
            line-height: 1.65;
          }

          .about-proof {
            padding: 43px 22px 32px;
          }

          .proof-topline {
            font-size: 6.5px;
          }

          .proof-main {
            gap: 20px;
          }

          .proof-intro h2 {
            font-size: 40px;
          }

          .proof-stats {
            grid-template-columns: 1fr;
          }

          .proof-stat-primary {
            grid-column: auto;
            min-height: 195px;
          }

          .proof-stat {
            min-height: 125px;
          }

          .proof-small-number {
            margin-top: 34px;
          }

          .proof-orbit-large {
            width: 300px;
            height: 300px;
            right: -145px;
            top: -175px;
          }

          .proof-orbit-small {
            width: 170px;
            height: 170px;
            right: -78px;
            top: -105px;
          }

          /* CAPABILITIES */

          .about-capabilities {
            padding: 43px 22px 35px;
          }

          .capability-topline {
            font-size: 6px;
          }

          .capability-layout {
            gap: 27px;
            padding-top: 27px;
          }

          .capability-intro h2 {
            font-size: 40px;
          }

          .capability-grid {
            gap: 6px;
          }

          .capability-card {
            min-height: 145px;
            padding: 12px;
          }

          .capability-card-content {
            left: 12px;
            right: 12px;
            bottom: 12px;
          }

          .capability-card-content h3 {
            font-size: 11px;
          }

          .capability-card-content p {
            font-size: 7px;
          }

          .capability-card-number {
            top: 9px;
            right: 10px;
          }

          .capability-icon {
            width: 27px;
            height: 27px;
          }

          .capability-bottom-line {
            font-size: 5.5px;
          }

          /* PORTFOLIO */

          .portfolio-flip-card {
            flex-basis: 190px;
            width: 190px;
            height: 260px;
            border-radius: 15px;
          }

          .portfolio-flip-inner,
          .portfolio-card-front,
          .portfolio-card-back {
            border-radius: 15px;
          }

          .portfolio-track {
            animation-duration: 25s;
          }

          .portfolio-back-content h3 {
            font-size: 20px;
          }

          .portfolio-back-content p {
            font-size: 8.5px;
          }

        }

        /* =========================================================
           REDUCED MOTION
        ========================================================= */

        @media (prefers-reduced-motion: reduce) {

          .about-hero-image,
          .portfolio-track,
          .overview-copy-orbit,
          .proof-orbit,
          .proof-orbit-dot,
          .proof-stat-orbit,
          .capability-orbit-one,
          .capability-orbit-two {
            animation: none;
          }

          .overview-title-wrap,
          .overview-copy-right,
          .overview-accent,
          .overview-description,
          .overview-copy-right::before,
          .portfolio-flip-inner,
          .portfolio-card-image,
          .capability-card,
          .capability-arrow,
          .capability-icon,
          .capability-card-line,
          .capability-number i,
          .text-link,
          .about-proof .proof-intro,
          .about-proof .proof-intro-copy,
          .about-proof .proof-bottom,
          .proof-stat-number strong,
          .proof-stat-number span,
          .proof-stat-primary > p,
          .proof-small-number,
          .proof-stat-label {
            transition: none;
          }

          .overview-title-wrap,
          .overview-copy-right,
          .overview-description,
          .about-proof .proof-intro,
          .about-proof .proof-intro-copy,
          .about-proof .proof-bottom,
          .proof-stat-number strong,
          .proof-stat-number span,
          .proof-stat-primary > p,
          .proof-small-number,
          .proof-stat-label,
          .capability-card {
            opacity: 1;
            transform: none;
          }

          .overview-accent,
          .capability-number i {
            transform: none;
          }

        }

      `}</style>

    </main>
  );
}