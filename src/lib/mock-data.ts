export type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // minutes
  price: number;
  category: string;
}

export interface Staff {
  id: string;
  name: string;
  initials: string;
  experience: number;
  bio: string;
  services: string[];
  rating: number;
  phone: string;
  email: string;
  avatarColor: string;
}

export interface Appointment {
  id: string;
  serviceId: string;
  serviceName: string;
  staffId: string;
  staffName: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  status: AppointmentStatus;
}

export const services: Service[] = [
  { id: "s1", name: "Hair Cut & Style", description: "Precision cut, wash, and styling tailored to your face shape.", duration: 45, price: 55, category: "Hair" },
  { id: "s2", name: "Color Treatment", description: "Full color with premium ammonia-free dyes and gloss finish.", duration: 120, price: 140, category: "Hair" },
  { id: "s3", name: "Deep Tissue Massage", description: "60-minute therapeutic massage targeting tension and stress points.", duration: 60, price: 95, category: "Wellness" },
  { id: "s4", name: "Facial — Glow", description: "Revitalizing facial with vitamin C, mask, and lymphatic massage.", duration: 50, price: 85, category: "Skin" },
  { id: "s5", name: "Manicure & Polish", description: "Classic manicure with cuticle care and long-lasting polish.", duration: 40, price: 38, category: "Nails" },
  { id: "s6", name: "Beard Trim", description: "Sculpting, line-up, and hot towel finish for a sharp look.", duration: 25, price: 28, category: "Grooming" },
];

export const staff: Staff[] = [
  { id: "st1", name: "Ava Mitchell", initials: "AM", experience: 8, bio: "Senior stylist specializing in color and balayage.", services: ["s1", "s2"], rating: 4.9, phone: "+1 555 0142", email: "ava@bookly.io", avatarColor: "oklch(0.8 0.12 25)" },
  { id: "st2", name: "Liam Carter", initials: "LC", experience: 5, bio: "Massage therapist focused on deep tissue and recovery.", services: ["s3"], rating: 4.8, phone: "+1 555 0188", email: "liam@bookly.io", avatarColor: "oklch(0.78 0.12 200)" },
  { id: "st3", name: "Sofia Reyes", initials: "SR", experience: 6, bio: "Licensed esthetician with a focus on glow-enhancing facials.", services: ["s4", "s5"], rating: 5.0, phone: "+1 555 0123", email: "sofia@bookly.io", avatarColor: "oklch(0.8 0.12 320)" },
  { id: "st4", name: "Noah Patel", initials: "NP", experience: 4, bio: "Master barber. Sharp fades and classic grooming.", services: ["s1", "s6"], rating: 4.7, phone: "+1 555 0177", email: "noah@bookly.io", avatarColor: "oklch(0.78 0.12 150)" },
];

const today = new Date();
const offset = (d: number) => {
  const x = new Date(today);
  x.setDate(today.getDate() + d);
  return x.toISOString().slice(0, 10);
};

export const appointments: Appointment[] = [
  { id: "a1", serviceId: "s1", serviceName: "Hair Cut & Style", staffId: "st1", staffName: "Ava Mitchell", customerId: "c1", customerName: "Jordan Lee", customerEmail: "jordan@mail.com", date: offset(0), time: "10:00", duration: 45, price: 55, status: "confirmed" },
  { id: "a2", serviceId: "s3", serviceName: "Deep Tissue Massage", staffId: "st2", staffName: "Liam Carter", customerId: "c2", customerName: "Riley Chen", customerEmail: "riley@mail.com", date: offset(0), time: "11:30", duration: 60, price: 95, status: "pending" },
  { id: "a3", serviceId: "s4", serviceName: "Facial — Glow", staffId: "st3", staffName: "Sofia Reyes", customerId: "c3", customerName: "Mia Khan", customerEmail: "mia@mail.com", date: offset(0), time: "14:00", duration: 50, price: 85, status: "confirmed" },
  { id: "a4", serviceId: "s2", serviceName: "Color Treatment", staffId: "st1", staffName: "Ava Mitchell", customerId: "c4", customerName: "Sam Rivera", customerEmail: "sam@mail.com", date: offset(1), time: "09:30", duration: 120, price: 140, status: "confirmed" },
  { id: "a5", serviceId: "s6", serviceName: "Beard Trim", staffId: "st4", staffName: "Noah Patel", customerId: "c5", customerName: "Alex Park", customerEmail: "alex@mail.com", date: offset(2), time: "16:00", duration: 25, price: 28, status: "pending" },
  { id: "a6", serviceId: "s5", serviceName: "Manicure & Polish", staffId: "st3", staffName: "Sofia Reyes", customerId: "c1", customerName: "Jordan Lee", customerEmail: "jordan@mail.com", date: offset(-3), time: "13:00", duration: 40, price: 38, status: "completed" },
  { id: "a7", serviceId: "s1", serviceName: "Hair Cut & Style", staffId: "st4", staffName: "Noah Patel", customerId: "c6", customerName: "Taylor Brooks", customerEmail: "taylor@mail.com", date: offset(-7), time: "11:00", duration: 45, price: 55, status: "completed" },
  { id: "a8", serviceId: "s3", serviceName: "Deep Tissue Massage", staffId: "st2", staffName: "Liam Carter", customerId: "c7", customerName: "Jamie Wu", customerEmail: "jamie@mail.com", date: offset(-10), time: "15:00", duration: 60, price: 95, status: "cancelled" },
  { id: "a9", serviceId: "s4", serviceName: "Facial — Glow", staffId: "st3", staffName: "Sofia Reyes", customerId: "c1", customerName: "Jordan Lee", customerEmail: "jordan@mail.com", date: offset(5), time: "10:30", duration: 50, price: 85, status: "confirmed" },
  { id: "a10", serviceId: "s1", serviceName: "Hair Cut & Style", staffId: "st1", staffName: "Ava Mitchell", customerId: "c8", customerName: "Drew Park", customerEmail: "drew@mail.com", date: offset(3), time: "13:30", duration: 45, price: 55, status: "pending" },
];

export const stats = {
  totalAppointments: 1284,
  totalCustomers: 432,
  totalStaff: staff.length,
  totalServices: services.length,
  revenueThisMonth: 24580,
};

export const statusStyles: Record<AppointmentStatus, string> = {
  pending: "bg-warning/15 text-warning-foreground border-warning/30",
  confirmed: "bg-info/15 text-[color:var(--info)] border-info/30",
  completed: "bg-success/15 text-[color:var(--success)] border-success/30",
  cancelled: "bg-destructive/15 text-destructive border-destructive/30",
};

export const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
];
