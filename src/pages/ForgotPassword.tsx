import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DesignColors from "../lib/utils";
import Header from "../components/Login/Header";
import BrandIdentity from "../components/Login/BrandIdentity";
import { glass } from "../styles/glass";
import api from "../lib/api";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setMessage(null);
    setErrorMessage(null);

    try {
      const response = await api.post("/forgot-password", { email });
      setMessage(response.data.message || "Password reset link has been sent if the account exists.");
    } catch (error: any) {
      if (error.response?.status === 429) {
        setErrorMessage("Too many requests. Please wait a moment before trying again.");
      } else {
        setErrorMessage(error.response?.data?.message || "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (focused: boolean): React.CSSProperties => ({
    width: "100%",
    height: 56,
    background: DesignColors().surfaceLow,
    border: focused ? `1.5px solid ${DesignColors().primary}` : "1.5px solid transparent",
    borderRadius: 12,
    padding: "0 16px",
    fontSize: 16,
    fontFamily: "Inter, sans-serif",
    color: DesignColors().onSurface,
    boxShadow: focused
      ? `0 0 0 2px rgba(70,72,212,0.1), 0 0 8px rgba(70,72,212,0.15)`
      : "none",
    transition: "all 0.2s ease",
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: DesignColors().surface,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "Inter, sans-serif",
        color: DesignColors().onSurface,
      }}
    >
      <Header onBack={() => navigate("/login")} />

      <main
        style={{
          width: "100%",
          maxWidth: 440,
          padding: "40px 16px 48px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <BrandIdentity />

        <div
          style={{
            ...glass,
            width: "100%",
            padding: "40px",
            borderRadius: 32,
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, color: DesignColors().onSurface }}>
              Forgot Password?
            </h2>
            <p style={{ fontSize: 14, color: DesignColors().onSurfaceVariant }}>
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          {message && (
            <div
              style={{
                padding: "14px 16px",
                borderRadius: 12,
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                border: "1px solid rgba(16, 185, 129, 0.25)",
                color: "#10b981",
                fontSize: 14,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                check_circle
              </span>
              <span>{message}</span>
            </div>
          )}

          {errorMessage && (
            <div
              style={{
                padding: "14px 16px",
                borderRadius: 12,
                backgroundColor: "rgba(220, 38, 38, 0.1)",
                border: "1px solid rgba(220, 38, 38, 0.25)",
                color: "#dc2626",
                fontSize: 14,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                error
              </span>
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label
                style={{
                  fontSize: 12,
                  fontFamily: "Geist, sans-serif",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  color: DesignColors().onSurfaceVariant,
                  textTransform: "uppercase",
                  paddingLeft: 4,
                }}
              >
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                style={inputStyle(emailFocus)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                height: 52,
                borderRadius: 12,
                background: DesignColors().primary,
                color: "#fff",
                border: "none",
                fontWeight: 600,
                fontSize: 15,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                transition: "all 0.2s",
              }}
            >
              {loading ? (
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    border: "2px solid rgba(255, 255, 255, 0.3)",
                    borderTopColor: "#fff",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>
        </div>

        <p style={{ marginTop: 24, color: DesignColors().onSurfaceVariant, fontSize: 15 }}>
          Remember your password?{" "}
          <Link
            to="/login"
            style={{
              color: DesignColors().primary,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Back to Sign In
          </Link>
        </p>
      </main>
    </div>
  );
}
