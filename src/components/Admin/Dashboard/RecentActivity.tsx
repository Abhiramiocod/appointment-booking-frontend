import ActivityAvatar from "./ActivityAvatar";
import { useNavigate } from "react-router-dom";

interface RecentActivityProps {
  recentActivity: any;
  metrics: any;
}
export default function RecentActivity({
  recentActivity,
  metrics,
}: RecentActivityProps) {
  const navigate = useNavigate();
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 14,
        padding: "20px 20px",
        border: "1px solid #e9e6f3",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <div style={{ fontWeight: 600, fontSize: 15, color: "#1b1b23" }}>
          Recent Bookings
        </div>
        <span
          onClick={() => navigate("/admin/appointments")}
          style={{
            fontSize: 12,
            color: "#4648d4",
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          View All
        </span>
      </div>

      <div
        style={{ display: "flex", flexDirection: "column", gap: 14, flex: 1 }}
      >
        {recentActivity.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-6">
            No recent bookings registered.
          </p>
        ) : (
          recentActivity.map((item) => (
            <div
              key={item.id}
              style={{ display: "flex", gap: 10, alignItems: "flex-start" }}
            >
              <ActivityAvatar item={item} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{ fontSize: 13, color: "#1b1b23", lineHeight: 1.4 }}
                >
                  <span style={{ fontWeight: 600 }}>{item.name}</span>{" "}
                  {item.action}{" "}
                  {item.highlight && (
                    <span style={{ color: "#4648d4", fontWeight: 500 }}>
                      {item.highlight}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 11, color: "#767586", marginTop: 2 }}>
                  {item.time}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* AI Insight */}
      <div
        style={{
          marginTop: 16,
          background: "#f5f2fe",
          borderRadius: 10,
          padding: "12px 14px",
          border: "1px solid #e4e1ed",
        }}
      >
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: "#4648d4",
            letterSpacing: "0.06em",
            marginBottom: 6,
          }}
        >
          BUSINESS INSIGHT
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
          <span style={{ fontSize: 16 }}>✦</span>
          <div style={{ fontSize: 12, color: "#464554", lineHeight: 1.5 }}>
            Total gross revenue registered is $
            {metrics.total_profit.toLocaleString()} across your styling studio.
          </div>
        </div>
      </div>
    </div>
  );
}
