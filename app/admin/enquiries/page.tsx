"use client";

import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  RefreshCw,
  Search,
  UserRound,
  X,
} from "lucide-react";

type Enquiry = {
  id: number;
  name: string;
  company: string | null;
  email: string | null;
  phone: string | null;

  facilityType: string | null;
  flooringArea: string | null;
  projectRequirement: string | null;
  projectStartTimeline: string | null;
  projectRole: string | null;
  projectCity: string | null;

  message: string | null;
  source: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

const STATUSES = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "SITE_VISIT",
  "QUOTATION",
  "NEGOTIATION",
  "WON",
  "LOST",
];

const STATUS_LABELS: Record<string, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  QUALIFIED: "Qualified",
  SITE_VISIT: "Site Visit",
  QUOTATION: "Quotation",
  NEGOTIATION: "Negotiation",
  WON: "Won",
  LOST: "Lost",
};

function formatDate(date: string) {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsedDate);
}

function formatDateTime(date: string) {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(parsedDate);
}

function getStatusClass(status: string) {
  switch (status) {
    case "NEW":
      return "status-new";

    case "CONTACTED":
      return "status-contacted";

    case "QUALIFIED":
      return "status-qualified";

    case "SITE_VISIT":
      return "status-site";

    case "QUOTATION":
      return "status-quotation";

    case "NEGOTIATION":
      return "status-negotiation";

    case "WON":
      return "status-won";

    case "LOST":
      return "status-lost";

    default:
      return "";
  }
}

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [selectedEnquiry, setSelectedEnquiry] =
    useState<Enquiry | null>(null);

  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadEnquiries(showRefresh = false) {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await fetch("/api/enquiries", {
        method: "GET",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to load enquiries."
        );
      }

      const incomingEnquiries: Enquiry[] =
        data.enquiries || [];

      setEnquiries(incomingEnquiries);

      if (selectedEnquiry) {
        const updatedSelected = incomingEnquiries.find(
          (item) => item.id === selectedEnquiry.id
        );

        if (updatedSelected) {
          setSelectedEnquiry(updatedSelected);
        }
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load enquiries."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadEnquiries();
  }, []);

  async function updateStatus(
    enquiry: Enquiry,
    newStatus: string
  ) {
    if (enquiry.status === newStatus) return;

    try {
      setUpdatingId(enquiry.id);
      setError("");
      setSuccess("");

      const response = await fetch(
        `/api/enquiries/${enquiry.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to update enquiry."
        );
      }

      const updatedAt =
        new Date().toISOString();

      setEnquiries((current) =>
        current.map((item) =>
          item.id === enquiry.id
            ? {
                ...item,
                status: newStatus,
                updatedAt,
              }
            : item
        )
      );

      setSelectedEnquiry((current) =>
        current && current.id === enquiry.id
          ? {
              ...current,
              status: newStatus,
              updatedAt,
            }
          : current
      );

      setSuccess(
        `Enquiry #${enquiry.id} updated to ${
          STATUS_LABELS[newStatus] || newStatus
        }.`
      );

      window.setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update enquiry."
      );
    } finally {
      setUpdatingId(null);
    }
  }

  const filteredEnquiries = useMemo(() => {
    const query = search.trim().toLowerCase();

    return enquiries.filter((enquiry) => {
      const matchesStatus =
        statusFilter === "ALL" ||
        enquiry.status === statusFilter;

      if (!matchesStatus) return false;

      if (!query) return true;

      const searchable = [
        enquiry.name,
        enquiry.company,
        enquiry.email,
        enquiry.phone,
        enquiry.facilityType,
        enquiry.flooringArea,
        enquiry.projectRequirement,
        enquiry.projectStartTimeline,
        enquiry.projectRole,
        enquiry.projectCity,
        enquiry.message,
        enquiry.source,
        enquiry.status,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchable.includes(query);
    });
  }, [enquiries, search, statusFilter]);

  const stats = useMemo(() => {
    return {
      total: enquiries.length,

      new: enquiries.filter(
        (item) => item.status === "NEW"
      ).length,

      active: enquiries.filter(
        (item) =>
          !["WON", "LOST"].includes(item.status)
      ).length,

      won: enquiries.filter(
        (item) => item.status === "WON"
      ).length,
    };
  }, [enquiries]);

  function clearFilters() {
    setSearch("");
    setStatusFilter("ALL");
  }

  return (
    <main className="admin-enquiries-page">
      {/* HEADER */}
      <section className="page-header">
        <div>
          <div className="eyebrow">
            COLOURPLUS / ENQUIRIES
          </div>

          <h1>Project enquiries</h1>

          <p>
            Manage incoming project opportunities,
            follow-ups and enquiry progress.
          </p>
        </div>

        <div className="header-actions">
          <button
            type="button"
            className="refresh-button"
            onClick={() => loadEnquiries(true)}
            disabled={refreshing}
          >
            <RefreshCw
              size={15}
              className={refreshing ? "spin" : ""}
            />

            {refreshing
              ? "Refreshing"
              : "Refresh"}
          </button>

          <Link
            href="/contact"
            target="_blank"
            rel="noreferrer"
            className="website-button"
          >
            VIEW CONTACT FORM
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">
            TOTAL ENQUIRIES
          </span>

          <strong>{stats.total}</strong>

          <span className="stat-note">
            All website enquiries
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-label">
            NEW
          </span>

          <strong>{stats.new}</strong>

          <span className="stat-note">
            Awaiting first action
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-label">
            IN PROGRESS
          </span>

          <strong>{stats.active}</strong>

          <span className="stat-note">
            Active opportunities
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-label">
            WON
          </span>

          <strong>{stats.won}</strong>

          <span className="stat-note">
            Converted enquiries
          </span>
        </div>
      </section>

      {/* FILTERS */}
      <section className="toolbar">
        <div className="search-box">
          <Search size={16} />

          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search enquiries..."
            aria-label="Search enquiries"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="status-filters">
          <button
            type="button"
            className={
              statusFilter === "ALL"
                ? "filter active"
                : "filter"
            }
            onClick={() =>
              setStatusFilter("ALL")
            }
          >
            All
          </button>

          {STATUSES.map((status) => (
            <button
              type="button"
              key={status}
              className={
                statusFilter === status
                  ? "filter active"
                  : "filter"
              }
              onClick={() =>
                setStatusFilter(status)
              }
            >
              {STATUS_LABELS[status]}
            </button>
          ))}
        </div>
      </section>

      {/* RESULTS HEADER */}
      <section className="results-header">
        <div>
          <span className="results-eyebrow">
            ENQUIRY REGISTER
          </span>

          <h2>
            {filteredEnquiries.length}{" "}
            {filteredEnquiries.length === 1
              ? "enquiry"
              : "enquiries"}
          </h2>
        </div>

        {(search || statusFilter !== "ALL") && (
          <button
            type="button"
            className="clear-filters"
            onClick={clearFilters}
          >
            Clear filters
          </button>
        )}
      </section>

      {/* CONTENT */}
      <section className="content-area">
        {loading ? (
          <div className="loading-state">
            <div className="loader" />
            <span>
              Loading enquiries...
            </span>
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <MessageSquare size={24} />
            </div>

            <h3>No enquiries found</h3>

            <p>
              {search ||
              statusFilter !== "ALL"
                ? "Try changing your search or filters."
                : "Website enquiries will appear here when submitted."}
            </p>

            {(search ||
              statusFilter !== "ALL") && (
              <button
                type="button"
                className="empty-button"
                onClick={clearFilters}
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="enquiry-list">
            {filteredEnquiries.map(
              (enquiry, index) => (
                <article
                  className="enquiry-card"
                  key={enquiry.id}
                  onClick={() =>
                    setSelectedEnquiry(enquiry)
                  }
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" ||
                      event.key === " "
                    ) {
                      event.preventDefault();
                      setSelectedEnquiry(
                        enquiry
                      );
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open enquiry from ${enquiry.name}`}
                >
                  <div className="card-number">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </div>

                  <div className="enquiry-main">
                    <div className="enquiry-top">
                      <div>
                        <span className="record-label">
                          ENQUIRY /{" "}
                          {String(
                            enquiry.id
                          ).padStart(3, "0")}
                        </span>

                        <h3>
                          {enquiry.name ||
                            "Unnamed enquiry"}
                        </h3>
                      </div>

                      <span
                        className={`status-pill ${getStatusClass(
                          enquiry.status
                        )}`}
                      >
                        <span className="status-dot" />

                        {STATUS_LABELS[
                          enquiry.status
                        ] ||
                          enquiry.status}
                      </span>
                    </div>

                    <div className="enquiry-meta">
                      {enquiry.company && (
                        <span>
                          <Building2
                            size={13}
                          />
                          {enquiry.company}
                        </span>
                      )}

                      {enquiry.facilityType && (
                        <span>
                          <Building2
                            size={13}
                          />
                          {enquiry.facilityType}
                        </span>
                      )}

                      {enquiry.projectRequirement && (
                        <span>
                          <MessageSquare
                            size={13}
                          />
                          {
                            enquiry.projectRequirement
                          }
                        </span>
                      )}

                      {enquiry.projectCity && (
                        <span>
                          <MapPin size={13} />
                          {enquiry.projectCity}
                        </span>
                      )}

                      <span>
                        <CalendarDays
                          size={13}
                        />
                        {formatDate(
                          enquiry.createdAt
                        )}
                      </span>
                    </div>

                    {enquiry.message && (
                      <p className="message-preview">
                        {enquiry.message}
                      </p>
                    )}
                  </div>

                  <div className="card-arrow">
                    <ArrowUpRight size={17} />
                  </div>
                </article>
              )
            )}
          </div>
        )}
      </section>

      {/* DETAIL DRAWER */}
      {selectedEnquiry && (
        <div
          className="drawer-backdrop"
          onClick={() =>
            setSelectedEnquiry(null)
          }
        >
          <aside
            className="detail-drawer"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="drawer-header">
              <div>
                <span className="record-label">
                  ENQUIRY /{" "}
                  {String(
                    selectedEnquiry.id
                  ).padStart(3, "0")}
                </span>

                <h2>
                  {selectedEnquiry.name ||
                    "Unnamed enquiry"}
                </h2>
              </div>

              <button
                type="button"
                className="close-button"
                onClick={() =>
                  setSelectedEnquiry(null)
                }
                aria-label="Close enquiry"
              >
                <X size={18} />
              </button>
            </div>

            <div className="drawer-body">
              {/* STATUS */}
              <div className="detail-section">
                <div className="detail-section-heading">
                  <span>Status</span>
                  <Clock3 size={14} />
                </div>

                <div className="status-select-wrap">
                  <select
                    value={
                      selectedEnquiry.status
                    }
                    disabled={
                      updatingId ===
                      selectedEnquiry.id
                    }
                    onChange={(event) =>
                      updateStatus(
                        selectedEnquiry,
                        event.target.value
                      )
                    }
                  >
                    {STATUSES.map((status) => (
                      <option
                        key={status}
                        value={status}
                      >
                        {
                          STATUS_LABELS[
                            status
                          ]
                        }
                      </option>
                    ))}
                  </select>

                  <ChevronDown size={15} />
                </div>

                {updatingId ===
                  selectedEnquiry.id && (
                  <span className="updating-text">
                    Updating status...
                  </span>
                )}
              </div>

              {/* CONTACT */}
              <div className="detail-section">
                <div className="detail-section-heading">
                  <span>
                    Contact information
                  </span>
                  <UserRound size={14} />
                </div>

                <div className="detail-grid">
                  <DetailItem
                    icon={
                      <UserRound size={15} />
                    }
                    label="Name"
                    value={
                      selectedEnquiry.name
                    }
                  />

                  <DetailItem
                    icon={
                      <Building2 size={15} />
                    }
                    label="Company"
                    value={
                      selectedEnquiry.company
                    }
                  />

                  <DetailItem
                    icon={<Mail size={15} />}
                    label="Email"
                    value={
                      selectedEnquiry.email
                    }
                    href={
                      selectedEnquiry.email
                        ? `mailto:${selectedEnquiry.email}`
                        : undefined
                    }
                  />

                  <DetailItem
                    icon={<Phone size={15} />}
                    label="Phone"
                    value={
                      selectedEnquiry.phone
                    }
                    href={
                      selectedEnquiry.phone
                        ? `tel:${selectedEnquiry.phone}`
                        : undefined
                    }
                  />

                  <DetailItem
                    icon={
                      <MapPin size={15} />
                    }
                    label="Project city"
                    value={
                      selectedEnquiry.projectCity
                    }
                  />
                </div>
              </div>

              {/* PROJECT */}
              <div className="detail-section">
                <div className="detail-section-heading">
                  <span>
                    Project information
                  </span>
                  <Building2 size={14} />
                </div>

                <div className="detail-grid">
                  <DetailItem
                    icon={
                      <Building2 size={15} />
                    }
                    label="Facility type"
                    value={
                      selectedEnquiry.facilityType
                    }
                  />

                  <DetailItem
                    icon={
                      <Building2 size={15} />
                    }
                    label="Flooring area"
                    value={
                      selectedEnquiry.flooringArea
                    }
                  />

                  <DetailItem
                    icon={
                      <MessageSquare
                        size={15}
                      />
                    }
                    label="Project requirement"
                    value={
                      selectedEnquiry.projectRequirement
                    }
                  />

                  <DetailItem
                    icon={<Clock3 size={15} />}
                    label="Start timeline"
                    value={
                      selectedEnquiry.projectStartTimeline
                    }
                  />

                  <DetailItem
                    icon={
                      <UserRound size={15} />
                    }
                    label="Your role"
                    value={
                      selectedEnquiry.projectRole
                    }
                  />

                  <DetailItem
                    icon={
                      <MessageSquare
                        size={15}
                      />
                    }
                    label="Source"
                    value={
                      selectedEnquiry.source
                    }
                  />
                </div>
              </div>

              {/* MESSAGE */}
              <div className="detail-section">
                <div className="detail-section-heading">
                  <span>Message</span>
                  <MessageSquare size={14} />
                </div>

                <div className="message-box">
                  {selectedEnquiry.message ||
                    "No message provided."}
                </div>
              </div>

              {/* RECORD */}
              <div className="detail-section">
                <div className="detail-section-heading">
                  <span>Record</span>
                  <CalendarDays size={14} />
                </div>

                <div className="record-details">
                  <div>
                    <span>Created</span>

                    <strong>
                      {formatDateTime(
                        selectedEnquiry.createdAt
                      )}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Last updated
                    </span>

                    <strong>
                      {formatDateTime(
                        selectedEnquiry.updatedAt
                      )}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="drawer-footer">
              {selectedEnquiry.email && (
                <a
                  href={`mailto:${selectedEnquiry.email}`}
                  className="drawer-action primary"
                >
                  <Mail size={14} />
                  Email enquiry
                </a>
              )}

              {selectedEnquiry.phone && (
                <a
                  href={`tel:${selectedEnquiry.phone}`}
                  className="drawer-action secondary"
                >
                  <Phone size={14} />
                  Call
                </a>
              )}
            </div>
          </aside>
        </div>
      )}

      {/* TOAST */}
      {success && (
        <div className="toast success-toast">
          <Check size={15} />
          {success}
        </div>
      )}

      {error && (
        <div className="toast error-toast">
          <X size={15} />
          {error}

          <button
            type="button"
            onClick={() => setError("")}
            aria-label="Close error"
          >
            <X size={13} />
          </button>
        </div>
      )}

      {/* FOOTER */}
      <footer className="admin-footer">
        <span>
          COLOURPLUS POLYURETHANES PVT. LTD.
        </span>

        <Link href="/">
          VIEW WEBSITE
          <ArrowUpRight size={12} />
        </Link>
      </footer>

      <style jsx global>{`
        .admin-enquiries-page {
          min-height: 100vh;
          background: #f4f5f7;
          color: #182333;
          padding: 132px 42px 50px;
          font-family:
            Arial,
            Helvetica,
            sans-serif;
        }

        .page-header {
          max-width: 1480px;
          margin: 0 auto 30px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 30px;
        }

        .eyebrow,
        .results-eyebrow,
        .record-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #738096;
        }

        .page-header h1 {
          margin: 9px 0 8px;
          font-size: clamp(34px, 4vw, 54px);
          line-height: 0.98;
          font-weight: 500;
          letter-spacing: -0.045em;
          color: #182333;
        }

        .page-header p {
          margin: 0;
          color: #718095;
          font-size: 14px;
          line-height: 1.6;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .refresh-button,
        .website-button {
          height: 42px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0 16px;
          border-radius: 999px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          text-decoration: none;
          transition:
            transform 0.25s ease,
            background 0.25s ease,
            border-color 0.25s ease;
        }

        .refresh-button {
          border: 1px solid #d7dce4;
          background: #ffffff;
          color: #4f5e73;
        }

        .website-button {
          border: 1px solid #18395d;
          background: #18395d;
          color: #ffffff;
        }

        .refresh-button:hover,
        .website-button:hover {
          transform: translateY(-2px);
        }

        .refresh-button:hover {
          background: #f8fafc;
        }

        .website-button:hover {
          background: #20486f;
        }

        .refresh-button:disabled {
          opacity: 0.6;
          cursor: default;
        }

        .spin {
          animation: enquirySpin 0.8s linear infinite;
        }

        @keyframes enquirySpin {
          to {
            transform: rotate(360deg);
          }
        }

        .stats-grid {
          max-width: 1480px;
          margin: 0 auto 28px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        .stat-card {
          background: #ffffff;
          border: 1px solid #e0e4ea;
          min-height: 130px;
          padding: 20px 22px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-3px);
          box-shadow:
            0 15px 35px
            rgba(20, 34, 52, 0.07);
        }

        .stat-label {
          font-size: 9px;
          letter-spacing: 0.15em;
          font-weight: 700;
          color: #7b8798;
        }

        .stat-card strong {
          margin-top: 10px;
          font-size: 38px;
          line-height: 1;
          font-weight: 500;
          letter-spacing: -0.04em;
          color: #193b60;
        }

        .stat-note {
          margin-top: 8px;
          font-size: 11px;
          color: #8a95a5;
        }

        .toolbar {
          max-width: 1480px;
          margin: 0 auto 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }

        .search-box {
          width: 300px;
          height: 44px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 13px;
          background: #ffffff;
          border: 1px solid #dfe4eb;
        }

        .search-box > svg {
          color: #8b96a5;
          flex-shrink: 0;
        }

        .search-box input {
          width: 100%;
          border: 0;
          outline: 0;
          background: transparent;
          color: #243247;
          font-size: 12px;
        }

        .search-box input::placeholder {
          color: #9ca5b2;
        }

        .search-box button {
          display: flex;
          border: 0;
          background: transparent;
          color: #8994a4;
          cursor: pointer;
          padding: 2px;
        }

        .status-filters {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .filter {
          border: 1px solid #dce1e8;
          background: #ffffff;
          color: #657287;
          min-height: 34px;
          padding: 0 11px;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          transition:
            background 0.2s ease,
            color 0.2s ease,
            border-color 0.2s ease;
        }

        .filter:hover {
          border-color: #9da8b7;
        }

        .filter.active {
          background: #18395d;
          border-color: #18395d;
          color: #ffffff;
        }

        .results-header {
          max-width: 1480px;
          margin: 0 auto 13px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
        }

        .results-header h2 {
          margin: 5px 0 0;
          font-size: 22px;
          font-weight: 500;
          letter-spacing: -0.025em;
          color: #26364b;
        }

        .clear-filters {
          border: 0;
          background: transparent;
          color: #53677f;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
        }

        .content-area {
          max-width: 1480px;
          margin: 0 auto;
        }

        .enquiry-list {
          display: grid;
          gap: 9px;
        }

        .enquiry-card {
          position: relative;
          display: grid;
          grid-template-columns:
            46px minmax(0, 1fr) 38px;
          align-items: stretch;
          min-height: 155px;
          background: #ffffff;
          border: 1px solid #e0e4ea;
          cursor: pointer;
          overflow: hidden;
          transition:
            transform 0.3s ease,
            border-color 0.3s ease,
            box-shadow 0.3s ease;
        }

        .enquiry-card:focus-visible {
          outline: 2px solid #18395d;
          outline-offset: 2px;
        }

        .enquiry-card::before {
          content: "";
          position: absolute;
          inset: 0 auto 0 0;
          width: 2px;
          background: #18395d;
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.3s ease;
        }

        .enquiry-card:hover {
          transform: translateX(4px);
          border-color: #c8d0db;
          box-shadow:
            0 18px 40px
            rgba(21, 36, 55, 0.07);
        }

        .enquiry-card:hover::before {
          transform: scaleY(1);
        }

        .card-number {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 25px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #a0a9b6;
        }

        .enquiry-main {
          padding: 24px 20px 21px 4px;
          min-width: 0;
        }

        .enquiry-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
        }

        .enquiry-top h3 {
          margin: 7px 0 0;
          font-size: 22px;
          line-height: 1.1;
          font-weight: 500;
          letter-spacing: -0.025em;
          color: #24364c;
        }

        .status-pill {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 9px;
          border: 1px solid currentColor;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .status-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: currentColor;
        }

        .status-new {
          color: #245f91;
          background: #f1f7fc;
        }

        .status-contacted {
          color: #80621f;
          background: #fbf8ed;
        }

        .status-qualified {
          color: #536d38;
          background: #f4f8ef;
        }

        .status-site {
          color: #66578b;
          background: #f6f3fb;
        }

        .status-quotation {
          color: #805f43;
          background: #fbf5ef;
        }

        .status-negotiation {
          color: #744f73;
          background: #faf2fa;
        }

        .status-won {
          color: #397054;
          background: #eff8f2;
        }

        .status-lost {
          color: #8b5050;
          background: #fbf1f1;
        }

        .enquiry-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          margin-top: 16px;
        }

        .enquiry-meta span {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #778397;
          font-size: 10px;
          line-height: 1.4;
        }

        .enquiry-meta svg {
          color: #8c98a8;
          flex-shrink: 0;
        }

        .message-preview {
          max-width: 760px;
          margin: 14px 0 0;
          color: #8993a1;
          font-size: 11px;
          line-height: 1.55;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #a1aab7;
          transition:
            color 0.25s ease,
            transform 0.25s ease;
        }

        .enquiry-card:hover .card-arrow {
          color: #18395d;
          transform: translate(
            2px,
            -2px
          );
        }

        .loading-state,
        .empty-state {
          min-height: 360px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          background: #ffffff;
          border: 1px solid #e0e4ea;
          color: #7b8797;
        }

        .loader {
          width: 28px;
          height: 28px;
          border: 2px solid #dce2e9;
          border-top-color: #18395d;
          border-radius: 50%;
          animation:
            enquirySpin
            0.8s linear infinite;
          margin-bottom: 13px;
        }

        .loading-state span {
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .empty-icon {
          width: 54px;
          height: 54px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f1f4f7;
          color: #7d8999;
          margin-bottom: 15px;
        }

        .empty-state h3 {
          margin: 0;
          color: #33445a;
          font-size: 18px;
          font-weight: 500;
        }

        .empty-state p {
          margin: 7px 0 18px;
          color: #8993a1;
          font-size: 11px;
          text-align: center;
        }

        .empty-button {
          height: 35px;
          padding: 0 14px;
          border: 1px solid #d5dce5;
          background: #ffffff;
          color: #53657c;
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          cursor: pointer;
        }

        .drawer-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background:
            rgba(10, 22, 36, 0.48);
          backdrop-filter: blur(4px);
          display: flex;
          justify-content: flex-end;
        }

        .detail-drawer {
          width: min(620px, 94vw);
          height: 100%;
          background: #f7f8fa;
          box-shadow:
            -25px 0 70px
            rgba(8, 22, 38, 0.2);
          display: flex;
          flex-direction: column;
          animation:
            drawerIn
            0.35s ease both;
        }

        @keyframes drawerIn {
          from {
            transform: translateX(100%);
          }

          to {
            transform: translateX(0);
          }
        }

        .drawer-header {
          padding: 31px 32px 25px;
          background: #18395d;
          color: #ffffff;
          display: flex;
          justify-content: space-between;
          gap: 20px;
        }

        .drawer-header .record-label {
          color:
            rgba(255, 255, 255, 0.55);
        }

        .drawer-header h2 {
          margin: 8px 0 0;
          font-size: 31px;
          line-height: 1;
          font-weight: 500;
          letter-spacing: -0.04em;
        }

        .close-button {
          width: 38px;
          height: 38px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border:
            1px solid
            rgba(255, 255, 255, 0.18);
          background:
            rgba(255, 255, 255, 0.06);
          color: #ffffff;
          cursor: pointer;
          transition:
            background 0.2s ease;
        }

        .close-button:hover {
          background:
            rgba(255, 255, 255, 0.13);
        }

        .drawer-body {
          flex: 1;
          overflow-y: auto;
          padding: 25px 32px 30px;
        }

        .detail-section {
          padding: 0 0 25px;
          margin-bottom: 24px;
          border-bottom:
            1px solid #dfe4ea;
        }

        .detail-section:last-child {
          border-bottom: 0;
          margin-bottom: 0;
        }

        .detail-section-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 13px;
          color: #647287;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        .detail-section-heading svg {
          color: #a0a9b5;
        }

        .status-select-wrap {
          position: relative;
        }

        .status-select-wrap select {
          width: 100%;
          height: 45px;
          appearance: none;
          border: 1px solid #d9dfe7;
          background: #ffffff;
          padding: 0 40px 0 13px;
          outline: 0;
          color: #26364a;
          font-size: 11px;
          cursor: pointer;
        }

        .status-select-wrap select:disabled {
          cursor: wait;
          opacity: 0.65;
        }

        .status-select-wrap > svg {
          position: absolute;
          top: 15px;
          right: 13px;
          color: #7d8999;
          pointer-events: none;
        }

        .updating-text {
          display: block;
          margin-top: 7px;
          color: #718096;
          font-size: 9px;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .detail-item {
          min-height: 69px;
          padding: 12px;
          background: #ffffff;
          border: 1px solid #e1e5eb;
        }

        .detail-item-label {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #8b96a4;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .detail-item-label svg {
          color: #9ca6b3;
        }

        .detail-item-value {
          display: block;
          margin-top: 8px;
          color: #2b3d53;
          font-size: 11px;
          line-height: 1.45;
          word-break: break-word;
        }

        .detail-item-value.link {
          color: #1d5d91;
          text-decoration: none;
        }

        .detail-item-value.link:hover {
          text-decoration: underline;
        }

        .message-box {
          padding: 16px;
          background: #ffffff;
          border: 1px solid #e0e5eb;
          color: #58677a;
          font-size: 12px;
          line-height: 1.7;
          white-space: pre-wrap;
          word-break: break-word;
        }

        .record-details {
          display: grid;
          gap: 9px;
        }

        .record-details > div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          padding: 10px 0;
          border-bottom:
            1px solid #e5e8ed;
        }

        .record-details > div:last-child {
          border-bottom: 0;
        }

        .record-details span {
          color: #8b95a4;
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .record-details strong {
          color: #4b5c70;
          font-size: 10px;
          font-weight: 600;
          text-align: right;
        }

        .drawer-footer {
          display: flex;
          gap: 8px;
          padding: 17px 32px;
          border-top:
            1px solid #dfe4ea;
          background: #ffffff;
        }

        .drawer-action {
          min-height: 40px;
          padding: 0 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          text-decoration: none;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .drawer-action.primary {
          background: #18395d;
          color: #ffffff;
        }

        .drawer-action.primary:hover {
          background: #20486f;
        }

        .drawer-action.secondary {
          border:
            1px solid #d8dfe7;
          background: #ffffff;
          color: #53657b;
        }

        .drawer-action.secondary:hover {
          background: #f7f9fb;
        }

        .toast {
          position: fixed;
          z-index: 1200;
          right: 25px;
          bottom: 25px;
          min-height: 44px;
          max-width: 400px;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 0 14px;
          background: #ffffff;
          border: 1px solid #dbe1e8;
          box-shadow:
            0 18px 50px
            rgba(20, 33, 50, 0.15);
          color: #526176;
          font-size: 10px;
        }

        .success-toast {
          border-left:
            3px solid #397054;
        }

        .success-toast svg {
          color: #397054;
        }

        .error-toast {
          border-left:
            3px solid #9a5252;
        }

        .error-toast > svg {
          color: #9a5252;
          flex-shrink: 0;
        }

        .error-toast button {
          display: flex;
          margin-left: 5px;
          border: 0;
          background: transparent;
          color: #7c8796;
          cursor: pointer;
        }

        .admin-footer {
          max-width: 1480px;
          margin: 35px auto 0;
          padding-top: 20px;
          border-top:
            1px solid #dce1e7;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          color: #8b95a3;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.13em;
        }

        .admin-footer a {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: #52647a;
          text-decoration: none;
        }

        .admin-footer a:hover {
          color: #18395d;
        }

        @media (max-width: 1100px) {
          .admin-enquiries-page {
            padding-left: 25px;
            padding-right: 25px;
          }

          .stats-grid {
            grid-template-columns:
              repeat(2, 1fr);
          }

          .toolbar {
            align-items: flex-start;
            flex-direction: column;
          }

          .search-box {
            width: 100%;
          }

          .status-filters {
            justify-content: flex-start;
          }
        }

        @media (max-width: 700px) {
          .admin-enquiries-page {
            padding: 110px 14px 35px;
          }

          .page-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .page-header h1 {
            font-size: 38px;
          }

          .header-actions {
            width: 100%;
          }

          .refresh-button,
          .website-button {
            flex: 1;
          }

          .stats-grid {
            grid-template-columns: 1fr 1fr;
          }

          .stat-card {
            min-height: 110px;
            padding: 16px;
          }

          .stat-card strong {
            font-size: 30px;
          }

          .status-filters {
            width: 100%;
            overflow-x: auto;
            flex-wrap: nowrap;
            padding-bottom: 4px;
            justify-content: flex-start;
          }

          .filter {
            white-space: nowrap;
            flex-shrink: 0;
          }

          .enquiry-card {
            grid-template-columns:
              32px minmax(0, 1fr) 25px;
          }

          .card-number {
            padding-top: 20px;
            font-size: 8px;
          }

          .enquiry-main {
            padding: 20px 8px 18px 0;
          }

          .enquiry-top {
            flex-direction: column;
            gap: 11px;
          }

          .enquiry-top h3 {
            font-size: 18px;
          }

          .status-pill {
            align-self: flex-start;
          }

          .enquiry-meta {
            gap: 9px 13px;
          }

          .message-preview {
            white-space: normal;
          }

          .detail-drawer {
            width: 100%;
          }

          .drawer-header {
            padding: 25px 20px 21px;
          }

          .drawer-header h2 {
            font-size: 26px;
          }

          .drawer-body {
            padding: 22px 20px 25px;
          }

          .detail-grid {
            grid-template-columns: 1fr;
          }

          .drawer-footer {
            padding: 14px 20px;
          }

          .drawer-action {
            flex: 1;
          }

          .toast {
            left: 14px;
            right: 14px;
            bottom: 14px;
            max-width: none;
          }

          .admin-footer {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .admin-enquiries-page *,
          .admin-enquiries-page *::before,
          .admin-enquiries-page *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </main>
  );
}

function DetailItem({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string | null | undefined;
  href?: string;
}) {
  if (href && value) {
    return (
      <div className="detail-item">
        <span className="detail-item-label">
          {icon}
          {label}
        </span>

        <a
          href={href}
          className="detail-item-value link"
        >
          {value}
        </a>
      </div>
    );
  }

  return (
    <div className="detail-item">
      <span className="detail-item-label">
        {icon}
        {label}
      </span>

      <span className="detail-item-value">
        {value || "—"}
      </span>
    </div>
  );
}