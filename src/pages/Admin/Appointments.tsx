import { useState, useEffect } from "react";
import api from "../../lib/api";
import { Colors } from "../../lib/utils";
import FilterBar from "../../components/Admin/Appointments/FilterBar";
import DetailsDrawer from "../../components/Admin/Appointments/DetailsDrawer";
import AppointmentsTable from "../../components/Admin/Appointments/AppointmentsTable";
import EditAppointmentModal from "../../components/Admin/Appointments/EditAppointmentModal";
import DeleteConfirmationDialog from "../../components/Admin/Appointments/DeleteConfirmationDialog";
import Toast from "../../components/Toast";

interface RawAppointment {
  id?: number;
  customer?: { id?: number; name?: string };
  staff?: { id?: number; name?: string };
  service?: { id?: number; name?: string; duration?: number; price?: string };
  appointment_date?: string;
  start_time?: string;
  end_time?: string;
  status?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
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
  rawData: RawAppointment;
}

export default function Appointments() {
  const [selected, setSelected] = useState<Appointment | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<RawAppointment | null>(null);
  const [isSaveLoading, setIsSaveLoading] = useState(false);

  // Delete state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingAppointmentId, setDeletingAppointmentId] = useState<number | null>(null);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  // Toast state
  const [toast, setToast] = useState<{type: "success" | "error"; message: string} | null>(null);

  // Transform helper function
  const transformAppointment = (item: RawAppointment, index: number): Appointment => ({
    id: item.id || index,
    initials:
      item.customer?.name
        ?.split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase() || "CU",
    name: item.customer?.name || "Unknown",
    email: "N/A",
    service: item.service?.name || "Service",
    staff: item.staff?.name || "Staff",
    date: new Date(item.appointment_date || Date.now()).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    time: `${item.start_time} - ${item.end_time}`,
    status: item.status || "Pending",
    customerSince: "January 2024",
    serviceType: item.service?.name || "Service",
    duration: "60 Minutes",
    notes: item.notes || "",
    history: [
      {
        date: "Oct 12, 2024",
        detail: "Completed • $145.00 • Staff: Sarah Chen",
        current: true,
      },
    ],
    rawData: item,
  });

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
        } else if (
          data &&
          typeof data === "object" &&
          Array.isArray(data.data)
        ) {
          appointmentsArray = data.data as RawAppointment[];
        } else {
          console.warn("⚠️ Appointments API response is not an array:", data);
          appointmentsArray = [];
        }

        // Transform API data to match our component's format
        const transformed: Appointment[] = appointmentsArray.map(transformAppointment);
        setAppointments(transformed);
      } catch (err) {
        console.error(err);
        // Fallback to sample data if API fails
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Edit handlers
  const onEditClick = (row: Appointment) => {
    setEditingAppointment(row.rawData);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (appointmentId: number, data: Partial<RawAppointment>) => {
    setIsSaveLoading(true);
    try {
      const response = await api.patch(`/admin/appointments/${appointmentId}`, data);
      
      // Handle case where response has { data: ... } wrapper
      let updatedAppointment: RawAppointment;
      if (response.data && response.data.data) {
        updatedAppointment = response.data.data;
      } else if (response.data) {
        updatedAppointment = response.data;
      } else {
        // Fallback to updating with the data we sent plus existing data
        updatedAppointment = { ...editingAppointment, ...data };
      }

      // Update local state immediately
      setAppointments(prev => prev.map(appt => {
        if (appt.id === appointmentId) {
          return transformAppointment(updatedAppointment, appt.id);
        }
        return appt;
      }));
      setIsEditModalOpen(false);
      setToast({ type: "success", message: "Appointment updated successfully" });
    } catch (err) {
      console.error(err);
      setToast({ type: "error", message: "Failed to update appointment" });
    } finally {
      setIsSaveLoading(false);
    }
  };

  // Delete handlers
  const onDeleteClick = (row: Appointment) => {
    setDeletingAppointmentId(row.id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingAppointmentId) return;
    setIsDeleteLoading(true);
    try {
      await api.delete(`/admin/appointments/${deletingAppointmentId}`);
      setAppointments(prev => prev.filter(appt => appt.id !== deletingAppointmentId));
      setIsDeleteDialogOpen(false);
      setDeletingAppointmentId(null);
      setToast({ type: "success", message: "Appointment deleted successfully" });
    } catch (err) {
      console.error(err);
      setToast({ type: "error", message: "Failed to delete appointment" });
    } finally {
      setIsDeleteLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "28px 32px",
        flex: 1,
        backgroundColor: Colors.background,
      }}
    >
      <FilterBar onReset={() => {}} />
      {loading ? (
        <div style={{ textAlign: "center", padding: "4rem" }}>Loading...</div>
      ) : (
        <AppointmentsTable
          rows={appointments}
          onRowClick={setSelected}
          onEdit={onEditClick}
          onDelete={onDeleteClick}
        />
      )}
      <DetailsDrawer appointment={selected} onClose={() => setSelected(null)} />
      
      {/* Edit Modal */}
      <EditAppointmentModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        appointment={editingAppointment}
        onSave={handleSaveEdit}
        isLoading={isSaveLoading}
      />
      
      {/* Delete Dialog */}
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setDeletingAppointmentId(null);
        }}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleteLoading}
      />
      
      {/* Toast */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
