import { X, CalendarDays, User, Scissors, Star, AlignLeft, Info } from "lucide-react";

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

interface AppointmentDetailsModalProps {
  appt: Appointment;
  onClose: () => void;
  statusStyles: Record<string, string>;
}

export default function AppointmentDetailsModal({
  appt,
  onClose,
  statusStyles,
}: AppointmentDetailsModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ backgroundColor: "rgba(27, 27, 35, 0.25)", backdropFilter: "blur(5px)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={16} />
        </button>

        <div className="border-b border-slate-100 pb-4 mb-5">
          <h3 className="text-lg font-bold text-slate-800">Appointment Details</h3>
          <p className="text-slate-400 text-xs mt-0.5">Summary of booking item.</p>
        </div>

        <div className="space-y-6 text-xs text-slate-600">
          {/* Status */}
          <div className="flex justify-between items-center bg-slate-50/50 p-3 rounded-2xl border border-slate-100">
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Current Status</span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                statusStyles[appt.status.toLowerCase()] || "bg-slate-100 text-slate-500"
              }`}
            >
              {appt.status}
            </span>
          </div>

          {/* Details list */}
          <div className="space-y-3.5">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                <Scissors size={14} />
              </div>
              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Service</label>
                <p className="font-bold text-slate-800 text-sm leading-snug">{appt.service?.name}</p>
                <p className="text-[10px] text-slate-400">{appt.service?.duration} Min • ${appt.service?.price}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                <User size={14} />
              </div>
              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Specialist</label>
                <p className="font-bold text-slate-800">{appt.staff?.name}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                <CalendarDays size={14} />
              </div>
              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Date & Time</label>
                <p className="font-bold text-slate-800">{appt.appointment_date} at {appt.start_time.substring(0, 5)}</p>
              </div>
            </div>

            {appt.notes && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                  <AlignLeft size={14} />
                </div>
                <div className="flex-1">
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Customer Notes</label>
                  <p className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-slate-700 leading-relaxed italic">{appt.notes}</p>
                </div>
              </div>
            )}
          </div>

          {/* Conditional items: Rejection, Reschedule, Review */}
          {appt.rejection_reason && (
            <div className="p-3.5 bg-red-50/50 border border-red-100 rounded-2xl flex gap-2.5">
              <Info size={14} className="text-red-500 shrink-0 mt-0.5" />
              <div>
                <label className="block text-[9px] font-bold text-red-500 uppercase tracking-wider mb-0.5">Rejection Reason</label>
                <p className="text-red-700 leading-normal">{appt.rejection_reason}</p>
              </div>
            </div>
          )}

          {appt.status.toLowerCase() === "reschedule_requested" && (
            <div className="p-3.5 bg-indigo-50/50 border border-indigo-100 rounded-2xl space-y-2">
              <div className="flex gap-2">
                <Info size={14} className="text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <label className="block text-[9px] font-bold text-indigo-600 uppercase tracking-wider mb-0.5">Reschedule Proposes</label>
                  <p className="font-bold text-slate-800">{appt.proposed_date} at {appt.proposed_time}</p>
                  {appt.proposed_note && <p className="text-slate-500 mt-1 italic">"{appt.proposed_note}"</p>}
                </div>
              </div>
            </div>
          )}

          {appt.review && (
            <div className="border-t border-slate-100 pt-4 space-y-2.5">
              <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Your Review</label>
              <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100 space-y-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      className={
                        star <= (appt.review?.rating || 0)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-slate-200"
                      }
                    />
                  ))}
                </div>
                {appt.review.review && <p className="text-slate-500 italic">"{appt.review.review}"</p>}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-5 border-t border-slate-100 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
