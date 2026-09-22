"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  MoveUpRight,
  Plus,
} from "lucide-react";

const industries = [
  {
    no: "01",
    name: "Automotive",
    short: "Precision / Movement / Impact",
    description:
      "Surface environments designed around demanding production conditions, movement, impact and continuous industrial activity.",
    image: "/images/industries/automotive.jpg",
  },
  {
    no: "02",
    name: "Pharmaceutical",
    short: "Clean / Controlled / Hygienic",
    description:
      "Engineered surface environments for pharmaceutical manufacturing and clean-room conditions where hygiene and control are critical.",
    image: "/images/industries/pharmaceutical.jpg",
  },
  {
    no: "03",
    name: "Food & Beverage",
    short: "Hygiene / Processing / Durability",
    description:
      "Surface systems suited to food and beverage processing environments where hygiene, durability and operational performance work together.",
    image: "/images/industries/food-beverage.jpg",
  },
  {
    no: "04",
    name: "Healthcare",
    short: "Hygiene / Safety / Continuity",
    description:
      "Seamless surface environments for healthcare spaces requiring cleanability, durability and dependable everyday performance.",
    image: "/images/industries/healthcare.jpg",
  },
  {
    no: "05",
    name: "Warehousing & Logistics",
    short: "Traffic / Load / Movement",
    description:
      "Flooring environments engineered around heavy traffic, material movement, storage operations and demanding logistics conditions.",
    image: "/images/industries/warehouse.jpg",
  },
  {
    no: "06",
    name: "Textile",
    short: "Production / Wear / Continuity",
    description:
      "Durable industrial surfaces developed for textile production environments and continuous manufacturing activity.",
    image: "/images/industries/textile.jpg",
  },
  {
    no: "07",
    name: "FMCG",
    short: "Production / Hygiene / Flow",
    description:
      "Surface solutions for fast-moving production environments where cleanliness, durability and operational flow matter.",
    image: "/images/industries/fmcg.jpg",
  },
  {
    no: "08",
    name: "Heavy Engineering",
    short: "Impact / Load / Exposure",
    description:
      "High-performance surface environments for heavy engineering applications exposed to demanding industrial conditions.",
    image: "/images/industries/heavy-engineering.jpg",
  },
  {
    no: "09",
    name: "IT / R&D / Data Centres",
    short: "Control / ESD / Reliability",
    description:
      "Specialized surface environments for technology, research and data-centre applications where controlled performance is essential.",
    image: "/images/industries/data-centre.jpg",
  },
];

