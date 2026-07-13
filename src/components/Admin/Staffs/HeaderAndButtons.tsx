import { Download, UserPlus } from "lucide-react";
import { Colors } from "../../../lib/utils";

export default function HeaderAndButtons() {
  return (
    <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
      <div>
        <h1
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "#1b1b23",
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          Staff
        </h1>
        <p style={{ color: "#767586", fontSize: 14, margin: "4px 0 0" }}>
          Manage your staff and schedule.
        </p>
      </div>

      <div className="flex gap-2">
        <button
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-sm hover:bg-slate-100 transition-all active:scale-95 text-sm font-medium"
          style={{ color: Colors.onSurfaceVariant }}
        >
          <Download size={16} />
          Export CSV
        </button>

        <button
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-white text-sm font-medium hover:shadow-lg transition-all active:scale-95"
          style={{
            backgroundColor: Colors.primary,
            boxShadow: "0 8px 16px -8px rgba(70,72,212,0.35)",
          }}
        >
          <UserPlus size={16} />
          Add Staff
        </button>
      </div>
    </div>
  );
}