import { Coffee } from "lucide-react";

export default function UpcomingBreak() {
  return (
    <div>
      <h2 className="text-lg font-bold text-slate-800 mb-3">Upcoming Break</h2>
      <div className="bg-white p-5 rounded-3xl border border-slate-200/50 shadow-sm flex items-center gap-4 hover:shadow-md/5 transition-all">
        {/* Coffee Icon container */}
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
          <Coffee size={22} />
        </div>
        <div>
          <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
            Next break
          </span>
          <h4 className="font-extrabold text-slate-800 text-base leading-snug mt-0.5">
            01:00 PM – 01:30 PM
          </h4>
          <span className="text-xs text-slate-500 font-medium block mt-0.5">
            30 minutes
          </span>
        </div>
      </div>
    </div>
  );
}
