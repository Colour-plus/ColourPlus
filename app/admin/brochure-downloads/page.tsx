"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Download,
  Loader2,
  RefreshCw,
  Smartphone,
  Users,
} from "lucide-react";

type Lead = {
  id: number;
  name: string;
  mobile: string;
  createdAt: string;
};

type Stats = {
  total: number;
  today: number;
  thisMonth: number;
};

export default function BrochureDownloadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    today: 0,
    thisMonth: 0,
  });

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  async function loadData(showRefresh = false) {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await fetch(
        "/api/admin/brochure-downloads",
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to load brochure downloads."
        );
      }

      setLeads(data.leads || []);

      setStats(
        data.stats || {
          total: 0,
          today: 0,
          thisMonth: 0,
        }
      );
    } catch (error) {
      console.error(error);

      setError(
        "Unable to load brochure download data."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function formatDate(value: string) {
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  }

  return (
    <main className="admin-brochure-page">

      <header className="admin-header">

        <div>
          <Link
            href="/admin"
            className="back-link"
          >
            <ArrowLeft size={16} />
            Dashboard
          </Link>

          <div className="eyebrow">
            ADMIN / DOWNLOADS
          </div>

          <h1>
            Brochure
            <br />
            Downloads.
          </h1>

          <p>
            Track visitors who requested access to
            the Colourplus brochure.
          </p>
        </div>

        <button
          className="refresh-button"
          onClick={() => loadData(true)}
          disabled={refreshing}
        >
          <RefreshCw
            size={16}
            className={
              refreshing ? "spin" : ""
            }
          />

          Refresh
        </button>

      </header>

      {/* STATS */}

      <section className="stats-grid">

        <div className="stat-card">

          <div className="stat-icon">
            <Download size={19} />
          </div>

          <span>Total Downloads</span>

          <strong>
            {stats.total}
          </strong>

        </div>

        <div className="stat-card">

          <div className="stat-icon">
            <CalendarDays size={19} />
          </div>

          <span>Today</span>

          <strong>
            {stats.today}
          </strong>

        </div>

        <div className="stat-card">

          <div className="stat-icon">
            <Users size={19} />
          </div>

          <span>This Month</span>

          <strong>
            {stats.thisMonth}
          </strong>

        </div>

      </section>

      {/* LEADS */}

      <section className="leads-section">

        <div className="section-heading">

          <div>
            <span>
              BROCHURE INTEREST
            </span>

            <h2>
              Download records
            </h2>
          </div>

          <div className="record-count">
            {leads.length} RECORDS
          </div>

        </div>

        {loading ? (
          <div className="loading-state">
            <Loader2 className="spin" size={22} />
            Loading records...
          </div>
        ) : error ? (
          <div className="error-state">
            {error}
          </div>
        ) : leads.length === 0 ? (
          <div className="empty-state">
            <Download size={28} />

            <h3>
              No brochure downloads yet
            </h3>

            <p>
              Records will appear here when someone
              requests the brochure.
            </p>
          </div>
        ) : (
          <div className="table-wrap">

            <table>

              <thead>
                <tr>
                  <th>NAME</th>
                  <th>MOBILE</th>
                  <th>DOWNLOADED</th>
                  <th />
                </tr>
              </thead>

              <tbody>

                {leads.map((lead) => (
                  <tr key={lead.id}>

                    <td>
                      <div className="person-cell">

                        <div className="person-number">
                          {String(lead.id).padStart(
                            2,
                            "0"
                          )}
                        </div>

                        <strong>
                          {lead.name}
                        </strong>

                      </div>
                    </td>

                    <td>
                      <a
                        href={`tel:${lead.mobile}`}
                        className="mobile-link"
                      >
                        <Smartphone size={14} />

                        {lead.mobile}
                      </a>
                    </td>

                    <td>
                      <span className="date">
                        {formatDate(
                          lead.createdAt
                        )}
                      </span>
                    </td>

                    <td>
                      <a
                        href={`tel:${lead.mobile}`}
                        className="call-button"
                      >
                        Call
                      </a>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </section>

      <footer className="admin-footer">
        <span>
          COLOURPLUS POLYURETHANES PVT. LTD.
        </span>

        <Link href="/">
          View website
        </Link>
      </footer>

      <style jsx>{`

        .admin-brochure-page {
          min-height: 100vh;
          background: #f3f0ea;
          color: #15283d;
          font-family: Arial, Helvetica, sans-serif;
        }

        .admin-header {
          padding: 70px 7vw 55px;
          display: flex;
          justify-content: space-between;
          gap: 40px;
          border-bottom: 1px solid #d9d5cd;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 45px;
          color: #667687;
          text-decoration: none;
          font-size: 11px;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .eyebrow {
          margin-bottom: 18px;
          font-size: 9px;
          letter-spacing: .2em;
          font-weight: 700;
          color: #7d8b99;
        }

        .admin-header h1 {
          margin: 0;
          font-size: clamp(55px, 7vw, 95px);
          line-height: .86;
          letter-spacing: -.06em;
          font-weight: 500;
        }

        .admin-header p {
          max-width: 440px;
          margin: 28px 0 0;
          color: #6c7988;
          font-size: 13px;
          line-height: 1.7;
        }

        .refresh-button {
          height: 42px;
          padding: 0 17px;
          display: flex;
          align-items: center;
          gap: 9px;
          border: 1px solid #cfd0cc;
          background: transparent;
          color: #33485e;
          cursor: pointer;
          font-size: 10px;
          letter-spacing: .1em;
          text-transform: uppercase;
        }

        .refresh-button:hover {
          background: #fff;
        }

        .stats-grid {
          padding: 35px 7vw;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        .stat-card {
          min-height: 165px;
          padding: 25px;
          box-sizing: border-box;
          border: 1px solid #d9d5cd;
          background: #f8f5ef;
          display: flex;
          flex-direction: column;
        }

        .stat-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #d8d4cc;
          color: #52677b;
          margin-bottom: 25px;
        }

        .stat-card span {
          font-size: 9px;
          letter-spacing: .15em;
          text-transform: uppercase;
          color: #7c8997;
        }

        .stat-card strong {
          margin-top: 8px;
          font-size: 37px;
          font-weight: 500;
          letter-spacing: -.04em;
        }

        .leads-section {
          padding: 40px 7vw 100px;
        }

        .section-heading {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 30px;
          margin-bottom: 25px;
        }

        .section-heading span {
          font-size: 9px;
          letter-spacing: .18em;
          color: #84909d;
        }

        .section-heading h2 {
          margin: 10px 0 0;
          font-size: 31px;
          font-weight: 500;
          letter-spacing: -.04em;
        }

        .record-count {
          font-size: 9px;
          letter-spacing: .16em;
          color: #7e8b98;
        }

        .table-wrap {
          overflow-x: auto;
          border: 1px solid #d9d5cd;
          background: #f8f5ef;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th {
          padding: 17px 20px;
          text-align: left;
          border-bottom: 1px solid #d9d5cd;
          font-size: 8px;
          letter-spacing: .16em;
          color: #7d8996;
          font-weight: 700;
        }

        td {
          padding: 19px 20px;
          border-bottom: 1px solid #e0ddd6;
          font-size: 12px;
        }

        tbody tr:last-child td {
          border-bottom: 0;
        }

        tbody tr:hover {
          background: #fff;
        }

        .person-cell {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .person-number {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #dad6ce;
          font-size: 8px;
          color: #84909c;
        }

        .person-cell strong {
          font-weight: 500;
        }

        .mobile-link {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #334b62;
          text-decoration: none;
        }

        .mobile-link:hover {
          text-decoration: underline;
        }

        .date {
          color: #697888;
          font-size: 11px;
        }

        .call-button {
          display: inline-flex;
          padding: 8px 13px;
          border: 1px solid #cbd0d1;
          color: #314a61;
          text-decoration: none;
          font-size: 9px;
          letter-spacing: .1em;
          text-transform: uppercase;
        }

        .call-button:hover {
          background: #102d48;
          border-color: #102d48;
          color: white;
        }

        .loading-state,
        .error-state,
        .empty-state {
          min-height: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 15px;
          border: 1px solid #d9d5cd;
          color: #73808e;
          background: #f8f5ef;
          text-align: center;
        }

        .empty-state h3 {
          margin: 0;
          color: #263c52;
          font-weight: 500;
        }

        .empty-state p {
          margin: 0;
          font-size: 12px;
        }

        .error-state {
          color: #a1493d;
        }

        .admin-footer {
          padding: 25px 7vw;
          border-top: 1px solid #d9d5cd;
          display: flex;
          justify-content: space-between;
          gap: 20px;
          font-size: 8px;
          letter-spacing: .14em;
          color: #82909d;
        }

        .admin-footer a {
          color: #344c63;
          text-decoration: none;
        }

        .spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 700px) {

          .admin-header {
            padding: 45px 20px;
            flex-direction: column;
          }

          .stats-grid {
            padding: 20px;
            grid-template-columns: 1fr;
          }

          .leads-section {
            padding: 30px 20px 70px;
          }

          .section-heading {
            align-items: start;
            flex-direction: column;
          }

          .admin-footer {
            padding: 22px 20px;
            flex-direction: column;
          }

        }

      `}</style>
    </main>
  );
}