"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  RotateCcw,
  Search,
} from "lucide-react";
import Navbar from "@/components/Navbar";

type ApiProject = {
  id: number;
  title: string;
  location: string | null;
  industry: string | null;
  description: string | null;
  image: string | null;
  category: string | null;
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
  images?: {
    id: number;
    imageUrl: string;
    altText: string | null;
    sortOrder: number;
  }[];
};

type Project = {
  number: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  solution: string;
  application: string;
  image: string;
};

const filters = [
  "All Project Types",
  "Industrial Flooring",
  "Protective Coatings",
  "Waterproofing",
];

const applications = [
  "All Applications",
  "Automotive",
  "Warehousing & Logistics",
  "Food & Beverage",
  "Pharmaceutical",
  "Healthcare",
  "IT / R&D / Data Centres",
  "Heavy Engineering",
  "Manufacturing",
];

function formatApplication(industry: string | null) {
  if (!industry) {
    return "General Industrial";
  }

  if (
    industry.toLowerCase() === "data centres"
  ) {
    return "IT / R&D / Data Centres";
  }

  return industry;
}

function buildTags(
  category: string | null,
  industry: string | null
) {
  const tags: string[] = [];

  if (category) {
    tags.push(category.toUpperCase());
  }

  if (industry) {
    tags.push(industry.toUpperCase());
  }

  tags.push("REFERENCE");

  return tags.slice(0, 3);
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [search, setSearch] = useState("");
  const [projectFilter, setProjectFilter] =
    useState("All Project Types");
  const [applicationFilter, setApplicationFilter] =
    useState("All Applications");

  const [visibleProjects, setVisibleProjects] =
    useState<Project[]>([]);

  /*
   * =====================================================
   * LOAD PROJECTS FROM DATABASE
   * =====================================================
   */

  useEffect(() => {
    let cancelled = false;

    async function loadProjects() {
      try {
        setLoading(true);
        setLoadError("");

        const response = await fetch(
          "/api/projects",
          {
            method: "GET",
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            "Unable to load project references."
          );
        }

        const data = await response.json();

        if (cancelled) {
          return;
        }

        const apiProjects: ApiProject[] =
          Array.isArray(data)
            ? data
            : Array.isArray(data.projects)
            ? data.projects
            : [];

        const mappedProjects: Project[] =
          apiProjects.map(
            (project, index) => {
              const solution =
                project.category ||
                "Industrial Flooring";

              const application =
                formatApplication(
                  project.industry
                );

              /*
               * Prefer the main image.
               * If no main image exists, use
               * the first gallery image.
               */
              const image =
                project.image ||
                project.images?.[0]?.imageUrl ||
                "";

              return {
                number: String(
                  index + 1
                ).padStart(2, "0"),

                category:
                  application.toUpperCase(),

                title:
                  project.title,

                description:
                  project.description ||
                  "Engineered surface environment developed around the operating requirements of the project.",

                tags:
                  buildTags(
                    project.category,
                    project.industry
                  ),

                solution,

                application,

                image,
              };
            }
          );

        setProjects(mappedProjects);
        setVisibleProjects(mappedProjects);
      } catch (error) {
        console.error(
          "PROJECTS_LOAD_ERROR:",
          error
        );

        if (!cancelled) {
          setLoadError(
            "Project references could not be loaded."
          );

          setProjects([]);
          setVisibleProjects([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProjects();

    return () => {
      cancelled = true;
    };
  }, []);

  /*
   * =====================================================
   * FILTER PROJECTS
   * =====================================================
   */

  useEffect(() => {
    const query =
      search.toLowerCase().trim();

    const filtered = projects.filter(
      (project) => {
        const matchesSearch =
          !query ||
          project.title
            .toLowerCase()
            .includes(query) ||
          project.category
            .toLowerCase()
            .includes(query) ||
          project.application
            .toLowerCase()
            .includes(query) ||
          project.solution
            .toLowerCase()
            .includes(query) ||
          project.description
            .toLowerCase()
            .includes(query);

        const matchesProject =
          projectFilter ===
            "All Project Types" ||
          project.solution ===
            projectFilter;

        const matchesApplication =
          applicationFilter ===
            "All Applications" ||
          project.application ===
            applicationFilter;

        return (
          matchesSearch &&
          matchesProject &&
          matchesApplication
        );
      }
    );

    setVisibleProjects(filtered);
  }, [
    projects,
    search,
    projectFilter,
    applicationFilter,
  ]);

  const resetFilters = () => {
    setSearch("");
    setProjectFilter("All Project Types");
    setApplicationFilter("All Applications");
  };

  /*
   * Five project images are used in the hero conveyor.
   * The complete project library remains below unchanged.
   */

  const heroProjects = projects.slice(0, 5);

  return (
    <>
      <Navbar />

      <main className="projects-page">
        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="projects-hero">
          <div className="hero-orbit hero-orbit-one" />
          <div className="hero-orbit hero-orbit-two" />

          <div className="hero-plus hero-plus-one">+</div>
          <div className="hero-plus hero-plus-two">+</div>

          <div className="hero-ball hero-ball-one" />
          <div className="hero-ball hero-ball-two" />
          <div className="hero-ring" />

          <div className="projects-hero-inner">
            <div className="projects-hero-copy">
              <div className="projects-hero-meta">
                <span>01</span>
                <span>/</span>
                <span>PROJECT LIBRARY</span>
              </div>

              <h1>
                Surfaces
                <br />
                <em>in context.</em>
              </h1>

              <p>
                Explore representative application environments
                where Colourplus surface performance meets real
                operating conditions.
              </p>

              <Link
                href="#project-library"
                className="hero-button"
              >
                <span>EXPLORE PROJECTS</span>
                <ArrowUpRight size={17} />
              </Link>

              <div className="scroll-indicator">
                <span>SCROLL</span>
                <div className="scroll-line" />
                <div className="mouse-icon">
                  <span />
                </div>
              </div>
            </div>

            {/* =================================================
                VERTICAL PROJECT CARD CONVEYOR
                ================================================= */}

            <div className="projects-hero-visual">
              <div className="hero-conveyor-window">
                <div className="hero-conveyor-track">
                  {heroProjects.length > 0 &&
                    [
                      ...heroProjects,
                      ...heroProjects,
                    ].map(
                      (project, index) => (
                        <div
                          className="hero-conveyor-card"
                          key={`${project.number}-${index}`}
                        >
                          <div
                            className="hero-conveyor-image"
                            style={{
                              backgroundImage: project.image
                                ? `url("${project.image}")`
                                : "none",
                            }}
                          />

                          <div className="hero-conveyor-overlay" />

                          <div className="hero-conveyor-top">
                            <span>
                              {project.number}
                            </span>

                            <span>
                              COLOURPLUS
                            </span>
                          </div>

                          <div className="hero-conveyor-bottom">
                            <div>
                              <small>
                                APPLICATION
                              </small>

                              <strong>
                                {project.category}
                              </strong>
                            </div>
                          </div>
                        </div>
                      )
                    )}

                  {loading && (
                    <div className="hero-conveyor-loading">
                      LOADING PROJECTS
                    </div>
                  )}

                  {!loading &&
                    !loadError &&
                    heroProjects.length === 0 && (
                      <div className="hero-conveyor-loading">
                        NO PROJECTS
                      </div>
                    )}
                </div>

                <div className="hero-conveyor-fade hero-conveyor-fade-top" />
                <div className="hero-conveyor-fade hero-conveyor-fade-bottom" />
              </div>

              <div className="hero-conveyor-caption">
                <span>PROJECT REFERENCE</span>

                <small>
                  APPLICATION / PERFORMANCE / ENVIRONMENT
                </small>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            REFERENCE LIBRARY INTRO
        ===================================================== */}

        <section className="reference-intro">
          <div className="reference-intro-inner">
            <div className="reference-heading">
              <div className="section-number">
                02 <span>/</span> REFERENCE LIBRARY
              </div>

              <h2>
                Every surface
                <br />
                <em>has a context.</em>
              </h2>
            </div>

            <div className="reference-copy">
              <div className="reference-line" />

              <div>
                <p>
                  Colourplus surface systems are considered around
                  the conditions they need to perform within — from
                  traffic and impact to hygiene, control, exposure
                  and long-term operational use.
                </p>

                <p className="reference-note">
                  The references below illustrate application
                  environments and performance considerations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            PROJECT LIBRARY
        ===================================================== */}

        <section
          className="project-library"
          id="project-library"
        >
          <div className="library-inner">
            <div className="library-heading-row">
              <div>
                <div className="section-number">
                  03 <span>/</span> PROJECT REFERENCES
                </div>

                <h2>
                  Explore the
                  <br />
                  <em>library.</em>
                </h2>
              </div>

              <div className="reference-count">
                <strong>
                  {String(
                    visibleProjects.length
                  ).padStart(2, "0")}
                </strong>

                <span>REFERENCES</span>
              </div>
            </div>

            <div className="filter-search-row">
              <div className="search-box">
                <Search size={17} />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  placeholder="Search projects, sectors or applications..."
                />

                {search && (
                  <button
                    type="button"
                    onClick={() =>
                      setSearch("")
                    }
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>

              <button
                type="button"
                className="filter-button"
              >
                <span>FILTERS</span>
                <ArrowUpRight size={16} />
              </button>
            </div>

            <div className="filter-row">
              <div className="select-wrap">
                <label>
                  PROJECT TYPE
                </label>

                <select
                  value={projectFilter}
                  onChange={(e) =>
                    setProjectFilter(
                      e.target.value
                    )
                  }
                >
                  {filters.map(
                    (filter) => (
                      <option
                        key={filter}
                      >
                        {filter}
                      </option>
                    )
                  )}
                </select>

                <ChevronDown size={15} />
              </div>

              <div className="select-wrap">
                <label>
                  SOLUTION / CATEGORY
                </label>

                <select
                  value={projectFilter}
                  onChange={(e) =>
                    setProjectFilter(
                      e.target.value
                    )
                  }
                >
                  {filters.map(
                    (filter) => (
                      <option
                        key={filter}
                      >
                        {filter}
                      </option>
                    )
                  )}
                </select>

                <ChevronDown size={15} />
              </div>

              <div className="select-wrap">
                <label>
                  APPLICATION
                </label>

                <select
                  value={
                    applicationFilter
                  }
                  onChange={(e) =>
                    setApplicationFilter(
                      e.target.value
                    )
                  }
                >
                  {applications.map(
                    (application) => (
                      <option
                        key={application}
                      >
                        {application}
                      </option>
                    )
                  )}
                </select>

                <ChevronDown size={15} />
              </div>

              <button
                type="button"
                className="reset-button"
                onClick={resetFilters}
              >
                <RotateCcw size={15} />
                RESET
              </button>
            </div>

            {loading && (
              <div className="empty-results">
                <span>
                  LOADING PROJECT REFERENCES
                </span>
              </div>
            )}

            {!loading &&
              loadError && (
                <div className="empty-results">
                  <span>
                    {loadError}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      window.location.reload()
                    }
                  >
                    RETRY
                  </button>
                </div>
              )}

            {!loading &&
              !loadError && (
                <div className="project-reference-grid">
                  {visibleProjects.map(
                    (project) => (
                      <article
                        className="reference-card"
                        key={project.number}
                      >
                        <div className="reference-image">
                          <div
                            className="reference-image-bg"
                            style={{
                              backgroundImage:
                                project.image
                                  ? `url("${project.image}")`
                                  : "none",
                            }}
                          />

                          <div className="image-number">
                            {project.number}
                          </div>

                          <div className="reference-arrow">
                            <ArrowUpRight size={18} />
                          </div>
                        </div>

                        <div className="reference-card-body">
                          <div className="reference-card-top">
                            <span>
                              {project.category}
                            </span>

                            <small>
                              Reference
                            </small>
                          </div>

                          <h3>
                            {project.title}
                          </h3>

                          <p>
                            {project.description}
                          </p>

                          <div className="tag-row">
                            {project.tags.map(
                              (tag) => (
                                <span
                                  key={tag}
                                >
                                  {tag}
                                </span>
                              )
                            )}
                          </div>

                          <div className="reference-card-footer">
                            <div>
                              <small>
                                SOLUTION
                              </small>

                              <strong>
                                {project.solution}
                              </strong>
                            </div>

                            <div>
                              <small>
                                APPLICATION
                              </small>

                              <strong>
                                {project.application}
                              </strong>
                            </div>
                          </div>
                        </div>
                      </article>
                    )
                  )}
                </div>
              )}

            {!loading &&
              !loadError &&
              visibleProjects.length === 0 && (
                <div className="empty-results">
                  <span>
                    NO REFERENCES FOUND
                  </span>

                  <button
                    type="button"
                    onClick={resetFilters}
                  >
                    RESET FILTERS
                  </button>
                </div>
              )}
          </div>
        </section>

        {/* =====================================================
            PROJECT APPROACH
        ===================================================== */}

        <section className="project-approach">
          <div className="approach-orbit approach-orbit-one" />
          <div className="approach-orbit approach-orbit-two" />
          <div className="approach-ball approach-ball-one" />
          <div className="approach-ball approach-ball-two" />

          <div className="approach-inner">
            <div className="approach-title">
              <div className="section-number light">
                04 <span>/</span> PROJECT APPROACH
              </div>

              <h2>
                From environment
                <br />
                <em>to lifecycle.</em>
              </h2>
            </div>

            <div className="approach-steps">
              <div className="approach-step">
                <div className="step-number">
                  01
                </div>

                <div className="step-line" />

                <h3>
                  ENVIRONMENT
                </h3>

                <p>
                  Understand the operating conditions surrounding
                  the surface.
                </p>
              </div>

              <div className="approach-step">
                <div className="step-number">
                  02
                </div>

                <div className="step-line" />

                <h3>
                  PERFORMANCE
                </h3>

                <p>
                  Define the performance requirements the surface
                  must meet.
                </p>
              </div>

              <div className="approach-step">
                <div className="step-number">
                  03
                </div>

                <div className="step-line" />

                <h3>
                  APPLICATION
                </h3>

                <p>
                  Position the appropriate surface system for the
                  environment.
                </p>
              </div>

              <div className="approach-step">
                <div className="step-number">
                  04
                </div>

                <div className="step-line" />

                <h3>
                  LIFECYCLE
                </h3>

                <p>
                  Consider maintenance, continuity and long-term
                  surface use.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            FINAL CTA
        ===================================================== */}

        <section className="projects-final-cta">
          <div className="final-cta-inner">
            <div>
              <div className="section-number">
                05 <span>/</span> START A PROJECT
              </div>

              <h2>
                Have a surface
                <br />
                challenge?
              </h2>

              <p>
                Tell us about the environment, operating
                conditions and performance requirements.
              </p>
            </div>

            <Link
              href="/contact"
              className="final-cta-button"
            >
              <span>
                TALK TO AN EXPERT
              </span>

              <ArrowUpRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      <style>{`
        .projects-page {
          --cp-navy: #0b2433;
          --cp-navy-deep: #071a26;
          --cp-blue: #164c68;
          --cp-blue-light: #2d6f8f;
          --cp-offwhite: #f3f1eb;
          --cp-paper: #f8f7f2;
          --cp-line: rgba(11, 36, 51, 0.18);
          --cp-text: #0b2433;
          --cp-muted: #69757b;
          --cp-white: #ffffff;

          background: var(--cp-offwhite);
          color: var(--cp-text);
          overflow: hidden;
        }

        .projects-page * {
          box-sizing: border-box;
        }

        /* =====================================================
           HERO
        ===================================================== */

        .projects-hero {
          min-height: 760px;
          position: relative;
          overflow: hidden;

          background:
            radial-gradient(
              circle at 72% 28%,
              rgba(82, 151, 181, 0.18),
              transparent 28%
            ),
            radial-gradient(
              circle at 20% 80%,
              rgba(37, 105, 139, 0.12),
              transparent 26%
            ),
            var(--cp-navy);

          color: white;
        }

        .projects-hero-inner {
          position: relative;
          z-index: 5;

          width: min(1400px, calc(100% - 100px));
          min-height: 760px;
          margin: 0 auto;

          display: grid;

          grid-template-columns: 1fr 1fr;

          align-items: center;
          gap: 50px;
        }

        .projects-hero-copy {
          padding-top: 70px;
          position: relative;
          z-index: 5;
        }

        .projects-hero-meta,
        .section-number {
          display: flex;
          align-items: center;
          gap: 12px;

          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        .projects-hero-meta {
          margin-bottom: 30px;
          color: rgba(255,255,255,0.8);
        }

        .projects-hero-meta span:first-child {
          color: white;
        }

        .projects-hero h1 {
          margin: 0;

          font-size: clamp(82px, 7.8vw, 132px);
          line-height: 0.83;
          letter-spacing: -0.065em;
          font-weight: 800;
        }

        .projects-hero h1 em {
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 400;
          letter-spacing: -0.07em;
        }

        .projects-hero-copy > p {
          width: min(470px, 100%);
          margin: 34px 0 28px;

          font-size: 17px;
          line-height: 1.55;
          color: rgba(255,255,255,0.77);
        }

        .hero-button {
          width: fit-content;

          display: inline-flex;
          align-items: center;
          gap: 30px;

          padding: 15px 20px;

          border-radius: 999px;

          background: white;
          color: var(--cp-navy);

          text-decoration: none;

          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.13em;

          transition:
            transform 0.35s ease,
            background 0.35s ease;
        }

        .hero-button:hover {
          transform: translateY(-4px);
          background: #dcecf2;
        }

        .scroll-indicator {
          display: flex;
          align-items: center;
          gap: 12px;

          margin-top: 50px;

          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: rgba(255,255,255,0.72);
        }

        .scroll-line {
          width: 28px;
          height: 1px;
          background: rgba(255,255,255,0.35);
        }

        .mouse-icon {
          width: 16px;
          height: 25px;

          border: 1px solid rgba(255,255,255,0.65);
          border-radius: 10px;

          display: flex;
          justify-content: center;

          padding-top: 5px;
        }

        .mouse-icon span {
          width: 2px;
          height: 5px;

          border-radius: 4px;
          background: white;

          animation: mouseMove 1.7s ease-in-out infinite;
        }

        /* =====================================================
           HERO — VERTICAL CARD CONVEYOR
        ===================================================== */

        .projects-hero-visual {
          position: relative;
          height: 650px;

          display: flex;
          align-items: center;
          justify-content: center;

          min-width: 0;
        }

        .hero-conveyor-window {
          position: relative;

          width: 100%;
          max-width: 600px;
          height: 610px;

          overflow: hidden;

          mask-image:
            linear-gradient(
              to bottom,
              transparent 0%,
              black 9%,
              black 91%,
              transparent 100%
            );

          -webkit-mask-image:
            linear-gradient(
              to bottom,
              transparent 0%,
              black 9%,
              black 91%,
              transparent 100%
            );
        }

        .hero-conveyor-track {
          position: absolute;

          top: 0;
          left: 50%;

          width: 600px;

          display: flex;
          flex-direction: column;
          gap: 26px;

          transform: translateX(-50%);

          animation:
            heroVerticalConveyorLarge
            25s
            linear
            infinite;

          will-change: transform;
        }

        .hero-conveyor-card {
          position: relative;

          width: 600px;
          height: 460px;

          flex: 0 0 460px;

          overflow: hidden;

          border-radius: 34px;

          background: #173c4f;

          box-shadow:
            0 30px 80px rgba(0,0,0,0.32),
            0 8px 24px rgba(0,0,0,0.18);

          isolation: isolate;
        }

        .hero-conveyor-image {
          position: absolute;
          inset: 0;

          background-size: cover;
          background-position: center;

          transform: scale(1.02);

          transition:
            transform 1s cubic-bezier(.2,.8,.2,1);
        }

        .hero-conveyor-card:hover
        .hero-conveyor-image {
          transform: scale(1.07);
        }

        .hero-conveyor-overlay {
          position: absolute;
          inset: 0;

          z-index: 1;

          background:
            linear-gradient(
              180deg,
              rgba(5,25,36,0.42),
              rgba(5,25,36,0.04) 40%,
              rgba(5,25,36,0.72)
            );
        }

        .hero-conveyor-top {
          position: absolute;

          z-index: 3;

          left: 26px;
          right: 26px;
          top: 24px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.14em;

          color: white;
        }

        .hero-conveyor-top span:first-child {
          width: 42px;
          height: 42px;

          display: flex;
          align-items: center;
          justify-content: center;

          border: 1px solid rgba(255,255,255,0.5);
          border-radius: 50%;

          backdrop-filter: blur(8px);

          background: rgba(7,26,38,0.18);
        }

        .hero-conveyor-top span:last-child {
          opacity: 0.82;
        }

        .hero-conveyor-bottom {
          position: absolute;

          z-index: 3;

          left: 26px;
          right: 26px;
          bottom: 24px;

          display: flex;
          align-items: flex-end;
          justify-content: space-between;

          color: white;
        }

        .hero-conveyor-bottom small {
          display: block;

          margin-bottom: 7px;

          font-size: 7px;
          font-weight: 700;
          letter-spacing: 0.14em;

          opacity: 0.7;
        }

        .hero-conveyor-bottom strong {
          display: block;

          max-width: 480px;

          font-size: 16px;
          line-height: 1.15;
          letter-spacing: -0.02em;
        }

        .hero-conveyor-loading {
          width: 600px;
          height: 460px;

          flex: 0 0 460px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 34px;

          border: 1px solid rgba(255,255,255,0.12);

          background:
            linear-gradient(
              135deg,
              rgba(255,255,255,0.08),
              rgba(255,255,255,0.02)
            );

          color: rgba(255,255,255,0.55);

          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.16em;
        }

        .hero-conveyor-fade {
          position: absolute;

          left: 0;
          right: 0;

          z-index: 5;

          pointer-events: none;
        }

        .hero-conveyor-fade-top {
          top: 0;
          height: 110px;

          background:
            linear-gradient(
              180deg,
              var(--cp-navy) 0%,
              rgba(11,36,51,0.88) 28%,
              rgba(11,36,51,0) 100%
            );
        }

        .hero-conveyor-fade-bottom {
          bottom: 0;
          height: 110px;

          background:
            linear-gradient(
              0deg,
              var(--cp-navy) 0%,
              rgba(11,36,51,0.88) 28%,
              rgba(11,36,51,0) 100%
            );
        }

        .hero-conveyor-caption {
          position: absolute;

          z-index: 8;

          right: -4px;
          bottom: 34px;

          display: flex;
          flex-direction: column;
          gap: 5px;

          padding: 13px 18px;

          border:
            1px solid rgba(255,255,255,0.22);

          border-radius: 999px;

          background:
            rgba(5,28,41,0.88);

          backdrop-filter: blur(12px);

          color: white;

          box-shadow:
            0 18px 40px rgba(0,0,0,0.18);
        }

        .hero-conveyor-caption span {
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.12em;
        }

        .hero-conveyor-caption small {
          font-size: 6px;
          font-weight: 500;
          letter-spacing: 0.1em;

          opacity: 0.58;
        }

        /* =====================================================
           HERO DECORATIVE ELEMENTS
        ===================================================== */

        .hero-orbit {
          position: absolute;
          border: 1px solid rgba(139,194,216,0.28);
          border-radius: 50%;
          pointer-events: none;
        }

        .hero-orbit-one {
          width: 560px;
          height: 560px;
          right: 18%;
          top: -150px;
        }

        .hero-orbit-two {
          width: 760px;
          height: 420px;
          right: -150px;
          bottom: -220px;
          transform: rotate(-28deg);
        }

        .hero-ring {
          position: absolute;

          width: 80px;
          height: 80px;

          right: 5%;
          top: 140px;

          border: 18px solid rgba(94,164,191,0.9);
          border-radius: 50%;

          animation: ringFloat 6s ease-in-out infinite;
        }

        .hero-ball {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }

        .hero-ball-one {
          width: 68px;
          height: 68px;

          background:
            radial-gradient(
              circle at 30% 25%,
              #8db8c8,
              #275c73 60%,
              #102e3d
            );

          top: 70px;
          left: 42%;

          animation: ballFloat 6s ease-in-out infinite;
        }

        .hero-ball-two {
          width: 42px;
          height: 42px;

          background:
            radial-gradient(
              circle at 30% 25%,
              #d9edf2,
              #5897ae 65%,
              #27566a
            );

          right: 4%;
          bottom: 145px;

          animation: ballFloatReverse 5s ease-in-out infinite;
        }

        .hero-plus {
          position: absolute;

          color: rgba(180,220,232,0.45);

          font-size: 32px;
          font-weight: 200;
        }

        .hero-plus-one {
          right: 48%;
          bottom: 70px;
        }

        .hero-plus-two {
          right: 5%;
          top: 300px;
        }

        /* =====================================================
           ALL REMAINING SECTIONS
        ===================================================== */

        .reference-intro {
          background: var(--cp-paper);
          padding: 78px 0;
          border-bottom: 1px solid rgba(11,36,51,0.08);
        }

        .reference-intro-inner {
          width: min(1180px, calc(100% - 100px));
          margin: auto;

          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;

          align-items: center;
        }

        .section-number {
          color: #64747c;
          margin-bottom: 16px;
        }

        .section-number span {
          opacity: 0.45;
        }

        .reference-heading h2,
        .library-heading-row h2,
        .approach-title h2 {
          margin: 0;

          font-size: clamp(45px, 4.3vw, 72px);
          line-height: 0.9;
          letter-spacing: -0.055em;
        }

        .reference-heading h2 em,
        .library-heading-row h2 em,
        .approach-title h2 em {
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 400;
        }

        .reference-copy {
          display: grid;
          grid-template-columns: 1px 1fr;
          gap: 28px;

          align-items: stretch;
        }

        .reference-line {
          width: 1px;
          background: rgba(11,36,51,0.35);
        }

        .reference-copy p {
          margin: 0;

          max-width: 470px;

          font-size: 14px;
          line-height: 1.65;

          color: #40515a;
        }

        .reference-copy .reference-note {
          margin-top: 18px;

          font-family: Georgia, "Times New Roman", serif;
          font-style: italic;

          font-size: 13px;
          color: #6d777b;
        }

        .project-library {
          padding: 82px 0 105px;

          background:
            radial-gradient(
              circle at 10% 20%,
              rgba(84,138,158,0.07),
              transparent 22%
            ),
            var(--cp-offwhite);
        }

        .library-inner {
          width: min(1180px, calc(100% - 100px));
          margin: auto;
        }

        .library-heading-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;

          margin-bottom: 35px;
        }

        .reference-count {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .reference-count strong {
          font-size: 52px;
          line-height: 0.9;

          font-weight: 300;
          letter-spacing: -0.06em;
        }

        .reference-count span {
          margin-top: 8px;

          font-size: 8px;
          letter-spacing: 0.15em;

          color: #778187;
        }

        .filter-search-row {
          display: grid;
          grid-template-columns: 1fr 150px;
          gap: 14px;

          margin-bottom: 12px;
        }

        .search-box {
          min-height: 52px;

          display: flex;
          align-items: center;
          gap: 13px;

          padding: 0 18px;

          border: 1px solid rgba(11,36,51,0.16);
          border-radius: 999px;

          background: rgba(255,255,255,0.6);
        }

        .search-box svg {
          color: #53646c;
          flex-shrink: 0;
        }

        .search-box input {
          flex: 1;

          border: 0;
          outline: 0;

          background: transparent;

          font: inherit;
          font-size: 12px;

          color: var(--cp-text);
        }

        .search-box input::placeholder {
          color: #7a858a;
        }

        .search-box button {
          width: 24px;
          height: 24px;

          border: 0;
          background: transparent;

          cursor: pointer;

          font-size: 18px;
          color: #637077;
        }

        .filter-button {
          min-height: 52px;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 20px;

          border: 0;
          border-radius: 999px;

          background: var(--cp-navy);
          color: white;

          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.13em;

          cursor: pointer;
        }

        .filter-row {
          display: grid;

          grid-template-columns:
            1fr
            1fr
            1fr
            150px;

          gap: 12px;

          margin-bottom: 30px;
        }

        .select-wrap {
          min-height: 62px;

          position: relative;

          padding: 11px 17px;

          border: 1px solid rgba(11,36,51,0.16);
          border-radius: 999px;

          background: rgba(255,255,255,0.45);
        }

        .select-wrap label {
          display: block;

          margin-bottom: 3px;

          font-size: 7px;
          font-weight: 800;
          letter-spacing: 0.13em;

          color: #637078;
        }

        .select-wrap select {
          width: calc(100% - 18px);

          border: 0;
          outline: 0;

          appearance: none;

          background: transparent;

          font-size: 11px;
          font-weight: 700;

          color: var(--cp-text);

          cursor: pointer;
        }

        .select-wrap svg {
          position: absolute;

          right: 17px;
          bottom: 18px;

          pointer-events: none;
        }

        .reset-button {
          border: 1px solid rgba(11,36,51,0.38);
          border-radius: 999px;

          background: transparent;
          color: var(--cp-text);

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 8px;

          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.1em;

          cursor: pointer;

          transition:
            background 0.3s ease,
            color 0.3s ease;
        }

        .reset-button:hover {
          background: var(--cp-navy);
          color: white;
        }

        .project-reference-grid {
          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap: 20px;
        }

        .reference-card {
          overflow: hidden;

          border: 1px solid rgba(11,36,51,0.11);
          border-radius: 16px;

          background: rgba(255,255,255,0.48);

          transition:
            transform 0.5s cubic-bezier(.2,.8,.2,1),
            box-shadow 0.5s ease;
        }

        .reference-card:hover {
          transform: translateY(-8px);

          box-shadow:
            0 25px 55px rgba(11,36,51,0.12);
        }

        .reference-image {
          height: 195px;

          position: relative;
          overflow: hidden;

          background: #ced7da;
        }

        .reference-image-bg {
          position: absolute;
          inset: 0;

          background-size: cover;
          background-position: center;

          transition:
            transform 0.8s cubic-bezier(.2,.8,.2,1);
        }

        .reference-card:hover
        .reference-image-bg {
          transform: scale(1.07);
        }

        .reference-image::after {
          content: "";

          position: absolute;
          inset: 0;

          background:
            linear-gradient(
              180deg,
              rgba(0,0,0,0.15),
              rgba(0,0,0,0.02) 45%,
              rgba(0,0,0,0.16)
            );
        }

        .image-number {
          position: absolute;
          z-index: 2;

          left: 13px;
          top: 10px;

          font-size: 24px;
          font-weight: 400;

          color: white;

          letter-spacing: -0.04em;
        }

        .reference-arrow {
          position: absolute;
          z-index: 2;

          right: 10px;
          top: 10px;

          width: 29px;
          height: 29px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background: rgba(11,36,51,0.75);
          color: white;

          transition:
            transform 0.3s ease,
            background 0.3s ease;
        }

        .reference-card:hover
        .reference-arrow {
          transform: rotate(45deg);
          background: var(--cp-blue);
        }

        .reference-card-body {
          min-height: 275px;

          display: flex;
          flex-direction: column;

          padding: 17px 15px 0;
        }

        .reference-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;

          margin-bottom: 9px;
        }

        .reference-card-top span {
          font-size: 7px;
          font-weight: 800;
          letter-spacing: 0.11em;
        }

        .reference-card-top small {
          font-size: 8px;
          color: #8a9396;
        }

        .reference-card-body h3 {
          margin: 0 0 9px;

          font-size: 16px;
          line-height: 1.1;

          letter-spacing: -0.025em;
        }

        .reference-card-body > p {
          margin: 0;

          font-size: 10px;
          line-height: 1.45;

          color: #68757b;
        }

        .tag-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;

          margin-top: 14px;
        }

        .tag-row span {
          padding: 5px 8px;

          border: 1px solid rgba(11,36,51,0.14);
          border-radius: 999px;

          font-size: 6px;
          font-weight: 800;
          letter-spacing: 0.09em;
        }

        .reference-card-footer {
          margin-top: auto;

          display: grid;
          grid-template-columns: 1fr 1fr;

          border-top:
            1px solid rgba(11,36,51,0.1);
        }

        .reference-card-footer > div {
          padding: 12px 8px 13px 0;
        }

        .reference-card-footer > div + div {
          padding-left: 14px;

          border-left:
            1px solid rgba(11,36,51,0.1);
        }

        .reference-card-footer small {
          display: block;

          margin-bottom: 5px;

          font-size: 6px;
          letter-spacing: 0.1em;

          color: #7c878b;
        }

        .reference-card-footer strong {
          display: block;

          font-size: 8px;
          line-height: 1.2;
        }

        .empty-results {
          padding: 70px 20px;

          display: flex;
          flex-direction: column;
          align-items: center;

          gap: 15px;

          border: 1px dashed rgba(11,36,51,0.25);
          border-radius: 18px;
        }

        .empty-results span {
          font-size: 11px;
          letter-spacing: 0.12em;
          font-weight: 800;
        }

        .empty-results button {
          border: 0;

          background: var(--cp-navy);
          color: white;

          padding: 12px 20px;

          border-radius: 999px;

          font-size: 9px;
          font-weight: 800;

          cursor: pointer;
        }

        .project-approach {
          min-height: 440px;

          position: relative;
          overflow: hidden;

          padding: 78px 0;

          background:
            radial-gradient(
              circle at 80% 20%,
              rgba(65,122,149,0.16),
              transparent 25%
            ),
            var(--cp-navy-deep);

          color: white;
        }

        .approach-inner {
          width: min(1180px, calc(100% - 100px));
          margin: auto;

          position: relative;
          z-index: 3;

          display: grid;

          grid-template-columns:
            0.8fr
            1.4fr;

          gap: 80px;

          align-items: center;
        }

        .section-number.light {
          color: rgba(255,255,255,0.65);
        }

        .approach-title h2 {
          color: white;
        }

        .approach-title h2 em {
          color: rgba(255,255,255,0.9);
        }

        .approach-steps {
          display: grid;

          grid-template-columns:
            repeat(4, 1fr);

          gap: 0;
        }

        .approach-step {
          min-height: 160px;

          position: relative;

          padding-right: 20px;
        }

        .step-number {
          width: 34px;
          height: 34px;

          display: flex;
          align-items: center;
          justify-content: center;

          border:
            1px solid rgba(255,255,255,0.65);

          border-radius: 50%;

          font-size: 10px;
        }

        .step-line {
          position: absolute;

          top: 17px;
          left: 34px;
          right: 20px;

          height: 1px;

          background:
            rgba(255,255,255,0.22);
        }

        .approach-step:last-child
        .step-line {
          display: none;
        }

        .approach-step h3 {
          margin: 27px 0 7px;

          font-size: 9px;
          letter-spacing: 0.08em;
        }

        .approach-step p {
          max-width: 125px;

          margin: 0;

          font-size: 9px;
          line-height: 1.45;

          color: rgba(255,255,255,0.58);
        }

        .approach-orbit {
          position: absolute;

          border:
            1px solid rgba(116,183,205,0.2);

          border-radius: 50%;
        }

        .approach-orbit-one {
          width: 620px;
          height: 250px;

          left: -220px;
          bottom: -140px;

          transform: rotate(-15deg);
        }

        .approach-orbit-two {
          width: 400px;
          height: 400px;

          right: -180px;
          top: -200px;
        }

        .approach-ball {
          position: absolute;
          border-radius: 50%;
        }

        .approach-ball-one {
          width: 42px;
          height: 42px;

          left: 3%;
          top: 35px;

          background:
            radial-gradient(
              circle at 30% 25%,
              #b5d9e4,
              #3e7d96 70%
            );

          animation:
            ballFloat 5s ease-in-out infinite;
        }

        .approach-ball-two {
          width: 60px;
          height: 60px;

          right: 2%;
          bottom: 30px;

          background:
            radial-gradient(
              circle at 30% 25%,
              #8ab9ca,
              #1b4e65 70%
            );

          animation:
            ballFloatReverse 6s ease-in-out infinite;
        }

        .projects-final-cta {
          background: var(--cp-paper);
          padding: 90px 0;
        }

        .final-cta-inner {
          width: min(1180px, calc(100% - 100px));
          margin: auto;

          display: flex;

          align-items: center;
          justify-content: space-between;

          gap: 60px;
        }

        .final-cta-inner h2 {
          margin: 0;

          font-size: clamp(48px, 5vw, 78px);
          line-height: 0.9;

          letter-spacing: -0.06em;
        }

        .final-cta-inner p {
          max-width: 450px;

          margin: 25px 0 0;

          font-size: 14px;
          line-height: 1.55;

          color: #67747a;
        }

        .final-cta-button {
          flex-shrink: 0;

          display: inline-flex;
          align-items: center;

          gap: 30px;

          padding: 18px 23px;

          border-radius: 999px;

          background: var(--cp-navy);
          color: white;

          text-decoration: none;

          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.13em;

          transition:
            transform 0.35s ease,
            background 0.35s ease;
        }

        .final-cta-button:hover {
          transform: translateY(-4px);
          background: var(--cp-blue);
        }

        /* =====================================================
           ANIMATIONS
        ===================================================== */

        @keyframes heroVerticalConveyorLarge {
          from {
            transform:
              translate3d(-50%, 0, 0);
          }

          to {
            transform:
              translate3d(-50%, -2420px, 0);
          }
        }

        @keyframes heroVerticalConveyor {
          from {
            transform:
              translate3d(-50%, 0, 0);
          }

          to {
            transform:
              translate3d(-50%, -2274px, 0);
          }
        }

        @keyframes ringFloat {
          0%,
          100% {
            transform:
              translateY(0)
              rotate(0deg);
          }

          50% {
            transform:
              translateY(-15px)
              rotate(12deg);
          }
        }

        @keyframes ballFloat {
          0%,
          100% {
            transform:
              translate3d(0,0,0);
          }

          50% {
            transform:
              translate3d(12px,-20px,0);
          }
        }

        @keyframes ballFloatReverse {
          0%,
          100% {
            transform:
              translate3d(0,0,0);
          }

          50% {
            transform:
              translate3d(-10px,15px,0);
          }
        }

        @keyframes mouseMove {
          0% {
            transform: translateY(0);
            opacity: 1;
          }

          50% {
            transform: translateY(5px);
            opacity: 0.4;
          }

          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 1100px) {
          .projects-hero-inner {
            width:
              min(100% - 60px, 1000px);
          }

          .projects-hero h1 {
            font-size:
              clamp(66px, 8vw, 100px);
          }

          .reference-intro-inner,
          .library-inner,
          .approach-inner,
          .final-cta-inner {
            width:
              min(100% - 60px, 1000px);
          }

          .project-reference-grid {
            grid-template-columns:
              repeat(2, 1fr);
          }

          .approach-inner {
            grid-template-columns: 1fr;
            gap: 50px;
          }

          .hero-conveyor-window {
            width: 570px;
          }

          .hero-conveyor-track {
            width: 370px;

            animation:
              heroVerticalConveyor
              25s
              linear
              infinite;
          }

          .hero-conveyor-card {
            width: 370px;
            height: 370px;
            flex-basis: 370px;
          }

          .hero-conveyor-loading {
            width: 370px;
            height: 370px;
            flex-basis: 370px;
          }

          .hero-conveyor-caption {
            right: -8px;
          }
        }

        @media (max-width: 820px) {
          .projects-hero {
            min-height: auto;
          }

          .projects-hero-inner {
            min-height: auto;

            padding:
              110px
              0
              70px;

            grid-template-columns: 1fr;
          }

          .projects-hero-copy {
            padding-top: 20px;
          }

          .projects-hero-visual {
            height: 570px;
          }

          .hero-conveyor-window {
            width: 100%;
            height: 540px;
          }

          .hero-conveyor-track {
            width: 380px;
          }

          .hero-conveyor-card {
            width: 380px;
            height: 380px;
            flex-basis: 380px;
          }

          .hero-conveyor-loading {
            width: 380px;
            height: 380px;
            flex-basis: 380px;
          }

          .hero-conveyor-caption {
            right: 5%;
            bottom: 18px;
          }

          .reference-intro-inner {
            grid-template-columns: 1fr;
            gap: 45px;
          }

          .filter-row {
            grid-template-columns:
              1fr
              1fr;
          }

          .reset-button {
            min-height: 58px;
          }

          .approach-steps {
            grid-template-columns:
              repeat(2, 1fr);

            gap: 30px 0;
          }

          .approach-step:nth-child(2)
          .step-line {
            display: none;
          }

          .final-cta-inner {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        @media (max-width: 600px) {
          .projects-hero-inner,
          .reference-intro-inner,
          .library-inner,
          .approach-inner,
          .final-cta-inner {
            width:
              calc(100% - 36px);
          }

          .projects-hero h1 {
            font-size: 66px;
          }

          .projects-hero-copy > p {
            font-size: 14px;
          }

          .projects-hero-visual {
            height: 470px;
          }

          .hero-conveyor-window {
            width: 100%;
            height: 450px;
          }

          .hero-conveyor-track {
            width: 285px;
            gap: 18px;
          }

          .hero-conveyor-card {
            width: 285px;
            height: 285px;
            flex-basis: 285px;

            border-radius: 25px;
          }

          .hero-conveyor-loading {
            width: 285px;
            height: 285px;
            flex-basis: 285px;

            border-radius: 25px;
          }

          .hero-conveyor-caption {
            right: 0;
            bottom: 8px;

            padding:
              10px
              13px;
          }

          .hero-conveyor-caption span {
            font-size: 7px;
          }

          .hero-conveyor-caption small {
            font-size: 5px;
          }

          .hero-conveyor-top {
            left: 16px;
            right: 16px;
            top: 15px;
          }

          .hero-conveyor-bottom {
            left: 16px;
            right: 16px;
            bottom: 15px;
          }

          .hero-conveyor-bottom strong {
            font-size: 11px;
          }

          .hero-ball-one {
            left: 5%;
          }

          .filter-search-row {
            grid-template-columns: 1fr;
          }

          .filter-button {
            min-height: 48px;
          }

          .filter-row {
            grid-template-columns: 1fr;
          }

          .project-reference-grid {
            grid-template-columns: 1fr;
          }

          .library-heading-row {
            align-items: flex-start;
          }

          .reference-count {
            padding-top: 20px;
          }

          .reference-count strong {
            font-size: 38px;
          }

          .approach-steps {
            grid-template-columns: 1fr;
            gap: 35px;
          }

          .approach-step {
            min-height: auto;
          }

          .approach-step .step-line {
            display: none;
          }

          .final-cta-inner h2 {
            font-size: 54px;
          }

          .final-cta-button {
            width: 100%;
            justify-content: center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .projects-page *,
          .projects-page *::before,
          .projects-page *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </>
  );
}