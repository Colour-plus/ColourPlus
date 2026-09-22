"use client";

import { FormEvent, useState } from "react";
import {
  ArrowUpRight,
  Download,
  FileText,
  Loader2,
  X,
} from "lucide-react";

export default function DownloadsPage() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function openModal() {
    setError("");
    setShowModal(true);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/brochure-leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          mobile,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(
          data.message || "Unable to continue. Please try again."
        );
        return;
      }

      setShowModal(false);

      setName("");
      setMobile("");

      window.location.href = data.downloadUrl;
    } catch (error) {
      console.error(error);

      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="downloads-page">

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="downloads-hero">

        <div className="hero-grid" />

        {/* Floating background elements */}

        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />

        <div className="hero-particle particle-one" />
        <div className="hero-particle particle-two" />
        <div className="hero-particle particle-three" />
        <div className="hero-particle particle-four" />
        <div className="hero-particle particle-five" />

        <div className="downloads-hero-content">

          {/* =====================================================
              HERO COPY
          ===================================================== */}

          <div className="hero-copy">

            <div className="eyebrow">
              <span>07</span>
              DOWNLOADS
            </div>

            <h1>
              ENGINEERED
              <br />
              SURFACES.
            </h1>

            <p>
              Explore the Colourplus industrial flooring
              solutions brochure and discover our engineered
              surface systems for real environments.
            </p>

            <button
              className="hero-download-button"
              onClick={openModal}
            >
              <span>Download brochure</span>

              <ArrowUpRight
                size={19}
                strokeWidth={1.5}
              />
            </button>

          </div>


          {/* =====================================================
              FLOATING BROCHURE HERO OBJECT
          ===================================================== */}

          <div className="hero-brochure-stage">

            <div className="hero-brochure-glow" />

            <div className="hero-brochure-shadow" />

            <div className="hero-brochure">

              <div className="hero-brochure-top">

                <span>COLOURPLUS</span>

                <span>01</span>

              </div>


              <div className="hero-brochure-content">

                <div className="hero-brochure-kicker">
                  INDUSTRIAL FLOORING
                  <br />
                  SOLUTIONS
                </div>

                <h2>
                  ENGINEERING
                  <br />
                  SURFACE
                  <br />
                  EXCELLENCE
                </h2>

                <div className="hero-brochure-line" />

                <div className="hero-brochure-company">
                  COLOURPLUS
                  <br />
                  POLYURETHANES
                  <br />
                  PVT. LTD.
                </div>

              </div>


              <div className="hero-brochure-bottom">
                INDUSTRIAL · TECHNICAL · ENGINEERED
              </div>

            </div>


            {/* ===================================================
                FLOATING DOCUMENT CARD
                2025 CARD REMOVED
            =================================================== */}

            <div className="floating-document document-one">

              <FileText
                size={18}
                strokeWidth={1.4}
              />

              <div>

                <span>FORMAT</span>

                <strong>PDF</strong>

              </div>

            </div>


            {/* ===================================================
                PAGE COUNT
            =================================================== */}

            <div className="floating-page-number">
              24

              <span>PAGES</span>
            </div>

          </div>

        </div>


        {/* =========================================================
            HERO SIDE LABEL
        ========================================================= */}

        <div className="hero-side">

          <span>COLOURPLUS</span>

          <span>
            POLYURETHANES PVT. LTD.
          </span>

        </div>


        {/* =========================================================
            SCROLL INDICATOR
        ========================================================= */}

        <div className="hero-scroll-indicator">

          <span>
            SCROLL TO EXPLORE
          </span>

          <div />

        </div>

      </section>


      {/* =========================================================
          MODAL
          SECOND SECTION REMOVED COMPLETELY
      ========================================================= */}

      {showModal && (

        <div
          className="download-modal-overlay"
          onMouseDown={(event) => {

            if (
              event.target === event.currentTarget &&
              !loading
            ) {
              setShowModal(false);
            }

          }}
        >

          <div className="download-modal">

            <button
              className="modal-close"
              onClick={() => {

                if (!loading) {
                  setShowModal(false);
                }

              }}
              aria-label="Close"
            >

              <X
                size={20}
                strokeWidth={1.5}
              />

            </button>


            <div className="modal-eyebrow">
              BROCHURE ACCESS
            </div>


            <h2>
              Before you
              <br />
              continue.
            </h2>


            <p>
              Enter your details to access the
              Colourplus industrial flooring brochure.
            </p>


            <form
              onSubmit={handleSubmit}
              className="download-form"
            >

              {/* FULL NAME */}

              <label>

                <span>
                  FULL NAME
                </span>

                <input
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="Your full name"
                  autoComplete="name"
                  required
                  disabled={loading}
                />

              </label>


              {/* MOBILE */}

              <label>

                <span>
                  MOBILE NUMBER
                </span>

                <input
                  type="tel"
                  value={mobile}
                  onChange={(event) =>
                    setMobile(event.target.value)
                  }
                  placeholder="Your mobile number"
                  autoComplete="tel"
                  inputMode="tel"
                  required
                  disabled={loading}
                />

              </label>


              {/* ERROR */}

              {error && (
                <div className="form-error">
                  {error}
                </div>
              )}


              {/* SUBMIT */}

              <button
                type="submit"
                className="modal-submit"
                disabled={loading}
              >

                {loading ? (
                  <>

                    <Loader2
                      size={18}
                      className="spinner"
                    />

                    <span>
                      Preparing brochure...
                    </span>

                  </>
                ) : (
                  <>

                    <Download
                      size={18}
                      strokeWidth={1.5}
                    />

                    <span>
                      Continue & download
                    </span>

                    <ArrowUpRight
                      size={18}
                      strokeWidth={1.5}
                    />

                  </>
                )}

              </button>

            </form>


            <div className="modal-note">
              Your details are recorded only to
              understand brochure interest.
            </div>

          </div>

        </div>

      )}


      {/* =========================================================
          STYLES
      ========================================================= */}

      <style jsx>{`

        /* =========================================================
           BASE
        ========================================================= */

        .downloads-page {
          min-height: 100vh;

          background: #f4f1eb;

          color: #17283b;

          overflow: hidden;
        }


        /* =========================================================
           HERO
        ========================================================= */

        .downloads-hero {
          min-height: 760px;

          position: relative;

          display: flex;

          align-items: center;

          background:
            radial-gradient(
              circle at 78% 35%,
              rgba(73,112,148,.48),
              transparent 30%
            ),
            linear-gradient(
              120deg,
              #071b30 0%,
              #0d2d4b 52%,
              #17466a 100%
            );

          color: #fff;

          overflow: hidden;

          isolation: isolate;
        }


        /* =========================================================
           GRID
        ========================================================= */

        .hero-grid {
          position: absolute;

          inset: 0;

          opacity: .12;

          background-image:
            linear-gradient(
              rgba(255,255,255,.25) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,.25) 1px,
              transparent 1px
            );

          background-size: 90px 90px;

          mask-image:
            linear-gradient(
              to right,
              black,
              transparent 90%
            );

          animation:
            gridFloat 18s linear infinite;
        }


        @keyframes gridFloat {

          from {
            transform:
              translate3d(0,0,0);
          }

          to {
            transform:
              translate3d(90px,90px,0);
          }

        }


        /* =========================================================
           HERO ORBS
        ========================================================= */

        .hero-orb {
          position: absolute;

          border-radius: 50%;

          pointer-events: none;

          filter: blur(1px);
        }


        .hero-orb-one {
          width: 420px;

          height: 420px;

          right: 5%;

          top: 8%;

          background:
            radial-gradient(
              circle,
              rgba(118,168,204,.20),
              rgba(118,168,204,0)
            );

          animation:
            orbFloatOne 9s ease-in-out infinite;
        }


        .hero-orb-two {
          width: 260px;

          height: 260px;

          right: 34%;

          bottom: -80px;

          background:
            radial-gradient(
              circle,
              rgba(255,255,255,.09),
              transparent 70%
            );

          animation:
            orbFloatTwo 11s ease-in-out infinite;
        }


        @keyframes orbFloatOne {

          0%,
          100% {
            transform:
              translate3d(0,0,0)
              scale(1);
          }

          50% {
            transform:
              translate3d(-25px,-35px,0)
              scale(1.06);
          }

        }


        @keyframes orbFloatTwo {

          0%,
          100% {
            transform:
              translate3d(0,0,0);
          }

          50% {
            transform:
              translate3d(35px,-28px,0);
          }

        }


        /* =========================================================
           PARTICLES
        ========================================================= */

        .hero-particle {
          position: absolute;

          width: 5px;

          height: 5px;

          border-radius: 50%;

          background:
            rgba(255,255,255,.48);

          pointer-events: none;

          animation:
            particleFloat 6s ease-in-out infinite;
        }


        .particle-one {
          right: 37%;
          top: 20%;
        }


        .particle-two {
          right: 12%;
          top: 25%;

          animation-delay: -1.5s;
        }


        .particle-three {
          right: 45%;
          bottom: 20%;

          animation-delay: -3s;
        }


        .particle-four {
          right: 17%;
          bottom: 28%;

          animation-delay: -4s;
        }


        .particle-five {
          right: 52%;
          top: 68%;

          animation-delay: -2s;
        }


        @keyframes particleFloat {

          0%,
          100% {
            transform:
              translate3d(0,0,0);

            opacity: .3;
          }

          50% {
            transform:
              translate3d(15px,-30px,0);

            opacity: .9;
          }

        }


        /* =========================================================
           HERO CONTENT
        ========================================================= */

        .downloads-hero-content {
          width:
            min(
              1180px,
              calc(100% - 80px)
            );

          margin: 0 auto;

          position: relative;

          z-index: 5;

          padding-top: 50px;

          display: grid;

          grid-template-columns:
            1fr 1fr;

          align-items: center;

          gap: 50px;
        }


        .hero-copy {
          position: relative;

          z-index: 4;
        }


        .eyebrow {
          display: flex;

          gap: 20px;

          align-items: center;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 10px;

          letter-spacing: .22em;

          font-weight: 700;

          margin-bottom: 40px;

          animation:
            heroReveal .9s ease both;
        }


        .eyebrow span {
          opacity: .5;
        }


        /* =========================================================
           HERO TITLE
        ========================================================= */

        .downloads-hero h1 {
          margin: 0;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size:
            clamp(
              68px,
              8.5vw,
              132px
            );

          line-height: .84;

          letter-spacing: -.07em;

          font-weight: 600;

          animation:
            heroReveal 1s .1s ease both;
        }


        .downloads-hero p {
          max-width: 490px;

          margin:
            42px 0 34px;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 15px;

          line-height: 1.75;

          color:
            rgba(255,255,255,.72);

          animation:
            heroReveal 1s .2s ease both;
        }


        @keyframes heroReveal {

          from {
            opacity: 0;

            transform:
              translate3d(0,35px,0);
          }

          to {
            opacity: 1;

            transform:
              translate3d(0,0,0);
          }

        }


        /* =========================================================
           BUTTONS
        ========================================================= */

        .hero-download-button,
        .modal-submit {
          border: 0;

          cursor: pointer;

          display: inline-flex;

          align-items: center;

          gap: 18px;

          transition:
            transform .35s ease,
            background .35s ease,
            box-shadow .35s ease;
        }


        .hero-download-button {
          padding:
            17px 22px;

          background: #fff;

          color: #0b243d;

          font-size: 12px;

          letter-spacing: .08em;

          text-transform: uppercase;

          animation:
            heroReveal 1s .3s ease both;
        }


        .hero-download-button:hover {
          transform:
            translateY(-5px);

          box-shadow:
            0 18px 40px
            rgba(0,0,0,.20);
        }


        /* =========================================================
           HERO BROCHURE STAGE
        ========================================================= */

        .hero-brochure-stage {
          position: relative;

          min-height: 570px;

          display: flex;

          align-items: center;

          justify-content: center;

          perspective: 1400px;

          animation:
            stageReveal 1.2s .15s ease both;
        }


        @keyframes stageReveal {

          from {
            opacity: 0;

            transform:
              translate3d(80px,0,0);
          }

          to {
            opacity: 1;

            transform:
              translate3d(0,0,0);
          }

        }


        /* =========================================================
           BROCHURE GLOW
        ========================================================= */

        .hero-brochure-glow {
          position: absolute;

          width: 500px;

          height: 500px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(108,160,198,.28),
              transparent 68%
            );

          filter: blur(15px);

          animation:
            glowFloat 7s ease-in-out infinite;
        }


        @keyframes glowFloat {

          0%,
          100% {
            transform:
              translate3d(0,0,0)
              scale(1);
          }

          50% {
            transform:
              translate3d(-15px,-25px,0)
              scale(1.08);
          }

        }


        /* =========================================================
           BROCHURE SHADOW
        ========================================================= */

        .hero-brochure-shadow {
          position: absolute;

          width: 330px;

          height: 90px;

          bottom: 55px;

          background:
            rgba(0,0,0,.40);

          filter: blur(35px);

          border-radius: 50%;

          transform:
            rotateX(65deg);

          animation:
            shadowFloat 5s ease-in-out infinite;
        }


        @keyframes shadowFloat {

          0%,
          100% {
            transform:
              rotateX(65deg)
              scale(1);

            opacity: .55;
          }

          50% {
            transform:
              rotateX(65deg)
              scale(.75);

            opacity: .30;
          }

        }


        /* =========================================================
           BROCHURE
        ========================================================= */

        .hero-brochure {
          position: relative;

          width: 355px;

          aspect-ratio: .707;

          padding: 27px;

          box-sizing: border-box;

          background:
            linear-gradient(
              145deg,
              #164a70 0%,
              #0b2945 55%,
              #06192c 100%
            );

          color: white;

          box-shadow:
            0 45px 90px
            rgba(0,0,0,.38);

          transform-style:
            preserve-3d;

          transform:
            rotateY(-12deg)
            rotateX(5deg)
            rotateZ(-4deg);

          animation:
            brochureFloat 6s ease-in-out infinite;

          transition:
            transform .7s
            cubic-bezier(.2,.8,.2,1),
            box-shadow .7s ease;

          z-index: 3;
        }


        .hero-brochure:hover {
          transform:
            rotateY(-3deg)
            rotateX(2deg)
            rotateZ(0deg)
            translate3d(0,-14px,30px);

          box-shadow:
            0 60px 110px
            rgba(0,0,0,.45);
        }


        @keyframes brochureFloat {

          0%,
          100% {
            transform:
              rotateY(-12deg)
              rotateX(5deg)
              rotateZ(-4deg)
              translate3d(0,0,0);
          }

          50% {
            transform:
              rotateY(-8deg)
              rotateX(2deg)
              rotateZ(-2deg)
              translate3d(0,-22px,15px);
          }

        }


        .hero-brochure::before {
          content: "";

          position: absolute;

          inset: 0;

          background:
            linear-gradient(
              120deg,
              rgba(255,255,255,.12),
              transparent 30%,
              transparent 70%,
              rgba(255,255,255,.05)
            );

          pointer-events: none;
        }


        .hero-brochure-top {
          display: flex;

          justify-content: space-between;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 8px;

          letter-spacing: .18em;

          color:
            rgba(255,255,255,.58);
        }


        .hero-brochure-content {
          position: absolute;

          left: 27px;

          right: 27px;

          top: 30%;
        }


        .hero-brochure-kicker {
          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 8px;

          line-height: 1.5;

          letter-spacing: .2em;

          color:
            rgba(255,255,255,.55);
        }


        .hero-brochure h2 {
          margin:
            22px 0;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 43px;

          line-height: .86;

          letter-spacing: -.065em;

          font-weight: 500;
        }


        .hero-brochure-line {
          height: 1px;

          width: 100%;

          background:
            rgba(255,255,255,.23);

          margin-bottom: 18px;
        }


        .hero-brochure-company {
          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 8px;

          line-height: 1.6;

          letter-spacing: .15em;

          color:
            rgba(255,255,255,.58);
        }


        .hero-brochure-bottom {
          position: absolute;

          left: 27px;

          right: 27px;

          bottom: 27px;

          display: flex;

          justify-content: space-between;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 7px;

          letter-spacing: .16em;

          color:
            rgba(255,255,255,.45);
        }


        /* =========================================================
           FLOATING DOCUMENT
           ONLY PDF CARD REMAINS
        ========================================================= */

        .floating-document {
          position: absolute;

          display: flex;

          align-items: center;

          gap: 12px;

          padding:
            12px 15px;

          background:
            rgba(247,244,238,.94);

          color: #18334c;

          box-shadow:
            0 18px 45px
            rgba(0,0,0,.22);

          backdrop-filter:
            blur(10px);

          z-index: 5;
        }


        .floating-document span {
          display: block;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 7px;

          letter-spacing: .14em;

          color: #84909c;
        }


        .floating-document strong {
          display: block;

          margin-top: 3px;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 11px;

          font-weight: 600;
        }


        .document-one {
          left: 5%;

          top: 25%;

          animation:
            documentFloatOne 5s ease-in-out infinite;
        }


        @keyframes documentFloatOne {

          0%,
          100% {
            transform:
              translate3d(0,0,0)
              rotate(-3deg);
          }

          50% {
            transform:
              translate3d(-12px,-25px,20px)
              rotate(1deg);
          }

        }


        /* =========================================================
           PAGE NUMBER
        ========================================================= */

        .floating-page-number {
          position: absolute;

          right: 12%;

          bottom: 16%;

          display: flex;

          align-items: baseline;

          gap: 7px;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 30px;

          letter-spacing: -.05em;

          color:
            rgba(255,255,255,.76);

          animation:
            pageFloat 7s ease-in-out infinite;
        }


        .floating-page-number span {
          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 7px;

          letter-spacing: .15em;

          color:
            rgba(255,255,255,.42);
        }


        @keyframes pageFloat {

          0%,
          100% {
            transform:
              translate3d(0,0,0);
          }

          50% {
            transform:
              translate3d(10px,-18px,0);
          }

        }


        /* =========================================================
           HERO SIDE
        ========================================================= */

        .hero-side {
          position: absolute;

          right: 45px;

          bottom: 40px;

          display: flex;

          flex-direction: column;

          gap: 6px;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 8px;

          letter-spacing: .18em;

          color:
            rgba(255,255,255,.45);

          z-index: 5;
        }


        /* =========================================================
           SCROLL INDICATOR
        ========================================================= */

        .hero-scroll-indicator {
          position: absolute;

          left: 40px;

          bottom: 35px;

          display: flex;

          align-items: center;

          gap: 15px;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 8px;

          letter-spacing: .16em;

          color:
            rgba(255,255,255,.40);

          z-index: 5;
        }


        .hero-scroll-indicator div {
          width: 45px;

          height: 1px;

          background:
            rgba(255,255,255,.30);

          position: relative;

          overflow: hidden;
        }


        .hero-scroll-indicator div::after {
          content: "";

          position: absolute;

          width: 20px;

          height: 1px;

          left: -20px;

          background: white;

          animation:
            scrollLine 2.5s ease-in-out infinite;
        }


        @keyframes scrollLine {

          0% {
            transform:
              translateX(0);
          }

          100% {
            transform:
              translateX(65px);
          }

        }


        /* =========================================================
           MODAL
        ========================================================= */

        .download-modal-overlay {
          position: fixed;

          inset: 0;

          z-index: 9999;

          display: flex;

          align-items: center;

          justify-content: center;

          padding: 25px;

          background:
            rgba(4,15,26,.72);

          backdrop-filter:
            blur(12px);
        }


        .download-modal {
          position: relative;

          width:
            min(500px,100%);

          padding: 50px;

          box-sizing: border-box;

          background: #f7f4ee;

          color: #152a40;

          box-shadow:
            0 35px 100px
            rgba(0,0,0,.3);

          animation:
            modalIn .35s ease forwards;
        }


        @keyframes modalIn {

          from {
            opacity: 0;

            transform:
              translateY(25px)
              scale(.98);
          }

          to {
            opacity: 1;

            transform:
              translateY(0)
              scale(1);
          }

        }


        .modal-close {
          position: absolute;

          top: 20px;

          right: 20px;

          width: 38px;

          height: 38px;

          border:
            1px solid #d7d2c9;

          background: transparent;

          color: #536274;

          display: flex;

          align-items: center;

          justify-content: center;

          cursor: pointer;
        }


        .modal-eyebrow {
          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 9px;

          letter-spacing: .2em;

          font-weight: 700;

          color: #7d8995;
        }


        .download-modal h2 {
          margin:
            20px 0;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 52px;

          line-height: .9;

          letter-spacing: -.055em;

          font-weight: 500;
        }


        .download-modal > p {
          margin:
            0 0 35px;

          max-width: 370px;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 13px;

          line-height: 1.7;

          color: #697788;
        }


        /* =========================================================
           FORM
        ========================================================= */

        .download-form {
          display: flex;

          flex-direction: column;

          gap: 22px;
        }


        .download-form label {
          display: flex;

          flex-direction: column;

          gap: 9px;
        }


        .download-form label span {
          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 9px;

          letter-spacing: .16em;

          font-weight: 700;

          color: #718092;
        }


        .download-form input {
          width: 100%;

          height: 52px;

          box-sizing: border-box;

          padding:
            0 15px;

          border:
            1px solid #d4d0c8;

          outline: none;

          background: white;

          color: #17283b;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 14px;
        }


        .download-form input:focus {
          border-color:
            #183c5c;
        }


        .download-form input:disabled {
          opacity: .6;
        }


        /* =========================================================
           ERROR
        ========================================================= */

        .form-error {
          padding:
            12px 14px;

          background:
            #f5e8e5;

          color:
            #9a4034;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 11px;

          line-height: 1.5;
        }


        /* =========================================================
           MODAL SUBMIT
        ========================================================= */

        .modal-submit {
          width: 100%;

          min-height: 54px;

          justify-content:
            space-between;

          padding:
            0 18px;

          background:
            #102d48;

          color: white;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 10px;

          letter-spacing: .1em;

          text-transform: uppercase;
        }


        .modal-submit:hover:not(:disabled) {
          background:
            #0b2339;
        }


        .modal-submit:disabled {
          cursor: wait;

          opacity: .7;
        }


        /* =========================================================
           MODAL NOTE
        ========================================================= */

        .modal-note {
          margin-top: 22px;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 9px;

          line-height: 1.6;

          color: #89929c;
        }


        /* =========================================================
           SPINNER
        ========================================================= */

        .spinner {
          animation:
            spin 1s linear infinite;
        }


        @keyframes spin {

          to {
            transform:
              rotate(360deg);
          }

        }


        /* =========================================================
           RESPONSIVE
        ========================================================= */

        @media (max-width: 950px) {

          .downloads-hero {
            min-height: 900px;
          }


          .downloads-hero-content {
            grid-template-columns: 1fr;

            padding-top: 80px;
          }


          .hero-copy {
            max-width: 700px;
          }


          .hero-brochure-stage {
            min-height: 470px;

            margin-top: -20px;
          }


          .hero-brochure {
            width: 300px;
          }


          .hero-brochure h2 {
            font-size: 37px;
          }


          .document-one {
            left: 8%;
          }

        }


        @media (max-width: 800px) {

          .downloads-hero-content {
            width:
              calc(100% - 40px);
          }


          .downloads-hero h1 {
            font-size:
              clamp(
                62px,
                17vw,
                105px
              );
          }


          .hero-side {
            right: 20px;

            bottom: 25px;
          }


          .hero-scroll-indicator {
            left: 20px;

            bottom: 25px;
          }


          .download-modal {
            padding:
              40px 25px;
          }


          .download-modal h2 {
            font-size: 44px;
          }

        }


        @media (max-width: 600px) {

          .downloads-hero {
            min-height: 850px;
          }


          .downloads-hero-content {
            padding-top: 45px;
          }


          .hero-brochure-stage {
            min-height: 400px;
          }


          .hero-brochure {
            width: 250px;

            padding: 22px;
          }


          .hero-brochure-content {
            left: 22px;

            right: 22px;
          }


          .hero-brochure h2 {
            font-size: 31px;
          }


          .hero-brochure-bottom {
            left: 22px;

            right: 22px;

            bottom: 22px;
          }


          .floating-document {
            transform:
              scale(.82);
          }


          .document-one {
            left: -3%;
          }


          .floating-page-number {
            right: 3%;

            bottom: 8%;
          }


          .download-modal {
            padding:
              35px 22px;
          }

        }


        @media (max-width: 480px) {

          .hero-side {
            display: none;
          }


          .hero-scroll-indicator {
            display: none;
          }


          .hero-brochure-stage {
            min-height: 360px;
          }


          .hero-brochure {
            width: 220px;
          }


          .hero-brochure h2 {
            font-size: 27px;
          }


          .hero-brochure-kicker {
            font-size: 6px;
          }


          .floating-document {
            padding:
              9px 11px;
          }


          .document-one {
            left: -7%;

            top: 20%;
          }


          .floating-page-number {
            display: none;
          }

        }


        /* =========================================================
           REDUCED MOTION
        ========================================================= */

        @media (prefers-reduced-motion: reduce) {

          *,
          *::before,
          *::after {
            animation-duration:
              .01ms !important;

            animation-iteration-count:
              1 !important;

            scroll-behavior:
              auto !important;
          }

        }

      `}</style>

    </main>
  );
}