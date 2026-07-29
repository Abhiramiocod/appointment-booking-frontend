import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../lib/api";
import DesignColors from "../lib/utils";

export default function LoginCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setError("Authentication failed. No token received.");
      return;
    }

    // Store token in localStorage
    localStorage.setItem("token", token);

    // Fetch user profile using Sanctum token
    api
      .get("/user")
      .then((response) => {
        const user = response.data.user;
        localStorage.setItem("user", JSON.stringify(user));

        // Redirect based on user role
        switch (user.role) {
          case "admin":
            navigate("/admin");
            break;
          case "staff":
            navigate("/staff");
            break;
          case "customer":
            navigate("/customer");
            break;
          default:
            navigate("/");
        }
      })
      .catch((err) => {
        console.error("Failed to fetch authenticated user:", err);
        localStorage.removeItem("token");
        setError("Failed to fetch user profile. Please try logging in again.");
      });
  }, [searchParams, navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: DesignColors().surface,
        color: DesignColors().onSurface,
        fontFamily: "Inter, sans-serif",
      }}
    >
      {error ? (
        <div
          style={{
            padding: "24px 32px",
            borderRadius: "16px",
            backgroundColor: "rgba(220, 38, 38, 0.1)",
            border: "1px solid rgba(220, 38, 38, 0.3)",
            textAlign: "center",
            maxWidth: "400px",
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 48, color: "#dc2626", marginBottom: 12 }}
          >
            error
          </span>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>
            Authentication Error
          </h2>
          <p style={{ fontSize: 14, color: DesignColors().onSurfaceVariant, marginBottom: 20 }}>
            {error}
          </p>
          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              backgroundColor: DesignColors().primary,
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Back to Login
          </button>
        </div>
      ) : (
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: `3px solid rgba(70, 72, 212, 0.15)`,
              borderTopColor: DesignColors().primary,
              animation: "spin 0.8s linear infinite",
            }}
          />
          <p style={{ fontSize: 16, fontWeight: 500 }}>Completing sign-in...</p>
        </div>

      )}
    </div>
  );
}
