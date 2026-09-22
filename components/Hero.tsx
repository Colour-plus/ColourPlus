import { ArrowDown, ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero-creative">
      {/* Colourplus hero image */}
      <div
        className="hero-image"
        style={{
          backgroundImage: "url('/images/hero/hero-main.png')",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Blue/dark overlay for typography */}
      <div className="hero-shade" />

      {/* Architectural grid detail */}
      <div className="hero-lines" />

      <div className="container hero-content">

        {/* Top information */}
        <div className="hero-topline">
          <span>COLOURPLUS POLYURETHANES PVT. LTD.</span>
          <span>ENGINEERED SURFACES / INDIA</span>
        </div>

        {/* Main hero */}
        <div className="hero-main">

          <p className="eyebrow hero-eyebrow">
            Industrial · Architectural · Technical
          </p>

          <h1>
            ENGINEERED
            <br />
            <em>SURFACES.</em>
          </h1>

          <div className="hero-bottom">

            <p>
              Surfaces engineered around performance, environment and the way
              a space needs to work.
            </p>

            <div className="hero-buttons">

              <a
                className="hero-button light"
                href="#solutions"
              >
                Explore solutions
                <ArrowUpRight size={16} />
              </a>

              <a
                className="hero-button ghost"
                href="#finder"
              >
                Find my solution
              </a>

            </div>
          </div>
        </div>

        {/* Hero footer */}
        <div className="hero-footer">
          <span>
            18+ years of application experience* · 10,000+ projects*
          </span>

          <ArrowDown size={18} />
        </div>

      </div>
    </section>
  );
}