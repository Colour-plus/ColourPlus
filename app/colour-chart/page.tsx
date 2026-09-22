"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Navbar from "@/components/Navbar";

type Colour = {
  code: string;
  name: string;
  hex: string;
};

/* ============================================================
   COLOURPLUS COLOUR CHART
   ============================================================ */

const colours: Colour[] = [
  {
    code: "CPL - 1001",
    name: "Beige",
    hex: "#D6B580",
  },
  {
    code: "CPL - 1002",
    name: "Sand Yellow",
    hex: "#EBC273",
  },
  {
    code: "CPL - 1003",
    name: "Signal Yellow",
    hex: "#F5C92B",
  },
  {
    code: "CPL - 1013",
    name: "Oyster White",
    hex: "#EDE0C7",
  },
  {
    code: "CPL - 1014",
    name: "Ivory",
    hex: "#EDD6A1",
  },

  {
    code: "CPL - 1015",
    name: "Light Ivory",
    hex: "#EDDEB5",
  },
  {
    code: "CPL - 2000",
    name: "Yellow Orange",
    hex: "#F29414",
  },
  {
    code: "CPL - 2010",
    name: "Signal Orange",
    hex: "#ED691F",
  },
  {
    code: "CPL - 3003",
    name: "Ruby Red",
    hex: "#9E241F",
  },
  {
    code: "CPL - 3004",
    name: "Purple Red",
    hex: "#6B241C",
  },

  {
    code: "CPL - 3014",
    name: "Antique Pink",
    hex: "#DB697D",
  },
  {
    code: "CPL - 4009",
    name: "Pastel Violet",
    hex: "#AB9CA3",
  },
  {
    code: "CPL - 5005",
    name: "Signal Blue",
    hex: "#005787",
  },
  {
    code: "CPL - 5012",
    name: "Light Blue",
    hex: "#0080B2",
  },
  {
    code: "CPL - 5015",
    name: "Sky Blue",
    hex: "#007ABA",
  },

  {
    code: "CPL - 5017",
    name: "Traffic Blue",
    hex: "#00668F",
  },
  {
    code: "CPL - 5024",
    name: "Pastel Blue",
    hex: "#3D8FB0",
  },
  {
    code: "CPL - 6001",
    name: "Emerald Green",
    hex: "#0D7A4A",
  },
  {
    code: "CPL - 6017",
    name: "May Green",
    hex: "#388A3D",
  },
  {
    code: "CPL - 6018",
    name: "Yellow Green",
    hex: "#52B04D",
  },

  {
    code: "CPL - 6024",
    name: "Traffic Green",
    hex: "#008C59",
  },
  {
    code: "CPL - 6025",
    name: "Fern Green",
    hex: "#408047",
  },
  {
    code: "CPL - 6027",
    name: "Light Green",
    hex: "#69C2BF",
  },
  {
    code: "CPL - 6029",
    name: "Mint Green",
    hex: "#008242",
  },
  {
    code: "CPL - 7001",
    name: "Silver Gray",
    hex: "#A3ADB2",
  },

  {
    code: "CPL - 7004",
    name: "Signal Grey",
    hex: "#A8A8A8",
  },
  {
    code: "CPL - 7023",
    name: "Concrete Grey",
    hex: "#788575",
  },
  {
    code: "CPL - 7032",
    name: "Pebble Grey",
    hex: "#B2B09C",
  },
  {
    code: "CPL - 7034",
    name: "Yellow Grey",
    hex: "#ABA67D",
  },
  {
    code: "CPL - 7035",
    name: "Light Gray",
    hex: "#D1D6D1",
  },

  {
    code: "CPL - 7040",
    name: "Window Grey",
    hex: "#96A1A3",
  },
  {
    code: "CPL - 7045",
    name: "Telegrey 1",
    hex: "#969C9E",
  },
  {
    code: "CPL - 7046",
    name: "Telegrey 2",
    hex: "#87969E",
  },
  {
    code: "CPL - 7047",
    name: "Telegrey 4",
    hex: "#D9D9D4",
  },
  {
    code: "CPL - 8002",
    name: "Signal Brown",
    hex: "#7A4A45",
  },

  {
    code: "CPL - 9001",
    name: "Cream",
    hex: "#F5F2E3",
  },
  {
    code: "CPL - 9002",
    name: "Grey White",
    hex: "#E3E6DB",
  },
  {
    code: "CPL - 202",
    name: "CPL 202",
    hex: "#75BA75",
  },
  {
    code: "CPL - 204",
    name: "CPL 204",
    hex: "#4F8F4A",
  },
  {
    code: "CPL - 607",
    name: "CPL 607",
    hex: "#616359",
  },
];

/* Future collections — intentionally hidden for now */

