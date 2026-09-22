"use client";

import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronDown,
  Edit3,
  Package,
  Plus,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  number: number;
  name: string;
  family: string;
  short?: string | null;
  description?: string | null;
  image?: string | null;
  tag?: string | null;
  isActive: boolean;
  sortOrder: number;
  benefits: {
    id?: number;
    text: string;
    sortOrder?: number;
  }[];
};

type ProductForm = {
  number: string;
  name: string;
  family: string;
  short: string;
  description: string;
  image: string;
  tag: string;
  isActive: boolean;
  sortOrder: string;
  benefits: string[];
};

const EMPTY_FORM: ProductForm = {
  number: "",
  name: "",
  family: "",
  short: "",
  description: "",
  image: "",
  tag: "",
  isActive: true,
  sortOrder: "0",
  benefits: ["", "", "", "", ""],
};

const FAMILY_OPTIONS = [
  "Epoxy",
  "Polyurethane",
  "Performance",
  "Protection",
  "Waterproofing",
  "Surface Infrastructure",
];

export default function AdminProductsPage() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const [search, setSearch] = useState("");
  const [familyFilter, setFamilyFilter] = useState("ALL");
  const [activeOnly, setActiveOnly] = useState(false);

  const [editorOpen, setEditorOpen] = useState(false);
  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  const [form, setForm] = useState<ProductForm>(EMPTY_FORM);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadProducts() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/products?all=true", {
        cache: "no-store",
      });

      if (response.status === 401) {
        router.replace("/admin/login");
        return;
      }

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Could not load products."
        );
      }

      setProducts(data.products || []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not load products."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const families = useMemo(() => {
    const values = Array.from(
      new Set(
        products
          .map((product) => product.family)
          .filter(Boolean)
      )
    );

    return values;
  }, [products]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.family.toLowerCase().includes(query) ||
        String(product.number).includes(query) ||
        product.short?.toLowerCase().includes(query);

      const matchesFamily =
        familyFilter === "ALL" ||
        product.family === familyFilter;

      const matchesActive =
        !activeOnly || product.isActive;

      return (
        matchesSearch &&
        matchesFamily &&
        matchesActive
      );
    });
  }, [
    products,
    search,
    familyFilter,
    activeOnly,
  ]);

  const totalProducts = products.length;

  const activeProducts = products.filter(
    (product) => product.isActive
  ).length;

  const inactiveProducts =
    totalProducts - activeProducts;

  function openCreate() {
    setEditingProduct(null);

    const nextNumber =
      products.length > 0
        ? Math.max(
            ...products.map((p) => p.number)
          ) + 1
        : 1;

    setForm({
      ...EMPTY_FORM,
      number: String(nextNumber),
      sortOrder: String(nextNumber),
    });

    setError("");
    setSuccess("");
    setEditorOpen(true);
  }

  function openEdit(product: Product) {
    setEditingProduct(product);

    const benefits = product.benefits
      .sort(
        (a, b) =>
          (a.sortOrder ?? 0) -
          (b.sortOrder ?? 0)
      )
      .map((benefit) => benefit.text);

    while (benefits.length < 5) {
      benefits.push("");
    }

    setForm({
      number: String(product.number),
      name: product.name,
      family: product.family,
      short: product.short || "",
      description: product.description || "",
      image: product.image || "",
      tag: product.tag || "",
      isActive: product.isActive,
      sortOrder: String(product.sortOrder ?? 0),
      benefits: benefits.slice(0, 5),
    });

    setError("");
    setSuccess("");
    setEditorOpen(true);
  }

  function updateForm(
    field: keyof ProductForm,
    value: string | boolean
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function updateBenefit(
    index: number,
    value: string
  ) {
    setForm((current) => {
      const benefits = [...current.benefits];
      benefits[index] = value;

      return {
        ...current,
        benefits,
      };
    });
  }

  async function saveProduct() {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      if (!form.name.trim()) {
        throw new Error(
          "Product name is required."
        );
      }

      if (!form.family.trim()) {
        throw new Error(
          "Product family is required."
        );
      }

      if (!form.number.trim()) {
        throw new Error(
          "Product number is required."
        );
      }

      const benefits = form.benefits
        .map((benefit) => benefit.trim())
        .filter(Boolean);

      if (benefits.length === 0) {
        throw new Error(
          "Add at least one product benefit."
        );
      }

      const payload = {
        number: Number(form.number),
        name: form.name.trim(),
        family: form.family.trim(),
        short: form.short.trim() || null,
        description:
          form.description.trim() || null,
        image: form.image.trim() || null,
        tag: form.tag.trim() || null,
        isActive: form.isActive,
        sortOrder:
          Number(form.sortOrder) || 0,
        benefits,
      };

      const url = editingProduct
        ? `/api/products/${editingProduct.id}`
        : "/api/products";

      const method = editingProduct
        ? "PATCH"
        : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 401) {
        router.replace("/admin/login");
        return;
      }

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Could not save the product."
        );
      }

      setSuccess(
        editingProduct
          ? "Product updated successfully."
          : "Product created successfully."
      );

      await loadProducts();

      setTimeout(() => {
        setEditorOpen(false);
        setSuccess("");
      }, 700);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not save product."
      );
    } finally {
      setSaving(false);
    }
  }

  async function deleteProduct() {
    if (!editingProduct) {
      return;
    }

    const confirmed = window.confirm(
      `Delete "${editingProduct.name}"?`
    );

    if (!confirmed) {
      return;
    }

    setDeleting(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `/api/products/${editingProduct.id}`,
        {
          method: "DELETE",
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
            "Could not delete product."
        );
      }

      setSuccess("Product deleted.");

      await loadProducts();

      setTimeout(() => {
        setEditorOpen(false);
        setSuccess("");
      }, 500);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not delete product."
      );
    } finally {
      setDeleting(false);
    }
  }

  async function handleLogout() {
    setLoggingOut(true);

    try {
      await fetch("/api/admin/logout", {
        method: "POST",
      });
    } finally {
      router.replace("/admin/login");
      router.refresh();
    }
  }

  return (
    <main className="products-page">
      <div className="background-grid" />

      <header className="products-header">
        <div className="header-left">
          <button
            className="back-button"
            onClick={() => router.push("/admin")}
          >
            <ArrowLeft size={17} />
            Dashboard
          </button>

          <div className="header-title">
            <div className="eyebrow">
              COLOURPLUS / PRODUCT CONTROL
            </div>

            <h1>
              Product
              <span>Management.</span>
            </h1>
          </div>
        </div>

        <div className="header-actions">
          <button
            className="refresh-button"
            onClick={loadProducts}
            disabled={loading}
          >
            <RefreshCw
              size={16}
              className={
                loading ? "spin" : ""
              }
            />
            Refresh
          </button>

          <button
            className="logout-button"
            onClick={handleLogout}
            disabled={loggingOut}
          >
            {loggingOut
              ? "Logging out..."
              : "Logout"}
          </button>
        </div>
      </header>

      <section className="stats-row">
        <div className="stat-card">
          <div className="stat-icon">
            <Package size={18} />
          </div>

          <div>
            <span>Total products</span>
            <strong>{totalProducts}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-number active">
            01
          </div>

          <div>
            <span>Active</span>
            <strong>{activeProducts}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-number inactive">
            02
          </div>

          <div>
            <span>Inactive</span>
            <strong>{inactiveProducts}</strong>
          </div>
        </div>

        <button
          className="add-product"
          onClick={openCreate}
        >
          <Plus size={19} />
          <span>Add product</span>
          <ArrowUpRight size={18} />
        </button>
      </section>

      <section className="control-bar">
        <div className="search-box">
          <Search size={17} />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="clear-search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="filter-control">
          <SlidersHorizontal size={15} />

          <select
            value={familyFilter}
            onChange={(event) =>
              setFamilyFilter(
                event.target.value
              )
            }
          >
            <option value="ALL">
              All families
            </option>

            {families.map((family) => (
              <option
                key={family}
                value={family}
              >
                {family}
              </option>
            ))}
          </select>

          <ChevronDown size={14} />
        </div>

        <button
          className={`active-filter ${
            activeOnly ? "selected" : ""
          }`}
          onClick={() =>
            setActiveOnly((current) => !current)
          }
        >
          <span
            className={`toggle-dot ${
              activeOnly ? "on" : ""
            }`}
          />

          Active only
        </button>

        <div className="result-count">
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1
            ? "product"
            : "products"}
        </div>
      </section>

      {error && (
        <div className="message error">
          <X size={16} />
          {error}
        </div>
      )}

      {success && (
        <div className="message success">
          <Check size={16} />
          {success}
        </div>
      )}

      <section className="products-area">
        {loading ? (
          <div className="loading-state">
            <RefreshCw
              size={24}
              className="spin"
            />

            <span>
              Loading product systems...
            </span>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="empty-state">
            <Package size={35} />

            <h2>No products found.</h2>

            <p>
              Try changing the search or filter.
            </p>

            <button
              onClick={openCreate}
              className="empty-add"
            >
              <Plus size={16} />
              Add product
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map(
              (product, index) => (
                <article
                  className="product-card"
                  key={product.id}
                  style={{
                    animationDelay: `${
                      index * 45
                    }ms`,
                  }}
                >
                  <div className="card-top">
                    <span className="product-number">
                      {String(
                        product.number
                      ).padStart(2, "0")}
                    </span>

                    <span
                      className={`status ${
                        product.isActive
                          ? "active"
                          : "inactive"
                      }`}
                    >
                      <span />
                      {product.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </div>

                  <div className="product-visual">
                    <div className="visual-grid" />

                    <div className="visual-ring ring-one" />
                    <div className="visual-ring ring-two" />

                    <Package
                      size={46}
                      strokeWidth={1.1}
                    />

                    {product.tag && (
                      <span className="visual-tag">
                        {product.tag}
                      </span>
                    )}
                  </div>

                  <div className="card-content">
                    <div className="family-label">
                      {product.family}
                    </div>

                    <h2>{product.name}</h2>

                    {product.short && (
                      <p>{product.short}</p>
                    )}

                    <div className="benefit-preview">
                      {product.benefits.map(
                        (benefit) => (
                          <span
                            key={
                              benefit.id ??
                              benefit.text
                            }
                          >
                            <Check size={12} />
                            {benefit.text}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <div className="card-footer">
                    <span>
                      {
                        product.benefits
                          .length
                      }{" "}
                      benefits
                    </span>

                    <button
                      onClick={() =>
                        openEdit(product)
                      }
                    >
                      Edit
                      <Edit3 size={14} />
                    </button>
                  </div>
                </article>
              )
            )}
          </div>
        )}
      </section>

      {editorOpen && (
        <div
          className="editor-overlay"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setEditorOpen(false);
            }
          }}
        >
          <aside className="editor-panel">
            <div className="editor-header">
              <div>
                <div className="eyebrow">
                  {editingProduct
                    ? "EDIT PRODUCT"
                    : "NEW PRODUCT"}
                </div>

                <h2>
                  {editingProduct
                    ? "Product details."
                    : "Add a product."}
                </h2>
              </div>

              <button
                className="close-editor"
                onClick={() =>
                  setEditorOpen(false)
                }
              >
                <X size={19} />
              </button>
            </div>

            <div className="editor-body">
              <div className="form-section">
                <div className="section-label">
                  BASIC INFORMATION
                </div>

                <div className="form-grid two">
                  <div className="field">
                    <label>
                      Product number
                    </label>

                    <input
                      type="number"
                      value={form.number}
                      onChange={(event) =>
                        updateForm(
                          "number",
                          event.target.value
                        )
                      }
                    />
                  </div>

                  <div className="field">
                    <label>Sort order</label>

                    <input
                      type="number"
                      value={form.sortOrder}
                      onChange={(event) =>
                        updateForm(
                          "sortOrder",
                          event.target.value
                        )
                      }
                    />
                  </div>
                </div>

                <div className="field">
                  <label>
                    Product name
                  </label>

                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) =>
                      updateForm(
                        "name",
                        event.target.value
                      )
                    }
                    placeholder="Product name"
                  />
                </div>

                <div className="form-grid two">
                  <div className="field">
                    <label>Family</label>

                    <div className="select-wrap">
                      <select
                        value={form.family}
                        onChange={(event) =>
                          updateForm(
                            "family",
                            event.target.value
                          )
                        }
                      >
                        <option value="">
                          Select family
                        </option>

                        {FAMILY_OPTIONS.map(
                          (family) => (
                            <option
                              key={family}
                              value={family}
                            >
                              {family}
                            </option>
                          )
                        )}
                      </select>

                      <ChevronDown
                        size={15}
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label>Tag</label>

                    <input
                      type="text"
                      value={form.tag}
                      onChange={(event) =>
                        updateForm(
                          "tag",
                          event.target.value
                        )
                      }
                      placeholder="Optional tag"
                    />
                  </div>
                </div>

                <div className="field">
                  <label>
                    Short description
                  </label>

                  <input
                    type="text"
                    value={form.short}
                    onChange={(event) =>
                      updateForm(
                        "short",
                        event.target.value
                      )
                    }
                    placeholder="Short product summary"
                  />
                </div>

                <div className="field">
                  <label>
                    Full description
                  </label>

                  <textarea
                    value={form.description}
                    onChange={(event) =>
                      updateForm(
                        "description",
                        event.target.value
                      )
                    }
                    placeholder="Describe the product..."
                    rows={5}
                  />
                </div>

                <div className="field">
                  <label>Image URL</label>

                  <input
                    type="text"
                    value={form.image}
                    onChange={(event) =>
                      updateForm(
                        "image",
                        event.target.value
                      )
                    }
                    placeholder="/images/products/product.jpg"
                  />
                </div>
              </div>

              <div className="form-section">
                <div className="section-label">
                  KEY BENEFITS
                </div>

                <div className="benefits-editor">
                  {form.benefits.map(
                    (benefit, index) => (
                      <div
                        className="benefit-field"
                        key={index}
                      >
                        <span>
                          {String(
                            index + 1
                          ).padStart(2, "0")}
                        </span>

                        <input
                          type="text"
                          value={benefit}
                          onChange={(event) =>
                            updateBenefit(
                              index,
                              event.target.value
                            )
                          }
                          placeholder={`Benefit ${
                            index + 1
                          }`}
                        />
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="form-section">
                <div className="section-label">
                  VISIBILITY
                </div>

                <button
                  className={`visibility-toggle ${
                    form.isActive
                      ? "enabled"
                      : ""
                  }`}
                  onClick={() =>
                    updateForm(
                      "isActive",
                      !form.isActive
                    )
                  }
                >
                  <div className="toggle-track">
                    <div className="toggle-thumb" />
                  </div>

                  <div>
                    <strong>
                      {form.isActive
                        ? "Product is active"
                        : "Product is inactive"}
                    </strong>

                    <span>
                      {form.isActive
                        ? "Visible on the public website."
                        : "Hidden from the public website."}
                    </span>
                  </div>
                </button>
              </div>
            </div>

            <div className="editor-footer">
              {editingProduct && (
                <button
                  className="delete-button"
                  onClick={deleteProduct}
                  disabled={
                    deleting || saving
                  }
                >
                  <Trash2 size={16} />

                  {deleting
                    ? "Deleting..."
                    : "Delete"}
                </button>
              )}

              <button
                className="cancel-button"
                onClick={() =>
                  setEditorOpen(false)
                }
              >
                Cancel
              </button>

              <button
                className="save-button"
                onClick={saveProduct}
                disabled={
                  saving || deleting
                }
              >
                {saving
                  ? "Saving..."
                  : editingProduct
                  ? "Save changes"
                  : "Create product"}

                {!saving && (
                  <ArrowUpRight
                    size={17}
                  />
                )}
              </button>
            </div>
          </aside>
        </div>
      )}

      <style jsx>{`
        .products-page {
          min-height: 100vh;
          background: #071625;
          color: #ffffff;
          padding: 42px 46px 80px;
          position: relative;
          overflow-x: hidden;
        }

        .background-grid {
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: 0.045;
          background-image:
            linear-gradient(
              rgba(255, 255, 255, 0.5) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.5) 1px,
              transparent 1px
            );
          background-size: 80px 80px;
          mask-image: radial-gradient(
            circle at 50% 30%,
            black,
            transparent 75%
          );
        }

        .products-header {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 30px;
          margin-bottom: 45px;
          animation: headerIn 600ms ease both;
        }

        @keyframes headerIn {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .header-left {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .back-button {
          width: fit-content;
          display: flex;
          align-items: center;
          gap: 8px;
          border: 0;
          background: transparent;
          color: #7890a5;
          padding: 0;
          font: inherit;
          font-size: 12px;
          cursor: pointer;
          transition: color 180ms ease;
        }

        .back-button:hover {
          color: #ffffff;
        }

        .eyebrow {
          color: #71899e;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.18em;
          margin-bottom: 12px;
        }

        h1 {
          margin: 0;
          font-size: clamp(48px, 6vw, 78px);
          line-height: 0.88;
          letter-spacing: -0.065em;
          font-weight: 800;
        }

        h1 span {
          display: block;
          color: #6d859a;
          font-weight: 350;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .refresh-button,
        .logout-button {
          height: 42px;
          padding: 0 15px;
          display: flex;
          align-items: center;
          gap: 8px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.045);
          color: #b4c1cd;
          font: inherit;
          font-size: 11px;
          cursor: pointer;
          transition:
            background 180ms ease,
            border-color 180ms ease,
            color 180ms ease;
        }

        .refresh-button:hover,
        .logout-button:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
          color: white;
        }

        .logout-button {
          color: #d8a29c;
        }

        .spin {
          animation: spin 800ms linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .stats-row {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns:
            minmax(180px, 1fr)
            minmax(160px, 0.8fr)
            minmax(160px, 0.8fr)
            minmax(220px, 1.2fr);
          gap: 12px;
          margin-bottom: 16px;
        }

        .stat-card {
          min-height: 92px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          background: rgba(255, 255, 255, 0.035);
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 0 20px;
        }

        .stat-icon {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #7897b2;
        }

        .stat-card span {
          display: block;
          color: #71879a;
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.11em;
          margin-bottom: 7px;
        }

        .stat-card strong {
          display: block;
          font-size: 27px;
          line-height: 1;
          font-weight: 700;
        }

        .stat-number {
          font-size: 10px;
          color: #72899d;
          letter-spacing: 0.12em;
        }

        .stat-number.active {
          color: #7fa48c;
        }

        .stat-number.inactive {
          color: #9d7f7f;
        }

        .add-product {
          border: 0;
          background: #174b83;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 0 22px;
          font: inherit;
          font-size: 12px;
          font-weight: 750;
          cursor: pointer;
          transition:
            background 180ms ease,
            transform 180ms ease;
        }

        .add-product:hover {
          background: #205d9d;
          transform: translateY(-2px);
        }

        .add-product span {
          margin: 0;
          color: white;
          font-size: 12px;
          text-transform: none;
          letter-spacing: 0;
        }

        .control-bar {
          position: relative;
          z-index: 2;
          min-height: 58px;
          display: flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 28px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 14px;
        }

        .search-box {
          height: 42px;
          min-width: 280px;
          flex: 1;
          max-width: 470px;
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.035);
          color: #71899d;
          padding: 0 13px;
        }

        .search-box input {
          min-width: 0;
          flex: 1;
          border: 0;
          outline: 0;
          background: transparent;
          color: white;
          font: inherit;
          font-size: 12px;
        }

        .search-box input::placeholder {
          color: #63798c;
        }

        .clear-search {
          border: 0;
          background: transparent;
          color: #71899d;
          cursor: pointer;
          display: grid;
          place-items: center;
        }

        .filter-control {
          height: 42px;
          min-width: 190px;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #71899d;
          position: relative;
        }

        .filter-control select {
          appearance: none;
          border: 0;
          outline: 0;
          background: transparent;
          color: #b8c4ce;
          flex: 1;
          font: inherit;
          font-size: 11px;
          cursor: pointer;
        }

        .filter-control option,
        .select-wrap option {
          background: #102337;
          color: white;
        }

        .active-filter {
          height: 42px;
          display: flex;
          align-items: center;
          gap: 9px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: transparent;
          color: #778da0;
          padding: 0 13px;
          font: inherit;
          font-size: 11px;
          cursor: pointer;
        }

        .active-filter.selected {
          border-color: rgba(117, 156, 131, 0.45);
          color: #b6cbbb;
        }

        .toggle-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #586c7d;
        }

        .toggle-dot.on {
          background: #81aa90;
          box-shadow: 0 0 12px rgba(129, 170, 144, 0.7);
        }

        .result-count {
          margin-left: auto;
          color: #61778a;
          font-size: 10px;
          white-space: nowrap;
        }

        .message {
          position: relative;
          z-index: 3;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 12px 14px;
          margin-bottom: 15px;
          font-size: 11px;
        }

        .message.error {
          border: 1px solid rgba(210, 110, 100, 0.25);
          background: rgba(180, 70, 60, 0.1);
          color: #e6a59d;
        }

        .message.success {
          border: 1px solid rgba(100, 160, 125, 0.25);
          background: rgba(70, 130, 90, 0.1);
          color: #a9c8b0;
        }

        .products-area {
          position: relative;
          z-index: 2;
        }

        .product-grid {
          display: grid;
          grid-template-columns:
            repeat(4, minmax(0, 1fr));
          gap: 14px;
        }

        .product-card {
          min-width: 0;
          border: 1px solid rgba(255, 255, 255, 0.09);
          background: rgba(255, 255, 255, 0.035);
          overflow: hidden;
          opacity: 0;
          animation: cardIn 500ms ease forwards;
          transition:
            border-color 220ms ease,
            transform 220ms ease,
            background 220ms ease;
        }

        @keyframes cardIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .product-card:hover {
          border-color: rgba(119, 153, 180, 0.35);
          transform: translateY(-4px);
          background: rgba(255, 255, 255, 0.05);
        }

        .card-top {
          height: 48px;
          padding: 0 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }

        .product-number {
          color: #6c8295;
          font-size: 10px;
          letter-spacing: 0.14em;
          font-weight: 800;
        }

        .status {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 8px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .status > span {
          width: 5px;
          height: 5px;
          border-radius: 50%;
        }

        .status.active {
          color: #8eaf99;
        }

        .status.active > span {
          background: #80a68b;
        }

        .status.inactive {
          color: #a08080;
        }

        .status.inactive > span {
          background: #9a7474;
        }

        .product-visual {
          height: 170px;
          position: relative;
          display: grid;
          place-items: center;
          overflow: hidden;
          color: #56758f;
          background:
            radial-gradient(
              circle at center,
              rgba(51, 94, 130, 0.22),
              transparent 50%
            ),
            #0a1c2d;
        }

        .visual-grid {
          position: absolute;
          inset: 0;
          opacity: 0.14;
          background-image:
            linear-gradient(
              rgba(150, 180, 205, 0.5) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(150, 180, 205, 0.5) 1px,
              transparent 1px
            );
          background-size: 28px 28px;
          transform: perspective(300px)
            rotateX(55deg)
            translateY(35px)
            scale(1.4);
        }

        .visual-ring {
          position: absolute;
          border: 1px solid rgba(111, 151, 181, 0.18);
          border-radius: 50%;
          animation: visualFloat 5s ease-in-out infinite;
        }

        .ring-one {
          width: 130px;
          height: 130px;
        }

        .ring-two {
          width: 210px;
          height: 210px;
          animation-delay: -1.5s;
        }

        @keyframes visualFloat {
          0%,
          100% {
            transform: translateY(0)
              rotate(0deg);
          }

          50% {
            transform: translateY(-7px)
              rotate(8deg);
          }
        }

        .visual-tag {
          position: absolute;
          right: 10px;
          top: 10px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(5, 17, 28, 0.7);
          color: #8198ab;
          padding: 5px 7px;
          font-size: 7px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .card-content {
          padding: 18px 15px 15px;
        }

        .family-label {
          color: #7290a8;
          font-size: 8px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 9px;
        }

        .card-content h2 {
          margin: 0;
          min-height: 39px;
          font-size: 16px;
          line-height: 1.18;
          letter-spacing: -0.025em;
        }

        .card-content p {
          color: #74899a;
          font-size: 10px;
          line-height: 1.5;
          margin: 8px 0 0;
          min-height: 30px;
        }

        .benefit-preview {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-top: 15px;
        }

        .benefit-preview span {
          display: flex;
          align-items: flex-start;
          gap: 6px;
          color: #869aaa;
          font-size: 9px;
          line-height: 1.35;
        }

        .benefit-preview svg {
          flex: 0 0 auto;
          color: #7294ad;
          margin-top: 1px;
        }

        .card-footer {
          min-height: 46px;
          padding: 0 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .card-footer > span {
          color: #5f7588;
          font-size: 9px;
        }

        .card-footer button {
          border: 0;
          background: transparent;
          color: #91aabd;
          display: flex;
          align-items: center;
          gap: 6px;
          font: inherit;
          font-size: 10px;
          cursor: pointer;
          transition: color 180ms ease;
        }

        .card-footer button:hover {
          color: white;
        }

        .loading-state,
        .empty-state {
          min-height: 400px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #71879a;
          text-align: center;
        }

        .loading-state {
          gap: 12px;
        }

        .empty-state svg {
          color: #54738d;
          margin-bottom: 10px;
        }

        .empty-state h2 {
          margin: 0;
          color: white;
          font-size: 20px;
        }

        .empty-state p {
          margin: 8px 0 20px;
          font-size: 11px;
        }

        .empty-add {
          border: 0;
          background: #174b83;
          color: white;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 11px 16px;
          font: inherit;
          font-size: 11px;
          cursor: pointer;
        }

        .editor-overlay {
          position: fixed;
          z-index: 100;
          inset: 0;
          background: rgba(2, 8, 14, 0.65);
          backdrop-filter: blur(8px);
          display: flex;
          justify-content: flex-end;
          animation: overlayIn 220ms ease both;
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
          width: min(600px, 94vw);
          height: 100%;
          background: #0b1b2b;
          border-left: 1px solid rgba(255, 255, 255, 0.12);
          display: flex;
          flex-direction: column;
          animation: panelIn 380ms
            cubic-bezier(0.22, 1, 0.36, 1)
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

        .editor-header {
          min-height: 105px;
          padding: 27px 28px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .editor-header h2 {
          margin: 0;
          font-size: 27px;
          letter-spacing: -0.04em;
        }

        .close-editor {
          width: 38px;
          height: 38px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: transparent;
          color: #8095a7;
          display: grid;
          place-items: center;
          cursor: pointer;
        }

        .editor-body {
          flex: 1;
          overflow-y: auto;
          padding: 27px 28px 35px;
        }

        .form-section {
          padding-bottom: 28px;
          margin-bottom: 27px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }

        .form-section:last-child {
          border-bottom: 0;
        }

        .section-label {
          color: #678097;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.16em;
          margin-bottom: 17px;
        }

        .form-grid {
          display: grid;
          gap: 12px;
        }

        .form-grid.two {
          grid-template-columns: 1fr 1fr;
        }

        .field {
          margin-bottom: 14px;
        }

        .field label {
          display: block;
          color: #7f94a5;
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.09em;
          font-weight: 750;
          margin-bottom: 7px;
        }

        .field input,
        .field textarea,
        .select-wrap {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid rgba(255, 255, 255, 0.11);
          background: rgba(255, 255, 255, 0.035);
          color: white;
          padding: 12px;
          outline: none;
          font: inherit;
          font-size: 11px;
          transition:
            border-color 180ms ease,
            background 180ms ease;
        }

        .field textarea {
          resize: vertical;
          min-height: 110px;
          line-height: 1.55;
        }

        .field input::placeholder,
        .field textarea::placeholder {
          color: #506577;
        }

        .field input:focus,
        .field textarea:focus,
        .select-wrap:focus-within {
          border-color: #547b9c;
          background: rgba(255, 255, 255, 0.055);
        }

        .select-wrap {
          display: flex;
          align-items: center;
        }

        .select-wrap select {
          appearance: none;
          flex: 1;
          border: 0;
          outline: 0;
          background: transparent;
          color: white;
          font: inherit;
          font-size: 11px;
        }

        .benefits-editor {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .benefit-field {
          display: grid;
          grid-template-columns: 30px 1fr;
          align-items: center;
          gap: 9px;
        }

        .benefit-field > span {
          color: #56728a;
          font-size: 9px;
          letter-spacing: 0.08em;
        }

        .benefit-field input {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.035);
          color: white;
          padding: 11px;
          outline: none;
          font: inherit;
          font-size: 10px;
        }

        .visibility-toggle {
          width: 100%;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.035);
          color: white;
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 13px;
          text-align: left;
          cursor: pointer;
        }

        .toggle-track {
          width: 38px;
          height: 21px;
          border-radius: 20px;
          background: #334555;
          padding: 2px;
          transition: background 180ms ease;
          flex: 0 0 auto;
        }

        .visibility-toggle.enabled
          .toggle-track {
          background: #3e6f57;
        }

        .toggle-thumb {
          width: 17px;
          height: 17px;
          border-radius: 50%;
          background: #b4c0c9;
          transition: transform 180ms ease;
        }

        .visibility-toggle.enabled
          .toggle-thumb {
          transform: translateX(17px);
        }

        .visibility-toggle strong {
          display: block;
          font-size: 11px;
          margin-bottom: 4px;
        }

        .visibility-toggle span:not(
            .toggle-thumb
          ) {
          display: block;
          color: #71889a;
          font-size: 9px;
        }

        .editor-footer {
          min-height: 78px;
          padding: 15px 22px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 8px;
        }

        .cancel-button,
        .delete-button,
        .save-button {
          height: 43px;
          padding: 0 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 1px solid rgba(255, 255, 255, 0.11);
          font: inherit;
          font-size: 10px;
          cursor: pointer;
        }

        .cancel-button {
          background: transparent;
          color: #8194a5;
        }

        .delete-button {
          margin-right: auto;
          background: transparent;
          color: #c48780;
          border-color: rgba(190, 100, 90, 0.2);
        }

        .save-button {
          min-width: 140px;
          background: #174b83;
          color: white;
          border-color: transparent;
          font-weight: 750;
        }

        .save-button:hover:not(
            :disabled
          ) {
          background: #205d9d;
        }

        .save-button:disabled,
        .delete-button:disabled,
        .refresh-button:disabled,
        .logout-button:disabled {
          opacity: 0.5;
          cursor: default;
        }

        @media (max-width: 1250px) {
          .product-grid {
            grid-template-columns:
              repeat(3, minmax(0, 1fr));
          }

          .stats-row {
            grid-template-columns:
              repeat(3, 1fr);
          }

          .add-product {
            min-height: 92px;
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 900px) {
          .products-page {
            padding: 30px 22px 60px;
          }

          .products-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .header-actions {
            width: 100%;
          }

          .refresh-button,
          .logout-button {
            flex: 1;
          }

          .stats-row {
            grid-template-columns:
              1fr 1fr;
          }

          .add-product {
            grid-column: 1 / -1;
          }

          .control-bar {
            flex-wrap: wrap;
          }

          .search-box {
            min-width: 100%;
            max-width: none;
          }

          .result-count {
            margin-left: 0;
          }

          .product-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 600px) {
          .products-page {
            padding: 25px 15px 50px;
          }

          h1 {
            font-size: 48px;
          }

          .stats-row {
            grid-template-columns: 1fr;
          }

          .add-product {
            min-height: 58px;
          }

          .filter-control,
          .active-filter {
            flex: 1;
            min-width: 0;
          }

          .product-grid {
            grid-template-columns: 1fr;
          }

          .form-grid.two {
            grid-template-columns: 1fr;
          }

          .editor-panel {
            width: 100%;
          }

          .editor-header {
            padding: 22px 18px;
          }

          .editor-body {
            padding: 22px 18px;
          }

          .editor-footer {
            padding: 12px;
          }

          .delete-button {
            margin-right: 0;
          }

          .editor-footer {
            flex-wrap: wrap;
          }

          .save-button {
            flex: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
}
