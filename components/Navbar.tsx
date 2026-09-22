"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";

const primary = [
  ["01", "Home", "/"],
  ["02", "About Colourplus", "/about"],
  ["03", "Solutions", "/solutions"],
  ["04", "Industries", "/industries"],
  ["05", "Products", "/products"],
  ["06", "Clients", "/clients"],
  ["07", "Colour Chart", "/colour-chart"],
  ["08", "Downloads", "/downloads"],
  ["09", "Contact", "/contact"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* =====================================================
          MAIN NAVBAR
      ===================================================== */}

      <header
        className={`prototype-nav ${
          scrolled ? "is-scrolled" : ""
        }`}
      >
        <div className="prototype-nav-inner">

          {/* =================================================
              LEFT MENU
          ================================================= */}

          <button
            className="menu-trigger"
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
            aria-expanded={open}
          >
            <span className="menu-icon">
              <Menu
                size={24}
                strokeWidth={1.6}
              />
            </span>

            <span className="menu-label">
              MENU
            </span>
          </button>

          {/* =================================================
              CENTER BRAND — ACTUAL COLOURPLUS LOGO
          ================================================= */}

          <Link
            href="/"
            className="center-brand"
            onClick={() => setOpen(false)}
            aria-label="Colourplus Home"
          >
            <img
              src="/images/colourplus-logo.png"
              alt="Colourplus"
              className="colourplus-logo"
            />
          </Link>

          {/* =================================================
              RIGHT CTA
          ================================================= */}

          <Link
            href="/contact"
            className="nav-contact"
            onClick={() => setOpen(false)}
          >
            <span>
              Get a Solution
            </span>

            <ArrowUpRight
              size={17}
              strokeWidth={1.8}
            />
          </Link>

        </div>
      </header>

      {/* =====================================================
          BACKDROP
      ===================================================== */}

      <div
        className={`nav-backdrop ${
          open ? "is-open" : ""
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* =====================================================
          SIDE MENU
      ===================================================== */}

      <aside
        className={`nav-overlay ${
          open ? "nav-overlay-open" : ""
        }`}
        aria-hidden={!open}
      >

        {/* =================================================
            MENU HEADER
        ================================================= */}

        <div className="nav-overlay-top">

          <div className="overlay-heading">

            <span className="overlay-kicker">
              COLOURPLUS
            </span>

            <span className="overlay-title">
              Navigation
            </span>

          </div>

          <button
            className="close-trigger"
            onClick={() => setOpen(false)}
            aria-label="Close navigation"
          >
            <span>
              CLOSE
            </span>

            <X
              size={23}
              strokeWidth={1.6}
            />
          </button>

        </div>

        {/* =================================================
            MENU CONTENT
        ================================================= */}

        <div className="nav-menu-content">

          {/* =================================================
              PRIMARY NAVIGATION
          ================================================= */}

          <div className="nav-menu-primary">

            {primary.map(
              ([no, label, href]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="nav-menu-item"
                >

                  <span className="nav-menu-number">
                    {no}
                  </span>

                  <strong>
                    {label}
                  </strong>

                  <ArrowUpRight
                    className="nav-menu-arrow"
                    size={18}
                    strokeWidth={1.6}
                  />

                </Link>
              )
            )}

          </div>

          {/* =================================================
              MENU FOOTER
          ================================================= */}

          <div className="nav-menu-footer">

            <span>
              COLOURPLUS POLYURETHANES PVT. LTD.
            </span>

            <span>
              ENGINEERED SURFACES / INDIA
            </span>

          </div>

        </div>
      </aside>

      {/* =====================================================
          LOGO STYLING
      ===================================================== */}

      <style jsx>{`

        /* ==================================================
           DESKTOP LOGO
        ================================================== */

        .colourplus-logo {
          display: block;

          width: 400px;
          height: auto;
          max-height: 98px;

          object-fit: contain;
          object-position: center;

          /*
            Enlarges the actual visible artwork
            without changing the navbar layout.
          */

          transform: scale(1.5);
          transform-origin: center center;

          position: relative;
          z-index: 5;
        }

        .center-brand {
          display: flex;
          align-items: center;
          justify-content: center;

          text-decoration: none;
          line-height: 0;

          position: relative;
          z-index: 5;
        }

        /* ==================================================
           SMALL LAPTOP
        ================================================== */

        @media (max-width: 1100px) {

          .colourplus-logo {
            width: 330px;
            max-height: 86px;
            transform: scale(1.4);
          }

        }

        /* ==================================================
           TABLET
        ================================================== */

        @media (max-width: 900px) {

          .colourplus-logo {
            width: 270px;
            max-height: 72px;
            transform: scale(1.3);
          }

        }

        /* ==================================================
           MOBILE
        ================================================== */

        @media (max-width: 600px) {

          .colourplus-logo {
            width: 220px;
            max-height: 60px;
            transform: scale(1.2);
          }

        }

      `}</style>
    </>
  );
}