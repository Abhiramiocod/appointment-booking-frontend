import { useState, useEffect } from "react";
import { MoreVertical, Eye, Trash2, Calendar } from "lucide-react";
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
    document.removeEventListener("click", handleOutsideClick);
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div className="w-full bg-white/80 backdrop-blur-xl border border-slate-200/80 shadow-sm rounded-2xl p-6 sm:p-7 overflow-visible transition-all hover:shadow-md h-fit">
      <div className="flex justify-between items-center mb-5">
        <h4 className="font-extrabold text-slate-800 text-lg tracking-tight flex items-center gap-2">
          <Calendar size={18} className="text-blue-600" />
          Recent Activity
        </h4>
        <span className="text-xs text-slate-400 font-semibold">{activity.length} Entries</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200/80">
              <th className="pb-3 text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
                DATE
              </th>
              <th className="pb-3 text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
                STAFF
              </th>
              <th className="pb-3 text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
                SERVICE
              </th>
              <th className="pb-3 text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
                STATUS
              </th>
              <th className="pb-3 w-10" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/80">
            {activity.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-6 text-center text-xs text-slate-400 font-medium">
                  No activity history found.
                </td>
              </tr>
            ) : (
              activity.map((row) => {
                const showCancelBtn = row.status.toLowerCase() === "pending" || row.status.toLowerCase() === "confirmed";

                return (
                  <tr
                    key={row.id}
                    className="group hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-3.5 font-semibold text-xs sm:text-sm text-slate-700 whitespace-nowrap">
                      {row.date ? row.date.split("T")[0] : ""}
                    </td>
                    <td className="py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-2.5 text-slate-700 font-semibold text-xs sm:text-sm">
                        <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center font-bold text-[10px] text-blue-600 border border-blue-100 shrink-0 shadow-2xs">
                          {row.staff.charAt(0)}
                        </div>
                        <span>{row.staff}</span>
                      </div>
                    </td>
                    <td className="py-3.5 text-xs sm:text-sm font-semibold whitespace-nowrap text-slate-800">
                      {row.service}
                    </td>
                    <td className="py-3.5 whitespace-nowrap">
                      <StatusBadge status={row.status} />
                    </td>
                    <td className="py-3.5 text-right relative overflow-visible">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdownId(openDropdownId === row.id ? null : row.id);
                        }}
                        className="p-1 rounded-lg hover:bg-slate-200/60 text-slate-400 hover:text-slate-700 transition-colors opacity-80 group-hover:opacity-100 focus:opacity-100"
                      >
                        <MoreVertical size={16} />
                      </button>

                      {/* Action Dropdown Menu */}
                      {openDropdownId === row.id && (
                        <div className="absolute right-0 mt-1 w-44 bg-white border border-slate-200/80 rounded-xl shadow-lg p-1.5 z-30 text-left animate-fadeIn">
                          <button
                            type="button"
                            onClick={() => onViewDetails(row.rawAppt)}
                            className="w-full px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg flex items-center gap-2 transition-colors"
                          >
                            <Eye size={14} />
                            View Details
                          </button>
                          {showCancelBtn && (
                            <button
                              type="button"
                              onClick={() => onCancel(row.id)}
                              className="w-full px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-2 transition-colors"
                            >
                              <Trash2 size={14} />
                              Cancel booking
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

