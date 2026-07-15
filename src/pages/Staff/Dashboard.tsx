import {
  LayoutDashboard,
  CalendarDays,
  LayoutGrid,
  MessageSquareText,
  Settings,
  CalendarCheck2,
  TrendingUp,
  CheckCircle2,
  Star,
} from "lucide-react";
import StaffSidebar from "../../components/Staff/StaffSidebar";
import StaffTopBar from "../../components/Staff/StaffTopBar";
import Greeting from "../../components/Staff/Dashboard/Greeting";
import Stats from "../../components/Staff/Dashboard/Stats";
import ScheduleTable from "../../components/Staff/Dashboard/ScheduleTable";
import QuickActions from "../../components/Staff/Dashboard/QuickActions";
import Reviews from "../../components/Staff/Dashboard/Reviews";
import MobileNav from "../../components/Staff/Dashboard/MobileNav";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Schedule", icon: CalendarDays },
  { label: "Services", icon: LayoutGrid },
  { label: "Reviews", icon: MessageSquareText },
  { label: "Settings", icon: Settings },
];

const stats = [
  {
    label: "Today's Appointments",
    value: "8",
    icon: CalendarCheck2,
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
  {
    label: "Upcoming",
    value: "24",
    icon: TrendingUp,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    label: "Completed (Week)",
    value: "42",
    icon: CheckCircle2,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    label: "Avg Rating",
    value: "4.9",
    suffix: "/5.0",
    icon: Star,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
    fill: true,
  },
];

const statusStyles = {
  Confirmed: "bg-green-100 text-green-700",
  "In Progress": "bg-indigo-100 text-indigo-600",
  Pending: "bg-slate-100 text-slate-500",
};

const schedule = [
  {
    time: "09:00 AM",
    initials: "AR",
    name: "Alex Rivera",
    service: "Luxury Hair Spa",
    status: "Confirmed",
    avatarBg: "bg-indigo-100",
    avatarColor: "text-indigo-600",
  },
  {
    time: "10:30 AM",
    initials: "JH",
    name: "Jordan Hayes",
    service: "Styling Session",
    status: "In Progress",
    avatarBg: "bg-purple-100",
    avatarColor: "text-purple-700",
  },
  {
    time: "01:00 PM",
    initials: "EV",
    name: "Eleanor Vance",
    service: "Hair Color",
    status: "Pending",
    avatarBg: "bg-blue-100",
    avatarColor: "text-blue-700",
  },
  {
    time: "02:30 PM",
    initials: "MR",
    name: "Marcus Reed",
    service: "Consultation",
    status: "Confirmed",
    avatarBg: "bg-orange-100",
    avatarColor: "text-orange-700",
  },
  {
    time: "04:00 PM",
    initials: "SL",
    name: "Sophia Lin",
    service: "Premium Grooming",
    status: "Confirmed",
    avatarBg: "bg-pink-100",
    avatarColor: "text-pink-700",
  },
];

const reviews = [
  {
    name: "Elena R.",
    rating: 5,
    quote: "Sarah is amazing! My hair has never looked better.",
  },
  {
    name: "James K.",
    rating: 5,
    quote: "Very professional and punctual. Highly recommend.",
  },
];


export default function Dashboard() {
  return (
    <div style={{ padding: "28px 32px", flex: 1 }}>
      {/* Greeting */}
      <Greeting />

      {/* Stats */}
      <Stats stats={stats} />

      {/* Schedule + sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Schedule */}
        <ScheduleTable schedule={schedule} />

        {/* Right column */}
        <div className="lg:col-span-4 space-y-8">
          {/* Quick actions */}
          <QuickActions />

          {/* Reviews */}
          <Reviews reviews={reviews} />
        </div>
      </div>
    </div>
  );
}
