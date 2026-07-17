import { useState, useEffect } from "react";
import api from "../../lib/api";
import Toast from "../../components/Toast";
import {
  CalendarClock,
  CheckCircle2,
  Star,
  BarChart3,
  PlusCircle,
  History,
  Leaf,
  Loader2,
  Check,
  X
} from "lucide-react";

import Greeting from "../../components/Customer/Dashboard/Greeting";
import Stats from "../../components/Customer/Dashboard/Stats";
import FeaturedCard from "../../components/Customer/Dashboard/FeaturedCard";
import QuickActions from "../../components/Customer/Dashboard/QuickActions";
import RecentActivity from "../../components/Customer/Dashboard/RecentActivity";
import Recommended from "../../components/Customer/Dashboard/Recommended";
import AppointmentDetailsModal from "../../components/Customer/Schedule/AppointmentDetailsModal";

const quickActions = [
  { label: "Book New", icon: PlusCircle },
  { label: "My History", icon: History },
];

interface Appointment {
  id: number;
  appointment_date: string;
  start_time: string;
  end_time: string;
  status: string;
  notes?: string;
  rejection_reason?: string;
  proposed_date?: string;
  proposed_time?: string;
  proposed_note?: string;
  staff?: {
    name: string;
  };
  service?: {
    name: string;
    duration: number;
    price: string;
  };
}

