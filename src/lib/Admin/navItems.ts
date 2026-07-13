import { LayoutDashboard, ClipboardClock, Landmark, ChartPie, Settings, Users, UserCheck } from 'lucide-react';

export interface NavSubItem {
  label: string;
  icon: any;
  path: string;
}

export interface NavItem {
  label: string;
  icon: any;
  path: string;
  children?: NavSubItem[];
}

export const navItems: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { label: "Appointments", icon: ClipboardClock, path: "/admin/appointments" },
  { 
    label: "Staff", 
    icon: Users, 
    path: "/admin/staff",
    children: [
      { label: "Staff List", icon: Users, path: "/admin/staff" },
      { label: "Staff Requests", icon: UserCheck, path: "/admin/staff/requests" }
    ]
  },
  { label: "Clients", icon: Landmark, path: "/admin/clients" }, 
  { label: "Analytics", icon: ChartPie, path: "/admin/analytics" },
  { label: "Settings", icon: Settings, path: "/admin/settings" },
];