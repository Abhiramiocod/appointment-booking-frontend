import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DesignColors from "../lib/utils";
import Header from "../components/Login/Header";
import BrandIdentity from "../components/Login/BrandIdentity";
import { glass } from "../styles/glass";

export default function VerifySuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const statusMsg = searchParams.get("status") || "Email verified successfully.";

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3500);

    return () => clearTimeout(timer);
  }, [navigate]);

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
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#10b981",
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 36 }}>
              verified
            </span>
          </div>

          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, color: DesignColors().onSurface }}>
              {statusMsg}
            </h2>
            <p style={{ fontSize: 14, color: DesignColors().onSurfaceVariant, lineHeight: 1.6 }}>
              Your account is now active. You will be redirected to the sign-in page in a few seconds...
            </p>
          </div>

          <button
            onClick={() => navigate("/login")}
            style={{
              width: "100%",
              height: 52,
              borderRadius: 12,
              background: DesignColors().primary,
              color: "#fff",
              border: "none",
              fontWeight: 600,
              fontSize: 15,
              cursor: "pointer",
            }}
          >
            Sign In Now
          </button>
        </div>
      </main>
    </div>
  );
}