export default function LuminaCustomerDashboard() {
  const [statsData, setStatsData] = useState({
    upcoming: 0,
    completed: 0,
    cancelled: 0,
  });
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [actioningId, setActioningId] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [selectedApptDetails, setSelectedApptDetails] = useState<Appointment | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, apptsRes, servicesRes] = await Promise.all([
        api.get("/customer/dashboard"),
        api.get("/customer/appointments"),
        api.get("/customer/services"),
      ]);

      const stats = statsRes.data;
      setStatsData({
        upcoming: stats?.upcoming_appointments || 0,
        completed: stats?.completed_appointments || 0,
        cancelled: stats?.cancelled_appointments || 0,
      });

      setAppointments(apptsRes.data?.data || apptsRes.data || []);
      setServices(servicesRes.data?.data || servicesRes.data || []);
    } catch (err) {
      console.error("Dashboard load failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleAcceptReschedule = async (id: number) => {
    setActioningId(id);
    try {
      await api.patch(`/customer/appointments/${id}/accept-reschedule`);
      setToast("Schedule proposal accepted successfully!");
      fetchDashboardData();
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setActioningId(null);
    }
  };

  const handleDeclineReschedule = async (id: number) => {
    setActioningId(id);
    try {
      await api.patch(`/customer/appointments/${id}/decline-reschedule`);
      setToast("Schedule proposal declined.");
      fetchDashboardData();
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setActioningId(null);
    }
  };

  const handleCancel = async (id: number) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
    setActioningId(id);
    try {
      await api.patch(`/customer/appointments/${id}/cancel`);
      setToast("Appointment cancelled successfully.");
      fetchDashboardData();
      setTimeout(() => setToast(null), 3000);
    } catch (err: any) {
      console.error(err);
      setToast(err.response?.data?.message || "Failed to cancel appointment.");
      setTimeout(() => setToast(null), 3000);
    } finally {
      setActioningId(null);
    }
  };

  // Find reschedule requests
  const rescheduleProposal = appointments.find(
    (a) => a.status.toLowerCase() === "reschedule_requested"
  );

  const featuredAppt = appointments.find(
    (a) => a.status.toLowerCase() === "confirmed" || a.status.toLowerCase() === "pending"
  );

  const statsList = [
    { label: "Upcoming Sessions", value: String(statsData.upcoming), icon: CalendarClock },
    { label: "Completed Sessions", value: String(statsData.completed), icon: CheckCircle2 },
    { label: "Total Bookings", value: String(statsData.upcoming + statsData.completed + statsData.cancelled), icon: BarChart3 },
    { label: "Favorite Specialist", value: appointments[0]?.staff?.name || "None", icon: Star },
  ];

  // Map real activities to the RecentActivity component format
  const mappedActivity = appointments.slice(0, 5).map((a) => ({
    id: a.id,
    date: a.appointment_date,
    staff: a.staff?.name || "Specialist",
    service: a.service?.name || "Session",
    status: a.status.toLowerCase() as any,
    rawAppt: a,
  }));

  // Map dynamic services to recommended format
  const recommendedList = services.slice(0, 3).map((srv) => ({
    rawService: srv,
    icon: Leaf,
    name: srv.name,
    desc: `${srv.duration} min session • Premium wellness`,
    price: `$${srv.price}`,
  }));

  return (
    <div style={{ padding: "20px 24px", flex: 1, width: "100%" }}>
      {/* Greeting */}
      <Greeting />

      {/* Reschedule Proposal Alert Card */}
      {rescheduleProposal && (
        <div className="mt-6 bg-indigo-50 border border-indigo-200/80 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 animation-fadeInUp">
          <div className="space-y-1.5">
            <h3 className="text-sm font-extrabold text-indigo-950 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
              Proposed Schedule Change
            </h3>
            <p className="text-slate-600 text-xs">
              Specialist <span className="font-semibold text-slate-800">{rescheduleProposal.staff?.name}</span> requested a reschedule for your booking <span className="font-semibold text-slate-800">({rescheduleProposal.service?.name})</span>.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mt-2 bg-white/70 p-3 rounded-xl border border-indigo-100 text-xs">
              <div>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Current Schedule</p>
                <p className="font-bold text-slate-700 mt-0.5">{rescheduleProposal.appointment_date} at {rescheduleProposal.start_time.substring(0, 5)}</p>
              </div>
              <div className="h-5 w-px bg-slate-200 hidden sm:block" />
              <div>
                <p className="text-[9px] text-indigo-500 font-bold uppercase tracking-wider">Proposed Schedule</p>
                <p className="font-bold text-indigo-700 mt-0.5">{rescheduleProposal.proposed_date} at {rescheduleProposal.proposed_time?.substring(0, 5)}</p>
              </div>
            </div>

            {rescheduleProposal.proposed_note && (
              <p className="text-slate-500 italic text-[11px] mt-1.5">
                " {rescheduleProposal.proposed_note} "
              </p>
            )}
          </div>

          <div className="flex gap-2 shrink-0 self-end md:self-center">
            <button
              onClick={() => handleAcceptReschedule(rescheduleProposal.id)}
              disabled={actioningId !== null}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-sm disabled:opacity-50"
            >
              {actioningId === rescheduleProposal.id ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
              Accept New Time
            </button>
            <button
              onClick={() => handleDeclineReschedule(rescheduleProposal.id)}
              disabled={actioningId !== null}
              className="px-3.5 py-1.5 bg-white border border-slate-200 hover:bg-red-50 hover:text-red-700 hover:border-red-100 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-sm disabled:opacity-50"
            >
              <X size={12} />
              Decline
            </button>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="mt-6">
        <Stats stats={statsList} />
      </div>

      {/* Featured appointment + quick actions */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Featured card */}
        <FeaturedCard appt={featuredAppt || null} onViewDetails={(appt) => setSelectedApptDetails(appt as any)} onCancel={handleCancel} />

        {/* Quick actions */}
        <QuickActions quickActions={quickActions} />
      </section>

      {/* Recent activity + recommended */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Recent activity table */}
        {loading ? (
          <div className="lg:col-span-8 bg-white p-8 flex justify-center items-center rounded-2xl border"><Loader2 className="animate-spin text-indigo-600" /></div>
        ) : (
          <RecentActivity activity={mappedActivity} onViewDetails={(appt) => setSelectedApptDetails(appt as any)} onCancel={handleCancel} />
        )}

        {/* Recommended */}
        <Recommended recommended={recommendedList} />
      </section>

      {/* Details Modal */}
      {selectedApptDetails && (
        <AppointmentDetailsModal
          appt={selectedApptDetails as any}
          statusStyles={{
            confirmed: "bg-emerald-50 text-emerald-700 border border-emerald-200/50",
            pending: "bg-indigo-50 text-indigo-600 border border-indigo-200/50",
            completed: "bg-blue-50 text-blue-700 border border-blue-200/50",
            cancelled: "bg-slate-100 text-slate-600 border border-slate-200/50",
            rejected: "bg-rose-50 text-rose-700 border border-rose-200/50",
            reschedule_requested: "bg-amber-50 text-amber-700 border border-amber-200/50",
          }}
          onClose={() => setSelectedApptDetails(null)}
        />
      )}

      {/* Toast popup */}
      {toast && (
        <Toast
          type="success"
          message={toast}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
