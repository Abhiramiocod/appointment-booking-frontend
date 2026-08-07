import { Calendar, PlusCircle, Link2 } from "lucide-react";

export const navItems = [
  { label: "My Appointments", icon: Calendar, path: "/customer" },
  { label: "Book Appointment", icon: PlusCircle, path: "/customer/book" },
  { label: "Connected Accounts", icon: Link2, path: "/customer/connections" },
];