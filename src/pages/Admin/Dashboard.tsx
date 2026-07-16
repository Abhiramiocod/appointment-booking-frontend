import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";
import { Loader2 } from "lucide-react";
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

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [analyticsRes, servicesRes, appointmentsRes] = await Promise.all([
          api.get("/admin/analytics"),
          api.get("/admin/services"),
          api.get("/admin/appointments"),
        ]);
        setAnalytics(analyticsRes.data);
        setServices(servicesRes.data?.data || servicesRes.data || []);
        setAppointments(appointmentsRes.data?.data || appointmentsRes.data || []);
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading || !analytics) {
    return (
      <div className="flex-1 p-8 flex justify-center items-center h-[80vh]">
        <Loader2 className="animate-spin text-indigo-600" size={32} />
      </div>
    );
  }

  const { metrics, monthly_earnings } = analytics;

  // Total bookings across all lifecycles
  const totalAppointments =
    metrics.completed_appointments +
    metrics.confirmed_appointments +
    metrics.pending_appointments +
    metrics.cancelled_appointments;

  const stats = [
    {
      label: "Total Appointments",
      value: String(totalAppointments),
      badge: `+${metrics.completed_appointments} Done`,
      badgeColor: "#059669",
      icon: "📅",
      accent: "#4648d4",
      bgAccent: "#eef0ff",
    },
    {
      label: "Total Customers",
      value: String(metrics.total_customers),
      badge: "Active",
      badgeColor: "#4648d4",
      icon: "👤",
      accent: "#f59e0b",
      bgAccent: "#fffbeb",
    },
    {
      label: "Total Staff",
      value: String(metrics.total_staff),
      badge: "Stable",
      badgeColor: "#6b7280",
      icon: "🗂",
      accent: "#6b7280",
      bgAccent: "#f3f4f6",
    },
    {
      label: "Total Services",
      value: String(services.length),
      badge: `${services.filter((s) => s.is_active).length} Active`,
      badgeColor: "#059669",
      icon: "✂",
      accent: "#10b981",
      bgAccent: "#ecfdf5",
    },
  ];

  // Map Recharts Trend Data
  const trendData = monthly_earnings.map((me: any) => ({
    day: me.month,
    completed: parseFloat(me.total),
  }));

  // Map recent activities from appointment registrations
  const recentActivity = appointments.slice(0, 5).map((appt) => {
    const initials = appt.customer?.name
      ? appt.customer.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
      : "C";
    const statusColors: any = {
      completed: "#22c55e",
      confirmed: "#4648d4",
      pending: "#f59e0b",
      cancelled: "#ef4444",
      rejected: "#6b7280",
    };
    return {
      id: appt.id,
      name: appt.customer?.name || "Customer",
      action: `scheduled ${appt.service?.name || "service"} with`,
      highlight: appt.staff?.name || "Specialist",
      time: `${appt.appointment_date} at ${appt.start_time.substring(0, 5)}`,
      initials,
      color: "#eef0fc",
      iconBg: statusColors[appt.status.toLowerCase()] || "#6b7280",
      iconType: "check",
    };
  });

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
          <button
            onClick={() => navigate("/admin/analytics")}
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
            <span>📊</span>
            View Detailed Reports
          </button>
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
              <div style={{ fontWeight: 600, fontSize: 15, color: "#1b1b23" }}>Revenue Trends</div>
              <div style={{ color: "#767586", fontSize: 12, marginTop: 2 }}>
                Visualizing gross profits and earnings growth
              </div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={trendData.length > 0 ? trendData : [{ day: "None", completed: 0 }]} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
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
                formatter={(value) => [`$${value}`, "Gross revenue"]}
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
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#4648d4" }} />
              <span style={{ fontSize: 12, color: "#767586" }}>Monthly Gross Sales</span>
            </div>
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
            <div style={{ fontWeight: 600, fontSize: 15, color: "#1b1b23" }}>Recent Bookings</div>
            <span
              onClick={() => navigate("/admin/appointments")}
              style={{ fontSize: 12, color: "#4648d4", cursor: "pointer", fontWeight: 500 }}
            >
              View All
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
            {recentActivity.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6">No recent bookings registered.</p>
            ) : (
              recentActivity.map((item) => (
                <div key={item.id} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <ActivityAvatar item={item} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, color: "#1b1b23", lineHeight: 1.4 }}>
                      <span style={{ fontWeight: 600 }}>{item.name}</span> {item.action}{" "}
                      {item.highlight && (
                        <span style={{ color: "#4648d4", fontWeight: 500 }}>{item.highlight}</span>
                      )}
                    </div>
                    <div style={{ fontSize: 11, color: "#767586", marginTop: 2 }}>{item.time}</div>
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
            <div style={{ fontSize: 10, fontWeight: 700, color: "#4648d4", letterSpacing: "0.06em", marginBottom: 6 }}>
              BUSINESS INSIGHT
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              <span style={{ fontSize: 16 }}>✦</span>
              <div style={{ fontSize: 12, color: "#464554", lineHeight: 1.5 }}>
                Total gross revenue registered is ${metrics.total_profit.toLocaleString()} across your styling studio.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {[
          { icon: "👥", label: "Search Customers", sub: "Access full database", path: "/admin/customers" },
          { icon: "📊", label: "Revenue Reports", sub: "Download latest P&L", path: "/admin/analytics" },
          { icon: "✂", label: "Manage Services", sub: "Configure wellness options", path: "/admin/services" },
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
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1b1b23" }}>{action.label}</div>
              <div style={{ fontSize: 11, color: "#767586", marginTop: 1 }}>{action.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
