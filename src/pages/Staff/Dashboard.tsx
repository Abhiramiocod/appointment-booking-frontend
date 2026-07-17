import { useState, useEffect } from "react";
import {
  CalendarCheck2,
  TrendingUp,
  CheckCircle2,
  Star,
} from "lucide-react";
import Greeting from "../../components/Staff/Dashboard/Greeting";
import Stats from "../../components/Staff/Dashboard/Stats";
import ScheduleTable from "../../components/Staff/Dashboard/ScheduleTable";
import TodaySummary from "../../components/Staff/Dashboard/TodaySummary";
import UpcomingBreak from "../../components/Staff/Dashboard/UpcomingBreak";
import Reviews from "../../components/Staff/Dashboard/Reviews";
import api from "../../lib/api";

export default function Dashboard() {
  const [data, setData] = useState<{
    today_appointments: number;
    upcoming_appointments: number;
    completed_this_week: number;
    average_rating: number;
  } | null>(null);

  const [appointments, setAppointments] = useState<any[]>([]);
  const [reviewsList, setReviewsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsRes, apptsRes, revsRes] = await Promise.all([
          api.get("/staff/dashboard"),
          api.get("/staff/appointments"),
          api.get("/staff/reviews"),
        ]);

        setData(statsRes.data);
        setAppointments(apptsRes.data?.data || apptsRes.data || []);
        setReviewsList(revsRes.data?.reviews?.data || revsRes.data?.reviews || []);
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const stats = [
    {
      label: "Today's Appointments",
      value: data ? String(data.today_appointments) : "0",
      icon: CalendarCheck2,
      iconBg: "bg-indigo-50 text-indigo-600",
      iconColor: "text-indigo-600",
    },
    {
      label: "Upcoming",
      value: data ? String(data.upcoming_appointments) : "0",
      icon: TrendingUp,
      iconBg: "bg-blue-50 text-blue-600",
      iconColor: "text-blue-600",
    },
    {
      label: "Completed (Week)",
      value: data ? String(data.completed_this_week) : "0",
      icon: CheckCircle2,
      iconBg: "bg-orange-50 text-orange-600",
      iconColor: "text-orange-600",
    },
    {
      label: "Avg Rating",
      value: data ? String(data.average_rating) : "0",
      suffix: "/5.0",
      icon: Star,
      iconBg: "bg-yellow-50 text-yellow-500",
      iconColor: "text-yellow-500",
      fill: true,
    },
  ];

  // Get today's local date string YYYY-MM-DD
  const todayStr = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD format in local timezone

  const todayAppointments = appointments.filter(
    (appt) => appt.appointment_date === todayStr
  );

  const scheduleRows = todayAppointments.map((appt) => {
    const name = appt.customer?.name || "Client";
    const initials = name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
    return {
      time: appt.start_time.substring(0, 5),
      name,
      initials,
      avatarBg: "bg-indigo-50",
      avatarColor: "text-indigo-600",
      service: appt.service?.name || "Styling Session",
      status: appt.status,
    };
  });

  // Calculate today's summary metrics
  const summaryMetrics = {
    total: todayAppointments.length,
    completed: todayAppointments.filter(
      (a) => a.status?.toLowerCase() === "completed"
    ).length,
    pending: todayAppointments.filter(
      (a) => a.status?.toLowerCase() === "pending"
    ).length,
    upcoming: todayAppointments.filter(
      (a) =>
        a.status?.toLowerCase() === "confirmed" ||
        a.status?.toLowerCase() === "approved"
    ).length,
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const recentReviews = reviewsList.slice(0, 2).map((rev) => ({
    name: rev.customer?.name || "Anonymous",
    rating: rev.rating,
    quote: rev.review || "No comment left.",
    service: rev.appointment?.service?.name || "Styling Session",
    date: formatDate(rev.created_at),
  }));

  return (
    <div style={{ padding: "28px 32px", flex: 1, display: "flex", flexDirection: "column", gap: "28px", background: "#fcf8ff" }}>
      {/* Greeting */}
      <Greeting />

      {/* Stats Cards */}
      <Stats stats={stats} />

      {/* Main Grid: Today's Schedule & Right column (Today's Summary, Upcoming Break) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Today's Schedule */}
        <ScheduleTable schedule={scheduleRows} />

        {/* Right Column: Today's Summary & Upcoming Break */}
        <div className="lg:col-span-4 flex flex-col gap-8 h-full justify-between">
          <TodaySummary
            total={summaryMetrics.total}
            completed={summaryMetrics.completed}
            pending={summaryMetrics.pending}
            upcoming={summaryMetrics.upcoming}
          />
          <UpcomingBreak />
        </div>
      </div>

      {/* Bottom Block: Recent Reviews */}
      <Reviews reviews={recentReviews} />
    </div>
  );
}
