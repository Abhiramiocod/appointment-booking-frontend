import { LayoutDashboard,ClipboardClock,Landmark,ChartPie,Settings, Users } from 'lucide-react';

export const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { label: "Appointments", icon: ClipboardClock, path: "/admin/appointments" },
  { label: "Staff", icon: Users, path: "/admin/staff" },
  { label: "Clients", icon: Landmark, path: "/admin/clients" }, 
  { label: "Analytics", icon: ChartPie, path: "/admin/analytics" },
  { label: "Settings", icon: Settings, path: "/admin/settings" },
];