"use client";

import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Edit3,
  FolderKanban,
  Image as ImageIcon,
  MapPin,
  Plus,
  RefreshCw,
  Search,
  Star,
  Trash2,
  X,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useRouter } from "next/navigation";

type ProjectImage = {
  id?: number;
  imageUrl: string;
  altText?: string | null;
  sortOrder?: number;
};

type Project = {
  id: number;
  title: string;
  location?: string | null;
  industry?: string | null;
  description?: string | null;
  image?: string | null;
  category?: string | null;
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
  images: ProjectImage[];
};

type FormState = {
  title: string;
  location: string;
  industry: string;
  category: string;
  description: string;
  image: string;
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: string;
  images: string[];
};

const emptyForm: FormState = {
  title: "",
  location: "",
  industry: "",
  category: "",
  description: "",
  image: "",
  isFeatured: false,
  isActive: true,
  sortOrder: "0",
  images: [""],
};

const industries = [
  "Automotive",
  "Pharmaceutical",
  "Food & Beverage",
  "Healthcare",
  "Warehousing & Logistics",
  "Textile",
  "FMCG",
  "Heavy Engineering",
  "Data Centres",
  "Other",
];

const categories = [
  "Industrial Flooring",
  "Protective Coatings",
  "Waterproofing",
  "Flooring",
  "Coatings",
  "Other",
];

