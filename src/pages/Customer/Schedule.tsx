import { useState, useEffect } from "react";
import api from "../../lib/api";
import Header from "../../components/Customer/Schedule/Header";
import FilterBar from "../../components/Customer/Schedule/FilterBar";
import AppointmentList from "../../components/Customer/Schedule/AppointmentList";
import ReviewModal from "../../components/Customer/Schedule/ReviewModal";
import AppointmentDetailsModal from "../../components/Customer/Schedule/AppointmentDetailsModal";

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
    id: number;
    name: string;
  };
  service?: {
    id: number;
    name: string;
    duration: number;
    price: string;
  };
  review?: {
    rating: number;
    review?: string;
  };
}

const statusStyles: Record<string, string> = {
  confirmed: "bg-emerald-50 text-emerald-700 border border-emerald-200/50",
  pending: "bg-indigo-50 text-indigo-600 border border-indigo-200/50",
  completed: "bg-blue-50 text-blue-700 border border-blue-200/50",
  cancelled: "bg-slate-100 text-slate-600 border border-slate-200/50",
  rejected: "bg-rose-50 text-rose-700 border border-rose-200/50",
  reschedule_requested: "bg-amber-50 text-amber-700 border border-amber-200/50",
};

const getMonthAbbr = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleString("default", { month: "short" }).toUpperCase();
};

const getDayNum = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.getDate().toString().padStart(2, "0");
};

export default function Schedule() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Modal States
  const [selectedApptDetails, setSelectedApptDetails] = useState<Appointment | null>(null);
  const [reviewApptId, setReviewApptId] = useState<number | null>(null);

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

  const handleReviewSuccess = (updatedAppt: Appointment) => {
    setSuccess("Review submitted successfully! Thank you.");
    setAppointments((prev) =>
      prev.map((appt) => (appt.id === updatedAppt.id ? updatedAppt : appt))
    );
    setTimeout(() => setSuccess(null), 3000);
  };

  // Filter criteria matching Feature 5 sections
  const filtered = appointments.filter((appt) => {
    const statusLower = appt.status.toLowerCase();
    if (activeFilter === "All") return true;
    if (activeFilter === "Upcoming") {
      return statusLower === "pending" || statusLower === "confirmed" || statusLower === "reschedule_requested";
    }
    if (activeFilter === "Completed") {
      return statusLower === "completed";
    }
    if (activeFilter === "Cancelled / Rejected") {
      return statusLower === "cancelled" || statusLower === "rejected";
    }
    return true;
  });

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

      {/* Filters */}
      <FilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

      {/* Appointments list */}
      <AppointmentList
        loading={loading}
        filtered={filtered}
        getMonthAbbr={getMonthAbbr}
        getDayNum={getDayNum}
        handleCancel={handleCancel}
        cancellingId={cancellingId}
        statusStyles={statusStyles}
        onViewDetails={(appt) => setSelectedApptDetails(appt as any)}
        onLeaveReview={setReviewApptId}
      />

      {/* Details Modal */}
      {selectedApptDetails && (
        <AppointmentDetailsModal
          appt={selectedApptDetails}
          statusStyles={statusStyles}
          onClose={() => setSelectedApptDetails(null)}
        />
      )}

      {/* Leave Review Modal */}
      {reviewApptId !== null && (
        <ReviewModal
          appointmentId={reviewApptId}
          onClose={() => setReviewApptId(null)}
          onSuccess={handleReviewSuccess}
        />
      )}
    </div>
  );
}