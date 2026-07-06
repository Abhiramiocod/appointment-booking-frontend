import { History, NotebookText, Trash2, X } from "lucide-react";
import { Colors, statusStyles } from "../../../lib/utils";

export default function DetailsDrawer({ appointment, onClose }) {
  if (!appointment) return null;
  const s = statusStyles[appointment.status] || statusStyles.Confirmed;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end transition-opacity"
      style={{
        backgroundColor: "rgba(27,27,35,0.2)",
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        className="h-full w-full max-w-md flex flex-col shadow-2xl"
        style={{
          backgroundColor: Colors.surface,
          animation: "slideInRight 0.35s cubic-bezier(0.16,1,0.3,1)",
        }}
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
          <h3
            className="text-2xl font-bold"
            style={{ color: Colors.onSurface }}
          >
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
              style={{
                backgroundColor: "rgba(96,99,238,0.12)",
                color: Colors.primary,
              }}
            >
              {appointment.initials}
            </div>
            <div>
              <h4
                className="text-xl font-bold"
                style={{ color: Colors.onSurface }}
              >
                {appointment.name}
              </h4>
              <p style={{ color: Colors.onSurfaceVariant }}>
                Customer since {appointment.customerSince}
              </p>
            </div>
            <span
              className="ml-auto px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{ backgroundColor: s.bg, color: s.text }}
            >
              {appointment.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div
              className="p-4 rounded-xl"
              style={{ backgroundColor: Colors.surfaceContainerLow }}
            >
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
            <div
              className="p-4 rounded-xl"
              style={{ backgroundColor: Colors.surfaceContainerLow }}
            >
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
              <h5
                className="font-bold mb-3 flex items-center gap-2"
                style={{ color: Colors.onSurface }}
              >
                <NotebookText size={18} style={{ color: Colors.primary }} />
                Booking Notes
              </h5>
              <p
                className="text-sm leading-relaxed p-4 rounded-xl italic"
                style={{
                  color: Colors.onSurfaceVariant,
                  backgroundColor: Colors.surfaceContainerLow,
                }}
              >
                "{appointment.notes}"
              </p>
            </div>

            <div>
              <h5
                className="font-bold mb-3 flex items-center gap-2"
                style={{ color: Colors.onSurface }}
              >
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
                        backgroundColor: h.current
                          ? Colors.primary
                          : Colors.outlineVariant,
                        borderColor: Colors.surface,
                      }}
                    />
                    <div
                      className="text-sm font-bold"
                      style={{ color: Colors.onSurface }}
                    >
                      {h.date}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: Colors.onSurfaceVariant }}
                    >
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
          style={{
            borderColor: "rgba(199,196,215,0.3)",
            backgroundColor: Colors.surfaceContainerLow,
          }}
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
