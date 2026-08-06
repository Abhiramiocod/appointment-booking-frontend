import { LayoutDashboard, ClipboardClock, Landmark, ChartPie, Users, UserCheck, User2Icon, Link2 } from 'lucide-react';

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
  { label: "Services", icon: Landmark, path: "/admin/services" },
  { label: "Customers", icon: User2Icon, path: "/admin/customers" },
  { label: "Analytics", icon: ChartPie, path: "/admin/analytics" },
  { label: "Connections", icon: Link2, path: "/admin/connections" },
];