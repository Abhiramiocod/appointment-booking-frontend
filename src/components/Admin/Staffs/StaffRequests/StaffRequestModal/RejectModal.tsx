import { X } from "lucide-react";
import { Colors } from "../../../../../lib/utils";

interface RejectModalProps {
  modal: any;
  closeModal: () => void;
  confirmReject: (request: any) => void;
  rejectNote: string;
  setRejectNote: (note: string) => void;
}

export default function RejectModal({
  modal,
  closeModal,
  confirmReject,
  rejectNote,
  setRejectNote,
}: RejectModalProps) {
  if (!modal || modal.type !== "reject") return null;

  const r = modal.request;

  return (
    <div
      className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "rgba(186,26,26,0.1)" }}
        >
          <X size={18} style={{ color: Colors.error }} />
        </div>
        <h3
          className="text-xl font-bold"
          style={{ color: Colors.onSurface }}
        >
          Reject Application
        </h3>
      </div>
      <p
        className="text-sm mb-5"
        style={{ color: Colors.onSurfaceVariant }}
      >
        Please provide a reason for rejecting{" "}
        <span className="font-semibold" style={{ color: Colors.onSurface }}>
          {r?.name}
        </span>
        's application. This may be shared with the applicant.
      </p>
      <textarea
        value={rejectNote}
        onChange={(e) => setRejectNote(e.target.value)}
        className="w-full h-32 rounded-xl p-4 text-sm mb-5 border focus:outline-none focus:ring-2 resize-none"
        style={{
          backgroundColor: Colors.surfaceContainer,
          borderColor: "rgba(199,196,215,0.4)",
        }}
        placeholder="e.g., Missing valid certification documents"
      />
      <div className="flex gap-3">
        <button
          onClick={closeModal}
          className="flex-1 py-3 font-medium rounded-xl hover:bg-slate-50 transition-colors"
          style={{ color: Colors.onSurfaceVariant }}
        >
          Keep Pending
        </button>
        <button
          onClick={() => confirmReject(r)}
          className="flex-1 py-3 text-white rounded-xl font-medium shadow-lg transition-all active:scale-95"
          style={{ backgroundColor: Colors.error }}
        >
          Confirm Rejection
        </button>
      </div>
    </div>
  );
}