const luxuryPaintColours = [
  {
    code: "LP-001",
    name: "Pearl Mist",
    hex: "#D9D5CC",
  },
  {
    code: "LP-002",
    name: "Slate Grey",
    hex: "#777570",
  },
  {
    code: "LP-003",
    name: "Midnight Blue",
    hex: "#3D4C61",
  },
];

const limewashColours = [
  {
    code: "LW-001",
    name: "Soft Stone",
    hex: "#D7D0C2",
  },
  {
    code: "LW-002",
    name: "Warm Sand",
    hex: "#C5B79E",
  },
  {
    code: "LW-003",
    name: "Olive Mist",
    hex: "#9A9B82",
  },
];

export default function ColourChartPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  /*
   * Hero palette.
   * Preserved from the previous version.
   */

  const heroColours = [
    colours[3],
    colours[4],
    colours[0],
    colours[27],
    colours[22],
    colours[18],
    colours[20],
    colours[6],
    colours[7],
    colours[8],
    colours[13],
    colours[16],
  ];

  return (
    <>
      <Navbar />

      <main
        className={`colour-chart-page ${
          mounted ? "is-mounted" : ""
        }`}
      >

        {/* ========================================================
            SECTION 01 — HERO
            PRESERVED
           ======================================================== */}

        <section className="colour-hero">

          <div className="hero-background-grid" />

          <div className="hero-light hero-light-one" />
          <div className="hero-light hero-light-two" />

          <div className="hero-curve hero-curve-left" />
          <div className="hero-curve hero-curve-right" />

          <div className="container hero-container">

            <div className="hero-copy">

              <div className="hero-eyebrow">
                <span className="eyebrow-line" />

                <span>
                  EXPLORE OUR
                </span>
              </div>

              <h1>
                Colour
                <br />
                <span>Chart</span>
              </h1>

              <p>
                Discover a world of beautiful shades.
                Our colour chart helps you find the
                perfect tone for your space, mood
                and style.
              </p>

              <div className="hero-bottom-meta">
                <span>
                  COLOURPLUS POLYURETHANES PVT. LTD.
                </span>

                <span>
                  ENGINEERED SURFACES / INDIA
                </span>
              </div>

            </div>


            {/* ANIMATED HERO PALETTE */}

            <div className="hero-palette">

              <div className="palette-ring palette-ring-one" />
              <div className="palette-ring palette-ring-two" />

              <div className="palette-glow" />

              <div className="palette-fan">

                {heroColours.map((colour, index) => {

                  const angle =
                    -55 +
                    index *
                      (110 /
                        (heroColours.length - 1));

                  const style = {
                    "--angle": `${angle}deg`,
                    "--delay": `${index * 0.07}s`,
                    "--colour": colour.hex,
                  } as CSSProperties;

                  return (
                    <div
                      key={colour.code}
                      className="fan-card"
                      style={style}
                    >
                      <div className="fan-card-inner">

                        <div className="fan-surface">
                          <div className="fan-highlight" />
                        </div>

                      </div>
                    </div>
                  );
                })}

                <div className="fan-handle">
                  <span />
                </div>

              </div>

              <span className="orbit-dot orbit-dot-one" />
              <span className="orbit-dot orbit-dot-two" />
              <span className="orbit-dot orbit-dot-three" />
              <span className="orbit-dot orbit-dot-four" />

            </div>

          </div>


          <div className="hero-footer-line">

            <span>01</span>

            <div />

            <span>
              EXPLORE THE COLOUR COLLECTION
            </span>

          </div>

        </section>


        {/* ========================================================
            SECTION 02 — COLOUR COLLECTION
            REDESIGNED
           ======================================================== */}

        <section className="colour-section">

          {/* Animated background elements */}

          <div className="collection-orb collection-orb-one" />
          <div className="collection-orb collection-orb-two" />

          <div className="collection-wave" />


          <div className="container">

            {/* ----------------------------------------------------
                SECTION INTRO
               ---------------------------------------------------- */}

            <div className="collection-header">

              <div className="collection-kicker">

                <span />

                <strong>
                  OUR COLOUR COLLECTION
                </strong>

                <span />

              </div>

              <h2>
                Timeless Shades
                <br />
                <em>for Every Space</em>
              </h2>

              <p>
                Explore our carefully curated colour palette,
                designed to bring harmony, elegance and
                character to engineered surfaces.
              </p>

            </div>


            {/* ----------------------------------------------------
                COLOUR COLLECTION
               ---------------------------------------------------- */}

            <div className="colour-grid">

              {colours.map((colour, index) => {

                const style = {
                  "--colour": colour.hex,
                  "--delay": `${index * 45}ms`,
                  "--tilt":
                    index % 2 === 0
                      ? "-2deg"
                      : "2deg",
                } as CSSProperties;

                return (
                  <article
                    className="colour-item"
                    key={colour.code}
                    style={style}
                  >

                    {/* Small index */}

                    <span className="colour-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>


                    {/* Paint stroke */}

                    <div className="paint-stroke">

                      <div className="paint-body">

                        <div className="paint-highlight" />

                        <div className="paint-grain" />

                        <div className="paint-edge" />

                      </div>

                    </div>


                    {/* Colour details */}

                    <div className="colour-info">

                      <span className="colour-code">
                        {colour.code}
                      </span>

                      <h3>
                        {colour.name}
                      </h3>

                      <span className="colour-hex">
                        {colour.hex}
                      </span>

                    </div>

                  </article>
                );
              })}

            </div>


            {/* ----------------------------------------------------
                CUSTOM COLOUR MESSAGE
               ---------------------------------------------------- */}

            <div className="custom-colour">

              <div className="custom-line" />

              <div className="palette-icon">

                <span />
                <span />
                <span />
                <span />

              </div>

              <div className="custom-copy">

                <strong>
                  Custom colours also available
                </strong>

                <span>
                  We can customize colours to suit
                  specific project requirements.
                </span>

              </div>

              <div className="custom-line" />

            </div>

          </div>

        </section>


        {/* ========================================================
            FUTURE COLLECTIONS
            HIDDEN
           ======================================================== */}

        <div className="future-collections">

          <div>
            {luxuryPaintColours.map((item) => (
              <span key={item.code}>
                {item.name}
              </span>
            ))}
          </div>

          <div>
            {limewashColours.map((item) => (
              <span key={item.code}>
                {item.name}
              </span>
            ))}
          </div>

        </div>

      </main>


      <style jsx>{`

        /* ========================================================
           GLOBAL
           ======================================================== */

        .colour-chart-page {
          --navy: #102a46;
          --navy-dark: #081c31;
          --navy-mid: #193954;

          --cream: #f5f1e9;
          --cream-light: #faf8f3;

          --text: #102a46;
          --muted: #737b82;

          --gold: #c8aa73;

          position: relative;

          min-height: 100vh;

          overflow: hidden;

          background:
            var(--cream);

          color:
            var(--text);
        }


        .container {
          width:
            min(
              1380px,
              calc(100% - 120px)
            );

          margin:
            0 auto;
        }


        /* ========================================================
           HERO
           ======================================================== */

        .colour-hero {
          position: relative;

          min-height: 735px;

          overflow: hidden;

          display: flex;

          align-items: center;

          color: #fff;

          background:
            radial-gradient(
              circle at 75% 45%,
              rgba(
                72,
                112,
                145,
                .23
              ),
              transparent 32%
            ),
            linear-gradient(
              135deg,
              #071b2f 0%,
              #102a46 47%,
              #193854 100%
            );
        }


        .hero-background-grid {
          position: absolute;

          inset: 0;

          opacity: .055;

          background-image:
            linear-gradient(
              rgba(
                255,
                255,
                255,
                .45
              ) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(
                255,
                255,
                255,
                .45
              ) 1px,
              transparent 1px
            );

          background-size:
            90px 90px;

          mask-image:
            linear-gradient(
              to bottom,
              transparent,
              black 22%,
              black 72%,
              transparent
            );
        }


        .hero-light {
          position: absolute;

          border-radius: 50%;

          filter: blur(100px);

          pointer-events: none;
        }


        .hero-light-one {
          width: 350px;
          height: 350px;

          right: 8%;
          top: 5%;

          background:
            rgba(
              117,
              163,
              191,
              .12
            );

          animation:
            lightFloat
            8s
            ease-in-out
            infinite;
        }


        .hero-light-two {
          width: 250px;
          height: 250px;

          left: -90px;
          bottom: -80px;

          background:
            rgba(
              204,
              174,
              114,
              .07
            );

          animation:
            lightFloatReverse
            9s
            ease-in-out
            infinite;
        }


        .hero-curve {
          position: absolute;

          border-radius: 50%;

          pointer-events: none;
        }


        .hero-curve-left {
          width: 850px;
          height: 260px;

          left: -430px;
          bottom: -180px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              .08
            );

          transform:
            rotate(19deg);
        }


        .hero-curve-right {
          width: 800px;
          height: 300px;

          right: -430px;
          top: -200px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              .05
            );

          transform:
            rotate(-14deg);
        }


        .hero-container {
          position: relative;

          z-index: 5;

          width:
            min(
              1380px,
              calc(100% - 120px)
            );

          margin:
            0 auto;

          display: grid;

          grid-template-columns:
            .9fr 1.1fr;

          align-items: center;

          gap: 45px;

          padding:
            100px 0 90px;
        }


        /* ========================================================
           HERO TEXT
           ======================================================== */

        .hero-copy {
          max-width: 560px;

          position: relative;

          z-index: 10;
        }


        .hero-eyebrow {
          display: flex;

          align-items: center;

          gap: 14px;

          margin-bottom: 30px;

          color:
            rgba(
              255,
              255,
              255,
              .72
            );

          font-size: 10px;

          font-weight: 700;

          letter-spacing: .26em;
        }


        .eyebrow-line {
          width: 42px;
          height: 1px;

          background:
            var(--gold);
        }


        .hero-copy h1 {
          margin: 0;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(
              70px,
              7vw,
              112px
            );

          line-height: .88;

          font-weight: 400;

          letter-spacing:
            -.065em;
        }


        .hero-copy h1 span {
          color:
            #d8c6a2;
        }


        .hero-copy p {
          max-width: 455px;

          margin:
            36px 0 0;

          color:
            rgba(
              255,
              255,
              255,
              .72
            );

          font-size: 15px;

          line-height: 1.75;
        }


        .hero-bottom-meta {
          display: flex;

          gap: 27px;

          margin-top: 42px;

          color:
            rgba(
              255,
              255,
              255,
              .39
            );

          font-size: 8px;

          letter-spacing: .18em;
        }


        /* ========================================================
           HERO PALETTE
           ======================================================== */

        .hero-palette {
          position: relative;

          width: 620px;
          height: 510px;

          justify-self: end;

          display: flex;

          align-items: center;

          justify-content: center;
        }


        .palette-glow {
          position: absolute;

          width: 390px;
          height: 390px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(
                255,
                255,
                255,
                .13
              ),
              transparent 68%
            );

          filter: blur(3px);

          animation:
            paletteGlow
            5s
            ease-in-out
            infinite;
        }


        .palette-ring {
          position: absolute;

          border:
            1px solid
            rgba(
              215,
              190,
              141,
              .58
            );

          border-radius: 50%;

          pointer-events: none;
        }


        .palette-ring-one {
          width: 520px;
          height: 290px;

          transform:
            rotate(-18deg);

          animation:
            ringOne
            9s
            ease-in-out
            infinite;
        }


        .palette-ring-two {
          width: 390px;
          height: 490px;

          transform:
            rotate(31deg);

          border-color:
            rgba(
              255,
              255,
              255,
              .11
            );

          animation:
            ringTwo
            11s
            ease-in-out
            infinite;
        }


        .palette-fan {
          position: relative;

          width: 470px;
          height: 420px;
        }


        .fan-card {
          position: absolute;

          left: 50%;
          bottom: 28px;

          width: 92px;
          height: 300px;

          transform-origin:
            50% 100%;

          transform:
            translateX(-50%)
            rotate(var(--angle))
            translateY(75px);

          opacity: 0;

          animation:
            fanReveal
            1s
            cubic-bezier(
              .2,
              .8,
              .2,
              1
            )
            var(--delay)
            forwards,

            fanFloat
            5s
            ease-in-out
            calc(
              var(--delay) + 1s
            )
            infinite;
        }


        .fan-card-inner {
          position: absolute;

          inset: 0;

          border-radius:
            20px 20px
            7px 7px;

          padding: 3px;

          background:
            linear-gradient(
              90deg,
              rgba(
                255,
                255,
                255,
                .55
              ),
              rgba(
                255,
                255,
                255,
                0
              ),
              rgba(
                0,
                0,
                0,
                .15
              )
            );

          box-shadow:
            0 25px 40px
            rgba(
              0,
              0,
              0,
              .25
            );
        }


        .fan-surface {
          position: relative;

          width: 100%;
          height: 100%;

          border-radius:
            18px 18px
            5px 5px;

          overflow: hidden;

          background:
            linear-gradient(
              105deg,
              rgba(
                255,
                255,
                255,
                .52
              ),
              transparent 18%,
              transparent 78%,
              rgba(
                0,
                0,
                0,
                .15
              )
            ),
            var(--colour);
        }


        .fan-highlight {
          position: absolute;

          width: 65%;
          height: 13%;

          left: 10%;
          top: 5%;

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              .27
            );

          filter: blur(7px);
        }


        .fan-handle {
          position: absolute;

          left: 50%;
          bottom: -12px;

          width: 74px;
          height: 74px;

          transform:
            translateX(-50%);

          border-radius: 50%;

          background:
            linear-gradient(
              145deg,
              #f4ebda,
              #bcae94
            );

          box-shadow:
            0 15px 40px
            rgba(
              0,
              0,
              0,
              .38
            ),
            inset 7px 7px 14px
            rgba(
              255,
              255,
              255,
              .8
            );
        }


        .fan-handle span {
          position: absolute;

          width: 13px;
          height: 13px;

          left: 50%;
          top: 50%;

          transform:
            translate(
              -50%,
              -50%
            );

          border-radius: 50%;

          background:
            var(--navy);
        }


        .orbit-dot {
          position: absolute;

          width: 7px;
          height: 7px;

          border-radius: 50%;

          background:
            #d9bd87;

          box-shadow:
            0 0 20px
            rgba(
              217,
              189,
              135,
              .7
            );

          animation:
            orbitDot
            4s
            ease-in-out
            infinite;
        }


        .orbit-dot-one {
          top: 82px;
          right: 122px;
        }


        .orbit-dot-two {
          top: 185px;
          left: 57px;

          animation-delay: .7s;
        }


        .orbit-dot-three {
          right: 77px;
          bottom: 98px;

          animation-delay: 1.2s;
        }


        .orbit-dot-four {
          left: 105px;
          bottom: 143px;

          animation-delay: 1.8s;
        }


        .hero-footer-line {
          position: absolute;

          left: 48px;
          right: 48px;
          bottom: 25px;

          z-index: 8;

          display: flex;

          align-items: center;

          gap: 15px;

          color:
            rgba(
              255,
              255,
              255,
              .4
            );

          font-size: 8px;

          letter-spacing: .22em;
        }


        .hero-footer-line div {
          width: 65px;
          height: 1px;

          background:
            rgba(
              255,
              255,
              255,
              .2
            );
        }


        /* ========================================================
           SECTION 02 — NEW DESIGN
           ======================================================== */

        .colour-section {
          position: relative;

          overflow: hidden;

          padding:
            58px
            0
            48px;

          background:
            radial-gradient(
              circle at 10% 5%,
              rgba(
                215,
                199,
                169,
                .18
              ),
              transparent 25%
            ),
            radial-gradient(
              circle at 90% 25%,
              rgba(
                184,
                178,
                159,
                .11
              ),
              transparent 24%
            ),
            linear-gradient(
              180deg,
              #f8f5ee 0%,
              #f3efe6 100%
            );
        }


        /*
         * Very subtle moving light behind the colours.
         * This keeps the section visually alive without
         * making it distracting.
         */

        .collection-orb {
          position: absolute;

          border-radius: 50%;

          pointer-events: none;

          filter: blur(80px);

          opacity: .35;
        }


        .collection-orb-one {
          width: 330px;
          height: 330px;

          left: -150px;
          top: 240px;

          background:
            rgba(
              198,
              181,
              145,
              .17
            );

          animation:
            collectionOrbOne
            12s
            ease-in-out
            infinite;
        }


        .collection-orb-two {
          width: 300px;
          height: 300px;

          right: -140px;
          top: 520px;

          background:
            rgba(
              122,
              143,
              151,
              .13
            );

          animation:
            collectionOrbTwo
            15s
            ease-in-out
            infinite;
        }


        .collection-wave {
          position: absolute;

          width: 120%;
          height: 190px;

          left: -10%;
          top: 360px;

          border-radius: 50%;

          border-top:
            1px solid
            rgba(
              16,
              42,
              70,
              .045
            );

          transform:
            rotate(-2deg);

          pointer-events: none;

          animation:
            waveMove
            14s
            ease-in-out
            infinite;
        }


        /* ========================================================
           COLLECTION HEADER
           ======================================================== */

        .collection-header {
          position: relative;

          z-index: 3;

          text-align: center;

          max-width: 760px;

          margin:
            0 auto
            30px;
        }


        .collection-kicker {
          display: flex;

          align-items: center;

          justify-content: center;

          gap: 15px;

          margin-bottom: 12px;

          color:
            var(--navy);

          font-size: 8px;

          font-weight: 700;

          letter-spacing:
            .3em;
        }


        .collection-kicker span {
          width: 58px;
          height: 1px;

          background:
            #b5afa3;
        }


        .collection-header h2 {
          margin: 0;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(
              42px,
              4.1vw,
              62px
            );

          line-height:
            .94;

          font-weight: 400;

          letter-spacing:
            -.05em;

          color:
            var(--navy);
        }


        .collection-header h2 em {
          color:
            #777970;

          font-weight: 400;
        }


        .collection-header p {
          max-width: 650px;

          margin:
            16px auto 0;

          color:
            #737b80;

          font-size: 12px;

          line-height: 1.6;
        }


        /* ========================================================
           COLOUR GRID
           ======================================================== */

        .colour-grid {
          position: relative;

          z-index: 3;

          display: grid;

          /*
           * Six columns gives the section the compact,
           * premium catalogue rhythm of the reference.
           */

          grid-template-columns:
            repeat(
              6,
              minmax(0, 1fr)
            );

          column-gap: 25px;

          row-gap: 20px;

          padding:
            6px
            0
            0;
        }


        .colour-item {
          position: relative;

          min-width: 0;

          padding:
            3px
            0
            5px;

          opacity: 0;

          animation:
            colourReveal
            .7s
            cubic-bezier(
              .2,
              .8,
              .2,
              1
            )
            var(--delay)
            forwards;
        }


        /*
         * Tiny editorial number.
         * Very subtle — not a card navigation element.
         */

        .colour-index {
          position: absolute;

          top: 0;
          right: 1px;

          color:
            rgba(
              16,
              42,
              70,
              .24
            );

          font-size: 7px;

          font-weight: 700;

          letter-spacing:
            .12em;

          opacity: 0;

          transform:
            translateY(4px);

          transition:
            opacity .35s ease,
            transform .35s ease;
        }


        .colour-item:hover
          .colour-index {
          opacity: 1;

          transform:
            translateY(0);
        }


        /* ========================================================
           PAINT STROKE
           ======================================================== */

        .paint-stroke {
          position: relative;

          height: 76px;

          display: flex;

          align-items: center;

          justify-content: center;

          perspective:
            700px;
        }


        .paint-body {
          position: relative;

          width: 94%;

          height: 66px;

          overflow: hidden;

          background:
            var(--colour);

          border-radius:
            19px
            30px
            17px
            29px;

          transform:
            rotate(var(--tilt));

          box-shadow:
            0
            12px
            20px
            rgba(
              26,
              37,
              46,
              .12
            ),

            inset
            0
            1px
            0
            rgba(
              255,
              255,
              255,
              .4
            );

          transition:
            transform
            .5s
            cubic-bezier(
              .2,
              .8,
              .2,
              1
            ),

            box-shadow
            .5s ease;
        }


        /*
         * Different organic shapes prevent the grid
         * from feeling like repeated rectangular cards.
         */

        .colour-item:nth-child(3n)
          .paint-body {
          border-radius:
            32px
            18px
            30px
            15px;
        }


        .colour-item:nth-child(4n)
          .paint-body {
          border-radius:
            14px
            34px
            16px
            31px;
        }


        .colour-item:nth-child(5n)
          .paint-body {
          border-radius:
            27px
            15px
            31px
            18px;
        }


        .colour-item:hover
          .paint-body {
          transform:
            translateY(-7px)
            rotate(
              calc(
                var(--tilt) * -1
              )
            )
            scale(
              1.045
            );

          box-shadow:
            0
            19px
            28px
            rgba(
              22,
              37,
              52,
              .18
            );
        }


        /* ========================================================
           PAINT HIGHLIGHT
           ======================================================== */

        .paint-highlight {
          position: absolute;

          left: -8%;
          top: -4%;

          width: 72%;
          height: 23%;

          border-radius: 50%;

          background:
            linear-gradient(
              90deg,
              rgba(
                255,
                255,
                255,
                .38
              ),
              rgba(
                255,
                255,
                255,
                0
              )
            );

          filter:
            blur(6px);

          opacity: .7;

          transform:
            rotate(
              -3deg
            );
        }


        /*
         * Moving light sweep.
         */

        .paint-highlight::after {
          content: "";

          position: absolute;

          top: -35px;
          left: -160px;

          width: 70px;
          height: 140px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                255,
                255,
                255,
                .26
              ),
              transparent
            );

          transform:
            rotate(
              16deg
            );

          animation:
            paintSweep
            5s
            ease-in-out
            infinite;
        }


        /* ========================================================
           PAINT GRAIN
           ======================================================== */

        .paint-grain {
          position: absolute;

          inset: 0;

          opacity: .12;

          background-image:
            radial-gradient(
              circle at 12% 20%,
              rgba(
                255,
                255,
                255,
                .9
              ) 0 1px,
              transparent 1.4px
            ),
            radial-gradient(
              circle at 72% 64%,
              rgba(
                0,
                0,
                0,
                .4
              ) 0 1px,
              transparent 1.4px
            );

          background-size:
            9px 9px,
            12px 12px;

          animation:
            grainMove
            7s
            linear
            infinite;
        }


        /* ========================================================
           PAINT EDGE
           ======================================================== */

        .paint-edge {
          position: absolute;

          inset: 0;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              .22
            );

          border-radius:
            inherit;

          pointer-events:
            none;
        }


        /* ========================================================
           COLOUR DETAILS
           ======================================================== */

        .colour-info {
          position: relative;

          padding:
            9px
            2px
            0;

          text-align:
            center;
        }


        .colour-code {
          display: block;

          color:
            #7d8385;

          font-size: 7px;

          font-weight: 700;

          letter-spacing:
            .15em;

          line-height: 1;
        }


        .colour-info h3 {
          margin:
            5px
            0
            4px;

          color:
            var(--navy);

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 12px;

          line-height:
            1.05;

          font-weight: 600;

          letter-spacing:
            -.015em;
        }


        .colour-hex {
          display: block;

          color:
            #979b9a;

          font-family:
            "Courier New",
            monospace;

          font-size: 7px;

          letter-spacing:
            .1em;
        }


        /* ========================================================
           CUSTOM COLOUR
           ======================================================== */

        .custom-colour {
          position: relative;

          z-index: 4;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 18px;

          margin-top:
            34px;

          padding-top:
            21px;

          border-top:
            1px solid
            rgba(
              16,
              42,
              70,
              .10
            );
        }


        .custom-line {
          width: 68px;
          height: 1px;

          background:
            rgba(
              16,
              42,
              70,
              .17
            );
        }


        .custom-copy {
          display: flex;

          flex-direction: column;

          align-items: center;

          gap: 3px;

          text-align:
            center;
        }


        .custom-copy strong {
          color:
            var(--navy);

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 17px;

          font-weight: 400;

          font-style: italic;
        }


        .custom-copy span {
          color:
            #7c8283;

          font-size: 9px;

          letter-spacing:
            .015em;
        }


        /* ========================================================
           PALETTE ICON
           ======================================================== */

        .palette-icon {
          position: relative;

          width: 31px;
          height: 29px;

          flex:
            0 0 31px;

          animation:
            paletteIconFloat
            4s
            ease-in-out
            infinite;
        }


        .palette-icon span {
          position: absolute;

          width: 8px;
          height: 8px;

          border-radius: 50%;

          background:
            var(--navy);
        }


        .palette-icon span:nth-child(1) {
          left: 0;
          top: 12px;
        }


        .palette-icon span:nth-child(2) {
          left: 8px;
          top: 3px;
        }


        .palette-icon span:nth-child(3) {
          left: 18px;
          top: 8px;
        }


        .palette-icon span:nth-child(4) {
          left: 22px;
          top: 19px;
        }


        /* ========================================================
           FUTURE COLLECTIONS
           ======================================================== */

        .future-collections {
          display:
            none;
        }


        /* ========================================================
           ANIMATIONS
           ======================================================== */

        @keyframes colourReveal {

          0% {
            opacity: 0;

            transform:
              translateY(22px)
              scale(.96);
          }

          100% {
            opacity: 1;

            transform:
              translateY(0)
              scale(1);
          }
        }


        @keyframes paintSweep {

          0%,
          45% {
            left: -170px;
          }

          75%,
          100% {
            left: 420px;
          }
        }


        @keyframes grainMove {

          0% {
            background-position:
              0 0,
              0 0;
          }

          50% {
            background-position:
              10px 6px,
              -7px 8px;
          }

          100% {
            background-position:
              0 0,
              0 0;
          }
        }


        @keyframes collectionOrbOne {

          0%,
          100% {
            transform:
              translate3d(
                0,
                0,
                0
              )
              scale(1);
          }

          50% {
            transform:
              translate3d(
                70px,
                -45px,
                0
              )
              scale(1.12);
          }
        }


        @keyframes collectionOrbTwo {

          0%,
          100% {
            transform:
              translate3d(
                0,
                0,
                0
              );
          }

          50% {
            transform:
              translate3d(
                -60px,
                40px,
                0
              );
          }
        }


        @keyframes waveMove {

          0%,
          100% {
            transform:
              translateX(0)
              rotate(-2deg);
          }

          50% {
            transform:
              translateX(35px)
              rotate(-1deg);
          }
        }


        @keyframes paletteIconFloat {

          0%,
          100% {
            transform:
              translateY(0);
          }

          50% {
            transform:
              translateY(-4px);
          }
        }


        /* ========================================================
           HERO ANIMATIONS
           ======================================================== */

        @keyframes fanReveal {

          from {
            opacity: 0;

            transform:
              translateX(-50%)
              rotate(var(--angle))
              translateY(90px)
              scale(.72);
          }

          to {
            opacity: 1;

            transform:
              translateX(-50%)
              rotate(var(--angle))
              translateY(0)
              scale(1);
          }
        }


        @keyframes fanFloat {

          0%,
          100% {
            margin-top: 0;
          }

          50% {
            margin-top: -7px;
          }
        }


        @keyframes paletteGlow {

          0%,
          100% {
            transform:
              scale(.95);

            opacity:
              .65;
          }

          50% {
            transform:
              scale(1.05);

            opacity:
              1;
          }
        }


        @keyframes ringOne {

          0%,
          100% {
            transform:
              rotate(-18deg)
              scale(1);
          }

          50% {
            transform:
              rotate(-13deg)
              scale(1.03);
          }
        }


        @keyframes ringTwo {

          0%,
          100% {
            transform:
              rotate(31deg)
              scale(1);
          }

          50% {
            transform:
              rotate(37deg)
              scale(.98);
          }
        }


        @keyframes orbitDot {

          0%,
          100% {
            transform:
              translateY(0)
              scale(1);

            opacity:
              .55;
          }

          50% {
            transform:
              translateY(-13px)
              scale(1.15);

            opacity:
              1;
          }
        }


        @keyframes lightFloat {

          0%,
          100% {
            transform:
              translate(0, 0)
              scale(1);
          }

          50% {
            transform:
              translate(-30px, 25px)
              scale(1.08);
          }
        }


        @keyframes lightFloatReverse {

          0%,
          100% {
            transform:
              translate(0, 0);
          }

          50% {
            transform:
              translate(30px, -25px);
          }
        }


        /* ========================================================
           TABLET
           ======================================================== */

        @media (max-width: 1200px) {

          .container,
          .hero-container {
            width:
              calc(
                100% - 70px
              );
          }


          .hero-container {
            grid-template-columns:
              1fr;

            gap:
              30px;

            padding-top:
              130px;
          }


          .hero-copy {
            max-width:
              720px;
          }


          .hero-palette {
            justify-self:
              center;

            margin-top:
              -20px;
          }


          .colour-grid {
            grid-template-columns:
              repeat(
                5,
                minmax(0, 1fr)
              );

            column-gap:
              20px;

            row-gap:
              22px;
          }
        }


        /* ========================================================
           TABLET SMALL
           ======================================================== */

        @media (max-width: 900px) {

          .colour-grid {
            grid-template-columns:
              repeat(
                4,
                minmax(0, 1fr)
              );
          }


          .paint-body {
            width:
              92%;
          }
        }


        /* ========================================================
           MOBILE
           ======================================================== */

        @media (max-width: 650px) {

          .container,
          .hero-container {
            width:
              calc(
                100% - 34px
              );
          }


          .colour-hero {
            min-height:
              760px;
          }


          .hero-container {
            padding:
              125px 0 60px;
          }


          .hero-copy h1 {
            font-size:
              clamp(
                58px,
                16vw,
                82px
              );
          }


          .hero-copy p {
            font-size:
              13px;
          }


          .hero-bottom-meta {
            flex-direction:
              column;

            gap:
              8px;
          }


          .hero-palette {
            width:
              100%;

            height:
              380px;

            transform:
              scale(.78);

            margin-top:
              -50px;

            margin-bottom:
              -50px;
          }


          .hero-footer-line {
            left:
              18px;

            right:
              18px;
          }


          .colour-section {
            padding:
              50px 0 40px;
          }


          .collection-header {
            margin-bottom:
              26px;
          }


          .collection-header h2 {
            font-size:
              43px;
          }


          .collection-header p {
            font-size:
              11px;
          }


          .collection-kicker span {
            width:
              32px;
          }


          .colour-grid {
            grid-template-columns:
              repeat(
                2,
                minmax(0, 1fr)
              );

            column-gap:
              12px;

            row-gap:
              22px;
          }


          .paint-stroke {
            height:
              65px;
          }


          .paint-body {
            height:
              56px;

            width:
              94%;
          }


          .colour-info {
            padding-top:
              7px;
          }


          .colour-info h3 {
            font-size:
              11px;
          }


          .colour-code,
          .colour-hex {
            font-size:
              6.5px;
          }


          .custom-colour {
            gap:
              8px;

            margin-top:
              30px;
          }


          .custom-line {
            width:
              22px;
          }


          .custom-copy strong {
            font-size:
              14px;
          }


          .custom-copy span {
            max-width:
              230px;

            font-size:
              8px;
          }
        }


        @media (max-width: 430px) {

          .hero-palette {
            transform:
              scale(.63);

            margin-top:
              -85px;

            margin-bottom:
              -90px;
          }


          .collection-header h2 {
            font-size:
              38px;
          }


          .colour-grid {
            column-gap:
              8px;

            row-gap:
              20px;
          }


          .paint-body {
            height:
              53px;
          }


          .colour-info h3 {
            font-size:
              10px;
          }
        }


        /* ========================================================
           REDUCED MOTION
           ======================================================== */

        @media (prefers-reduced-motion: reduce) {

          *,
          *::before,
          *::after {
            animation-duration:
              .01ms !important;

            animation-iteration-count:
              1 !important;

            transition-duration:
              .01ms !important;
          }
        }

      `}</style>
    </>
  );
}