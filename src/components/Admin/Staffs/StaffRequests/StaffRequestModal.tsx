import { X, BadgeCheck, CheckCircle2 } from "lucide-react";
import { Colors } from "../../../../lib/utils";

interface StaffRequestModalProps {
  modal: {
    type: "view" | "reject" | "success";
    request: any;
  } | null;
  closeModal: () => void;
  approve: (request: any) => void;
  confirmReject: (request: any) => void;
  rejectNote: string;
  setRejectNote: (note: string) => void;
}

export default function StaffRequestModal({
  modal,
  closeModal,
  approve,
  confirmReject,
  rejectNote,
  setRejectNote,
}: StaffRequestModalProps) {
  if (!modal) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      style={{
        backgroundColor: "rgba(27,27,35,0.2)",
        backdropFilter: "blur(4px)",
      }}
      onClick={closeModal}
    >
      {/* View Modal */}
      {modal.type === "view" && (
        <div
          className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="p-6 border-b flex justify-between items-center"
            style={{ borderColor: "rgba(199,196,215,0.2)" }}
          >
            <h3
              className="text-xl font-semibold"
              style={{ color: Colors.onSurface }}
            >
              Application Details
            </h3>
            <button
              onClick={closeModal}
              className="p-2 hover:bg-slate-100 rounded-full"
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-8 space-y-6">
            <div className="flex items-center gap-6">
              <img
                className="w-24 h-24 rounded-2xl object-cover shadow-md"
                src={modal.request.largeAvatar || modal.request.avatar}
                alt={modal.request.name}
              />
              <div>
                <h4
                  className="text-2xl font-bold"
                  style={{ color: Colors.onSurface }}
                >
                  {modal.request.name}
                </h4>
                <p style={{ color: Colors.onSurfaceVariant }}>
                  Applied for: {modal.request.role}
                </p>
                <div className="mt-2 flex gap-2 flex-wrap">
                  {modal.request.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: "rgba(70,72,212,0.1)",
                        color: Colors.primary,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <label
                  className="text-xs font-semibold tracking-wider uppercase block"
                  style={{ color: Colors.outline }}
                >
                  Bio
                </label>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: Colors.onSurface }}
                >
                  {modal.request.bio}
                </p>
              </div>
              <div className="space-y-4">
                <label
                  className="text-xs font-semibold tracking-wider uppercase block"
                  style={{ color: Colors.outline }}
                >
                  Certifications
                </label>
                <ul className="text-sm space-y-1">
                  {modal.request.certifications.map((cert: string) => (
                    <li key={cert} className="flex items-center gap-2">
                      <BadgeCheck size={16} className="text-emerald-500" />
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div
            className="p-6 border-t flex justify-end gap-3"
            style={{
              backgroundColor: "rgba(239,236,248,0.3)",
              borderColor: "rgba(199,196,215,0.2)",
            }}
          >
            <button
              onClick={closeModal}
              className="px-6 py-2.5 font-medium"
              style={{ color: Colors.onSurfaceVariant }}
            >
              Cancel
            </button>
            <button
              onClick={() => approve(modal.request)}
              className="px-6 py-2.5 text-white rounded-xl font-medium shadow-lg transition-all"
              style={{ backgroundColor: Colors.primary }}
            >
              Approve Application
            </button>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {modal.type === "success" && (
        <div
          className="bg-white rounded-xl p-8 max-w-sm w-full text-center shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={30} />
          </div>
          <h3
            className="text-xl font-bold mb-2"
            style={{ color: Colors.onSurface }}
          >
            Staff Approved!
          </h3>
          <p
            className="text-sm mb-6"
            style={{ color: Colors.onSurfaceVariant }}
          >
            A temporary login has been generated for{" "}
            <span className="font-bold" style={{ color: Colors.onSurface }}>
              {modal.request.name}
            </span>
            .
          </p>
          <div
            className="rounded-lg p-4 mb-8"
            style={{ backgroundColor: Colors.surfaceContainerHigh }}
          >
            <p
              className="text-[11px] tracking-wider uppercase mb-1"
              style={{ color: Colors.outlineVariant }}
            >
              Temporary Password
            </p>
            <p
              className="text-lg tracking-widest font-semibold"
              style={{ color: Colors.primary, fontFamily: "monospace" }}
            >
              AURA-8821-XPQ
            </p>
          </div>
          <button
            onClick={closeModal}
            className="w-full text-white py-3 rounded-xl font-medium"
            style={{ backgroundColor: Colors.onSurface }}
          >
            Done
          </button>
        </div>
      )}

      {/* Reject Modal */}
      {modal.type === "reject" && (
        <div
          className="bg-white rounded-xl max-w-md w-full p-8 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <h3
            className="text-xl font-bold mb-4"
            style={{ color: Colors.onSurface }}
          >
            Reject Application
          </h3>
          <p
            className="text-sm mb-6"
            style={{ color: Colors.onSurfaceVariant }}
          >
            Please provide a reason for the rejection. This will be shared
            with the applicant.
          </p>
          <textarea
            value={rejectNote}
            onChange={(e) => setRejectNote(e.target.value)}
            className="w-full h-32 rounded-xl p-4 text-sm mb-6 border focus:outline-none focus:ring-2"
            style={{
              backgroundColor: Colors.surfaceContainer,
              borderColor: "rgba(199,196,215,0.4)",
            }}
            placeholder="Admin notes (e.g., Missing valid insurance document)"
          />
          <div className="flex gap-3">
            <button
              onClick={closeModal}
              className="flex-1 py-3 font-medium"
              style={{ color: Colors.onSurfaceVariant }}
            >
              Keep Pending
            </button>
            <button
              onClick={() => confirmReject(modal.request)}
              className="flex-1 py-3 text-white rounded-xl font-medium shadow-lg transition-all"
              style={{ backgroundColor: Colors.error }}
            >
              Confirm Rejection
            </button>
          </div>
        </div>
      )}
    </div>
  );
}