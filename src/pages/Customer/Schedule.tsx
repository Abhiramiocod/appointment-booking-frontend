import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";
import { Plus, Trash2, Calendar, Clock, Loader2 } from "lucide-react";
import { Colors } from "../../lib/utils";

interface Appointment {
  id: number;
  appointment_date: string;
  start_time: string;
  end_time: string;
  status: string;
  notes?: string;
  staff?: {
    name: string;
  };
  service?: {
    name: string;
    duration: number;
    price: string;
  };
}

const statusStyles: Record<string, string> = {
  confirmed: "bg-emerald-50 text-emerald-700 border border-emerald-200/50",
  pending: "bg-indigo-50 text-indigo-600 border border-indigo-200/50",
  completed: "bg-slate-100 text-slate-600 border border-slate-200/20",
  cancelled: "bg-red-50 text-red-600 border border-red-200/20",
};

const getMonthAbbr = (dateString: string) => {
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? "OCT" : months[date.getMonth()];
};

const getDayNum = (dateString: string) => {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? "24" : date.getDate().toString();
};

export default function Schedule() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/customer/appointments");
      setAppointments(response.data?.data || response.data || []);
    } catch (err: any) {
      console.error(err);
      setError("Failed to load your schedule. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleCancel = async (id: number) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
    setCancellingId(id);
    setError(null);
    setSuccess(null);

    try {
      await api.patch(`/customer/appointments/${id}/cancel`);
      setSuccess("Appointment cancelled successfully.");
      
      // Update local state status
      setAppointments((prev) =>
        prev.map((appt) => (appt.id === id ? { ...appt, status: "cancelled" } : appt))
      );
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to cancel appointment.");
      setTimeout(() => setError(null), 3000);
    } finally {
      setCancellingId(null);
    }
  };

  // Filter criteria
  const filtered = appointments.filter((appt) => {
    const statusLower = appt.status.toLowerCase();
    if (activeFilter === "All") return true;
    if (activeFilter === "Upcoming") {
      return statusLower === "pending" || statusLower === "confirmed";
    }
    if (activeFilter === "Past") {
      return statusLower === "completed" || statusLower === "cancelled";
    }
    return true;
  });

  return (
    <div style={{ padding: "28px 32px", flex: 1, width: "100%" }}>
      {/* Header */}
      <section className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Calendar size={18} />
            </div>
            My Schedule
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            View and manage your upcoming bookings or book a new session.
          </p>
        </div>
        <button
          onClick={() => navigate("/customer/book")}
          className="px-4 py-2 text-white rounded-lg text-xs font-semibold transition-all active:scale-95 flex items-center gap-1.5 shadow-sm hover:shadow-indigo-100 hover:brightness-105"
          style={{
            background: "linear-gradient(135deg, #4648d4, #6366f1)",
          }}
        >
          <Plus size={14} />
          Book New Appointment
        </button>
      </section>

      {/* Message alerts */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200/60 text-red-700 text-xs rounded-lg">
          ⚠️ {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs rounded-lg">
          ✨ {success}
        </div>
      )}

      {/* Filters */}
      <section className="flex items-center gap-3 mb-6">
        {["All", "Upcoming", "Past"].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-1.5 rounded-lg font-semibold text-xs transition-all ${
              activeFilter === filter
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white hover:bg-slate-50 text-slate-500 border border-slate-200/80 shadow-sm"
            }`}
          >
            {filter}
          </button>
        ))}
      </section>

      {/* Appointments list */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-indigo-600" size={28} />
        </div>
      ) : (
        <div className="space-y-3.5">
          {filtered.length > 0 ? (
            filtered.map((appt) => {
              const isInactive = appt.status.toLowerCase() === "completed" || appt.status.toLowerCase() === "cancelled";
              const showCancelBtn = appt.status.toLowerCase() === "pending" || appt.status.toLowerCase() === "confirmed";

              return (
                <div
                  key={appt.id}
                  className={`bg-white p-4.5 rounded-xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:shadow-md ${
                    isInactive ? "opacity-70 bg-slate-50/50" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center shrink-0 border ${
                        isInactive
                          ? "bg-slate-100 text-slate-500 border-slate-200/50"
                          : "bg-indigo-50/70 text-indigo-600 border-indigo-100/50"
                      }`}
                    >
                      <span className="text-[10px] font-bold tracking-wider leading-none mb-1">
                        {getMonthAbbr(appt.appointment_date)}
                      </span>
                      <span className="text-lg font-extrabold leading-none">
                        {getDayNum(appt.appointment_date)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm leading-snug">
                        {appt.service?.name || "Styling Session"}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span>with {appt.staff?.name || "Specialist"}</span>
                        <span className="text-slate-300">•</span>
                        <span className="flex items-center gap-1">
                          <Clock size={11} /> {appt.start_time.substring(0, 5)} ({appt.service?.duration || 30} min)
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="font-bold text-indigo-600">${appt.service?.price || "0.00"}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-3 sm:pt-0">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        statusStyles[appt.status.toLowerCase()] || "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {appt.status}
                    </span>

                    {showCancelBtn && (
                      <button
                        onClick={() => handleCancel(appt.id)}
                        disabled={cancellingId === appt.id}
                        className="p-1.5 text-slate-400 hover:text-red-600 transition-colors border border-transparent hover:border-red-100 hover:bg-red-50 rounded-lg disabled:opacity-50"
                        title="Cancel Appointment"
                      >
                        {cancellingId === appt.id ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Trash2 size={14} />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border border-slate-200/80 shadow-sm">
              <p className="text-slate-400 italic text-sm">No appointments in this view.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}