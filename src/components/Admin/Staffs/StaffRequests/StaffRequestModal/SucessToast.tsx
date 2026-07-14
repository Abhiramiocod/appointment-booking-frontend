import { CheckCircle2 } from "lucide-react";
import { Colors } from "../../../../../lib/utils";

interface SuccessToastProps {
  modal: any;
  closeModal: () => void;
}

export default function SuccessToast({ modal, closeModal }: SuccessToastProps) {
  if (!modal || modal.type !== "success") return null;

  const r = modal.request;

  return (
    <div
      className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5">
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
        <span className="font-bold" style={{ color: Colors.onSurface }}>
          {r?.name}
        </span>{" "}
        has been approved and notified.
      </p>
      <button
        onClick={closeModal}
        className="w-full text-white py-3 rounded-xl font-medium transition-all active:scale-95"
        style={{ backgroundColor: Colors.onSurface }}
      >
        Done
      </button>
    </div>
  );
}