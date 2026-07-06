import { Calendar } from "lucide-react";
import { Colors } from "../../../lib/utils";

export default function FilterBar({ onReset }) {
  const selectStyle = {
    backgroundColor: Colors.surfaceContainerHigh,
    color: Colors.onSurface,
  };
  return (
    <div
      className="rounded-2xl p-6 mb-8 flex flex-wrap gap-4 items-end shadow-sm border"
      style={{
        backgroundColor: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(24px)",
        borderColor: "rgba(255,255,255,0.3)",
      }}
    >
      <div className="flex flex-col gap-2 min-w-[160px]">
        <label
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: Colors.onSurfaceVariant }}
        >
          Status
        </label>
        <select
          className="rounded-xl py-2.5 px-4 text-sm border-none cursor-pointer outline-none"
          style={selectStyle}
        >
          <option>All Statuses</option>
          <option>Confirmed</option>
          <option>Pending</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>
      </div>

      <div className="flex flex-col gap-2 min-w-[160px]">
        <label
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: Colors.onSurfaceVariant }}
        >
          Staff
        </label>
        <select
          className="rounded-xl py-2.5 px-4 text-sm border-none cursor-pointer outline-none"
          style={selectStyle}
        >
          <option>All Staff</option>
          <option>Alex Rivera</option>
          <option>Jordan Smith</option>
          <option>Sarah Chen</option>
        </select>
      </div>

      <div className="flex flex-col gap-2 min-w-[160px]">
        <label
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: Colors.onSurfaceVariant }}
        >
          Date Range
        </label>
        <div className="relative">
          <Calendar
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: Colors.onSurfaceVariant }}
          />
          <input
            readOnly
            type="text"
            value="Oct 12 - Oct 19, 2024"
            className="rounded-xl py-2.5 pl-10 pr-4 text-sm border-none cursor-pointer w-full outline-none"
            style={selectStyle}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 min-w-[160px]">
        <label
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: Colors.onSurfaceVariant }}
        >
          Customer Type
        </label>
        <select
          className="rounded-xl py-2.5 px-4 text-sm border-none cursor-pointer outline-none"
          style={selectStyle}
        >
          <option>All Customers</option>
          <option>Premium</option>
          <option>Standard</option>
          <option>New</option>
        </select>
      </div>

      <button
        onClick={onReset}
        className="px-6 py-2.5 rounded-xl font-bold transition-all ml-auto"
        style={{
          backgroundColor: Colors.surfaceContainerHighest,
          color: Colors.primary,
        }}
      >
        Reset Filters
      </button>
    </div>
  );
}