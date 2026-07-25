import { useState, useEffect } from "react";
import api from "../../lib/api";
import { Loader2 } from "lucide-react";
import Header from "../../components/Staff/Schedule/Header";
import Tabs from "../../components/Staff/Schedule/Tabs";
import List from "../../components/Staff/Schedule/List";
import ActionModal from "../../components/Staff/Schedule/ActionModal";
import type { Appointment } from "../../lib/Customers/appointments";

export default function Schedule() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Tabs: 'pending' | 'upcoming' | 'completed'
  const [activeTab, setActiveTab] = useState<"pending" | "upcoming" | "completed">("pending");

  // Modals state
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);

  const [rescheduleDate, setRescheduleDate] = useState(new Date().toISOString().split("T")[0]);
  const [rescheduleSlot, setRescheduleSlot] = useState<string | null>(null);
  const [rescheduleNote, setRescheduleNote] = useState("");
  const [slots, setSlots] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);

  // Action loading states
  const [submittingReject, setSubmittingReject] = useState(false);
  const [submittingReschedule, setSubmittingReschedule] = useState(false);
  const [confirmingId, setConfirmingId] = useState<number | null>(null);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/staff/appointments");
      setAppointments(response.data?.data || response.data || []);
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch appointments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Fetch slots for rescheduling
  useEffect(() => {
    if (!selectedAppt || !rescheduleDate || !selectedAppt.service?.id) return;
    const fetchSlots = async () => {
      try {
        setSlotsLoading(true);
        setSlots([]);
        setRescheduleSlot(null);
        // Using logged in staff's id
        const userString = localStorage.getItem("user");
        const currentUser = userString ? JSON.parse(userString) : null;
        if (!currentUser?.id) return;

        const response = await api.get(`/customer/staff/${currentUser.id}/available-slots`, {
          params: {
            service_id: selectedAppt.service?.id,
            date: rescheduleDate,
          },
        });
        setSlots(response.data?.data || response.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setSlotsLoading(false);
      }
    };
    fetchSlots();
  }, [selectedAppt, rescheduleDate]);

  // Actions
  const handleApprove = async (id: number) => {
    setConfirmingId(id);
    setError(null);
    setSuccess(null);
    try {
      await api.patch(`/staff/appointments/${id}/confirm`);
      setSuccess("Appointment confirmed successfully.");
      
      // Update state locally
      setAppointments((prev) =>
        prev.map((appt) => (appt.id === id ? { ...appt, status: "confirmed" } : appt))
      );
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      console.error(err);
      setError("Failed to approve appointment.");
    } finally {
      setConfirmingId(null);
    }
  };

  const handleCancel = async (id: number) => {
    setConfirmingId(id);
    setError(null);
    setSuccess(null);
    try {
      await api.patch(`/staff/appointments/${id}/cancel`);
      setSuccess("Appointment cancelled successfully.");
      
      // Update state locally
      setAppointments((prev) =>
        prev.map((appt) => (appt.id === id ? { ...appt, status: "cancelled" } : appt))
      );
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      console.error(err);
      setError("Failed to cancel appointment.");
    } finally {
      setConfirmingId(null);
    }
  };

  const handleComplete = async (id: number) => {
    setConfirmingId(id);
    setError(null);
    setSuccess(null);
    try {
      await api.patch(`/staff/appointments/${id}/complete`);
      setSuccess("Appointment completed successfully.");
      
      // Update state locally
      setAppointments((prev) =>
        prev.map((appt) => (appt.id === id ? { ...appt, status: "completed" } : appt))
      );
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      console.error(err);
      setError("Failed to complete appointment.");
    } finally {
      setConfirmingId(null);
    }
  };

  const handleReject = async (reason: string) => {
    if (!selectedAppt) return;
    setSubmittingReject(true);
    setError(null);
    setSuccess(null);
    try {
      await api.patch(`/staff/appointments/${selectedAppt.id}/reject`, {
        rejection_reason: reason,
      });
      setSuccess("Appointment rejected successfully.");
      
      // Update state locally
      setAppointments((prev) =>
        prev.map((appt) => (appt.id === selectedAppt.id ? { ...appt, status: "rejected" } : appt))
      );
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      console.error(err);
      setError("Failed to reject appointment.");
    } finally {
      setSubmittingReject(false);
    }
  };

  const handleProposeReschedule = async (date: string, slot: string, note: string) => {
    if (!selectedAppt) return;
    setSubmittingReschedule(true);
    setError(null);
    setSuccess(null);
    try {
      await api.patch(`/staff/appointments/${selectedAppt.id}/propose-time`, {
        proposed_date: date,
        proposed_time: slot,
        proposed_note: note,
      });
      setSuccess("Reschedule proposal submitted to the customer.");
      
      // Update state locally
      setAppointments((prev) =>
        prev.map((appt) =>
          appt.id === selectedAppt.id
            ? { ...appt, status: "reschedule_requested", proposed_date: date, proposed_time: slot, proposed_note: note }
            : appt
        )
      );
      
      setRescheduleSlot(null);
      setRescheduleNote("");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      console.error(err);
      setError("Failed to propose reschedule time.");
    } finally {
      setSubmittingReschedule(false);
    }
  };

  // Group appointments by tabs
  const pendingRequests = appointments.filter(
    (a) => a.status.toLowerCase() === "pending" || a.status.toLowerCase() === "reschedule_requested"
  );
  const upcomingAppointments = appointments.filter((a) => a.status.toLowerCase() === "confirmed");
  const completedAppointments = appointments.filter(
    (a) =>
      a.status.toLowerCase() === "completed" ||
      a.status.toLowerCase() === "rejected" ||
      a.status.toLowerCase() === "cancelled"
  );

  const getActiveList = () => {
    if (activeTab === "pending") return pendingRequests;
    if (activeTab === "upcoming") return upcomingAppointments;
    return completedAppointments;
  };

  const statusStyles: Record<string, string> = {
    pending: "bg-amber-50 text-amber-700 border border-amber-200/50",
    reschedule_requested: "bg-indigo-50 text-indigo-600 border border-indigo-200/50",
    confirmed: "bg-emerald-50 text-emerald-700 border border-emerald-200/50",
    completed: "bg-slate-100 text-slate-600 border border-slate-200/20",
    rejected: "bg-red-50 text-red-600 border border-red-200/20",
    cancelled: "bg-slate-50 text-slate-500 border border-slate-200/20",
  };

  return (
    <div style={{ padding: "28px 32px", flex: 1, width: "100%" }}>
      {/* Header */}
      <Header />

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

      {/* Tabs */}
      <Tabs
      pendingRequests={pendingRequests}
      upcomingAppointments={upcomingAppointments}
      completedAppointments={completedAppointments}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      />

      {/* List */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-indigo-600" size={28} />
        </div>
      ) : (
        <List
          appointments={getActiveList()}
          activeTab={activeTab}
          setSelectedAppt={setSelectedAppt}
          statusStyles={statusStyles}
        />
      )}

      {/* Unified Action Modal */}
      {selectedAppt && (
        <ActionModal
          appt={selectedAppt}
          onClose={() => setSelectedAppt(null)}
          handleApprove={handleApprove}
          handleReject={handleReject}
          handleProposeReschedule={handleProposeReschedule}
          handleCancel={handleCancel}
          handleComplete={handleComplete}
          confirmingId={confirmingId}
          submittingReject={submittingReject}
          submittingReschedule={submittingReschedule}
          slots={slots}
          slotsLoading={slotsLoading}
          rescheduleDate={rescheduleDate}
          setRescheduleDate={setRescheduleDate}
          rescheduleSlot={rescheduleSlot}
          setRescheduleSlot={setRescheduleSlot}
          rescheduleNote={rescheduleNote}
          setRescheduleNote={setRescheduleNote}
        />
      )}
    </div>
  );
}
