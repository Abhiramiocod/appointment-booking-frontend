import { useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { X } from "lucide-react";
import api from "../../../lib/api";
import { Colors } from "../../../lib/utils";
import Toast from "../../Toast";

interface CreateAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Staff {
  id: number;
  name: string;
}

interface Service {
  id: number;
  name: string;
  duration?: number;
  price?: string;
}

export default function CreateAppointmentModal({
  isOpen,
  onClose,
}: CreateAppointmentModalProps) {
  const [customerId, setCustomerId] = useState("");
  const [staffId, setStaffId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [status, setStatus] = useState("confirmed");
  const [notes, setNotes] = useState("");

  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [serviceList, setServiceList] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Fetch staff and services on open
  useEffect(() => {
    if (isOpen) {
      const fetchData = async () => {
        try {
          // Fetch staff
          const staffResponse = await api.get("/admin/staff/search");
          setStaffList(staffResponse.data.data ?? staffResponse.data ?? []);
        } catch (err) {
          console.error("Failed to fetch staff, trying fallback...", err);
          try {
            const staffFallback = await api.get("/admin/staff");
            setStaffList(staffFallback.data.data ?? staffFallback.data ?? []);
          } catch (e) {
            console.error("Fallback staff fetch failed", e);
          }
        }

        try {
          // Fetch services
          const servicesResponse = await api.get("/admin/services");
          setServiceList(servicesResponse.data.data ?? servicesResponse.data ?? []);
        } catch (err) {
          console.error("Failed to fetch services", err);
        }
      };

      fetchData();

      // Reset form states
      setCustomerId("");
      setStaffId("");
      setServiceId("");
      setAppointmentDate("");
      setStartTime("");
      setEndTime("");
      setStatus("confirmed");
      setNotes("");
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerId || !staffId || !serviceId || !appointmentDate || !startTime || !endTime) {
      setToast({
        type: "error",
        message: "Please fill in all required fields.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        customer_id: Number(customerId),
        staff_id: Number(staffId),
        service_id: Number(serviceId),
        appointment_date: appointmentDate,
        start_time: startTime.includes(":") && startTime.split(":").length === 2 ? `${startTime}:00` : startTime,
        end_time: endTime.includes(":") && endTime.split(":").length === 2 ? `${endTime}:00` : endTime,
        status,
        notes: notes || null,
      };

      await api.post("/admin/appointments", payload);

      setToast({
        type: "success",
        message: "Appointment created successfully!",
      });

      // Dispatch event to reload appointment tables if present
      window.dispatchEvent(new Event("appointment-created"));

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err: any) {
      console.error(err);
      setToast({
        type: "error",
        message: err.response?.data?.message ?? "Failed to create appointment.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
              <DialogTitle
                as="h3"
                className="text-2xl font-bold"
                style={{ color: Colors.onSurface }}
              >
                New Appointment
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
              {/* Customer ID */}
              <div>
                <label
                  htmlFor="customer"
                  style={{ color: Colors.onSurfaceVariant }}
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider"
                >
                  Customer ID *
                </label>
                <input
                  id="customer"
                  type="number"
                  placeholder="Enter Customer User ID (e.g. 3)"
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                  className="w-full rounded-xl border-none bg-gray-50 px-4 py-3 outline-none"
                  style={{ color: Colors.onSurface }}
                  required
                />
              </div>

              {/* Staff and Service row */}
              <div className="grid grid-cols-2 gap-4">
                {/* Staff Select */}
                <div>
                  <label
                    htmlFor="staff"
                    style={{ color: Colors.onSurfaceVariant }}
                    className="block text-xs font-semibold uppercase tracking-wider mb-2"
                  >
                    Staff *
                  </label>
                  <select
                    id="staff"
                    value={staffId}
                    onChange={(e) => setStaffId(e.target.value)}
                    className="w-full rounded-xl border-none bg-gray-50 px-4 py-3 outline-none"
                    style={{ color: Colors.onSurface }}
                    required
                  >
                    <option value="">Select Staff</option>
                    {staffList.map((staff) => (
                      <option key={staff.id} value={staff.id}>
                        {staff.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Service Select */}
                <div>
                  <label
                    htmlFor="service"
                    style={{ color: Colors.onSurfaceVariant }}
                    className="block text-xs font-semibold uppercase tracking-wider mb-2"
                  >
                    Service *
                  </label>
                  <select
                    id="service"
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="w-full rounded-xl border-none bg-gray-50 px-4 py-3 outline-none"
                    style={{ color: Colors.onSurface }}
                    required
                  >
                    <option value="">Select Service</option>
                    {serviceList.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name} {service.duration ? `(${service.duration} mins)` : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date */}
              <div>
                <label
                  htmlFor="date"
                  style={{ color: Colors.onSurfaceVariant }}
                  className="block text-xs font-semibold uppercase tracking-wider mb-2"
                >
                  Date *
                </label>
                <input
                  id="date"
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="w-full rounded-xl border-none bg-gray-50 px-4 py-3 outline-none"
                  style={{ color: Colors.onSurface }}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Start Time */}
                <div>
                  <label
                    htmlFor="startTime"
                    style={{ color: Colors.onSurfaceVariant }}
                    className="block text-xs font-semibold uppercase tracking-wider mb-2"
                  >
                    Start Time *
                  </label>
                  <input
                    id="startTime"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full rounded-xl border-none bg-gray-50 px-4 py-3 outline-none"
                    style={{ color: Colors.onSurface }}
                    required
                  />
                </div>

                {/* End Time */}
                <div>
                  <label
                    htmlFor="endTime"
                    style={{ color: Colors.onSurfaceVariant }}
                    className="block text-xs font-semibold uppercase tracking-wider mb-2"
                  >
                    End Time *
                  </label>
                  <input
                    id="endTime"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full rounded-xl border-none bg-gray-50 px-4 py-3 outline-none"
                    style={{ color: Colors.onSurface }}
                    required
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label
                  htmlFor="status"
                  style={{ color: Colors.onSurfaceVariant }}
                  className="block text-xs font-semibold uppercase tracking-wider mb-2"
                >
                  Status *
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full rounded-xl border-none bg-gray-50 px-4 py-3 outline-none"
                  style={{ color: Colors.onSurface }}
                  required
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label
                  htmlFor="notes"
                  style={{ color: Colors.onSurfaceVariant }}
                  className="block text-xs font-semibold uppercase tracking-wider mb-2"
                >
                  Notes
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Any additional notes..."
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
                  {isLoading ? "Booking..." : "Book Appointment"}
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Toast */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
