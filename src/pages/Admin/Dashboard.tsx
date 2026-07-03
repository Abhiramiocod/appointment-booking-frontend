import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import MiniBar from "../../components/Admin/Dashboard/Minibar";
import ActivityAvatar from "../../components/Admin/Dashboard/ActivityAvatar";

const bookingData = [
  { day: "MON", completed: 30, cancellations: 10 },
  { day: "TUE", completed: 45, cancellations: 8 },
  { day: "WED", completed: 38, cancellations: 12 },
  { day: "THU", completed: 50, cancellations: 6 },
  { day: "FRI", completed: 60, cancellations: 9 },
  { day: "SAT", completed: 75, cancellations: 14 },
  { day: "SUN", completed: 90, cancellations: 11 },
];

const recentActivity = [
  {
    id: 1,
    name: "Julian Vane",
    action: "booked a",
    highlight: "Deluxe Facial Treatment",
    time: "2 minutes ago",
    initials: "JV",
    color: "#e0e0e0",
    iconBg: "#22c55e",
    iconType: "check",
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    action: "joined the",
    highlight: "Platinum Membership",
    time: "15 minutes ago",
    initials: "SJ",
    color: "#d4a5a5",
    iconBg: "#4648d4",
    iconType: "user",
  },
  {
    id: 3,
    name: "System Alert",
    action: "High traffic detected on Sunday slots",
    highlight: null,
    time: "1 hour ago",
    initials: "!",
    color: "#fca5a5",
    iconBg: "#ef4444",
    iconType: "alert",
    isAlert: true,
  },
  {
    id: 4,
    name: "Marco Rossi",
    action: "updated his",
    highlight: "Service Availability",
    time: "3 hours ago",
    initials: "MR",
    color: "#c4a882",
    iconBg: "#f59e0b",
    iconType: "star",
  },
  {
    id: 5,
    name: "Admin",
    action: "updated Business Hours for the West Wing",
    highlight: null,
    time: "5 hours ago",
    initials: "A",
    color: "#333",
    iconBg: "#6b7280",
    iconType: "settings",
  },
];

const stats = [
  {
    label: "Total Appointments",
    value: "2,481",
    badge: "+12.5%",
    badgeColor: "#ef4444",
    icon: "📅",
    accent: "#4648d4",
    bgAccent: "#eef0ff",
  },
  {
    label: "Total Customers",
    value: "1,120",
    badge: "+8.2%",
    badgeColor: "#ef4444",
    icon: "👤",
    accent: "#f59e0b",
    bgAccent: "#fffbeb",
  },
  {
    label: "Total Staff",
    value: "42",
    badge: "Stable",
    badgeColor: "#6b7280",
    icon: "🗂",
    accent: "#6b7280",
    bgAccent: "#f3f4f6",
  },
  {
    label: "Total Services",
    value: "156",
    badge: "+4 New",
    badgeColor: "#4648d4",
    icon: "✂",
    accent: "#4648d4",
    bgAccent: "#eef0ff",
  },
];

