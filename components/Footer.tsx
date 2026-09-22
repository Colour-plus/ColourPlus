"use client";

import Link from "next/link";
import {
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="cp-footer">

      {/* TOP WHITE PROJECT BAR */}
      <div className="cp-footer-project-bar">

        <div className="cp-footer-project-left">
          COLOURPLUS / PROJECT BRIEF
        </div>

        <div className="cp-footer-project-line" />

        <div className="cp-footer-project-right">
          SURFACE / PERFORMANCE / ENVIRONMENT
        </div>

      </div>


      {/* MAIN FOOTER */}
      <div className="cp-footer-main">

        <div className="cp-footer-container">

          {/* BRAND */}
          <div className="cp-footer-brand">

            <div className="cp-footer-logo">
              COLOURPLUS
            </div>

            <p className="cp-footer-description">
              Engineered surfaces for industrial environments,
              architectural spaces and demanding applications.
            </p>

            <div className="cp-footer-socials">

              <a
                href="https://www.linkedin.com/company/colourplus-polyurethane-pvt-ltd/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin size={17} strokeWidth={1.6} />
              </a>

              <a
                href="https://www.instagram.com/colourplus_in/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram size={17} strokeWidth={1.6} />
              </a>

              <a
                href="https://www.facebook.com/share/19r9nRxyGM/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook size={17} strokeWidth={1.6} />
              </a>

              <a
                href="https://youtube.com/@colourplus_in"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <Youtube size={17} strokeWidth={1.6} />
              </a>

            </div>

          </div>


          {/* SOLUTIONS */}
          <div className="cp-footer-column">

            <h4>Solutions</h4>

            <Link href="/solutions">
              Industrial Flooring
            </Link>

            <Link href="/solutions">
              Waterproofing
            </Link>

            <Link href="/solutions">
              Protective Coatings
            </Link>

          </div>


          {/* MORE INFO */}
          <div className="cp-footer-column">

            <h4>More info</h4>

            <Link href="/about">
              About Colourplus
            </Link>

            <Link href="/industries">
              Industries
            </Link>

            <Link href="/projects">
              Projects
            </Link>

            

            <Link href="/privacy-policy">
              Privacy Policy
            </Link>

          </div>


          {/* CONTACT */}
          <div className="cp-footer-contact">

            <h4>Contact</h4>

            {/* PHONE */}
            <a
              href="tel:08362970822"
              className="cp-footer-contact-link"
            >
              PH. No. 0836-2970822
            </a>

            {/* MOBILE */}
            <a
              href="tel:+919482359752"
              className="cp-footer-contact-link"
            >
              Mobile: +91 9482359752
            </a>

            {/* MOBILE */}
            <a
              href="tel:+918050035873"
              className="cp-footer-contact-link"
            >
              Mobile: +91 8050035873
            </a>

            {/* EMAIL */}
            <a
              href="mailto:info@colourplus.in"
              className="cp-footer-contact-link"
            >
              info@colourplus.in
            </a>


            <div className="cp-footer-contact-line" />


            <div className="cp-footer-address">

              <span>
                HEAD OFFICE
              </span>

              <p>
                B-20, KSSIDC Gamanagatti Industrial Area,
                <br />
                Tarihal Gamanagatti Road,
                <br />
                Hubli - 580025, Karnataka
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          FOOTER STYLES
          ===================================================== */}

      <style jsx>{`

        /* =====================================================
           ROOT
           ===================================================== */

        .cp-footer {
          width: 100%;
          margin: 0;
          padding: 0;

          background: #03111f;
          color: #ffffff;

          overflow: hidden;

          box-sizing: border-box;

          /*
           * Attractive geometric font stack.
           * No external font loading.
           */
          font-family:
            "Century Gothic",
            "Trebuchet MS",
            "Segoe UI",
            Arial,
            sans-serif;
        }


        /* =====================================================
           TOP WHITE BAR
           ===================================================== */

        .cp-footer-project-bar {
          width: 100%;
          height: 72px;

          background: #ffffff;

          display: flex;
          align-items: center;

          padding: 0 5.5vw;

          box-sizing: border-box;

          gap: 24px;
        }


        .cp-footer-project-left,
        .cp-footer-project-right {
          flex-shrink: 0;

          font-family: inherit;

          font-size: 7px;
          line-height: 1;

          font-weight: 700;

          letter-spacing: 1.8px;

          color: #7c8998;

          white-space: nowrap;
        }


        .cp-footer-project-line {
          flex: 1;

          height: 1px;

          background: #dfe3e7;
        }


        .cp-footer-project-right {
          text-align: right;
        }


        /* =====================================================
           MAIN FOOTER
           ===================================================== */

        .cp-footer-main {
          width: 100%;

          background: #03111f;
        }


        .cp-footer-container {
          width: 100%;

          min-height: 375px;

          padding: 62px 5.5vw 58px;

          box-sizing: border-box;

          display: grid;

          grid-template-columns:
            1.35fr
            0.95fr
            1.05fr
            1.25fr;

          column-gap: 4.5vw;

          align-items: start;
        }


        /* =====================================================
           BRAND
           ===================================================== */

        .cp-footer-brand {
          min-width: 0;

          padding-right: 20px;
        }


        .cp-footer-logo {
          margin: 0 0 30px;

          font-family: inherit;

          font-size: 31px;
          line-height: 1;

          font-weight: 800;

          letter-spacing: -2.4px;

          color: #ffffff;
        }


        .cp-footer-description {
          max-width: 290px;

          margin: 0;

          font-family: inherit;

          font-size: 12px;
          line-height: 1.75;

          font-weight: 400;

          letter-spacing: 0.05px;

          color: #8293a6;
        }


        /* =====================================================
           SOCIALS
           ===================================================== */

        .cp-footer-socials {
          display: flex;
          flex-direction: row;

          align-items: center;

          gap: 10px;

          margin-top: 30px;
        }


        .cp-footer-socials a {
          width: 48px;
          height: 48px;

          min-width: 48px;
          min-height: 48px;

          flex: 0 0 48px;

          display: flex;

          align-items: center;
          justify-content: center;

          box-sizing: border-box;

          border: 1px solid rgba(255, 255, 255, 0.20);

          border-radius: 50%;

          color: #aab6c3;

          text-decoration: none;

          transition:
            border-color 0.25s ease,
            color 0.25s ease,
            transform 0.25s ease;
        }


        .cp-footer-socials a:hover {
          color: #ffffff;

          border-color: rgba(255, 255, 255, 0.55);

          transform: translateY(-2px);
        }


        /* =====================================================
           COLUMNS
           ===================================================== */

        .cp-footer-column {
          min-width: 0;

          display: flex;
          flex-direction: column;

          align-items: flex-start;
        }


        .cp-footer-column h4,
        .cp-footer-contact h4 {
          margin: 0 0 27px;

          font-family: inherit;

          font-size: 12px;
          line-height: 1;

          font-weight: 700;

          letter-spacing: 0.2px;

          color: #ffffff;
        }


        .cp-footer-column a {
          display: block;

          width: fit-content;

          margin: 0;

          font-family: inherit;

          font-size: 17px;
          line-height: 1.58;

          font-weight: 500;

          letter-spacing: -0.35px;

          color: #ffffff;

          text-decoration: none;

          transition:
            opacity 0.2s ease,
            transform 0.2s ease;
        }


        .cp-footer-column a:hover {
          opacity: 0.65;

          transform: translateX(3px);
        }


        /* =====================================================
           CONTACT
           ===================================================== */

        .cp-footer-contact {
          min-width: 0;

          min-height: 260px;

          padding-left: 32px;

          border-left: 1px solid rgba(255, 255, 255, 0.13);

          box-sizing: border-box;
        }


        .cp-footer-contact-link {
          display: block;

          width: fit-content;

          margin: 0 0 14px;

          font-family: inherit;

          font-size: 15px;
          line-height: 1.5;

          font-weight: 500;

          letter-spacing: -0.15px;

          color: #ffffff;

          text-decoration: none;

          transition: opacity 0.2s ease;
        }


        .cp-footer-contact-link:hover {
          opacity: 0.65;
        }


        /* =====================================================
           CONTACT DIVIDER
           ===================================================== */

        .cp-footer-contact-line {
          width: 100%;

          height: 1px;

          margin: 35px 0 22px;

          background: rgba(255, 255, 255, 0.13);
        }


        /* =====================================================
           ADDRESS
           ===================================================== */

        .cp-footer-address span {
          display: block;

          margin-bottom: 12px;

          font-family: inherit;

          font-size: 8px;
          line-height: 1;

          font-weight: 700;

          letter-spacing: 1.7px;

          color: #728397;
        }


        .cp-footer-address p {
          margin: 0;

          font-family: inherit;

          font-size: 11px;
          line-height: 1.75;

          font-weight: 400;

          letter-spacing: 0.05px;

          color: #9baaba;
        }


        /* =====================================================
           TABLET
           ===================================================== */

        @media (max-width: 1100px) {

          .cp-footer-container {
            grid-template-columns:
              1.2fr
              1fr
              1fr;

            row-gap: 50px;
          }


          .cp-footer-contact {
            grid-column: 3;
          }

        }


        /* =====================================================
           MOBILE
           ===================================================== */

        @media (max-width: 760px) {

          .cp-footer-project-bar {
            height: 58px;

            padding: 0 20px;

            gap: 12px;
          }


          .cp-footer-project-left {
            font-size: 6px;

            letter-spacing: 1.2px;
          }


          .cp-footer-project-right {
            display: none;
          }


          .cp-footer-container {
            display: flex;

            flex-direction: column;

            min-height: auto;

            padding: 45px 20px 45px;

            gap: 40px;
          }


          .cp-footer-brand {
            padding-right: 0;
          }


          .cp-footer-logo {
            font-size: 28px;

            margin-bottom: 23px;

            letter-spacing: -2.1px;
          }


          .cp-footer-description {
            max-width: 300px;

            font-size: 11px;
          }


          .cp-footer-socials {
            margin-top: 24px;

            gap: 8px;
          }


          .cp-footer-socials a {
            width: 42px;
            height: 42px;

            min-width: 42px;
            min-height: 42px;

            flex-basis: 42px;
          }


          .cp-footer-column h4,
          .cp-footer-contact h4 {
            margin-bottom: 20px;
          }


          .cp-footer-column a {
            font-size: 16px;
          }


          .cp-footer-contact {
            min-height: auto;

            padding-left: 0;

            padding-top: 32px;

            border-left: none;

            border-top: 1px solid rgba(255, 255, 255, 0.13);
          }


          .cp-footer-contact-line {
            margin: 28px 0 21px;
          }

        }


        /* =====================================================
           SMALL PHONES
           ===================================================== */

        @media (max-width: 430px) {

          .cp-footer-logo {
            font-size: 26px;
          }


          .cp-footer-project-left {
            font-size: 5.5px;
          }


          .cp-footer-contact-link {
            font-size: 14px;
          }


          .cp-footer-column a {
            font-size: 15px;
          }

        }

      `}</style>

    </footer>
  );
}