import { Colors } from "../../../../../lib/utils";

interface FooterProps{
  closeModal: () => void,
  r: any,
  approve: (r: any) => void,
  onReject: (r: any) => void,
}

export default function Footer ({closeModal, r, approve, onReject}:FooterProps) {
  return (
    <div
                className="px-6 py-4 border-t flex justify-end gap-3"
                style={{
                  backgroundColor: "rgba(239,236,248,0.25)",
                  borderColor: "rgba(199,196,215,0.2)",
                }}
              >
                <button
                  onClick={closeModal}
                  className="px-5 py-2.5 font-medium rounded-xl transition-colors hover:bg-slate-100"
                  style={{ color: Colors.onSurfaceVariant }}
                >
                  Close
                </button>
                {r.status === "Pending" && (
                  <>
                    <button
                      onClick={() => onReject(r)}
                      className="px-5 py-2.5 rounded-xl font-medium border transition-all hover:bg-red-50"
                      style={{ color: Colors.error, borderColor: Colors.error }}
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => approve(r)}
                      className="px-6 py-2.5 text-white rounded-xl font-medium shadow-lg transition-all active:scale-95"
                      style={{ backgroundColor: Colors.primary }}
                    >
                      Approve
                    </button>
                  </>
                )}
              </div>
  )  
}