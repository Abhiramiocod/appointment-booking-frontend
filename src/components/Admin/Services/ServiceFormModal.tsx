import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import api from "../../../lib/api";

interface Service {
  id: number;
  name: string;
  description?: string;
  duration: number;
  price: string;
  is_active: boolean;
}

interface ServiceFormModalProps {
  editingService: Service | null;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export default function ServiceFormModal({
  editingService,
  onClose,
  onSuccess,
}: ServiceFormModalProps) {
  const [name, setName] = useState(editingService?.name || "");
  const [description, setDescription] = useState(
    editingService?.description || "",
  );
  const [duration, setDuration] = useState(
    editingService ? String(editingService.duration) : "",
  );
  const [price, setPrice] = useState(
    editingService ? String(editingService.price) : "",
  );
  const [isActive, setIsActive] = useState(
    editingService ? editingService.is_active : true,
  );

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !duration || !price) {
      setError("Please fill out name, duration and price.");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      const payload = {
        name,
        description,
        duration: parseInt(duration),
        price: parseFloat(price),
        is_active: isActive,
      };

      if (editingService) {
        await api.put(`/admin/services/${editingService.id}`, payload);
        onSuccess(`Service "${name}" has been updated.`);
      } else {
        await api.post("/admin/services", payload);
        onSuccess(`Service "${name}" has been created successfully.`);
      }
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Failed to save service. Check validation rules.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl w-full max-w-md overflow-hidden animate-scale-in">
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-lg text-slate-800">
            {editingService ? "Edit Service" : "Create New Service"}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200/50 text-rose-700 text-xs rounded-lg">
              ⚠️ {error}
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Service Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Premium Beard Trim"
              className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Details about the service package..."
              rows={3}
              className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Duration (mins)
              </label>
              <input
                type="number"
                required
                min="1"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="30"
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Price ($)
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="45.00"
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="is_active"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label
              htmlFor="is_active"
              className="text-xs font-semibold text-slate-700"
            >
              Service is active and bookable
            </label>
          </div>

          <div className="border-t border-slate-100 pt-4 mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {submitting && <Loader2 size={13} className="animate-spin" />}
              {editingService ? "Save Changes" : "Create Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
