import { Loader2 } from "lucide-react";
import type { Appointment } from "../../../lib/Customers/appointments";

interface RescheduleAppointmentProps {
  reschedulingAppt: Appointment;
  rescheduleDate: string;
  setRescheduleDate: (date: string) => void;
  slotsLoading: boolean;
  slots: string[];
  rescheduleSlot: string | null;
  setRescheduleSlot: (slot: string | null) => void;
  rescheduleNote: string;
  setRescheduleNote: (note: string) => void;
  handleProposeReschedule: () => void;
  submittingReschedule: boolean;
  onClose: () => void;
}

export default function RescheduleAppointment({
  reschedulingAppt: _reschedulingAppt,
  rescheduleDate,
  setRescheduleDate,
  slotsLoading,
  slots,
  rescheduleSlot,
  setRescheduleSlot,
  rescheduleNote,
  setRescheduleNote,
  handleProposeReschedule,
  submittingReschedule,
  onClose,
}: RescheduleAppointmentProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{
        backgroundColor: "rgba(27,27,35,0.25)",
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-bold text-slate-800 text-lg mb-1">
          Propose New Schedule
        </h3>
        <p className="text-slate-500 text-xs mb-4">
          Suggest an alternative date and time slot to the customer.
        </p>

        <div className="space-y-4 mb-5">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Proposed Date
            </label>
            <input
              type="date"
              value={rescheduleDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setRescheduleDate(e.target.value)}
              className="w-full bg-slate-50/50 rounded-lg px-3.5 py-2 text-sm border focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Available Slots
            </label>
            {slotsLoading ? (
              <div className="flex justify-center py-3">
                <Loader2 className="animate-spin text-indigo-600" size={18} />
              </div>
            ) : slots.length === 0 ? (
              <p className="text-slate-400 italic text-xs">
                No slots available on this date. Choose another date.
              </p>
            ) : (
              <div className="grid grid-cols-4 gap-2">
                {slots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setRescheduleSlot(slot)}
                    className={`py-2 px-2.5 rounded-lg text-xs font-semibold border transition-all ${
                      rescheduleSlot === slot
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Proposal Note (Optional)
            </label>
            <textarea
              value={rescheduleNote}
              onChange={(e) => setRescheduleNote(e.target.value)}
              placeholder="Explain why you need to reschedule..."
              className="w-full bg-slate-50/50 rounded-lg px-3.5 py-2.5 text-xs border focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[70px]"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2.5">
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleProposeReschedule}
            type="button"
            disabled={submittingReschedule || !rescheduleSlot}
            className="px-4 py-2 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50"
            style={{ background: "linear-gradient(135deg, #4648d4, #6366f1)" }}
          >
            {submittingReschedule && (
              <Loader2 size={12} className="animate-spin" />
            )}
            Send Proposal
          </button>
        </div>
      </div>
    </div>
  );
}
