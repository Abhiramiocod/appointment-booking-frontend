import { useState, useEffect } from "react";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  X,
  NotebookText,
  History,
  Trash2,
} from "lucide-react";
import api from "../../lib/api";
import { Colors } from "../../lib/utils";

const statusStyles = {
  Confirmed: { bg: "#dcfce7", text: "#15803d", dot: "#22c55e" },
  Pending: { bg: "#fef3c7", text: "#b45309", dot: "#f59e0b" },
  "In Progress": { bg: "#dbeafe", text: "#1d4ed8", dot: "#3b82f6" },
};

function StatusBadge({ status }) {
  const s = statusStyles[status] || statusStyles.Confirmed;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
      style={{ backgroundColor: s.bg, color: s.text }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.dot }} />
      {status}
    </span>
  );
}

function FilterBar({ onReset }) {
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
        <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: Colors.onSurfaceVariant }}>
          Status
        </label>
        <select className="rounded-xl py-2.5 px-4 text-sm border-none cursor-pointer outline-none" style={selectStyle}>
          <option>All Statuses</option>
          <option>Confirmed</option>
          <option>Pending</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>
      </div>

      <div className="flex flex-col gap-2 min-w-[160px]">
        <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: Colors.onSurfaceVariant }}>
          Staff
        </label>
        <select className="rounded-xl py-2.5 px-4 text-sm border-none cursor-pointer outline-none" style={selectStyle}>
          <option>All Staff</option>
          <option>Alex Rivera</option>
          <option>Jordan Smith</option>
          <option>Sarah Chen</option>
        </select>
      </div>

      <div className="flex flex-col gap-2 min-w-[160px]">
        <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: Colors.onSurfaceVariant }}>
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
        <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: Colors.onSurfaceVariant }}>
          Customer Type
        </label>
        <select className="rounded-xl py-2.5 px-4 text-sm border-none cursor-pointer outline-none" style={selectStyle}>
          <option>All Customers</option>
          <option>Premium</option>
          <option>Standard</option>
          <option>New</option>
        </select>
      </div>

      <button
        onClick={onReset}
        className="px-6 py-2.5 rounded-xl font-bold transition-all ml-auto"
        style={{ backgroundColor: Colors.surfaceContainerHighest, color: Colors.primary }}
      >
        Reset Filters
      </button>
    </div>
  );
}

