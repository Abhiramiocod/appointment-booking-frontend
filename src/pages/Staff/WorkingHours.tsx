import { useState, useEffect } from "react";
import DayRow from "../../components/Staff/WorkingHours/DayRow";
import api from "../../lib/api";
import { Clock, Loader2, RefreshCw, Save } from "lucide-react";
import { Colors } from "../../lib/utils";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const initialSchedule = DAYS.map((day) => ({
  day,
  enabled: day !== "Sunday", // Default: off on Sundays
  start: "09:00",
  end: "17:00",
}));

export default function WorkingHours() {
  const [schedule, setSchedule] = useState(initialSchedule);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkingHours = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/staff/working-hours");
      const data = response.data?.data || response.data || [];
      
      const updatedSchedule = initialSchedule.map((row, index) => {
        const match = data.find((item: any) => item.day_of_week === index);
        if (match) {
          return {
            ...row,
            enabled: !!match.is_available,
            start: match.start_time ? match.start_time.substring(0, 5) : "09:00",
            end: match.end_time ? match.end_time.substring(0, 5) : "17:00",
          };
        }
        return row;
      });
      setSchedule(updatedSchedule);
    } catch (err: any) {
      console.error(err);
      setError("Failed to load working hours. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkingHours();
  }, []);

  const toggleDay = async (day: string) => {
    let nextEnabled = false;
    const updatedSchedule = schedule.map((row) => {
      if (row.day === day) {
        nextEnabled = !row.enabled;
        return { ...row, enabled: nextEnabled };
      }
      return row;
    });
    setSchedule(updatedSchedule);

    try {
      const workingHoursPayload = updatedSchedule.map((row, index) => ({
        day_of_week: index,
        is_available: row.enabled,
        start_time: row.enabled ? row.start : null,
        end_time: row.enabled ? row.end : null,
      }));

      await api.put("/staff/working-hours", {
        working_hours: workingHoursPayload,
      });

      setSuccess("working hours updated successfully");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      console.error(err);
      setError("Failed to update working hours.");
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleTimeChange = (day: string, field: "start" | "end", value: string) => {
    setSchedule((prev) =>
      prev.map((row) => (row.day === day ? { ...row, [field]: value } : row)),
    );
  };

  const resetToDefault = () => {
    setSchedule(initialSchedule);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const workingHoursPayload = schedule.map((row, index) => ({
        day_of_week: index,
        is_available: row.enabled,
        start_time: row.enabled ? row.start : null,
        end_time: row.enabled ? row.end : null,
      }));

      await api.put("/staff/working-hours", {
        working_hours: workingHoursPayload,
      });

      setSuccess("Working hours saved successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to save working hours. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ padding: "28px 32px", flex: 1, width: "100%" }}>
      {/* Header */}
      <section className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Clock size={18} />
              </div>
              Working Hours
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Configure your availability and active shifts for the booking system.
            </p>
          </div>
          <div className="flex gap-2.5">
            <button
              onClick={resetToDefault}
              disabled={loading || saving}
              className="px-4 py-2 bg-white border border-slate-200 hover:border-slate-300 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-800 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-1.5 shadow-sm"
            >
              <RefreshCw size={13} />
              Reset to Default
            </button>
            <button
              onClick={handleSave}
              disabled={loading || saving}
              className="px-4 py-2 text-white rounded-lg text-xs font-semibold transition-all active:scale-95 disabled:opacity-50 flex items-center gap-1.5 shadow-sm hover:shadow-indigo-100 hover:brightness-105"
              style={{
                background: "linear-gradient(135deg, #4648d4, #6366f1)",
              }}
            >
              {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </section>

      {/* Message alerts */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200/60 text-red-700 text-xs rounded-lg flex items-center gap-2">
          <span>⚠️</span> {error}
        </div>
      )}

      {/* Floating Toast */}
      {success && (
        <div
          style={{
            position: "fixed",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 300,
            background: Colors.inverseSurface,
            color: Colors.inverseOnSurface,
            padding: "12px 24px",
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 500,
            boxShadow: "0 8px 32px rgba(0,0,0,0.22)",
            display: "flex",
            alignItems: "center",
            gap: 10,
            animation: "fadeInUp 0.25s ease",
          }}
        >
          <span style={{ fontSize: 16 }}>✨</span>
          {success}
          <style>{`@keyframes fadeInUp { from { opacity:0; transform:translate(-50%,12px); } to { opacity:1; transform:translate(-50%,0); } }`}</style>
        </div>
      )}

      {/* Weekly schedule */}
      {loading ? (
        <div className="flex justify-center items-center py-24">
          <Loader2 size={28} className="animate-spin text-indigo-600" />
        </div>
      ) : (
        <div className="space-y-3">
          {schedule.map((row) => (
            <DayRow
              key={row.day}
              row={row}
              onToggle={toggleDay}
              onTimeChange={handleTimeChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}