export default function AdminDashboard() {
  const [bookingView, setBookingView] = useState("Weekly");

  return (
    <div style={{ padding: "28px 32px", flex: 1 }}>
      {/* Page header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#1b1b23", margin: 0, letterSpacing: "-0.02em" }}>
            Administrative Overview
          </h1>
          <p style={{ color: "#767586", fontSize: 14, margin: "4px 0 0" }}>
            Welcome back. Here is what's happening with your suite today.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {["Last 30 Day", "Export Report"].map((label, i) => (
            <button
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 14px",
                borderRadius: 8,
                border: "1px solid #e4e1ed",
                background: "#fff",
                color: "#464554",
                fontSize: 13,
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              <span>{i === 0 ? "📅" : "⬇"}</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "#fff",
              borderRadius: 14,
              padding: "18px 20px",
              border: "1px solid #e9e6f3",
              position: "relative",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: stat.bgAccent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                }}
              >
                {stat.icon}
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: stat.badgeColor,
                  background: `${stat.badgeColor}18`,
                  padding: "3px 7px",
                  borderRadius: 20,
                }}
              >
                {stat.badge}
              </span>
            </div>
            <div style={{ color: "#767586", fontSize: 12, marginBottom: 4 }}>{stat.label}</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: "#1b1b23", letterSpacing: "-0.02em" }}>
              {stat.value}
            </div>
            <MiniBar accent={stat.accent} />
          </div>
        ))}
      </div>

      {/* Bottom row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 16, marginBottom: 24 }}>
        {/* Chart */}
        <div
          style={{
            background: "#fff",
            borderRadius: 14,
            padding: "20px 24px",
            border: "1px solid #e9e6f3",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 15, color: "#1b1b23" }}>Booking Trends</div>
              <div style={{ color: "#767586", fontSize: 12, marginTop: 2 }}>
                Visualizing appointment volume over time
              </div>
            </div>
            <div style={{ display: "flex", gap: 0, background: "#f5f2fe", borderRadius: 8, padding: 3 }}>
              {["Weekly", "Monthly"].map((v) => (
                <button
                  key={v}
                  onClick={() => setBookingView(v)}
                  style={{
                    padding: "5px 14px",
                    borderRadius: 6,
                    border: "none",
                    background: bookingView === v ? "#fff" : "transparent",
                    color: bookingView === v ? "#1b1b23" : "#767586",
                    fontWeight: bookingView === v ? 600 : 400,
                    fontSize: 12,
                    cursor: "pointer",
                    boxShadow: bookingView === v ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                    transition: "all 0.15s",
                  }}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={bookingData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4648d4" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#4648d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#767586" }}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  background: "#fff",
                  border: "1px solid #e4e1ed",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Area
                type="monotone"
                dataKey="completed"
                stroke="#4648d4"
                strokeWidth={2.5}
                fill="url(#colorCompleted)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>

          <div style={{ display: "flex", gap: 20, marginTop: 12 }}>
            {[
              { color: "#4648d4", label: "Completed Bookings" },
              { color: "#c7c4d7", label: "Cancellations" },
            ].map((l) => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: l.color }} />
                <span style={{ fontSize: 12, color: "#767586" }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
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
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontWeight: 600, fontSize: 15, color: "#1b1b23" }}>Recent Activity</div>
            <span style={{ fontSize: 12, color: "#4648d4", cursor: "pointer", fontWeight: 500 }}>
              View All
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
            {recentActivity.map((item) => (
              <div key={item.id} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <ActivityAvatar item={item} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, color: "#1b1b23", lineHeight: 1.4 }}>
                    {item.isAlert ? (
                      <>
                        <span style={{ fontWeight: 600 }}>System Alert</span>: {item.action}
                      </>
                    ) : (
                      <>
                        <span style={{ fontWeight: 600 }}>{item.name}</span> {item.action}{" "}
                        {item.highlight && (
                          <span style={{ color: "#4648d4", fontWeight: 500 }}>{item.highlight}</span>
                        )}
                      </>
                    )}
                  </div>
                  <div style={{ fontSize: 11, color: "#767586", marginTop: 2 }}>{item.time}</div>
                </div>
              </div>
            ))}
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
            <div style={{ fontSize: 10, fontWeight: 700, color: "#4648d4", letterSpacing: "0.06em", marginBottom: 6 }}>
              AI INSIGHT
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              <span style={{ fontSize: 16 }}>✦</span>
              <div style={{ fontSize: 12, color: "#464554", lineHeight: 1.5 }}>
                Rebook rates are up 14% this week. Consider promoting the loyalty program.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {[
          { icon: "👥", label: "Search Customers", sub: "Access full database" },
          { icon: "📋", label: "Revenue Reports", sub: "Download latest P&L" },
          { icon: "🎚", label: "Global Settings", sub: "Configure environment" },
        ].map((action) => (
          <div
            key={action.label}
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
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1b1b23" }}>{action.label}</div>
              <div style={{ fontSize: 11, color: "#767586", marginTop: 1 }}>{action.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
