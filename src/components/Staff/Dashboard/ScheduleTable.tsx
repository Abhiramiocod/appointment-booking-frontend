import { MoreVertical } from "lucide-react";
import StatusBadge from "../../Admin/Appointments/StatusBadge";

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
  return (
    <div className="lg:col-span-8 space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800">Today's Schedule</h2>
        <button className="text-xs font-semibold text-indigo-600 hover:underline">
          View All
        </button>
      </div>
      <div className="bg-white/70 backdrop-blur-xl rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left border-b border-slate-200/60 bg-slate-50/50">
                <th className="px-4 py-3 text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
                  Time
                </th>
                <th className="px-4 py-3 text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
                  Client
                </th>
                <th className="px-4 py-3 text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
                  Service
                </th>
                <th className="px-4 py-3 text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-[11px] font-semibold tracking-wide text-slate-400 uppercase text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {schedule.map((row) => (
                <tr
                  key={row.name}
                  className="hover:bg-indigo-50/40 transition-colors"
                >
                  <td className="px-4 py-3 text-sm font-medium text-slate-700 whitespace-nowrap">
                    {row.time}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] ${row.avatarBg} ${row.avatarColor}`}
                      >
                        {row.initials}
                      </div>
                      <span className="text-sm font-semibold whitespace-nowrap">
                        {row.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">
                    {row.service}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                      <MoreVertical size={16} className="text-slate-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
