import { Clock, User, Scissors, Calendar, MapPin, Eye, Trash2, CalendarPlus } from "lucide-react";
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
      <div className="lg:col-span-8 bg-white border border-slate-200 shadow-sm rounded-3xl p-6 relative flex flex-col justify-center items-center text-center min-h-[220px]">
        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4">
          <CalendarPlus size={22} />
        </div>
        <h3 className="font-bold text-slate-800 text-base mb-1">No Upcoming Sessions</h3>
        <p className="text-slate-500 text-xs max-w-sm mb-5">
          Schedule your next premium care session with our design specialists.
        </p>
        <button
          onClick={() => navigate("/customer/book")}
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-indigo-700 transition-colors shadow-md"
        >
          Book Appointment
        </button>
      </div>
    );
  }

  const isConfirmed = appt.status.toLowerCase() === "confirmed";

  return (
    <div className="lg:col-span-8 bg-white border border-slate-200 shadow-sm rounded-3xl p-6 relative flex flex-col justify-between min-h-[240px]">
      <span
        className={`absolute top-6 right-6 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider flex items-center gap-1.5 border ${
          isConfirmed
            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
            : "bg-indigo-50 text-indigo-600 border-indigo-200"
        }`}
      >
        <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isConfirmed ? "bg-emerald-500" : "bg-indigo-500"}`} />
        {appt.status}
      </span>

      <div className="flex gap-4 items-start">
        <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center font-bold text-indigo-600 text-lg shrink-0">
          {appt.staff?.name.charAt(0) || "S"}
        </div>
        <div>
          <p className="text-[9px] font-bold tracking-wider text-indigo-600 mb-1">
            NEXT APPOINTMENT
          </p>
          <h3 className="text-lg font-bold text-slate-800 leading-snug">
            {appt.service?.name}
          </h3>
          <div className="flex flex-wrap items-center gap-4 mt-2 text-slate-500 text-xs">
            <div className="flex items-center gap-1.5">
              <User size={13} className="text-slate-400" />
              <span>{appt.staff?.name}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={13} className="text-slate-400" />
              <span>{appt.service?.duration} min</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-5 bg-slate-50/50 p-4 rounded-xl border border-slate-100/80 text-xs">
        <div className="flex flex-col">
          <span className="text-[9px] font-bold text-slate-400 uppercase">DATE</span>
          <span className="font-bold text-slate-700 mt-0.5">{appt.appointment_date}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] font-bold text-slate-400 uppercase">TIME</span>
          <span className="font-bold text-slate-700 mt-0.5">{appt.start_time.substring(0, 5)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] font-bold text-slate-400 uppercase">LOCATION</span>
          <span className="font-bold text-slate-700 mt-0.5">Studio Aura</span>
        </div>
      </div>

      <div className="flex gap-3 mt-5 border-t border-slate-100 pt-4">
        <button
          onClick={() => onViewDetails(appt)}
          className="px-4 py-2 border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50/30 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all"
        >
          <Eye size={13} />
          View Details
        </button>
        <button
          onClick={() => onCancel(appt.id)}
          className="px-4 py-2 border border-transparent text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all"
        >
          <Trash2 size={13} />
          Cancel Appointment
        </button>
      </div>
    </div>
  );
}
