import { CalendarDays, Clock, Sliders } from "lucide-react";
import type { Appointment, AppointmentTab } from "../../../lib/Customers/appointments";

interface ListProps {
  appointments: Appointment[];
  activeTab: AppointmentTab;
  setSelectedAppt: (appt: Appointment) => void;
  statusStyles: Record<string, string>;
}

export default function List({
  appointments,
  activeTab,
  setSelectedAppt,
  statusStyles,
}: ListProps) {
  return (
    <div className="space-y-3.5">
      {appointments.length > 0 ? (
        appointments.map((appt) => (
          <div
            key={appt.id}
            className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm flex flex-col md:grid md:grid-cols-12 md:items-center gap-4 transition-all hover:shadow-md"
          >
            {/* Customer Details */}
            <div className="md:col-span-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Customer</p>
              <p className="font-bold text-slate-800 text-sm">{appt.customer?.name || "Client"}</p>
            </div>

            {/* Service Details */}
            <div className="md:col-span-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Service</p>
              <p className="font-semibold text-slate-700 text-sm leading-snug">{appt.service?.name}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{appt.service?.duration} mins • ${appt.service?.price}</p>
            </div>

            {/* Date & Time */}
            <div className="md:col-span-3">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Schedule</p>
              <p className="font-semibold text-slate-700 text-xs flex items-center gap-1">
                <CalendarDays size={12} className="text-slate-400" /> {appt.appointment_date}
              </p>
              <p className="font-semibold text-slate-700 text-xs mt-1 flex items-center gap-1">
                <Clock size={12} className="text-slate-400" /> {appt.start_time.substring(0, 5)}
              </p>
            </div>

            {/* StatusBadge */}
            <div className="md:col-span-2 flex items-center">
              <span
                className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                  statusStyles[appt.status.toLowerCase()] || "bg-slate-100 text-slate-500"
                }`}
              >
                {appt.status === "reschedule_requested" ? "Reschedule Sent" : appt.status}
              </span>
            </div>

            {/* Action Buttons (Action modal trigger) */}
            <div className="md:col-span-3 flex items-center justify-end gap-2 border-t md:border-t-0 pt-3 md:pt-0">
              {(activeTab === "pending" || activeTab === "upcoming") && (
                <button
                  onClick={() => setSelectedAppt(appt)}
                  className="p-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg shadow-sm border border-indigo-200/40 transition-all flex items-center justify-center"
                  title="Manage Request"
                >
                  <Sliders size={15} />
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-20 bg-white rounded-xl border border-slate-200/80 shadow-sm">
          <p className="text-slate-400 italic text-sm">No appointments in this view.</p>
        </div>
      )}
    </div>
  );
}