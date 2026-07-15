import { Loader2 } from "lucide-react";
import type { Appointment } from "../../../lib/Customers/appointments";

interface RejectModalProps {
  rejectingAppt: Appointment;
  rejectionReason: string;
  setRejectionReason: (reason: string) => void;
  handleReject: () => void;
  submittingReject: boolean;
  onClose: () => void;
}

export default function RejectModal({
  rejectingAppt,
  rejectionReason,
  setRejectionReason,
  handleReject,
  submittingReject,
  onClose,
}: RejectModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{
        backgroundColor: "rgba(27,27,35,0.25)",
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-bold text-slate-800 text-lg mb-2">
          Reject Appointment
        </h3>
        <p className="text-slate-500 text-xs mb-4">
          Are you sure you want to reject the booking for{" "}
          <span className="font-semibold text-slate-700">
            {rejectingAppt.customer?.name}
          </span>
          ?
        </p>

        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Rejection Reason (Optional)
        </label>
        <textarea
          value={rejectionReason}
          onChange={(e) => setRejectionReason(e.target.value)}
          placeholder="Provide a reason for the rejection..."
          className="w-full bg-slate-50/50 rounded-lg px-3.5 py-2.5 text-xs border focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[80px] mb-4"
        />

        <div className="flex justify-end gap-2.5">
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleReject}
            type="button"
            disabled={submittingReject}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            {submittingReject && (
              <Loader2 size={12} className="animate-spin" />
            )}
            Reject Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
