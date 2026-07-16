import { useState, useEffect } from "react";
import api from "../../lib/api";
import {
  ClipboardClock,
  Loader2,
  Scissors,
  Users,
  UsersRound,
} from "lucide-react";
import Header from "../../components/Admin/Dashboard/Header";
import StatCards from "../../components/Admin/Dashboard/StatCards";
import Chart from "../../components/Admin/Dashboard/Chart";
import RecentActivity from "../../components/Admin/Dashboard/RecentActivity";
import QuickActions from "../../components/Admin/Dashboard/QuickActions";

export default function AdminDashboard() {
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
        setAppointments(
          appointmentsRes.data?.data || appointmentsRes.data || [],
        );
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
      icon: ClipboardClock,
      accent: "#4648d4",
      bgAccent: "#eef0ff",
    },
    {
      label: "Total Customers",
      value: String(metrics.total_customers),
      badge: "Active",
      badgeColor: "#4648d4",
      icon: UsersRound,
      accent: "#f59e0b",
      bgAccent: "#fffbeb",
    },
    {
      label: "Total Staff",
      value: String(metrics.total_staff),
      badge: "Stable",
      badgeColor: "#6b7280",
      icon: Users,
      accent: "#6b7280",
      bgAccent: "#f3f4f6",
    },
    {
      label: "Total Services",
      value: String(services.length),
      badge: `${services.filter((s) => s.is_active).length} Active`,
      badgeColor: "#059669",
      icon: Scissors,
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
      ? appt.customer.name
          .split(" ")
          .map((n: string) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
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
      <Header />

      {/* Stat cards */}
      <StatCards stats={stats} />

      {/* Bottom row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 340px",
          gap: 16,
          marginBottom: 24,
        }}
      >
        {/* Chart */}
        <Chart trendData={trendData} />

        {/* Recent Activity */}
        <RecentActivity recentActivity={recentActivity} metrics={metrics} />
      </div>

      {/* Quick actions */}
      <QuickActions />
    </div>
  );
}
