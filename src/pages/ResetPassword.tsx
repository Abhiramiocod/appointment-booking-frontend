import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import DesignColors from "../lib/utils";
import Header from "../components/Login/Header";
import BrandIdentity from "../components/Login/BrandIdentity";
import Icon from "../components/Login/Icons";
import { glass } from "../styles/glass";
import api from "../lib/api";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token") || "";
  const emailParam = searchParams.get("email") || "";

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [passFocus, setPassFocus] = useState(false);
  const [confirmFocus, setConfirmFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    setMessage(null);
    setErrorMessage(null);

    try {
      const response = await api.post("/reset-password", {
        token,
        email: emailParam,
        password,
        password_confirmation: passwordConfirmation,
      });

      setMessage(response.data.message || "Password reset successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (error: any) {
      if (error.response?.data?.errors) {
        const firstErrKey = Object.keys(error.response.data.errors)[0];
        setErrorMessage(error.response.data.errors[firstErrKey][0]);
      } else {
        setErrorMessage(error.response?.data?.message || "Failed to reset password. Link may be invalid or expired.");
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
              Set New Password
            </h2>
            <p style={{ fontSize: 14, color: DesignColors().onSurfaceVariant }}>
              Enter your new password below for {emailParam || "your account"}.
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
            {/* New Password */}
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
                New Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPassFocus(true)}
                  onBlur={() => setPassFocus(false)}
                  style={{ ...inputStyle(passFocus), paddingRight: 48 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: "absolute",
                    right: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: DesignColors().outlineVariant,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Icon name={showPass ? "visibility_off" : "visibility"} />
                </button>
              </div>
            </div>

            {/* Confirm Password */}
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
                Confirm Password
              </label>
              <input
                type={showPass ? "text" : "password"}
                required
                placeholder="••••••••"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                onFocus={() => setConfirmFocus(true)}
                onBlur={() => setConfirmFocus(false)}
                style={inputStyle(confirmFocus)}
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
                "Reset Password"
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
