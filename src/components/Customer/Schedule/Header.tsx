import { Calendar, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-2xs">
            <Calendar size={20} />
          </div>
          My Appointments
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-1.5 leading-relaxed max-w-xl">
          Manage your upcoming bookings, review previous appointments, and keep track of your schedule.
        </p>
      </div>
      <button
        onClick={() => navigate("/customer/book")}
        className="px-4.5 py-2.5 text-white rounded-xl text-xs font-bold transition-all active:scale-95 flex items-center gap-2 shadow-sm bg-blue-600 hover:bg-blue-700 self-start sm:self-auto"
      >
        <Plus size={15} />
        Book Appointment
      </button>
    </section>
  );
}
