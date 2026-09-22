"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Camera,
  Check,
  Layers3,
} from "lucide-react";
import Navbar from "@/components/Navbar";

export default function TechnologyPage() {
  const pageRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    const sections = Array.from(
      root.querySelectorAll<HTMLElement>("[data-reveal]")
    );

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

    const video = root.querySelector<HTMLVideoElement>(
      ".technology-hero-video"
    );

    const canvas = root.querySelector<HTMLCanvasElement>(
      ".technology-hero-canvas"
    );

    const context = canvas?.getContext("2d", {
      willReadFrequently: true,
    });

    let animationFrame = 0;

    const renderVideo = () => {
      if (!video || !canvas || !context || video.readyState < 2) {
        animationFrame = requestAnimationFrame(renderVideo);
        return;
      }

      canvas.width = 960;
      canvas.height = 540;

      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const frame = context.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );

      for (
        let index = 0;
        index < frame.data.length;
        index += 4
      ) {
        const red = frame.data[index];
        const green = frame.data[index + 1];
        const blue = frame.data[index + 2];

        const brightness = (red + green + blue) / 3;

        if (
          brightness > 178 &&
          Math.max(red, green, blue) -
            Math.min(red, green, blue) <
            22
        ) {
          frame.data[index + 3] = 0;
        }
      }

      context.putImageData(frame, 0, 0);

      animationFrame = requestAnimationFrame(renderVideo);
    };

    renderVideo();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      <Navbar />

      <main ref={pageRef} className="technology-page">

        {/* =====================================================
            01 / HERO
            HERO PRESERVED
        ===================================================== */}

        <section className="technology-hero">

          <div className="tech-grid" />

          <div className="hero-orbit hero-orbit-large">
            <span className="hero-orbit-dot dot-one" />
            <span className="hero-orbit-dot dot-two" />
            <span className="hero-orbit-dot dot-three" />
          </div>

          <div className="hero-orbit hero-orbit-small" />

          <div className="hero-floating-node hero-node-one" />
          <div className="hero-floating-node hero-node-two" />

          <div className="container tech-hero-inner">

            <div className="tech-topline">

              <span>
                COLOURPLUS / TECHNOLOGY
              </span>

              <span>
                DIGITAL TRANSFORMATION ROADMAP
              </span>

            </div>

            <div className="tech-hero-layout">

              <div className="tech-hero-main">

                <div className="tech-status">

                  <span className="status-dot" />

                  PROPOSED DIGITAL ECOSYSTEM

                </div>

                <h1>
                  Making the
                  <br />
                  surface
                  <br />
                  <em>intelligent.</em>
                </h1>

                <p>
                  A future-facing digital ecosystem connecting
                  projects, customers, operations and surface
                  intelligence through one connected lifecycle.
                </p>

                <div className="tech-scroll">

                  <ArrowDown size={16} />

                  <span>
                    EXPLORE THE SYSTEM
                  </span>

                </div>

              </div>

              {/* HERO VIDEO — UNCHANGED */}

              <div
                className="tech-hero-visual"
                aria-hidden="true"
              >

                <video
                  className="technology-hero-video"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                >

                  <source
                    src="/videos/technology-hero-animation.mp4"
                    type="video/mp4"
                  />

                </video>

                <canvas className="technology-hero-canvas" />

              </div>

            </div>

          </div>

          <div className="tech-hero-footer">

            <span>
              TECHNOLOGY / 01
            </span>

            <span>
              AI + DATA + OPERATIONS + CUSTOMER
            </span>

          </div>

        </section>


        {/* =====================================================
            02 / ABOUT AR TECHNOLOGY
            ONLY SECTION CHANGED
            NAVY BLUE
        ===================================================== */}

        <section
          className="ar-about"
          data-reveal
        >

          <div className="container ar-about-grid">

            {/* LEFT — CONTENT */}

            <div className="ar-about-content">

              <div className="ar-section-label">

                <span className="ar-section-number">
                  02
                </span>

                <span>
                  ABOUT AR TECHNOLOGY
                </span>

              </div>

              <h2>
                The floor
                <br />
                becomes
                <br />
                <em>visual.</em>
              </h2>

              <p className="ar-about-text">
                Colourplus AR is designed to let customers
                visualize flooring finishes within their own
                space before the flooring is applied.
              </p>

              <p className="ar-about-text muted">
                Instead of selecting a flooring finish from a
                sample alone, customers can experience how a
                selected surface could look in the actual
                environment.
              </p>

              <div className="ar-flow">

                <div className="ar-flow-item active">

                  <span className="flow-number">
                    01
                  </span>

                  <span>
                    SPACE
                  </span>

                </div>

                <i />

                <div className="ar-flow-item">

                  <span className="flow-number">
                    02
                  </span>

                  <span>
                    SELECT
                  </span>

                </div>

                <i />

                <div className="ar-flow-item">

                  <span className="flow-number">
                    03
                  </span>

                  <span>
                    VISUALIZE
                  </span>

                </div>

              </div>

            </div>


            {/* RIGHT — AR VISUAL */}

            <div className="ar-about-visual">

              <div className="ar-visual-glow" />

              <div className="ar-orbit ar-orbit-one" />

              <div className="ar-orbit ar-orbit-two" />


              {/* AR TARGET */}

              <div className="ar-target">

                <div className="ar-target-ring ring-one" />
                <div className="ar-target-ring ring-two" />
                <div className="ar-target-ring ring-three" />

                <div className="ar-target-cross horizontal" />
                <div className="ar-target-cross vertical" />

                <div className="ar-target-center">
                  AR
                </div>

              </div>


              {/* FLOOR PLANE */}

              <div className="ar-floor-plane">

                <div className="floor-perspective-grid" />

                <div className="floor-surface-glow" />

              </div>


              {/* FLOATING LABEL — TOP */}

              <div className="ar-floating-card ar-card-top">

                <span className="ar-live-dot" />

                <div>

                  <small>
                    LIVE PREVIEW
                  </small>

                  <strong>
                    AR ACTIVE
                  </strong>

                </div>

              </div>


              {/* FLOATING LABEL — SIDE */}

              <div className="ar-floating-card ar-card-side">

                <span className="card-icon">
                  +
                </span>

                <div>

                  <small>
                    SURFACE
                  </small>

                  <strong>
                    FLOORING
                  </strong>

                </div>

              </div>


              {/* FLOATING LABEL — BOTTOM */}

              <div className="ar-floating-card ar-card-bottom">

                <span className="card-line" />

                <div>

                  <small>
                    VISUALIZATION
                  </small>

                  <strong>
                    REAL SPACE
                  </strong>

                </div>

              </div>


              {/* CORNER MARKERS */}

              <div className="ar-corner corner-top-left" />
              <div className="ar-corner corner-top-right" />
              <div className="ar-corner corner-bottom-left" />
              <div className="ar-corner corner-bottom-right" />

            </div>

          </div>

        </section>


        {/* =====================================================
            03 / HOW AR WORKS
            OFF-WHITE
            UNCHANGED
        ===================================================== */}

        <section
          className="ar-process"
          data-reveal
          id="how-it-works"
        >

          <div className="container">

            <div className="section-heading">

              <div>

                <p className="eyebrow">
                  03 / HOW IT WORKS
                </p>

                <h2>
                  From sample
                  <br />
                  to <em>real space.</em>
                </h2>

              </div>

              <p>
                A simple AR journey that connects the selected
                Colourplus flooring surface with the environment
                where it will be applied.
              </p>

            </div>


            <div className="process-grid">

              <article className="process-card">

                <div className="process-number">
                  01
                </div>

                <Camera
                  size={27}
                  strokeWidth={1.25}
                />

                <h3>
                  Scan the
                  <br />
                  space.
                </h3>

                <p>
                  Use a smartphone camera to view the room or
                  floor area through the AR experience.
                </p>

              </article>


              <article className="process-card featured">

                <div className="process-number">
                  02
                </div>

                <Layers3
                  size={27}
                  strokeWidth={1.25}
                />

                <h3>
                  Select a
                  <br />
                  <em>surface.</em>
                </h3>

                <p>
                  Choose a Colourplus flooring finish and
                  preview how it could appear within the space.
                </p>

              </article>


              <article className="process-card">

                <div className="process-number">
                  03
                </div>

                <Check
                  size={27}
                  strokeWidth={1.25}
                />

                <h3>
                  Compare
                  <br />
                  &amp; decide.
                </h3>

                <p>
                  Explore the visual possibilities before moving
                  forward with the flooring application.
                </p>

              </article>

            </div>

          </div>

        </section>


        {/* =====================================================
            04 / AR EXPERIENCE
            NAVY BLUE
            UNCHANGED
        ===================================================== */}

        <section
          className="ar-experience"
          data-reveal
        >

          <div className="container experience-grid">

            <div className="experience-visual">

              <div className="experience-orbit orbit-one" />

              <div className="experience-orbit orbit-two" />

              <div className="experience-phone">

                <div className="experience-scene">

                  <div className="experience-wall" />

                  <div className="experience-floor">

                    <div className="experience-floor-lines" />

                  </div>

                  <div className="crosshair">

                    <span />
                    <span />

                  </div>

                  <div className="surface-card">

                    <Layers3 size={14} />

                    <div>

                      <small>
                        SELECTED SURFACE
                      </small>

                      <strong>
                        COLOURPLUS FLOORING
                      </strong>

                    </div>

                  </div>

                </div>

                <div className="experience-bar">

                  <span>
                    LIVE PREVIEW
                  </span>

                  <strong>
                    AR
                  </strong>

                </div>

              </div>

            </div>


            <div className="experience-copy">

              <p className="eyebrow">
                04 / THE EXPERIENCE
              </p>

              <h2>
                Flooring
                <br />
                decisions become
                <br />
                <em>visual.</em>
              </h2>

              <p>
                The AR visualizer bridges the gap between a
                physical flooring sample and the finished
                environment.
              </p>

              <div className="points">

                <div>

                  <span>
                    01
                  </span>

                  <p>
                    Preview the selected flooring inside the
                    actual space.
                  </p>

                </div>

                <div>

                  <span>
                    02
                  </span>

                  <p>
                    Explore different surface possibilities
                    before application.
                  </p>

                </div>

                <div>

                  <span>
                    03
                  </span>

                  <p>
                    Use visual context to support the flooring
                    selection process.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            FOOTER
            SECTIONS 05 AND 06 REMOVED
        ===================================================== */}

        <footer className="technology-footer">

          <div className="container footer-inner">

            <span>
              COLOURPLUS POLYURETHANES PVT. LTD.
            </span>

            <span>
              TECHNOLOGY / AR FLOORING VISUALIZATION
            </span>

            <Link href="/">
              BACK TO HOME
              <ArrowUpRight size={14} />
            </Link>

          </div>

        </footer>


        {/* =====================================================
            STYLES
        ===================================================== */}

        <style jsx global>{`

          /* =====================================================
             COLOURPLUS COLOUR SYSTEM
          ===================================================== */

          .technology-page {

            --tech-navy: #0b1320;
            --tech-deep: #07111e;
            --tech-blue: #6fb4ee;
            --tech-paper: #f2f0eb;
            --tech-ink: #101722;
            --tech-muted: #697381;

            background:
              var(--tech-paper);

            color:
              var(--tech-ink);

            overflow: hidden;
          }


          .technology-page *,
          .technology-page *::before,
          .technology-page *::after {
            box-sizing: border-box;
          }


          .technology-page .container {

            width:
              min(
                1180px,
                calc(100% - 14vw)
              );

            margin: 0 auto;
          }


          .technology-page .eyebrow {

            margin: 0;

            font-size: 9px;

            line-height: 1.3;

            font-weight: 700;

            letter-spacing: 0.2em;

            text-transform: uppercase;
          }


          .technology-page .eyebrow.light {
            color:
              rgba(255, 255, 255, 0.5);
          }


          /* =====================================================
             REVEAL
          ===================================================== */

          [data-reveal] {

            opacity: 0;

            transform:
              translateY(35px);

            transition:
              opacity 0.85s ease,
              transform 1s
                cubic-bezier(
                  0.16,
                  1,
                  0.3,
                  1
                );
          }


          [data-reveal].is-visible {

            opacity: 1;

            transform:
              translateY(0);
          }


          /* =====================================================
             HERO
             PRESERVED
          ===================================================== */

          .technology-hero {

            min-height:
              calc(100vh - 90px);

            height: auto;

            position: relative;

            overflow: hidden;

            background:
              var(--tech-paper);

            color:
              var(--tech-ink);
          }


          .tech-hero-layout {

            position: relative;

            z-index: 5;

            width: 100%;

            display: grid;

            grid-template-columns:
              minmax(0, 0.95fr)
              minmax(390px, 0.72fr);

            align-items: center;

            gap: 4vw;

            flex: 1;
          }


          .tech-hero-main {

            position: relative;

            z-index: 6;

            max-width: 720px;
          }


          .tech-hero-visual {

            position: relative;

            width: 100%;

            height: 560px;

            display: grid;

            place-items: center;

            perspective: 1200px;

            overflow: visible;
          }


          .technology-hero-video {
            display: none;
          }


          .technology-hero-canvas {

            position: relative;

            z-index: 4;

            display: block;

            width: 180%;

            max-width: none;

            max-height: none;

            height: auto;

            object-fit: contain;

            background: transparent;

            border: 0;

            outline: 0;

            transform:
              translate3d(-72px, 0, 0);

            transform-origin: center;

            filter:
              drop-shadow(
                0 32px 42px
                rgba(0, 0, 0, 0.3)
              );

            animation:
              technologyHeroFloat
              7s
              ease-in-out
              infinite;

            pointer-events: none;
          }


          .technology-hero .tech-grid,
          .technology-hero .hero-orbit,
          .technology-hero .hero-floating-node {
            display: none;
          }


          .tech-grid,
          .core-grid {

            position: absolute;

            inset: 0;

            pointer-events: none;

            background-image:
              linear-gradient(
                rgba(255, 255, 255, 0.045)
                1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(255, 255, 255, 0.045)
                1px,
                transparent 1px
              );

            background-size:
              72px 72px;
          }


          .tech-grid {
            opacity: 0.35;
          }


          .tech-hero-inner {

            position: relative;

            z-index: 5;

            min-height:
              calc(100vh - 90px);

            height: auto;

            padding-top: 86px;

            padding-bottom: 38px;

            display: flex;

            flex-direction: column;

            justify-content: space-between;
          }


          .tech-topline,
          .tech-hero-footer {

            display: flex;

            justify-content: space-between;

            gap: 20px;

            color:
              rgba(16, 23, 34, 0.48);

            font-size: 8px;

            letter-spacing: 0.18em;
          }


          .tech-status {

            display: inline-flex;

            align-items: center;

            gap: 9px;

            color:
              rgba(16, 23, 34, 0.56);

            font-size: 8px;

            letter-spacing: 0.18em;
          }


          .status-dot {

            width: 6px;

            height: 6px;

            border-radius: 50%;

            background:
              #7fd0a3;

            box-shadow:
              0 0 16px
              rgba(127, 208, 163, 0.8);

            animation:
              statusPulse
              2s
              ease-in-out
              infinite;
          }


          .tech-hero-main h1 {

            margin:
              28px 0 0;

            max-width: 850px;

            font-size:
              clamp(
                70px,
                9.6vw,
                150px
              );

            line-height: 0.83;

            letter-spacing: -0.075em;

            font-weight: 400;
          }


          .tech-hero-main h1 em {

            color:
              var(--tech-blue);

            font-family:
              Georgia,
              "Times New Roman",
              serif;

            font-weight: 400;
          }


          .tech-hero-main > p {

            max-width: 520px;

            margin:
              34px 0 0;

            color:
              rgba(16, 23, 34, 0.66);

            font-size: 13px;

            line-height: 1.8;
          }


          .tech-scroll {

            display: inline-flex;

            align-items: center;

            gap: 10px;

            margin-top: 30px;

            color:
              rgba(16, 23, 34, 0.7);

            font-size: 8px;

            font-weight: 700;

            letter-spacing: 0.17em;
          }


          .tech-scroll svg {

            animation:
              arrowDown
              1.8s
              ease-in-out
              infinite;
          }


          /* =====================================================
             02 / ABOUT AR
             NEW ATTRACTIVE VERSION
          ===================================================== */

          .ar-about {

            position: relative;

            min-height: 760px;

            padding:
              120px 0 130px;

            background:
              var(--tech-navy);

            color: white;

            overflow: hidden;
          }


          .ar-about::before {

            content: "";

            position: absolute;

            width: 700px;

            height: 700px;

            top: -250px;

            right: -180px;

            border-radius: 50%;

            background:
              radial-gradient(
                circle,
                rgba(111, 180, 238, 0.11),
                transparent 65%
              );

            pointer-events: none;

            animation:
              glowBreath
              7s
              ease-in-out
              infinite;
          }


          .ar-about::after {

            content: "";

            position: absolute;

            width: 520px;

            height: 520px;

            bottom: -320px;

            left: -180px;

            border-radius: 50%;

            background:
              radial-gradient(
                circle,
                rgba(111, 180, 238, 0.06),
                transparent 68%
              );

            pointer-events: none;
          }


          .ar-about-grid {

            position: relative;

            z-index: 2;

            display: grid;

            grid-template-columns:
              0.82fr 1.18fr;

            gap: 6vw;

            align-items: center;
          }


          .ar-about-content {

            position: relative;

            z-index: 5;

            animation:
              manifestoAntigravity
              8s
              ease-in-out
              infinite;
          }


          .ar-section-label {

            display: flex;

            align-items: center;

            gap: 15px;

            color:
              rgba(255, 255, 255, 0.48);

            font-size: 9px;

            font-weight: 700;

            letter-spacing: 0.18em;
          }


          .ar-section-number {

            display: inline-flex;

            align-items: center;

            justify-content: center;

            width: 32px;

            height: 32px;

            border:
              1px solid
              rgba(255, 255, 255, 0.2);

            color:
              var(--tech-blue);

            font-size: 8px;

            letter-spacing: 0;
          }


          .ar-about-content h2 {

            margin:
              28px 0 0;

            font-size:
              clamp(
                55px,
                6.3vw,
                94px
              );

            line-height: 0.88;

            font-weight: 400;

            letter-spacing: -0.065em;

            color: white;
          }


          .ar-about-content h2 em {

            color:
              var(--tech-blue);

            font-family:
              Georgia,
              "Times New Roman",
              serif;

            font-weight: 400;
          }


          .ar-about-text {

            max-width: 590px;

            margin:
              42px 0 0;

            color:
              rgba(255, 255, 255, 0.66);

            font-size: 14px;

            line-height: 1.85;
          }


          .ar-about-text.muted {

            margin-top: 17px;

            color:
              rgba(255, 255, 255, 0.38);

            font-size: 12px;
          }


          .ar-flow {

            display: flex;

            align-items: center;

            gap: 12px;

            margin-top: 38px;

            color:
              rgba(255, 255, 255, 0.48);

            font-size: 8px;

            font-weight: 700;

            letter-spacing: 0.15em;
          }


          .ar-flow-item {

            position: relative;

            display: flex;

            align-items: center;

            gap: 8px;

            transition:
              color 0.35s ease;
          }


          .ar-flow-item.active {

            color: white;
          }


          .flow-number {

            color:
              var(--tech-blue);

            font-size: 7px;
          }


          .ar-flow i {

            width: 34px;

            height: 1px;

            background:
              rgba(255, 255, 255, 0.2);
          }


          /* =====================================================
             AR VISUAL
          ===================================================== */

          .ar-about-visual {

            position: relative;

            min-height: 570px;

            display: grid;

            place-items: center;

            isolation: isolate;

            animation:
              arVisualFloat
              9s
              ease-in-out
              infinite;
          }


          .ar-visual-glow {

            position: absolute;

            width: 430px;

            height: 430px;

            border-radius: 50%;

            background:
              radial-gradient(
                circle,
                rgba(111, 180, 238, 0.18),
                rgba(111, 180, 238, 0.03) 45%,
                transparent 70%
              );

            filter:
              blur(5px);

            animation:
              glowBreath
              6s
              ease-in-out
              infinite;
          }


          .ar-orbit {

            position: absolute;

            border:
              1px solid
              rgba(111, 180, 238, 0.18);

            border-radius: 50%;

            pointer-events: none;
          }


          .ar-orbit-one {

            width: 460px;

            height: 460px;

            transform:
              rotateX(68deg)
              rotateZ(12deg);

            animation:
              slowRotate
              24s
              linear
              infinite;
          }


          .ar-orbit-two {

            width: 350px;

            height: 520px;

            transform:
              rotateY(68deg)
              rotateZ(-18deg);

            animation:
              slowRotateReverse
              20s
              linear
              infinite;
          }


          /* =====================================================
             FLOOR PLANE
          ===================================================== */

          .ar-floor-plane {

            position: absolute;

            width: 510px;

            height: 290px;

            bottom: 55px;

            left: 50%;

            transform:
              translateX(-50%)
              perspective(700px)
              rotateX(62deg)
              rotateZ(-4deg);

            transform-origin: center;

            border:
              1px solid
              rgba(111, 180, 238, 0.28);

            background:
              rgba(111, 180, 238, 0.035);

            overflow: hidden;

            box-shadow:
              0 0 80px
              rgba(111, 180, 238, 0.08);
          }


          .floor-perspective-grid {

            position: absolute;

            inset: -50%;

            background-image:
              linear-gradient(
                rgba(111, 180, 238, 0.18)
                1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(111, 180, 238, 0.18)
                1px,
                transparent 1px
              );

            background-size:
              46px 46px;

            animation:
              gridMove
              9s
              linear
              infinite;
          }


          .floor-surface-glow {

            position: absolute;

            inset: 0;

            background:
              radial-gradient(
                ellipse at center,
                rgba(111, 180, 238, 0.18),
                transparent 65%
              );

            animation:
              glowBreath
              5s
              ease-in-out
              infinite;
          }


          /* =====================================================
             AR TARGET
          ===================================================== */

          .ar-target {

            position: relative;

            z-index: 6;

            width: 220px;

            height: 220px;

            display: grid;

            place-items: center;

            animation:
              targetFloat
              6s
              ease-in-out
              infinite;
          }


          .ar-target-ring {

            position: absolute;

            border:
              1px solid
              rgba(111, 180, 238, 0.55);

            border-radius: 50%;
          }


          .ring-one {

            inset: 0;

            animation:
              targetRingOne
              6s
              ease-in-out
              infinite;
          }


          .ring-two {

            inset: 27px;

            border-color:
              rgba(255, 255, 255, 0.28);

            animation:
              targetRingTwo
              7s
              ease-in-out
              infinite;
          }


          .ring-three {

            inset: 62px;

            border-color:
              rgba(111, 180, 238, 0.75);

            box-shadow:
              0 0 30px
              rgba(111, 180, 238, 0.15);
          }


          .ar-target-cross {

            position: absolute;

            background:
              rgba(111, 180, 238, 0.4);
          }


          .ar-target-cross.horizontal {

            width: 280px;

            height: 1px;
          }


          .ar-target-cross.vertical {

            width: 1px;

            height: 280px;
          }


          .ar-target-center {

            position: relative;

            z-index: 4;

            width: 55px;

            height: 55px;

            display: grid;

            place-items: center;

            border:
              1px solid
              var(--tech-blue);

            border-radius: 50%;

            background:
              rgba(11, 19, 32, 0.72);

            color:
              var(--tech-blue);

            font-size: 10px;

            font-weight: 700;

            letter-spacing: 0.14em;

            box-shadow:
              0 0 35px
              rgba(111, 180, 238, 0.18);
          }


          /* =====================================================
             FLOATING CARDS
          ===================================================== */

          .ar-floating-card {

            position: absolute;

            z-index: 10;

            display: flex;

            align-items: center;

            gap: 10px;

            min-width: 150px;

            padding:
              11px 13px;

            border:
              1px solid
              rgba(255, 255, 255, 0.13);

            background:
              rgba(14, 25, 40, 0.72);

            backdrop-filter:
              blur(14px);

            box-shadow:
              0 20px 40px
              rgba(0, 0, 0, 0.22);

            animation:
              floatingCard
              5.5s
              ease-in-out
              infinite;
          }


          .ar-floating-card small {

            display: block;

            margin-bottom: 4px;

            color:
              rgba(255, 255, 255, 0.38);

            font-size: 6px;

            font-weight: 700;

            letter-spacing: 0.16em;
          }


          .ar-floating-card strong {

            display: block;

            color: white;

            font-size: 8px;

            letter-spacing: 0.09em;
          }


          .ar-card-top {

            top: 38px;

            right: 20px;
          }


          .ar-card-side {

            left: 0;

            top: 46%;

            animation-delay:
              -1.8s;
          }


          .ar-card-bottom {

            right: 50px;

            bottom: 28px;

            animation-delay:
              -3.2s;
          }


          .ar-live-dot {

            width: 7px;

            height: 7px;

            flex: 0 0 7px;

            border-radius: 50%;

            background:
              #7fd0a3;

            box-shadow:
              0 0 13px
              rgba(127, 208, 163, 0.8);

            animation:
              statusPulse
              2s
              ease-in-out
              infinite;
          }


          .card-icon {

            width: 22px;

            height: 22px;

            display: grid;

            place-items: center;

            border:
              1px solid
              rgba(111, 180, 238, 0.45);

            color:
              var(--tech-blue);

            font-size: 15px;

            font-weight: 300;
          }


          .card-line {

            width: 20px;

            height: 1px;

            background:
              var(--tech-blue);

            box-shadow:
              0 0 10px
              rgba(111, 180, 238, 0.6);
          }


          /* =====================================================
             CORNER MARKERS
          ===================================================== */

          .ar-corner {

            position: absolute;

            width: 28px;

            height: 28px;

            border-color:
              rgba(111, 180, 238, 0.55);

            border-style: solid;

            opacity: 0.7;
          }


          .corner-top-left {

            top: 65px;

            left: 80px;

            border-width:
              1px 0 0 1px;
          }


          .corner-top-right {

            top: 65px;

            right: 80px;

            border-width:
              1px 1px 0 0;
          }


          .corner-bottom-left {

            bottom: 65px;

            left: 80px;

            border-width:
              0 0 1px 1px;
          }


          .corner-bottom-right {

            bottom: 65px;

            right: 80px;

            border-width:
              0 1px 1px 0;
          }


          /* =====================================================
             03 / PROCESS
             OFF-WHITE
          ===================================================== */

          .ar-process {

            padding:
              115px 0 125px;

            background:
              var(--tech-paper);

            color:
              var(--tech-ink);
          }


          .section-heading {

            display: grid;

            grid-template-columns:
              1fr 0.5fr;

            gap: 7vw;

            align-items: end;

            margin-bottom: 58px;
          }


          .section-heading h2 {

            margin:
              25px 0 0;

            font-size:
              clamp(
                54px,
                6.4vw,
                92px
              );

            line-height: 0.88;

            font-weight: 400;

            letter-spacing: -0.065em;
          }


          .section-heading h2 em {

            color:
              #4e8fc7;

            font-family:
              Georgia,
              "Times New Roman",
              serif;

            font-weight: 400;
          }


          .section-heading > p {

            margin: 0;

            max-width: 410px;

            color:
              var(--tech-muted);

            font-size: 13px;

            line-height: 1.85;
          }


          .process-grid {

            display: grid;

            grid-template-columns:
              repeat(3, 1fr);

            gap: 18px;
          }


          .process-card {

            min-height: 320px;

            padding: 30px;

            border:
              1px solid
              rgba(16, 23, 34, 0.1);

            background:
              rgba(255, 255, 255, 0.55);

            transition:
              transform 0.4s ease,
              background 0.4s ease;

            animation:
              processFloat
              7s
              ease-in-out
              infinite;
          }


          .process-card:nth-child(2) {
            animation-delay:
              -2.2s;
          }


          .process-card:nth-child(3) {
            animation-delay:
              -4.2s;
          }


          .process-card:hover {

            transform:
              translateY(-8px);

            background:
              white;
          }


          .process-card.featured {

            background:
              var(--tech-navy);

            color: white;

            transform:
              translateY(25px);
          }


          .process-card.featured:hover {

            transform:
              translateY(17px);
          }


          .process-number {

            display: block;

            text-align: right;

            margin-bottom: 58px;

            color:
              rgba(16, 23, 34, 0.3);

            font-size: 8px;

            letter-spacing: 0.14em;
          }


          .process-card.featured .process-number {

            color:
              rgba(255, 255, 255, 0.3);
          }


          .process-card > svg {

            color:
              #4e8fc7;
          }


          .process-card h3 {

            margin:
              25px 0 0;

            font-size: 29px;

            line-height: 0.96;

            font-weight: 400;

            letter-spacing: -0.04em;
          }


          .process-card h3 em {

            color:
              var(--tech-blue);

            font-family:
              Georgia,
              "Times New Roman",
              serif;
          }


          .process-card p {

            max-width: 340px;

            margin:
              18px 0 0;

            color:
              rgba(16, 23, 34, 0.55);

            font-size: 12px;

            line-height: 1.75;
          }


          .process-card.featured p {

            color:
              rgba(255, 255, 255, 0.52);
          }


          /* =====================================================
             04 / AR EXPERIENCE
             NAVY BLUE
          ===================================================== */

          .ar-experience {

            padding:
              120px 0;

            background:
              var(--tech-navy);

            color: white;
          }


          .experience-grid {

            display: grid;

            grid-template-columns:
              0.9fr 0.7fr;

            gap: 9vw;

            align-items: center;
          }


          .experience-visual {

            min-height: 600px;

            position: relative;

            display: grid;

            place-items: center;
          }


          .experience-phone {

            width: 320px;

            height: 570px;

            padding: 11px;

            border-radius: 42px;

            background:
              linear-gradient(
                145deg,
                #273a57,
                #09111b
              );

            box-shadow:
              0 45px 75px
              rgba(0, 0, 0, 0.32);

            transform:
              rotate(-3deg);

            animation:
              phoneFloat
              7s
              ease-in-out
              infinite;
          }


          .experience-scene {

            position: relative;

            width: 100%;

            height: 100%;

            overflow: hidden;

            border-radius: 33px;

            background:
              #d9d3c8;
          }


          .experience-wall {

            position: absolute;

            inset:
              0 0 46% 0;

            background:
              linear-gradient(
                135deg,
                #eeeae2,
                #cfc8bb
              );
          }


          .experience-floor {

            position: absolute;

            inset:
              42% -18% -12%;

            background:
              #a89d89;

            transform:
              perspective(450px)
              rotateX(55deg);

            transform-origin:
              bottom;
          }


          .experience-floor-lines {

            position: absolute;

            inset: 0;

            background-image:
              linear-gradient(
                rgba(16, 23, 34, 0.12)
                1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(16, 23, 34, 0.12)
                1px,
                transparent 1px
              );

            background-size:
              75px 75px;
          }


          .crosshair {

            position: absolute;

            inset:
              80px 35px 145px;

            border:
              1px solid
              rgba(255, 255, 255, 0.4);

            border-radius: 18px;
          }


          .crosshair span {

            position: absolute;

            width: 22px;

            height: 22px;

            border-color:
              var(--tech-blue);

            border-style: solid;
          }


          .crosshair span:nth-child(1) {

            top: -1px;

            left: -1px;

            border-width:
              2px 0 0 2px;
          }


          .crosshair span:nth-child(2) {

            right: -1px;

            bottom: -1px;

            border-width:
              0 2px 2px 0;
          }


          .surface-card {

            position: absolute;

            left: 24px;

            right: 24px;

            bottom: 26px;

            display: flex;

            align-items: center;

            gap: 10px;

            padding: 13px;

            background:
              rgba(11, 19, 32, 0.83);

            color: white;

            backdrop-filter:
              blur(10px);
          }


          .surface-card > svg {

            color:
              var(--tech-blue);
          }


          .surface-card small {

            display: block;

            margin-bottom: 4px;

            color:
              rgba(255, 255, 255, 0.42);

            font-size: 6px;

            letter-spacing: 0.14em;
          }


          .surface-card strong {

            font-size: 8px;

            letter-spacing: 0.07em;
          }


          .experience-bar {

            display: flex;

            align-items: center;

            justify-content: space-between;

            padding:
              9px 13px;

            color:
              rgba(255, 255, 255, 0.5);

            font-size: 7px;

            letter-spacing: 0.13em;
          }


          .experience-bar strong {

            color:
              var(--tech-blue);
          }


          .experience-orbit {

            position: absolute;

            border:
              1px solid
              rgba(111, 180, 238, 0.25);

            border-radius: 50%;

            pointer-events: none;
          }


          .orbit-one {

            width: 460px;

            height: 460px;

            animation:
              orbitRotate
              22s
              linear
              infinite;
          }


          .orbit-two {

            width: 620px;

            height: 230px;

            transform:
              rotate(-25deg);

            animation:
              orbitRotateReverse
              26s
              linear
              infinite;
          }


          .experience-copy .eyebrow {

            color:
              rgba(255, 255, 255, 0.5);
          }


          .experience-copy h2 {

            margin:
              25px 0 0;

            font-size:
              clamp(
                54px,
                6.4vw,
                92px
              );

            line-height: 0.88;

            font-weight: 400;

            letter-spacing: -0.065em;

            color: white;
          }


          .experience-copy h2 em {

            color:
              var(--tech-blue);

            font-family:
              Georgia,
              "Times New Roman",
              serif;
          }


          .experience-copy > p:not(.eyebrow) {

            max-width: 510px;

            margin:
              34px 0 0;

            color:
              rgba(255, 255, 255, 0.62);

            font-size: 13px;

            line-height: 1.85;
          }


          .points {

            margin-top: 38px;

            border-top:
              1px solid
              rgba(255, 255, 255, 0.12);
          }


          .points > div {

            display: grid;

            grid-template-columns:
              45px 1fr;

            padding:
              18px 0;

            border-bottom:
              1px solid
              rgba(255, 255, 255, 0.12);
          }


          .points span {

            color:
              var(--tech-blue);

            font-size: 8px;

            letter-spacing: 0.13em;
          }


          .points p {

            margin: 0;

            color:
              rgba(255, 255, 255, 0.5);

            font-size: 11px;

            line-height: 1.7;
          }


          /* =====================================================
             FOOTER
          ===================================================== */

          .technology-footer {

            background:
              #07101c;

            color:
              rgba(255,255,255,0.35);

            border-top:
              1px solid
              rgba(255,255,255,0.08);
          }


          .footer-inner {

            min-height: 78px;

            display: flex;

            align-items: center;

            justify-content: space-between;

            gap: 20px;

            font-size: 7px;

            letter-spacing: 0.15em;
          }


          .footer-inner a {

            display: inline-flex;

            align-items: center;

            gap: 7px;

            color: white;

            text-decoration: none;
          }


          /* =====================================================
             ANIMATIONS
          ===================================================== */

          @keyframes technologyHeroFloat {

            0%,
            100% {
              transform:
                translate3d(-72px, 0, 0)
                scale(1);
            }

            50% {
              transform:
                translate3d(-72px, -12px, 0)
                scale(1.02);
            }

          }


          @keyframes statusPulse {

            0%,
            100% {
              opacity: 0.4;

              transform:
                scale(0.8);
            }

            50% {
              opacity: 1;

              transform:
                scale(1.2);
            }

          }


          @keyframes arrowDown {

            0%,
            100% {
              transform:
                translateY(0);
            }

            50% {
              transform:
                translateY(5px);
            }

          }


          @keyframes processFloat {

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


          @keyframes manifestoAntigravity {

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


          @keyframes phoneFloat {

            0%,
            100% {
              transform:
                translateY(0)
                rotate(-3deg);
            }

            50% {
              transform:
                translateY(-12px)
                rotate(-1deg);
            }

          }


          @keyframes orbitRotate {

            from {
              transform:
                rotate(0deg);
            }

            to {
              transform:
                rotate(360deg);
            }

          }


          @keyframes orbitRotateReverse {

            from {
              transform:
                rotate(360deg);
            }

            to {
              transform:
                rotate(0deg);
            }

          }


          /* =====================================================
             NEW SECTION 02 ANIMATIONS
          ===================================================== */

          @keyframes arVisualFloat {

            0%,
            100% {
              transform:
                translate3d(0, 0, 0);
            }

            50% {
              transform:
                translate3d(0, -10px, 0);
            }

          }


          @keyframes targetFloat {

            0%,
            100% {
              transform:
                translate3d(0, 0, 0);
            }

            50% {
              transform:
                translate3d(0, -13px, 0);
            }

          }


          @keyframes floatingCard {

            0%,
            100% {
              transform:
                translate3d(0, 0, 0);
            }

            50% {
              transform:
                translate3d(0, -9px, 0);
            }

          }


          @keyframes targetRingOne {

            0%,
            100% {
              transform:
                scale(1)
                rotate(0deg);

              opacity: 0.65;
            }

            50% {
              transform:
                scale(1.05)
                rotate(8deg);

              opacity: 1;
            }

          }


          @keyframes targetRingTwo {

            0%,
            100% {
              transform:
                scale(1)
                rotate(0deg);

              opacity: 0.45;
            }

            50% {
              transform:
                scale(0.92)
                rotate(-10deg);

              opacity: 0.8;
            }

          }


          @keyframes glowBreath {

            0%,
            100% {
              opacity: 0.55;

              transform:
                scale(0.96);
            }

            50% {
              opacity: 1;

              transform:
                scale(1.04);
            }

          }


          @keyframes slowRotate {

            from {
              transform:
                rotateX(68deg)
                rotateZ(0deg);
            }

            to {
              transform:
                rotateX(68deg)
                rotateZ(360deg);
            }

          }


          @keyframes slowRotateReverse {

            from {
              transform:
                rotateY(68deg)
                rotateZ(360deg);
            }

            to {
              transform:
                rotateY(68deg)
                rotateZ(0deg);
            }

          }


          @keyframes gridMove {

            0% {
              transform:
                translate3d(0, 0, 0);
            }

            100% {
              transform:
                translate3d(46px, 46px, 0);
            }

          }


          /* =====================================================
             TABLET
          ===================================================== */

          @media (max-width: 900px) {

            .technology-page .container {

              width:
                min(
                  calc(100% - 44px),
                  720px
                );
            }


            .tech-hero-layout,
            .ar-about-grid,
            .section-heading,
            .experience-grid {

              grid-template-columns: 1fr;

              gap: 42px;
            }


            .tech-hero-layout {

              padding-top: 55px;
            }


            .tech-hero-visual {

              height: 520px;
            }


            .ar-about {

              min-height: auto;
            }


            .ar-about-grid {

              align-items: center;
            }


            .ar-about-visual {

              min-height: 560px;

              margin-top: 10px;
            }


            .process-grid {

              grid-template-columns:
                1fr;
            }


            .process-card.featured {

              transform: none;
            }


            .process-card.featured:hover {

              transform:
                translateY(-8px);
            }


            .experience-visual {

              min-height: 540px;
            }

          }


          /* =====================================================
             MOBILE
          ===================================================== */

          @media (max-width: 600px) {

            .technology-page .container {

              width:
                calc(100% - 44px);
            }


            .technology-hero {

              min-height: 760px;

              height: 760px;
            }


            .tech-hero-inner {

              padding-top: 108px;

              padding-bottom: 35px;
            }


            .tech-topline span:last-child,
            .tech-hero-footer span:last-child {

              display: none;
            }


            .tech-hero-main h1 {

              font-size: 62px;
            }


            .tech-hero-main > p {

              font-size: 12px;
            }


            .tech-hero-layout {

              grid-template-columns: 1fr;

              gap: 8px;

              align-content: center;
            }


            .tech-hero-visual {

              height: 350px;

              margin-top: -10px;
            }


            .technology-hero-canvas {

              width: 270px;

              max-height: 330px;

              transform:
                translate3d(0, 0, 0)
                scale(0.82);

              animation-name:
                technologyHeroFloatMobile;
            }


            .ar-about,
            .ar-process,
            .ar-experience {

              padding:
                75px 0;
            }


            .ar-about-content h2,
            .section-heading h2,
            .experience-copy h2 {

              font-size: 50px;
            }


            .ar-about-text {

              font-size: 13px;
            }


            .ar-flow {

              flex-wrap: wrap;

              gap: 10px;
            }


            .ar-flow i {

              width: 22px;
            }


            .ar-about-visual {

              min-height: 430px;

              margin-top: 5px;
            }


            .ar-target {

              width: 170px;

              height: 170px;
            }


            .ar-target-cross.horizontal {

              width: 215px;
            }


            .ar-target-cross.vertical {

              height: 215px;
            }


            .ar-floor-plane {

              width: 350px;

              height: 210px;

              bottom: 30px;
            }


            .ar-orbit-one {

              width: 350px;

              height: 350px;
            }


            .ar-orbit-two {

              width: 280px;

              height: 400px;
            }


            .ar-card-top {

              top: 5px;

              right: 0;
            }


            .ar-card-side {

              left: 0;

              top: 42%;
            }


            .ar-card-bottom {

              right: 5px;

              bottom: 5px;
            }


            .ar-floating-card {

              min-width: 125px;

              padding:
                9px 10px;
            }


            .ar-floating-card strong {

              font-size: 7px;
            }


            .corner-top-left {

              top: 28px;

              left: 25px;
            }


            .corner-top-right {

              top: 28px;

              right: 25px;
            }


            .corner-bottom-left {

              bottom: 28px;

              left: 25px;
            }


            .corner-bottom-right {

              bottom: 28px;

              right: 25px;
            }


            .process-card {

              min-height: 285px;

              padding: 24px;
            }


            .experience-visual {

              min-height: 470px;
            }


            .experience-phone {

              width: 255px;

              height: 455px;

              border-radius: 35px;
            }


            .experience-scene {

              border-radius: 27px;
            }


            .orbit-one {

              width: 350px;

              height: 350px;
            }


            .orbit-two {

              width: 430px;

              height: 170px;
            }


            .footer-inner {

              min-height: 105px;

              padding:
                18px 0;

              flex-direction: column;

              align-items: flex-start;

              justify-content: center;

              gap: 12px;
            }

          }


          @keyframes technologyHeroFloatMobile {

            0%,
            100% {

              transform:
                translate3d(0, 0, 0)
                scale(0.74)
                rotate(2deg);
            }

            50% {

              transform:
                translate3d(0, -10px, 0)
                scale(0.76)
                rotate(-1deg);
            }

          }


          /* =====================================================
             REDUCED MOTION
          ===================================================== */

          @media (prefers-reduced-motion: reduce) {

            [data-reveal],
            .technology-hero-canvas,
            .process-card,
            .experience-phone,
            .experience-orbit,
            .ar-about-content,
            .ar-about-visual,
            .ar-target,
            .ar-floating-card,
            .ar-orbit,
            .ar-target-ring,
            .ar-visual-glow,
            .ar-live-dot,
            .status-dot,
            .tech-scroll svg {

              animation: none !important;

              transition: none !important;
            }


            [data-reveal] {

              opacity: 1;

              transform: none;
            }

          }

        `}</style>

      </main>
    </>
  );
}