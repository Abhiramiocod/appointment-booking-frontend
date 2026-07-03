import { LayoutDashboard,ClipboardClock,CalendarCheck,Landmark,ChartPie,Settings } from 'lucide-react';

export const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { label: "Appointments", icon: ClipboardClock, path: "/admin/appointments" },
  { label: "Schedule", icon: CalendarCheck, path: "/admin/schedule" },
  { label: "Clients", icon: Landmark, path: "/admin/clients" }, 
  { label: "Analytics", icon: ChartPie, path: "/admin/analytics" },
  { label: "Settings", icon: Settings, path: "/admin/settings" },
];