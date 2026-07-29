import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DesignColors from "../lib/utils";
import Header from "../components/Login/Header";
import BrandIdentity from "../components/Login/BrandIdentity";
import { glass } from "../styles/glass";
import api from "../lib/api";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();

  const userEmail = location.state?.email || "";
  const queryError = new URLSearchParams(location.search).get("error");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(queryError);

  const handleResend = async () => {
    setLoading(true);
    setMessage(null);
    setErrorMessage(null);

    try {
      const response = await api.post("/email/verification-notification");
      setMessage(response.data.message || "Verification link sent to your email.");
    } catch (error: any) {
      if (error.response?.status === 429) {
        setErrorMessage("Too many requests. Please wait a minute before requesting another email.");
      } else if (error.response?.status === 401) {
        setErrorMessage("Please log in first to resend the verification email.");
      } else {
        setErrorMessage(error.response?.data?.message || "Failed to send verification email. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

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
          maxWidth: 460,
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
            alignItems: "center",
            gap: 24,
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              backgroundColor: "rgba(70,72,212,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: DesignColors().primary,
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 36 }}>
              mark_email_unread
            </span>
          </div>

          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, color: DesignColors().onSurface }}>
              Verify Your Email Address
            </h2>
            <p style={{ fontSize: 14, color: DesignColors().onSurfaceVariant, lineHeight: 1.6 }}>
              We have sent a verification link to{" "}
              <strong style={{ color: DesignColors().onSurface }}>{userEmail || "your registered email"}</strong>.
              Please check your inbox and click the link to activate your account.
            </p>
          </div>

          {message && (
            <div
              style={{
                width: "100%",
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
                width: "100%",
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

          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
            <button
              onClick={handleResend}
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
                "Resend Verification Email"
              )}
            </button>

            <button
              onClick={() => navigate("/login")}
              style={{
                width: "100%",
                height: 48,
                borderRadius: 12,
                background: "transparent",
                color: DesignColors().onSurfaceVariant,
                border: "1.5px solid rgba(199,196,215,0.4)",
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              Back to Login
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
