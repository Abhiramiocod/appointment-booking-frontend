import { useState, useEffect } from "react";
import { MoreVertical, Eye, Trash2 } from "lucide-react";
import StatusBadge from "../../Admin/Appointments/StatusBadge";

interface ActivityItem {
  id: number;
  date: string;
  staff: string;
  service: string;
  status: "completed" | "cancelled" | "pending" | "confirmed" | "rejected" | "reschedule_requested";
  rawAppt: any;
}

interface ActivityProps {
  activity: ActivityItem[];
  onViewDetails: (appt: any) => void;
  onCancel: (id: number) => void;
}

export default function RecentActivity({ activity, onViewDetails, onCancel }: ActivityProps) {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  useEffect(() => {
    const handleOutsideClick = () => setOpenDropdownId(null);
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div className="lg:col-span-8 bg-white/70 backdrop-blur-xl border border-white/40 shadow-sm rounded-2xl p-6 sm:p-8 overflow-visible">
      <div className="flex justify-between items-center mb-8">
        <h4 className="font-bold text-xl">Recent Activity</h4>
      </div>
      <div className="overflow-visible">
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
            {activity.map((row) => {
              const showCancelBtn = row.status.toLowerCase() === "pending" || row.status.toLowerCase() === "confirmed";

              return (
                <tr
                  key={row.id}
                  className="group hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-5 font-medium text-sm whitespace-nowrap">
                    {row.date ? row.date.split("T")[0] : ""}
                  </td>
                  <td className="py-5">
                    <div className="flex items-center gap-2 text-slate-500 text-sm whitespace-nowrap">
                      <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center font-bold text-[9px] text-indigo-600 border border-indigo-100/50">
                        {row.staff.charAt(0)}
                      </div>
                      {row.staff}
                    </div>
                  </td>
                  <td className="py-5 text-sm whitespace-nowrap text-slate-700">
                    {row.service}
                  </td>
                  <td className="py-5">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="py-5 text-right relative overflow-visible">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdownId(openDropdownId === row.id ? null : row.id);
                      }}
                      className="p-2 rounded-lg hover:bg-slate-100 transition-colors opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus:opacity-100"
                    >
                      <MoreVertical size={18} className="text-slate-400" />
                    </button>

                    {/* Action Dropdown Menu */}
                    {openDropdownId === row.id && (
                      <div className="absolute right-0 mt-1.5 w-40 bg-white border border-slate-200/80 rounded-xl shadow-lg p-1.5 z-30 text-left animate-scale-in">
                        <button
                          type="button"
                          onClick={() => onViewDetails(row.rawAppt)}
                          className="w-full px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg flex items-center gap-2 transition-colors"
                        >
                          <Eye size={13} />
                          View Details
                        </button>
                        {showCancelBtn && (
                          <button
                            type="button"
                            onClick={() => onCancel(row.id)}
                            className="w-full px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2 transition-colors"
                          >
                            <Trash2 size={13} />
                            Cancel booking
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
