import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Loader2 } from "lucide-react";

interface ScheduleSelectionProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  slotsLoading: boolean;
  slots: string[];
  selectedSlot: string | null;
  setSelectedSlot: (slot: string | null) => void;
}

const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default function ScheduleSelection({
  selectedDate,
  setSelectedDate,
  slotsLoading,
  slots,
  selectedSlot,
  setSelectedSlot,
}: ScheduleSelectionProps) {
  // Current visible month/year in the calendar picker
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = selectedDate ? new Date(selectedDate) : new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const todayStr = new Date().toISOString().split("T")[0];

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Generate calendar grid days for currentMonth
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const calendarCells = [];

  // Previous month trailing days
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    calendarCells.push({
      dateStr: null,
      dayNum: prevMonthDays - i,
      isCurrentMonth: false,
      isDisabled: true,
    });
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(year, month, day);
    // Format YYYY-MM-DD
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const dayPadded = String(day).padStart(2, "0");
    const dateStr = `${y}-${m}-${dayPadded}`;

    const isPast = dateStr < todayStr;

    calendarCells.push({
      dateStr,
      dayNum: day,
      isCurrentMonth: true,
      isDisabled: isPast,
    });
  }

  // Next month leading days to complete week rows (up to 35 or 42 cells)
  const remainingCells = (7 - (calendarCells.length % 7)) % 7;
  for (let i = 1; i <= remainingCells; i++) {
    calendarCells.push({
      dateStr: null,
      dayNum: i,
      isCurrentMonth: false,
      isDisabled: true,
    });
  }

  const monthYearHeader = currentMonth.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const formattedSelectedDateHeader = (() => {
    if (!selectedDate) return "";
    const d = new Date(selectedDate + "T00:00:00");
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  })();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left: Interactive Calendar Card */}
      <div className="lg:col-span-5 bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-6 shadow-sm">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6 px-1">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors border border-slate-200/60 active:scale-95"
            title="Previous month"
          >
            <ChevronLeft size={18} />
          </button>
          <h3 className="font-extrabold text-slate-800 text-base tracking-tight">
            {monthYearHeader}
          </h3>
          <button
            type="button"
            onClick={handleNextMonth}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors border border-slate-200/60 active:scale-95"
            title="Next month"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {DAYS_OF_WEEK.map((d) => (
            <span
              key={d}
              className="text-[11px] font-bold text-slate-400 uppercase tracking-wider py-1"
            >
              {d}
            </span>
          ))}
        </div>

        {/* Calendar Day Grid */}
        <div className="grid grid-cols-7 gap-1.5">
          {calendarCells.map((cell, idx) => {
            if (!cell.isCurrentMonth || !cell.dateStr) {
              return (
                <div
                  key={idx}
                  className="h-10 flex items-center justify-center text-slate-300 text-xs font-medium cursor-not-allowed select-none"
                >
                  {cell.dayNum}
                </div>
              );
            }

            const isSelected = selectedDate === cell.dateStr;

            return (
              <button
                key={cell.dateStr}
                type="button"
                disabled={cell.isDisabled}
                onClick={() => setSelectedDate(cell.dateStr!)}
                className={`h-10 w-full rounded-2xl text-xs font-bold transition-all flex items-center justify-center ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-105"
                    : cell.isDisabled
                    ? "text-slate-300 cursor-not-allowed"
                    : "text-slate-700 hover:bg-blue-50 hover:text-blue-600 active:scale-95"
                }`}
              >
                {cell.dayNum}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: Available Times Card */}
      <div className="lg:col-span-7 bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-6 shadow-sm min-h-[360px] flex flex-col">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base tracking-tight flex items-center gap-2">
              Available times
            </h3>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              Select a time slot for your appointment
            </p>
          </div>
          {formattedSelectedDateHeader && (
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-xl border border-blue-100">
              {formattedSelectedDateHeader}
            </span>
          )}
        </div>

        {slotsLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center py-12">
            <Loader2 className="animate-spin text-blue-600 mb-2" size={28} />
            <p className="text-xs font-semibold text-slate-400">Loading available time slots…</p>
          </div>
        ) : slots.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12 px-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
              <Clock size={20} />
            </div>
            <p className="text-sm font-bold text-slate-700 mb-1">No times available</p>
            <p className="text-xs text-slate-400 max-w-xs">
              There are no available time slots on this date. Please select a different date on the calendar.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {slots.map((slot) => {
              const isSelected = selectedSlot === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-3 px-3 rounded-2xl font-bold transition-all text-xs border text-center ${
                    isSelected
                      ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 active:scale-95"
                      : "bg-white border-slate-200/80 text-slate-700 hover:border-blue-300 hover:bg-blue-50/50 hover:text-blue-600 active:scale-95"
                  }`}
                >
                  {slot.substring(0, 5)}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