function AppointmentsTable({ rows, onRowClick }) {
  const headers = ["Customer", "Service", "Staff", "Date & Time", "Status", ""];
  return (
    <div
      className="rounded-2xl overflow-hidden shadow-sm border"
      style={{
        backgroundColor: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(24px)",
        borderColor: "rgba(199,196,215,0.2)",
      }}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr style={{ backgroundColor: Colors.surfaceContainerLow, borderBottom: `1px solid rgba(199,196,215,0.3)` }}>
              {headers.map((h, i) => (
                <th
                  key={i}
                  className={`px-6 py-4 text-xs font-semibold uppercase tracking-wider ${
                    i === headers.length - 1 ? "text-right" : ""
                  }`}
                  style={{ color: Colors.onSurfaceVariant }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={row.id}
                onClick={() => onRowClick(row)}
                className="cursor-pointer transition-all"
                style={{
                  borderTop: idx === 0 ? "none" : `1px solid rgba(199,196,215,0.2)`,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(96,99,238,0.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                      style={{ backgroundColor: "rgba(96,99,238,0.12)", color: Colors.primary }}
                    >
                      {row.initials}
                    </div>
                    <div>
                      <div className="font-bold" style={{ color: Colors.onSurface }}>
                        {row.name}
                      </div>
                      <div className="text-sm" style={{ color: Colors.onSurfaceVariant }}>
                        {row.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="font-medium" style={{ color: Colors.onSurface }}>
                    {row.service}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor:Colors.secondaryContainer }} />
                    <span style={{ color: Colors.onSurfaceVariant }}>{row.staff}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="font-medium" style={{ color: Colors.onSurface }}>
                    {row.date}
                  </div>
                  <div className="text-sm" style={{ color: Colors.onSurfaceVariant }}>
                    {row.time}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <StatusBadge status={row.status} />
                </td>
                <td className="px-6 py-5 text-right">
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-lg transition-all"
                    style={{ color: Colors.onSurfaceVariant }}
                  >
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        className="p-6 flex items-center justify-between"
        style={{ backgroundColor: Colors.surfaceContainerLow }}
      >
        <span className="text-sm" style={{ color: Colors.onSurfaceVariant }}>
          Showing 1-{rows.length} of 124 appointments
        </span>
        <div className="flex gap-2">
          <button
            disabled
            className="p-2 rounded-lg border disabled:opacity-50"
            style={{ borderColor: "rgba(199,196,215,0.3)", color: Colors.onSurfaceVariant }}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            className="p-2 rounded-lg border transition-all"
            style={{ borderColor: "rgba(199,196,215,0.3)", color: Colors.onSurfaceVariant }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailsDrawer({ appointment, onClose }) {
  if (!appointment) return null;
  const s = statusStyles[appointment.status] || statusStyles.Confirmed;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end transition-opacity"
      style={{ backgroundColor: "rgba(27,27,35,0.2)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="h-full w-full max-w-md flex flex-col shadow-2xl"
        style={{ backgroundColor: Colors.surface, animation: "slideInRight 0.35s cubic-bezier(0.16,1,0.3,1)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes slideInRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
        `}</style>

        <div
          className="p-6 border-b flex items-center justify-between"
          style={{ borderColor: "rgba(199,196,215,0.3)" }}
        >
          <h3 className="text-2xl font-bold" style={{ color: Colors.onSurface }}>
            Appointment Details
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full transition-all"
            style={{ color: Colors.onSurfaceVariant }}
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6">
          <div className="flex items-center gap-4 mb-8">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold"
              style={{ backgroundColor: "rgba(96,99,238,0.12)", color: Colors.primary }}
            >
              {appointment.initials}
            </div>
            <div>
              <h4 className="text-xl font-bold" style={{ color: Colors.onSurface }}>
                {appointment.name}
              </h4>
              <p style={{ color: Colors.onSurfaceVariant }}>Customer since {appointment.customerSince}</p>
            </div>
            <span
              className="ml-auto px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{ backgroundColor: s.bg, color: s.text }}
            >
              {appointment.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="p-4 rounded-xl" style={{ backgroundColor: Colors.surfaceContainerLow }}>
              <label
                className="block mb-1 text-xs font-semibold uppercase tracking-wider"
                style={{ color: Colors.onSurfaceVariant }}
              >
                Service Type
              </label>
              <span className="font-medium" style={{ color: Colors.onSurface }}>
                {appointment.serviceType}
              </span>
            </div>
            <div className="p-4 rounded-xl" style={{ backgroundColor: Colors.surfaceContainerLow }}>
              <label
                className="block mb-1 text-xs font-semibold uppercase tracking-wider"
                style={{ color: Colors.onSurfaceVariant }}
              >
                Duration
              </label>
              <span className="font-medium" style={{ color: Colors.onSurface }}>
                {appointment.duration}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h5 className="font-bold mb-3 flex items-center gap-2" style={{ color: Colors.onSurface }}>
                <NotebookText size={18} style={{ color: Colors.primary }} />
                Booking Notes
              </h5>
              <p
                className="text-sm leading-relaxed p-4 rounded-xl italic"
                style={{ color: Colors.onSurfaceVariant, backgroundColor: Colors.surfaceContainerLow }}
              >
                "{appointment.notes}"
              </p>
            </div>

            <div>
              <h5 className="font-bold mb-3 flex items-center gap-2" style={{ color: Colors.onSurface }}>
                <History size={18} style={{ color: Colors.primary }} />
                Booking History
              </h5>
              <div
                className="space-y-4 ml-2 pl-6 relative"
                style={{ borderLeft: `2px solid rgba(199,196,215,0.3)` }}
              >
                {appointment.history?.map?.((h, i) => (
                  <div key={i} className="relative">
                    <span
                      className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full border-4 box-content"
                      style={{
                        backgroundColor: h.current ? Colors.primary : Colors.outlineVariant,
                        borderColor: Colors.surface,
                      }}
                    />
                    <div className="text-sm font-bold" style={{ color: Colors.onSurface }}>
                      {h.date}
                    </div>
                    <div className="text-xs" style={{ color: Colors.onSurfaceVariant }}>
                      {h.detail}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className="p-6 border-t flex gap-3"
          style={{ borderColor: "rgba(199,196,215,0.3)", backgroundColor: Colors.surfaceContainerLow }}
        >
          <button
            className="flex-grow font-bold py-3 rounded-xl shadow-lg active:scale-95 transition-all"
            style={{ backgroundColor: Colors.primary, color: Colors.onPrimary }}
          >
            Reschedule
          </button>
          <button
            className="p-3 border rounded-xl transition-all"
            style={{ borderColor: Colors.error, color: Colors.error }}
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

interface RawAppointment {
  id?: number;
  user?: { name?: string; email?: string };
  service?: { name?: string };
  staff?: { name?: string };
  date?: string;
  start_time?: string;
  end_time?: string;
  status?: string;
  notes?: string;
}

interface Appointment {
  id: number;
  initials: string;
  name: string;
  email: string;
  service: string;
  staff: string;
  date: string;
  time: string;
  status: "Confirmed" | "Pending" | "In Progress" | string;
  customerSince: string;
  serviceType: string;
  duration: string;
  notes: string;
  history: { date: string; detail: string; current: boolean }[];
}

export default function Appointments() {
  const [selected, setSelected] = useState<Appointment | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const fallbackAppointments: Appointment[] = [
    {
      id: 1,
      initials: "EM",
      name: "Eleanor Maxwell",
      email: "eleanor@example.com",
      service: "Holistic Wellness Session",
      staff: "Jordan Smith",
      date: "Oct 14, 2024",
      time: "09:00 AM - 10:30 AM",
      status: "Confirmed",
      customerSince: "June 2023",
      serviceType: "Holistic Wellness",
      duration: "90 Minutes",
      notes: "Client requested a quiet environment.",
      history: [{ date: "Sep 12, 2024", detail: "Completed • $145.00 • Staff: Sarah Chen", current: true }],
    },
  ];

  // Fetch appointments from API
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get("/admin/appointments");
        console.log("📥 Appointments API Response:", response.data);
        const data = response.data;
        
        // Handle case where data might be an object with a data property
        let appointmentsArray: RawAppointment[];
        if (Array.isArray(data)) {
          appointmentsArray = data as RawAppointment[];
        } else if (data && typeof data === 'object' && Array.isArray(data.data)) {
          appointmentsArray = data.data as RawAppointment[];
        } else {
          console.warn("⚠️ Appointments API response is not an array:", data);
          appointmentsArray = [];
        }
        
        // Transform API data to match our component's format
        const transformed: Appointment[] = appointmentsArray.map((item, index) => ({
          id: item.id || index,
          initials: item.user?.name?.split(" ").map((n: string) => n[0]).join("").toUpperCase() || "CU",
          name: item.user?.name || "Unknown",
          email: item.user?.email || "unknown@example.com",
          service: item.service?.name || "Service",
          staff: item.staff?.name || "Staff",
          date: new Date(item.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
          time: `${item.start_time} - ${item.end_time}`,
          status: item.status || "Pending",
          customerSince: "January 2024",
          serviceType: item.service?.name || "Service",
          duration: "60 Minutes",
          notes: item.notes || "",
          history: [
            { date: "Oct 12, 2024", detail: "Completed • $145.00 • Staff: Sarah Chen", current: true }
          ],
        }));
        setAppointments(transformed);
      } catch (err) {
        console.error(err);
        // Fallback to sample data if API fails
        setAppointments(fallbackAppointments);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div style={{ padding: "28px 32px", flex: 1, backgroundColor: Colors.background }}>
      <FilterBar onReset={() => {}} />
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          Loading...
        </div>
      ) : (
        <AppointmentsTable rows={appointments} onRowClick={setSelected} />
      )}
      <DetailsDrawer appointment={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
