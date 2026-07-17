import { Calendar, CheckCircle2, Clock, TrendingUp } from "lucide-react";

interface TodaySummaryProps {
  total: number;
  completed: number;
  pending: number;
  upcoming: number;
}

export default function TodaySummary({ total, completed, pending, upcoming }: TodaySummaryProps) {
  return (
    <div>
      <h2 className="text-lg font-bold text-slate-800 mb-3">Today's Summary</h2>
      <div className="grid grid-cols-2 gap-3.5">
        {/* Appointments Count */}
        <div className="bg-slate-50/50 hover:bg-slate-50 p-4 rounded-2xl border border-slate-200/50 flex flex-col gap-2.5 transition-all">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Calendar size={16} />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-slate-800 leading-none">{total}</span>
            <span className="text-[9px] font-bold text-slate-400 block tracking-wider uppercase mt-1">
              Appointments
            </span>
          </div>
        </div>

        {/* Completed Count */}
        <div className="bg-slate-50/50 hover:bg-slate-50 p-4 rounded-2xl border border-slate-200/50 flex flex-col gap-2.5 transition-all">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
            <CheckCircle2 size={16} />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-slate-800 leading-none">{completed}</span>
            <span className="text-[9px] font-bold text-slate-400 block tracking-wider uppercase mt-1">
              Completed
            </span>
          </div>
        </div>

        {/* Pending Count */}
        <div className="bg-slate-50/50 hover:bg-slate-50 p-4 rounded-2xl border border-slate-200/50 flex flex-col gap-2.5 transition-all">
          <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
            <Clock size={16} />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-slate-800 leading-none">{pending}</span>
            <span className="text-[9px] font-bold text-slate-400 block tracking-wider uppercase mt-1">
              Pending
            </span>
          </div>
        </div>

        {/* Upcoming Count */}
        <div className="bg-slate-50/50 hover:bg-slate-50 p-4 rounded-2xl border border-slate-200/50 flex flex-col gap-2.5 transition-all">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
            <TrendingUp size={16} />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-slate-800 leading-none">{upcoming}</span>
            <span className="text-[9px] font-bold text-slate-400 block tracking-wider uppercase mt-1">
              Upcoming
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
