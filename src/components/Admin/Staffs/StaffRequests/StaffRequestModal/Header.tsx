import { X } from "lucide-react";
import { Colors } from "../../../../../lib/utils";

export default function Header({ closeModal }: { closeModal: () => void }) {
    return (
        <div
            className="px-6 py-4 border-b flex justify-between items-center"
            style={{ borderColor: "rgba(199,196,215,0.2)" }}
          >
            <h3
              className="text-lg font-semibold"
              style={{ color: Colors.onSurface }}
            >
              Application Details
            </h3>
            <button
              onClick={closeModal}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X size={18} />
            </button>
          </div>
    )
}