export default function IndustriesPage() {
  const [active, setActive] = useState(0);
  const [isTurning, setIsTurning] = useState(false);

  const [cursor, setCursor] = useState({
    x: 0,
    y: 0,
  });

  const [scrollY, setScrollY] = useState(0);

  const pageRef = useRef<HTMLDivElement>(null);

  /*
    ============================================================
    MOUSE + SCROLL
    ============================================================
  */

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setCursor({
        x: event.clientX / window.innerWidth - 0.5,
        y: event.clientY / window.innerHeight - 0.5,
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /*
    ============================================================
    SCROLL REVEALS
    ============================================================
  */

  useEffect(() => {
    const elements = document.querySelectorAll(
      ".industry-reveal"
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

    elements.forEach((element) =>
      observer.observe(element)
    );

    return () => observer.disconnect();
  }, []);

  /*
    ============================================================
    AUTOMATIC PAGE TURNING
    ============================================================

    2.5 seconds between image changes.
    0.55 seconds page-turn animation.
  */

  useEffect(() => {
    let changeTimeout: number | null = null;

    const timer = window.setInterval(() => {
      setIsTurning(true);

      changeTimeout = window.setTimeout(() => {
        setActive((previous) =>
          previous === industries.length - 1
            ? 0
            : previous + 1
        );

        setIsTurning(false);
      }, 550);
    }, 2500);

    return () => {
      window.clearInterval(timer);

      if (changeTimeout !== null) {
        window.clearTimeout(changeTimeout);
      }
    };
  }, []);

  const current = industries[active];

  const next =
    industries[
      active === industries.length - 1
        ? 0
        : active + 1
    ];

  return (
    <main
      ref={pageRef}
      className="industries-page"
    >
      <style jsx global>{`
        :root {
          --cp-blue: #123f7a;
          --cp-dark: #07172b;
          --cp-ink: #111820;
          --cp-muted: #737c87;
          --cp-paper: #f3f1ec;
          --cp-white: #ffffff;
          --cp-line: rgba(17, 24, 32, 0.13);
        }

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: var(--cp-paper);
          color: var(--cp-ink);
        }

        a {
          color: inherit;
        }

        .industries-page {
          position: relative;
          overflow: hidden;
          background: var(--cp-paper);
        }

        .container {
          width: min(1380px, calc(100% - 70px));
          margin: 0 auto;
        }

        /* =====================================================
           TOP BAR
        ===================================================== */

        .industry-topbar {
          position: relative;
          z-index: 30;
          height: 65px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--cp-line);
          font-size: 9px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .industry-topbar-left {
          display: flex;
          align-items: center;
          gap: 11px;
          font-weight: 700;
        }

        .industry-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--cp-blue);
          box-shadow:
            0 0 0 5px rgba(18, 63, 122, 0.08);
        }

        .industry-topbar-right {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #7b838d;
        }

        /* =====================================================
           HERO
        ===================================================== */

        .industry-hero {
          position: relative;
          min-height: calc(100vh - 65px);
          padding: 38px 0 48px;
          overflow: hidden;
          background: var(--cp-paper);
        }

        .hero-layout {
          position: relative;
          min-height: calc(100vh - 151px);
          display: grid;
          grid-template-columns: 0.78fr 1.22fr;
          gap: 38px;
          align-items: center;
        }

        .hero-copy {
          position: relative;
          z-index: 8;
          padding-left: 20px;
        }

        .hero-index {
          position: absolute;
          left: -8px;
          top: -90px;
          font-size: 165px;
          line-height: 1;
          letter-spacing: -0.1em;
          font-weight: 500;
          color: rgba(18, 63, 122, 0.055);
          pointer-events: none;
        }

        .eyebrow {
          position: relative;
          z-index: 2;
          margin: 0 0 18px;
          color: var(--cp-blue);
          font-size: 8px;
          font-weight: 700;
          line-height: 1;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .hero-title {
          position: relative;
          z-index: 2;
          max-width: 600px;
          margin: 0;
          font-size: clamp(54px, 6.2vw, 92px);
          line-height: 0.86;
          font-weight: 500;
          letter-spacing: -0.075em;
        }

        .hero-title-line {
          display: block;
          overflow: hidden;
        }

        .hero-title-line span {
          display: block;
          transform: translateY(110%);
          animation:
            heroTextIn 1.1s
            cubic-bezier(0.16, 1, 0.3, 1)
            forwards;
        }

        .hero-title-line:nth-child(2) span {
          animation-delay: 0.1s;
        }

        .hero-title-line:nth-child(3) span {
          animation-delay: 0.2s;
        }

        .hero-title em {
          font-family: Georgia, serif;
          font-weight: 400;
          letter-spacing: -0.06em;
        }

        .hero-description {
          position: relative;
          z-index: 2;
          max-width: 390px;
          margin: 28px 0 0;
          color: var(--cp-muted);
          font-size: 12px;
          line-height: 1.7;
          opacity: 0;
          transform: translateY(20px);
          animation:
            fadeUp 1s 0.55s
            cubic-bezier(0.16, 1, 0.3, 1)
            forwards;
        }

        .hero-explore {
          position: relative;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-top: 25px;
          color: var(--cp-ink);
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(20px);
          animation:
            fadeUp 1s 0.7s
            cubic-bezier(0.16, 1, 0.3, 1)
            forwards;
        }

        .hero-explore-line {
          width: 34px;
          height: 1px;
          background: var(--cp-blue);
        }

        /* =====================================================
           HERO VISUAL
        ===================================================== */

        .hero-visual {
          position: relative;
          height: min(610px, 70vh);
          min-height: 470px;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1200px;
        }

        .hero-image-wrap {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          transform:
            translate3d(
              calc(var(--cursor-x) * 16px),
              calc(var(--cursor-y) * 12px),
              0
            );
          transition:
            transform 0.5s
            cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow:
            0 35px 75px
            rgba(7, 23, 43, 0.17);
        }

        .hero-image {
          position: absolute;
          inset: -5%;
          width: 110%;
          height: 110%;
          object-fit: cover;
          object-position: center;
          animation:
            heroImageScale 13s
            ease-in-out infinite alternate;
        }

        .hero-image-overlay {
          position: absolute;
          inset: 0;
          z-index: 2;
          background:
            linear-gradient(
              100deg,
              rgba(7, 23, 43, 0.52),
              rgba(7, 23, 43, 0.14) 60%,
              rgba(18, 63, 122, 0.08)
            );
          pointer-events: none;
        }

        .hero-image-light {
          position: absolute;
          z-index: 3;
          inset: 0;
          background:
            linear-gradient(
              115deg,
              transparent 25%,
              rgba(255, 255, 255, 0.15) 50%,
              transparent 70%
            );
          transform: translateX(-120%);
          animation:
            imageLight 8s
            ease-in-out infinite;
          pointer-events: none;
        }

        .hero-image-top {
          position: absolute;
          z-index: 5;
          top: 23px;
          left: 25px;
          right: 25px;
          display: flex;
          justify-content: space-between;
          color: rgba(255, 255, 255, 0.68);
          font-size: 7px;
          letter-spacing: 0.17em;
          text-transform: uppercase;
        }

        .hero-image-title {
          position: absolute;
          z-index: 5;
          left: 28px;
          bottom: 30px;
          color: white;
        }

        .hero-image-title small {
          display: block;
          margin-bottom: 7px;
          font-size: 7px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          opacity: 0.65;
        }

        .hero-image-title strong {
          display: block;
          font-size: clamp(31px, 4vw, 58px);
          line-height: 0.9;
          letter-spacing: -0.06em;
          font-weight: 500;
        }

        /* =====================================================
           FLOATING LABELS
        ===================================================== */

        .hero-float {
          position: absolute;
          z-index: 15;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 11px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(12px);
          box-shadow:
            0 15px 35px
            rgba(7, 23, 43, 0.12);
          color: var(--cp-ink);
          font-size: 7px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .hero-float-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--cp-blue);
        }

        .hero-float-one {
          top: 11%;
          left: -30px;
          animation:
            floatOne 5s
            ease-in-out infinite;
        }

        .hero-float-two {
          right: -22px;
          bottom: 18%;
          animation:
            floatTwo 6s
            ease-in-out infinite;
        }

        .hero-vertical {
          position: absolute;
          right: -38px;
          top: 50%;
          display: flex;
          align-items: center;
          gap: 8px;
          writing-mode: vertical-rl;
          transform: translateY(-50%);
          color: #7b838d;
          font-size: 7px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .hero-vertical::before {
          content: "";
          width: 1px;
          height: 38px;
          background: var(--cp-blue);
        }

        .hero-scroll {
          position: absolute;
          bottom: 18px;
          left: 50%;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          color: #7d858e;
          font-size: 7px;
          letter-spacing: 0.17em;
          text-transform: uppercase;
          transform: translateX(-50%);
        }

        .hero-scroll svg {
          animation:
            scrollArrow 2s
            ease-in-out infinite;
        }

        /* =====================================================
           INTRO
        ===================================================== */

        .industry-intro {
          position: relative;
          min-height: 510px;
          display: flex;
          align-items: center;
          padding: 90px 0;
          background: var(--cp-dark);
          color: white;
          overflow: hidden;
        }

        .industry-intro-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          background:
            linear-gradient(
              90deg,
              rgba(7, 23, 43, 0.95) 0%,
              rgba(7, 23, 43, 0.86) 28%,
              rgba(7, 23, 43, 0.67) 58%,
              rgba(7, 23, 43, 0.72) 100%
            ),
            url("/images/industries/industry-reality.jpg")
              center center / cover no-repeat;
          transform: scale(1.03);
          animation:
            introImageScale 14s
            ease-in-out infinite alternate;
          pointer-events: none;
        }

        .industry-intro::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            linear-gradient(
              180deg,
              rgba(7, 23, 43, 0.14),
              rgba(7, 23, 43, 0.34)
            );
          pointer-events: none;
        }

        .intro-grid {
          position: relative;
          z-index: 5;
          display: grid;
          grid-template-columns: 0.45fr 1.55fr;
          gap: 50px;
          align-items: start;
        }

        .intro-index {
          color: rgba(255, 255, 255, 0.4);
          font-size: 8px;
          line-height: 1.6;
          letter-spacing: 0.17em;
          text-transform: uppercase;
        }

        .intro-content {
          max-width: 1000px;
        }

        .intro-title {
          max-width: 900px;
          margin: 0;
          font-size: clamp(42px, 5.7vw, 82px);
          line-height: 0.91;
          font-weight: 400;
          letter-spacing: -0.065em;
          text-shadow:
            0 8px 30px rgba(0, 0, 0, 0.2);
        }

        .intro-title em {
          font-family: Georgia, serif;
          font-weight: 400;
        }

        .intro-copy {
          max-width: 570px;
          margin: 38px 0 0;
          color: rgba(255, 255, 255, 0.67);
          font-size: 13px;
          line-height: 1.75;
        }

        .intro-line {
          width: 100%;
          height: 1px;
          margin-top: 45px;
          background: rgba(255, 255, 255, 0.16);
          overflow: hidden;
        }

        .intro-line::after {
          content: "";
          display: block;
          width: 30%;
          height: 100%;
          background: rgba(255, 255, 255, 0.7);
          animation:
            introLine 5s
            ease-in-out infinite;
        }

        .intro-number {
          position: absolute;
          z-index: 3;
          right: -30px;
          bottom: -120px;
          font-size: 370px;
          line-height: 1;
          letter-spacing: -0.13em;
          color: rgba(255, 255, 255, 0.035);
          pointer-events: none;
        }

        /* =====================================================
           APPLICATION ENVIRONMENTS
           REDUCED SECTION + FASTER PAGE TURNING
        ===================================================== */

        .industry-explorer {
          position: relative;
          padding: 48px 0 45px;
          background: var(--cp-paper);
        }

        .explorer-top {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 40px;
          margin-bottom: 25px;
        }

        .explorer-heading {
          max-width: 820px;
          min-width: 0;
        }

        .explorer-heading .eyebrow {
          margin-bottom: 11px;
        }

        .explorer-heading h2 {
          margin: 0;
          font-size: clamp(38px, 4.3vw, 62px);
          line-height: 0.86;
          letter-spacing: -0.07em;
          font-weight: 500;
        }

        .explorer-heading h2 em {
          font-family: Georgia, serif;
          font-weight: 400;
        }

        .explorer-note {
          width: 230px;
          flex: 0 0 230px;
          margin: 0 0 1px;
          color: var(--cp-muted);
          font-size: 8.5px;
          line-height: 1.55;
        }

        /* =====================================================
           COMPACT AUTOMATIC VISUAL FIELD
        ===================================================== */

        .industry-page-field {
          position: relative;
          width: 100%;
          height: min(510px, 48vw);
          min-height: 360px;
          perspective: 1800px;
          overflow: visible;
        }

        .industry-page-stage {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: #cfd2d3;
          box-shadow:
            0 25px 55px
            rgba(7, 23, 43, 0.16);
          transform-style: preserve-3d;
        }

        /*
          Current image.

          The page folds away from the right side.
        */

        .industry-page-image {
          position: absolute;
          inset: 0;
          z-index: 2;

          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;

          transform-origin: right center;

          transform:
            rotateY(0deg)
            translateZ(0)
            scale(1.03);

          opacity: 1;

          transition:
            transform 0.55s
              cubic-bezier(0.76, 0, 0.24, 1),
            opacity 0.16s ease;
        }

        .industry-page-image.turning {
          transform:
            rotateY(-92deg)
            translateZ(28px)
            scale(1.015);

          opacity: 0.18;
        }

        /*
          Incoming image.

          It remains behind the current page and
          becomes visible as the page turns.
        */

        .industry-page-under {
          position: absolute;
          inset: 0;
          z-index: 1;

          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;

          transform:
            scale(1.06)
            translateX(1.5%);

          filter: brightness(0.88);

          transition:
            transform 0.65s
              cubic-bezier(0.16, 1, 0.3, 1),
            filter 0.55s ease;
        }

        .industry-page-image:not(.turning)
          + .industry-page-under {
          transform:
            scale(1.03)
            translateX(0);

          filter: brightness(1);
        }

        /* =====================================================
           PAGE SHADOW
        ===================================================== */

        .page-turn-shadow {
          position: absolute;
          z-index: 7;
          top: 0;
          right: 0;
          width: 25%;
          height: 100%;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(0, 0, 0, 0.13)
            );

          transform-origin: right center;
          opacity: 0;

          pointer-events: none;
        }

        .industry-page-image.turning
          ~ .page-turn-shadow {
          opacity: 1;

          animation:
            pageShadow 0.55s
            cubic-bezier(0.76, 0, 0.24, 1);
        }

        /* =====================================================
           IMAGE OVERLAYS
        ===================================================== */

        .page-visual-overlay {
          position: absolute;
          inset: 0;
          z-index: 3;

          background:
            linear-gradient(
              180deg,
              rgba(7, 23, 43, 0.05) 0%,
              rgba(7, 23, 43, 0.08) 35%,
              rgba(7, 23, 43, 0.83) 100%
            );

          pointer-events: none;
        }

        .page-visual-light {
          position: absolute;
          z-index: 4;
          inset: 0;

          background:
            linear-gradient(
              115deg,
              transparent 20%,
              rgba(65, 157, 230, 0.09) 50%,
              transparent 75%
            );

          transform: translateX(-110%);

          animation:
            pageLight 6s
            ease-in-out infinite;

          pointer-events: none;
        }

        /* =====================================================
           TOP LABELS
        ===================================================== */

        .page-top-labels {
          position: absolute;
          z-index: 10;
          top: 20px;
          left: 24px;
          right: 24px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          color: rgba(255, 255, 255, 0.7);
          font-size: 6.5px;
          letter-spacing: 0.17em;
          text-transform: uppercase;
        }

        /* =====================================================
           BOTTOM INFORMATION
        ===================================================== */

        .page-content {
          position: absolute;
          z-index: 10;
          left: 28px;
          right: 28px;
          bottom: 25px;

          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 40px;

          color: white;
        }

        .page-content-main {
          max-width: 650px;
        }

        .page-number {
          margin-bottom: 8px;
          color: rgba(255, 255, 255, 0.62);
          font-size: 6.5px;
          letter-spacing: 0.17em;
          text-transform: uppercase;
        }

        .page-title {
          margin: 0;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: clamp(36px, 4.2vw, 62px);
          line-height: 0.88;
          font-weight: 400;
          letter-spacing: -0.06em;
        }

        .page-copy {
          max-width: 480px;
          margin: 12px 0 0;

          color: rgba(255, 255, 255, 0.7);

          font-size: 10px;
          line-height: 1.6;
        }

        .page-tag {
          flex: 0 0 auto;

          padding: 7px 10px;

          border: 1px solid
            rgba(255, 255, 255, 0.3);

          color: rgba(255, 255, 255, 0.85);

          font-size: 5.5px;
          line-height: 1.3;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        /* =====================================================
           PROGRESS
        ===================================================== */

        .industry-progress {
          position: absolute;
          z-index: 20;
          right: 20px;
          top: 50%;

          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;

          transform: translateY(-50%);
        }

        .progress-number {
          color: white;
          font-size: 6.5px;
          letter-spacing: 0.12em;
          text-shadow:
            0 3px 12px rgba(0, 0, 0, 0.3);
        }

        .progress-line {
          position: relative;
          width: 1px;
          height: 90px;
          background: rgba(255, 255, 255, 0.25);
          overflow: hidden;
        }

        .progress-fill {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;

          background: white;

          animation:
            progressFill 2.5s
            linear infinite;
        }

        /* =====================================================
           CORNER FRAME
        ===================================================== */

        .page-corner {
          position: absolute;
          z-index: 12;
          top: 19px;
          right: 19px;
          width: 36px;
          height: 36px;
          border-top: 1px solid
            rgba(255, 255, 255, 0.28);
          border-right: 1px solid
            rgba(255, 255, 255, 0.28);
          pointer-events: none;
        }

        .page-text-change {
          animation:
            pageTextIn 0.6s
            cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* =====================================================
           MOVING BAND
        ===================================================== */

        .industry-band {
          position: relative;
          padding: 42px 0;
          background: #e7e5df;
          overflow: hidden;
        }

        .band-track {
          display: flex;
          align-items: center;
          width: max-content;
          gap: 32px;
          animation:
            marquee 28s linear infinite;
          will-change: transform;
        }

        .band-track span {
          font-size: clamp(30px, 3.8vw, 58px);
          line-height: 0.9;
          font-weight: 500;
          letter-spacing: -0.075em;
        }

        .band-track em {
          font-family: Georgia, serif;
          font-weight: 400;
        }

        .band-dot {
          width: 6px;
          height: 6px;
          flex: 0 0 auto;
          border-radius: 50%;
          background: var(--cp-blue);
        }

        /* =====================================================
           CTA
        ===================================================== */

        .industry-cta {
          position: relative;
          min-height: 500px;
          display: flex;
          align-items: center;
          padding: 90px 0;

          background:
            linear-gradient(
              90deg,
              rgba(7, 23, 43, 0.97) 0%,
              rgba(7, 23, 43, 0.91) 35%,
              rgba(7, 23, 43, 0.72) 62%,
              rgba(7, 23, 43, 0.58) 100%
            ),
            url("/images/industries/cta-intelligence.png")
              center center / cover no-repeat;

          color: white;
          overflow: hidden;
        }

        .industry-cta::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 1;

          background:
            linear-gradient(
              115deg,
              transparent 18%,
              rgba(44, 143, 231, 0.035) 38%,
              rgba(44, 143, 231, 0.09) 52%,
              transparent 72%
            );

          transform: translateX(-30%);

          animation:
            ctaLightMove 10s
            ease-in-out infinite;

          pointer-events: none;
        }

        .industry-cta::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 2;

          background:
            radial-gradient(
              circle at 76% 48%,
              rgba(18, 91, 170, 0.16),
              transparent 35%
            ),
            linear-gradient(
              180deg,
              rgba(7, 23, 43, 0.04),
              rgba(7, 23, 43, 0.18)
            );

          pointer-events: none;
        }

        .cta-grid {
          position: relative;
          z-index: 5;

          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 75px;
          align-items: end;
        }

        .cta-title {
          margin: 0;

          color: white;

          font-size: clamp(55px, 7.5vw, 112px);
          line-height: 0.82;
          letter-spacing: -0.08em;
          font-weight: 500;

          text-shadow:
            0 8px 30px rgba(0, 0, 0, 0.24);
        }

        .cta-title em {
          font-family: Georgia, serif;
          font-weight: 400;
        }

        .cta-side {
          max-width: 310px;
        }

        .cta-side p {
          margin: 0 0 23px;

          color: rgba(255, 255, 255, 0.68);

          font-size: 12px;
          line-height: 1.7;

          text-shadow:
            0 4px 18px rgba(0, 0, 0, 0.22);
        }

        .cta-button {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 11px;

          padding: 13px 18px;

          overflow: hidden;

          background: #123f7a;
          color: white;

          text-decoration: none;

          font-size: 8px;
          letter-spacing: 0.13em;
          text-transform: uppercase;

          box-shadow:
            0 12px 28px
            rgba(0, 0, 0, 0.22);

          transition:
            transform 0.35s ease,
            background 0.35s ease,
            box-shadow 0.35s ease;
        }

        .cta-button::before {
          content: "";
          position: absolute;
          inset: 0;

          background: #07172b;

          transform: translateX(-101%);

          transition:
            transform 0.45s
            cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cta-button span,
        .cta-button svg {
          position: relative;
          z-index: 2;
        }

        .cta-button:hover {
          transform: translateY(-4px);

          box-shadow:
            0 18px 36px
            rgba(0, 0, 0, 0.3);
        }

        .cta-button:hover::before {
          transform: translateX(0);
        }

        .cta-plus {
          position: absolute;
          right: -60px;
          top: 25%;
          z-index: 3;

          color: white;
          opacity: 0.045;

          transform:
            translateY(
              calc(var(--scroll-factor) * -0.08px)
            )
            rotate(20deg);

          transition:
            transform 0.1s linear;
        }

        /* =====================================================
           REVEALS
        ===================================================== */

        .industry-reveal {
          opacity: 0;
          transform: translateY(45px);
          transition:
            opacity 1s ease,
            transform 1.1s
              cubic-bezier(0.16, 1, 0.3, 1);
        }

        .industry-reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* =====================================================
           ANIMATIONS
        ===================================================== */

        @keyframes heroTextIn {
          from {
            transform: translateY(110%);
          }

          to {
            transform: translateY(0);
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heroImageScale {
          from {
            transform: scale(1.03);
          }

          to {
            transform: scale(1.09);
          }
        }

        @keyframes imageLight {
          0%,
          30% {
            transform: translateX(-120%);
          }

          60%,
          100% {
            transform: translateX(120%);
          }
        }

        @keyframes floatOne {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(8px, -14px, 0);
          }
        }

        @keyframes floatTwo {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(-10px, 12px, 0);
          }
        }

        @keyframes scrollArrow {
          0%,
          100% {
            transform: translateY(0);
            opacity: 0.5;
          }

          50% {
            transform: translateY(5px);
            opacity: 1;
          }
        }

        @keyframes introLine {
          0% {
            transform: translateX(-110%);
          }

          50%,
          100% {
            transform: translateX(350%);
          }
        }

        @keyframes introImageScale {
          from {
            transform: scale(1.03);
          }

          to {
            transform: scale(1.08);
          }
        }

        /* =====================================================
           FASTER PAGE TURN
        ===================================================== */

        @keyframes pageShadow {
          0% {
            opacity: 0;
            transform: translateX(0);
          }

          25% {
            opacity: 0.75;
          }

          100% {
            opacity: 0;
            transform: translateX(-70%);
          }
        }

        @keyframes pageTextIn {
          from {
            opacity: 0;
            transform: translateY(16px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pageLight {
          0%,
          25% {
            transform: translateX(-110%);
          }

          60%,
          100% {
            transform: translateX(110%);
          }
        }

        @keyframes progressFill {
          from {
            height: 0%;
          }

          to {
            height: 100%;
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

        @keyframes ctaLightMove {
          0% {
            transform: translateX(-35%);
            opacity: 0;
          }

          25% {
            opacity: 0.3;
          }

          50% {
            opacity: 0.9;
          }

          75% {
            opacity: 0.35;
          }

          100% {
            transform: translateX(35%);
            opacity: 0;
          }
        }

        /* =====================================================
           TABLET
        ===================================================== */

        @media (max-width: 1000px) {
          .container {
            width: min(100% - 40px, 1380px);
          }

          .industry-hero {
            min-height: auto;
            padding: 55px 0 70px;
          }

          .hero-layout {
            min-height: auto;
            grid-template-columns: 1fr;
            gap: 45px;
          }

          .hero-copy {
            padding-left: 15px;
          }

          .hero-visual {
            height: 520px;
            min-height: 0;
          }

          .hero-float-one {
            left: 10px;
          }

          .hero-float-two {
            right: 10px;
          }

          .hero-vertical {
            right: -5px;
          }

          .industry-intro {
            min-height: auto;
            padding: 90px 0;
          }

          .industry-intro-bg {
            background-position: center center;
          }

          .intro-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }

          .intro-content {
            max-width: 850px;
          }

          /*
            Reduced Section 3 on tablet
          */

          .industry-explorer {
            padding: 45px 0 45px;
          }

          .explorer-top {
            align-items: flex-start;
            flex-direction: column;
            gap: 15px;
            margin-bottom: 22px;
          }

          .explorer-note {
            width: auto;
            max-width: 450px;
            flex: none;
          }

          .industry-page-field {
            height: 430px;
            min-height: 0;
          }

          .page-content {
            left: 23px;
            right: 23px;
            bottom: 23px;
          }

          .page-title {
            font-size: 48px;
          }

          .page-copy {
            max-width: 440px;
          }

          .industry-progress {
            right: 16px;
          }

          .industry-cta {
            min-height: auto;
            padding: 90px 0;
          }

          .cta-grid {
            grid-template-columns: 1fr;
            gap: 45px;
          }

          .cta-side {
            max-width: 500px;
          }
        }

        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 650px) {
          .container {
            width: calc(100% - 30px);
          }

          .industry-topbar {
            height: 60px;
          }

          .industry-topbar-right {
            display: none;
          }

          .industry-hero {
            padding: 40px 0 60px;
          }

          .hero-layout {
            gap: 38px;
          }

          .hero-copy {
            padding-left: 0;
          }

          .hero-index {
            left: -8px;
            top: -45px;
            font-size: 95px;
          }

          .hero-title {
            font-size: clamp(50px, 15vw, 82px);
          }

          .hero-description {
            margin-top: 25px;
            font-size: 11px;
            line-height: 1.65;
          }

          .hero-explore {
            margin-top: 23px;
          }

          .hero-visual {
            height: 390px;
          }

          .hero-image-wrap {
            transform: none;
          }

          .hero-image-top {
            top: 17px;
            left: 17px;
            right: 17px;
            font-size: 6px;
          }

          .hero-image-title {
            left: 19px;
            bottom: 21px;
          }

          .hero-image-title strong {
            font-size: 32px;
          }

          .hero-float {
            padding: 7px 9px;
            font-size: 6px;
          }

          .hero-float-one {
            left: 4px;
            top: 8%;
          }

          .hero-float-two {
            right: 4px;
            bottom: 12%;
          }

          .hero-vertical {
            display: none;
          }

          .hero-scroll {
            display: none;
          }

          .industry-intro {
            padding: 75px 0;
          }

          .industry-intro-bg {
            background:
              linear-gradient(
                90deg,
                rgba(7, 23, 43, 0.94),
                rgba(7, 23, 43, 0.76)
              ),
              url("/images/industries/industry-reality.jpg")
                center center / cover no-repeat;
          }

          .intro-title {
            font-size: clamp(43px, 13vw, 72px);
          }

          .intro-copy {
            margin-top: 30px;
            font-size: 12px;
            line-height: 1.7;
          }

          .intro-line {
            margin-top: 35px;
          }

          .intro-number {
            right: -20px;
            bottom: -40px;
            font-size: 210px;
          }

          /*
            Compact Section 3 on mobile
          */

          .industry-explorer {
            padding: 42px 0 42px;
          }

          .explorer-top {
            margin-bottom: 20px;
          }

          .explorer-heading h2 {
            font-size: clamp(36px, 10.5vw, 58px);
          }

          .explorer-note {
            font-size: 8.5px;
          }

          .industry-page-field {
            height: 350px;
            min-height: 0;
          }

          .industry-page-stage {
            box-shadow:
              0 20px 42px
              rgba(7, 23, 43, 0.15);
          }

          .page-top-labels {
            top: 15px;
            left: 15px;
            right: 15px;
            font-size: 5.2px;
          }

          .page-corner {
            top: 15px;
            right: 15px;
            width: 29px;
            height: 29px;
          }

          .page-content {
            left: 16px;
            right: 16px;
            bottom: 16px;
            display: block;
          }

          .page-number {
            margin-bottom: 6px;
            font-size: 5.7px;
          }

          .page-title {
            font-size: 34px;
            line-height: 0.9;
          }

          .page-copy {
            max-width: 88%;
            margin-top: 8px;
            font-size: 8px;
            line-height: 1.5;
          }

          .page-tag {
            display: inline-flex;
            margin-top: 8px;
            font-size: 4.8px;
            padding: 5px 7px;
          }

          .industry-progress {
            right: 10px;
            top: 45%;
          }

          .progress-line {
            height: 68px;
          }

          .progress-number {
            font-size: 5.8px;
          }

          .industry-band {
            padding: 60px 0;
          }

          .band-track {
            gap: 32px;
          }

          .band-track span {
            font-size: 42px;
          }

          .band-dot {
            width: 6px;
            height: 6px;
          }

          .industry-cta {
            min-height: auto;
            padding: 75px 0 90px;
            background-position: 62% center;
          }

          .cta-title {
            font-size: clamp(52px, 15vw, 88px);
          }

          .cta-side p {
            font-size: 11px;
          }

          .cta-plus {
            right: -40px;
          }
        }

        /* =====================================================
           VERY SMALL MOBILE
        ===================================================== */

        @media (max-width: 430px) {
          .industry-page-field {
            height: 325px;
          }

          .page-title {
            font-size: 31px;
          }

          .page-copy {
            font-size: 7.6px;
          }

          .industry-progress {
            right: 8px;
          }

          .progress-line {
            height: 58px;
          }
        }

        /* =====================================================
           REDUCED MOTION
        ===================================================== */

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      {/* =====================================================
          TOP BAR
      ===================================================== */}

      <div className="container">
        <div className="industry-topbar">
          <div className="industry-topbar-left">
            <span className="industry-dot" />

            <span>
              Colourplus / Industries
            </span>
          </div>

          <div className="industry-topbar-right">
            <span>
              Engineered Surfaces
            </span>

            <span>/</span>

            <span>
              India
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="industry-hero">
        <div className="container">
          <div className="hero-layout">

            <div className="hero-copy">
              <div className="hero-index">
                01
              </div>

              <p className="eyebrow">
                01 / Industry Intelligence
              </p>

              <h1 className="hero-title">

                <span className="hero-title-line">
                  <span>
                    Different
                  </span>
                </span>

                <span className="hero-title-line">
                  <span>
                    industries.
                  </span>
                </span>

                <span className="hero-title-line">
                  <span>
                    <em>
                      Different demands.
                    </em>
                  </span>
                </span>

              </h1>

              <p className="hero-description">
                Every operating environment places different demands on the
                surface beneath it. Colourplus approaches each application
                through its conditions, performance requirements and
                long-term use.
              </p>

              <div className="hero-explore">
                <span className="hero-explore-line" />

                <span>
                  Explore the environments
                </span>

                <ArrowRight size={13} />
              </div>
            </div>

            <div
              className="hero-visual"
              style={
                {
                  "--cursor-x": cursor.x,
                  "--cursor-y": cursor.y,
                } as React.CSSProperties
              }
            >
              <div className="hero-image-wrap">

                <img
                  src="/images/industries/industry-intelligence.jpg"
                  alt="Colourplus engineered surfaces across different industries"
                  className="hero-image"
                />

                <div className="hero-image-overlay" />

                <div className="hero-image-light" />

                <div className="hero-image-top">
                  <span>
                    COLOURPLUS / INDUSTRY FIELD
                  </span>

                  <span>
                    01 / 09
                  </span>
                </div>

                <div className="hero-image-title">
                  <small>
                    Application environments
                  </small>

                  <strong>
                    Industry Intelligence
                  </strong>
                </div>

              </div>

              <div className="hero-float hero-float-one">
                <span className="hero-float-dot" />

                <span>
                  Multiple environments / One approach
                </span>
              </div>

              <div className="hero-float hero-float-two">
                <span>
                  Surface intelligence
                </span>

                <span className="hero-float-dot" />
              </div>

              <div className="hero-vertical">
                Industry intelligence
              </div>
            </div>

          </div>
        </div>

        <div className="hero-scroll">
          <span>
            Scroll
          </span>

          <ArrowDown size={12} />
        </div>
      </section>

      {/* =====================================================
          INTRO
      ===================================================== */}

      <section className="industry-intro industry-reveal">

        <div
          className="industry-intro-bg"
          aria-hidden="true"
        />

        <div className="container intro-grid">

          <div className="intro-index">
            02 / One surface.
            <br />
            Different realities.
          </div>

          <div className="intro-content">

            <h2 className="intro-title">
              Performance changes when
              <br />
              <em>
                the environment changes.
              </em>
            </h2>

            <p className="intro-copy">
              Colourplus solutions are positioned across warehouses and
              logistics hubs, retail and hospitality, healthcare,
              pharmaceutical and clean-room environments, textiles,
              packaging and FMCG, automotive and heavy engineering,
              food and beverage processing, and IT, R&D and data-centre
              environments.
            </p>

            <div className="intro-line" />

          </div>
        </div>

        <div className="intro-number">
          02
        </div>

      </section>

      {/* =====================================================
          APPLICATION ENVIRONMENTS
          AUTOMATIC PAGE TURNING
      ===================================================== */}

      <section className="industry-explorer">

        <div className="container">

          <div className="explorer-top industry-reveal">

            <div className="explorer-heading">

              <p className="eyebrow">
                03 / Application Environments
              </p>

              <h2>
                Nine environments.
                <br />
                <em>
                  One engineered approach.
                </em>
              </h2>

            </div>

            <p className="explorer-note">
              A continuously changing visual field across the environments
              where Colourplus engineered surfaces are applied.
            </p>

          </div>

          <div className="industry-page-field">

            <div className="industry-page-stage">

              {/* =================================================
                  CURRENT IMAGE
              ================================================= */}

              <div
                key={`current-${current.no}`}
                className={`industry-page-image ${
                  isTurning ? "turning" : ""
                }`}
                style={{
                  backgroundImage: `url("${current.image}")`,
                }}
              />

              {/* =================================================
                  NEXT IMAGE / UNDERLAY
              ================================================= */}

              <div
                className="industry-page-under"
                style={{
                  backgroundImage: `
                    linear-gradient(
                      180deg,
                      rgba(7,23,43,.08),
                      rgba(7,23,43,.65)
                    ),
                    url("${next.image}")
                  `,
                }}
              />

              {/* =================================================
                  OVERLAYS
              ================================================= */}

              <div className="page-visual-overlay" />

              <div className="page-visual-light" />

              <div className="page-turn-shadow" />

              {/* =================================================
                  TOP LABELS
              ================================================= */}

              <div className="page-top-labels">

                <span>
                  COLOURPLUS / INDUSTRY ENVIRONMENT
                </span>

                <span>
                  {current.no} / 09
                </span>

              </div>

              {/* =================================================
                  CORNER FRAME
              ================================================= */}

              <div className="page-corner" />

              {/* =================================================
                  CONTENT
              ================================================= */}

              <div
                key={`content-${current.no}`}
                className="page-content page-text-change"
              >

                <div className="page-content-main">

                  <div className="page-number">
                    {current.no} / INDUSTRY ENVIRONMENT
                  </div>

                  <h3 className="page-title">
                    {current.name}
                  </h3>

                  <p className="page-copy">
                    {current.description}
                  </p>

                  <span className="page-tag">
                    {current.short}
                  </span>

                </div>

              </div>

              {/* =================================================
                  PROGRESS
              ================================================= */}

              <div className="industry-progress">

                <span className="progress-number">
                  {current.no}
                </span>

                <div className="progress-line">
                  <span className="progress-fill" />
                </div>

                <span className="progress-number">
                  09
                </span>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =====================================================
          MOVING BAND
      ===================================================== */}

      <section className="industry-band">

        <div className="band-track">

          <span>
            Surface
          </span>

          <span className="band-dot" />

          <span>
            <em>
              Environment
            </em>
          </span>

          <span className="band-dot" />

          <span>
            Performance
          </span>

          <span className="band-dot" />

          <span>
            <em>
              Reality
            </em>
          </span>

          <span className="band-dot" />

          <span>
            Surface
          </span>

          <span className="band-dot" />

          <span>
            <em>
              Environment
            </em>
          </span>

          <span className="band-dot" />

          <span>
            Performance
          </span>

          <span className="band-dot" />

          <span>
            <em>
              Reality
            </em>
          </span>

        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section
        className="industry-cta"
        style={
          {
            "--scroll-factor": scrollY,
          } as React.CSSProperties
        }
      >

        <div className="container cta-grid industry-reveal">

          <div>

            <p className="eyebrow">
              04 / Start with the environment
            </p>

            <h2 className="cta-title">
              Your industry.
              <br />
              Your <em>surface.</em>
            </h2>

          </div>

          <div className="cta-side">

            <p>
              Tell Colourplus about the environment, operating conditions
              and surface requirements of your project.
            </p>

            <Link
              href="/contact"
              className="cta-button"
            >
              <span>
                Start a project
              </span>

              <MoveUpRight size={14} />
            </Link>

          </div>

        </div>

        <Plus
          className="cta-plus"
          size={170}
          strokeWidth={0.5}
        />

      </section>

    </main>
  );
}