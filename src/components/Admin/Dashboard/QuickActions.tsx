import { useNavigate } from "react-router-dom";

export default function QuickActions() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 16,
      }}
    >
      {[
        {
          icon: "👥",
          label: "Search Customers",
          sub: "Access full database",
          path: "/admin/customers",
        },
        {
          icon: "📊",
          label: "Revenue Reports",
          sub: "Download latest P&L",
          path: "/admin/analytics",
        },
        {
          icon: "✂",
          label: "Manage Services",
          sub: "Configure wellness options",
          path: "/admin/services",
        },
      ].map((action) => (
        <div
          key={action.label}
          onClick={() => navigate(action.path)}
          style={{
            background: "#fff",
            borderRadius: 12,
            padding: "16px 18px",
            border: "1px solid #e9e6f3",
            display: "flex",
            alignItems: "center",
            gap: 12,
            cursor: "pointer",
            transition: "border-color 0.15s",
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: "#f5f2fe",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              flexShrink: 0,
            }}
          >
            {action.icon}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1b1b23" }}>
              {action.label}
            </div>
            <div style={{ fontSize: 11, color: "#767586", marginTop: 1 }}>
              {action.sub}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
