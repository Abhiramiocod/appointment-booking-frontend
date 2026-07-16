import { Clock, Loader2, Trash2, Eye, Star } from "lucide-react";

interface Appointment {
  id: number;
  appointment_date: string;
  start_time: string;
  status: string;
  notes?: string;
  rejection_reason?: string;
  proposed_date?: string;
  proposed_time?: string;
  proposed_note?: string;
  service?: {
    id: number;
    name: string;
    price: string;
    duration: number;
  };
  staff?: {
    id: number;
    name: string;
  };
  review?: {
    rating: number;
    review?: string;
  };
}

interface AppointmentListProps {
  loading: boolean;
  filtered: Appointment[];
  getMonthAbbr: (dateStr: string) => string;
  getDayNum: (dateStr: string) => string;
  handleCancel: (id: number) => Promise<void>;
  cancellingId: number | null;
  statusStyles: Record<string, string>;
  onViewDetails: (appt: Appointment) => void;
  onLeaveReview: (id: number) => void;
}

export default function AppointmentList({
  loading,
  filtered,
  getMonthAbbr,
  getDayNum,
  handleCancel,
  cancellingId,
  statusStyles,
  onViewDetails,
  onLeaveReview,
}: AppointmentListProps) {
  return (
    <>
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-indigo-600" size={28} />
        </div>
      ) : (
        <div className="space-y-3.5">
          {filtered.length > 0 ? (
            filtered.map((appt) => {
              const isInactive = appt.status.toLowerCase() === "completed" || appt.status.toLowerCase() === "cancelled" || appt.status.toLowerCase() === "rejected";
              const showCancelBtn = appt.status.toLowerCase() === "pending" || appt.status.toLowerCase() === "confirmed";
              const isCompleted = appt.status.toLowerCase() === "completed";
              const isReviewed = !!appt.review;

              return (
                <div
                  key={appt.id}
                  className={`bg-white p-4.5 rounded-xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:shadow-md ${
                    isInactive ? "opacity-90 bg-slate-50/50" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center shrink-0 border ${
                        isInactive
                          ? "bg-slate-100 text-slate-500 border-slate-200/50"
                          : "bg-indigo-50/70 text-indigo-600 border-indigo-100/50"
                      }`}
                    >
                      <span className="text-[10px] font-bold tracking-wider leading-none mb-1">
                        {getMonthAbbr(appt.appointment_date)}
                      </span>
                      <span className="text-lg font-extrabold leading-none">
                        {getDayNum(appt.appointment_date)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm leading-snug">
                        {appt.service?.name || "Styling Session"}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span>with {appt.staff?.name || "Specialist"}</span>
                        <span className="text-slate-300">•</span>
                        <span className="flex items-center gap-1">
                          <Clock size={11} /> {appt.start_time.substring(0, 5)} ({appt.service?.duration || 30} min)
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="font-bold text-indigo-600">${appt.service?.price || "0.00"}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-3 sm:pt-0">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        statusStyles[appt.status.toLowerCase()] || "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {appt.status}
                    </span>

                    <div className="flex items-center gap-2">
                      {/* View Details Action */}
                      <button
                        onClick={() => onViewDetails(appt)}
                        className="px-3 py-1.5 border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50/30 rounded-lg font-semibold text-xs flex items-center gap-1 transition-all"
                        title="View Details"
                      >
                        <Eye size={12} />
                        Details
                      </button>

                      {/* Review Actions */}
                      {isCompleted && (
                        <>
                          {!isReviewed ? (
                            <button
                              onClick={() => onLeaveReview(appt.id)}
                              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold text-xs flex items-center gap-1 shadow-sm transition-all"
                            >
                              <Star size={12} className="fill-white" />
                              Leave Review
                            </button>
                          ) : (
                            <button
                              onClick={() => onViewDetails(appt)}
                              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg font-semibold text-xs flex items-center gap-1 transition-all"
                            >
                              <Star size={12} className="fill-yellow-500 text-yellow-500" />
                              View Review
                            </button>
                          )}
                        </>
                      )}

                      {/* Cancel Action */}
                      {showCancelBtn && (
                        <button
                          onClick={() => handleCancel(appt.id)}
                          disabled={cancellingId === appt.id}
                          className="p-1.5 text-slate-400 hover:text-red-600 transition-colors border border-transparent hover:border-red-100 hover:bg-red-50 rounded-lg disabled:opacity-50"
                          title="Cancel Appointment"
                        >
                          {cancellingId === appt.id ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <Trash2 size={14} />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border border-slate-200/80 shadow-sm">
              <p className="text-slate-400 italic text-sm">No appointments in this view.</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
