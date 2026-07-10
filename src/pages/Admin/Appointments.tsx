import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../lib/api";
import { Colors } from "../../lib/utils";
import FilterBar from "../../components/Admin/Appointments/FilterBar";
import DetailsDrawer from "../../components/Admin/Appointments/DetailsDrawer";
import AppointmentsTable from "../../components/Admin/Appointments/AppointmentsTable";
import EditAppointmentModal from "../../components/Admin/Appointments/EditAppointmentModal";
import DeleteConfirmationDialog from "../../components/Admin/Appointments/DeleteConfirmationDialog";
import Toast from "../../components/Toast";
import type {
  AppointmentDto,
  AppointmentViewModel,
} from "../../types/Admin/Appointments/appointments";

interface Staff {
  id: number;
  name: string;
}

interface Service {
  id: number;
  name: string;
}

export default function Appointments() {
  const [selected, setSelected] = useState<AppointmentViewModel | null>(null);
  const [appointments, setAppointments] = useState<AppointmentViewModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [serviceList, setServiceList] = useState<Service[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // Edit state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] =
    useState<AppointmentDto | null>(null);
  const [isSaveLoading, setIsSaveLoading] = useState(false);

  // Delete state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingAppointmentId, setDeletingAppointmentId] = useState<
    number | null
  >(null);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  // Get filters from search params
  const filters = {
    status: searchParams.get("status") || "",
    staff_id: searchParams.get("staff_id") || "",
    service_id: searchParams.get("service_id") || "",
    appointment_date: searchParams.get("appointment_date") || "",
    search: searchParams.get("search") || "",
  };

  // Toast state
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Transform helper function
  const transformAppointment = (
    item: AppointmentDto,
    index: number,
  ): AppointmentViewModel => {
    const initials =
      item.customer?.name
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

    const formattedTime =
      item.start_time && item.end_time
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
      duration: item.service?.duration
        ? `${item.service.duration} Minutes`
        : "",
      history: [],
      dto: item,
    };
  };

  const searchStaff = async (query: string): Promise<Staff[]> => {
    try {
      const response = await api.get("/admin/staff/search", {
        params: { search: query }
      });
      return response.data.data ?? [];
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  const fetchServices = async () => {
    try {
      const response = await api.get("/admin/services");
      const serviceArray: Service[] = response.data.data ?? [];
      setServiceList(serviceArray);
    } catch (err) {
      console.error(err);
    }
  };

  const searchServices = async (query: string): Promise<Service[]> => {
    try {
      const response = await api.get("/admin/services/search", {
        params: { search: query }
      });
      return response.data.data ?? [];
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  const fetchAppointments = async () => {
    try {
      setLoading(true);

      const response = await api.get("/admin/appointments", {
        params: {
          status: filters.status || undefined,
          staff_id: filters.staff_id || undefined,
          service_id: filters.service_id || undefined,
          appointment_date: filters.appointment_date || undefined,
          search: filters.search || undefined,
        },
      });

      const appointmentsArray: AppointmentDto[] = response.data.data ?? [];

      setAppointments(appointmentsArray.map(transformAppointment));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch appointments, staff, and services from API
  useEffect(() => {
    fetchServices();
    fetchAppointments();
  }, [searchParams]);

  useEffect(() => {
    const handleCreated = () => {
      fetchAppointments();
    };
    window.addEventListener("appointment-created", handleCreated);
    return () => {
      window.removeEventListener("appointment-created", handleCreated);
    };
  }, []);

  // Edit handlers
  const onEditClick = (row: AppointmentViewModel) => {
    setEditingAppointment(row.dto);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (
    appointmentId: number,
    data: Partial<AppointmentDto>,
  ) => {
    setIsSaveLoading(true);
    console.log(data);
    try {
      const response = await api.patch(
        `/admin/appointments/${appointmentId}`,
        data,
      );

      const updatedAppointment = response.data.data ?? response.data;

      setAppointments((prev) =>
          prev.map((appt) => {
            if (appt.id === appointmentId) {
              return transformAppointment(updatedAppointment, appt.id);
            }
            return appt;
          }),
      );
      setIsEditModalOpen(false);
      setToast({
        type: "success",
        message: "Appointment updated successfully",
      });
    } catch (err: any) {
      setToast({
        type: "error",
        message: err.response?.data?.message ?? "Failed to update appointment",
      });
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
      setAppointments((prev) =>
          prev.filter((appt) => appt.id !== deletingAppointmentId),
      );
      setIsDeleteDialogOpen(false);
      setDeletingAppointmentId(null);
      setToast({
        type: "success",
        message: "Appointment deleted successfully",
      });
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
        <FilterBar
            filters={filters}
            onFilterChange={(key, value) => {
              setSearchParams((prev) => {
                const newParams = new URLSearchParams(prev);
            if (value) {
                  newParams.set(key, value);
                } else {
                  newParams.delete(key);
                }
                return newParams;
              });
            }}
            onReset={() => {
              setSearchParams({});
            }}
            serviceList={serviceList}
            searchStaff={searchStaff}
            searchServices={searchServices}
        />
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
