"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";

import {
  ArrowUpRight,
  Building2,
  Check,
  ChevronDown,
  Edit3,
  Grid3X3,
  Loader2,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  X,
} from "lucide-react";

import Navbar from "@/components/Navbar";

/* ============================================================
   TYPES
============================================================ */

type Client = {
  id: number;
  name: string;
  logo: string | null;
  sector: string | null;
  isActive: boolean;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
};

type ClientForm = {
  name: string;
  logo: string;
  sector: string;
  sortOrder: string;
  isActive: boolean;
};

/* ============================================================
   CONSTANTS
============================================================ */

const SECTORS = [
  "Pharma & Food",
  "Automotive",
  "Industrial",
  "Infrastructure",
  "Engineering",
  "Healthcare",
  "FMCG",
  "Other",
];

/* ============================================================
   HELPERS
============================================================ */

function getDisplayName(client: Client) {
  if (client.name.startsWith("Client Logo C")) {
    return "Client Logo";
  }

  return client.name;
}

function getSourceReference(client: Client) {
  if (!client.name.startsWith("Client Logo C")) {
    return null;
  }

  return client.name.replace("Client Logo ", "");
}

/* ============================================================
   CLIENT CARD
============================================================ */

function ClientCard({
  client,
  onEdit,
  onDelete,
}: {
  client: Client;
  onEdit: (client: Client) => void;
  onDelete: (client: Client) => void;
}) {
  const displayName = getDisplayName(client);
  const sourceReference = getSourceReference(client);

  return (
    <article className="client-card">
      {/* --------------------------------------------------------
         LOGO AREA
      -------------------------------------------------------- */}

      <div className="client-card-logo-area">
        <div className="client-card-index">
          CLIENT / {String(client.sortOrder + 1).padStart(2, "0")}
        </div>

        {client.logo ? (
          <img
            src={client.logo}
            alt={displayName}
            className="client-card-logo"
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.display = "none";
              event.currentTarget.parentElement
                ?.classList.add("logo-load-error");
            }}
          />
        ) : (
          <div className="client-card-no-logo">
            <Building2 size={26} strokeWidth={1.3} />
            <span>NO LOGO</span>
          </div>
        )}

        <div className="client-card-logo-overlay" />
      </div>

      {/* --------------------------------------------------------
         CARD CONTENT
      -------------------------------------------------------- */}

      <div className="client-card-content">
        <div className="client-card-heading">
          <div>
            <h3>{displayName}</h3>

            {sourceReference && (
              <span className="source-reference">
                Source reference {sourceReference}
              </span>
            )}
          </div>

          <span
            className={
              client.isActive
                ? "client-status active"
                : "client-status inactive"
            }
          >
            <span />
            {client.isActive ? "ACTIVE" : "INACTIVE"}
          </span>
        </div>

        <div className="client-card-meta">
          <span>
            {client.sector || "General"}
          </span>

          <span>
            ID {String(client.id).padStart(3, "0")}
          </span>
        </div>

        {/* ------------------------------------------------------
           ACTIONS
        ------------------------------------------------------ */}

        <div className="client-card-actions">
          <button
            type="button"
            onClick={() => onEdit(client)}
            className="card-action edit"
          >
            <Edit3 size={13} />
            EDIT
          </button>

          <button
            type="button"
            onClick={() => onDelete(client)}
            className="card-action delete"
          >
            <Trash2 size={13} />
            DELETE
          </button>
        </div>
      </div>
    </article>
  );
}

