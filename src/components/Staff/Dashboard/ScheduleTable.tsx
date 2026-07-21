import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";

interface ScheduleRow {
  time: string;
  name: string;
  initials: string;
  avatarBg: string;
  avatarColor: string;
  service: string;
  status: string;
}

export default function ScheduleTable({ schedule }: { schedule: ScheduleRow[] }) {
  const hasSchedule = schedule && schedule.length > 0;

  // Format YYYY-MM-DD time string (e.g. "09:00") into time and period (AM/PM)
  const formatTimeDetail = (timeStr: string) => {
    const [hoursStr, minutesStr] = timeStr.split(":");
    let hours = parseInt(hoursStr);
    const minutes = minutesStr || "00";
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    return {
      time: `${formattedHours}:${minutes}`,
      period,
    };
  };

  const getStatusStyle = (statusStr: string) => {
    const status = statusStr.toLowerCase();
    if (status === "confirmed" || status === "approved") {
      return "bg-emerald-50 text-emerald-700 border border-emerald-100/60";
    }
    if (status === "pending") {
      return "bg-amber-50 text-amber-700 border border-amber-100/60";
    }
    return "bg-slate-100 text-slate-600 border border-slate-200/50";
  };

  return (
    <div className="lg:col-span-8 flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-slate-800">Today's Schedule</h2>
        <Link
          to="/staff/schedule"
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          View All
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/50 shadow-sm p-6 flex flex-col justify-between flex-1 min-h-[360px]">
        {!hasSchedule ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center my-auto">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500 mb-3.5">
              <CalendarDays size={22} />
            </div>
            <h3 className="font-bold text-slate-800 text-sm">No Appointments Today</h3>
            <p className="text-slate-500 text-xs mt-1 max-w-xs">
              Your schedule is completely clear for today. Take some time to relax!
            </p>
          </div>
        ) : (
          <div className="space-y-0 flex-1 flex flex-col justify-between">
            {/* Timeline List */}
            <div className="space-y-0.5">
              {schedule.map((row, index) => {
                const { time, period } = formatTimeDetail(row.time);
                return (
                  <div key={`${row.name}-${index}`} className="flex items-stretch gap-4">
                    {/* Time Column */}
                    <div className="flex flex-col text-right min-w-[56px] justify-center py-2">
                      <span className="font-bold text-slate-800 text-sm">{time}</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        {period}
                      </span>
                    </div>

                    {/* Timeline Node & Line */}
                    <div className="flex flex-col items-center shrink-0 w-4">
                      <div className="w-4 flex items-center justify-center h-full">
                        <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 ring-4 ring-indigo-50 z-10 shrink-0"></div>
                      </div>
                      {index < schedule.length - 1 && (
                        <div className="w-0.5 bg-indigo-100 flex-1 -my-2 min-h-[28px]"></div>
                      )}
                    </div>

                    {/* Card Content Column */}
                    <div className="flex-1 flex items-center justify-between p-3.5 bg-slate-50/50 hover:bg-slate-50 rounded-2xl border border-slate-100/50 transition-all mb-3 ml-1">
                      <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                            row.avatarBg || "bg-indigo-50"
                          } ${row.avatarColor || "text-indigo-600"}`}
                        >
                          {row.initials}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm leading-tight">
                            {row.name}
                          </h4>
                          <p className="text-xs text-slate-400 mt-0.5">{row.service}</p>
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.75 rounded-full uppercase tracking-wide shrink-0 ${getStatusStyle(
                          row.status
                        )}`}
                      >
                        {row.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* View Full Schedule Action */}
            <div className="mt-4">
              <Link
                to="/staff/schedule"
                className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-50/50 hover:bg-indigo-50 text-indigo-600 hover:text-indigo-700 font-bold text-xs rounded-2xl border border-indigo-100/60 transition-all active:scale-98"
              >
                <CalendarDays size={14} />
                View Full Schedule
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
