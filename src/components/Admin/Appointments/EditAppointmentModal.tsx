import { useState, useEffect, useRef } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";
import { Colors } from "../../../lib/utils";

interface RawAppointment {
  id?: number;
  customer?: { id?: number; name?: string };
  staff?: { id?: number; name?: string };
  service?: { id?: number; name?: string; duration?: number; price?: string };
  appointment_date?: string;
  start_time?: string;
  end_time?: string;
  status?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

interface EditAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: RawAppointment | null;
  onSave: (appointmentId: number, data: Partial<RawAppointment>) => Promise<void>;
  isLoading: boolean;
}

export default function EditAppointmentModal({
  isOpen,
  onClose,
  appointment,
  onSave,
  isLoading,
}: EditAppointmentModalProps) {
  const [formData, setFormData] = useState<Partial<RawAppointment>>({});
  const lastAppointmentRef = useRef<RawAppointment | null>(null);

  useEffect(() => {
    if (appointment && appointment !== lastAppointmentRef.current) {
      setFormData({
        appointment_date: appointment.appointment_date,
        start_time: appointment.start_time,
        end_time: appointment.end_time,
        status: appointment.status,
        notes: appointment.notes,
        // We'll handle staff/service as separate fields
      });
      lastAppointmentRef.current = appointment;
    }
  }, [appointment]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appointment?.id) return;
    await onSave(appointment.id, formData);
  };

  if (!appointment) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-[9999]">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ease-out data-closed:opacity-0"
      />

      <div className="fixed inset-0 flex w-screen overflow-y-auto items-center justify-center p-4">
        <DialogPanel
          transition
          className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl duration-300 ease-out data-closed:opacity-0 data-closed:scale-95"
        >
            <div className="flex items-center justify-between mb-6">
              <DialogTitle as="h3" className="text-2xl font-bold" style={{ color: Colors.onSurface }}>
                Edit Appointment
              </DialogTitle>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100"
                style={{ color: Colors.onSurfaceVariant }}
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Customer Info - Read Only */}
              <div>
                <label style={{ color: Colors.onSurfaceVariant }} className="mb-2 block text-xs font-semibold uppercase tracking-wider">
                  Customer
                </label>
                <div className="rounded-xl p-3" style={{ backgroundColor: Colors.surfaceContainerLow }}>
                  <p className="font-medium" style={{ color: Colors.onSurface }}>
                    {appointment.customer?.name || "Unknown"}
                  </p>
                </div>
              </div>

              {/* Date */}
              <div>
                <label
                  htmlFor="date"
                  style={{ color: Colors.onSurfaceVariant }}
                  className="block text-xs font-semibold uppercase tracking-wider"
                >
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  value={formData.appointment_date?.split('T')[0] || formData.appointment_date || ''}
                  onChange={(e) => setFormData({ ...formData, appointment_date: e.target.value })}
                  className="w-full rounded-xl border-none bg-gray-50 px-4 py-3 outline-none"
                  style={{
                    color: Colors.onSurface }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Start Time */}
                <div>
                  <label
                    htmlFor="startTime"
                    style={{ color: Colors.onSurfaceVariant }}
                    className="block text-xs font-semibold uppercase tracking-wider"
                  >
                    Start Time
                  </label>
                  <input
                    id="startTime"
                    type="time"
                    value={formData.start_time || ''}
                    onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                    className="w-full rounded-xl border-none bg-gray-50 px-4 py-3 outline-none"
                    style={{ color: Colors.onSurface }}
                  />
                </div>

                {/* End Time */}
                <div>
                  <label
                    htmlFor="endTime"
                    style={{ color: Colors.onSurfaceVariant }}
                    className="block text-xs font-semibold uppercase tracking-wider"
                  >
                    End Time
                  </label>
                  <input
                    id="endTime"
                    type="time"
                    value={formData.end_time || ''}
                    onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                    className="w-full rounded-xl border-none bg-gray-50 px-4 py-3 outline-none"
                    style={{ color: Colors.onSurface }}
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label
                  htmlFor="status"
                  style={{ color: Colors.onSurfaceVariant }}
                  className="block text-xs font-semibold uppercase tracking-wider"
                >
                  Status
                </label>
                <select
                  id="status"
                  value={formData.status || ''}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full rounded-xl border-none bg-gray-50 px-4 py-3 outline-none"
                  style={{ color: Colors.onSurface }}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="in progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label
                  htmlFor="notes"
                  style={{ color: Colors.onSurfaceVariant }}
                  className="block text-xs font-semibold uppercase tracking-wider"
                >
                  Notes
                </label>
                <textarea
                  id="notes"
                  value={formData.notes || ''}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="w-full rounded-xl border-none bg-gray-50 px-4 py-3 outline-none"
                  style={{ color: Colors.onSurface }}
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4">
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
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 rounded-xl font-bold transition-all"
                  style={{
                    backgroundColor: Colors.primary,
                    color: Colors.onPrimary,
                    opacity: isLoading ? 0.5 : 1,
                  }}
                >
                  {isLoading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </DialogPanel>
      </div>
    </Dialog>
  );
}
