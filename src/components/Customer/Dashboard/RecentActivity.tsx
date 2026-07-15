import { MoreVertical } from "lucide-react";
import StatusBadge from "../../Admin/Appointments/StatusBadge";

interface ActivityProps {
  activity: {
    date: string;
    staff: string;
    service: string;
    status: "completed" | "cancelled" | "pending";
  }[];
}

export default function RecentActivity({ activity }: ActivityProps) {
  return (
    <div className="lg:col-span-8 bg-white/70 backdrop-blur-xl border border-white/40 shadow-sm rounded-2xl p-6 sm:p-8 overflow-hidden">
      <div className="flex justify-between items-center mb-8">
        <h4 className="font-bold text-xl">Recent Activity</h4>
        <button className="text-indigo-600 font-bold text-sm hover:underline">
          View All History
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="pb-4 text-[10px] font-semibold tracking-wide text-slate-400">
                DATE
              </th>
              <th className="pb-4 text-[10px] font-semibold tracking-wide text-slate-400">
                STAFF
              </th>
              <th className="pb-4 text-[10px] font-semibold tracking-wide text-slate-400">
                SERVICE
              </th>
              <th className="pb-4 text-[10px] font-semibold tracking-wide text-slate-400">
                STATUS
              </th>
              <th className="pb-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {activity.map((row, i) => (
              <tr
                key={i}
                className="group hover:bg-slate-50/50 transition-colors"
              >
                <td className="py-5 font-medium text-sm whitespace-nowrap">
                  {row.date}
                </td>
                <td className="py-5">
                  <div className="flex items-center gap-2 text-slate-500 text-sm whitespace-nowrap">
                    <div className="w-6 h-6 rounded-full bg-slate-200" />
                    {row.staff}
                  </div>
                </td>
                <td className="py-5 text-sm whitespace-nowrap">
                  {row.service}
                </td>
                <td className="py-5">
                  <StatusBadge status={row.status} />
                </td>
                <td className="py-5 text-right">
                  <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical size={18} className="text-slate-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
