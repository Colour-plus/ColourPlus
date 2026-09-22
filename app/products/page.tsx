"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Layers3,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";


type Product = {
  id: string;
  no: string;
  name: string;
  category: string;
  categoryNo: string;
  description: string;
  applications: string[];
  benefits: string[];
  image: string;
  tag: string;
};

const categories = [
  {
    id: "all",
    no: "00",
    name: "All Systems",
    description:
      "Explore the Colourplus engineered surface portfolio.",
  },
  {
    id: "epoxy",
    no: "01",
    name: "Epoxy Systems",
    description:
      "Seamless flooring systems developed around durability, hygiene and industrial performance.",
  },
  {
    id: "polyurethane",
    no: "02",
    name: "Polyurethane Systems",
    description:
      "Resilient surface systems for demanding environments and continuous use.",
  },
  {
    id: "specialised",
    no: "03",
    name: "Specialised Flooring",
    description:
      "Performance-led systems for controlled, high-risk and specialised environments.",
  },
  {
    id: "protection",
    no: "04",
    name: "Protective Coatings",
    description:
      "Surface protection systems designed around exposure, durability and hygiene.",
  },
  {
    id: "waterproofing",
    no: "05",
    name: "Waterproofing",
    description:
      "Systems designed to control moisture, leakage and long-term deterioration.",
  },
  {
    id: "infrastructure",
    no: "06",
    name: "Surface Infrastructure",
    description:
      "Supporting systems that complete the performance of an engineered surface.",
  },
];

const products: Product[] = [
  {
    id: "epoxy-floor-coatings",
    no: "01",
    name: "Epoxy Floor Coatings",
    category: "epoxy",
    categoryNo: "01",
    description:
      "Engineered epoxy flooring systems developed for demanding industrial environments requiring durable and seamless surfaces.",
    applications: [
      "Industrial facilities",
      "Warehouses",
      "Manufacturing",
    ],
    benefits: [
      "Seamless and hygienic finish",
      "Excellent chemical resistance",
      "Withstands heavy traffic",
      "Easy to clean and maintain",
      "Long-lasting glossy appearance",
    ],
    image: "/images/products/epoxy-floor-coatings.png",
    tag: "CORE SYSTEM",
  },
  {
    id: "epoxy-self-levelling",
    no: "02",
    name: "Epoxy Self-Levelling Matt Finish",
    category: "epoxy",
    categoryNo: "01",
    description:
      "Self-levelling epoxy flooring with a refined matt finish for environments where seamless performance and appearance matter.",
    applications: [
      "Production areas",
      "Commercial spaces",
      "Industrial interiors",
    ],
    benefits: [
      "Uniform matt surface",
      "Stain and chemical resistance",
      "Low-maintenance and durable",
      "Improves visibility and aesthetics",
      "Ideal for controlled environments",
    ],
    image: "/images/products/epoxy-self-levelling.png",
    tag: "MATT FINISH",
  },
  {
    id: "high-build-epoxy-mortar",
    no: "03",
    name: "High-Build Epoxy Mortar",
    category: "epoxy",
    categoryNo: "01",
    description:
      "High-build epoxy mortar flooring for demanding applications requiring a robust surface build-up.",
    applications: [
      "Heavy industry",
      "High-load areas",
      "Industrial facilities",
    ],
    benefits: [
      "Extreme load resistance",
      "Repairs worn-out surfaces",
      "Durable and seamless",
      "Excellent bond to concrete",
      "Ideal for industrial zones",
    ],
    image: "/images/products/high-build-epoxy-mortar.png",
    tag: "HIGH BUILD",
  },
  {
    id: "epoxy-matt-finish",
    no: "04",
    name: "Epoxy Matt Finish Flooring",
    category: "epoxy",
    categoryNo: "01",
    description:
      "Aesthetic epoxy flooring with a controlled matt appearance for functional environments requiring a refined finish.",
    applications: [
      "Industrial interiors",
      "Commercial areas",
      "Workspaces",
    ],
    benefits: [
      "Clean and stylish look",
      "Resists stains and scratches",
      "Low maintenance requirements",
      "Enhances ambient appearance",
      "Suitable for interiors",
    ],
    image: "/images/products/epoxy-matt-finish.png",
    tag: "FINISH SYSTEM",
  },
  {
    id: "polyurethane-coating",
    no: "05",
    name: "Polyurethane Coating",
    category: "polyurethane",
    categoryNo: "02",
    description:
      "Polyurethane coating systems developed for demanding surface environments where durability and resilience are required.",
    applications: [
      "Industrial environments",
      "Manufacturing",
      "High-use areas",
    ],
    benefits: [
      "Excellent UV protection",
      "High elasticity and flexibility",
      "Retains gloss and color",
      "Withstands outdoor conditions",
      "Ideal for heavy use",
    ],
    image: "/images/products/polyurethane-coating.png",
    tag: "PU SYSTEM",
  },
  {
    id: "epoxy-polyurethane",
    no: "06",
    name: "Epoxy Polyurethane (EPU) Coating",
    category: "polyurethane",
    categoryNo: "02",
    description:
      "Hybrid epoxy-polyurethane coating technology positioned for demanding industrial surface requirements.",
    applications: [
      "Industrial flooring",
      "Production environments",
      "Heavy-use areas",
    ],
    benefits: [
      "Resistant to UV and heat",
      "High chemical tolerance",
      "Flexible yet tough",
      "Retains finish over time",
      "Suitable for harsh conditions",
    ],
    image: "/images/products/epoxy-polyurethane.png",
    tag: "HYBRID SYSTEM",
  },
  {
    id: "polycrete",
    no: "07",
    name: "Polycrete Flooring",
    category: "polyurethane",
    categoryNo: "02",
    description:
      "A high-performance flooring system positioned for demanding industrial environments and long-term surface use.",
    applications: [
      "Heavy industry",
      "Manufacturing",
      "High-traffic areas",
    ],
    benefits: [
      "Exceptional impact resistance",
      "Handles extreme conditions",
      "Resistant to harsh chemicals",
      "Quick curing and use",
      "Suitable for processing units",
    ],
    image: "/images/products/polycrete.png",
    tag: "PERFORMANCE",
  },
  {
    id: "esd-flooring",
    no: "08",
    name: "ESD Coating Flooring",
    category: "specialised",
    categoryNo: "03",
    description:
      "Electrostatic dissipative flooring for controlled environments where surface performance and electrical control are critical.",
    applications: [
      "Electronics",
      "IT environments",
      "Controlled areas",
    ],
    benefits: [
      "Prevents electrostatic damage",
      "Safe for electronic equipment",
      "Seamless and grounded surface",
      "Long-term static protection",
      "Ideal for sensitive zones",
    ],
    image: "/images/products/esd-flooring.png",
    tag: "CONTROLLED",
  },
  {
    id: "dielectric-flooring",
    no: "09",
    name: "Dielectric Insulation Flooring",
    category: "specialised",
    categoryNo: "03",
    description:
      "Specialised insulation flooring for applications requiring controlled electrical surface characteristics.",
    applications: [
      "Specialised facilities",
      "Electrical environments",
      "Industrial applications",
    ],
    benefits: [
      "High electrical insulation",
      "Safe for sensitive zones",
      "Resistant to chemicals",
      "Durable under stress",
      "Ideal for control rooms",
    ],
    image: "/images/products/dielectric-flooring.png",
    tag: "SPECIALISED",
  },
  {
    id: "anti-skid",
    no: "10",
    name: "Anti-Skid Coating Flooring",
    category: "specialised",
    categoryNo: "03",
    description:
      "Textured flooring systems developed to improve surface traction in areas where slip resistance is an important requirement.",
    applications: [
      "Wet areas",
      "Industrial facilities",
      "High-traffic zones",
    ],
    benefits: [
      "Improves workplace safety",
      "Durable under heavy use",
      "Custom texture options",
      "Suitable for wet areas",
      "Reduces risk of slipping",
    ],
    image: "/images/products/anti-skid.png",
    tag: "ANTI-SKID",
  },
  {
    id: "hygienic-wall-coatings",
    no: "11",
    name: "Hygienic Wall Coatings",
    category: "protection",
    categoryNo: "04",
    description:
      "Wall coating systems for environments where cleanability, hygiene and surface protection are important.",
    applications: [
      "Pharmaceutical",
      "Healthcare",
      "Food processing",
    ],
    benefits: [
      "Seamless, non-porous surface",
      "Resistant to splashes and stains",
      "Available in matte or gloss",
      "Long-term hygiene protection",
      "Complies with clean room needs",
    ],
    image: "/images/products/hygienic-wall-coatings.png",
    tag: "HYGIENIC",
  },
  {
    id: "anti-corrosive",
    no: "12",
    name: "Anti-Corrosive Coatings",
    category: "protection",
    categoryNo: "04",
    description:
      "Protective coating systems designed to help surfaces withstand demanding exposure conditions.",
    applications: [
      "Industrial assets",
      "Heavy engineering",
      "Exposed surfaces",
    ],
    benefits: [
      "Prevents rust and corrosion",
      "Extends equipment lifespan",
      "Strong chemical resistance",
      "Bonds firmly to surfaces",
      "Ideal for harsh environments",
    ],
    image: "/images/products/anti-corrosive.png",
    tag: "PROTECTION",
  },
  {
    id: "waterproofing",
    no: "13",
    name: "Waterproofing Systems",
    category: "waterproofing",
    categoryNo: "05",
    description:
      "Waterproofing systems designed to control moisture, leakage and deterioration across demanding project environments.",
    applications: [
      "Buildings",
      "Wet areas",
      "Infrastructure",
    ],
    benefits: [
      "Long-term moisture barrier",
      "Crack and UV resistant",
      "Prevents mold and seepage",
      "Compatible with various surfaces",
      "Protects structural integrity",
    ],
    image: "/images/products/waterproofing.png",
    tag: "WATER CONTROL",
  },
  {
    id: "cementitious-underlays",
    no: "14",
    name: "Cementitious Underlays",
    category: "infrastructure",
    categoryNo: "06",
    description:
      "Cementitious underlay systems used as part of the preparation and build-up of engineered surface environments.",
    applications: [
      "Floor preparation",
      "Industrial flooring",
      "Surface correction",
    ],
    benefits: [
      "Smooth, even surface",
      "Quick-setting formula",
      "Excellent bonding capability",
      "Enhances final finish",
      "Suitable for all coatings",
    ],
    image: "/images/products/cementitious-underlays.png",
    tag: "PREPARATION",
  },
  {
    id: "coving",
    no: "15",
    name: "Coving Systems",
    category: "infrastructure",
    categoryNo: "06",
    description:
      "Coving systems that integrate floor and wall junctions into seamless, hygienic surface environments.",
    applications: [
      "Food & beverage",
      "Pharmaceutical",
      "Healthcare",
    ],
    benefits: [
      "Eliminates dirt accumulation",
      "Easy to sanitize",
      "Impact and moisture resistant",
      "Matches floor finishes",
      "Essential for sterile areas",
    ],
    image: "/images/products/coving.png",
    tag: "DETAILING",
  },
  {
    id: "floor-marking",
    no: "16",
    name: "Industrial Floor Marking",
    category: "infrastructure",
    categoryNo: "06",
    description:
      "Industrial floor marking systems for defining movement, operational zones and spatial organisation.",
    applications: [
      "Warehouses",
      "Factories",
      "Logistics facilities",
    ],
    benefits: [
      "High visibility markings",
      "Fast drying application",
      "Abrasion resistant surface",
      "Improves safety compliance",
      "Organizes workspace efficiently",
    ],
    image: "/images/products/floor-marking.png",
    tag: "WAYFINDING",
  },
];