export default function AdminProjectsPage() {
  const router = useRouter();

  const [projects, setProjects] =
    useState<Project[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [industryFilter, setIndustryFilter] =
    useState("ALL");

  const [categoryFilter, setCategoryFilter] =
    useState("ALL");

  const [editorOpen, setEditorOpen] =
    useState(false);

  const [editingProject, setEditingProject] =
    useState<Project | null>(null);

  const [form, setForm] =
    useState<FormState>(emptyForm);

  const [saving, setSaving] =
    useState(false);

  const [deleting, setDeleting] =
    useState<number | null>(null);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  /* =====================================================
     LOAD PROJECTS
  ===================================================== */

  async function loadProjects(
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
        "/api/projects?all=true",
        {
          cache: "no-store",
        }
      );

      if (response.status === 401) {
        router.replace("/admin/login");
        return;
      }

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Could not load projects."
        );
      }

      setProjects(
        Array.isArray(data.projects)
          ? data.projects
          : []
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not load projects."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  /* =====================================================
     STATS
  ===================================================== */

  const stats = useMemo(() => {
    const total = projects.length;

    const active = projects.filter(
      (project) => project.isActive
    ).length;

    const featured = projects.filter(
      (project) => project.isFeatured
    ).length;

    const industriesCount =
      new Set(
        projects
          .map((project) => project.industry)
          .filter(Boolean)
      ).size;

    return {
      total,
      active,
      featured,
      industries: industriesCount,
    };
  }, [projects]);

  /* =====================================================
     FILTERS
  ===================================================== */

  const filteredProjects = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesSearch =
        !query ||
        project.title
          .toLowerCase()
          .includes(query) ||
        project.location
          ?.toLowerCase()
          .includes(query) ||
        project.industry
          ?.toLowerCase()
          .includes(query) ||
        project.category
          ?.toLowerCase()
          .includes(query);

      const matchesIndustry =
        industryFilter === "ALL" ||
        project.industry ===
          industryFilter;

      const matchesCategory =
        categoryFilter === "ALL" ||
        project.category ===
          categoryFilter;

      return (
        matchesSearch &&
        matchesIndustry &&
        matchesCategory
      );
    });
  }, [
    projects,
    search,
    industryFilter,
    categoryFilter,
  ]);

  /* =====================================================
     OPEN CREATE
  ===================================================== */

  function openCreate() {
    setEditingProject(null);
    setForm(emptyForm);
    setError("");
    setSuccess("");
    setEditorOpen(true);
  }

  /* =====================================================
     OPEN EDIT
  ===================================================== */

  function openEdit(project: Project) {
    setEditingProject(project);

    setForm({
      title: project.title || "",
      location: project.location || "",
      industry: project.industry || "",
      category: project.category || "",
      description:
        project.description || "",
      image: project.image || "",
      isFeatured:
        project.isFeatured === true,
      isActive:
        project.isActive !== false,
      sortOrder: String(
        project.sortOrder ?? 0
      ),
      images:
        project.images?.length
          ? project.images.map(
              (item) => item.imageUrl
            )
          : [""],
    });

    setError("");
    setSuccess("");
    setEditorOpen(true);
  }

  /* =====================================================
     CLOSE EDITOR
  ===================================================== */

  function closeEditor() {
    if (saving) return;

    setEditorOpen(false);
    setEditingProject(null);
    setForm(emptyForm);
    setError("");
  }

  /* =====================================================
     FORM HELPERS
  ===================================================== */

  function updateField(
    field: keyof FormState,
    value:
      | string
      | boolean
      | string[]
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function updateImage(
    index: number,
    value: string
  ) {
    setForm((current) => {
      const images = [
        ...current.images,
      ];

      images[index] = value;

      return {
        ...current,
        images,
      };
    });
  }

  function addImageField() {
    setForm((current) => ({
      ...current,
      images: [
        ...current.images,
        "",
      ],
    }));
  }

  function removeImageField(
    index: number
  ) {
    setForm((current) => {
      const images =
        current.images.filter(
          (_, imageIndex) =>
            imageIndex !== index
        );

      return {
        ...current,
        images:
          images.length > 0
            ? images
            : [""],
      };
    });
  }

  /* =====================================================
     SAVE
  ===================================================== */

  async function handleSave(
    event: React.FormEvent
  ) {
    event.preventDefault();

    if (!form.title.trim()) {
      setError(
        "Project title is required."
      );
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const images =
        form.images
          .map((image) =>
            image.trim()
          )
          .filter(Boolean)
          .map((imageUrl) => ({
            imageUrl,
            altText:
              form.title.trim(),
          }));

      const payload = {
        title: form.title.trim(),
        location:
          form.location.trim(),
        industry:
          form.industry.trim(),
        category:
          form.category.trim(),
        description:
          form.description.trim(),
        image:
          form.image.trim(),
        isFeatured:
          form.isFeatured,
        isActive:
          form.isActive,
        sortOrder:
          Number(form.sortOrder) || 0,
        images,
      };

      const url = editingProject
        ? `/api/projects/${editingProject.id}`
        : "/api/projects";

      const method = editingProject
        ? "PATCH"
        : "POST";

      const response = await fetch(
        url,
        {
          method,
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            payload
          ),
        }
      );

      if (response.status === 401) {
        router.replace(
          "/admin/login"
        );
        return;
      }

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Could not save project."
        );
      }

      setSuccess(
        editingProject
          ? "Project updated successfully."
          : "Project created successfully."
      );

      await loadProjects(true);

      setTimeout(() => {
        setEditorOpen(false);
        setEditingProject(null);
        setForm(emptyForm);
        setSuccess("");
      }, 650);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not save project."
      );
    } finally {
      setSaving(false);
    }
  }

  /* =====================================================
     DELETE
  ===================================================== */

  async function handleDelete(
    project: Project
  ) {
    const confirmed =
      window.confirm(
        `Delete "${project.title}"? This will also remove its gallery images.`
      );

    if (!confirmed) return;

    try {
      setDeleting(project.id);
      setError("");

      const response =
        await fetch(
          `/api/projects/${project.id}`,
          {
            method: "DELETE",
          }
        );

      if (response.status === 401) {
        router.replace(
          "/admin/login"
        );
        return;
      }

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Could not delete project."
        );
      }

      setProjects(
        (current) =>
          current.filter(
            (item) =>
              item.id !== project.id
          )
      );

      if (
        editingProject?.id ===
        project.id
      ) {
        closeEditor();
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not delete project."
      );
    } finally {
      setDeleting(null);
    }
  }

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <main className="projects-admin">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="admin-header">
        <div className="header-left">
          <button
            className="back-button"
            onClick={() =>
              router.push("/admin")
            }
            type="button"
          >
            <ArrowLeft size={17} />
            <span>Dashboard</span>
          </button>

          <div className="header-divider" />

          <div>
            <div className="eyebrow">
              COLOURPLUS / CONTENT
            </div>

            <h1>
              Project
              <span>Management.</span>
            </h1>
          </div>
        </div>

        <div className="header-actions">
          <button
            className="refresh-button"
            onClick={() =>
              loadProjects(true)
            }
            disabled={refreshing}
            type="button"
          >
            <RefreshCw
              size={16}
              className={
                refreshing
                  ? "spin"
                  : ""
              }
            />
            Refresh
          </button>

          <button
            className="add-button"
            onClick={openCreate}
            type="button"
          >
            <Plus size={17} />
            Add Project
            <ArrowUpRight size={17} />
          </button>
        </div>
      </header>

      {/* =================================================
          STATS
      ================================================= */}

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FolderKanban size={19} />
          </div>

          <div>
            <span>Total Projects</span>
            <strong>
              {stats.total}
            </strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Check size={19} />
          </div>

          <div>
            <span>Active</span>
            <strong>
              {stats.active}
            </strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Star size={19} />
          </div>

          <div>
            <span>Featured</span>
            <strong>
              {stats.featured}
            </strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <MapPin size={19} />
          </div>

          <div>
            <span>Industries</span>
            <strong>
              {stats.industries}
            </strong>
          </div>
        </div>
      </section>

      {/* =================================================
          TOOLBAR
      ================================================= */}

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
            placeholder="Search projects, locations, industries..."
          />

          {search && (
            <button
              type="button"
              onClick={() =>
                setSearch("")
              }
            >
              <X size={15} />
            </button>
          )}
        </div>

        <select
          value={industryFilter}
          onChange={(event) =>
            setIndustryFilter(
              event.target.value
            )
          }
        >
          <option value="ALL">
            All Industries
          </option>

          {industries.map(
            (industry) => (
              <option
                key={industry}
                value={industry}
              >
                {industry}
              </option>
            )
          )}
        </select>

        <select
          value={categoryFilter}
          onChange={(event) =>
            setCategoryFilter(
              event.target.value
            )
          }
        >
          <option value="ALL">
            All Categories
          </option>

          {categories.map(
            (category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            )
          )}
        </select>

        <div className="result-count">
          {filteredProjects.length}{" "}
          projects
        </div>
      </section>

      {/* =================================================
          ERROR / SUCCESS
      ================================================= */}

      {error && (
        <div className="message error">
          <X size={15} />
          {error}
        </div>
      )}

      {success && (
        <div className="message success">
          <Check size={15} />
          {success}
        </div>
      )}

      {/* =================================================
          PROJECT GRID
      ================================================= */}

      <section className="projects-section">
        {loading ? (
          <div className="loading-state">
            <RefreshCw
              size={22}
              className="spin"
            />
            <span>
              Loading projects...
            </span>
          </div>
        ) : filteredProjects.length ===
          0 ? (
          <div className="empty-state">
            <FolderKanban
              size={34}
            />

            <h2>
              No projects found
            </h2>

            <p>
              Add your first project
              or change the filters.
            </p>

            <button
              type="button"
              onClick={openCreate}
            >
              <Plus size={16} />
              Add Project
            </button>
          </div>
        ) : (
          <div className="project-grid">
            {filteredProjects.map(
              (
                project,
                index
              ) => (
                <article
                  className="project-card"
                  key={project.id}
                  style={{
                    animationDelay: `${index * 45}ms`,
                  }}
                >
                  <div className="project-image">
                    {project.image ? (
                      <img
                        src={
                          project.image
                        }
                        alt={
                          project.title
                        }
                      />
                    ) : (
                      <div className="image-placeholder">
                        <ImageIcon
                          size={30}
                        />
                        <span>
                          No main image
                        </span>
                      </div>
                    )}

                    <div className="image-overlay" />

                    <div className="card-top">
                      <span
                        className={
                          project.isActive
                            ? "status active"
                            : "status inactive"
                        }
                      >
                        <i />
                        {project.isActive
                          ? "ACTIVE"
                          : "INACTIVE"}
                      </span>

                      {project.isFeatured && (
                        <span className="featured">
                          <Star
                            size={12}
                            fill="currentColor"
                          />
                          FEATURED
                        </span>
                      )}
                    </div>

                    <div className="project-number">
                      {String(
                        index + 1
                      ).padStart(
                        2,
                        "0"
                      )}
                    </div>
                  </div>

                  <div className="project-content">
                    <div className="project-meta">
                      <span>
                        {project.category ||
                          "PROJECT"}
                      </span>

                      {project.industry && (
                        <span>
                          {project.industry}
                        </span>
                      )}
                    </div>

                    <h2>
                      {project.title}
                    </h2>

                    {project.location && (
                      <div className="location">
                        <MapPin
                          size={13}
                        />
                        {
                          project.location
                        }
                      </div>
                    )}

                    {project.description && (
                      <p>
                        {
                          project.description
                        }
                      </p>
                    )}

                    <div className="card-bottom">
                      <div className="gallery-count">
                        <ImageIcon
                          size={14}
                        />

                        {
                          project
                            .images
                            ?.length ||
                          0
                        }{" "}
                        gallery{" "}
                        {project
                            .images
                            ?.length ===
                          1
                          ? "image"
                          : "images"}
                      </div>

                      <div className="card-actions">
                        <button
                          type="button"
                          className="edit-button"
                          onClick={() =>
                            openEdit(
                              project
                            )
                          }
                        >
                          <Edit3
                            size={15}
                          />
                          Edit
                        </button>

                        <button
                          type="button"
                          className="delete-button"
                          onClick={() =>
                            handleDelete(
                              project
                            )
                          }
                          disabled={
                            deleting ===
                            project.id
                          }
                        >
                          {deleting ===
                          project.id ? (
                            <RefreshCw
                              size={15}
                              className="spin"
                            />
                          ) : (
                            <Trash2
                              size={15}
                            />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              )
            )}
          </div>
        )}
      </section>

      {/* =================================================
          EDITOR OVERLAY
      ================================================= */}

      {editorOpen && (
        <div
          className="editor-backdrop"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeEditor();
            }
          }}
        >
          <aside className="editor-panel">
            <div className="editor-header">
              <div>
                <div className="eyebrow">
                  {editingProject
                    ? "EDIT PROJECT"
                    : "NEW PROJECT"}
                </div>

                <h2>
                  {editingProject
                    ? "Project"
                    : "Add Project"}
                  <span>
                    {editingProject
                      ? "Details."
                      : "Details."}
                  </span>
                </h2>
              </div>

              <button
                type="button"
                className="close-editor"
                onClick={
                  closeEditor
                }
                disabled={saving}
              >
                <X size={19} />
              </button>
            </div>

            <form
              className="editor-form"
              onSubmit={
                handleSave
              }
            >
              {/* BASIC */}

              <div className="form-section">
                <div className="form-section-title">
                  01 / BASIC INFORMATION
                </div>

                <label>
                  Project title
                  <input
                    value={
                      form.title
                    }
                    onChange={(
                      event
                    ) =>
                      updateField(
                        "title",
                        event
                          .target
                          .value
                      )
                    }
                    placeholder="e.g. Industrial Flooring — Pharma Facility"
                    required
                  />
                </label>

                <div className="two-columns">
                  <label>
                    Location
                    <input
                      value={
                        form.location
                      }
                      onChange={(
                        event
                      ) =>
                        updateField(
                          "location",
                          event
                            .target
                            .value
                        )
                      }
                      placeholder="City, State"
                    />
                  </label>

                  <label>
                    Industry
                    <select
                      value={
                        form.industry
                      }
                      onChange={(
                        event
                      ) =>
                        updateField(
                          "industry",
                          event
                            .target
                            .value
                        )
                      }
                    >
                      <option value="">
                        Select industry
                      </option>

                      {industries.map(
                        (
                          industry
                        ) => (
                          <option
                            key={
                              industry
                            }
                            value={
                              industry
                            }
                          >
                            {
                              industry
                            }
                          </option>
                        )
                      )}
                    </select>
                  </label>
                </div>

                <div className="two-columns">
                  <label>
                    Category
                    <select
                      value={
                        form.category
                      }
                      onChange={(
                        event
                      ) =>
                        updateField(
                          "category",
                          event
                            .target
                            .value
                        )
                      }
                    >
                      <option value="">
                        Select category
                      </option>

                      {categories.map(
                        (
                          category
                        ) => (
                          <option
                            key={
                              category
                            }
                            value={
                              category
                            }
                          >
                            {
                              category
                            }
                          </option>
                        )
                      )}
                    </select>
                  </label>

                  <label>
                    Sort order
                    <input
                      type="number"
                      value={
                        form.sortOrder
                      }
                      onChange={(
                        event
                      ) =>
                        updateField(
                          "sortOrder",
                          event
                            .target
                            .value
                        )
                      }
                    />
                  </label>
                </div>

                <label>
                  Description
                  <textarea
                    value={
                      form.description
                    }
                    onChange={(
                      event
                    ) =>
                      updateField(
                        "description",
                        event
                          .target
                          .value
                      )
                    }
                    placeholder="Short description of the project..."
                    rows={5}
                  />
                </label>
              </div>

              {/* MAIN IMAGE */}

              <div className="form-section">
                <div className="form-section-title">
                  02 / MAIN IMAGE
                </div>

                <label>
                  Main image URL
                  <input
                    value={
                      form.image
                    }
                    onChange={(
                      event
                    ) =>
                      updateField(
                        "image",
                        event
                          .target
                          .value
                      )
                    }
                    placeholder="https://..."
                  />
                </label>

                {form.image && (
                  <div className="image-preview">
                    <img
                      src={
                        form.image
                      }
                      alt="Main project preview"
                    />
                  </div>
                )}
              </div>

              {/* GALLERY */}

              <div className="form-section">
                <div className="gallery-heading">
                  <div>
                    <div className="form-section-title">
                      03 / PROJECT GALLERY
                    </div>

                    <p>
                      Add supporting
                      project images.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="add-image"
                    onClick={
                      addImageField
                    }
                  >
                    <Plus
                      size={14}
                    />
                    Add image
                  </button>
                </div>

                <div className="gallery-fields">
                  {form.images.map(
                    (
                      image,
                      index
                    ) => (
                      <div
                        className="gallery-field"
                        key={
                          index
                        }
                      >
                        <span>
                          {String(
                            index +
                              1
                          ).padStart(
                            2,
                            "0"
                          )}
                        </span>

                        <input
                          value={
                            image
                          }
                          onChange={(
                            event
                          ) =>
                            updateImage(
                              index,
                              event
                                .target
                                .value
                            )
                          }
                          placeholder="Image URL"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            removeImageField(
                              index
                            )
                          }
                        >
                          <X
                            size={15}
                          />
                        </button>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* VISIBILITY */}

              <div className="form-section">
                <div className="form-section-title">
                  04 / VISIBILITY
                </div>

                <div className="toggle-grid">
                  <button
                    type="button"
                    className={
                      form.isActive
                        ? "toggle-card active"
                        : "toggle-card"
                    }
                    onClick={() =>
                      updateField(
                        "isActive",
                        !form.isActive
                      )
                    }
                  >
                    <div className="toggle-icon">
                      <Check
                        size={16}
                      />
                    </div>

                    <div>
                      <strong>
                        Active
                      </strong>

                      <span>
                        Show on website
                      </span>
                    </div>

                    <div className="toggle-switch">
                      <i />
                    </div>
                  </button>

                  <button
                    type="button"
                    className={
                      form.isFeatured
                        ? "toggle-card active"
                        : "toggle-card"
                    }
                    onClick={() =>
                      updateField(
                        "isFeatured",
                        !form.isFeatured
                      )
                    }
                  >
                    <div className="toggle-icon">
                      <Star
                        size={16}
                      />
                    </div>

                    <div>
                      <strong>
                        Featured
                      </strong>

                      <span>
                        Highlight project
                      </span>
                    </div>

                    <div className="toggle-switch">
                      <i />
                    </div>
                  </button>
                </div>
              </div>

              {error && (
                <div className="editor-error">
                  <X size={15} />
                  {error}
                </div>
              )}

              {success && (
                <div className="editor-success">
                  <Check size={15} />
                  {success}
                </div>
              )}

              <div className="editor-footer">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={
                    closeEditor
                  }
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-button"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <RefreshCw
                        size={16}
                        className="spin"
                      />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check
                        size={16}
                      />
                      {editingProject
                        ? "Update Project"
                        : "Create Project"}
                      <ArrowUpRight
                        size={16}
                      />
                    </>
                  )}
                </button>
              </div>
            </form>
          </aside>
        </div>
      )}

      {/* =================================================
          STYLES
      ================================================= */}

      <style jsx>{`
        .projects-admin {
          min-height: 100vh;
          background: #071625;
          color: #fff;
          padding: 34px 42px 70px;
          position: relative;
          overflow-x: hidden;
        }

        .ambient {
          position: fixed;
          pointer-events: none;
          border-radius: 999px;
          filter: blur(90px);
          opacity: 0.18;
        }

        .ambient-one {
          width: 360px;
          height: 360px;
          background: #174b83;
          top: -150px;
          right: 8%;
        }

        .ambient-two {
          width: 280px;
          height: 280px;
          background: #0b3156;
          bottom: 5%;
          left: -120px;
        }

        .admin-header {
          max-width: 1500px;
          margin: 0 auto 34px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 30px;
          position: relative;
          z-index: 2;
        }

        .header-left {
          display: flex;
          align-items: flex-end;
          gap: 25px;
        }

        .back-button,
        .refresh-button,
        .add-button {
          border: 0;
          font: inherit;
          cursor: pointer;
        }

        .back-button {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(
            255,
            255,
            255,
            0.055
          );
          border: 1px solid
            rgba(
              255,
              255,
              255,
              0.1
            );
          color: #aebdca;
          padding: 12px 15px;
          transition: 180ms ease;
        }

        .back-button:hover {
          color: #fff;
          background: rgba(
            255,
            255,
            255,
            0.09
          );
        }

        .header-divider {
          width: 1px;
          height: 64px;
          background: rgba(
            255,
            255,
            255,
            0.1
          );
        }

        .eyebrow {
          color: #7290ab;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.19em;
          margin-bottom: 9px;
        }

        h1 {
          font-size: clamp(
            40px,
            5vw,
            66px
          );
          line-height: 0.88;
          letter-spacing: -0.06em;
          margin: 0;
          font-weight: 800;
        }

        h1 span {
          display: block;
          color: #728aa1;
          font-weight: 350;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .refresh-button {
          min-height: 45px;
          padding: 0 15px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #aebdca;
          background: rgba(
            255,
            255,
            255,
            0.055
          );
          border: 1px solid
            rgba(
              255,
              255,
              255,
              0.1
            );
        }

        .add-button {
          min-height: 45px;
          padding: 0 17px;
          display: flex;
          align-items: center;
          gap: 9px;
          color: #fff;
          background: #174b83;
          font-weight: 750;
          transition:
            transform 180ms ease,
            background 180ms ease;
        }

        .add-button:hover {
          background: #205b99;
          transform: translateY(
            -2px
          );
        }

        .stats-grid {
          max-width: 1500px;
          margin: 0 auto 22px;
          display: grid;
          grid-template-columns: repeat(
            4,
            1fr
          );
          gap: 12px;
          position: relative;
          z-index: 2;
        }

        .stat-card {
          min-height: 108px;
          padding: 18px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          gap: 15px;
          background: rgba(
            255,
            255,
            255,
            0.045
          );
          border: 1px solid
            rgba(
              255,
              255,
              255,
              0.08
            );
          animation: cardIn
            500ms ease both;
        }

        @keyframes cardIn {
          from {
            opacity: 0;
            transform: translateY(
              14px
            );
          }
          to {
            opacity: 1;
            transform: translateY(
              0
            );
          }
        }

        .stat-icon {
          width: 42px;
          height: 42px;
          display: grid;
          place-items: center;
          background: rgba(
            70,
            119,
            164,
            0.13
          );
          color: #8aabc7;
        }

        .stat-card span {
          display: block;
          color: #71859a;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 6px;
        }

        .stat-card strong {
          display: block;
          font-size: 27px;
          letter-spacing: -0.04em;
        }

        .toolbar {
          max-width: 1500px;
          margin: 0 auto 18px;
          display: grid;
          grid-template-columns: minmax(
              300px,
              1fr
            )
            210px 210px auto;
          gap: 10px;
          position: relative;
          z-index: 2;
        }

        .search-box {
          min-height: 46px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 14px;
          box-sizing: border-box;
          background: rgba(
            255,
            255,
            255,
            0.045
          );
          border: 1px solid
            rgba(
              255,
              255,
              255,
              0.09
            );
          color: #7890a5;
        }

        .search-box input {
          min-width: 0;
          flex: 1;
          border: 0;
          outline: 0;
          background: transparent;
          color: #fff;
          font: inherit;
          font-size: 13px;
        }

        .search-box input::placeholder {
          color: #60758a;
        }

        .search-box button {
          border: 0;
          background: transparent;
          color: #74899c;
          cursor: pointer;
        }

        .toolbar select {
          min-height: 46px;
          border: 1px solid
            rgba(
              255,
              255,
              255,
              0.09
            );
          background: #0d2236;
          color: #aabaca;
          padding: 0 13px;
          outline: 0;
          font: inherit;
          font-size: 12px;
        }

        .result-count {
          min-height: 46px;
          padding: 0 15px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          color: #647b91;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .message {
          max-width: 1500px;
          margin: 0 auto 15px;
          padding: 12px 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          position: relative;
          z-index: 2;
        }

        .message.error,
        .editor-error {
          color: #ffb1a7;
          background: rgba(
            170,
            55,
            48,
            0.13
          );
          border: 1px solid
            rgba(
              255,
              120,
              105,
              0.2
            );
        }

        .message.success,
        .editor-success {
          color: #a8d8c0;
          background: rgba(
            50,
            145,
            100,
            0.12
          );
          border: 1px solid
            rgba(
              100,
              200,
              145,
              0.18
            );
        }

        .projects-section {
          max-width: 1500px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .project-grid {
          display: grid;
          grid-template-columns: repeat(
            3,
            minmax(0, 1fr)
          );
          gap: 16px;
        }

        .project-card {
          background: rgba(
            255,
            255,
            255,
            0.045
          );
          border: 1px solid
            rgba(
              255,
              255,
              255,
              0.08
            );
          overflow: hidden;
          animation: projectIn
            550ms ease both;
          transition:
            transform 220ms ease,
            border-color 220ms ease;
        }

        @keyframes projectIn {
          from {
            opacity: 0;
            transform: translateY(
              18px
            );
          }
          to {
            opacity: 1;
            transform: translateY(
              0
            );
          }
        }

        .project-card:hover {
          transform: translateY(
            -4px
          );
          border-color: rgba(
            117,
            157,
            192,
            0.25
          );
        }

        .project-image {
          height: 230px;
          position: relative;
          overflow: hidden;
          background: #0b1d2d;
        }

        .project-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform
            500ms ease;
        }

        .project-card:hover
          .project-image
          img {
          transform: scale(
            1.045
          );
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(
              4,
              14,
              24,
              0.45
            ),
            transparent 45%,
            rgba(
              4,
              14,
              24,
              0.72
            )
          );
        }

        .image-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 9px;
          color: #4f677c;
          font-size: 11px;
        }

        .card-top {
          position: absolute;
          top: 14px;
          left: 14px;
          right: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
        }

        .status,
        .featured {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 8px;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.09em;
          background: rgba(
            5,
            18,
            30,
            0.78
          );
          backdrop-filter: blur(
            8px
          );
        }

        .status {
          color: #91b9d6;
        }

        .status i {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: currentColor;
        }

        .status.inactive {
          color: #8a8990;
        }

        .featured {
          color: #d2b985;
        }

        .project-number {
          position: absolute;
          bottom: 12px;
          right: 14px;
          color: rgba(
            255,
            255,
            255,
            0.52
          );
          font-size: 10px;
          letter-spacing: 0.1em;
        }

        .project-content {
          padding: 18px;
        }

        .project-meta {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          color: #6f879d;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .project-meta span:last-child {
          text-align: right;
        }

        .project-content h2 {
          margin: 0;
          font-size: 21px;
          line-height: 1.05;
          letter-spacing: -0.035em;
        }

        .location {
          margin-top: 10px;
          display: flex;
          align-items: center;
          gap: 6px;
          color: #8397a9;
          font-size: 11px;
        }

        .project-content p {
          color: #778b9e;
          font-size: 12px;
          line-height: 1.55;
          margin: 11px 0 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          border-top: 1px solid
            rgba(
              255,
              255,
              255,
              0.08
            );
          margin-top: 17px;
          padding-top: 13px;
        }

        .gallery-count {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #60788d;
          font-size: 10px;
        }

        .card-actions {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .edit-button,
        .delete-button {
          min-height: 31px;
          border: 1px solid
            rgba(
              255,
              255,
              255,
              0.1
            );
          font: inherit;
          cursor: pointer;
        }

        .edit-button {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 0 10px;
          color: #a9bac9;
          background: rgba(
            255,
            255,
            255,
            0.045
          );
        }

        .delete-button {
          width: 31px;
          display: grid;
          place-items: center;
          color: #a77d79;
          background: rgba(
            170,
            70,
            60,
            0.08
          );
        }

        .delete-button:disabled {
          opacity: 0.5;
        }

        .loading-state,
        .empty-state {
          min-height: 360px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #657c91;
          border: 1px dashed
            rgba(
              255,
              255,
              255,
              0.1
            );
        }

        .loading-state {
          gap: 12px;
          font-size: 12px;
        }

        .empty-state {
          text-align: center;
        }

        .empty-state h2 {
          color: #c7d2dc;
          margin: 17px 0 7px;
          font-size: 22px;
        }

        .empty-state p {
          margin: 0 0 20px;
          font-size: 12px;
        }

        .empty-state button {
          display: flex;
          align-items: center;
          gap: 7px;
          border: 0;
          background: #174b83;
          color: #fff;
          padding: 12px 16px;
          font: inherit;
          font-weight: 700;
          cursor: pointer;
        }

        .spin {
          animation: spin 800ms
            linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(
              360deg
            );
          }
        }

        /* =================================================
           EDITOR
        ================================================= */

        .editor-backdrop {
          position: fixed;
          inset: 0;
          z-index: 100;
          background: rgba(
            1,
            8,
            15,
            0.72
          );
          backdrop-filter: blur(
            8px
          );
          display: flex;
          justify-content: flex-end;
        }

        .editor-panel {
          width: min(
            620px,
            100%
          );
          height: 100%;
          background: #0a1a2a;
          border-left: 1px solid
            rgba(
              255,
              255,
              255,
              0.1
            );
          overflow-y: auto;
          box-shadow: -20px 0 60px
            rgba(
              0,
              0,
              0,
              0.35
            );
          animation: panelIn
            420ms
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
            opacity: 0;
            transform: translateX(
              70px
            );
          }
          to {
            opacity: 1;
            transform: translateX(
              0
            );
          }
        }

        .editor-header {
          position: sticky;
          top: 0;
          z-index: 4;
          display: flex;
          justify-content: space-between;
          gap: 20px;
          padding: 27px 28px;
          background: rgba(
            10,
            26,
            42,
            0.96
          );
          backdrop-filter: blur(
            12px
          );
          border-bottom: 1px solid
            rgba(
              255,
              255,
              255,
              0.08
            );
        }

        .editor-header h2 {
          margin: 0;
          font-size: 33px;
          line-height: 0.95;
          letter-spacing: -0.05em;
        }

        .editor-header h2 span {
          display: block;
          color: #71889e;
          font-weight: 350;
        }

        .close-editor {
          width: 39px;
          height: 39px;
          display: grid;
          place-items: center;
          flex: 0 0 auto;
          border: 1px solid
            rgba(
              255,
              255,
              255,
              0.1
            );
          background: rgba(
            255,
            255,
            255,
            0.04
          );
          color: #9caebe;
          cursor: pointer;
        }

        .editor-form {
          padding: 25px 28px
            35px;
        }

        .form-section {
          padding-bottom: 26px;
          margin-bottom: 26px;
          border-bottom: 1px solid
            rgba(
              255,
              255,
              255,
              0.08
            );
        }

        .form-section-title {
          color: #6f89a0;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.14em;
          margin-bottom: 17px;
        }

        .editor-form label {
          display: block;
          color: #91a4b6;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 750;
          margin-bottom: 15px;
        }

        .editor-form input,
        .editor-form select,
        .editor-form textarea {
          width: 100%;
          box-sizing: border-box;
          margin-top: 7px;
          border: 1px solid
            rgba(
              255,
              255,
              255,
              0.1
            );
          background: rgba(
            255,
            255,
            255,
            0.045
          );
          color: #fff;
          outline: none;
          padding: 12px;
          font: inherit;
          font-size: 12px;
          text-transform: none;
          letter-spacing: 0;
          transition: 180ms ease;
        }

        .editor-form textarea {
          resize: vertical;
          line-height: 1.55;
        }

        .editor-form input:focus,
        .editor-form select:focus,
        .editor-form textarea:focus {
          border-color: #4f789d;
          background: rgba(
            255,
            255,
            255,
            0.065
          );
        }

        .editor-form input::placeholder,
        .editor-form textarea::placeholder {
          color: #526a7e;
        }

        .editor-form select {
          appearance: auto;
        }

        .two-columns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .image-preview {
          margin-top: 5px;
          height: 180px;
          overflow: hidden;
          background: #071625;
          border: 1px solid
            rgba(
              255,
              255,
              255,
              0.08
            );
        }

        .image-preview img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }

        .gallery-heading {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
        }

        .gallery-heading p {
          margin: -8px 0 15px;
          color: #60788d;
          font-size: 11px;
        }

        .add-image {
          display: flex;
          align-items: center;
          gap: 6px;
          border: 1px solid
            rgba(
              255,
              255,
              255,
              0.1
            );
          background: rgba(
            255,
            255,
            255,
            0.045
          );
          color: #9bb1c4;
          padding: 8px 10px;
          font: inherit;
          font-size: 10px;
          cursor: pointer;
          white-space: nowrap;
        }

        .gallery-fields {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .gallery-field {
          display: grid;
          grid-template-columns: 28px 1fr 34px;
          align-items: center;
          gap: 8px;
        }

        .gallery-field > span {
          color: #50687d;
          font-size: 9px;
          text-align: center;
        }

        .gallery-field input {
          margin: 0;
        }

        .gallery-field button {
          width: 34px;
          height: 38px;
          display: grid;
          place-items: center;
          border: 1px solid
            rgba(
              255,
              255,
              255,
              0.1
            );
          background: rgba(
            180,
            70,
            60,
            0.07
          );
          color: #a27d79;
          cursor: pointer;
        }

        .toggle-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .toggle-card {
          min-height: 72px;
          display: grid;
          grid-template-columns: 36px 1fr 30px;
          align-items: center;
          gap: 10px;
          text-align: left;
          padding: 11px;
          border: 1px solid
            rgba(
              255,
              255,
              255,
              0.09
            );
          background: rgba(
            255,
            255,
            255,
            0.035
          );
          color: #8094a7;
          cursor: pointer;
        }

        .toggle-card.active {
          border-color: rgba(
            105,
            157,
            196,
            0.32
          );
          background: rgba(
            56,
            108,
            153,
            0.11
          );
        }

        .toggle-icon {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          background: rgba(
            255,
            255,
            255,
            0.055
          );
          color: #637a90;
        }

        .toggle-card.active
          .toggle-icon {
          color: #9ac0dd;
          background: rgba(
            80,
            139,
            183,
            0.16
          );
        }

        .toggle-card strong {
          display: block;
          color: #b8c6d2;
          font-size: 11px;
          margin-bottom: 3px;
        }

        .toggle-card span {
          color: #61788c;
          font-size: 9px;
        }

        .toggle-switch {
          width: 27px;
          height: 15px;
          padding: 2px;
          border-radius: 20px;
          background: #23394c;
          box-sizing: border-box;
        }

        .toggle-switch i {
          display: block;
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background: #63798c;
          transition: 180ms ease;
        }

        .toggle-card.active
          .toggle-switch {
          background: #245d8e;
        }

        .toggle-card.active
          .toggle-switch
          i {
          background: #d6e5f1;
          transform: translateX(
            12px
          );
        }

        .editor-error,
        .editor-success {
          padding: 11px 13px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          margin-bottom: 15px;
        }

        .editor-footer {
          display: flex;
          gap: 10px;
          padding-top: 5px;
        }

        .cancel-button,
        .save-button {
          min-height: 48px;
          border: 0;
          font: inherit;
          cursor: pointer;
        }

        .cancel-button {
          padding: 0 18px;
          background: rgba(
            255,
            255,
            255,
            0.05
          );
          border: 1px solid
            rgba(
              255,
              255,
              255,
              0.1
            );
          color: #8fa3b5;
        }

        .save-button {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #174b83;
          color: #fff;
          font-weight: 750;
          padding: 0 15px;
        }

        .save-button:hover:not(
            :disabled
          ) {
          background: #205b99;
        }

        .save-button:disabled,
        .cancel-button:disabled {
          opacity: 0.55;
          cursor: default;
        }

        @media (max-width: 1150px) {
          .projects-admin {
            padding: 28px 25px
              60px;
          }

          .project-grid {
            grid-template-columns: repeat(
              2,
              minmax(0, 1fr)
            );
          }

          .toolbar {
            grid-template-columns: 1fr 180px 180px;
          }

          .result-count {
            display: none;
          }
        }

        @media (max-width: 800px) {
          .admin-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .header-left {
            align-items: flex-start;
          }

          .header-divider {
            display: none;
          }

          .stats-grid {
            grid-template-columns: 1fr 1fr;
          }

          .toolbar {
            grid-template-columns: 1fr 1fr;
          }

          .search-box {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 620px) {
          .projects-admin {
            padding: 20px 15px
              45px;
          }

          .header-left {
            width: 100%;
            flex-direction: column;
            gap: 18px;
          }

          .header-actions {
            width: 100%;
          }

          .refresh-button,
          .add-button {
            flex: 1;
            justify-content: center;
          }

          h1 {
            font-size: 44px;
          }

          .stats-grid {
            grid-template-columns: 1fr 1fr;
          }

          .stat-card {
            min-height: 92px;
            padding: 13px;
          }

          .stat-icon {
            display: none;
          }

          .toolbar {
            grid-template-columns: 1fr;
          }

          .project-grid {
            grid-template-columns: 1fr;
          }

          .project-image {
            height: 220px;
          }

          .two-columns,
          .toggle-grid {
            grid-template-columns: 1fr;
          }

          .editor-header,
          .editor-form {
            padding-left: 19px;
            padding-right: 19px;
          }

          .editor-header h2 {
            font-size: 29px;
          }

          .gallery-heading {
            flex-direction: column;
            gap: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .project-card,
          .stat-card,
          .editor-panel {
            animation: none;
          }

          .project-card:hover {
            transform: none;
          }

          .project-image img {
            transition: none;
          }
        }
      `}</style>
    </main>
  );
}