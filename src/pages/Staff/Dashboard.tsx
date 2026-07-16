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
import QuickActions from "../../components/Staff/Dashboard/QuickActions";
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

  useEffect(() => {
    api.get("/staff/dashboard")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Failed to load dashboard statistics:", err);
      });

    api.get("/staff/appointments")
      .then((res) => {
        setAppointments(res.data?.data || res.data || []);
      })
      .catch((err) => {
        console.error("Failed to load appointments:", err);
      });

    api.get("/staff/reviews")
      .then((res) => {
        setReviewsList(res.data?.reviews?.data || res.data?.reviews || []);
      })
      .catch((err) => {
        console.error("Failed to load reviews:", err);
      });
  }, []);

  const stats = [
    {
      label: "Today's Appointments",
      value: data ? String(data.today_appointments) : "...",
      icon: CalendarCheck2,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
    {
      label: "Upcoming",
      value: data ? String(data.upcoming_appointments) : "...",
      icon: TrendingUp,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      label: "Completed (Week)",
      value: data ? String(data.completed_this_week) : "...",
      icon: CheckCircle2,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      label: "Avg Rating",
      value: data ? String(data.average_rating) : "...",
      suffix: "/5.0",
      icon: Star,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      fill: true,
    },
  ];

  // Get today's local date string YYYY-MM-DD
  const todayStr = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD format in local timezone

  const scheduleRows = appointments
    .filter((appt) => appt.appointment_date === todayStr)
    .map((appt) => {
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
        avatarBg: "bg-indigo-100",
        avatarColor: "text-indigo-600",
        service: appt.service?.name || "Styling Session",
        status: appt.status,
      };
    });

  const recentReviews = reviewsList.slice(0, 2).map((rev) => ({
    name: rev.customer?.name || "Anonymous",
    rating: rev.rating,
    quote: rev.review || "No comment left.",
  }));

  return (
    <div style={{ padding: "28px 32px", flex: 1 }}>
      {/* Greeting */}
      <Greeting />

      {/* Stats */}
      <Stats stats={stats} />

      {/* Schedule + sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Schedule */}
        <ScheduleTable schedule={scheduleRows} />

        {/* Right column */}
        <div className="lg:col-span-4 space-y-8">
          {/* Quick actions */}
          <QuickActions />

          {/* Reviews */}
          <Reviews reviews={recentReviews} />
        </div>
      </div>
    </div>
  );
}
