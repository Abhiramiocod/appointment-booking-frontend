import { Trash2 } from "lucide-react";
import { Colors } from "../../../../../lib/utils";

interface DeleteModalProps {
  modal: any;
  closeModal: () => void;
  confirmDelete: (request: any) => void;
}

export default function DeleteModal({
  modal,
  closeModal,
  confirmDelete,
}: DeleteModalProps) {
  if (!modal || modal.type !== "delete") return null;

  const r = modal.request;

  return (
    <div
      className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center bg-red-50"
        >
          <Trash2 size={18} className="text-red-600" />
        </div>
        <h3
          className="text-xl font-bold"
          style={{ color: Colors.onSurface }}
        >
          Delete Request
        </h3>
      </div>
      <p
        className="text-sm mb-6"
        style={{ color: Colors.onSurfaceVariant }}
      >
        Are you sure you want to delete <span className="font-semibold" style={{ color: Colors.onSurface }}>{r?.name}</span>'s request? This action cannot be undone.
      </p>
      <div className="flex gap-3">
        <button
          onClick={closeModal}
          className="flex-1 py-3 font-medium rounded-xl hover:bg-slate-50 transition-colors border border-slate-200"
          style={{ color: Colors.onSurfaceVariant }}
        >
          Cancel
        </button>
        <button
          onClick={() => confirmDelete(r)}
          className="flex-1 py-3 text-white rounded-xl font-medium shadow-lg transition-all active:scale-95 bg-red-600 hover:bg-red-700"
        >
          Confirm Delete
        </button>
      </div>
    </div>
  );
}