/* ============================================================
   PAGE
============================================================ */

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState("");
  const [sectorFilter, setSectorFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [panelOpen, setPanelOpen] = useState(false);
  const [editingClient, setEditingClient] =
    useState<Client | null>(null);

  const [form, setForm] = useState<ClientForm>({
    name: "",
    logo: "",
    sector: "",
    sortOrder: "0",
    isActive: true,
  });

  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] =
    useState<number | null>(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* ==========================================================
     LOAD CLIENTS
  ========================================================== */

  async function loadClients(showRefresh = false) {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await fetch(
        "/api/clients?all=true",
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to load clients."
        );
      }

      setClients(data.clients || []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load clients."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadClients();
  }, []);

  /* ==========================================================
     FILTER CLIENTS
  ========================================================== */

  const filteredClients = useMemo(() => {
    const query = search.trim().toLowerCase();

    return clients.filter((client) => {
      const matchesSearch =
        !query ||
        client.name.toLowerCase().includes(query) ||
        (client.sector || "")
          .toLowerCase()
          .includes(query);

      const matchesSector =
        sectorFilter === "ALL" ||
        (client.sector || "Other") === sectorFilter;

      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "ACTIVE" &&
          client.isActive) ||
        (statusFilter === "INACTIVE" &&
          !client.isActive);

      return (
        matchesSearch &&
        matchesSector &&
        matchesStatus
      );
    });
  }, [
    clients,
    search,
    sectorFilter,
    statusFilter,
  ]);

  /* ==========================================================
     STATS
  ========================================================== */

  const stats = useMemo(() => {
    const total = clients.length;

    const active = clients.filter(
      (client) => client.isActive
    ).length;

    const inactive = clients.filter(
      (client) => !client.isActive
    ).length;

    const pharmaFood = clients.filter(
      (client) =>
        client.sector === "Pharma & Food"
    ).length;

    const automotive = clients.filter(
      (client) =>
        client.sector === "Automotive"
    ).length;

    return {
      total,
      active,
      inactive,
      pharmaFood,
      automotive,
    };
  }, [clients]);

  /* ==========================================================
     OPEN ADD PANEL
  ========================================================== */

  function openAddPanel() {
    setEditingClient(null);

    setForm({
      name: "",
      logo: "",
      sector: "",
      sortOrder: String(clients.length),
      isActive: true,
    });

    setError("");
    setSuccess("");
    setPanelOpen(true);
  }

  /* ==========================================================
     OPEN EDIT PANEL
  ========================================================== */

  function openEditPanel(client: Client) {
    setEditingClient(client);

    setForm({
      name: client.name,
      logo: client.logo || "",
      sector: client.sector || "",
      sortOrder: String(client.sortOrder),
      isActive: client.isActive,
    });

    setError("");
    setSuccess("");
    setPanelOpen(true);
  }

  /* ==========================================================
     CLOSE PANEL
  ========================================================== */

  function closePanel() {
    if (saving) return;

    setPanelOpen(false);
    setEditingClient(null);
  }

  /* ==========================================================
     FORM SUBMIT
  ========================================================== */

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!form.name.trim()) {
      setError("Client name is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload = {
        name: form.name.trim(),
        logo: form.logo.trim() || null,
        sector: form.sector || null,
        sortOrder:
          Number.parseInt(form.sortOrder, 10) || 0,
        isActive: form.isActive,
      };

      const endpoint = editingClient
        ? `/api/clients/${editingClient.id}`
        : "/api/clients";

      const method = editingClient
        ? "PATCH"
        : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to save client."
        );
      }

      await loadClients();

      setSuccess(
        editingClient
          ? "Client updated successfully."
          : "Client created successfully."
      );

      setPanelOpen(false);
      setEditingClient(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to save client."
      );
    } finally {
      setSaving(false);
    }
  }

  /* ==========================================================
     DELETE CLIENT
  ========================================================== */

  async function handleDelete(client: Client) {
    const confirmed = window.confirm(
      `Delete ${getDisplayName(client)}?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(client.id);
      setError("");
      setSuccess("");

      const response = await fetch(
        `/api/clients/${client.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to delete client."
        );
      }

      setClients((current) =>
        current.filter(
          (item) => item.id !== client.id
        )
      );

      setSuccess("Client deleted successfully.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to delete client."
      );
    } finally {
      setDeletingId(null);
    }
  }

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <>
      <Navbar />

      <main className="admin-clients-page">
        <div className="admin-container">

          {/* ==================================================
              HEADER
          ================================================== */}

          <header className="admin-header">
            <div className="admin-header-left">
              <p className="admin-eyebrow">
                COLOURPLUS / ADMIN / CLIENTS
              </p>

              <h1>
                Client
                <br />
                <em>network.</em>
              </h1>

              <p className="admin-description">
                Manage the client identities displayed
                across the Colourplus website.
              </p>
            </div>

            <div className="admin-header-right">
              <div className="admin-system-label">
                <span className="system-dot" />
                SYSTEM / CLIENT DATABASE
              </div>

              <button
                type="button"
                className="add-client-button"
                onClick={openAddPanel}
              >
                <Plus size={15} />
                ADD CLIENT
                <ArrowUpRight size={14} />
              </button>
            </div>
          </header>

          {/* ==================================================
              STATS
          ================================================== */}

          <section className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <Grid3X3 size={17} />
              </div>

              <div>
                <span className="stat-label">
                  TOTAL CLIENTS
                </span>

                <strong>{stats.total}</strong>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <Check size={17} />
              </div>

              <div>
                <span className="stat-label">
                  ACTIVE
                </span>

                <strong>{stats.active}</strong>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <Building2 size={17} />
              </div>

              <div>
                <span className="stat-label">
                  PHARMA & FOOD
                </span>

                <strong>
                  {stats.pharmaFood}
                </strong>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <Building2 size={17} />
              </div>

              <div>
                <span className="stat-label">
                  AUTOMOTIVE
                </span>

                <strong>
                  {stats.automotive}
                </strong>
              </div>
            </div>
          </section>

          {/* ==================================================
              TOOLBAR
          ================================================== */}

          <section className="toolbar">
            <div className="search-box">
              <Search size={15} />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search clients..."
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

            <div className="toolbar-select">
              <span>SECTOR</span>

              <div className="select-wrap">
                <select
                  value={sectorFilter}
                  onChange={(event) =>
                    setSectorFilter(
                      event.target.value
                    )
                  }
                >
                  <option value="ALL">
                    ALL SECTORS
                  </option>

                  {SECTORS.map((sector) => (
                    <option
                      key={sector}
                      value={sector}
                    >
                      {sector.toUpperCase()}
                    </option>
                  ))}
                </select>

                <ChevronDown size={13} />
              </div>
            </div>

            <div className="toolbar-select">
              <span>STATUS</span>

              <div className="select-wrap">
                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(
                      event.target.value
                    )
                  }
                >
                  <option value="ALL">
                    ALL STATUS
                  </option>

                  <option value="ACTIVE">
                    ACTIVE
                  </option>

                  <option value="INACTIVE">
                    INACTIVE
                  </option>
                </select>

                <ChevronDown size={13} />
              </div>
            </div>

            <button
              type="button"
              className="refresh-button"
              onClick={() =>
                loadClients(true)
              }
              disabled={refreshing}
              aria-label="Refresh clients"
            >
              <RefreshCw
                size={14}
                className={
                  refreshing
                    ? "spinning"
                    : ""
                }
              />
            </button>
          </section>

          {/* ==================================================
              RESULTS HEADER
          ================================================== */}

          <div className="results-header">
            <div>
              <span className="results-kicker">
                CLIENT DIRECTORY
              </span>

              <strong>
                {filteredClients.length}
                <span>
                  {" "}
                  / {clients.length}
                </span>
              </strong>
            </div>

            <div className="results-status">
              <span className="status-pulse" />
              LIVE DATABASE
            </div>
          </div>

          {/* ==================================================
              CLIENT GRID
          ================================================== */}

          {loading ? (
            <div className="loading-state">
              <Loader2
                size={22}
                className="spinning"
              />

              <span>
                Loading client network...
              </span>
            </div>
          ) : filteredClients.length === 0 ? (
            <div className="empty-state">
              <Building2 size={30} />

              <h3>
                No clients found
              </h3>

              <p>
                Try changing your search or
                filter settings.
              </p>

              <button
                type="button"
                onClick={openAddPanel}
              >
                <Plus size={14} />
                ADD CLIENT
              </button>
            </div>
          ) : (
            <section className="client-grid">
              {filteredClients.map(
                (client, index) => (
                  <div
                    key={client.id}
                    className="client-card-wrapper"
                    style={{
                      animationDelay: `${
                        (index % 12) * 45
                      }ms`,
                    }}
                  >
                    <ClientCard
                      client={client}
                      onEdit={openEditPanel}
                      onDelete={handleDelete}
                    />
                  </div>
                )
              )}
            </section>
          )}

          {/* ==================================================
              FOOTER
          ================================================== */}

          <footer className="admin-footer">
            <span>
              COLOURPLUS POLYURETHANES PVT. LTD.
            </span>

            <span>
              CLIENT MANAGEMENT / INTERNAL
            </span>

            <Link href="/">
              VIEW WEBSITE
              <ArrowUpRight size={12} />
            </Link>
          </footer>
        </div>

        {/* ====================================================
            EDITOR PANEL
        ==================================================== */}

        {panelOpen && (
          <div
            className="panel-backdrop"
            onMouseDown={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                closePanel();
              }
            }}
          >
            <aside className="editor-panel">
              <div className="editor-header">
                <div>
                  <p className="admin-eyebrow">
                    {editingClient
                      ? "EDIT / CLIENT"
                      : "CREATE / CLIENT"}
                  </p>

                  <h2>
                    {editingClient
                      ? "Update client."
                      : "Add client."}
                  </h2>
                </div>

                <button
                  type="button"
                  className="panel-close"
                  onClick={closePanel}
                  disabled={saving}
                >
                  <X size={17} />
                </button>
              </div>

              <form
                onSubmit={handleSubmit}
                className="client-form"
              >
                <label>
                  <span>CLIENT NAME</span>

                  <input
                    value={form.name}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        name: event.target.value,
                      })
                    }
                    placeholder="Client name"
                  />
                </label>

                <label>
                  <span>LOGO URL</span>

                  <input
                    value={form.logo}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        logo: event.target.value,
                      })
                    }
                    placeholder="https://..."
                  />
                </label>

                <label>
                  <span>SECTOR</span>

                  <div className="form-select-wrap">
                    <select
                      value={form.sector}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          sector:
                            event.target.value,
                        })
                      }
                    >
                      <option value="">
                        Select sector
                      </option>

                      {SECTORS.map(
                        (sector) => (
                          <option
                            key={sector}
                            value={sector}
                          >
                            {sector}
                          </option>
                        )
                      )}
                    </select>

                    <ChevronDown size={14} />
                  </div>
                </label>

                <div className="form-two-column">
                  <label>
                    <span>SORT ORDER</span>

                    <input
                      type="number"
                      value={
                        form.sortOrder
                      }
                      onChange={(event) =>
                        setForm({
                          ...form,
                          sortOrder:
                            event.target
                              .value,
                        })
                      }
                    />
                  </label>

                  <label className="toggle-field">
                    <span>STATUS</span>

                    <button
                      type="button"
                      className={
                        form.isActive
                          ? "toggle active"
                          : "toggle"
                      }
                      onClick={() =>
                        setForm({
                          ...form,
                          isActive:
                            !form.isActive,
                        })
                      }
                    >
                      <span />

                      {form.isActive
                        ? "ACTIVE"
                        : "INACTIVE"}
                    </button>
                  </label>
                </div>

                {/* ------------------------------------------------
                   PREVIEW
                ------------------------------------------------ */}

                {form.logo && (
                  <div className="logo-preview">
                    <span>LOGO PREVIEW</span>

                    <div>
                      <img
                        src={form.logo}
                        alt="Logo preview"
                        onError={(event) => {
                          event.currentTarget.style.display =
                            "none";
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="form-actions">
                  <button
                    type="button"
                    onClick={closePanel}
                    disabled={saving}
                    className="cancel-button"
                  >
                    CANCEL
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="save-button"
                  >
                    {saving ? (
                      <>
                        <Loader2
                          size={14}
                          className="spinning"
                        />
                        SAVING
                      </>
                    ) : (
                      <>
                        <Check size={14} />
                        {editingClient
                          ? "UPDATE CLIENT"
                          : "CREATE CLIENT"}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </aside>
          </div>
        )}

        {/* ====================================================
            TOASTS
        ==================================================== */}

        {success && (
          <div className="toast success-toast">
            <Check size={14} />

            <span>{success}</span>

            <button
              type="button"
              onClick={() =>
                setSuccess("")
              }
            >
              <X size={13} />
            </button>
          </div>
        )}

        {error && (
          <div className="toast error-toast">
            <X size={14} />

            <span>{error}</span>

            <button
              type="button"
              onClick={() =>
                setError("")
              }
            >
              <X size={13} />
            </button>
          </div>
        )}

        {/* ====================================================
            CSS
        ==================================================== */}

        <style jsx global>{`

          /* ====================================================
             VARIABLES
          ==================================================== */

          .admin-clients-page {
            --admin-navy: #091422;
            --admin-deep: #050d17;
            --admin-blue: #6caee8;
            --admin-paper: #f2f0eb;
            --admin-white: #ffffff;
            --admin-ink: #101722;
            --admin-muted: #69727e;
            --admin-line: rgba(16, 23, 34, 0.12);

            min-height: 100vh;

            padding: 125px 0 0;

            background:
              var(--admin-paper);

            color:
              var(--admin-ink);

            overflow:
              hidden;
          }


          .admin-clients-page *,
          .admin-clients-page *::before,
          .admin-clients-page *::after {
            box-sizing: border-box;
          }


          .admin-container {
            width:
              min(
                1280px,
                calc(100% - 8vw)
              );

            margin:
              0 auto;
          }


          /* ====================================================
             HEADER
          ==================================================== */

          .admin-header {
            display:
              flex;

            justify-content:
              space-between;

            align-items:
              flex-end;

            gap:
              60px;

            padding:
              48px 0 65px;

            border-bottom:
              1px solid
              var(--admin-line);
          }


          .admin-header-left {
            max-width:
              720px;
          }


          .admin-eyebrow {
            margin:
              0 0 20px;

            font-size:
              9px;

            line-height:
              1.3;

            font-weight:
              700;

            letter-spacing:
              .2em;

            text-transform:
              uppercase;

            color:
              rgba(16,23,34,.48);
          }


          .admin-header h1 {
            margin:
              0;

            font-size:
              clamp(
                62px,
                6.5vw,
                100px
              );

            line-height:
              .84;

            letter-spacing:
              -.07em;

            font-weight:
              600;
          }


          .admin-header h1 em {
            font-style:
              normal;

            color:
              rgba(16,23,34,.34);
          }


          .admin-description {
            max-width:
              510px;

            margin:
              32px 0 0;

            font-size:
              13px;

            line-height:
              1.8;

            color:
              var(--admin-muted);
          }


          .admin-header-right {
            display:
              flex;

            flex-direction:
              column;

            align-items:
              flex-end;

            gap:
              25px;
          }


          .admin-system-label {
            display:
              flex;

            align-items:
              center;

            gap:
              8px;

            font-size:
              8px;

            letter-spacing:
              .17em;

            color:
              rgba(16,23,34,.38);
          }


          .system-dot {
            width:
              5px;

            height:
              5px;

            border-radius:
              50%;

            background:
              var(--admin-blue);

            box-shadow:
              0 0 14px
              rgba(108,174,232,.7);

            animation:
              adminPulse
              2.4s
              ease-in-out
              infinite;
          }


          .add-client-button {
            display:
              inline-flex;

            align-items:
              center;

            gap:
              9px;

            padding:
              14px 18px;

            border:
              1px solid
              var(--admin-navy);

            background:
              var(--admin-navy);

            color:
              white;

            font-family:
              inherit;

            font-size:
              8px;

            font-weight:
              700;

            letter-spacing:
              .13em;

            cursor:
              pointer;

            transition:
              transform .35s
              cubic-bezier(.16,1,.3,1),
              background .3s ease,
              box-shadow .3s ease;
          }


          .add-client-button:hover {
            transform:
              translateY(-3px);

            background:
              #101f31;

            box-shadow:
              0 15px 35px
              rgba(9,20,34,.18);
          }


          /* ====================================================
             STATS
          ==================================================== */

          .stats-grid {
            display:
              grid;

            grid-template-columns:
              repeat(4, 1fr);

            gap:
              12px;

            padding:
              22px 0;
          }


          .stat-card {
            min-height:
              108px;

            display:
              flex;

            align-items:
              center;

            gap:
              16px;

            padding:
              18px 20px;

            border:
              1px solid
              rgba(16,23,34,.09);

            background:
              rgba(255,255,255,.45);

            transition:
              transform .35s
              cubic-bezier(.16,1,.3,1),
              background .3s ease,
              border-color .3s ease;
          }


          .stat-card:hover {
            transform:
              translateY(-4px);

            background:
              white;

            border-color:
              rgba(108,174,232,.35);
          }


          .stat-icon {
            width:
              36px;

            height:
              36px;

            flex-shrink:
              0;

            display:
              flex;

            align-items:
              center;

            justify-content:
              center;

            border:
              1px solid
              rgba(16,23,34,.1);

            color:
              var(--admin-blue);

            background:
              rgba(108,174,232,.06);
          }


          .stat-card > div:last-child {
            display:
              flex;

            flex-direction:
              column;

            gap:
              5px;
          }


          .stat-label {
            font-size:
              7px;

            line-height:
              1.3;

            letter-spacing:
              .14em;

            color:
              rgba(16,23,34,.42);
          }


          .stat-card strong {
            font-size:
              29px;

            line-height:
              1;

            letter-spacing:
              -.04em;

            font-weight:
              600;
          }


          /* ====================================================
             TOOLBAR
          ==================================================== */

          .toolbar {
            display:
              flex;

            align-items:
              center;

            gap:
              10px;

            padding:
              20px 0;

            border-top:
              1px solid
              var(--admin-line);

            border-bottom:
              1px solid
              var(--admin-line);
          }


          .search-box {
            flex:
              1;

            min-width:
              240px;

            height:
              44px;

            display:
              flex;

            align-items:
              center;

            gap:
              10px;

            padding:
              0 13px;

            border:
              1px solid
              rgba(16,23,34,.11);

            background:
              rgba(255,255,255,.55);

            color:
              rgba(16,23,34,.4);

            transition:
              border-color .3s ease,
              background .3s ease;
          }


          .search-box:focus-within {
            background:
              white;

            border-color:
              rgba(108,174,232,.55);
          }


          .search-box input {
            width:
              100%;

            border:
              0;

            outline:
              0;

            background:
              transparent;

            color:
              var(--admin-ink);

            font-family:
              inherit;

            font-size:
              11px;
          }


          .search-box input::placeholder {
            color:
              rgba(16,23,34,.38);
          }


          .search-box button {
            display:
              flex;

            align-items:
              center;

            justify-content:
              center;

            border:
              0;

            background:
              transparent;

            color:
              rgba(16,23,34,.4);

            cursor:
              pointer;
          }


          .toolbar-select {
            display:
              flex;

            align-items:
              center;

            gap:
              10px;

            height:
              44px;

            padding:
              0 13px;

            border:
              1px solid
              rgba(16,23,34,.11);

            background:
              rgba(255,255,255,.55);
          }


          .toolbar-select > span {
            font-size:
              7px;

            letter-spacing:
              .13em;

            color:
              rgba(16,23,34,.38);
          }


          .select-wrap,
          .form-select-wrap {
            position:
              relative;

            display:
              flex;

            align-items:
              center;
          }


          .select-wrap select,
          .form-select-wrap select {
            appearance:
              none;

            border:
              0;

            outline:
              0;

            background:
              transparent;

            color:
              var(--admin-ink);

            font-family:
              inherit;

            font-size:
              8px;

            font-weight:
              700;

            letter-spacing:
              .08em;

            padding-right:
              20px;

            cursor:
              pointer;
          }


          .select-wrap svg,
          .form-select-wrap svg {
            position:
              absolute;

            right:
              0;

            pointer-events:
              none;

            color:
              rgba(16,23,34,.45);
          }


          .refresh-button {
            width:
              44px;

            height:
              44px;

            flex-shrink:
              0;

            display:
              flex;

            align-items:
              center;

            justify-content:
              center;

            border:
              1px solid
              rgba(16,23,34,.11);

            background:
              rgba(255,255,255,.55);

            color:
              var(--admin-ink);

            cursor:
              pointer;

            transition:
              transform .3s ease,
              background .3s ease;
          }


          .refresh-button:hover {
            transform:
              rotate(25deg);

            background:
              white;
          }


          .refresh-button:disabled {
            cursor:
              default;

            opacity:
              .5;
          }


          /* ====================================================
             RESULTS HEADER
          ==================================================== */

          .results-header {
            display:
              flex;

            justify-content:
              space-between;

            align-items:
              center;

            padding:
              28px 0 17px;
          }


          .results-header > div:first-child {
            display:
              flex;

            align-items:
              center;

            gap:
              14px;
          }


          .results-kicker {
            font-size:
              7px;

            font-weight:
              700;

            letter-spacing:
              .15em;

            color:
              rgba(16,23,34,.35);
          }


          .results-header strong {
            font-size:
              18px;

            letter-spacing:
              -.03em;
          }


          .results-header strong span {
            color:
              rgba(16,23,34,.3);
          }


          .results-status {
            display:
              flex;

            align-items:
              center;

            gap:
              7px;

            font-size:
              7px;

            letter-spacing:
              .15em;

            color:
              rgba(16,23,34,.34);
          }


          .status-pulse {
            width:
              5px;

            height:
              5px;

            border-radius:
              50%;

            background:
              #6caee8;

            box-shadow:
              0 0 12px
              rgba(108,174,232,.7);

            animation:
              adminPulse
              2s
              ease-in-out
              infinite;
          }


          /* ====================================================
             CLIENT GRID
          ==================================================== */

          .client-grid {
            display:
              grid;

            grid-template-columns:
              repeat(4, minmax(0, 1fr));

            gap:
              14px;

            padding-bottom:
              70px;
          }


          .client-card-wrapper {
            animation:
              clientCardReveal
              .7s
              cubic-bezier(.16,1,.3,1)
              both;
          }


          /* ====================================================
             CLIENT CARD
          ==================================================== */

          .client-card {
            position:
              relative;

            overflow:
              hidden;

            min-height:
              310px;

            display:
              flex;

            flex-direction:
              column;

            border:
              1px solid
              rgba(16,23,34,.1);

            background:
              white;

            transition:
              transform .5s
              cubic-bezier(.16,1,.3,1),
              box-shadow .4s ease,
              border-color .3s ease;
          }


          .client-card:hover {
            transform:
              translateY(-7px);

            border-color:
              rgba(108,174,232,.38);

            box-shadow:
              0 25px 60px
              rgba(9,20,34,.12);
          }


          .client-card-logo-area {
            position:
              relative;

            height:
              185px;

            display:
              flex;

            align-items:
              center;

            justify-content:
              center;

            overflow:
              hidden;

            background:
              #f7f7f5;

            border-bottom:
              1px solid
              rgba(16,23,34,.08);
          }


          .client-card-index {
            position:
              absolute;

            top:
              13px;

            left:
              14px;

            z-index:
              3;

            font-size:
              7px;

            font-weight:
              700;

            letter-spacing:
              .14em;

            color:
              rgba(16,23,34,.28);
          }


          .client-card-logo {
            position:
              relative;

            z-index:
              2;

            width:
              82%;

            height:
              130px;

            object-fit:
              contain;

            transition:
              transform .6s
              cubic-bezier(.16,1,.3,1);
          }


          .client-card:hover .client-card-logo {
            transform:
              scale(1.045);
          }


          .client-card-logo-overlay {
            position:
              absolute;

            inset:
              0;

            background:
              radial-gradient(
                circle at 50% 50%,
                rgba(108,174,232,.05),
                transparent 58%
              );

            pointer-events:
              none;
          }


          .client-card-no-logo {
            display:
              flex;

            flex-direction:
              column;

            align-items:
              center;

            gap:
              9px;

            color:
              rgba(16,23,34,.27);
          }


          .client-card-no-logo span {
            font-size:
              7px;

            letter-spacing:
              .15em;
          }


          .logo-load-error {
            background:
              #f1f1ef;
          }


          .client-card-content {
            flex:
              1;

            display:
              flex;

            flex-direction:
              column;

            padding:
              18px 17px 15px;
          }


          .client-card-heading {
            display:
              flex;

            justify-content:
              space-between;

            align-items:
              flex-start;

            gap:
              10px;
          }


          .client-card-heading h3 {
            margin:
              0;

            font-size:
              14px;

            line-height:
              1.15;

            letter-spacing:
              -.025em;

            font-weight:
              600;

            color:
              var(--admin-ink);
          }


          .source-reference {
            display:
              block;

            margin-top:
              5px;

            font-size:
              8px;

            line-height:
              1.3;

            letter-spacing:
              .12em;

            text-transform:
              uppercase;

            color:
              #8b96a5;
          }


          .client-status {
            display:
              inline-flex;

            align-items:
              center;

            gap:
              5px;

            flex-shrink:
              0;

            padding-top:
              2px;

            font-size:
              6px;

            font-weight:
              700;

            letter-spacing:
              .13em;
          }


          .client-status > span {
            width:
              5px;

            height:
              5px;

            border-radius:
              50%;
          }


          .client-status.active {
            color:
              #587968;
          }


          .client-status.active > span {
            background:
              #587968;
          }


          .client-status.inactive {
            color:
              #a36c6c;
          }


          .client-status.inactive > span {
            background:
              #a36c6c;
          }


          .client-card-meta {
            display:
              flex;

            justify-content:
              space-between;

            gap:
              10px;

            margin-top:
              15px;

            padding-top:
              11px;

            border-top:
              1px solid
              rgba(16,23,34,.08);

            font-size:
              7px;

            line-height:
              1.3;

            letter-spacing:
              .11em;

            text-transform:
              uppercase;

            color:
              rgba(16,23,34,.4);
          }


          .client-card-actions {
            display:
              flex;

            gap:
              7px;

            margin-top:
              auto;

            padding-top:
              16px;
          }


          .card-action {
            flex:
              1;

            height:
              32px;

            display:
              flex;

            align-items:
              center;

            justify-content:
              center;

            gap:
              6px;

            border:
              1px solid
              rgba(16,23,34,.1);

            background:
              transparent;

            font-family:
              inherit;

            font-size:
              7px;

            font-weight:
              700;

            letter-spacing:
              .12em;

            cursor:
              pointer;

            transition:
              background .3s ease,
              color .3s ease,
              border-color .3s ease;
          }


          .card-action.edit {
            color:
              var(--admin-ink);
          }


          .card-action.edit:hover {
            background:
              var(--admin-navy);

            border-color:
              var(--admin-navy);

            color:
              white;
          }


          .card-action.delete {
            color:
              rgba(143,78,78,.7);
          }


          .card-action.delete:hover {
            background:
              rgba(143,78,78,.08);

            border-color:
              rgba(143,78,78,.28);
          }


          /* ====================================================
             LOADING / EMPTY
          ==================================================== */

          .loading-state {
            min-height:
              420px;

            display:
              flex;

            align-items:
              center;

            justify-content:
              center;

            flex-direction:
              column;

            gap:
              12px;

            color:
              rgba(16,23,34,.4);

            font-size:
              9px;

            letter-spacing:
              .13em;

            text-transform:
              uppercase;
          }


          .empty-state {
            min-height:
              380px;

            display:
              flex;

            align-items:
              center;

            justify-content:
              center;

            flex-direction:
              column;

            gap:
              12px;

            border:
              1px solid
              rgba(16,23,34,.1);

            background:
              rgba(255,255,255,.4);

            color:
              rgba(16,23,34,.35);

            text-align:
              center;
          }


          .empty-state h3 {
            margin:
              5px 0 0;

            color:
              var(--admin-ink);

            font-size:
              20px;

            letter-spacing:
              -.03em;
          }


          .empty-state p {
            margin:
              0;

            font-size:
              11px;

            color:
              var(--admin-muted);
          }


          .empty-state button {
            display:
              inline-flex;

            align-items:
              center;

            gap:
              7px;

            margin-top:
              10px;

            padding:
              11px 15px;

            border:
              1px solid
              var(--admin-navy);

            background:
              var(--admin-navy);

            color:
              white;

            font-family:
              inherit;

            font-size:
              7px;

            font-weight:
              700;

            letter-spacing:
              .13em;

            cursor:
              pointer;
          }


          /* ====================================================
             FOOTER
          ==================================================== */

          .admin-footer {
            display:
              flex;

            justify-content:
              space-between;

            align-items:
              center;

            gap:
              20px;

            padding:
              25px 0;

            border-top:
              1px solid
              var(--admin-line);

            color:
              rgba(16,23,34,.35);

            font-size:
              7px;

            letter-spacing:
              .14em;
          }


          .admin-footer a {
            display:
              inline-flex;

            align-items:
              center;

            gap:
              7px;

            color:
              rgba(16,23,34,.5);

            transition:
              transform .3s ease,
              color .3s ease;
          }


          .admin-footer a:hover {
            color:
              var(--admin-ink);

            transform:
              translateX(4px);
          }


          /* ====================================================
             EDITOR PANEL
          ==================================================== */

          .panel-backdrop {
            position:
              fixed;

            inset:
              0;

            z-index:
              9999;

            display:
              flex;

            justify-content:
              flex-end;

            background:
              rgba(5,13,23,.46);

            backdrop-filter:
              blur(5px);

            animation:
              backdropIn
              .35s ease
              both;
          }


          .editor-panel {
            width:
              min(
                500px,
                94vw
              );

            height:
              100%;

            overflow-y:
              auto;

            padding:
              38px;

            background:
              var(--admin-paper);

            box-shadow:
              -25px 0 80px
              rgba(0,0,0,.18);

            animation:
              panelIn
              .65s
              cubic-bezier(.16,1,.3,1)
              both;
          }


          .editor-header {
            display:
              flex;

            justify-content:
              space-between;

            align-items:
              flex-start;

            gap:
              20px;

            padding-bottom:
              30px;

            border-bottom:
              1px solid
              var(--admin-line);
          }


          .editor-header h2 {
            margin:
              0;

            font-size:
              42px;

            line-height:
              .9;

            letter-spacing:
              -.055em;

            font-weight:
              600;
          }


          .panel-close {
            width:
              38px;

            height:
              38px;

            display:
              flex;

            align-items:
              center;

            justify-content:
              center;

            border:
              1px solid
              rgba(16,23,34,.12);

            background:
              transparent;

            color:
              var(--admin-ink);

            cursor:
              pointer;

            transition:
              transform .3s ease,
              background .3s ease;
          }


          .panel-close:hover {
            transform:
              rotate(90deg);

            background:
              white;
          }


          .client-form {
            display:
              flex;

            flex-direction:
              column;

            gap:
              23px;

            padding-top:
              30px;
          }


          .client-form label {
            display:
              flex;

            flex-direction:
              column;

            gap:
              8px;
          }


          .client-form label > span {
            font-size:
              7px;

            font-weight:
              700;

            letter-spacing:
              .15em;

            color:
              rgba(16,23,34,.42);
          }


          .client-form input,
          .client-form select {
            width:
              100%;

            height:
              45px;

            padding:
              0 13px;

            border:
              1px solid
              rgba(16,23,34,.12);

            outline:
              0;

            background:
              rgba(255,255,255,.65);

            color:
              var(--admin-ink);

            font-family:
              inherit;

            font-size:
              11px;

            transition:
              border-color .3s ease,
              background .3s ease;
          }


          .client-form input:focus,
          .client-form select:focus {
            border-color:
              rgba(108,174,232,.65);

            background:
              white;
          }


          .form-select-wrap {
            width:
              100%;

            height:
              45px;

            padding:
              0 13px;

            border:
              1px solid
              rgba(16,23,34,.12);

            background:
              rgba(255,255,255,.65);
          }


          .form-select-wrap select {
            height:
              43px;

            padding:
              0;

            border:
              0;
          }


          .form-two-column {
            display:
              grid;

            grid-template-columns:
              1fr 1fr;

            gap:
              15px;
          }


          .toggle-field {
            justify-content:
              flex-start;
          }


          .toggle {
            width:
              100%;

            height:
              45px;

            display:
              flex;

            align-items:
              center;

            justify-content:
              space-between;

            padding:
              0 13px;

            border:
              1px solid
              rgba(16,23,34,.12);

            background:
              rgba(255,255,255,.65);

            color:
              rgba(16,23,34,.4);

            font-family:
              inherit;

            font-size:
              7px;

            font-weight:
              700;

            letter-spacing:
              .12em;

            cursor:
              pointer;
          }


          .toggle > span {
            width:
              24px;

            height:
              13px;

            position:
              relative;

            border-radius:
              20px;

            background:
              rgba(16,23,34,.18);

            transition:
              background .3s ease;
          }


          .toggle > span::after {
            content:
              "";

            position:
              absolute;

            top:
              2px;

            left:
              2px;

            width:
              9px;

            height:
              9px;

            border-radius:
              50%;

            background:
              white;

            box-shadow:
              0 1px 4px
              rgba(0,0,0,.2);

            transition:
              transform .3s ease;
          }


          .toggle.active {
            color:
              #587968;
          }


          .toggle.active > span {
            background:
              var(--admin-blue);
          }


          .toggle.active > span::after {
            transform:
              translateX(11px);
          }


          /* ====================================================
             PREVIEW
          ==================================================== */

          .logo-preview {
            display:
              flex;

            flex-direction:
              column;

            gap:
              8px;
          }


          .logo-preview > span {
            font-size:
              7px;

            font-weight:
              700;

            letter-spacing:
              .15em;

            color:
              rgba(16,23,34,.42);
          }


          .logo-preview > div {
            height:
              150px;

            display:
              flex;

            align-items:
              center;

            justify-content:
              center;

            padding:
              20px;

            border:
              1px solid
              rgba(16,23,34,.1);

            background:
              white;
          }


          .logo-preview img {
            max-width:
              85%;

            max-height:
              105px;

            object-fit:
              contain;
          }


          /* ====================================================
             FORM ACTIONS
          ==================================================== */

          .form-actions {
            display:
              grid;

            grid-template-columns:
              1fr 1.7fr;

            gap:
              9px;

            padding-top:
              8px;
          }


          .cancel-button,
          .save-button {
            height:
              46px;

            display:
              flex;

            align-items:
              center;

            justify-content:
              center;

            gap:
              7px;

            font-family:
              inherit;

            font-size:
              8px;

            font-weight:
              700;

            letter-spacing:
              .12em;

            cursor:
              pointer;
          }


          .cancel-button {
            border:
              1px solid
              rgba(16,23,34,.12);

            background:
              transparent;

            color:
              var(--admin-ink);
          }


          .save-button {
            border:
              1px solid
              var(--admin-navy);

            background:
              var(--admin-navy);

            color:
              white;

            transition:
              transform .3s ease,
              box-shadow .3s ease;
          }


          .save-button:hover:not(:disabled) {
            transform:
              translateY(-2px);

            box-shadow:
              0 12px 30px
              rgba(9,20,34,.18);
          }


          .cancel-button:disabled,
          .save-button:disabled {
            cursor:
              default;

            opacity:
              .55;
          }


          /* ====================================================
             TOAST
          ==================================================== */

          .toast {
            position:
              fixed;

            right:
              25px;

            bottom:
              25px;

            z-index:
              11000;

            min-width:
              290px;

            display:
              flex;

            align-items:
              center;

            gap:
              9px;

            padding:
              13px 15px;

            border:
              1px solid
              rgba(16,23,34,.12);

            background:
              white;

            box-shadow:
              0 20px 55px
              rgba(9,20,34,.16);

            font-size:
              9px;

            animation:
              toastIn
              .5s
              cubic-bezier(.16,1,.3,1)
              both;
          }


          .toast button {
            margin-left:
              auto;

            display:
              flex;

            border:
              0;

            background:
              transparent;

            color:
              rgba(16,23,34,.4);

            cursor:
              pointer;
          }


          .success-toast {
            color:
              #587968;
          }


          .error-toast {
            color:
              #a36c6c;
          }


          /* ====================================================
             ANIMATIONS
          ==================================================== */

          @keyframes adminPulse {
            0%,
            100% {
              opacity:
                .4;

              transform:
                scale(.8);
            }

            50% {
              opacity:
                1;

              transform:
                scale(1.25);
            }
          }


          @keyframes clientCardReveal {
            from {
              opacity:
                0;

              transform:
                translateY(24px)
                scale(.98);
            }

            to {
              opacity:
                1;

              transform:
                translateY(0)
                scale(1);
            }
          }


          @keyframes backdropIn {
            from {
              opacity:
                0;
            }

            to {
              opacity:
                1;
            }
          }


          @keyframes panelIn {
            from {
              opacity:
                0;

              transform:
                translateX(80px);
            }

            to {
              opacity:
                1;

              transform:
                translateX(0);
            }
          }


          @keyframes toastIn {
            from {
              opacity:
                0;

              transform:
                translateY(15px);
            }

            to {
              opacity:
                1;

              transform:
                translateY(0);
            }
          }


          .spinning {
            animation:
              spin
              1s
              linear
              infinite;
          }


          @keyframes spin {
            to {
              transform:
                rotate(360deg);
            }
          }


          /* ====================================================
             TABLET
          ==================================================== */

          @media (max-width: 1100px) {

            .admin-container {
              width:
                min(
                  920px,
                  calc(100% - 40px)
                );
            }


            .client-grid {
              grid-template-columns:
                repeat(3, minmax(0, 1fr));
            }


            .stats-grid {
              grid-template-columns:
                repeat(2, 1fr);
            }

          }


          /* ====================================================
             SMALL TABLET
          ==================================================== */

          @media (max-width: 820px) {

            .admin-clients-page {
              padding-top:
                110px;
            }


            .admin-header {
              flex-direction:
                column;

              align-items:
                flex-start;

              gap:
                35px;
            }


            .admin-header-right {
              align-items:
                flex-start;
            }


            .toolbar {
              flex-wrap:
                wrap;
            }


            .search-box {
              flex:
                1 1 100%;
            }


            .toolbar-select {
              flex:
                1;
            }


            .client-grid {
              grid-template-columns:
                repeat(2, minmax(0, 1fr));
            }

          }


          /* ====================================================
             MOBILE
          ==================================================== */

          @media (max-width: 560px) {

            .admin-clients-page {
              padding-top:
                95px;
            }


            .admin-container {
              width:
                calc(100% - 30px);
            }


            .admin-header {
              padding:
                35px 0 45px;
            }


            .admin-header h1 {
              font-size:
                58px;
            }


            .stats-grid {
              grid-template-columns:
                1fr 1fr;

              gap:
                8px;
            }


            .stat-card {
              min-height:
                90px;

              padding:
                13px;

              gap:
                10px;
            }


            .stat-icon {
              width:
                30px;

              height:
                30px;
            }


            .stat-card strong {
              font-size:
                23px;
            }


            .toolbar-select {
              width:
                100%;

              justify-content:
                space-between;
            }


            .refresh-button {
              width:
                100%;
            }


            .results-header {
              align-items:
                flex-start;

              gap:
                15px;

              flex-direction:
                column;
            }


            .client-grid {
              grid-template-columns:
                repeat(2, minmax(0, 1fr));

              gap:
                8px;
            }


            .client-card {
              min-height:
                280px;
            }


            .client-card-logo-area {
              height:
                150px;
            }


            .client-card-logo {
              height:
                105px;
            }


            .client-card-content {
              padding:
                14px 12px 12px;
            }


            .client-card-heading {
              flex-direction:
                column;
            }


            .client-card-heading h3 {
              font-size:
                12px;
            }


            .source-reference {
              font-size:
                7px;
            }


            .client-card-meta {
              flex-direction:
                column;

              gap:
                5px;
            }


            .client-card-actions {
              flex-direction:
                column;
            }


            .admin-footer {
              flex-direction:
                column;

              align-items:
                flex-start;

              line-height:
                1.6;
            }


            .editor-panel {
              width:
                100%;

              padding:
                28px 20px;
            }


            .editor-header h2 {
              font-size:
                35px;
            }


            .form-two-column {
              grid-template-columns:
                1fr;
            }


            .toast {
              left:
                15px;

              right:
                15px;

              bottom:
                15px;

              min-width:
                0;
            }

          }


          /* ====================================================
             VERY SMALL MOBILE
          ==================================================== */

          @media (max-width: 390px) {

            .client-grid {
              grid-template-columns:
                1fr;
            }

          }


          /* ====================================================
             REDUCED MOTION
          ==================================================== */

          @media (prefers-reduced-motion: reduce) {

            .admin-clients-page *,
            .admin-clients-page *::before,
            .admin-clients-page *::after {

              animation-duration:
                .01ms !important;

              animation-iteration-count:
                1 !important;

              transition-duration:
                .01ms !important;
            }

          }

        `}</style>
      </main>
    </>
  );
}