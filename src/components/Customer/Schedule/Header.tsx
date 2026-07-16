import { Calendar, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Calendar size={18} />
          </div>
          My Schedule
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          View and manage your upcoming bookings or book a new session.
        </p>
      </div>
      <button
        onClick={() => navigate("/customer/book")}
        className="px-4 py-3 text-white rounded-lg text-xs font-semibold transition-all active:scale-95 flex items-center gap-1.5 shadow-sm hover:shadow-indigo-100 hover:brightness-105"
        style={{
          background: "linear-gradient(135deg, #4648d4, #6366f1)",
        }}
      >
        <Plus size={14} />
        Book New Appointment
      </button>
    </section>
  );
}
