import type {
  Appointment,
  AppointmentTab,
} from "../../../lib/Customers/appointments";

interface TabsProps {
  pendingRequests: Appointment[];
  upcomingAppointments: Appointment[];
  completedAppointments: Appointment[];

  activeTab: AppointmentTab;
  setActiveTab: React.Dispatch<React.SetStateAction<AppointmentTab>>;
}
export default function Tabs({
  pendingRequests,
  upcomingAppointments,
  completedAppointments,
  activeTab,
  setActiveTab,
}: TabsProps) {
  return (
    <div className="flex border-b border-slate-200 gap-4 mb-6">
      <button
        onClick={() => setActiveTab("pending")}
        className={`pb-3 text-sm font-semibold border-b-2 transition-all ${
          activeTab === "pending"
            ? "border-indigo-600 text-indigo-600"
            : "border-transparent text-slate-400 hover:text-slate-600"
        }`}
      >
        Pending Requests ({pendingRequests.length})
      </button>
      <button
        onClick={() => setActiveTab("upcoming")}
        className={`pb-3 text-sm font-semibold border-b-2 transition-all ${
          activeTab === "upcoming"
            ? "border-indigo-600 text-indigo-600"
            : "border-transparent text-slate-400 hover:text-slate-600"
        }`}
      >
        Upcoming Appointments ({upcomingAppointments.length})
      </button>
      <button
        onClick={() => setActiveTab("completed")}
        className={`pb-3 text-sm font-semibold border-b-2 transition-all ${
          activeTab === "completed"
            ? "border-indigo-600 text-indigo-600"
            : "border-transparent text-slate-400 hover:text-slate-600"
        }`}
      >
        Completed ({completedAppointments.length})
      </button>
    </div>
  );
}
