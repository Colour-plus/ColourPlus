"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FolderKanban,
  Layers3,
  Loader2,
  Mail,
  Package,
  RefreshCw,
  Search,
  Users,
  X,
} from "lucide-react";

type Enquiry = {
  id: number;
  name: string;
  company: string | null;
  email: string | null;
  phone: string | null;
  city: string | null;
  projectType: string | null;
  projectStage: string | null;
  message: string | null;
  source: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type DashboardData = {
  products: {
    total: number;
    active: number;
  };
  projects: {
    total: number;
    active: number;
    featured: number;
  };
  clients: {
    total: number;
    active: number;
  };
  enquiries: {
    total: number;
    new: number;
    contacted: number;
    qualified: number;
    siteVisit: number;
    quotation: number;
    negotiation: number;
    won: number;
    lost: number;
  };
  recentEnquiries: Enquiry[];
};

const EMPTY_DASHBOARD: DashboardData = {
  products: {
    total: 0,
    active: 0,
  },
  projects: {
    total: 0,
    active: 0,
    featured: 0,
  },
  clients: {
    total: 0,
    active: 0,
  },
  enquiries: {
    total: 0,
    new: 0,
    contacted: 0,
    qualified: 0,
    siteVisit: 0,
    quotation: 0,
    negotiation: 0,
    won: 0,
    lost: 0,
  },
  recentEnquiries: [],
};

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function statusLabel(status: string) {
  return status.replaceAll("_", " ");
}

export default function AdminDashboardPage() {
  const [dashboard, setDashboard] =
    useState<DashboardData>(EMPTY_DASHBOARD);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  async function loadDashboard(
    showRefresh = false
  ) {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await fetch(
        "/api/admin/dashboard",
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to load dashboard."
        );
      }

      setDashboard(
        data.dashboard || EMPTY_DASHBOARD
      );
    } catch (err) {
      console.error(
        "DASHBOARD_LOAD_ERROR:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load dashboard."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  const filteredEnquiries = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    if (!query) {
      return dashboard.recentEnquiries;
    }

    return dashboard.recentEnquiries.filter(
      (enquiry) =>
        enquiry.name
          ?.toLowerCase()
          .includes(query) ||
        enquiry.company
          ?.toLowerCase()
          .includes(query) ||
        enquiry.projectType
          ?.toLowerCase()
          .includes(query) ||
        enquiry.city
          ?.toLowerCase()
          .includes(query)
    );
  }, [
    dashboard.recentEnquiries,
    search,
  ]);

  const pipeline = [
    {
      label: "New",
      value: dashboard.enquiries.new,
    },
    {
      label: "Contacted",
      value:
        dashboard.enquiries.contacted,
    },
    {
      label: "Qualified",
      value:
        dashboard.enquiries.qualified,
    },
    {
      label: "Site Visit",
      value:
        dashboard.enquiries.siteVisit,
    },
    {
      label: "Quotation",
      value:
        dashboard.enquiries.quotation,
    },
    {
      label: "Negotiation",
      value:
        dashboard.enquiries.negotiation,
    },
    {
      label: "Won",
      value: dashboard.enquiries.won,
    },
  ];

  return (
    <>
      <main className="dashboard-page">
        <div className="dashboard-shell">

          {/* HEADER */}

          <header className="dashboard-header">
            <div>
              <div className="dashboard-eyebrow">
                COLOURPLUS / ADMIN
              </div>

              <h1>
                Control
                <span>Centre</span>
              </h1>

              <p>
                Manage the Colourplus digital
                experience from one place.
              </p>
            </div>

            <div className="dashboard-actions">
              <button
                className="refresh-button"
                onClick={() =>
                  loadDashboard(true)
                }
                disabled={refreshing}
              >
                <RefreshCw
                  size={15}
                  className={
                    refreshing
                      ? "spin"
                      : ""
                  }
                />

                {refreshing
                  ? "Refreshing"
                  : "Refresh"}
              </button>

              <Link
                href="/"
                className="website-button"
              >
                View website
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </header>

          {/* ERROR */}

          {error && (
            <div className="dashboard-error">
              <X size={16} />

              <span>{error}</span>

              <button
                onClick={() =>
                  setError("")
                }
              >
                <X size={13} />
              </button>
            </div>
          )}

          {/* PRIMARY STATS */}

          {loading ? (
            <div className="dashboard-loading">
              <Loader2
                size={22}
                className="spin"
              />

              Loading dashboard...
            </div>
          ) : (
            <>
              <section className="primary-stats">

                <Link
                  href="/admin/products"
                  className="primary-stat"
                >
                  <div className="stat-top">
                    <div className="stat-icon">
                      <Package size={18} />
                    </div>

                    <ChevronRight
                      size={17}
                    />
                  </div>

                  <strong>
                    {dashboard.products.total}
                  </strong>

                  <span>
                    Products
                  </span>

                  <small>
                    {dashboard.products.active}{" "}
                    active
                  </small>
                </Link>

                <Link
                  href="/admin/projects"
                  className="primary-stat"
                >
                  <div className="stat-top">
                    <div className="stat-icon">
                      <FolderKanban
                        size={18}
                      />
                    </div>

                    <ChevronRight
                      size={17}
                    />
                  </div>

                  <strong>
                    {dashboard.projects.total}
                  </strong>

                  <span>
                    Projects
                  </span>

                  <small>
                    {dashboard.projects.active}{" "}
                    active
                  </small>
                </Link>

                <Link
                  href="/admin/clients"
                  className="primary-stat"
                >
                  <div className="stat-top">
                    <div className="stat-icon">
                      <Users size={18} />
                    </div>

                    <ChevronRight
                      size={17}
                    />
                  </div>

                  <strong>
                    {dashboard.clients.total}
                  </strong>

                  <span>
                    Clients
                  </span>

                  <small>
                    {dashboard.clients.active}{" "}
                    active
                  </small>
                </Link>

                <Link
                  href="/admin/enquiries"
                  className="primary-stat enquiry-stat"
                >
                  <div className="stat-top">
                    <div className="stat-icon">
                      <Mail size={18} />
                    </div>

                    <ChevronRight
                      size={17}
                    />
                  </div>

                  <strong>
                    {dashboard.enquiries.total}
                  </strong>

                  <span>
                    Enquiries
                  </span>

                  <small>
                    {dashboard.enquiries.new}{" "}
                    new
                  </small>
                </Link>

              </section>

              {/* SECONDARY INFORMATION */}

              <section className="dashboard-grid">

                {/* ENQUIRY PIPELINE */}

                <div className="dashboard-card pipeline-card">

                  <div className="card-heading">
                    <div>
                      <span>
                        ENQUIRY PIPELINE
                      </span>

                      <h2>
                        Lead activity
                      </h2>
                    </div>

                    <div className="heading-icon">
                      <BriefcaseBusiness
                        size={18}
                      />
                    </div>
                  </div>

                  <div className="pipeline-list">
                    {pipeline.map(
                      (item) => (
                        <div
                          className="pipeline-row"
                          key={item.label}
                        >
                          <div>
                            <span>
                              {item.label}
                            </span>

                            <div className="pipeline-track">
                              <div
                                className="pipeline-fill"
                                style={{
                                  width:
                                    dashboard
                                      .enquiries
                                      .total >
                                    0
                                      ? `${Math.min(
                                          100,
                                          (item.value /
                                            dashboard
                                              .enquiries
                                              .total) *
                                            100
                                        )}%`
                                      : "0%",
                                }}
                              />
                            </div>
                          </div>

                          <strong>
                            {item.value}
                          </strong>
                        </div>
                      )
                    )}
                  </div>

                  <Link
                    href="/admin/enquiries"
                    className="card-link"
                  >
                    Manage enquiries
                    <ArrowUpRight
                      size={13}
                    />
                  </Link>

                </div>

                {/* QUICK MANAGEMENT */}

                <div className="dashboard-card">

                  <div className="card-heading">
                    <div>
                      <span>
                        MANAGEMENT
                      </span>

                      <h2>
                        Quick access
                      </h2>
                    </div>

                    <div className="heading-icon">
                      <Layers3 size={18} />
                    </div>
                  </div>

                  <div className="quick-list">

                    <Link
                      href="/admin/products"
                      className="quick-item"
                    >
                      <div>
                        <Package
                          size={17}
                        />

                        <span>
                          Products
                        </span>
                      </div>

                      <ChevronRight
                        size={16}
                      />
                    </Link>

                    <Link
                      href="/admin/projects"
                      className="quick-item"
                    >
                      <div>
                        <FolderKanban
                          size={17}
                        />

                        <span>
                          Projects
                        </span>
                      </div>

                      <ChevronRight
                        size={16}
                      />
                    </Link>

                    <Link
                      href="/admin/clients"
                      className="quick-item"
                    >
                      <div>
                        <Users size={17} />

                        <span>
                          Clients
                        </span>
                      </div>

                      <ChevronRight
                        size={16}
                      />
                    </Link>

                    <Link
                      href="/admin/enquiries"
                      className="quick-item"
                    >
                      <div>
                        <Mail size={17} />

                        <span>
                          Enquiries
                        </span>
                      </div>

                      <ChevronRight
                        size={16}
                      />
                    </Link>

                  </div>

                </div>

              </section>

              {/* RECENT ENQUIRIES */}

              <section className="dashboard-card recent-card">

                <div className="recent-heading">
                  <div>
                    <span>
                      RECENT ACTIVITY
                    </span>

                    <h2>
                      Latest enquiries
                    </h2>
                  </div>

                  <Link
                    href="/admin/enquiries"
                    className="view-all"
                  >
                    View all
                    <ArrowUpRight
                      size={13}
                    />
                  </Link>
                </div>

                {/* SEARCH */}

                {dashboard.recentEnquiries
                  .length > 0 && (
                  <div className="recent-search">
                    <Search size={15} />

                    <input
                      value={search}
                      onChange={(event) =>
                        setSearch(
                          event.target.value
                        )
                      }
                      placeholder="Search recent enquiries..."
                    />

                    {search && (
                      <button
                        onClick={() =>
                          setSearch("")
                        }
                      >
                        <X size={13} />
                      </button>
                    )}
                  </div>
                )}

                {filteredEnquiries.length ===
                0 ? (
                  <div className="no-enquiries">
                    <Clock3 size={21} />

                    <div>
                      <strong>
                        {dashboard
                          .recentEnquiries
                          .length === 0
                          ? "No enquiries yet"
                          : "No matching enquiries"}
                      </strong>

                      <span>
                        {dashboard
                          .recentEnquiries
                          .length === 0
                          ? "Website enquiries will appear here when submitted."
                          : "Try another search term."}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="enquiry-list">
                    {filteredEnquiries.map(
                      (enquiry) => (
                        <Link
                          href="/admin/enquiries"
                          className="enquiry-row"
                          key={enquiry.id}
                        >
                          <div className="enquiry-avatar">
                            {enquiry.name
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div className="enquiry-main">
                            <div>
                              <strong>
                                {enquiry.name}
                              </strong>

                              {enquiry.company && (
                                <span>
                                  {
                                    enquiry.company
                                  }
                                </span>
                              )}
                            </div>

                            <p>
                              {enquiry.projectType ||
                                "General enquiry"}

                              {enquiry.city
                                ? ` · ${enquiry.city}`
                                : ""}
                            </p>
                          </div>

                          <div className="enquiry-status">
                            <span
                              className={`status-dot ${enquiry.status.toLowerCase()}`}
                            />

                            {statusLabel(
                              enquiry.status
                            )}
                          </div>

                          <time>
                            {formatDate(
                              enquiry.createdAt
                            )}
                          </time>

                          <ChevronRight
                            size={16}
                          />
                        </Link>
                      )
                    )}
                  </div>
                )}

              </section>
            </>
          )}

          {/* FOOTER */}

          <footer className="dashboard-footer">
            <div>
              <strong>
                COLOURPLUS
              </strong>

              <span>
                Polyurethanes Pvt. Ltd.
              </span>
            </div>

            <div>
              <span>
                Admin control centre
              </span>

              <Link href="/">
                View website
                <ArrowUpRight
                  size={12}
                />
              </Link>
            </div>
          </footer>

        </div>
      </main>

      <style jsx global>{`

        * {
          box-sizing: border-box;
        }

        .dashboard-page {
          min-height: 100vh;
          background: #f4f6f8;
          color: #172334;
          padding: 125px 0 60px;
        }

        .dashboard-shell {
          width: min(1380px, calc(100% - 48px));
          margin: 0 auto;
        }

        /* HEADER */

        .dashboard-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 30px;
          margin-bottom: 34px;
        }

        .dashboard-eyebrow {
          margin-bottom: 11px;
          font-size: 10px;
          line-height: 1;
          font-weight: 700;
          letter-spacing: .18em;
          color: #788597;
        }

        .dashboard-header h1 {
          margin: 0;
          font-size: clamp(38px, 4vw, 58px);
          line-height: .95;
          font-weight: 500;
          letter-spacing: -.045em;
        }

        .dashboard-header h1 span {
          display: block;
          color: #7c8795;
        }

        .dashboard-header p {
          margin: 15px 0 0;
          max-width: 530px;
          color: #697687;
          font-size: 14px;
          line-height: 1.7;
        }

        .dashboard-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .refresh-button,
        .website-button {
          height: 42px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0 17px;
          border-radius: 4px;
          border: 1px solid #dce1e7;
          background: #fff;
          color: #344152;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .04em;
          cursor: pointer;
          text-decoration: none;
          transition:
            transform .2s ease,
            border-color .2s ease,
            box-shadow .2s ease;
        }

        .refresh-button:hover,
        .website-button:hover {
          transform: translateY(-2px);
          border-color: #c5ccd5;
          box-shadow: 0 8px 20px rgba(26, 38, 53, .06);
        }

        /* ERROR */

        .dashboard-error {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 18px;
          padding: 12px 14px;
          border: 1px solid #ead1d1;
          border-radius: 5px;
          background: #fff7f7;
          color: #a54e4e;
          font-size: 12px;
        }

        .dashboard-error span {
          flex: 1;
        }

        .dashboard-error button {
          display: flex;
          border: 0;
          background: transparent;
          color: inherit;
          cursor: pointer;
        }

        /* LOADING */

        .dashboard-loading {
          min-height: 260px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #718091;
          font-size: 13px;
        }

        /* PRIMARY STATS */

        .primary-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 14px;
        }

        .primary-stat {
          position: relative;
          min-height: 190px;
          padding: 23px;
          overflow: hidden;
          border: 1px solid #e2e6eb;
          border-radius: 6px;
          background: #fff;
          text-decoration: none;
          color: inherit;
          transition:
            transform .25s ease,
            box-shadow .25s ease,
            border-color .25s ease;
        }

        .primary-stat::after {
          content: "";
          position: absolute;
          right: -35px;
          bottom: -45px;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: #f1f4f7;
          transition: transform .35s ease;
        }

        .primary-stat:hover {
          transform: translateY(-4px);
          border-color: #d4dae1;
          box-shadow: 0 18px 40px rgba(28, 42, 59, .08);
        }

        .primary-stat:hover::after {
          transform: scale(1.35);
        }

        .stat-top {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #9aa5b2;
        }

        .stat-icon {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          background: #f2f5f7;
          color: #40546b;
        }

        .primary-stat strong {
          position: relative;
          z-index: 1;
          display: block;
          margin-top: 29px;
          font-size: 38px;
          line-height: 1;
          font-weight: 500;
          letter-spacing: -.045em;
        }

        .primary-stat > span {
          position: relative;
          z-index: 1;
          display: block;
          margin-top: 7px;
          color: #394656;
          font-size: 13px;
          font-weight: 700;
        }

        .primary-stat small {
          position: relative;
          z-index: 1;
          display: block;
          margin-top: 7px;
          color: #8792a0;
          font-size: 10px;
        }

        /* GRID */

        .dashboard-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 14px;
          margin-bottom: 14px;
        }

        .dashboard-card {
          border: 1px solid #e2e6eb;
          border-radius: 6px;
          background: #fff;
          padding: 25px;
        }

        .card-heading,
        .recent-heading {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
        }

        .card-heading > div:first-child > span,
        .recent-heading > div:first-child > span {
          font-size: 9px;
          font-weight: 800;
          letter-spacing: .16em;
          color: #8b96a4;
        }

        .card-heading h2,
        .recent-heading h2 {
          margin: 7px 0 0;
          font-size: 22px;
          line-height: 1.1;
          font-weight: 500;
          letter-spacing: -.025em;
        }

        .heading-icon {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          background: #f3f5f7;
          color: #52657a;
        }

        /* PIPELINE */

        .pipeline-list {
          margin-top: 27px;
        }

        .pipeline-row {
          display: grid;
          grid-template-columns: 1fr 30px;
          gap: 15px;
          align-items: center;
          margin-bottom: 15px;
        }

        .pipeline-row > div > span {
          display: block;
          margin-bottom: 6px;
          color: #657384;
          font-size: 11px;
        }

        .pipeline-track {
          width: 100%;
          height: 4px;
          overflow: hidden;
          border-radius: 10px;
          background: #edf0f3;
        }

        .pipeline-fill {
          height: 100%;
          border-radius: inherit;
          background: #50657d;
          transition: width .6s ease;
        }

        .pipeline-row strong {
          font-size: 13px;
          font-weight: 700;
          text-align: right;
        }

        .card-link,
        .view-all {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #334d68;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .04em;
          text-decoration: none;
        }

        .card-link {
          margin-top: 12px;
        }

        .card-link:hover,
        .view-all:hover {
          text-decoration: underline;
        }

        /* QUICK ACCESS */

        .quick-list {
          margin-top: 24px;
          border-top: 1px solid #edf0f3;
        }

        .quick-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 2px;
          border-bottom: 1px solid #edf0f3;
          color: #364555;
          text-decoration: none;
          transition: padding .2s ease;
        }

        .quick-item:hover {
          padding-left: 7px;
          padding-right: 7px;
        }

        .quick-item > div {
          display: flex;
          align-items: center;
          gap: 11px;
        }

        .quick-item > div svg {
          color: #718091;
        }

        .quick-item span {
          font-size: 12px;
          font-weight: 700;
        }

        .quick-item > svg {
          color: #a2acb7;
        }

        /* RECENT */

        .recent-card {
          margin-bottom: 14px;
        }

        .recent-heading {
          align-items: center;
        }

        .recent-search {
          width: 100%;
          max-width: 370px;
          height: 39px;
          display: flex;
          align-items: center;
          gap: 9px;
          margin-top: 22px;
          padding: 0 12px;
          border: 1px solid #e0e5ea;
          border-radius: 4px;
          background: #fafbfc;
          color: #8a95a2;
        }

        .recent-search input {
          width: 100%;
          border: 0;
          outline: 0;
          background: transparent;
          color: #273646;
          font: inherit;
          font-size: 11px;
        }

        .recent-search button {
          display: flex;
          border: 0;
          background: transparent;
          color: #8b96a3;
          cursor: pointer;
        }

        .enquiry-list {
          margin-top: 15px;
          border-top: 1px solid #edf0f3;
        }

        .enquiry-row {
          min-height: 70px;
          display: grid;
          grid-template-columns: 38px 1fr 125px 105px 18px;
          align-items: center;
          gap: 14px;
          border-bottom: 1px solid #edf0f3;
          color: inherit;
          text-decoration: none;
          transition:
            padding .2s ease,
            background .2s ease;
        }

        .enquiry-row:hover {
          padding-left: 8px;
          padding-right: 8px;
          background: #fafbfc;
        }

        .enquiry-avatar {
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #eef2f5;
          color: #526579;
          font-size: 11px;
          font-weight: 800;
        }

        .enquiry-main > div {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .enquiry-main strong {
          color: #293847;
          font-size: 12px;
        }

        .enquiry-main span {
          color: #8994a0;
          font-size: 10px;
        }

        .enquiry-main p {
          margin: 5px 0 0;
          color: #8792a0;
          font-size: 10px;
        }

        .enquiry-status {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #6c7887;
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: .05em;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #8995a3;
        }

        .status-dot.new {
          background: #5c7895;
        }

        .status-dot.won {
          background: #648b73;
        }

        .status-dot.lost {
          background: #9a6a6a;
        }

        .enquiry-row time {
          color: #909aa6;
          font-size: 9px;
          text-align: right;
        }

        .enquiry-row > svg {
          color: #aab2bc;
        }

        .no-enquiries {
          min-height: 145px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          color: #8a95a1;
          border-top: 1px solid #edf0f3;
          margin-top: 20px;
        }

        .no-enquiries div {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .no-enquiries strong {
          color: #4b5968;
          font-size: 12px;
        }

        .no-enquiries span {
          font-size: 10px;
        }

        /* FOOTER */

        .dashboard-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 24px 2px 0;
          color: #8a95a2;
          font-size: 9px;
        }

        .dashboard-footer > div {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .dashboard-footer strong {
          color: #556373;
          letter-spacing: .12em;
        }

        .dashboard-footer a {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: #556c83;
          font-weight: 700;
          text-decoration: none;
        }

        /* ANIMATION */

        .spin {
          animation: dashboardSpin .9s linear infinite;
        }

        @keyframes dashboardSpin {
          to {
            transform: rotate(360deg);
          }
        }

        /* RESPONSIVE */

        @media (max-width: 1000px) {
          .primary-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 720px) {
          .dashboard-page {
            padding-top: 105px;
          }

          .dashboard-shell {
            width: min(
              100% - 28px,
              1380px
            );
          }

          .dashboard-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .dashboard-actions {
            width: 100%;
          }

          .refresh-button,
          .website-button {
            flex: 1;
          }

          .primary-stats {
            grid-template-columns: 1fr 1fr;
            gap: 9px;
          }

          .primary-stat {
            min-height: 155px;
            padding: 17px;
          }

          .primary-stat strong {
            margin-top: 20px;
            font-size: 31px;
          }

          .dashboard-card {
            padding: 18px;
          }

          .enquiry-row {
            grid-template-columns:
              34px
              1fr
              18px;
            gap: 10px;
            padding: 12px 0;
          }

          .enquiry-status,
          .enquiry-row time {
            display: none;
          }

          .dashboard-footer {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        @media (max-width: 480px) {
          .primary-stats {
            grid-template-columns: 1fr;
          }

          .primary-stat {
            min-height: 135px;
          }

          .dashboard-header h1 {
            font-size: 42px;
          }

          .dashboard-footer > div {
            align-items: flex-start;
            flex-direction: column;
            gap: 4px;
          }
        }

      `}</style>
    </>
  );
}