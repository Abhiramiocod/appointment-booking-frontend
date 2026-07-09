import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";
import { Colors } from "../../../lib/utils";

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isLoading: boolean;
  title?: string;
  message?: string;
}

export default function DeleteConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  title = "Delete Appointment",
  message = "Are you sure you want to delete this appointment? This action cannot be undone.",
}: DeleteConfirmationDialogProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-[9999]">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ease-out data-closed:opacity-0"
      />

      <div className="fixed inset-0 flex w-screen overflow-y-auto items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl duration-300 ease-out data-closed:opacity-0 data-closed:scale-95"
          >
            <div className="flex items-center justify-between mb-4">
              <DialogTitle as="h3" className="text-xl font-bold" style={{ color: Colors.onSurface }}>
                {title}
              </DialogTitle>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100"
                style={{ color: Colors.onSurfaceVariant }}
              >
                <X size={20} />
              </button>
            </div>

            <p className="mb-6" style={{ color: Colors.onSurfaceVariant }}>
              {message}
            </p>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="px-6 py-3 rounded-xl font-bold transition-all"
                style={{
                  backgroundColor: Colors.surfaceContainerHighest,
                  color: Colors.primary,
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={isLoading}
                className="px-6 py-3 rounded-xl font-bold transition-all"
                style={{
                  backgroundColor: Colors.error,
                  color: "#ffffff",
                  opacity: isLoading ? 0.5 : 1,
                }}
              >
                {isLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </DialogPanel>
      </div>
    </Dialog>
  );
}
