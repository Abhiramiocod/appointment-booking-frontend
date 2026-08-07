import { Clock, User, Eye, Trash2, CalendarPlus, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Appointment {
  id: number;
  appointment_date: string;
  start_time: string;
  status: string;
  notes?: string;
  rejection_reason?: string;
  proposed_date?: string;
  proposed_time?: string;
  proposed_note?: string;
  staff?: {
    name: string;
  };
  service?: {
    name: string;
    duration: number;
    price: string;
  };
}

interface FeaturedCardProps {
  appt: Appointment | null;
  onViewDetails: (appt: Appointment) => void;
  onCancel: (id: number) => void;
}

export default function FeaturedCard({ appt, onViewDetails, onCancel }: FeaturedCardProps) {
  const navigate = useNavigate();

  if (!appt) {
    return (
      <div className="lg:col-span-8 bg-white border border-slate-200/80 shadow-sm rounded-2xl p-6 sm:p-8 relative flex flex-col justify-center items-center text-center min-h-[240px]">
        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 border border-blue-100/60 shadow-sm">
          <CalendarPlus size={24} />
        </div>
        <h3 className="font-extrabold text-slate-800 text-lg mb-1 tracking-tight">No Upcoming Sessions</h3>
        <p className="text-slate-500 text-xs sm:text-sm max-w-sm mb-6 leading-relaxed">
          Schedule your next session with our experienced specialists.
        </p>
        <button
          onClick={() => navigate("/customer/book")}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-blue-700 active:scale-95 transition-all shadow-sm"
        >
          Book Appointment
        </button>
      </div>
    );
  }

  const isConfirmed = appt.status.toLowerCase() === "confirmed";

  return (
    <div className="lg:col-span-8 bg-white border border-slate-200/80 shadow-sm rounded-2xl p-6 sm:p-7 relative flex flex-col justify-between min-h-[250px] transition-all hover:shadow-md">
      <span
        className={`absolute top-6 right-6 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 border ${
          isConfirmed
            ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
            : "bg-blue-50 text-blue-700 border-blue-200/60"
        }`}
      >
        <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isConfirmed ? "bg-emerald-500" : "bg-blue-500"}`} />
        {appt.status}
      </span>

      <div className="flex gap-4 items-start pr-24">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center font-bold text-blue-600 text-xl shrink-0 shadow-sm">
          {appt.staff?.name?.charAt(0) || "S"}
        </div>
        <div>
          <p className="text-[10px] font-extrabold tracking-widest text-blue-600 uppercase mb-1">
            UPCOMING SESSION
          </p>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight leading-snug">
            {appt.service?.name}
          </h3>
          <div className="flex flex-wrap items-center gap-4 mt-2 text-slate-500 text-xs">
            <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/60">
              <User size={13} className="text-slate-400" />
              <span className="font-semibold text-slate-700">{appt.staff?.name}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/60">
              <Clock size={13} className="text-slate-400" />
              <span className="font-semibold text-slate-700">{appt.service?.duration} min</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6 bg-slate-50/80 p-4 rounded-xl border border-slate-200/60 text-xs">
        <div className="flex flex-col">
          <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">DATE</span>
          <span className="font-bold text-slate-800 mt-1">{appt.appointment_date}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">TIME</span>
          <span className="font-bold text-slate-800 mt-1">{appt.start_time.substring(0, 5)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <MapPin size={10} className="text-blue-600" />
            LOCATION
          </span>
          <span className="font-bold text-slate-800 mt-1">Main Studio</span>
        </div>
      </div>

      <div className="flex gap-3 mt-5 border-t border-slate-100 pt-4">
        <button
          onClick={() => onViewDetails(appt)}
          className="px-4 py-2 border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50/50 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
        >
          <Eye size={14} />
          View Details
        </button>
        <button
          onClick={() => onCancel(appt.id)}
          className="px-4 py-2 border border-transparent text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95"
        >
          <Trash2 size={14} />
          Cancel Appointment
        </button>
      </div>
    </div>
  );
}

