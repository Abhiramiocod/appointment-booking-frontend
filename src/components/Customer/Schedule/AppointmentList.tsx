import { Clock, Loader2, Trash2, Eye, Star, User, Calendar } from "lucide-react";

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
          <Loader2 className="animate-spin text-blue-600" size={32} />
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.length > 0 ? (
            filtered.map((appt) => {
              const statusLower = appt.status.toLowerCase();
              const isCompleted = statusLower === "completed";
              const isCancelled = statusLower === "cancelled" || statusLower === "rejected";
              const isUpcoming = statusLower === "pending" || statusLower === "confirmed" || statusLower === "reschedule_requested";
              const isReviewed = !!appt.review;

              return (
                <div
                  key={appt.id}
                  className={`bg-white/90 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-5 transition-all hover:shadow-md hover:border-slate-300 ${
                    isCancelled ? "opacity-85 bg-slate-50/60" : ""
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-4.5">
                    <div
                      className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center shrink-0 border shadow-2xs ${
                        isCancelled
                          ? "bg-slate-100 text-slate-500 border-slate-200/60"
                          : "bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 border-blue-100/80"
                      }`}
                    >
                      <span className="text-[10px] font-extrabold tracking-wider leading-none mb-1 uppercase">
                        {getMonthAbbr(appt.appointment_date)}
                      </span>
                      <span className="text-xl font-extrabold leading-none">
                        {getDayNum(appt.appointment_date)}
                      </span>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-extrabold text-slate-900 text-base sm:text-lg leading-snug">
                          {appt.service?.name || "Service Session"}
                        </h4>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            statusStyles[statusLower] || "bg-slate-100 text-slate-600 border border-slate-200"
                          }`}
                        >
                          {appt.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-600 text-xs pt-0.5">
                        <div className="flex items-center gap-1.5 font-semibold">
                          <User size={13} className="text-slate-400" />
                          <span>{appt.staff?.name || "Specialist"}</span>
                        </div>
                        <span className="text-slate-300 hidden sm:inline">•</span>
                        <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                          <Clock size={13} className="text-slate-400" />
                          <span>{appt.start_time.substring(0, 5)} ({appt.service?.duration || 30} min)</span>
                        </div>
                        <span className="text-slate-300 hidden sm:inline">•</span>
                        <div className="font-extrabold text-blue-600">
                          ${appt.service?.price || "0.00"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 justify-end">
                    {/* View Details - Always shown */}
                    <button
                      onClick={() => onViewDetails(appt)}
                      className="px-3.5 py-2 border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50/50 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 shadow-2xs"
                    >
                      <Eye size={14} />
                      View Details
                    </button>

                    {/* Completed Appt Actions */}
                    {isCompleted && (
                      <>
                        {!isReviewed ? (
                          <button
                            onClick={() => onLeaveReview(appt.id)}
                            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
                          >
                            <Star size={14} className="fill-white" />
                            Leave Review
                          </button>
                        ) : (
                          <button
                            onClick={() => onViewDetails(appt)}
                            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all"
                          >
                            <Star size={14} className="fill-amber-400 text-amber-400" />
                            View Review
                          </button>
                        )}
                      </>
                    )}

                    {/* Upcoming Appt Actions */}
                    {isUpcoming && (
                      <button
                        onClick={() => handleCancel(appt.id)}
                        disabled={cancellingId === appt.id}
                        className="px-3.5 py-2 text-rose-600 hover:bg-rose-50 border border-rose-200/60 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-50"
                      >
                        {cancellingId === appt.id ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Trash2 size={14} />
                        )}
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 bg-white/80 backdrop-blur rounded-2xl border border-slate-200/80 shadow-sm">
              <Calendar size={32} className="mx-auto text-slate-300 mb-3" />
              <p className="text-slate-600 font-bold text-base mb-1">No appointments found</p>
              <p className="text-slate-400 text-xs">There are no bookings matching your selected view.</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

