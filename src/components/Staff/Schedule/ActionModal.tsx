import { useState } from "react";
import { CheckCircle2, XCircle, RefreshCw, Loader2, CalendarDays, Clock, User, Scissors } from "lucide-react";
import type { Appointment } from "../../../lib/Customers/appointments";

interface ActionModalProps {
  appt: Appointment;
  onClose: () => void;
  handleApprove: (id: number) => Promise<void>;
  handleReject: (reason: string) => Promise<void>;
  handleProposeReschedule: (date: string, slot: string, note: string) => Promise<void>;
  handleCancel: (id: number) => Promise<void>;
  handleComplete: (id: number) => Promise<void>;
  confirmingId: number | null;
  submittingReject: boolean;
  submittingReschedule: boolean;
  slots: string[];
  slotsLoading: boolean;
  rescheduleDate: string;
  setRescheduleDate: (date: string) => void;
  rescheduleSlot: string | null;
  setRescheduleSlot: (slot: string | null) => void;
  rescheduleNote: string;
  setRescheduleNote: (note: string) => void;
}

export default function ActionModal({
  appt,
  onClose,
  handleApprove,
  handleReject,
  handleProposeReschedule,
  handleCancel,
  handleComplete,
  confirmingId,
  submittingReject,
  submittingReschedule,
  slots,
  slotsLoading,
  rescheduleDate,
  setRescheduleDate,
  rescheduleSlot,
  setRescheduleSlot,
  rescheduleNote,
  setRescheduleNote,
}: ActionModalProps) {
  // Sub-views: 'options' | 'reject' | 'reschedule' | 'cancel' | 'complete'
  const [subView, setSubView] = useState<"options" | "reject" | "reschedule" | "cancel" | "complete">("options");
  const [rejectionReason, setLocalRejectionReason] = useState("");

  const onApproveClick = async () => {
    await handleApprove(appt.id);
    onClose();
  };

  const onRejectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleReject(rejectionReason);
    setLocalRejectionReason("");
    onClose();
  };

  const onRescheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rescheduleSlot) return;
    await handleProposeReschedule(rescheduleDate, rescheduleSlot, rescheduleNote);
    onClose();
  };

  const onCancelConfirm = async () => {
    await handleCancel(appt.id);
    onClose();
  };

  const onCompleteClick = async () => {
    await handleComplete(appt.id);
    onClose();
  };

  const isConfirmed = appt.status.toLowerCase() === "confirmed";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-fade-in"
      style={{ backgroundColor: "rgba(27,27,35,0.25)", backdropFilter: "blur(5px)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-slate-100 pb-4 mb-4">
          <h3 className="font-bold text-slate-800 text-lg">Manage Appointment</h3>
          <p className="text-slate-400 text-xs mt-0.5">Choose an action for this booking request.</p>
        </div>

        {/* Appointment Overview */}
        <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-100 space-y-2 text-xs mb-5">
          <div className="flex items-center gap-2 text-slate-700">
            <User size={13} className="text-indigo-500" />
            <span className="font-bold">{appt.customer?.name || "Client"}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Scissors size={13} className="text-indigo-500" />
            <span className="font-semibold">{appt.service?.name}</span>
          </div>
          <div className="flex items-center gap-4 pt-1 border-t border-slate-200/50 mt-1">
            <div className="flex items-center gap-1.5 text-slate-500">
              <CalendarDays size={12} />
              <span>{appt.appointment_date}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500">
              <Clock size={12} />
              <span>{appt.start_time.substring(0, 5)}</span>
            </div>
          </div>
        </div>

        {/* Options View */}
        {subView === "options" && (
          <div className="space-y-2.5">
            {isConfirmed ? (
              <>
                <button
                  onClick={() => setSubView("complete")}
                  className="w-full p-3.5 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/60 rounded-xl text-emerald-800 font-bold text-sm flex items-center justify-between transition-all"
                >
                  <span className="flex items-center gap-2.5">
                    <CheckCircle2 size={18} className="text-emerald-600" />
                    Complete Appointment
                  </span>
                </button>

                <button
                  onClick={() => setSubView("cancel")}
                  className="w-full p-3.5 bg-red-50 hover:bg-red-100/80 border border-red-200/60 rounded-xl text-red-800 font-bold text-sm flex items-center justify-between transition-all"
                >
                  <span className="flex items-center gap-2.5">
                    <XCircle size={18} className="text-red-600" />
                    Cancel Appointment
                  </span>
                </button>

                <button
                  onClick={() => setSubView("reschedule")}
                  className="w-full p-3.5 bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-200/60 rounded-xl text-indigo-800 font-bold text-sm flex items-center justify-between transition-all"
                >
                  <span className="flex items-center gap-2.5">
                    <RefreshCw size={18} className="text-indigo-600" />
                    Propose New Time
                  </span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onApproveClick}
                  disabled={confirmingId === appt.id}
                  className="w-full p-3.5 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/60 rounded-xl text-emerald-800 font-bold text-sm flex items-center justify-between transition-all"
                >
                  <span className="flex items-center gap-2.5">
                    <CheckCircle2 size={18} className="text-emerald-600" />
                    Approve Appointment
                  </span>
                  {confirmingId === appt.id ? <Loader2 size={16} className="animate-spin text-emerald-600" /> : null}
                </button>

                <button
                  onClick={() => setSubView("reject")}
                  className="w-full p-3.5 bg-red-50 hover:bg-red-100/80 border border-red-200/60 rounded-xl text-red-800 font-bold text-sm flex items-center justify-between transition-all"
                >
                  <span className="flex items-center gap-2.5">
                    <XCircle size={18} className="text-red-600" />
                    Reject Appointment
                  </span>
                </button>

                <button
                  onClick={() => setSubView("reschedule")}
                  className="w-full p-3.5 bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-200/60 rounded-xl text-indigo-800 font-bold text-sm flex items-center justify-between transition-all"
                >
                  <span className="flex items-center gap-2.5">
                    <RefreshCw size={18} className="text-indigo-600" />
                    Propose New Time
                  </span>
                </button>
              </>
            )}
          </div>
        )}

        {/* Cancel Confirmation View */}
        {subView === "cancel" && (
          <div className="space-y-4">
            <p className="text-xs text-slate-500 leading-relaxed">
              Are you sure you want to cancel this confirmed appointment? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => setSubView("options")}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={onCancelConfirm}
                disabled={confirmingId === appt.id}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                {confirmingId === appt.id && <Loader2 size={12} className="animate-spin" />}
                Confirm Cancellation
              </button>
            </div>
          </div>
        )}

        {/* Complete Confirmation View */}
        {subView === "complete" && (
          <div className="space-y-4">
            <p className="text-xs text-slate-500 leading-relaxed">
              Are you sure you want to mark this appointment as completed?
            </p>

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => setSubView("options")}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onCompleteClick}
                disabled={confirmingId === appt.id}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                {confirmingId === appt.id && <Loader2 size={12} className="animate-spin" />}
                Complete Appointment
              </button>
            </div>
          </div>
        )}

        {/* Reject Sub-form */}
        {subView === "reject" && (
          <form onSubmit={onRejectSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Rejection Reason (Optional)</label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setLocalRejectionReason(e.target.value)}
                placeholder="Provide a reason to the client..."
                className="w-full bg-slate-50/50 rounded-lg px-3.5 py-2.5 text-xs border focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[90px]"
              />
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => setSubView("options")}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={submittingReject}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                {submittingReject && <Loader2 size={12} className="animate-spin" />}
                Confirm Rejection
              </button>
            </div>
          </form>
        )}

        {/* Reschedule Sub-form */}
        {subView === "reschedule" && (
          <form onSubmit={onRescheduleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Proposed Date</label>
              <input
                type="date"
                value={rescheduleDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setRescheduleDate(e.target.value)}
                className="w-full bg-slate-50/50 rounded-lg px-3.5 py-2 text-sm border focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Available Slots</span>
                {slotsLoading && <Loader2 size={12} className="animate-spin text-indigo-600" />}
              </label>
              {slotsLoading ? (
                <div className="flex justify-center py-3"><Loader2 className="animate-spin text-indigo-600" size={18} /></div>
              ) : slots.length === 0 ? (
                <p className="text-slate-400 italic text-xs">No slots available on this date. Choose another date.</p>
              ) : (
                <div className="grid grid-cols-4 gap-2 max-h-[140px] overflow-y-auto p-0.5">
                  {slots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setRescheduleSlot(slot)}
                      className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all ${
                        rescheduleSlot === slot
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Proposal Note (Optional)</label>
              <textarea
                value={rescheduleNote}
                onChange={(e) => setRescheduleNote(e.target.value)}
                placeholder="Explain why you need to reschedule..."
                className="w-full bg-slate-50/50 rounded-lg px-3.5 py-2.5 text-xs border focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[70px]"
              />
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => setSubView("options")}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={submittingReschedule || !rescheduleSlot}
                className="px-4 py-2 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, #4648d4, #6366f1)" }}
              >
                {submittingReschedule && <Loader2 size={12} className="animate-spin" />}
                Send Reschedule Proposal
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
