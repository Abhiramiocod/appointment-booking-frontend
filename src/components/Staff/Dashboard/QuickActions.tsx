import { Link } from "react-router-dom";
import { ArrowRight, Clock, UserCog, Sparkles } from "lucide-react";

export default function QuickActions() {
  return (
    <div>
      <h2 className="text-lg font-bold text-slate-800 mb-3">Quick Actions</h2>
      <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm space-y-3">
        <Link
          to="/staff/schedule"
          className="w-full flex items-center justify-between p-3.5 bg-indigo-600 text-white rounded-xl shadow-md hover:shadow-indigo-100 hover:bg-indigo-700 transition-all duration-200 active:scale-98 group"
        >
          <span className="text-sm font-semibold flex items-center gap-2">
            <Sparkles size={16} className="text-indigo-200" />
            View Appointments
          </span>
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
        <Link
          to="/staff/working-hours"
          className="w-full flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 rounded-xl transition-all duration-200 active:scale-98 text-slate-700 group"
        >
          <span className="text-sm font-semibold flex items-center gap-2">
            <Clock size={16} className="text-slate-400 group-hover:text-indigo-600 transition-colors" />
            Update Working Hours
          </span>
          <ArrowRight size={16} className="text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
        </Link>
        <Link
          to="/staff/profile"
          className="w-full flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 rounded-xl transition-all duration-200 active:scale-98 text-slate-700 group"
        >
          <span className="text-sm font-semibold flex items-center gap-2">
            <UserCog size={16} className="text-slate-400 group-hover:text-indigo-600 transition-colors" />
            Edit Profile
          </span>
          <ArrowRight size={16} className="text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
        </Link>
      </div>
    </div>
  );
}
