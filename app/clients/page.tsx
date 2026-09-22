"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import Navbar from "@/components/Navbar";

type Client = {
  id: number;
  name: string;
  logo: string | null;
  sector: string | null;
  isActive: boolean;
  sortOrder: number;
};

function ClientLogo({ src }: { src: string }) {
  return (
    <div className="client-logo-card">
      <img
        src={src}
        alt="Colourplus client"
        loading="lazy"
        onError={(event) => {
          event.currentTarget.parentElement?.classList.add(
            "client-logo-missing"
          );
        }}
      />
    </div>
  );
}

export default function ClientsPage() {
  const pageRef = useRef<HTMLElement | null>(null);

  const [clients, setClients] = useState<Client[]>([]);
  const [loadingClients, setLoadingClients] = useState(true);
  const [apiError, setApiError] = useState("");

  const [activeFilter, setActiveFilter] = useState<
    "all" | "pharma" | "automotive"
  >("all");

  useEffect(() => {
    let cancelled = false;

    async function loadClients() {
      try {
        setLoadingClients(true);
        setApiError("");

        const response = await fetch("/api/clients", {
          method: "GET",
          cache: "no-store",
        });

        const data = await response.json().catch(() => null);

        if (!response.ok || !data?.success) {
          throw new Error(
            data?.message || "Failed to load clients."
          );
        }

        if (!cancelled) {
          setClients(
            Array.isArray(data.clients)
              ? data.clients
              : []
          );
        }
      } catch (error) {
        console.error("CLIENTS LOAD ERROR:", error);

        if (!cancelled) {
          setClients([]);

          setApiError(
            error instanceof Error
              ? error.message
              : "Could not load clients."
          );
        }
      } finally {
        if (!cancelled) {
          setLoadingClients(false);
        }
      }
    }

    loadClients();

    return () => {
      cancelled = true;
    };
  }, []);

  const sortedClients = useMemo(() => {
    return [...clients].sort(
      (a, b) =>
        (a.sortOrder ?? 0) - (b.sortOrder ?? 0) ||
        a.id - b.id
    );
  }, [clients]);

  const filteredLogos = useMemo(() => {
    if (activeFilter === "pharma") {
      return sortedClients.filter((client) => {
        const sector =
          client.sector?.toLowerCase() ?? "";

        return (
          sector.includes("pharma") ||
          sector.includes("food")
        );
      });
    }

    if (activeFilter === "automotive") {
      return sortedClients.filter((client) => {
        const sector =
          client.sector?.toLowerCase() ?? "";

        return sector.includes("automotive");
      });
    }

    return sortedClients;
  }, [activeFilter, sortedClients]);

  const heroLogos = useMemo(() => {
    return sortedClients
      .filter((client) => client.logo)
      .slice(0, 36);
  }, [sortedClients]);

  return (
    <>
      <Navbar />

      <main
        ref={pageRef}
        className="clients-page"
      >
        {/* ======================================================
            SECTION 1 — HERO
        ====================================================== */}

        <section className="clients-hero">
          <div className="clients-hero-grid" />

          <div className="hero-orbit hero-orbit-one" />
          <div className="hero-orbit hero-orbit-two" />

          <div className="hero-particle hero-particle-one" />
          <div className="hero-particle hero-particle-two" />
          <div className="hero-particle hero-particle-three" />

          <div className="container clients-hero-inner">
            <div className="clients-topline">
              <span>
                COLOURPLUS / CLIENTS
              </span>

              <span>
                INDUSTRIES / TRUST / EXPERIENCE
              </span>
            </div>

            <div className="clients-hero-content">
              <div className="clients-hero-copy">
                <p className="eyebrow">
                  01 / CLIENT EXPERIENCE
                </p>

                <h1>
                  Trusted by
                  <br />
                  <em>
                    real industries.
                  </em>
                </h1>

                <p className="clients-hero-description">
                  Colourplus surface systems have
                  been applied across demanding
                  industrial and commercial
                  environments, supporting
                  businesses where surface
                  performance matters.
                </p>

                <a
                  href="#our-clients"
                  className="hero-cta"
                >
                  <span>
                    EXPLORE OUR CLIENTS
                  </span>

                  <ArrowDown size={15} />
                </a>
              </div>

              <div className="clients-hero-visual">
                <div className="hero-logo-window">
                  <div className="hero-logo-track">
                    {heroLogos.map(
                      (client, index) => (
                        <div
                          className="hero-logo-item"
                          key={`${client.id}-${index}`}
                        >
                          {client.logo && (
                            <img
                              src={client.logo}
                              alt=""
                              loading={
                                index < 12
                                  ? "eager"
                                  : "lazy"
                              }
                              onError={(event) => {
                                event.currentTarget.style.visibility =
                                  "hidden";
                              }}
                            />
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="hero-visual-label">
                  <span>
                    CLIENT NETWORK
                  </span>

                  <strong>
                    INDUSTRIES
                  </strong>
                </div>
              </div>
            </div>

            <div className="clients-hero-footer">
              <span>
                NATIONWIDE EXPERIENCE
              </span>

              <span>
                INDUSTRIAL / COMMERCIAL /
                TECHNICAL
              </span>
            </div>
          </div>
        </section>

        {/* ======================================================
            SECTION 2 — OUR CLIENTS
        ====================================================== */}

        <section
          className="our-clients-section"
          id="our-clients"
        >
          <div className="container">
            <div className="clients-section-heading">
              <div>
                <p className="eyebrow light">
                  02 / OUR CLIENTS
                </p>

                <h2>
                  Names behind
                  <br />
                  the{" "}
                  <em>
                    experience.
                  </em>
                </h2>
              </div>

              <div className="clients-heading-side">
                <p>
                  A selection of client
                  identities displayed from
                  the Colourplus client
                  network.
                </p>

                <div className="source-note">
                  <span />
                  SOURCE CLIENT LOGOS
                </div>
              </div>
            </div>

            {/* ==================================================
                FILTER BAR
            ================================================== */}

            <div className="client-filter-bar">
              <div className="client-filter-label">
                <span className="filter-dot" />
                FILTER CLIENTS
              </div>

              <div className="client-filters">
                <button
                  type="button"
                  className={
                    activeFilter === "all"
                      ? "client-filter active"
                      : "client-filter"
                  }
                  onClick={() =>
                    setActiveFilter("all")
                  }
                >
                  <span>01</span>
                  ALL CLIENTS
                </button>

                <button
                  type="button"
                  className={
                    activeFilter ===
                    "automotive"
                      ? "client-filter active"
                      : "client-filter"
                  }
                  onClick={() =>
                    setActiveFilter(
                      "automotive"
                    )
                  }
                >
                  <span>02</span>
                  AUTOMOTIVE
                </button>

                <button
                  type="button"
                  className={
                    activeFilter === "pharma"
                      ? "client-filter active"
                      : "client-filter"
                  }
                  onClick={() =>
                    setActiveFilter("pharma")
                  }
                >
                  <span>03</span>
                  PHARMA & FOOD
                </button>
              </div>
            </div>

            {/* ==================================================
                ACTIVE FILTER
            ================================================== */}

            <div className="active-filter-info">
              <div>
                <span>
                  CURRENT VIEW
                </span>

                <strong>
                  {activeFilter === "all"
                    ? "ALL CLIENTS"
                    : activeFilter ===
                      "automotive"
                    ? "AUTOMOTIVE"
                    : "PHARMA & FOOD"}
                </strong>
              </div>

              <div className="active-filter-line" />
            </div>

            {/* ==================================================
                CLIENT LOGO GRID
            ================================================== */}

            <div
              className={`client-logo-grid ${
                activeFilter !== "all"
                  ? "filtered-grid"
                  : ""
              }`}
            >
              {loadingClients ? (
                <>
                  {Array.from({
                    length: 15,
                  }).map((_, index) => (
                    <div
                      key={`loading-${index}`}
                      className="client-logo-wrapper loading-card"
                    >
                      <div className="client-logo-card">
                        <div className="logo-loading-pulse" />
                      </div>
                    </div>
                  ))}
                </>
              ) : filteredLogos.length > 0 ? (
                filteredLogos.map(
                  (client, index) => (
                    <div
                      key={`${activeFilter}-${client.id}`}
                      className="client-logo-wrapper"
                      style={{
                        animationDelay: `${
                          (index % 10) * 65
                        }ms`,
                      }}
                    >
                      {client.logo && (
                        <ClientLogo
                          src={client.logo}
                        />
                      )}
                    </div>
                  )
                )
              ) : apiError ? (
                <div className="clients-empty-state api-error-state">
                  <span>
                    {apiError}
                  </span>
                </div>
              ) : (
                <div className="clients-empty-state">
                  <span>
                    NO CLIENT LOGOS AVAILABLE
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ======================================================
            FOOTER
        ====================================================== */}

        <footer className="clients-footer">
          <div className="container footer-inner">
            <span>
              COLOURPLUS POLYURETHANES
              PVT. LTD.
            </span>

            <span>
              CLIENTS / INDUSTRIES /
              EXPERIENCE
            </span>

            <Link href="/">
              BACK TO HOME
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </footer>

        <style jsx global>{`
          /* ====================================================
             BASE
          ==================================================== */

          .clients-page {
            --cp-navy: #091422;
            --cp-deep: #050d17;
            --cp-blue: #6caee8;
            --cp-paper: #f2f0eb;
            --cp-ink: #101722;
            --cp-muted: #69727e;
            --cp-line: rgba(16, 23, 34, 0.12);

            background: var(--cp-paper);
            color: var(--cp-ink);
            overflow: hidden;
          }

          .clients-page * {
            box-sizing: border-box;
          }

          .clients-page .container {
            width: min(
              1180px,
              calc(100% - 12vw)
            );

            margin: 0 auto;
          }

          .eyebrow {
            margin: 0;

            font-size: 9px;
            line-height: 1.3;
            font-weight: 700;
            letter-spacing: 0.2em;
            text-transform: uppercase;

            color: rgba(16, 23, 34, 0.48);
          }

          .eyebrow.light {
            color: rgba(255, 255, 255, 0.45);
          }

          /* ====================================================
             HERO
          ==================================================== */

          .clients-hero {
            min-height: calc(100vh - 80px);

            position: relative;
            overflow: hidden;

            background: var(--cp-navy);
            color: white;
          }

          .clients-hero-grid {
            position: absolute;
            inset: 0;

            opacity: 0.45;

            background-image:
              linear-gradient(
                rgba(255, 255, 255, 0.035) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(255, 255, 255, 0.035) 1px,
                transparent 1px
              );

            background-size: 70px 70px;

            animation:
              heroGridMove
              18s
              linear
              infinite;
          }

          .clients-hero-inner {
            min-height: calc(100vh - 80px);

            position: relative;
            z-index: 2;

            display: flex;
            flex-direction: column;

            padding: 30px 0 24px;
          }

          .clients-topline,
          .clients-hero-footer {
            display: flex;
            justify-content: space-between;

            gap: 25px;

            font-size: 8px;
            letter-spacing: 0.18em;
            text-transform: uppercase;

            color: rgba(255, 255, 255, 0.38);
          }

          .clients-hero-content {
            flex: 1;

            display: grid;
            grid-template-columns: 1fr 1fr;

            gap: 7vw;

            align-items: center;

            padding: 55px 0;
          }

          .clients-hero-copy {
            max-width: 650px;

            animation:
              heroCopyReveal
              1.1s
              cubic-bezier(0.16, 1, 0.3, 1)
              both;
          }

          .clients-hero-copy .eyebrow {
            color: rgba(255, 255, 255, 0.48);

            margin-bottom: 25px;
          }

          .clients-hero-copy h1 {
            margin: 0;

            font-size: clamp(
              74px,
              7.4vw,
              125px
            );

            line-height: 0.84;

            letter-spacing: -0.075em;

            font-weight: 600;

            animation:
              heroTextFloat
              7s
              ease-in-out
              infinite;
          }

          .clients-hero-copy h1 em {
            font-style: normal;

            color: rgba(255, 255, 255, 0.38);
          }

          .clients-hero-description {
            max-width: 500px;

            margin: 35px 0 28px;

            font-size: 14px;
            line-height: 1.75;

            color: rgba(255, 255, 255, 0.59);

            animation:
              descriptionReveal
              1.2s
              0.25s
              cubic-bezier(0.16, 1, 0.3, 1)
              both;
          }

          .hero-cta {
            display: inline-flex;
            align-items: center;

            gap: 10px;

            padding-bottom: 10px;

            color: white;

            border-bottom:
              1px solid
              rgba(255, 255, 255, 0.3);

            font-size: 9px;
            font-weight: 700;
            letter-spacing: 0.12em;

            transition:
              gap 0.35s ease,
              border-color 0.35s ease;
          }

          .hero-cta:hover {
            gap: 16px;
            border-color: white;
          }

          /* ====================================================
             HERO LOGO WALL
          ==================================================== */

          .clients-hero-visual {
            position: relative;

            height: 510px;

            display: flex;
            align-items: center;
            justify-content: center;

            animation:
              visualEntrance
              1.3s
              0.15s
              cubic-bezier(0.16, 1, 0.3, 1)
              both;
          }

          .hero-logo-window {
            width: min(
              580px,
              100%
            );

            height: 440px;

            position: relative;

            overflow: hidden;

            border:
              1px solid
              rgba(255, 255, 255, 0.12);

            background:
              rgba(255, 255, 255, 0.025);

            box-shadow:
              0 30px 100px
              rgba(0, 0, 0, 0.18);

            transform:
              perspective(1200px)
              rotateY(-3deg);

            transition:
              transform 0.8s
              cubic-bezier(0.16, 1, 0.3, 1);
          }

          .hero-logo-window:hover {
            transform:
              perspective(1200px)
              rotateY(0deg)
              translateY(-5px);
          }

          .hero-logo-window::before {
            content: "";

            position: absolute;
            z-index: 3;

            inset: 0;

            pointer-events: none;

            background:
              linear-gradient(
                to bottom,
                var(--cp-navy) 0%,
                transparent 13%,
                transparent 87%,
                var(--cp-navy) 100%
              );
          }

          .hero-logo-window::after {
            content: "";

            position: absolute;
            z-index: 4;

            left: 0;
            right: 0;

            height: 1px;

            background:
              linear-gradient(
                90deg,
                transparent,
                rgba(108, 174, 232, 0.75),
                transparent
              );

            animation:
              logoScan
              5s
              ease-in-out
              infinite;
          }

          .hero-logo-track {
            display: grid;

            grid-template-columns:
              repeat(3, 1fr);

            gap: 14px;

            padding: 28px;

            animation:
              logoWallFloat
              12s
              ease-in-out
              infinite;
          }

          .hero-logo-item {
            height: 105px;

            display: flex;
            align-items: center;
            justify-content: center;

            background:
              rgba(255, 255, 255, 0.96);

            border:
              1px solid
              rgba(255, 255, 255, 0.1);

            border-radius: 2px;

            overflow: hidden;

            animation:
              logoItemFloat
              5s
              ease-in-out
              infinite;

            transition:
              transform 0.5s
              cubic-bezier(0.16, 1, 0.3, 1);
          }

          .hero-logo-item:nth-child(2n) {
            animation-delay: -1.2s;
          }

          .hero-logo-item:nth-child(3n) {
            animation-delay: -2.3s;
          }

          .hero-logo-item:nth-child(4n) {
            animation-delay: -3.1s;
          }

          .hero-logo-item:hover {
            transform:
              translateY(-6px)
              scale(1.025);

            z-index: 4;
          }

          .hero-logo-item img {
            width: 82%;
            height: 82%;

            object-fit: contain;
          }

          .hero-visual-label {
            position: absolute;

            right: -15px;
            bottom: 40px;

            z-index: 5;

            display: flex;
            flex-direction: column;

            gap: 5px;

            padding: 12px 15px;

            background:
              rgba(5, 13, 23, 0.88);

            border:
              1px solid
              rgba(255, 255, 255, 0.13);

            backdrop-filter: blur(12px);

            animation:
              labelFloat
              4s
              ease-in-out
              infinite;
          }

          .hero-visual-label span {
            font-size: 7px;
            letter-spacing: 0.18em;

            color:
              rgba(255, 255, 255, 0.35);
          }

          .hero-visual-label strong {
            font-size: 10px;
            letter-spacing: 0.12em;

            color: var(--cp-blue);
          }

          /* ====================================================
             ORBITS
          ==================================================== */

          .hero-orbit {
            position: absolute;

            border:
              1px solid
              rgba(255, 255, 255, 0.05);

            border-radius: 50%;

            pointer-events: none;

            animation:
              orbitSpin
              30s
              linear
              infinite;
          }

          .hero-orbit-one {
            width: 900px;
            height: 900px;

            right: -430px;
            top: -350px;
          }

          .hero-orbit-two {
            width: 520px;
            height: 520px;

            left: -300px;
            bottom: -300px;

            animation-direction: reverse;
            animation-duration: 23s;
          }

          /* ====================================================
             PARTICLES
          ==================================================== */

          .hero-particle {
            position: absolute;

            width: 6px;
            height: 6px;

            border-radius: 50%;

            background: var(--cp-blue);

            box-shadow:
              0 0 20px
              rgba(108, 174, 232, 0.6);

            animation:
              particleFloat
              4s
              ease-in-out
              infinite;
          }

          .hero-particle-one {
            right: 15%;
            top: 22%;
          }

          .hero-particle-two {
            right: 43%;
            bottom: 16%;

            animation-delay: -1.7s;
          }

          .hero-particle-three {
            left: 26%;
            top: 17%;

            animation-delay: -3s;
          }

          /* ====================================================
             OUR CLIENTS
          ==================================================== */

          .our-clients-section {
            padding: 145px 0;

            background: var(--cp-navy);

            color: white;

            position: relative;
            overflow: hidden;
          }

          .our-clients-section::before {
            content: "";

            position: absolute;

            width: 850px;
            height: 850px;

            right: -520px;
            top: -390px;

            border:
              1px solid
              rgba(108, 174, 232, 0.08);

            border-radius: 50%;

            animation:
              orbitSpin
              28s
              linear
              infinite;
          }

          .our-clients-section::after {
            content: "";

            position: absolute;

            width: 420px;
            height: 420px;

            left: -270px;
            bottom: -250px;

            border:
              1px solid
              rgba(255, 255, 255, 0.045);

            border-radius: 50%;

            animation:
              orbitSpinReverse
              21s
              linear
              infinite;
          }

          .clients-section-heading {
            position: relative;
            z-index: 2;

            display: grid;

            grid-template-columns:
              1fr
              0.48fr;

            gap: 8vw;

            align-items: end;
          }

          .clients-section-heading h2 {
            margin: 20px 0 0;

            color: white;

            font-size: clamp(
              52px,
              5.2vw,
              82px
            );

            line-height: 0.89;

            letter-spacing: -0.065em;

            font-weight: 500;
          }

          .clients-section-heading h2 em {
            font-style: normal;

            color:
              rgba(255, 255, 255, 0.38);
          }

          .clients-heading-side {
            max-width: 400px;
          }

          .clients-heading-side p {
            margin: 0;

            color:
              rgba(255, 255, 255, 0.5);

            font-size: 12px;
            line-height: 1.8;
          }

          .source-note {
            margin-top: 25px;

            display: flex;
            align-items: center;

            gap: 9px;

            font-size: 7px;
            letter-spacing: 0.17em;

            color:
              rgba(255, 255, 255, 0.3);
          }

          .source-note span {
            width: 5px;
            height: 5px;

            border-radius: 50%;

            background: var(--cp-blue);

            box-shadow:
              0 0 15px
              rgba(108, 174, 232, 0.6);

            animation:
              sourcePulse
              2.5s
              ease-in-out
              infinite;
          }

          /* ====================================================
             FILTER BAR
          ==================================================== */

          .client-filter-bar {
            position: relative;
            z-index: 4;

            margin-top: 65px;

            padding: 18px 0;

            display: flex;
            align-items: center;
            justify-content: space-between;

            gap: 30px;

            border-top:
              1px solid
              rgba(255, 255, 255, 0.1);

            border-bottom:
              1px solid
              rgba(255, 255, 255, 0.1);

            animation:
              filterBarReveal
              0.9s
              0.15s
              cubic-bezier(0.16, 1, 0.3, 1)
              both;
          }

          .client-filter-label {
            display: flex;
            align-items: center;

            gap: 9px;

            flex-shrink: 0;

            font-size: 7px;
            font-weight: 700;
            letter-spacing: 0.17em;

            color:
              rgba(255, 255, 255, 0.32);
          }

          .filter-dot {
            width: 5px;
            height: 5px;

            border-radius: 50%;

            background: var(--cp-blue);

            box-shadow:
              0 0 14px
              rgba(108, 174, 232, 0.7);

            animation:
              filterDotPulse
              2s
              ease-in-out
              infinite;
          }

          .client-filters {
            display: flex;
            align-items: center;

            gap: 8px;

            flex-wrap: wrap;

            justify-content: flex-end;
          }

          .client-filter {
            position: relative;

            display: inline-flex;
            align-items: center;

            gap: 10px;

            padding: 12px 17px;

            border:
              1px solid
              rgba(255, 255, 255, 0.12);

            background:
              rgba(255, 255, 255, 0.025);

            color:
              rgba(255, 255, 255, 0.43);

            font-family: inherit;

            font-size: 8px;
            font-weight: 700;
            letter-spacing: 0.12em;

            cursor: pointer;

            transition:
              color 0.35s ease,
              background 0.35s ease,
              border-color 0.35s ease,
              transform 0.35s
              cubic-bezier(0.16, 1, 0.3, 1);
          }

          .client-filter span {
            font-size: 7px;

            color:
              rgba(255, 255, 255, 0.25);

            transition:
              color 0.35s ease;
          }

          .client-filter:hover {
            color: white;

            border-color:
              rgba(108, 174, 232, 0.35);

            transform: translateY(-3px);
          }

          .client-filter.active {
            background:
              rgba(108, 174, 232, 0.12);

            border-color:
              rgba(108, 174, 232, 0.5);

            color: white;

            box-shadow:
              0 10px 35px
              rgba(0, 0, 0, 0.12);
          }

          .client-filter.active span {
            color: var(--cp-blue);
          }

          /* ====================================================
             ACTIVE FILTER
          ==================================================== */

          .active-filter-info {
            position: relative;
            z-index: 2;

            margin-top: 25px;

            display: flex;
            align-items: center;

            gap: 20px;

            animation:
              activeFilterReveal
              0.7s
              ease
              both;
          }

          .active-filter-info div:first-child {
            display: flex;
            align-items: center;

            gap: 10px;
          }

          .active-filter-info span {
            font-size: 7px;
            letter-spacing: 0.15em;

            color:
              rgba(255, 255, 255, 0.25);
          }

          .active-filter-info strong {
            font-size: 8px;
            letter-spacing: 0.12em;

            color: var(--cp-blue);
          }

          .active-filter-line {
            height: 1px;

            flex: 1;

            background:
              linear-gradient(
                90deg,
                rgba(108, 174, 232, 0.45),
                transparent
              );
          }

          /* ====================================================
             CLIENT LOGO GRID
          ==================================================== */

          .client-logo-grid {
            position: relative;
            z-index: 3;

            margin-top: 38px;

            display: grid;

            grid-template-columns:
              repeat(5, 1fr);

            gap: 1px;

            background:
              rgba(255, 255, 255, 0.09);

            border:
              1px solid
              rgba(255, 255, 255, 0.09);
          }

          .client-logo-grid.filtered-grid {
            animation:
              filteredGridReveal
              0.65s
              cubic-bezier(0.16, 1, 0.3, 1)
              both;
          }

          .client-logo-wrapper {
            animation:
              clientCardReveal
              0.8s
              cubic-bezier(0.16, 1, 0.3, 1)
              both;
          }

          /* ====================================================
             CLIENT LOGO
             WHITE BOX REMOVED
          ==================================================== */

          .client-logo-card {
            aspect-ratio: 1 / 1;

            min-height: 0;

            display: flex;
            align-items: center;
            justify-content: center;

            padding: 10px;

            background: transparent;

            overflow: hidden;

            transition:
              transform 0.55s
              cubic-bezier(0.16, 1, 0.3, 1),
              background 0.3s ease,
              box-shadow 0.4s ease;
          }

          .client-logo-card:hover {
            transform:
              translateY(-7px)
              scale(1.015);

            background:
              rgba(255, 255, 255, 0.035);

            box-shadow:
              0 20px 50px
              rgba(0, 0, 0, 0.16);

            z-index: 2;
          }

          .client-logo-card img {
            width: 72%;
            height: 72%;

            object-fit: contain;

            mix-blend-mode: normal;

            transition:
              transform 0.55s
              cubic-bezier(0.16, 1, 0.3, 1);
          }

          .client-logo-card:hover img {
            transform: scale(1.055);
          }

          .client-logo-missing {
            display: none;
          }

          /* ====================================================
             LOADING
          ==================================================== */

          .loading-card {
            animation: none !important;
          }

          .logo-loading-pulse {
            width: 55%;
            height: 42px;

            background:
              linear-gradient(
                90deg,
                rgba(255, 255, 255, 0.03),
                rgba(255, 255, 255, 0.1),
                rgba(255, 255, 255, 0.03)
              );

            background-size: 200% 100%;

            animation:
              logoLoading
              1.6s
              ease-in-out
              infinite;
          }

          .clients-empty-state {
            grid-column: 1 / -1;

            min-height: 250px;

            display: flex;
            align-items: center;
            justify-content: center;

            background:
              rgba(255, 255, 255, 0.025);

            color:
              rgba(255, 255, 255, 0.4);

            font-size: 8px;
            letter-spacing: 0.16em;
          }

          .api-error-state {
            color:
              rgba(255, 120, 120, 0.7);
          }

          /* ====================================================
             FOOTER
          ==================================================== */

          .clients-footer {
            padding: 25px 0;

            background: #040b13;

            color:
              rgba(255, 255, 255, 0.4);
          }

          .footer-inner {
            display: flex;
            align-items: center;
            justify-content: space-between;

            gap: 20px;

            font-size: 8px;
            letter-spacing: 0.14em;
          }

          .footer-inner a {
            display: inline-flex;
            align-items: center;

            gap: 7px;

            color:
              rgba(255, 255, 255, 0.52);

            transition:
              color 0.3s ease,
              transform 0.3s ease;
          }

          .footer-inner a:hover {
            color: white;

            transform: translateX(4px);
          }

          /* ====================================================
             ANIMATIONS
          ==================================================== */

          @keyframes heroGridMove {
            0% {
              transform:
                translate3d(0, 0, 0);
            }

            50% {
              transform:
                translate3d(35px, 25px, 0);
            }

            100% {
              transform:
                translate3d(0, 0, 0);
            }
          }

          @keyframes heroCopyReveal {
            from {
              opacity: 0;

              transform:
                translateX(-45px);
            }

            to {
              opacity: 1;

              transform:
                translateX(0);
            }
          }

          @keyframes descriptionReveal {
            from {
              opacity: 0;

              transform:
                translateY(25px);
            }

            to {
              opacity: 1;

              transform:
                translateY(0);
            }
          }

          @keyframes visualEntrance {
            from {
              opacity: 0;

              transform:
                translateX(45px)
                scale(0.94);
            }

            to {
              opacity: 1;

              transform:
                translateX(0)
                scale(1);
            }
          }

          @keyframes heroTextFloat {
            0%,
            100% {
              transform:
                translateY(0);
            }

            50% {
              transform:
                translateY(-7px);
            }
          }

          @keyframes logoWallFloat {
            0%,
            100% {
              transform:
                translateY(0);
            }

            50% {
              transform:
                translateY(-28px);
            }
          }

          @keyframes logoItemFloat {
            0%,
            100% {
              transform:
                translateY(0);
            }

            50% {
              transform:
                translateY(-5px);
            }
          }

          @keyframes logoScan {
            0% {
              top: -2px;
              opacity: 0;
            }

            15% {
              opacity: 0.8;
            }

            50% {
              opacity: 0.35;
            }

            85% {
              opacity: 0.8;
            }

            100% {
              top: 100%;
              opacity: 0;
            }
          }

          @keyframes labelFloat {
            0%,
            100% {
              transform:
                translateY(0);
            }

            50% {
              transform:
                translateY(-8px);
            }
          }

          @keyframes orbitSpin {
            from {
              transform:
                rotate(0deg);
            }

            to {
              transform:
                rotate(360deg);
            }
          }

          @keyframes orbitSpinReverse {
            from {
              transform:
                rotate(360deg);
            }

            to {
              transform:
                rotate(0deg);
            }
          }

          @keyframes particleFloat {
            0%,
            100% {
              transform:
                translateY(0)
                scale(1);
            }

            50% {
              transform:
                translateY(-14px)
                scale(1.2);
            }
          }

          @keyframes sourcePulse {
            0%,
            100% {
              opacity: 0.35;

              transform:
                scale(0.8);
            }

            50% {
              opacity: 1;

              transform:
                scale(1.3);
            }
          }

          @keyframes filterBarReveal {
            from {
              opacity: 0;

              transform:
                translateY(20px);
            }

            to {
              opacity: 1;

              transform:
                translateY(0);
            }
          }

          @keyframes activeFilterReveal {
            from {
              opacity: 0;

              transform:
                translateX(-15px);
            }

            to {
              opacity: 1;

              transform:
                translateX(0);
            }
          }

          @keyframes filteredGridReveal {
            from {
              opacity: 0.35;

              transform:
                translateY(12px)
                scale(0.995);
            }

            to {
              opacity: 1;

              transform:
                translateY(0)
                scale(1);
            }
          }

          @keyframes clientCardReveal {
            from {
              opacity: 0;

              transform:
                translateY(25px)
                scale(0.97);
            }

            to {
              opacity: 1;

              transform:
                translateY(0)
                scale(1);
            }
          }

          @keyframes filterDotPulse {
            0%,
            100% {
              transform:
                scale(0.75);

              opacity: 0.45;
            }

            50% {
              transform:
                scale(1.3);

              opacity: 1;
            }
          }

          @keyframes logoLoading {
            0% {
              background-position:
                200% 0;
            }

            100% {
              background-position:
                -200% 0;
            }
          }

          /* ====================================================
             TABLET
          ==================================================== */

          @media (max-width: 1100px) {
            .clients-hero-content {
              gap: 4vw;
            }

            .clients-hero-copy h1 {
              font-size: clamp(
                65px,
                8vw,
                100px
              );
            }

            .clients-hero-visual {
              height: 440px;
            }

            .hero-logo-window {
              height: 390px;
            }

            .client-logo-grid {
              grid-template-columns:
                repeat(4, 1fr);
            }
          }

          /* ====================================================
             TABLET / SMALL LAPTOP
          ==================================================== */

          @media (max-width: 820px) {
            .clients-page .container {
              width: min(
                calc(100% - 40px),
                680px
              );
            }

            .clients-hero {
              min-height: auto;
            }

            .clients-hero-inner {
              min-height: auto;

              padding: 28px 0 22px;
            }

            .clients-hero-content {
              grid-template-columns: 1fr;

              padding: 70px 0 55px;
            }

            .clients-hero-visual {
              height: 410px;
            }

            .hero-logo-window {
              width: min(
                560px,
                100%
              );

              height: 380px;
            }

            .clients-section-heading {
              grid-template-columns: 1fr;

              gap: 45px;
            }

            .our-clients-section {
              padding: 105px 0;
            }

            .client-filter-bar {
              align-items: flex-start;

              flex-direction: column;

              gap: 20px;
            }

            .client-filters {
              justify-content: flex-start;
            }

            .client-logo-grid {
              grid-template-columns:
                repeat(3, 1fr);
            }
          }

          /* ====================================================
             MOBILE
          ==================================================== */

          @media (max-width: 560px) {
            .clients-page .container {
              width:
                calc(100% - 30px);
            }

            .clients-topline span:last-child,
            .clients-hero-footer span:last-child {
              display: none;
            }

            .clients-hero-copy h1 {
              font-size: 61px;
            }

            .clients-hero-description {
              font-size: 13px;
            }

            .clients-hero-visual {
              height: 330px;
            }

            .hero-logo-window {
              height: 320px;
            }

            .hero-logo-track {
              grid-template-columns:
                repeat(2, 1fr);

              padding: 18px;

              gap: 9px;
            }

            .hero-logo-item {
              height: 100px;
            }

            .hero-visual-label {
              right: -3px;
              bottom: 15px;
            }

            .our-clients-section {
              padding: 85px 0;
            }

            .clients-section-heading h2 {
              font-size: 50px;
            }

            .client-filter-bar {
              margin-top: 50px;
            }

            .client-filters {
              width: 100%;

              display: grid;

              grid-template-columns: 1fr;

              gap: 7px;
            }

            .client-filter {
              width: 100%;

              justify-content:
                space-between;

              padding: 13px 15px;
            }

            .active-filter-info {
              margin-top: 22px;
            }

            .client-logo-grid {
              grid-template-columns:
                repeat(2, 1fr);
            }

            .client-logo-card {
              aspect-ratio: 1 / 1;

              min-height: 0;

              padding: 8px;

              background: transparent;
            }

            .client-logo-card img {
              width: 68%;
              height: 68%;
            }

            .footer-inner {
              flex-direction: column;

              align-items: flex-start;

              line-height: 1.6;
            }
          }

          /* ====================================================
             REDUCED MOTION
          ==================================================== */

          @media (prefers-reduced-motion: reduce) {
            .clients-page *,
            .clients-page *::before,
            .clients-page *::after {
              animation-duration:
                0.01ms !important;

              animation-iteration-count:
                1 !important;

              transition-duration:
                0.01ms !important;
            }
          }
        `}</style>
      </main>
    </>
  );
}