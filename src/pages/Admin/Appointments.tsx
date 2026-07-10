import { useState, useEffect } from "react";
import api from "../../lib/api";
import { Colors } from "../../lib/utils";
import FilterBar from "../../components/Admin/Appointments/FilterBar";
import DetailsDrawer from "../../components/Admin/Appointments/DetailsDrawer";
import AppointmentsTable from "../../components/Admin/Appointments/AppointmentsTable";
import EditAppointmentModal from "../../components/Admin/Appointments/EditAppointmentModal";
import DeleteConfirmationDialog from "../../components/Admin/Appointments/DeleteConfirmationDialog";
import Toast from "../../components/Toast";
import type { AppointmentDto, AppointmentViewModel } from "../../types/Admin/Appointments/appointments";

export default function Appointments() {
  const [selected, setSelected] = useState<AppointmentViewModel | null>(null);
  const [appointments, setAppointments] = useState<AppointmentViewModel[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<AppointmentDto | null>(null);
  const [isSaveLoading, setIsSaveLoading] = useState(false);

  // Delete state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingAppointmentId, setDeletingAppointmentId] = useState<number | null>(null);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  // Toast state
  const [toast, setToast] = useState<{type: "success" | "error"; message: string} | null>(null);

  // Transform helper function
  const transformAppointment = (item: AppointmentDto, index: number): AppointmentViewModel => {
    const initials = item.customer?.name
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase() || "";

    const formattedDate = item.appointment_date
      ? new Date(item.appointment_date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "";

    const formattedTime = item.start_time && item.end_time
      ? `${item.start_time.slice(0, 5)} - ${item.end_time.slice(0, 5)}`
      : "";

    return {
      id: item.id || index,
      initials,
      customerName: item.customer?.name || "",
      customerEmail: "",
      serviceName: item.service?.name || "",
      staffName: item.staff?.name || "",
      formattedDate,
      formattedTime,
      status: item.status || "",
      duration: item.service?.duration ? `${item.service.duration} Minutes` : "",
      history: [],
      dto: item,
    };
  };

  // Fetch appointments from API
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get("/admin/appointments");
        console.log("📥 Appointments API Response:", response.data);
        const data = response.data;

        // Handle case where data might be an object with a data property
        let appointmentsArray: AppointmentDto[];
        if (Array.isArray(data)) {
          appointmentsArray = data as AppointmentDto[];
        } else if (
          data &&
          typeof data === "object" &&
          Array.isArray(data.data)
        ) {
          appointmentsArray = data.data as AppointmentDto[];
        } else {
          console.warn("⚠️ Appointments API response is not an array:", data);
          appointmentsArray = [];
        }

        // Transform API data to match our component's format
        const transformed: AppointmentViewModel[] = appointmentsArray.map(transformAppointment);
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
  const onEditClick = (row: AppointmentViewModel) => {
    setEditingAppointment(row.dto);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (appointmentId: number, data: Partial<AppointmentDto>) => {
    setIsSaveLoading(true);
    console.log(data);
    try {
      const response = await api.patch(`/admin/appointments/${appointmentId}`, data);
      
      let updatedAppointment: AppointmentDto;
      if (response.data && response.data.data) {
        updatedAppointment = response.data.data;
      } else if (response.data) {
        updatedAppointment = response.data;
      } else {
        updatedAppointment = { ...(editingAppointment || {}), ...data } as AppointmentDto;
      }

      setAppointments(prev => prev.map(appt => {
        if (appt.id === appointmentId) {
          return transformAppointment(updatedAppointment, appt.id);
        }
        return appt;
      }));
      setIsEditModalOpen(false);
      setToast({ type: "success", message: "Appointment updated successfully" });
    } catch (err: any) {
      setToast({ type: "error", message: err.response?.data.error });
    } finally {
      setIsSaveLoading(false);
    }
  };

  // Delete handlers
  const onDeleteClick = (row: AppointmentViewModel) => {
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
