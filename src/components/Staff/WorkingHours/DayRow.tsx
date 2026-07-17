import { Clock, Trash2 } from "lucide-react";

interface DayRowProps {
  row: {
    day: string;
    enabled: boolean;
    start: string;
    end: string;
    breaks?: { start_time: string; end_time: string }[];
  };
  onToggle: (day: string) => void;
  onTimeChange: (day: string, field: "start" | "end", value: string) => void;
  onAddBreak: (day: string) => void;
  onRemoveBreak: (day: string, index: number) => void;
  onBreakTimeChange: (
    day: string,
    index: number,
    field: "start_time" | "end_time",
    value: string
  ) => void;
}

export default function DayRow({
  row,
  onToggle,
  onTimeChange,
  onAddBreak,
  onRemoveBreak,
  onBreakTimeChange,
}: DayRowProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-slate-200/80 shadow-sm transition-all duration-200 hover:shadow-md overflow-hidden ${
        row.enabled ? "border-l-4 border-l-indigo-600" : "opacity-60 bg-slate-50/50"
      }`}
    >
      {/* Main Working Hours Row */}
      <div className="p-4.5 flex flex-col md:grid md:grid-cols-12 md:items-center gap-4 pl-4.5">
        {/* Day Name (Grid span 3) */}
        <div className="md:col-span-3 flex items-center">
          <span className="text-sm font-semibold text-slate-800 tracking-tight">{row.day}</span>
        </div>

        {/* Toggle Switch (Grid span 2) */}
        <div className="md:col-span-2 flex items-center">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={row.enabled}
              onChange={() => onToggle(row.day)}
              className="sr-only peer"
            />
            <div className="w-10 h-5.5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-slate-300 after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-indigo-600 shadow-inner" />
          </label>
        </div>

        {/* Status Badge (Grid span 2) */}
        <div className="md:col-span-2 flex items-center">
          <span
            className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
              row.enabled
                ? "bg-green-50 text-green-700 border border-green-200/50"
                : "bg-slate-100 text-slate-500 border border-slate-200/30"
            }`}
          >
            {row.enabled ? "Available" : "Off / Closed"}
          </span>
        </div>

        {/* Time Selectors (Grid span 5) */}
        <div className="md:col-span-5 flex items-center justify-start md:justify-end">
          {row.enabled ? (
            <div className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100/80 p-2 rounded-lg border border-slate-200/60 transition-colors w-full sm:w-auto">
              <div className="relative flex items-center">
                <Clock size={13} className="absolute left-2.5 text-slate-400 pointer-events-none" />
                <input
                  type="time"
                  value={row.start}
                  onChange={(e) => onTimeChange(row.day, "start", e.target.value)}
                  className="bg-transparent border-none focus:ring-0 text-xs pl-7 pr-2 py-0.5 w-[110px] text-slate-700 font-semibold outline-none cursor-pointer time-input-clean"
                />
              </div>
              <span className="text-slate-400 text-xs font-bold px-1 select-none">to</span>
              <div className="relative flex items-center">
                <Clock size={13} className="absolute left-2.5 text-slate-400 pointer-events-none" />
                <input
                  type="time"
                  value={row.end}
                  onChange={(e) => onTimeChange(row.day, "end", e.target.value)}
                  className="bg-transparent border-none focus:ring-0 text-xs pl-7 pr-2 py-0.5 w-[110px] text-slate-700 font-semibold outline-none cursor-pointer time-input-clean"
                />
              </div>
            </div>
          ) : (
            <span className="text-slate-400 italic text-xs">
              No working hours scheduled.
            </span>
          )}
        </div>
      </div>

      {/* Breaks Section */}
      {row.enabled && (
        <div className="bg-slate-50/40 border-t border-slate-100 p-4 pl-4.5 space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Breaks</h4>
            <button
              onClick={() => onAddBreak(row.day)}
              className="text-xs text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-1 cursor-pointer hover:underline bg-transparent border-none outline-none"
            >
              + Add Break
            </button>
          </div>
          {row.breaks && row.breaks.length > 0 ? (
            <div className="space-y-2.5">
              {row.breaks.map((brk, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-200 shadow-sm transition-colors w-full sm:w-auto">
                    <div className="relative flex items-center">
                      <Clock size={13} className="absolute left-2.5 text-slate-400 pointer-events-none" />
                      <input
                        type="time"
                        value={brk.start_time}
                        onChange={(e) =>
                          onBreakTimeChange(row.day, index, "start_time", e.target.value)
                        }
                        className="bg-transparent border-none focus:ring-0 text-xs pl-7 pr-2 py-0.5 w-[110px] text-slate-700 font-semibold outline-none cursor-pointer time-input-clean"
                      />
                    </div>
                    <span className="text-slate-400 text-xs font-bold px-1 select-none">to</span>
                    <div className="relative flex items-center">
                      <Clock size={13} className="absolute left-2.5 text-slate-400 pointer-events-none" />
                      <input
                        type="time"
                        value={brk.end_time}
                        onChange={(e) =>
                          onBreakTimeChange(row.day, index, "end_time", e.target.value)
                        }
                        className="bg-transparent border-none focus:ring-0 text-xs pl-7 pr-2 py-0.5 w-[110px] text-slate-700 font-semibold outline-none cursor-pointer time-input-clean"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveBreak(row.day, index)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-slate-100"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 text-xs italic">No breaks scheduled for this day.</p>
          )}
        </div>
      )}

      {/* Webkit time input override */}
      <style>{`
        .time-input-clean::-webkit-calendar-picker-indicator {
          display: none;
          -webkit-appearance: none;
        }
      `}</style>
    </div>
  );
}
