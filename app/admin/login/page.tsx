"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Invalid login.");
      }

      router.replace("/admin");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Login failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <div className="background-grid" />

      <div className="login-container">
        <div className="brand-mark">
          <img
            src="/images/colourplus-logo.png"
            alt="Colourplus"
          />
        </div>

        <div className="login-kicker">
          COLOURPLUS / PRIVATE ACCESS
        </div>

        <h1>
          Admin
          <span>Control.</span>
        </h1>

        <p className="intro">
          Sign in to manage Colourplus project enquiries.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="admin@colourplus.in"
            autoComplete="username"
            required
          />

          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            placeholder="Enter your password"
            autoComplete="current-password"
            required
          />

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            <LockKeyhole size={17} />

            {loading
              ? "Signing in..."
              : "Sign in"}

            {!loading && (
              <ArrowUpRight size={18} />
            )}
          </button>
        </form>

        <div className="login-footer">
          COLOURPLUS POLYURETHANES PVT. LTD.
        </div>
      </div>

      <style jsx>{`
        .login-page {
          min-height: 100vh;
          background: #071625;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 30px;
          position: relative;
          overflow: hidden;
        }

        .background-grid {
          position: absolute;
          inset: 0;
          opacity: 0.08;
          background-image:
            linear-gradient(
              rgba(255, 255, 255, 0.35) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.35) 1px,
              transparent 1px
            );
          background-size: 80px 80px;
          mask-image: radial-gradient(
            circle at center,
            black,
            transparent 75%
          );
        }

        .login-container {
          width: min(440px, 100%);
          position: relative;
          z-index: 1;
          animation: loginIn 700ms ease both;
        }

        @keyframes loginIn {
          from {
            opacity: 0;
            transform: translateY(25px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .brand-mark {
          width: 190px;
          margin-bottom: 55px;
        }

        .brand-mark img {
          width: 100%;
          height: auto;
          display: block;
        }

        .login-kicker {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.18em;
          color: #7e9ab5;
          margin-bottom: 15px;
        }

        h1 {
          margin: 0;
          font-size: clamp(55px, 9vw, 82px);
          line-height: 0.88;
          letter-spacing: -0.06em;
          font-weight: 800;
        }

        h1 span {
          display: block;
          color: #7791aa;
          font-weight: 400;
        }

        .intro {
          color: #aab8c7;
          line-height: 1.6;
          font-size: 14px;
          margin: 25px 0 35px;
        }

        form {
          display: flex;
          flex-direction: column;
        }

        label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 750;
          color: #91a5b8;
          margin-bottom: 8px;
        }

        input {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.055);
          color: white;
          outline: none;
          padding: 15px;
          font: inherit;
          margin-bottom: 20px;
          transition:
            border-color 180ms ease,
            background 180ms ease;
        }

        input::placeholder {
          color: #65798c;
        }

        input:focus {
          border-color: #7898b5;
          background: rgba(255, 255, 255, 0.08);
        }

        .error-message {
          background: rgba(180, 65, 55, 0.16);
          border: 1px solid rgba(255, 120, 105, 0.28);
          color: #ffb2a8;
          padding: 12px;
          font-size: 12px;
          margin-bottom: 15px;
        }

        button {
          border: 0;
          background: #174b83;
          color: white;
          min-height: 54px;
          padding: 0 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font: inherit;
          font-weight: 750;
          cursor: pointer;
          transition:
            transform 180ms ease,
            background 180ms ease;
        }

        button:hover:not(:disabled) {
          background: #205b99;
          transform: translateY(-2px);
        }

        button:disabled {
          opacity: 0.6;
          cursor: default;
        }

        .login-footer {
          margin-top: 45px;
          padding-top: 18px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 9px;
          letter-spacing: 0.13em;
          color: #5e7387;
        }

        @media (max-width: 600px) {
          .login-page {
            padding: 25px;
          }

          .brand-mark {
            width: 160px;
            margin-bottom: 45px;
          }
        }
      `}</style>
    </main>
  );
}