export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeProduct, setActiveProduct] = useState(products[0]);
  const [benefitsProduct, setBenefitsProduct] = useState<Product | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const revealRefs = useRef<HTMLElement[]>([]);

  const addRevealRef = (element: HTMLElement | null) => {
    if (element && !revealRefs.current.includes(element)) {
      revealRefs.current.push(element);
    }
  };

  useEffect(() => {
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

    revealRefs.current.forEach((element) =>
      observer.observe(element)
    );

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setBenefitsProduct(null);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setBenefitsProduct(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouse({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      activeCategory === "all" ||
      product.category === activeCategory;

    const searchMatch =
      product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      product.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return categoryMatch && searchMatch;
  });

  const activeCategoryData =
    categories.find(
      (category) => category.id === activeCategory
    ) || categories[0];

  return (
    <>
      <main className="products-page">

        {
}

        <div
          className="floating-orb"
          aria-hidden="true"
          style={{
            transform: `translate3d(${mouse.x * 0.012}px, ${
              mouse.y * 0.012
            }px, 0)`,
          }}
        />

        {
}

        <section className="products-hero">

          <video
            className="products-hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          >
            <source
              src="/videos/products-hero.mp4"
              type="video/mp4"
            />
          </video>

          <div className="products-hero-video-overlay" />

          <div className="hero-grid" />

          <div className="hero-glow hero-glow-one" />
          <div className="hero-glow hero-glow-two" />

          <div className="hero-ring hero-ring-one" />
          <div className="hero-ring hero-ring-two" />
          <div className="hero-ring hero-ring-three" />

          <div className="hero-top">
            <span>COLOURPLUS / PRODUCTS</span>
            <span>ENGINEERED SURFACES / INDIA</span>
          </div>

          <div
            className="hero-content reveal"
            ref={addRevealRef}
          >
            <div className="hero-index">
              <span>01</span>
              <i />
              <span>PRODUCT LIBRARY</span>
            </div>

            <h1>
              Engineered
              <br />
              systems.
              <br />
              <em>Specific surfaces.</em>
            </h1>

            <p>
              Explore the Colourplus product and solution portfolio
              through the performance requirements, environments and
              applications they are designed to serve.
            </p>

            <div className="hero-actions">
              <a
                href="#product-library"
                className="hero-button"
              >
                <span>EXPLORE PRODUCTS</span>
                <ArrowDown size={16} />
              </a>
            </div>
          </div>

          <div className="hero-bottom">
            <span>16 SYSTEMS / PORTFOLIO</span>

            <span className="hero-scroll">
              SCROLL TO EXPLORE
              <i />
            </span>
          </div>
        </section>

        {
}

        <section
          className="products-intro reveal"
          ref={addRevealRef}
        >
          <div className="intro-antigravity intro-orbit-one" />
          <div className="intro-antigravity intro-orbit-two" />
          <div className="intro-antigravity intro-orbit-three" />

          <div className="intro-floating-dot intro-dot-one" />
          <div className="intro-floating-dot intro-dot-two" />

          <div className="section-number intro-section-number">
            <span>02</span>
            <span>/ PRODUCT THINKING</span>
          </div>

          <div className="intro-grid">

            <div className="intro-heading">
              <p className="eyebrow">
                COLOURPLUS / SYSTEM APPROACH
              </p>

              <div className="intro-heading-line" />

              <h2>
                Not just a
                <br />
                product.
                <br />
                <em>A surface system.</em>
              </h2>
            </div>

            <div className="intro-copy">

              <div className="intro-copy-orbit" />

              <p className="intro-large">
                The right surface starts with understanding what the
                environment demands.
              </p>

              <p>
                The Colourplus portfolio brings together epoxy,
                polyurethane, specialised flooring, protective
                coatings, waterproofing and supporting surface
                systems.
              </p>

              <p>
                Each category is positioned around a particular
                application condition rather than treated as a
                generic material catalogue.
              </p>

              <div className="intro-status">
                <span className="status-dot" />

                <span>
                  SURFACE → ENVIRONMENT → PERFORMANCE
                </span>

                <i />
              </div>
            </div>
          </div>
        </section>

        {
}

        <section
          id="product-library"
          className="category-section"
        >
          <div className="category-background-grid" />

          <div className="category-glow category-glow-one" />
          <div className="category-glow category-glow-two" />

          <div className="category-orbit category-orbit-one" />
          <div className="category-orbit category-orbit-two" />

          <div className="category-inner">

            <div className="section-topline category-topline">
              <span>03 / PRODUCT LIBRARY</span>

              <span>
                {filteredProducts.length} SYSTEMS
              </span>
            </div>

            <div className="category-heading">

              <div className="category-heading-main">
                <p className="eyebrow light">
                  COLOURPLUS / PORTFOLIO ARCHITECTURE
                </p>

                <div className="category-title-line">
                  <span />
                </div>

                <h2>
                  Explore the
                  <br />
                  <em>system.</em>
                </h2>

                <div className="category-heading-marker">
                  <span>SELECT / DEFINE / EXPLORE</span>
                  <i />
                </div>
              </div>

              <div className="category-heading-side">
                <span className="category-side-number">
                  06
                </span>

                <p>
                  Move through the engineered surface portfolio by
                  system family or search directly for a product.
                </p>

                <div className="category-side-line" />
              </div>

            </div>

            <div className="category-interface">

              <div className="category-tabs">

                {categories.map((category) => {
                  const isActive =
                    activeCategory === category.id;

                  const productCount =
                    category.id === "all"
                      ? products.length
                      : products.filter(
                          (product) =>
                            product.category === category.id
                        ).length;

                  return (
                    <button
                      key={category.id}
                      type="button"
                      className={`category-module ${
                        isActive ? "active" : ""
                      }`}
                      onClick={() => {
                        setActiveCategory(category.id);

                        const firstMatch =
                          products.find(
                            (product) =>
                              category.id === "all" ||
                              product.category === category.id
                          );

                        if (firstMatch) {
                          setActiveProduct(firstMatch);
                        }
                      }}
                    >

                      <div className="category-module-top">
                        <span className="category-module-no">
                          {category.no}
                        </span>

                        <span className="category-module-count">
                          {String(productCount).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="category-module-body">

                        <div className="category-module-icon">
                          <Layers3
                            size={18}
                            strokeWidth={1.1}
                          />
                        </div>

                        <strong>
                          {category.name}
                        </strong>

                        <ChevronRight
                          size={16}
                          className="category-module-arrow"
                        />

                      </div>

                      <div className="category-module-description">
                        {category.description}
                      </div>

                      <div className="category-module-bottom">
                        <span>
                          {isActive
                            ? "ACTIVE SYSTEM FAMILY"
                            : "EXPLORE FAMILY"}
                        </span>

                        <i>
                          <span />
                        </i>
                      </div>

                      <div className="category-module-corner" />
                    </button>
                  );
                })}

              </div>

              <div className="category-search-panel">

                <div className="category-search-header">
                  <span>PRODUCT SEARCH</span>

                  <span>
                    LIVE FILTER
                  </span>
                </div>

                <div className="product-search">

                  <Search size={16} />

                  <input
                    type="text"
                    placeholder="Search systems"
                    value={searchTerm}
                    onChange={(event) =>
                      setSearchTerm(event.target.value)
                    }
                  />

                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() => setSearchTerm("")}
                      aria-label="Clear search"
                    >
                      <X size={14} />
                    </button>
                  )}

                </div>

                <div className="search-panel-status">
                  <span className="search-status-dot" />

                  <span>
                    {filteredProducts.length} matching
                    systems
                  </span>

                  <i />
                </div>

              </div>

            </div>

            <div className="category-description">

              <div className="category-description-index">
                <span>
                  {activeCategoryData.no}
                </span>

                <i />
              </div>

              <div className="category-description-copy">
                <span>
                  ACTIVE / {activeCategoryData.name}
                </span>

                <p>
                  {activeCategoryData.description}
                </p>
              </div>

              <div className="category-description-signal">
                <span />
                <span />
                <span />
              </div>

            </div>

          </div>
        </section>

        {
}

        <section className="product-explorer">
          <div className="explorer-grid" />

          <div className="explorer-inner">
            <div className="explorer-meta">
              <span>PRODUCT SYSTEMS</span>
              <span>SELECT / EXPLORE</span>
            </div>

            <div className="product-grid">
              {filteredProducts.map((product, index) => {
                const isActive =
                  activeProduct.id === product.id;

                return (
                  <button
                    key={product.id}
                    type="button"
                    className={`product-card ${
                      isActive ? "active" : ""
                    }`}
                    onMouseEnter={() =>
                      setActiveProduct(product)
                    }
                    onFocus={() =>
                      setActiveProduct(product)
                    }
                    onClick={() => {
                      setActiveProduct(product);
                      setBenefitsProduct(product);
                    }}
                  >
                    <div className="product-card-image">
                      <img
                        src={product.image}
                        alt={product.name}
                      />

                      <div className="product-card-overlay" />

                      <span className="product-card-tag">
                        {product.tag}
                      </span>

                      <span className="product-card-number">
                        {product.no}
                      </span>

                      <ArrowUpRight
                        size={18}
                        className="product-card-arrow"
                      />
                    </div>

                    <div className="product-card-content">
                      <div>
                        <span className="product-category">
                          {product.categoryNo} /{" "}
                          {
                            categories.find(
                              (category) =>
                                category.id ===
                                product.category
                            )?.name
                          }
                        </span>

                        <h3>{product.name}</h3>
                      </div>

                      <span className="product-card-index">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="product-card-line">
                      <span />
                    </div>
                  </button>
                );
              })}
            </div>

            {filteredProducts.length === 0 && (
              <div className="empty-state">
                <SlidersHorizontal size={20} />

                <strong>No matching systems.</strong>

                <p>
                  Try another product name or explore a different
                  system family.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setActiveCategory("all");
                  }}
                >
                  RESET LIBRARY
                </button>
              </div>
            )}
          </div>
        </section>

        {
}

        {benefitsProduct && (
          <div
            className="benefits-popup-layer"
            role="dialog"
            aria-modal="true"
            aria-label={`Key benefits of ${benefitsProduct.name}`}
          >
            <button
              type="button"
              className="benefits-popup-backdrop"
              aria-label="Close key benefits"
              onClick={() => setBenefitsProduct(null)}
            />

            <div className="benefits-popup">
              <div className="benefits-popup-image">
                <img src={benefitsProduct.image} alt="" />
                <div className="benefits-popup-image-overlay" />

                <div className="benefits-popup-meta">
                  <span>{benefitsProduct.no}</span>
                  <span>{benefitsProduct.tag}</span>
                </div>

                <div className="benefits-popup-orbit benefits-popup-orbit-one" />
                <div className="benefits-popup-orbit benefits-popup-orbit-two" />
              </div>

              <div className="benefits-popup-content">
                <div className="benefits-popup-top">
                  <div>
                    <span className="benefits-popup-eyebrow">
                      COLOURPLUS / KEY BENEFITS
                    </span>

                    <div className="benefits-popup-line" />

                    <h3>{benefitsProduct.name}</h3>
                  </div>

                  <button
                    type="button"
                    className="benefits-popup-close"
                    onClick={() => setBenefitsProduct(null)}
                    aria-label="Close key benefits"
                  >
                    <span>CLOSE</span>
                    <X size={18} strokeWidth={1.5} />
                  </button>
                </div>

                <p className="benefits-popup-description">
                  {benefitsProduct.description}
                </p>

                <div className="benefits-popup-list">
                  {benefitsProduct.benefits.map((benefit, index) => (
                    <div className="benefit-popup-row" key={benefit}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <strong>{benefit}</strong>
                      <ArrowUpRight size={14} />
                    </div>
                  ))}
                </div>

                <div className="benefits-popup-footer">
                  <span>CLICK ANOTHER PRODUCT TO CHANGE SYSTEM</span>
                  <i />
                  <span>SCROLL TO CLOSE</span>
                </div>
              </div>
            </div>
          </div>
        )}

       

        {
}

        

        {
}

        

        {
}

        {
}

        <footer className="products-footer">

          <span>
            © {new Date().getFullYear()} COLOURPLUS
            POLYURETHANES PVT. LTD.
          </span>

          <span>ENGINEERED SURFACES / INDIA</span>

          <Link href="/">
            BACK TO HOME
            <ArrowUpRight size={13} />
          </Link>

        </footer>

      </main>

      <style jsx>{`        .products-page { --navy: #07172b; --navy-deep: #030c17; --blue: #2c8fe7; --blue-soft: #72b8ef; --light: #f3f3f0; --white: #ffffff; --text: #09182b; --muted: #697686; --line: rgba(7, 23, 43, 0.13); width: 100%; overflow: hidden; background: var(--light); color: var(--text); }
        .products-page * { box-sizing: border-box; }
        .products-page a { text-decoration: none; }
        .eyebrow { margin: 0 0 20px; font-size: 9px; line-height: 1; letter-spacing: 0.19em; text-transform: uppercase; font-weight: 700; color: #657286; }
        .eyebrow.light { color: rgba(255, 255, 255, 0.58); }
        .reveal { opacity: 0; transform: translateY(42px); transition: opacity 0.9s ease, transform 1.1s cubic-bezier(0.22, 1, 0.36, 1); }
        .reveal.is-visible { opacity: 1; transform: translateY(0); }
        .floating-orb { position: fixed; width: 22px; height: 22px; border: 1px solid rgba(44, 143, 231, 0.42); border-radius: 50%; pointer-events: none; z-index: 100; left: -11px; top: -11px; transition: transform 0.25s ease-out; mix-blend-mode: multiply; }
        .products-hero { min-height: 96vh; height: 96vh; max-height: 1000px; position: relative; overflow: hidden; background: var(--navy); color: white; }
        .products-hero-video { position: absolute; inset: 0; width: 100%; height: 100%; display: block; object-fit: cover; object-position: center; z-index: 0; transform: scale(1.04); animation: productHeroVideoScale 12s ease-out forwards; pointer-events: none; }
        .products-hero-video-overlay { position: absolute; inset: 0; z-index: 1; background: linear-gradient( 90deg, rgba(3, 12, 23, 0.78) 0%, rgba(3, 12, 23, 0.50) 38%, rgba(3, 12, 23, 0.18) 72%, rgba(3, 12, 23, 0.12) 100% ), linear-gradient( 0deg, rgba(3, 12, 23, 0.56) 0%, rgba(3, 12, 23, 0.05) 48%, rgba(3, 12, 23, 0.24) 100% ); pointer-events: none; }
        .hero-grid { position: absolute; inset: 0; z-index: 2; opacity: 0.22; background-image: linear-gradient( rgba(255, 255, 255, 0.045) 1px, transparent 1px ), linear-gradient( 90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px ); background-size: 72px 72px; mask-image: linear-gradient( 90deg, black, rgba(0, 0, 0, 0.35) ); pointer-events: none; }
        .hero-glow { position: absolute; border-radius: 50%; filter: blur(1px); pointer-events: none; z-index: 2; }
        .hero-glow-one { width: 460px; height: 460px; right: 7%; top: 20%; border: 1px solid rgba(44, 143, 231, 0.22); box-shadow: 0 0 100px rgba(44, 143, 231, 0.1), inset 0 0 100px rgba(44, 143, 231, 0.05); animation: heroFloat 8s ease-in-out infinite; }
        .hero-glow-two { width: 260px; height: 260px; right: 16%; top: 31%; border: 1px solid rgba(255, 255, 255, 0.09); animation: heroFloatReverse 11s ease-in-out infinite; }
        .hero-ring { position: absolute; border-radius: 50%; border: 1px solid rgba(255, 255, 255, 0.08); pointer-events: none; z-index: 2; }
        .hero-ring-one { width: 700px; height: 700px; right: -180px; top: 5%; animation: rotateSlow 30s linear infinite; }
        .hero-ring-two { width: 900px; height: 900px; right: -280px; top: -5%; border-style: dashed; opacity: 0.4; animation: rotateSlowReverse 42s linear infinite; }
        .hero-ring-three { width: 1100px; height: 1100px; right: -380px; top: -15%; opacity: 0.22; animation: rotateSlow 55s linear infinite; }
        .hero-top { position: absolute; left: 6vw; right: 6vw; top: 32px; display: flex; justify-content: space-between; padding-bottom: 18px; border-bottom: 1px solid rgba(255, 255, 255, 0.12); font-size: 8px; letter-spacing: 0.18em; color: rgba(255, 255, 255, 0.55); z-index: 4; }
        .hero-content { position: relative; z-index: 5; width: min( 1280px, calc(100% - 12vw) ); margin: 0 auto; padding-top: 17vh; }
        .hero-index { display: flex; align-items: center; gap: 14px; margin-bottom: 28px; font-size: 9px; letter-spacing: 0.18em; color: rgba(255, 255, 255, 0.58); }
        .hero-index span:first-child { color: var(--blue-soft); font-size: 11px; font-weight: 700; }
        .hero-index i { width: 42px; height: 1px; background: rgba(255, 255, 255, 0.3); }
        .hero-content h1 { max-width: 850px; margin: 0; font-size: clamp( 58px, 7.3vw, 112px ); line-height: 0.9; letter-spacing: -0.055em; font-weight: 500; text-shadow: 0 8px 35px rgba(0, 0, 0, 0.18); }
        .hero-content h1 em { color: var(--blue-soft); font-family: Georgia, "Times New Roman", serif; font-weight: 400; }
        .hero-content p { max-width: 510px; margin: 36px 0 0; color: rgba(255, 255, 255, 0.72); font-size: 14px; line-height: 1.8; text-shadow: 0 3px 18px rgba(0, 0, 0, 0.2); }
        .hero-actions { display: flex; align-items: center; gap: 28px; margin-top: 38px; }
        .hero-button { display: inline-flex; align-items: center; gap: 14px; padding: 15px 20px; color: var(--navy); background: white; font-size: 9px; letter-spacing: 0.16em; font-weight: 700; transition: transform 0.3s ease; }
        .hero-button:hover { transform: translateY(-3px); }
        .hero-bottom { position: absolute; left: 6vw; right: 6vw; bottom: 30px; z-index: 4; display: flex; justify-content: space-between; align-items: center; font-size: 8px; letter-spacing: 0.18em; color: rgba(255, 255, 255, 0.48); }
        .hero-scroll { display: flex; justify-content: flex-end; align-items: center; gap: 12px; }
        .hero-scroll i { display: block; width: 45px; height: 1px; background: rgba(255, 255, 255, 0.5); animation: scrollLine 2s ease-in-out infinite; transform-origin: left; }
        .products-intro { position: relative; min-height: 455px; padding: 62px 7vw 66px; background: var(--light); overflow: hidden; isolation: isolate; }
        .intro-section-number { position: relative; z-index: 3; margin-bottom: 38px; }
        .intro-grid { position: relative; z-index: 3; display: grid; grid-template-columns: 1.05fr 0.75fr; gap: 8vw; max-width: 1280px; margin: 0 auto; }
        .intro-heading { position: relative; opacity: 0; transform: translate3d( -28px, 24px, 0 ); transition: opacity 0.8s ease, transform 1.15s cubic-bezier( 0.16, 1, 0.3, 1 ); }

        .products-intro.is-visible
        .intro-heading { opacity: 1; transform: translate3d( 0, 0, 0 ); }
        .intro-heading .eyebrow { margin-bottom: 14px; }
        .intro-heading-line { width: 0; height: 1px; margin-bottom: 20px; background: linear-gradient( 90deg, var(--blue), rgba(44, 143, 231, 0.05) ); transition: width 1s 0.2s cubic-bezier( 0.16, 1, 0.3, 1 ); }

        .products-intro.is-visible
        .intro-heading-line { width: 150px; }
        .intro-heading h2 { margin: 0; font-size: clamp( 45px, 5.5vw, 76px ); line-height: 0.92; letter-spacing: -0.05em; font-weight: 500; }
        .intro-heading h2 em { font-family: Georgia, "Times New Roman", serif; font-weight: 400; color: #6e7886; }
        .intro-copy { position: relative; padding-top: 4px; opacity: 0; transform: translate3d( 28px, 30px, 0 ); transition: opacity 0.85s 0.15s ease, transform 1.2s 0.15s cubic-bezier( 0.16, 1, 0.3, 1 ); }

        .products-intro.is-visible
        .intro-copy { opacity: 1; transform: translate3d( 0, 0, 0 ); }
        .intro-copy::before { content: ""; position: absolute; left: -24px; top: 0; width: 1px; height: 0; background: linear-gradient( 180deg, rgba(44, 143, 231, 0.55), rgba(44, 143, 231, 0) ); transition: height 1.1s 0.35s cubic-bezier( 0.16, 1, 0.3, 1 ); }

        .products-intro.is-visible
        .intro-copy::before { height: 100%; }
        .intro-copy-orbit { position: absolute; width: 72px; height: 72px; right: -25px; top: -35px; border: 1px solid rgba(44, 143, 231, 0.15); border-radius: 50%; animation: introOrbitFloat 7s ease-in-out infinite; }
        .intro-copy-orbit::before { content: ""; position: absolute; width: 5px; height: 5px; top: 9px; right: 11px; border-radius: 50%; background: var(--blue); box-shadow: 0 0 0 6px rgba(44, 143, 231, 0.06); }
        .intro-copy-orbit::after { content: ""; position: absolute; inset: 17px; border: 1px solid rgba(44, 143, 231, 0.12); border-radius: 50%; }
        .intro-copy p { margin: 0 0 17px; color: var(--muted); font-size: 12px; line-height: 1.72; }
        .intro-copy .intro-large { max-width: 460px; color: var(--text); font-size: 18px; line-height: 1.48; letter-spacing: -0.02em; opacity: 0; transform: translateY(15px); transition: opacity 0.75s 0.35s ease, transform 0.9s 0.35s cubic-bezier( 0.16, 1, 0.3, 1 ); }

        .products-intro.is-visible
        .intro-large { opacity: 1; transform: translateY(0); }
        .intro-copy > p:not(.intro-large) { opacity: 0; transform: translateY(12px); transition: opacity 0.7s ease, transform 0.8s cubic-bezier( 0.16, 1, 0.3, 1 ); }

        .products-intro.is-visible
        .intro-copy > p:nth-of-type(2) { opacity: 1; transform: translateY(0); transition-delay: 0.48s; }

        .products-intro.is-visible
        .intro-copy > p:nth-of-type(3) { opacity: 1; transform: translateY(0); transition-delay: 0.6s; }
        .intro-status { position: relative; display: flex; align-items: center; gap: 10px; margin-top: 24px; padding-top: 15px; border-top: 1px solid var(--line); color: #647083; font-size: 7px; letter-spacing: 0.15em; opacity: 0; transform: translateY(14px); transition: opacity 0.7s 0.72s ease, transform 0.8s 0.72s cubic-bezier( 0.16, 1, 0.3, 1 ); }

        .products-intro.is-visible
        .intro-status { opacity: 1; transform: translateY(0); }
        .intro-status i { display: block; flex: 1; max-width: 80px; height: 1px; background: linear-gradient( 90deg, rgba(44, 143, 231, 0.4), transparent ); transform-origin: left; animation: statusLine 3s ease-in-out infinite; }
        .status-dot { flex: 0 0 auto; width: 6px; height: 6px; border-radius: 50%; background: var(--blue); box-shadow: 0 0 14px rgba(44, 143, 231, 0.5); animation: pulse 2s ease-in-out infinite; }
        .intro-antigravity { position: absolute; z-index: 1; border-radius: 50%; pointer-events: none; }
        .intro-orbit-one { width: 320px; height: 320px; right: -130px; top: 18%; border: 1px solid rgba(44, 143, 231, 0.075); animation: introOrbitalDrift 18s linear infinite; }
        .intro-orbit-two { width: 470px; height: 470px; right: -205px; top: 1%; border: 1px dashed rgba(44, 143, 231, 0.055); animation: introOrbitalDriftReverse 27s linear infinite; }
        .intro-orbit-three { width: 690px; height: 690px; left: -400px; top: -210px; border: 1px solid rgba(7, 23, 43, 0.045); animation: introOrbitalDrift 34s linear infinite; }
        .intro-floating-dot { position: absolute; z-index: 1; width: 5px; height: 5px; border-radius: 50%; background: rgba(44, 143, 231, 0.55); box-shadow: 0 0 0 7px rgba(44, 143, 231, 0.045); pointer-events: none; }
        .intro-dot-one { right: 17%; top: 23%; animation: introDotFloat 5s ease-in-out infinite; }
        .intro-dot-two { right: 10%; bottom: 18%; opacity: 0.4; animation: introDotFloatReverse 6.5s ease-in-out infinite; }
        .category-section::before { content: ""; position: absolute; inset: 0; z-index: -2; background: linear-gradient(90deg, rgba(3, 12, 23, 0.94) 0%, rgba(3, 12, 23, 0.78) 45%, rgba(3, 12, 23, 0.58) 100%), url("/images/products/product-families-bg.jpg") center / cover no-repeat; opacity: 0.9; transform: scale(1.04); animation: categoryBackgroundDrift 18s ease-in-out infinite; pointer-events: none; }
        .category-section::after { content: ""; position: absolute; inset: 0; z-index: -1; background: radial-gradient(circle at 76% 30%, rgba(44, 143, 231, 0.12), transparent 28%); pointer-events: none; }
        .category-section { position: relative; overflow: hidden; padding: 86px 7vw 72px; background: radial-gradient( circle at 78% 30%, rgba(44, 143, 231, 0.11), transparent 24% ), var(--navy); color: white; isolation: isolate; }
        .category-background-grid { position: absolute; inset: 0; opacity: 0.42; background-image: linear-gradient( rgba(255, 255, 255, 0.04) 1px, transparent 1px ), linear-gradient( 90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px ); background-size: 72px 72px; pointer-events: none; animation: categoryGridMove 22s linear infinite; }
        .category-glow { position: absolute; border-radius: 50%; pointer-events: none; z-index: 0; }
        .category-glow-one { width: 520px; height: 520px; right: -180px; top: 18%; border: 1px solid rgba(44, 143, 231, 0.13); box-shadow: 0 0 130px rgba(44, 143, 231, 0.08); animation: categoryGlowFloat 10s ease-in-out infinite; }
        .category-glow-two { width: 250px; height: 250px; left: -110px; bottom: 5%; border: 1px solid rgba(255, 255, 255, 0.06); animation: categoryGlowFloatReverse 13s ease-in-out infinite; }
        .category-orbit { position: absolute; border-radius: 50%; pointer-events: none; z-index: 0; }
        .category-orbit-one { width: 690px; height: 690px; right: -270px; top: -80px; border: 1px solid rgba(255, 255, 255, 0.06); animation: rotateSlow 38s linear infinite; }
        .category-orbit-two { width: 430px; height: 430px; right: -140px; top: 50px; border: 1px dashed rgba(44, 143, 231, 0.14); animation: rotateSlowReverse 27s linear infinite; }
        .category-inner { position: relative; z-index: 2; max-width: 1280px; margin: 0 auto; }
        .section-topline { display: flex; justify-content: space-between; padding-bottom: 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.13); font-size: 8px; letter-spacing: 0.17em; color: rgba(255, 255, 255, 0.38); }
        .category-topline { opacity: 0; transform: translateY(15px); animation: categoryFadeUp 0.8s 0.1s cubic-bezier( 0.16, 1, 0.3, 1 ) forwards; }
        .category-heading { display: grid; grid-template-columns: 1fr 0.43fr; gap: 8vw; align-items: end; margin: 58px 0 48px; }
        .category-heading-main { position: relative; }
        .category-heading-main .eyebrow { margin-bottom: 14px; }
        .category-title-line { width: 0; height: 1px; margin-bottom: 21px; background: linear-gradient( 90deg, var(--blue), rgba(44, 143, 231, 0) ); animation: categoryTitleLine 1.2s 0.3s cubic-bezier( 0.16, 1, 0.3, 1 ) forwards; }
        .category-heading h2 { margin: 0; font-size: clamp( 50px, 6vw, 82px ); line-height: 0.9; letter-spacing: -0.055em; font-weight: 500; opacity: 0; transform: translateY(25px); animation: categoryFadeUp 1s 0.25s cubic-bezier( 0.16, 1, 0.3, 1 ) forwards; }
        .category-heading h2 em { color: var(--blue-soft); font-family: Georgia, "Times New Roman", serif; font-weight: 400; }
        .category-heading-marker { display: flex; align-items: center; gap: 12px; margin-top: 23px; color: rgba(255, 255, 255, 0.3); font-size: 7px; letter-spacing: 0.16em; opacity: 0; animation: categoryFadeUp 0.8s 0.65s cubic-bezier( 0.16, 1, 0.3, 1 ) forwards; }
        .category-heading-marker i { display: block; width: 75px; height: 1px; background: rgba(44, 143, 231, 0.42); transform-origin: left; animation: markerLine 3s 1.2s ease-in-out infinite; }
        .category-heading-side { position: relative; padding-left: 25px; padding-bottom: 2px; opacity: 0; transform: translateY(25px); animation: categoryFadeUp 1s 0.45s cubic-bezier( 0.16, 1, 0.3, 1 ) forwards; }
        .category-heading-side::before { content: ""; position: absolute; left: 0; top: 0; width: 1px; height: 0; background: linear-gradient( 180deg, var(--blue), transparent ); animation: sideLineGrow 1s 0.8s cubic-bezier( 0.16, 1, 0.3, 1 ) forwards; }
        .category-side-number { display: block; margin-bottom: 14px; color: var(--blue-soft); font-size: 27px; line-height: 1; font-weight: 500; }
        .category-heading-side p { max-width: 340px; margin: 0; color: rgba(255, 255, 255, 0.48); font-size: 12px; line-height: 1.8; }
        .category-side-line { width: 100%; max-width: 150px; height: 1px; margin-top: 20px; background: linear-gradient( 90deg, rgba(44, 143, 231, 0.5), transparent ); }
        .category-interface { display: grid; grid-template-columns: minmax(0, 1fr) 250px; gap: 26px; align-items: start; }
        .category-tabs { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
        .category-module { position: relative; min-height: 164px; padding: 18px 19px 16px; border: 1px solid rgba(255, 255, 255, 0.09); border-radius: 2px; background: linear-gradient( 145deg, rgba(255, 255, 255, 0.055), rgba(255, 255, 255, 0.018) ); color: rgba(255, 255, 255, 0.52); text-align: left; cursor: pointer; overflow: hidden; opacity: 0; transform: translateY(28px); animation: categoryModuleReveal 0.85s cubic-bezier( 0.16, 1, 0.3, 1 ) forwards; transition: transform 0.45s cubic-bezier( 0.22, 1, 0.36, 1 ), border-color 0.35s ease, background 0.35s ease, color 0.35s ease, box-shadow 0.45s ease; }
        .category-module:nth-child(1) { animation-delay: 0.25s; }
        .category-module:nth-child(2) { animation-delay: 0.34s; }
        .category-module:nth-child(3) { animation-delay: 0.43s; }
        .category-module:nth-child(4) { animation-delay: 0.52s; }
        .category-module:nth-child(5) { animation-delay: 0.61s; }
        .category-module:nth-child(6) { animation-delay: 0.70s; }
        .category-module:nth-child(7) { animation-delay: 0.79s; }
        .category-module::before { content: ""; position: absolute; left: 0; bottom: 0; width: 100%; height: 2px; background: linear-gradient( 90deg, var(--blue), rgba(44, 143, 231, 0) ); transform: scaleX(0); transform-origin: left; transition: transform 0.5s cubic-bezier( 0.16, 1, 0.3, 1 ); }
        .category-module::after { content: ""; position: absolute; width: 130px; height: 130px; right: -70px; bottom: -70px; border-radius: 50%; border: 1px solid rgba(44, 143, 231, 0.12); transition: transform 0.6s cubic-bezier( 0.16, 1, 0.3, 1 ), opacity 0.4s ease; }
        .category-module:hover { z-index: 2; color: white; transform: translateY(-6px); border-color: rgba(44, 143, 231, 0.38); background: linear-gradient( 145deg, rgba(44, 143, 231, 0.11), rgba(255, 255, 255, 0.035) ); box-shadow: 0 18px 45px rgba(0, 0, 0, 0.18); }

        .category-module:hover::before,
        .category-module.active::before { transform: scaleX(1); }

        .category-module:hover::after,
        .category-module.active::after { transform: scale(1.35); opacity: 1; }
        .category-module.active { color: white; border-color: rgba(44, 143, 231, 0.48); background: linear-gradient( 145deg, rgba(44, 143, 231, 0.15), rgba(255, 255, 255, 0.04) ); box-shadow: inset 0 0 0 1px rgba(44, 143, 231, 0.05), 0 12px 35px rgba(0, 0, 0, 0.12); }
        .category-module-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
        .category-module-no { color: var(--blue-soft); font-size: 9px; font-weight: 700; letter-spacing: 0.12em; }
        .category-module-count { color: rgba(255, 255, 255, 0.23); font-size: 8px; letter-spacing: 0.12em; }
        .category-module-body { position: relative; z-index: 2; display: grid; grid-template-columns: 30px 1fr 18px; align-items: center; gap: 10px; }
        .category-module-icon { display: grid; place-items: center; width: 28px; height: 28px; border: 1px solid rgba(44, 143, 231, 0.25); border-radius: 50%; color: var(--blue-soft); transition: transform 0.5s cubic-bezier( 0.16, 1, 0.3, 1 ), background 0.35s ease; }

        .category-module:hover
        .category-module-icon,
        .category-module.active
        .category-module-icon { transform: rotate(12deg) scale(1.08); background: rgba(44, 143, 231, 0.1); }
        .category-module-body strong { font-size: 12px; line-height: 1.2; letter-spacing: -0.01em; font-weight: 600; }
        .category-module-arrow { opacity: 0.3; transform: translateX(-5px); transition: opacity 0.3s ease, transform 0.4s cubic-bezier( 0.16, 1, 0.3, 1 ); }

        .category-module:hover
        .category-module-arrow,
        .category-module.active
        .category-module-arrow { opacity: 1; transform: translateX(0); color: var(--blue-soft); }
        .category-module-description { position: relative; z-index: 2; max-width: 350px; margin-top: 14px; color: rgba(255, 255, 255, 0.34); font-size: 9px; line-height: 1.55; transition: color 0.35s ease; }

        .category-module:hover
        .category-module-description,
        .category-module.active
        .category-module-description { color: rgba(255, 255, 255, 0.52); }
        .category-module-bottom { position: absolute; left: 19px; right: 19px; bottom: 11px; z-index: 3; display: flex; align-items: center; gap: 9px; color: rgba(255, 255, 255, 0.21); font-size: 6px; letter-spacing: 0.14em; }
        .category-module-bottom > i { display: block; flex: 1; height: 1px; background: rgba(255, 255, 255, 0.08); overflow: hidden; }
        .category-module-bottom > i span { display: block; width: 30%; height: 100%; background: rgba(44, 143, 231, 0.55); animation: categorySignal 2.8s ease-in-out infinite; }

        .category-module.active
        .category-module-bottom { color: rgba(114, 184, 239, 0.8); }
        .category-module-corner { position: absolute; top: 0; right: 0; width: 18px; height: 18px; border-top: 1px solid rgba(44, 143, 231, 0.5); border-right: 1px solid rgba(44, 143, 231, 0.5); opacity: 0; transform: translate(-5px, 5px); transition: opacity 0.3s ease, transform 0.4s ease; }

        .category-module:hover
        .category-module-corner,
        .category-module.active
        .category-module-corner { opacity: 1; transform: translate(0, 0); }
        .category-search-panel { min-height: 164px; padding: 17px; border: 1px solid rgba(255, 255, 255, 0.1); background: rgba(255, 255, 255, 0.025); backdrop-filter: blur(10px); opacity: 0; transform: translateX(25px); animation: categorySearchReveal 1s 0.55s cubic-bezier( 0.16, 1, 0.3, 1 ) forwards; }
        .category-search-header { display: flex; justify-content: space-between; padding-bottom: 13px; margin-bottom: 13px; border-bottom: 1px solid rgba(255, 255, 255, 0.09); color: rgba(255, 255, 255, 0.3); font-size: 6px; letter-spacing: 0.16em; }
        .product-search { display: flex; align-items: center; gap: 12px; min-height: 49px; padding: 0 15px; border: 1px solid rgba(255, 255, 255, 0.15); background: rgba(255, 255, 255, 0.035); transition: border-color 0.3s ease, box-shadow 0.3s ease; }
        .product-search:focus-within { border-color: rgba(44, 143, 231, 0.55); box-shadow: 0 0 0 3px rgba(44, 143, 231, 0.06); }
        .product-search svg { color: rgba(255, 255, 255, 0.45); }
        .product-search input { width: 100%; border: 0; outline: 0; background: transparent; color: white; font-size: 11px; }
        .product-search input::placeholder { color: rgba(255, 255, 255, 0.35); }
        .product-search button { display: grid; place-items: center; border: 0; background: transparent; color: rgba(255, 255, 255, 0.45); cursor: pointer; }
        .search-panel-status { display: flex; align-items: center; gap: 8px; margin-top: 17px; color: rgba(255, 255, 255, 0.3); font-size: 7px; letter-spacing: 0.08em; }
        .search-panel-status i { flex: 1; height: 1px; background: linear-gradient( 90deg, rgba(44, 143, 231, 0.3), transparent ); }
        .search-status-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--blue); box-shadow: 0 0 10px rgba(44, 143, 231, 0.55); animation: pulse 2s ease-in-out infinite; }
        .category-description { display: grid; grid-template-columns: 70px minmax(0, 1fr) 110px; gap: 25px; align-items: center; margin-top: 36px; padding-top: 19px; border-top: 1px solid rgba(255, 255, 255, 0.1); opacity: 0; transform: translateY(18px); animation: categoryFadeUp 0.9s 1s cubic-bezier( 0.16, 1, 0.3, 1 ) forwards; }
        .category-description-index { display: flex; align-items: center; gap: 10px; }
        .category-description-index span { color: var(--blue-soft); font-size: 16px; font-weight: 500; }
        .category-description-index i { width: 20px; height: 1px; background: rgba(44, 143, 231, 0.45); }
        .category-description-copy > span { display: block; margin-bottom: 8px; color: rgba(255, 255, 255, 0.3); font-size: 7px; letter-spacing: 0.16em; }
        .category-description-copy p { max-width: 680px; margin: 0; color: rgba(255, 255, 255, 0.48); font-size: 11px; line-height: 1.65; }
        .category-description-signal { display: flex; justify-content: flex-end; align-items: center; gap: 5px; }
        .category-description-signal span { display: block; width: 4px; height: 4px; border-radius: 50%; background: rgba(44, 143, 231, 0.4); }
        .category-description-signal span:nth-child(2) { width: 22px; border-radius: 0; animation: signalExpand 2.5s ease-in-out infinite; }
        .product-explorer { position: relative; padding: 100px 7vw 115px; background: #e9ebeb; overflow: hidden; }
        .explorer-grid { position: absolute; inset: 0; opacity: 0.5; background-image: linear-gradient( rgba(7, 23, 43, 0.04) 1px, transparent 1px ), linear-gradient( 90deg, rgba(7, 23, 43, 0.04) 1px, transparent 1px ); background-size: 72px 72px; pointer-events: none; }
        .explorer-inner { position: relative; max-width: 1280px; margin: 0 auto; }
        .explorer-meta { display: flex; justify-content: space-between; padding-bottom: 16px; border-bottom: 1px solid var(--line); font-size: 8px; letter-spacing: 0.17em; color: #7a8592; }
        .product-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; margin-top: 50px; background: rgba(7, 23, 43, 0.13); }
        .product-card { position: relative; padding: 0; border: 0; background: #eef0ef; text-align: left; cursor: pointer; overflow: hidden; transition: background 0.4s ease, transform 0.4s cubic-bezier( 0.22, 1, 0.36, 1 ); }
        .product-card:hover { z-index: 2; background: white; transform: translateY(-6px); box-shadow: 0 25px 60px rgba(7, 23, 43, 0.12); }
        .product-card.active { background: white; }
        .product-card-image { position: relative; height: 255px; overflow: hidden; background: var(--navy); }
        .product-card-image img { width: 100%; height: 100%; display: block; object-fit: cover; transition: transform 0.8s cubic-bezier( 0.22, 1, 0.36, 1 ), filter 0.5s ease; }

        .product-card:hover img,
        .product-card.active img { transform: scale(1.07); filter: saturate(1.05); }
        .product-card-overlay { position: absolute; inset: 0; background: linear-gradient( 180deg, rgba(7, 23, 43, 0.05), rgba(7, 23, 43, 0.7) ); }
        .product-card-tag { position: absolute; top: 17px; left: 17px; padding: 6px 8px; border: 1px solid rgba(255, 255, 255, 0.25); background: rgba(7, 23, 43, 0.35); backdrop-filter: blur(8px); color: rgba(255, 255, 255, 0.8); font-size: 7px; letter-spacing: 0.16em; }
        .product-card-number { position: absolute; left: 17px; bottom: 16px; color: white; font-size: 10px; font-weight: 700; }
        .product-card-arrow { position: absolute; right: 17px; bottom: 16px; color: white; opacity: 0.6; transition: 0.3s ease; }

        .product-card:hover .product-card-arrow,
        .product-card.active .product-card-arrow { opacity: 1; transform: translate(3px, -3px); }
        .product-card-content { display: flex; justify-content: space-between; gap: 20px; min-height: 126px; padding: 22px 20px 18px; }
        .product-category { display: block; margin-bottom: 11px; color: #758191; font-size: 7px; letter-spacing: 0.16em; text-transform: uppercase; }
        .product-card h3 { max-width: 270px; margin: 0; color: var(--text); font-size: 17px; line-height: 1.15; letter-spacing: -0.025em; font-weight: 600; }
        .product-card-index { color: #a2a9b1; font-size: 8px; }
        .product-card-line { display: block; height: 2px; background: rgba(7, 23, 43, 0.08); }
        .product-card-line span { display: block; width: 0; height: 100%; background: var(--blue); transition: width 0.6s cubic-bezier( 0.22, 1, 0.36, 1 ); }

        .product-card:hover .product-card-line span,
        .product-card.active .product-card-line span { width: 100%; }
        .empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 300px; text-align: center; }
        .empty-state svg { margin-bottom: 16px; color: var(--blue); }
        .empty-state strong { font-size: 18px; }
        .empty-state p { color: var(--muted); font-size: 12px; }
        .empty-state button { margin-top: 15px; padding: 12px 17px; border: 1px solid var(--line); background: white; color: var(--text); font-size: 8px; letter-spacing: 0.15em; cursor: pointer; }
        .benefits-popup-layer { position: fixed; inset: 0; z-index: 999; display: grid; place-items: center; padding: 34px; }
        .benefits-popup-backdrop { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; padding: 0; background: rgba(3, 12, 23, 0.72); backdrop-filter: blur(12px); cursor: default; animation: benefitsBackdropIn 0.35s ease forwards; }
        .benefits-popup { position: relative; z-index: 2; width: min(1040px, 100%); max-height: min(690px, calc(100vh - 68px)); display: grid; grid-template-columns: 0.82fr 1.18fr; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.14); background: #07172b; color: white; box-shadow: 0 35px 100px rgba(0, 0, 0, 0.38); animation: benefitsPopupIn 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .benefits-popup-image { position: relative; min-height: 520px; overflow: hidden; background: #030c17; }
        .benefits-popup-image > img { width: 100%; height: 100%; display: block; object-fit: cover; transform: scale(1.04); animation: benefitsImageIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .benefits-popup-image-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(3, 12, 23, 0.08), rgba(3, 12, 23, 0.78)); }
        .benefits-popup-meta { position: absolute; z-index: 3; left: 24px; right: 24px; bottom: 24px; display: flex; justify-content: space-between; align-items: center; color: rgba(255, 255, 255, 0.68); font-size: 8px; letter-spacing: 0.17em; }
        .benefits-popup-meta span:first-child { color: var(--blue-soft); font-size: 15px; font-weight: 600; }
        .benefits-popup-orbit { position: absolute; z-index: 2; border: 1px solid rgba(114, 184, 239, 0.2); border-radius: 50%; pointer-events: none; }
        .benefits-popup-orbit-one { width: 330px; height: 330px; right: -150px; top: 18%; animation: benefitsOrbit 18s linear infinite; }
        .benefits-popup-orbit-two { width: 230px; height: 230px; right: -100px; top: 28%; border-style: dashed; animation: benefitsOrbitReverse 24s linear infinite; }
        .benefits-popup-content { position: relative; min-width: 0; overflow-y: auto; padding: 42px 45px 30px; background: linear-gradient(145deg, #0b1d34, #07172b); }
        .benefits-popup-top { display: flex; justify-content: space-between; gap: 25px; align-items: flex-start; }
        .benefits-popup-eyebrow { display: block; margin-bottom: 15px; color: var(--blue-soft); font-size: 8px; font-weight: 700; letter-spacing: 0.18em; }
        .benefits-popup-line { width: 0; height: 1px; margin-bottom: 18px; background: linear-gradient(90deg, var(--blue), rgba(44, 143, 231, 0)); animation: benefitsLineIn 0.8s 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .benefits-popup-content h3 { max-width: 580px; margin: 0; font-size: clamp(30px, 3.3vw, 52px); line-height: 0.98; letter-spacing: -0.045em; font-weight: 500; animation: benefitsTextIn 0.65s 0.12s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .benefits-popup-close { display: inline-flex; flex: 0 0 auto; align-items: center; gap: 8px; padding: 8px 0; border: 0; background: transparent; color: rgba(255, 255, 255, 0.45); cursor: pointer; font-size: 7px; letter-spacing: 0.15em; transition: color 0.3s ease, transform 0.3s ease; }
        .benefits-popup-close:hover { color: white; transform: translateX(3px); }
        .benefits-popup-description { max-width: 570px; margin: 25px 0 0; color: rgba(255, 255, 255, 0.5); font-size: 11px; line-height: 1.75; animation: benefitsTextIn 0.65s 0.22s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .benefits-popup-list { margin-top: 27px; border-top: 1px solid rgba(255, 255, 255, 0.11); }
        .benefit-popup-row { display: grid; grid-template-columns: 30px 1fr 18px; align-items: center; gap: 13px; min-height: 52px; border-bottom: 1px solid rgba(255, 255, 255, 0.09); opacity: 0; transform: translateX(18px); animation: benefitRowIn 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .benefit-popup-row:nth-child(1) { animation-delay: 0.28s; }
        .benefit-popup-row:nth-child(2) { animation-delay: 0.35s; }
        .benefit-popup-row:nth-child(3) { animation-delay: 0.42s; }
        .benefit-popup-row:nth-child(4) { animation-delay: 0.49s; }
        .benefit-popup-row:nth-child(5) { animation-delay: 0.56s; }
        .benefit-popup-row > span { color: var(--blue-soft); font-size: 8px; font-weight: 600; }
        .benefit-popup-row strong { color: rgba(255, 255, 255, 0.78); font-size: 11px; font-weight: 500; }
        .benefit-popup-row svg { color: rgba(114, 184, 239, 0.45); transform: translate(-3px, 3px); transition: transform 0.3s ease, color 0.3s ease; }
        .benefit-popup-row:hover strong { color: white; }
        .benefit-popup-row:hover svg { color: var(--blue-soft); transform: translate(0, 0); }
        .benefits-popup-footer { display: flex; align-items: center; gap: 10px; margin-top: 25px; color: rgba(255, 255, 255, 0.27); font-size: 6px; letter-spacing: 0.15em; }
        .benefits-popup-footer i { flex: 1; height: 1px; background: linear-gradient(90deg, rgba(44, 143, 231, 0.45), transparent); animation: benefitsFooterLine 2.6s ease-in-out infinite; }

        .product-field { display: grid; grid-template-columns: 1.05fr 0.95fr; min-height: 720px; background: var(--navy); color: white; }
        .field-image { position: relative; min-height: 720px; overflow: hidden; }
        .field-image > img { width: 100%; height: 100%; display: block; object-fit: cover; transition: transform 1.2s cubic-bezier( 0.22, 1, 0.36, 1 ); }

        .product-field:hover
        .field-image > img { transform: scale(1.035); }
        .field-image-overlay { position: absolute; inset: 0; background: linear-gradient( 90deg, rgba(7, 23, 43, 0.05), rgba(7, 23, 43, 0.74) ); }
        .field-image-grid { position: absolute; inset: 0; opacity: 0.32; background-image: linear-gradient( rgba(255, 255, 255, 0.1) 1px, transparent 1px ), linear-gradient( 90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px ); background-size: 70px 70px; }
        .field-floating-card { position: absolute; z-index: 3; min-width: 115px; padding: 13px 15px; border: 1px solid rgba(255, 255, 255, 0.16); background: rgba(7, 23, 43, 0.42); backdrop-filter: blur(10px); animation: floatingCard 6s ease-in-out infinite; }
        .field-floating-card span { display: block; margin-bottom: 8px; color: rgba(255, 255, 255, 0.42); font-size: 7px; letter-spacing: 0.15em; }
        .field-floating-card strong { font-size: 16px; font-weight: 500; }
        .field-card-one { top: 15%; left: 9%; }
        .field-card-two { right: 8%; bottom: 17%; animation-delay: -2s; }
        .field-orbit { position: absolute; border: 1px solid rgba(255, 255, 255, 0.14); border-radius: 50%; z-index: 2; pointer-events: none; }
        .orbit-one { width: 360px; height: 360px; right: -100px; top: 25%; animation: rotateSlow 25s linear infinite; }
        .orbit-two { width: 520px; height: 520px; right: -180px; top: 13%; border-style: dashed; animation: rotateSlowReverse 36s linear infinite; }
        .orbit-three { width: 700px; height: 700px; right: -280px; top: -1%; opacity: 0.35; animation: rotateSlow 45s linear infinite; }
        .field-content { position: relative; padding: 85px 7vw 75px 6vw; align-self: center; }
        .field-content .section-number { margin-bottom: 65px; }
        .field-index { position: absolute; top: 70px; right: 7vw; color: rgba(255, 255, 255, 0.08); font-size: 150px; line-height: 1; font-weight: 700; }
        .field-content .eyebrow { color: var(--blue-soft); }
        .field-content h2 { position: relative; z-index: 2; max-width: 520px; margin: 0; font-size: clamp( 38px, 4vw, 62px ); line-height: 0.98; letter-spacing: -0.045em; font-weight: 500; }
        .field-description { position: relative; z-index: 2; max-width: 530px; margin: 28px 0 0; color: rgba(255, 255, 255, 0.54); font-size: 13px; line-height: 1.8; }
        .field-applications { margin-top: 42px; border-top: 1px solid rgba(255, 255, 255, 0.12); }
        .field-label { display: block; padding: 15px 0 10px; color: rgba(255, 255, 255, 0.36); font-size: 7px; letter-spacing: 0.16em; }
        .application-row { display: grid; grid-template-columns: 30px 1fr 20px; align-items: center; min-height: 43px; border-top: 1px solid rgba(255, 255, 255, 0.08); color: rgba(255, 255, 255, 0.58); }
        .application-row span { color: var(--blue-soft); font-size: 8px; }
        .application-row strong { font-size: 11px; font-weight: 500; }
        .application-row svg { opacity: 0.4; }
        .field-button { display: inline-flex; align-items: center; gap: 15px; margin-top: 35px; padding: 15px 19px; background: white; color: var(--navy); font-size: 8px; letter-spacing: 0.16em; font-weight: 700; transition: transform 0.3s ease; }
        .field-button:hover { transform: translateY(-3px); }
        .performance-section { padding: 105px 7vw 115px; background: #f2f2ef; }
        .performance-top { display: grid; grid-template-columns: 1fr 0.5fr; gap: 8vw; max-width: 1280px; margin: 0 auto; align-items: end; }
        .performance-top h2 { margin: 0; font-size: clamp( 48px, 5.7vw, 78px ); line-height: 0.94; letter-spacing: -0.05em; font-weight: 500; }
        .performance-top h2 em { font-family: Georgia, "Times New Roman", serif; font-weight: 400; color: #6e7885; }
        .performance-top > p { margin: 0; color: var(--muted); font-size: 12px; line-height: 1.8; }
        .performance-layout { display: grid; grid-template-columns: 0.9fr 1fr; gap: 8vw; align-items: center; max-width: 1280px; margin: 90px auto 0; }
        .performance-visual { position: relative; height: 420px; display: grid; place-items: center; overflow: hidden; }
        .performance-ring { position: absolute; border: 1px solid rgba(7, 23, 43, 0.12); border-radius: 50%; }
        .ring-one { width: 170px; height: 170px; animation: rotateSlow 20s linear infinite; }
        .ring-two { width: 270px; height: 270px; border-style: dashed; animation: rotateSlowReverse 30s linear infinite; }
        .ring-three { width: 385px; height: 385px; animation: rotateSlow 42s linear infinite; }
        .performance-core { position: relative; z-index: 3; width: 125px; height: 125px; display: flex; flex-direction: column; align-items: center; justify-content: center; border: 1px solid rgba(7, 23, 43, 0.2); border-radius: 50%; background: #f2f2ef; box-shadow: 0 0 0 15px rgba(44, 143, 231, 0.03); }
        .performance-core svg { margin-bottom: 6px; color: var(--blue); }
        .performance-core strong { font-size: 18px; }
        .performance-core span { margin-top: 4px; color: #7c8794; font-size: 7px; letter-spacing: 0.17em; }
        .performance-axis { position: absolute; width: 100%; height: 1px; background: rgba(7, 23, 43, 0.08); }
        .axis-two { transform: rotate(90deg); }
        .performance-list { border-top: 1px solid var(--line); }
        .performance-item { display: grid; grid-template-columns: 45px 1fr 20px; align-items: center; gap: 15px; min-height: 105px; border-bottom: 1px solid var(--line); transition: padding 0.35s ease; }
        .performance-item:hover { padding-left: 10px; }
        .performance-item > span { color: var(--blue); font-size: 9px; font-weight: 700; }
        .performance-item h3 { margin: 0 0 7px; font-size: 17px; font-weight: 600; }
        .performance-item p { max-width: 420px; margin: 0; color: var(--muted); font-size: 11px; line-height: 1.6; }
        .performance-item > svg { opacity: 0.4; }
        .portfolio-statement { position: relative; min-height: 650px; display: grid; place-items: center; overflow: hidden; background: var(--navy-deep); color: white; }
        .statement-grid { position: absolute; inset: 0; opacity: 0.3; background-image: linear-gradient( rgba(255, 255, 255, 0.04) 1px, transparent 1px ), linear-gradient( 90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px ); background-size: 72px 72px; }
        .statement-word { position: absolute; color: rgba(255, 255, 255, 0.025); font-size: clamp( 130px, 20vw, 330px ); line-height: 0.75; font-weight: 800; white-space: nowrap; user-select: none; }
        .statement-word-one { top: 18%; left: -5%; animation: statementDrift 15s ease-in-out infinite; }
        .statement-word-two { bottom: 10%; right: -8%; animation: statementDriftReverse 18s ease-in-out infinite; }
        .statement-content { position: relative; z-index: 2; width: min( 850px, calc(100% - 44px) ); text-align: center; }
        .statement-content h2 { margin: 0; font-size: clamp( 48px, 6vw, 85px ); line-height: 0.94; letter-spacing: -0.05em; font-weight: 500; }
        .statement-content h2 em { color: var(--blue-soft); font-family: Georgia, "Times New Roman", serif; font-weight: 400; }
        .statement-points { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: 42px; }
        .statement-points span { display: inline-flex; align-items: center; gap: 7px; padding: 9px 12px; border: 1px solid rgba(255, 255, 255, 0.12); color: rgba(255, 255, 255, 0.48); font-size: 8px; letter-spacing: 0.08em; }
        .statement-points svg { color: var(--blue-soft); }

        .products-footer { display: grid; grid-template-columns: 1fr 1fr auto; gap: 20px; align-items: center; min-height: 75px; padding: 0 6vw; background: #040d19; color: rgba(255, 255, 255, 0.32); font-size: 7px; letter-spacing: 0.16em; }
        .products-footer a { display: flex; align-items: center; gap: 8px; color: rgba(255, 255, 255, 0.55); }
@keyframes productHeroVideoScale {
        from { transform: scale(1.1); }
        to { transform: scale(1.04); }
        }

        @keyframes heroFloat {
          0%,
        100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes heroFloatReverse {
          0%,
        100% { transform: translateY(0); }
        50% { transform: translateY(18px); }
        }

        @keyframes rotateSlow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
        }

        @keyframes rotateSlowReverse {
        from { transform: rotate(360deg); }
        to { transform: rotate(0deg); }
        }

        @keyframes scrollLine {
          0%,
        100% { transform: scaleX(0.45); opacity: 0.4; }
        50% { transform: scaleX(1); opacity: 1; }
        }

        @keyframes pulse {
          0%,
        100% { transform: scale(1); opacity: 0.7; }
        50% { transform: scale(1.5); opacity: 1; }
        }

        @keyframes floatingCard {
          0%,
        100% { transform: translateY(0); }
        50% { transform: translateY(-12px); }
        }
@keyframes introOrbitalDrift {
        0% { transform: translate3d(0, 0, 0) rotate(0deg); }
        25% { transform: translate3d(12px, -14px, 0) rotate(4deg); }
        50% { transform: translate3d(-8px, 18px, 0) rotate(8deg); }
        75% { transform: translate3d(-18px, -6px, 0) rotate(4deg); }
        100% { transform: translate3d(0, 0, 0) rotate(0deg); }
        }

        @keyframes introOrbitalDriftReverse {
        0% { transform: translate3d(0, 0, 0) rotate(360deg); }
        50% { transform: translate3d(18px, 12px, 0) rotate(180deg); }
        100% { transform: translate3d(0, 0, 0) rotate(0deg); }
        }

        @keyframes introDotFloat {
          0%,
        100% { transform: translate3d(0, 0, 0); }
        35% { transform: translate3d(7px, -11px, 0); }
        70% { transform: translate3d(-5px, 8px, 0); }
        }

        @keyframes introDotFloatReverse {
          0%,
        100% { transform: translate3d(0, 0, 0); }
        50% { transform: translate3d(-9px, -12px, 0); }
        }

        @keyframes introOrbitFloat {
          0%,
        100% { transform: translate3d(0, 0, 0) rotate(0deg); }
        50% { transform: translate3d(-9px, 10px, 0) rotate(12deg); }
        }

        @keyframes statusLine {
          0%,
        100% { transform: scaleX(0.35); opacity: 0.35; }
        50% { transform: scaleX(1); opacity: 1; }
        }
@keyframes categoryFadeUp {
        from { opacity: 0; transform: translateY(22px); }
        to { opacity: 1; transform: translateY(0); }
        }

        @keyframes categoryModuleReveal {
        from { opacity: 0; transform: translateY(32px) scale(0.98); }
        to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes categorySearchReveal {
        from { opacity: 0; transform: translateX(25px); }
        to { opacity: 1; transform: translateX(0); }
        }

        @keyframes categoryTitleLine {
        from { width: 0; }
        to { width: 155px; }
        }

        @keyframes sideLineGrow {
        from { height: 0; }
        to { height: 100%; }
        }

        @keyframes markerLine {
          0%,
        100% { transform: scaleX(0.4); opacity: 0.4; }
        50% { transform: scaleX(1); opacity: 1; }
        }

        @keyframes categorySignal {
        0% { transform: translateX(-100%); }
        50% { transform: translateX(180%); }
        100% { transform: translateX(180%); }
        }

        @keyframes signalExpand {
          0%,
        100% { opacity: 0.35; transform: scaleX(0.45); }
        50% { opacity: 1; transform: scaleX(1); }
        }

        @keyframes categoryBackgroundDrift {
        0%, 100% { transform: scale(1.04) translate3d(0, 0, 0); }
        50% { transform: scale(1.08) translate3d(-1%, -0.5%, 0); }
        }

        @keyframes categoryGridMove {
        0% { background-position: 0 0, 0 0; }
        50% { background-position: 36px 18px, -18px 36px; }
        100% { background-position: 72px 72px, -72px 72px; }
        }

        @keyframes categoryGlowFloat {
          0%,
        100% { transform: translate3d(0, 0, 0); }
        50% { transform: translate3d(-20px, 16px, 0); }
        }

        @keyframes categoryGlowFloatReverse {
          0%,
        100% { transform: translate3d(0, 0, 0); }
        50% { transform: translate3d(18px, -20px, 0); }
        }
@keyframes statementDrift {
          0%,
        100% { transform: translateX(0); }
        50% { transform: translateX(30px); }
        }

        @keyframes statementDriftReverse {
          0%,
        100% { transform: translateX(0); }
        50% { transform: translateX(-35px); }
        }
        @keyframes benefitsBackdropIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes benefitsPopupIn {
          from { opacity: 0; transform: translateY(34px) scale(0.965); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes benefitsImageIn {
          from { opacity: 0; transform: scale(1.12); }
          to { opacity: 1; transform: scale(1.04); }
        }

        @keyframes benefitsTextIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes benefitsLineIn {
          from { width: 0; }
          to { width: 135px; }
        }

        @keyframes benefitRowIn {
          from { opacity: 0; transform: translateX(18px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes benefitsOrbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes benefitsOrbitReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        @keyframes benefitsFooterLine {
          0%, 100% { transform: scaleX(0.35); opacity: 0.35; }
          50% { transform: scaleX(1); opacity: 1; }
        }

@media (max-width: 1100px) {
        .category-interface { grid-template-columns: 1fr; }
        .category-search-panel { min-height: 0; }
        .category-search-panel .product-search { max-width: 400px; }
        .product-grid { grid-template-columns: repeat(2, 1fr); }
        .product-field { grid-template-columns: 1fr; }
        .field-image { min-height: 550px; }
        .performance-layout { grid-template-columns: 1fr; }
        .performance-visual { max-width: 600px; margin: 0 auto; width: 100%; }

        }

        @media (max-width: 800px) {
        .products-hero { min-height: 860px; height: 860px; }
        .products-hero-video { object-position: center center; }
        .products-hero-video-overlay { background: linear-gradient( 90deg, rgba(3, 12, 23, 0.80), rgba(3, 12, 23, 0.48) ), linear-gradient( 0deg, rgba(3, 12, 23, 0.62), rgba(3, 12, 23, 0.12) ); }

          .hero-top,
        .hero-bottom { left: 22px; right: 22px; }
        .hero-top span:last-child { display: none; }
        .hero-content { width: calc(100% - 44px); padding-top: 150px; }
        .hero-content h1 { font-size: clamp( 52px, 14vw, 76px ); }
        .hero-actions { flex-direction: column; align-items: flex-start; gap: 20px; }
        .hero-bottom { display: flex; }
        .hero-scroll { display: none; }
        .products-intro { min-height: 0; padding: 52px 22px 55px; }
        .intro-section-number { margin-bottom: 32px; }
        .intro-grid { grid-template-columns: 1fr; gap: 34px; }
        .intro-heading h2 { font-size: clamp( 43px, 12vw, 65px ); }
        .intro-copy { padding-top: 0; }
        .intro-copy::before { display: none; }
        .intro-copy-orbit { right: 0; top: -22px; width: 58px; height: 58px; }
        .intro-copy .intro-large { font-size: 17px; max-width: 92%; }
        .intro-status i { max-width: 55px; }
        .intro-orbit-one { width: 220px; height: 220px; right: -120px; }
        .intro-orbit-two { width: 330px; height: 330px; right: -190px; }
        .intro-orbit-three { width: 450px; height: 450px; left: -280px; top: -130px; }
        .intro-dot-one { right: 20%; top: 42%; }
        .intro-dot-two { right: 8%; bottom: 10%; }
        .category-section { padding: 65px 22px 58px; }
        .category-heading { grid-template-columns: 1fr; gap: 35px; margin: 45px 0 35px; }
        .category-heading h2 { font-size: clamp( 45px, 12vw, 66px ); }
        .category-heading-side { padding-left: 18px; }
        .category-interface { grid-template-columns: 1fr; gap: 20px; }
        .category-tabs { grid-template-columns: 1fr; gap: 7px; }
        .category-module { min-height: 145px; padding: 16px 17px 15px; }
        .category-module-bottom { left: 17px; right: 17px; }
        .category-search-panel { min-height: 140px; }
        .category-search-panel .product-search { max-width: none; }
        .category-description { grid-template-columns: 45px 1fr; gap: 15px; }
        .category-description-signal { display: none; }
        .product-explorer { padding: 70px 22px; }
        .product-grid { grid-template-columns: 1fr; }
        .product-card-image { height: 275px; }
        .field-content { padding: 65px 22px 70px; }
        .field-image { min-height: 480px; }
        .field-index { top: 52px; right: 22px; font-size: 100px; }
        .performance-section { padding: 75px 22px; }
        .performance-top { grid-template-columns: 1fr; gap: 40px; }
        .performance-layout { margin-top: 55px; }
        .performance-visual { height: 330px; }
        .ring-three { width: 300px; height: 300px; }
        .ring-two { width: 215px; height: 215px; }
        .ring-one { width: 135px; height: 135px; }
        .portfolio-statement { min-height: 560px; }
        .products-footer { grid-template-columns: 1fr; gap: 12px; padding: 25px 22px; }
        .products-footer a { justify-content: flex-start; }
        .floating-orb { display: none; }
        .benefits-popup-layer { padding: 22px; }
        .benefits-popup { max-height: calc(100vh - 44px); grid-template-columns: 1fr; }
        .benefits-popup-image { min-height: 210px; max-height: 250px; }
        .benefits-popup-content { padding: 30px 25px 24px; }
        .benefits-popup-content h3 { font-size: clamp(27px, 8vw, 42px); }
        .benefits-popup-description { font-size: 10px; margin-top: 20px; }
        .benefit-popup-row { min-height: 49px; }


        }

        @media (max-width: 480px) {
        .section-topline { font-size: 7px; }
        .category-description-copy p { font-size: 10px; }
        .category-module { min-height: 150px; }
        .category-module-description { max-width: 92%; font-size: 8.5px; }
        .category-side-number { font-size: 23px; }
        .benefits-popup-layer { padding: 12px; }
        .benefits-popup { max-height: calc(100vh - 24px); }
        .benefits-popup-image { min-height: 165px; max-height: 190px; }
        .benefits-popup-meta { left: 16px; right: 16px; bottom: 16px; }
        .benefits-popup-content { padding: 24px 18px 20px; }
        .benefits-popup-top { gap: 12px; }
        .benefits-popup-close span { display: none; }
        .benefits-popup-description { line-height: 1.65; }
        .benefits-popup-footer span:last-child { display: none; }


        }

        @media (prefers-reduced-motion: reduce) {

          *,
          *::before,
        *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; scroll-behavior: auto !important; transition-duration: 0.01ms !important; }

        }

      `}</style>
    </>
  );
}
