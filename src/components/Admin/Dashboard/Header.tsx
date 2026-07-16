import { ChartNoAxesCombined } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 24,
      }}
    >
      <div>
        <h1
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "#1b1b23",
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          Administrative Overview
        </h1>
        <p style={{ color: "#767586", fontSize: 14, margin: "4px 0 0" }}>
          Welcome back. Here is what's happening with your suite today.
        </p>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={() => navigate("/admin/analytics")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 16px",
            borderRadius: 8,
            border: "1px solid #e4e1ed",
            background: "#3b3dbb",
            color: "#fff",
            fontSize: 13,
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          <ChartNoAxesCombined size={20} />
          View Detailed Reports
        </button>
      </div>
    </div>
  );
}
