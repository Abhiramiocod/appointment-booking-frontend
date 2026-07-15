import { Clock, User } from "lucide-react";

export default function FeaturedCard() {
  return (
    <div className="lg:col-span-8 bg-white/70 backdrop-blur-xl border border-white/40 shadow-sm rounded-3xl p-8 relative flex flex-col justify-between min-h-[320px]">
      <span className="absolute top-8 right-8 px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-semibold tracking-wide border border-emerald-200 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        CONFIRMED
      </span>

      <div className="flex gap-6 sm:gap-8 items-start">
        <div className="w-24 h-24 rounded-2xl bg-indigo-100 shadow-lg border-2 border-white/50 flex items-center justify-center font-bold text-indigo-600 text-2xl shrink-0">
          SJ
        </div>
        <div>
          <p className="text-xs font-semibold tracking-widest text-indigo-600 mb-2">
            NEXT APPOINTMENT
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold">
            Signature Haircut &amp; Styling
          </h3>
          <div className="flex flex-wrap items-center gap-6 mt-4 text-slate-500 text-sm">
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>Sarah Jenkins</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>45 min</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 bg-slate-50/60 p-6 rounded-2xl border border-slate-200">
        <div className="flex flex-col">
          <span className="text-xs font-semibold tracking-wide text-slate-400">
            DATE
          </span>
          <span className="font-bold">Oct 24, 2023</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold tracking-wide text-slate-400">
            TIME
          </span>
          <span className="font-bold">10:00 AM</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold tracking-wide text-slate-400">
            LOCATION
          </span>
          <span className="font-bold">Studio Aura, NY</span>
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors">
          View Details
        </button>
        <button className="text-slate-500 hover:text-red-600 hover:bg-red-50 px-6 py-3 rounded-xl transition-colors font-medium">
          Cancel Appointment
        </button>
      </div>
    </div>
  );
}
