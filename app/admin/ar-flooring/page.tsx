"use client";

import {
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Edit3,
  Eye,
  Grid3X3,
  Layers3,
  Loader2,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  X,
} from "lucide-react";

import Link from "next/link";

type AROption = {
  id: number;
  systemId: number;
  name: string;
  color: string | null;
  texture: string | null;
  previewUrl: string | null;
  sortOrder: number;
  createdAt?: string;
};

type ARSystem = {
  id: number;
  name: string;
  description: string | null;
  image: string | null;
  isActive: boolean;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
  options: AROption[];
};

type SystemForm = {
  name: string;
  description: string;
  image: string;
  sortOrder: string;
  isActive: boolean;
};

type OptionForm = {
  systemId: number;
  name: string;
  color: string;
  texture: string;
  previewUrl: string;
  sortOrder: string;
};

const EMPTY_SYSTEM_FORM: SystemForm = {
  name: "",
  description: "",
  image: "",
  sortOrder: "0",
  isActive: true,
};

const EMPTY_OPTION_FORM: OptionForm = {
  systemId: 0,
  name: "",
  color: "",
  texture: "",
  previewUrl: "",
  sortOrder: "0",
};

export default function ARFlooringAdminPage() {
  const [systems, setSystems] = useState<ARSystem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState<
    "ALL" | "ACTIVE" | "INACTIVE"
  >("ALL");

  const [expandedId, setExpandedId] =
    useState<number | null>(null);

  const [systemPanelOpen, setSystemPanelOpen] =
    useState(false);

  const [optionPanelOpen, setOptionPanelOpen] =
    useState(false);

  const [editingSystem, setEditingSystem] =
    useState<ARSystem | null>(null);

  const [editingOption, setEditingOption] =
    useState<AROption | null>(null);

  const [systemForm, setSystemForm] =
    useState<SystemForm>(EMPTY_SYSTEM_FORM);

  const [optionForm, setOptionForm] =
    useState<OptionForm>(EMPTY_OPTION_FORM);

  const [saving, setSaving] = useState(false);

  const [deletingId, setDeletingId] =
    useState<number | null>(null);

  const [deletingOptionId, setDeletingOptionId] =
    useState<number | null>(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadSystems(showRefresh = false) {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await fetch(
        "/api/ar-flooring?all=true",
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to load AR flooring systems."
        );
      }

      setSystems(data.systems || []);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load AR flooring systems."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadSystems();
  }, []);

  const filteredSystems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return systems.filter((system) => {
      const matchesSearch =
        !query ||
        system.name.toLowerCase().includes(query) ||
        (system.description || "")
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "ACTIVE" &&
          system.isActive) ||
        (statusFilter === "INACTIVE" &&
          !system.isActive);

      return matchesSearch && matchesStatus;
    });
  }, [systems, search, statusFilter]);

  const totalSystems = systems.length;

  const activeSystems = systems.filter(
    (system) => system.isActive
  ).length;

  const inactiveSystems = systems.filter(
    (system) => !system.isActive
  ).length;

  const totalOptions = systems.reduce(
    (total, system) =>
      total + system.options.length,
    0
  );

  function openCreateSystem() {
    setEditingSystem(null);

    setSystemForm({
      ...EMPTY_SYSTEM_FORM,
      sortOrder: String(
        systems.length + 1
      ),
    });

    setSystemPanelOpen(true);
    setOptionPanelOpen(false);
    setError("");
  }

  function openEditSystem(system: ARSystem) {
    setEditingSystem(system);

    setSystemForm({
      name: system.name,
      description: system.description || "",
      image: system.image || "",
      sortOrder: String(system.sortOrder),
      isActive: system.isActive,
    });

    setSystemPanelOpen(true);
    setOptionPanelOpen(false);
    setError("");
  }

  function openCreateOption(system: ARSystem) {
    setEditingOption(null);

    setOptionForm({
      ...EMPTY_OPTION_FORM,
      systemId: system.id,
      sortOrder: String(
        system.options.length + 1
      ),
    });

    setOptionPanelOpen(true);
    setSystemPanelOpen(false);
    setError("");
  }

  function openEditOption(option: AROption) {
    setEditingOption(option);

    setOptionForm({
      systemId: option.systemId,
      name: option.name,
      color: option.color || "",
      texture: option.texture || "",
      previewUrl: option.previewUrl || "",
      sortOrder: String(option.sortOrder),
    });

    setOptionPanelOpen(true);
    setSystemPanelOpen(false);
    setError("");
  }

  function closePanels() {
    setSystemPanelOpen(false);
    setOptionPanelOpen(false);
    setEditingSystem(null);
    setEditingOption(null);
  }

  async function handleSystemSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload = {
        name: systemForm.name.trim(),
        description:
          systemForm.description.trim() || null,
        image:
          systemForm.image.trim() || null,
        sortOrder: Number(
          systemForm.sortOrder
        ),
        isActive: systemForm.isActive,
      };

      if (!payload.name) {
        throw new Error(
          "Flooring system name is required."
        );
      }

      const url = editingSystem
        ? `/api/ar-flooring/${editingSystem.id}`
        : "/api/ar-flooring";

      const method = editingSystem
        ? "PATCH"
        : "POST";

      const response = await fetch(url, {
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
            "Failed to save flooring system."
        );
      }

      await loadSystems(true);

      closePanels();

      setSuccess(
        editingSystem
          ? "Flooring system updated successfully."
          : "Flooring system created successfully."
      );

      window.setTimeout(
        () => setSuccess(""),
        3500
      );
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to save flooring system."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleOptionSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload = {
        systemId: Number(
          optionForm.systemId
        ),
        name: optionForm.name.trim(),
        color:
          optionForm.color.trim() || null,
        texture:
          optionForm.texture.trim() || null,
        previewUrl:
          optionForm.previewUrl.trim() || null,
        sortOrder: Number(
          optionForm.sortOrder
        ),
      };

      if (!payload.name) {
        throw new Error(
          "Option name is required."
        );
      }

      if (!payload.systemId) {
        throw new Error(
          "Please select a flooring system."
        );
      }

      const url = editingOption
        ? `/api/ar-flooring/options/${editingOption.id}`
        : "/api/ar-flooring/options";

      const method = editingOption
        ? "PATCH"
        : "POST";

      const response = await fetch(url, {
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
            "Failed to save AR option."
        );
      }

      await loadSystems(true);

      setExpandedId(payload.systemId);

      closePanels();

      setSuccess(
        editingOption
          ? "AR option updated successfully."
          : "AR option created successfully."
      );

      window.setTimeout(
        () => setSuccess(""),
        3500
      );
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to save AR option."
      );
    } finally {
      setSaving(false);
    }
  }

  async function deleteSystem(
    system: ARSystem
  ) {
    const confirmed = window.confirm(
      `Delete "${system.name}" and all of its AR options?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(system.id);
      setError("");
      setSuccess("");

      const response = await fetch(
        `/api/ar-flooring/${system.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to delete flooring system."
        );
      }

      setSystems((current) =>
        current.filter(
          (item) =>
            item.id !== system.id
        )
      );

      if (expandedId === system.id) {
        setExpandedId(null);
      }

      setSuccess(
        "Flooring system deleted successfully."
      );

      window.setTimeout(
        () => setSuccess(""),
        3500
      );
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete flooring system."
      );
    } finally {
      setDeletingId(null);
    }
  }

  async function deleteOption(
    option: AROption
  ) {
    const confirmed = window.confirm(
      `Delete "${option.name}"?`
    );

    if (!confirmed) return;

    try {
      setDeletingOptionId(option.id);
      setError("");
      setSuccess("");

      const response = await fetch(
        `/api/ar-flooring/options/${option.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to delete AR option."
        );
      }

      setSystems((current) =>
        current.map((system) => ({
          ...system,
          options:
            system.options.filter(
              (item) =>
                item.id !== option.id
            ),
        }))
      );

      setSuccess(
        "AR option deleted successfully."
      );

      window.setTimeout(
        () => setSuccess(""),
        3500
      );
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete AR option."
      );
    } finally {
      setDeletingOptionId(null);
    }
  }

  return (
    <>
      <main className="ar-admin">
        <div className="page-shell">

          {/* HEADER */}
          <header className="page-header">
            <div className="header-copy">
              <div className="eyebrow">
                COLOURPLUS / DIGITAL SYSTEMS
              </div>

              <h1>
                AR Flooring
                <span>Management</span>
              </h1>

              <p>
                Manage the flooring systems and
                visual options used by the AR
                flooring experience.
              </p>
            </div>

            <div className="header-actions">
              <button
                className="secondary-button"
                onClick={() =>
                  loadSystems(true)
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

              <button
                className="primary-button"
                onClick={
                  openCreateSystem
                }
              >
                <Plus size={16} />
                Add System
              </button>
            </div>
          </header>

          {/* STATS */}
          <section className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <Layers3 size={18} />
              </div>

              <div className="stat-content">
                <strong>
                  {totalSystems}
                </strong>

                <span>
                  Flooring systems
                </span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <Check size={18} />
              </div>

              <div className="stat-content">
                <strong>
                  {activeSystems}
                </strong>

                <span>
                  Active systems
                </span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <Eye size={18} />
              </div>

              <div className="stat-content">
                <strong>
                  {totalOptions}
                </strong>

                <span>
                  AR visual options
                </span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <Grid3X3 size={18} />
              </div>

              <div className="stat-content">
                <strong>
                  {inactiveSystems}
                </strong>

                <span>
                  Inactive systems
                </span>
              </div>
            </div>
          </section>

          {/* TOOLBAR */}
          <section className="toolbar">
            <div className="search-box">
              <Search size={17} />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search flooring systems..."
              />

              {search && (
                <button
                  onClick={() =>
                    setSearch("")
                  }
                  className="clear-search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="filters">
              <button
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

              <button
                className={
                  statusFilter === "ACTIVE"
                    ? "filter active"
                    : "filter"
                }
                onClick={() =>
                  setStatusFilter(
                    "ACTIVE"
                  )
                }
              >
                Active
              </button>

              <button
                className={
                  statusFilter ===
                  "INACTIVE"
                    ? "filter active"
                    : "filter"
                }
                onClick={() =>
                  setStatusFilter(
                    "INACTIVE"
                  )
                }
              >
                Inactive
              </button>
            </div>
          </section>

          {/* RESULT HEADER */}
          <div className="results-header">
            <div className="results-title">
              <span>
                FLOORING SYSTEMS
              </span>

              <strong>
                {filteredSystems.length}
              </strong>
            </div>

            <p>
              Select a system to manage its
              AR visualization options.
            </p>
          </div>

          {/* CONTENT */}
          {loading ? (
            <div className="loading-state">
              <Loader2
                size={24}
                className="spin"
              />

              <span>
                Loading AR flooring systems...
              </span>
            </div>
          ) : filteredSystems.length ===
            0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <Layers3 size={28} />
              </div>

              <h3>
                No flooring systems found
              </h3>

              <p>
                {search
                  ? "Try a different search term."
                  : "Add your first AR flooring system to begin."}
              </p>

              {!search && (
                <button
                  className="primary-button"
                  onClick={
                    openCreateSystem
                  }
                >
                  <Plus size={16} />
                  Add System
                </button>
              )}
            </div>
          ) : (
            <section className="systems-list">
              {filteredSystems.map(
                (system, index) => {
                  const expanded =
                    expandedId ===
                    system.id;

                  return (
                    <article
                      className={
                        expanded
                          ? "system-card expanded"
                          : "system-card"
                      }
                      key={system.id}
                    >
                      {/* SYSTEM TOP */}
                      <div className="system-main">
                        <button
                          className="system-expand"
                          onClick={() =>
                            setExpandedId(
                              expanded
                                ? null
                                : system.id
                            )
                          }
                        >
                          <div className="system-number">
                            {String(
                              index + 1
                            ).padStart(
                              2,
                              "0"
                            )}
                          </div>

                          <div className="system-info">
                            <div className="system-title-row">
                              <h2>
                                {system.name}
                              </h2>

                              <span
                                className={
                                  system.isActive
                                    ? "status active"
                                    : "status inactive"
                                }
                              >
                                <i />

                                {system.isActive
                                  ? "Active"
                                  : "Inactive"}
                              </span>
                            </div>

                            <p>
                              {system.description ||
                                "No description added yet."}
                            </p>

                            <div className="system-meta">
                              <span>
                                {system.options.length}{" "}
                                {system.options.length ===
                                1
                                  ? "AR option"
                                  : "AR options"}
                              </span>

                              <span>
                                Order{" "}
                                {system.sortOrder}
                              </span>
                            </div>
                          </div>
                        </button>

                        <div className="system-actions">
                          <button
                            title="Edit system"
                            onClick={() =>
                              openEditSystem(
                                system
                              )
                            }
                          >
                            <Edit3
                              size={15}
                            />
                          </button>

                          <button
                            title="Delete system"
                            className="danger"
                            disabled={
                              deletingId ===
                              system.id
                            }
                            onClick={() =>
                              deleteSystem(
                                system
                              )
                            }
                          >
                            {deletingId ===
                            system.id ? (
                              <Loader2
                                size={15}
                                className="spin"
                              />
                            ) : (
                              <Trash2
                                size={15}
                              />
                            )}
                          </button>

                          <button
                            className={
                              expanded
                                ? "expand-button rotated"
                                : "expand-button"
                            }
                            onClick={() =>
                              setExpandedId(
                                expanded
                                  ? null
                                  : system.id
                              )
                            }
                          >
                            <ChevronDown
                              size={17}
                            />
                          </button>
                        </div>
                      </div>

                      {/* OPTIONS */}
                      {expanded && (
                        <div className="options-area">
                          <div className="options-header">
                            <div>
                              <span>
                                AR VISUAL OPTIONS
                              </span>

                              <h3>
                                Visualization
                                presets
                              </h3>
                            </div>

                            <button
                              className="option-add"
                              onClick={() =>
                                openCreateOption(
                                  system
                                )
                              }
                            >
                              <Plus
                                size={14}
                              />
                              Add option
                            </button>
                          </div>

                          {system.options.length ===
                          0 ? (
                            <div className="no-options">
                              <Eye size={18} />

                              <span>
                                No visual options
                                have been added.
                              </span>
                            </div>
                          ) : (
                            <div className="options-grid">
                              {system.options.map(
                                (
                                  option
                                ) => (
                                  <div
                                    className="option-card"
                                    key={
                                      option.id
                                    }
                                  >
                                    <div className="option-preview">
                                      {option.previewUrl ? (
                                        <img
                                          src={
                                            option.previewUrl
                                          }
                                          alt={
                                            option.name
                                          }
                                        />
                                      ) : (
                                        <div className="preview-placeholder">
                                          <Layers3
                                            size={
                                              22
                                            }
                                          />

                                          <span>
                                            Preview
                                            image
                                          </span>
                                        </div>
                                      )}
                                    </div>

                                    <div className="option-content">
                                      <div>
                                        <span className="option-label">
                                          OPTION{" "}
                                          {String(
                                            option.sortOrder
                                          ).padStart(
                                            2,
                                            "0"
                                          )}
                                        </span>

                                        <h4>
                                          {
                                            option.name
                                          }
                                        </h4>
                                      </div>

                                      <div className="option-details">
                                        <span>
                                          <b>
                                            Colour
                                          </b>

                                          {option.color ||
                                            "Not set"}
                                        </span>

                                        <span>
                                          <b>
                                            Texture
                                          </b>

                                          {option.texture ||
                                            "Not set"}
                                        </span>
                                      </div>

                                      <div className="option-actions">
                                        <button
                                          onClick={() =>
                                            openEditOption(
                                              option
                                            )
                                          }
                                        >
                                          <Edit3
                                            size={
                                              13
                                            }
                                          />
                                          Edit
                                        </button>

                                        <button
                                          className="delete-option"
                                          disabled={
                                            deletingOptionId ===
                                            option.id
                                          }
                                          onClick={() =>
                                            deleteOption(
                                              option
                                            )
                                          }
                                        >
                                          {deletingOptionId ===
                                          option.id ? (
                                            <Loader2
                                              size={
                                                13
                                              }
                                              className="spin"
                                            />
                                          ) : (
                                            <Trash2
                                              size={
                                                13
                                              }
                                            />
                                          )}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </article>
                  );
                }
              )}
            </section>
          )}

          {/* FOOTER */}
          <footer className="page-footer">
            <div>
              <span>
                COLOURPLUS
              </span>

              <p>
                AR Flooring Management
              </p>
            </div>

            <Link href="/">
              VIEW WEBSITE
              <ArrowUpRight size={12} />
            </Link>
          </footer>
        </div>
      </main>

      {/* SYSTEM EDITOR */}
      {systemPanelOpen && (
        <div
          className="panel-overlay"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closePanels();
            }
          }}
        >
          <aside className="editor-panel">
            <div className="panel-header">
              <div>
                <span>
                  {editingSystem
                    ? "EDIT SYSTEM"
                    : "NEW SYSTEM"}
                </span>

                <h2>
                  Flooring system
                </h2>
              </div>

              <button
                className="close-panel"
                onClick={closePanels}
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={
                handleSystemSubmit
              }
              className="editor-form"
            >
              <label>
                <span>
                  System name
                </span>

                <input
                  value={systemForm.name}
                  onChange={(event) =>
                    setSystemForm(
                      (current) => ({
                        ...current,
                        name: event.target
                          .value,
                      })
                    )
                  }
                  placeholder="Epoxy Floor Coatings"
                  required
                />
              </label>

              <label>
                <span>
                  Description
                </span>

                <textarea
                  value={
                    systemForm.description
                  }
                  onChange={(event) =>
                    setSystemForm(
                      (current) => ({
                        ...current,
                        description:
                          event.target
                            .value,
                      })
                    )
                  }
                  placeholder="Short description of the flooring system..."
                  rows={5}
                />
              </label>

              <label>
                <span>
                  System image URL
                </span>

                <input
                  value={systemForm.image}
                  onChange={(event) =>
                    setSystemForm(
                      (current) => ({
                        ...current,
                        image: event.target
                          .value,
                      })
                    )
                  }
                  placeholder="/images/ar/epoxy.jpg"
                />

                <small>
                  Optional image used to
                  represent the flooring
                  system.
                </small>
              </label>

              <div className="form-row">
                <label>
                  <span>
                    Sort order
                  </span>

                  <input
                    type="number"
                    value={
                      systemForm.sortOrder
                    }
                    onChange={(event) =>
                      setSystemForm(
                        (current) => ({
                          ...current,
                          sortOrder:
                            event.target
                              .value,
                        })
                      )
                    }
                  />
                </label>

                <label className="toggle-field">
                  <span>
                    Status
                  </span>

                  <button
                    type="button"
                    className={
                      systemForm.isActive
                        ? "toggle active"
                        : "toggle"
                    }
                    onClick={() =>
                      setSystemForm(
                        (current) => ({
                          ...current,
                          isActive:
                            !current.isActive,
                        })
                      )
                    }
                  >
                    <i />

                    {systemForm.isActive
                      ? "Active"
                      : "Inactive"}
                  </button>
                </label>
              </div>

              <div className="panel-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={
                    closePanels
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Loader2
                        size={15}
                        className="spin"
                      />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check size={15} />

                      {editingSystem
                        ? "Save changes"
                        : "Create system"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </aside>
        </div>
      )}

      {/* OPTION EDITOR */}
      {optionPanelOpen && (
        <div
          className="panel-overlay"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closePanels();
            }
          }}
        >
          <aside className="editor-panel">
            <div className="panel-header">
              <div>
                <span>
                  {editingOption
                    ? "EDIT OPTION"
                    : "NEW AR OPTION"}
                </span>

                <h2>
                  Visual option
                </h2>
              </div>

              <button
                className="close-panel"
                onClick={closePanels}
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={
                handleOptionSubmit
              }
              className="editor-form"
            >
              <label>
                <span>
                  Flooring system
                </span>

                <select
                  value={
                    optionForm.systemId
                  }
                  onChange={(event) =>
                    setOptionForm(
                      (current) => ({
                        ...current,
                        systemId: Number(
                          event.target
                            .value
                        ),
                      })
                    )
                  }
                  required
                >
                  <option value={0}>
                    Select system
                  </option>

                  {systems.map(
                    (system) => (
                      <option
                        key={system.id}
                        value={system.id}
                      >
                        {system.name}
                      </option>
                    )
                  )}
                </select>
              </label>

              <label>
                <span>
                  Option name
                </span>

                <input
                  value={
                    optionForm.name
                  }
                  onChange={(event) =>
                    setOptionForm(
                      (current) => ({
                        ...current,
                        name: event.target
                          .value,
                      })
                    )
                  }
                  placeholder="Matt Grey"
                  required
                />
              </label>

              <label>
                <span>
                  Colour
                </span>

                <input
                  value={
                    optionForm.color
                  }
                  onChange={(event) =>
                    setOptionForm(
                      (current) => ({
                        ...current,
                        color: event.target
                          .value,
                      })
                    )
                  }
                  placeholder="Grey"
                />
              </label>

              <label>
                <span>
                  Texture
                </span>

                <input
                  value={
                    optionForm.texture
                  }
                  onChange={(event) =>
                    setOptionForm(
                      (current) => ({
                        ...current,
                        texture:
                          event.target
                            .value,
                      })
                    )
                  }
                  placeholder="Smooth matt"
                />
              </label>

              <label>
                <span>
                  Preview image URL
                </span>

                <input
                  value={
                    optionForm.previewUrl
                  }
                  onChange={(event) =>
                    setOptionForm(
                      (current) => ({
                        ...current,
                        previewUrl:
                          event.target
                            .value,
                      })
                    )
                  }
                  placeholder="/images/ar/epoxy-grey.jpg"
                />

                <small>
                  Use the URL of the visual
                  asset you want displayed
                  in the AR selector.
                </small>
              </label>

              <label>
                <span>
                  Sort order
                </span>

                <input
                  type="number"
                  value={
                    optionForm.sortOrder
                  }
                  onChange={(event) =>
                    setOptionForm(
                      (current) => ({
                        ...current,
                        sortOrder:
                          event.target
                            .value,
                      })
                    )
                  }
                />
              </label>

              <div className="panel-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={
                    closePanels
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Loader2
                        size={15}
                        className="spin"
                      />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check size={15} />

                      {editingOption
                        ? "Save changes"
                        : "Create option"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </aside>
        </div>
      )}

      {/* TOASTS */}
      {success && (
        <div className="toast success-toast">
          <Check size={16} />
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="toast error-toast">
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

      {/* ========================================================= */}
      {/* COMPLETE PAGE CSS                                         */}
      {/* ========================================================= */}

      <style jsx global>{`

        /* --------------------------------------------------------- */
        /* GLOBAL RESET                                               */
        /* --------------------------------------------------------- */

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          padding: 0;
          background: #f3f1ec;
          color: #172235;
          font-family:
            Arial,
            Helvetica,
            sans-serif;
        }

        button,
        input,
        textarea,
        select {
          font: inherit;
        }

        button {
          border: 0;
        }

        /* --------------------------------------------------------- */
        /* MAIN PAGE                                                   */
        /* --------------------------------------------------------- */

        .ar-admin {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 85% 5%,
              rgba(30, 77, 130, 0.07),
              transparent 28%
            ),
            #f3f1ec;
          padding:
            148px
            32px
            50px;
        }

        .page-shell {
          width: min(
            1380px,
            100%
          );
          margin: 0 auto;
        }

        /* --------------------------------------------------------- */
        /* HEADER                                                      */
        /* --------------------------------------------------------- */

        .page-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 30px;
          margin-bottom: 34px;
        }

        .header-copy {
          max-width: 760px;
        }

        .eyebrow {
          margin-bottom: 13px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: #245184;
          text-transform: uppercase;
        }

        .page-header h1 {
          margin: 0;
          color: #152235;
          font-size: clamp(
            38px,
            5vw,
            64px
          );
          font-weight: 500;
          line-height: 0.98;
          letter-spacing: -0.045em;
        }

        .page-header h1 span {
          display: block;
          color: #245184;
        }

        .page-header p {
          max-width: 620px;
          margin: 18px 0 0;
          color: #687383;
          font-size: 14px;
          line-height: 1.7;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        /* --------------------------------------------------------- */
        /* BUTTONS                                                     */
        /* --------------------------------------------------------- */

        .primary-button,
        .secondary-button {
          min-height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0 18px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition:
            transform 180ms ease,
            box-shadow 180ms ease,
            background 180ms ease,
            color 180ms ease;
        }

        .primary-button {
          background: #174b84;
          color: #ffffff;
          box-shadow:
            0 8px 22px
            rgba(23, 75, 132, 0.16);
        }

        .primary-button:hover {
          background: #123d6d;
          transform: translateY(-2px);
          box-shadow:
            0 12px 28px
            rgba(23, 75, 132, 0.22);
        }

        .secondary-button {
          background: #ffffff;
          color: #314052;
          border: 1px solid #d9d8d3;
        }

        .secondary-button:hover {
          background: #fafafa;
          transform: translateY(-2px);
        }

        .primary-button:disabled,
        .secondary-button:disabled {
          cursor: not-allowed;
          opacity: 0.6;
          transform: none;
        }

        /* --------------------------------------------------------- */
        /* STATS                                                       */
        /* --------------------------------------------------------- */

        .stats-grid {
          display: grid;
          grid-template-columns:
            repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 28px;
        }

        .stat-card {
          min-height: 104px;
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 19px 20px;
          background: rgba(
            255,
            255,
            255,
            0.72
          );
          border: 1px solid #dfded9;
          border-radius: 6px;
          box-shadow:
            0 6px 22px
            rgba(29, 40, 54, 0.035);
          transition:
            transform 200ms ease,
            border-color 200ms ease;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          border-color: #c8d0d9;
        }

        .stat-icon {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background: #edf2f7;
          color: #1d4f83;
          border-radius: 5px;
        }

        .stat-content {
          min-width: 0;
        }

        .stat-content strong {
          display: block;
          color: #162336;
          font-size: 28px;
          font-weight: 500;
          line-height: 1;
          letter-spacing: -0.04em;
        }

        .stat-content span {
          display: block;
          margin-top: 7px;
          color: #788391;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* --------------------------------------------------------- */
        /* TOOLBAR                                                     */
        /* --------------------------------------------------------- */

        .toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 14px;
          margin-bottom: 28px;
          background: #ffffff;
          border: 1px solid #deddd8;
          border-radius: 6px;
          box-shadow:
            0 5px 20px
            rgba(30, 40, 50, 0.025);
        }

        .search-box {
          height: 44px;
          width: min(
            480px,
            100%
          );
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 13px;
          background: #f6f5f2;
          border: 1px solid #e2e0db;
          border-radius: 4px;
          color: #7d8793;
        }

        .search-box:focus-within {
          border-color: #8ca6c2;
          background: #ffffff;
          box-shadow:
            0 0 0 3px
            rgba(34, 82, 133, 0.07);
        }

        .search-box input {
          width: 100%;
          min-width: 0;
          border: 0;
          outline: 0;
          background: transparent;
          color: #172235;
          font-size: 13px;
        }

        .search-box input::placeholder {
          color: #9ba2aa;
        }

        .clear-search {
          width: 25px;
          height: 25px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background: transparent;
          color: #8a929c;
          cursor: pointer;
          border-radius: 50%;
        }

        .clear-search:hover {
          background: #e8e7e3;
          color: #263446;
        }

        .filters {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px;
          background: #f3f2ef;
          border-radius: 5px;
        }

        .filter {
          min-width: 72px;
          height: 34px;
          padding: 0 13px;
          background: transparent;
          color: #78828e;
          border-radius: 4px;
          cursor: pointer;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition:
            background 180ms ease,
            color 180ms ease,
            box-shadow 180ms ease;
        }

        .filter:hover {
          color: #203147;
        }

        .filter.active {
          background: #ffffff;
          color: #194a7f;
          box-shadow:
            0 2px 8px
            rgba(30, 45, 60, 0.08);
        }

        /* --------------------------------------------------------- */
        /* RESULTS HEADER                                              */
        /* --------------------------------------------------------- */

        .results-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
          padding-bottom: 13px;
          border-bottom: 1px solid #d8d7d2;
        }

        .results-title {
          display: flex;
          align-items: center;
          gap: 11px;
        }

        .results-title span {
          color: #7d8791;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.15em;
        }

        .results-title strong {
          min-width: 25px;
          height: 25px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #174b84;
          color: #ffffff;
          border-radius: 50%;
          font-size: 10px;
        }

        .results-header p {
          margin: 0;
          color: #8a929c;
          font-size: 11px;
        }

        /* --------------------------------------------------------- */
        /* SYSTEM LIST                                                 */
        /* --------------------------------------------------------- */

        .systems-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 12px;
        }

        .system-card {
          overflow: hidden;
          background: #ffffff;
          border: 1px solid #deddd8;
          border-radius: 6px;
          box-shadow:
            0 5px 18px
            rgba(25, 36, 50, 0.025);
          transition:
            border-color 200ms ease,
            box-shadow 200ms ease,
            transform 200ms ease;
        }

        .system-card:hover {
          border-color: #cbd3dc;
          box-shadow:
            0 9px 28px
            rgba(25, 36, 50, 0.055);
        }

        .system-card.expanded {
          border-color: #9fb4ca;
          box-shadow:
            0 12px 35px
            rgba(25, 36, 50, 0.075);
        }

        /* --------------------------------------------------------- */
        /* SYSTEM MAIN                                                 */
        /* --------------------------------------------------------- */

        .system-main {
          min-height: 126px;
          display: flex;
          align-items: stretch;
        }

        .system-expand {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 24px;
          min-width: 0;
          padding: 22px 24px;
          background: transparent;
          color: inherit;
          text-align: left;
          cursor: pointer;
        }

        .system-number {
          width: 46px;
          flex-shrink: 0;
          color: #a5adb6;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
        }

        .system-info {
          min-width: 0;
          flex: 1;
        }

        .system-title-row {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .system-title-row h2 {
          margin: 0;
          color: #172438;
          font-size: 20px;
          font-weight: 500;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }

        .status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
          padding: 5px 8px;
          border-radius: 3px;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .status i {
          width: 5px;
          height: 5px;
          display: block;
          border-radius: 50%;
        }

        .status.active {
          background: #edf7f1;
          color: #28704d;
        }

        .status.active i {
          background: #3c9b6d;
        }

        .status.inactive {
          background: #f2f2f1;
          color: #777d84;
        }

        .status.inactive i {
          background: #9a9da0;
        }

        .system-info > p {
          max-width: 720px;
          margin: 9px 0 0;
          color: #7a8490;
          font-size: 12px;
          line-height: 1.55;
        }

        .system-meta {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-top: 13px;
        }

        .system-meta span {
          position: relative;
          color: #a0a7ae;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .system-meta span + span::before {
          content: "";
          position: absolute;
          left: -10px;
          top: 50%;
          width: 3px;
          height: 3px;
          transform: translateY(-50%);
          background: #b7bbc0;
          border-radius: 50%;
        }

        /* --------------------------------------------------------- */
        /* SYSTEM ACTIONS                                              */
        /* --------------------------------------------------------- */

        .system-actions {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 0 18px;
          border-left: 1px solid #ecebe8;
        }

        .system-actions > button {
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f5f4f1;
          color: #66717d;
          border: 1px solid #e5e3df;
          border-radius: 4px;
          cursor: pointer;
          transition:
            background 160ms ease,
            color 160ms ease,
            border-color 160ms ease,
            transform 160ms ease;
        }

        .system-actions > button:hover {
          background: #eaf0f5;
          color: #1d4e82;
          border-color: #cbd7e3;
          transform: translateY(-1px);
        }

        .system-actions > button.danger:hover {
          background: #fff1f1;
          color: #b54444;
          border-color: #efcccc;
        }

        .system-actions .expand-button {
          background: #174b84;
          color: #ffffff;
          border-color: #174b84;
        }

        .system-actions .expand-button:hover {
          background: #123d6d;
          color: #ffffff;
          border-color: #123d6d;
        }

        .system-actions .expand-button.rotated svg {
          transform: rotate(180deg);
        }

        .system-actions .expand-button svg {
          transition: transform 220ms ease;
        }

        /* --------------------------------------------------------- */
        /* OPTIONS AREA                                                */
        /* --------------------------------------------------------- */

        .options-area {
          padding: 28px;
          background:
            linear-gradient(
              180deg,
              #f7f7f5 0%,
              #f1f2f1 100%
            );
          border-top: 1px solid #e2e1dd;
          animation: optionReveal 260ms ease both;
        }

        @keyframes optionReveal {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .options-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 20px;
        }

        .options-header > div > span {
          color: #7890a6;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.17em;
        }

        .options-header h3 {
          margin: 5px 0 0;
          color: #233144;
          font-size: 17px;
          font-weight: 500;
          letter-spacing: -0.02em;
        }

        .option-add {
          height: 36px;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 0 13px;
          background: #ffffff;
          color: #1d4d80;
          border: 1px solid #cfd8e1;
          border-radius: 4px;
          cursor: pointer;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition:
            background 180ms ease,
            transform 180ms ease,
            border-color 180ms ease;
        }

        .option-add:hover {
          background: #edf3f8;
          border-color: #b8c9d9;
          transform: translateY(-1px);
        }

        /* --------------------------------------------------------- */
        /* OPTIONS GRID                                                */
        /* --------------------------------------------------------- */

        .options-grid {
          display: grid;
          grid-template-columns:
            repeat(3, minmax(0, 1fr));
          gap: 12px;
        }

        .option-card {
          min-width: 0;
          overflow: hidden;
          display: flex;
          background: #ffffff;
          border: 1px solid #deded9;
          border-radius: 5px;
          transition:
            transform 180ms ease,
            box-shadow 180ms ease,
            border-color 180ms ease;
        }

        .option-card:hover {
          transform: translateY(-2px);
          border-color: #c8d3dd;
          box-shadow:
            0 9px 22px
            rgba(29, 42, 56, 0.07);
        }

        .option-preview {
          width: 108px;
          min-height: 160px;
          flex-shrink: 0;
          overflow: hidden;
          background:
            linear-gradient(
              135deg,
              #e4e4e0,
              #c9c9c4
            );
        }

        .option-preview img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }

        .preview-placeholder {
          width: 100%;
          height: 100%;
          min-height: 160px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 9px;
          color: #92999f;
          background:
            linear-gradient(
              135deg,
              #deded9,
              #c9c9c3
            );
        }

        .preview-placeholder span {
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .option-content {
          min-width: 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 16px;
        }

        .option-label {
          color: #8b98a6;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.14em;
        }

        .option-content h4 {
          margin: 6px 0 0;
          color: #243246;
          font-size: 14px;
          font-weight: 600;
          line-height: 1.35;
        }

        .option-details {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 16px;
        }

        .option-details span {
          display: flex;
          flex-direction: column;
          gap: 2px;
          color: #6e7985;
          font-size: 10px;
          line-height: 1.35;
        }

        .option-details b {
          color: #a1a7ad;
          font-size: 7px;
          font-weight: 700;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        .option-actions {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-top: auto;
          padding-top: 15px;
        }

        .option-actions button {
          height: 30px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 0 9px;
          background: #f4f4f1;
          color: #586573;
          border: 1px solid #e1e0dc;
          border-radius: 3px;
          cursor: pointer;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .option-actions button:hover {
          background: #eaf0f5;
          color: #1e4f83;
        }

        .option-actions .delete-option {
          width: 30px;
          padding: 0;
          color: #9b6969;
        }

        .option-actions .delete-option:hover {
          background: #fff0f0;
          color: #b13e3e;
          border-color: #ebcccc;
        }

        .option-actions button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* --------------------------------------------------------- */
        /* NO OPTIONS                                                  */
        /* --------------------------------------------------------- */

        .no-options {
          min-height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: #ffffff;
          border: 1px dashed #d2d4d2;
          border-radius: 5px;
          color: #9098a0;
          font-size: 11px;
        }

        /* --------------------------------------------------------- */
        /* LOADING / EMPTY                                             */
        /* --------------------------------------------------------- */

        .loading-state {
          min-height: 320px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 11px;
          color: #6f7a86;
          font-size: 12px;
        }

        .empty-state {
          min-height: 340px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px;
          margin-top: 12px;
          background: #ffffff;
          border: 1px solid #deddd8;
          border-radius: 6px;
          text-align: center;
        }

        .empty-icon {
          width: 58px;
          height: 58px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 15px;
          background: #edf2f7;
          color: #1c4d80;
          border-radius: 50%;
        }

        .empty-state h3 {
          margin: 0;
          color: #263448;
          font-size: 18px;
          font-weight: 500;
        }

        .empty-state p {
          margin: 9px 0 20px;
          color: #87909a;
          font-size: 12px;
        }

        /* --------------------------------------------------------- */
        /* FOOTER                                                      */
        /* --------------------------------------------------------- */

        .page-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-top: 45px;
          padding-top: 22px;
          border-top: 1px solid #d7d6d1;
        }

        .page-footer > div {
          display: flex;
          align-items: baseline;
          gap: 12px;
        }

        .page-footer > div > span {
          color: #214f7e;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.16em;
        }

        .page-footer p {
          margin: 0;
          color: #8b9299;
          font-size: 10px;
        }

        .page-footer a {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: #4e5965;
          text-decoration: none;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.12em;
        }

        .page-footer a:hover {
          color: #174b84;
        }

        /* --------------------------------------------------------- */
        /* EDITOR OVERLAY                                              */
        /* --------------------------------------------------------- */

        .panel-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          justify-content: flex-end;
          background:
            rgba(
              12,
              22,
              34,
              0.42
            );
          backdrop-filter: blur(5px);
          animation: overlayIn 180ms ease both;
        }

        @keyframes overlayIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        .editor-panel {
          width: min(
            520px,
            100%
          );
          height: 100%;
          overflow-y: auto;
          padding: 30px;
          background: #f7f6f2;
          border-left: 1px solid
            rgba(255, 255, 255, 0.25);
          box-shadow:
            -20px 0 55px
            rgba(8, 19, 32, 0.16);
          animation: panelIn 260ms
            cubic-bezier(
              0.2,
              0.8,
              0.2,
              1
            )
            both;
        }

        @keyframes panelIn {
          from {
            transform: translateX(100%);
          }

          to {
            transform: translateX(0);
          }
        }

        .panel-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          padding-bottom: 24px;
          margin-bottom: 26px;
          border-bottom: 1px solid #dad9d4;
        }

        .panel-header span {
          color: #6d88a1;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.16em;
        }

        .panel-header h2 {
          margin: 6px 0 0;
          color: #182638;
          font-size: 26px;
          font-weight: 500;
          letter-spacing: -0.035em;
        }

        .close-panel {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background: #ffffff;
          color: #63707d;
          border: 1px solid #deddd8;
          border-radius: 4px;
          cursor: pointer;
          transition:
            background 160ms ease,
            color 160ms ease,
            transform 160ms ease;
        }

        .close-panel:hover {
          background: #edf2f7;
          color: #174b84;
          transform: rotate(4deg);
        }

        /* --------------------------------------------------------- */
        /* EDITOR FORM                                                 */
        /* --------------------------------------------------------- */

        .editor-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .editor-form > label,
        .form-row > label {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .editor-form label > span {
          color: #52606e;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.11em;
          text-transform: uppercase;
        }

        .editor-form input,
        .editor-form textarea,
        .editor-form select {
          width: 100%;
          padding: 12px 13px;
          background: #ffffff;
          color: #1b293b;
          border: 1px solid #d8d7d2;
          border-radius: 4px;
          outline: none;
          font-size: 12px;
          transition:
            border-color 160ms ease,
            box-shadow 160ms ease;
        }

        .editor-form input {
          height: 44px;
        }

        .editor-form textarea {
          min-height: 110px;
          resize: vertical;
          line-height: 1.55;
        }

        .editor-form select {
          height: 44px;
          cursor: pointer;
        }

        .editor-form input:focus,
        .editor-form textarea:focus,
        .editor-form select:focus {
          border-color: #7899b8;
          box-shadow:
            0 0 0 3px
            rgba(
              35,
              79,
              127,
              0.08
            );
        }

        .editor-form input::placeholder,
        .editor-form textarea::placeholder {
          color: #a3a8ad;
        }

        .editor-form small {
          color: #92999f;
          font-size: 9px;
          line-height: 1.5;
        }

        .form-row {
          display: grid;
          grid-template-columns:
            1fr 1fr;
          gap: 14px;
        }

        .toggle-field {
          min-width: 0;
        }

        .toggle {
          height: 44px;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 0 13px;
          background: #eeeeeb;
          color: #747d86;
          border: 1px solid #dbdad5;
          border-radius: 4px;
          cursor: pointer;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .toggle i {
          width: 8px;
          height: 8px;
          display: block;
          background: #999e9f;
          border-radius: 50%;
        }

        .toggle.active {
          background: #edf7f1;
          color: #28704d;
          border-color: #cfe4d8;
        }

        .toggle.active i {
          background: #359467;
        }

        .panel-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
          padding-top: 8px;
          margin-top: 4px;
          border-top: 1px solid #deddd8;
        }

        .cancel-button {
          min-height: 44px;
          padding: 0 18px;
          background: #ffffff;
          color: #5d6874;
          border: 1px solid #d7d6d1;
          border-radius: 4px;
          cursor: pointer;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .cancel-button:hover {
          background: #f0efec;
        }

        /* --------------------------------------------------------- */
        /* TOASTS                                                      */
        /* --------------------------------------------------------- */

        .toast {
          position: fixed;
          right: 25px;
          bottom: 25px;
          z-index: 10001;
          min-width: 280px;
          max-width: 430px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 13px 15px;
          background: #ffffff;
          border-radius: 5px;
          box-shadow:
            0 15px 40px
            rgba(16, 27, 40, 0.15);
          font-size: 11px;
          font-weight: 600;
          animation: toastIn 250ms
            cubic-bezier(
              0.2,
              0.8,
              0.2,
              1
            )
            both;
        }

        @keyframes toastIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .success-toast {
          color: #28704d;
          border: 1px solid #cce2d5;
        }

        .error-toast {
          color: #a83d3d;
          border: 1px solid #ebcccc;
        }

        .error-toast span {
          flex: 1;
        }

        .error-toast > button {
          width: 25px;
          height: 25px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          color: #9c6262;
          cursor: pointer;
          border-radius: 3px;
        }

        .error-toast > button:hover {
          background: #fff0f0;
        }

        /* --------------------------------------------------------- */
        /* LOADER                                                      */
        /* --------------------------------------------------------- */

        .spin {
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* --------------------------------------------------------- */
        /* RESPONSIVE                                                   */
        /* --------------------------------------------------------- */

        @media (max-width: 1100px) {
          .ar-admin {
            padding-left: 22px;
            padding-right: 22px;
          }

          .stats-grid {
            grid-template-columns:
              repeat(2, 1fr);
          }

          .options-grid {
            grid-template-columns:
              repeat(2, 1fr);
          }
        }

        @media (max-width: 800px) {
          .ar-admin {
            padding:
              125px
              16px
              35px;
          }

          .page-header {
            align-items: flex-start;
            flex-direction: column;
            gap: 20px;
          }

          .header-actions {
            width: 100%;
          }

          .header-actions button {
            flex: 1;
          }

          .toolbar {
            align-items: stretch;
            flex-direction: column;
          }

          .search-box {
            width: 100%;
          }

          .filters {
            width: 100%;
          }

          .filter {
            flex: 1;
          }

          .results-header {
            align-items: flex-start;
            flex-direction: column;
            gap: 8px;
          }

          .system-main {
            align-items: stretch;
          }

          .system-expand {
            gap: 12px;
            padding: 18px;
          }

          .system-number {
            width: 28px;
          }

          .system-title-row {
            align-items: flex-start;
            flex-direction: column;
            gap: 7px;
          }

          .system-title-row h2 {
            font-size: 17px;
          }

          .system-actions {
            flex-direction: column;
            justify-content: center;
            padding:
              12px
              10px;
          }

          .options-area {
            padding: 20px;
          }

          .options-grid {
            grid-template-columns: 1fr;
          }

          .page-footer {
            align-items: flex-start;
            flex-direction: column;
          }

          .page-footer > div {
            align-items: flex-start;
            flex-direction: column;
            gap: 5px;
          }
        }

        @media (max-width: 560px) {
          .ar-admin {
            padding:
              110px
              12px
              25px;
          }

          .page-header h1 {
            font-size: 38px;
          }

          .page-header p {
            font-size: 12px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .stat-card {
            min-height: 88px;
          }

          .system-main {
            flex-direction: column;
          }

          .system-expand {
            min-height: 150px;
          }

          .system-actions {
            flex-direction: row;
            justify-content: flex-end;
            padding:
              10px
              14px;
            border-top: 1px solid #ecebe8;
            border-left: 0;
          }

          .options-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .option-add {
            width: 100%;
          }

          .option-card {
            flex-direction: column;
          }

          .option-preview {
            width: 100%;
            height: 150px;
            min-height: 150px;
          }

          .preview-placeholder {
            min-height: 150px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .editor-panel {
            padding: 22px 17px;
          }

          .panel-actions {
            flex-direction: column-reverse;
          }

          .panel-actions button {
            width: 100%;
          }

          .toast {
            right: 12px;
            bottom: 12px;
            left: 12px;
            min-width: 0;
          }
        }

      `}</style>
    </>
  );
}