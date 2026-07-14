import Header from "./StaffRequestModal/Header";
import Body from "./StaffRequestModal/Body";
import Footer from "./StaffRequestModal/Footer";
import RejectModal from "./StaffRequestModal/RejectModal";
import SuccessToast from "./StaffRequestModal/SucessToast";
import DeleteModal from "./StaffRequestModal/DeleteModal";
import StatusModal from "./StaffRequestModal/StatusModal";

interface StaffRequestModalProps {
  modal: {
    type: "view" | "reject" | "success" | "delete" | "status";
    request: any;
    currentStatus?: string;
  } | null;
  closeModal: () => void;
  approve: (request: any) => void;
  confirmReject: (request: any) => void;
  confirmDelete: (request: any) => void;
  updateStatus: (request: any, status: string) => Promise<void>;
  rejectNote: string;
  setRejectNote: (note: string) => void;
  onReject: (request: any) => void;
}

export default function StaffRequestModal({
  modal,
  closeModal,
  approve,
  confirmReject,
  confirmDelete,
  updateStatus,
  rejectNote,
  setRejectNote,
  onReject,
}: StaffRequestModalProps) {
  if (!modal) return null;

  const r = modal.request;
  const tags: string[] = r.tags ?? [];
  const certifications: string[] = r.certifications ?? [];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      style={{
        backgroundColor: "rgba(27,27,35,0.25)",
        backdropFilter: "blur(6px)",
      }}
      onClick={closeModal}
    >
      {/* ───── View Modal ───── */}
      {modal.type === "view" && (
        <div
          className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <Header closeModal={closeModal} />
          <Body r={r} tags={tags} certifications={certifications} />
          <Footer closeModal={closeModal} r={r} approve={approve} onReject={onReject} />
        </div>
      )}

      {/* ───── Reject Modal ───── */}
      <RejectModal
        modal={modal}
        closeModal={closeModal}
        confirmReject={confirmReject}
        rejectNote={rejectNote}
        setRejectNote={setRejectNote}
      />

      {/* ───── Success Toast ───── */}
      <SuccessToast modal={modal} closeModal={closeModal} />

      {/* ───── Delete Modal ───── */}
      <DeleteModal modal={modal} closeModal={closeModal} confirmDelete={confirmDelete} />

      {/* ───── Status Modal ───── */}
      <StatusModal modal={modal} closeModal={closeModal} updateStatus={updateStatus} />
    </div>
  );
}