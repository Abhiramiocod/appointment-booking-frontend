import { LayoutDashboard, CalendarDays, LayoutGrid, MessageSquareText, Clock, Link2 } from 'lucide-react';

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
  { label: "Dashboard", icon: LayoutDashboard, path: "/staff" },
  { label: "Schedule", icon: CalendarDays, path: "/staff/schedule" },
  { label: "Working Hours", icon: Clock, path: "/staff/working-hours" },
  { label: "Services", icon: LayoutGrid, path: "/staff/services" },
  { label: "Reviews", icon: MessageSquareText, path: "/staff/reviews" },
  { label: "Connections", icon: Link2, path: "/staff/connections" },
];
