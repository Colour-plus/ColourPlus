"use client";

import { QrCode, Activity, BrainCircuit, ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";

const items = [
  {
    icon: QrCode,
    number: "01",
    title: "Floor Passport",
    text: "A proposed QR identity connecting project details, system specifications, maintenance, warranty and service history.",
  },
  {
    icon: Activity,
    number: "02",
    title: "Factory Health",
    text: "A proposed AI-powered condition and predictive-maintenance concept for earlier risk detection.",
  },
  {
    icon: BrainCircuit,
    number: "03",
    title: "AI Sales & Engagement",
    text: "A proposed digital layer for opportunity discovery, lead qualification, follow-up and customer lifecycle engagement.",
  },
];

export default function Intelligence() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("intel-visible");
          observer.unobserve(section);
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="technology"
      className="intelligence"
    >
      <div className="container">

        {/* TOP CONTENT */}
        <div className="intel-grid">

          <div className="intel-intro">

            <p className="eyebrow intel-eyebrow">
              04 / Colourplus Intelligence
            </p>

            <div className="intel-heading-wrap">
              <h2 className="h2 intel-heading">
                <span>The surface</span>
                <span>is only the</span>
                <span>beginning.</span>
              </h2>
            </div>

            <p className="intel-copy">
              A connected digital lifecycle from project records to
              maintenance, service and customer engagement.
            </p>

          </div>

          {/* INTELLIGENCE CARDS */}
          <div className="intel-list">

            {items.map(
              ({ icon: Icon, number, title, text }, index) => (
                <article
                  className="intel-item"
                  key={title}
                  style={
                    {
                      "--intel-delay": `${0.25 + index * 0.14}s`,
                    } as React.CSSProperties
                  }
                >

                  <div className="intel-item-top">

                    <div className="intel-number">
                      {number}
                    </div>

                    <div className="intel-icon">
                      <Icon size={20} strokeWidth={1.6} />
                    </div>

                  </div>

                  <div className="intel-item-content">

                    <h3>{title}</h3>

                    <p>{text}</p>

                  </div>

                  <div className="intel-item-line" />

                </article>
              )
            )}

          </div>

        </div>

        {/* BOTTOM NAVIGATION */}
        <div className="intel-footer">

          <div className="intel-footer-label">
            <span className="intel-footer-line" />
            <span>CONNECTED SURFACE ECOSYSTEM</span>
          </div>

          <a
            href="#contact"
            className="intel-explore"
          >
            <span>Explore our approach</span>

            <span className="intel-arrow">
              <ArrowUpRight
                size={17}
                strokeWidth={1.7}
              />
            </span>
          </a>

        </div>

      </div>
    </section>
  );
}