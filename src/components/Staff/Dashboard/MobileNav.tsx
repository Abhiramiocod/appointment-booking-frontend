import {
  CalendarDays,
  LayoutDashboard,
  LayoutGrid,
  Settings,
} from "lucide-react";

export default function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-xl border-t border-slate-200 px-6 flex items-center justify-between z-50">
      <a className="flex flex-col items-center gap-1 text-indigo-600" href="#">
        <LayoutDashboard size={20} />
        <span className="text-[10px] font-semibold">Home</span>
      </a>
      <a className="flex flex-col items-center gap-1 text-slate-400" href="#">
        <CalendarDays size={20} />
        <span className="text-[10px] font-semibold">Agenda</span>
      </a>
      <a className="flex flex-col items-center gap-1 text-slate-400" href="#">
        <LayoutGrid size={20} />
        <span className="text-[10px] font-semibold">Services</span>
      </a>
      <a className="flex flex-col items-center gap-1 text-slate-400" href="#">
        <Settings size={20} />
        <span className="text-[10px] font-semibold">Settings</span>
      </a>
    </nav>
  );
}
