import { Calendar, Clock, Loader2 } from "lucide-react";

interface ScheduleSelectionProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  slotsLoading: boolean;
  slots: string[];
  selectedSlot: string | null;
  setSelectedSlot: (slot: string | null) => void;
}

export default function ScheduleSelection({
  selectedDate,
  setSelectedDate,
  slotsLoading,
  slots,
  selectedSlot,
  setSelectedSlot,
}: ScheduleSelectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Date Input */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Calendar size={14} /> Select Date
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
          className="w-full bg-slate-50/50 rounded-2xl px-4 py-3 text-sm border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>

      {/* Time Slots */}
      <div className="space-y-6">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Clock size={14} /> Available Times
        </label>
        {slotsLoading ? (
          <div className="flex justify-center py-6">
            <Loader2 className="animate-spin text-indigo-600" />
          </div>
        ) : slots.length === 0 ? (
          <p className="text-slate-400 italic text-xs">
            No slots available on this date. Choose another date.
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {slots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedSlot(slot)}
                className={`py-3 px-4 rounded-2xl font-semibold border transition-all text-xs ${
                  selectedSlot === slot
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-inner"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
