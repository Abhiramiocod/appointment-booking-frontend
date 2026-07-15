import { ArrowRight, Clock, UserCog } from "lucide-react";

export default function QuickActions() {
  return (
    <div>
      <h2 className="text-lg font-bold text-slate-800 mb-3">Quick Actions</h2>
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2.5">
        <button className="w-full flex items-center justify-between p-3.5 bg-indigo-600 text-white rounded-xl shadow-md shadow-indigo-100 hover:bg-indigo-700 transition-colors group">
          <span className="text-sm font-semibold">View Appointments</span>
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
        <button className="w-full flex items-center justify-between p-3.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
          <span className="text-sm">Update Working Hours</span>
          <Clock size={18} className="text-slate-400" />
        </button>
        <button className="w-full flex items-center justify-between p-3.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
          <span className="text-sm">Edit Profile</span>
          <UserCog size={18} className="text-slate-400" />
        </button>
      </div>
    </div>
  );
}
