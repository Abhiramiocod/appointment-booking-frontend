import { useState, useEffect } from "react";
import api from "../../lib/api";
import { Colors } from "../../lib/utils";
import FilterBar from "../../components/Admin/Appointments/FilterBar";
import DetailsDrawer from "../../components/Admin/Appointments/DetailsDrawer";
import AppointmentsTable from "../../components/Admin/Appointments/AppointmentsTable";

interface RawAppointment {
  id?: number;
  customer?: { name?: string; email?: string };
  staff?: { name?: string };
  service?: { name?: string; duration?: number };
  appointment_date?: string;
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
        const transformed: Appointment[] = appointmentsArray.map(
          (item, index) => ({
            id: item.id || index,
            initials:
              item.customer?.name
                ?.split(" ")
                .map((n: string) => n[0])
                .join("")
                .toUpperCase() || "CU",

            name: item.customer?.name || "Unknown",

            email: "N/A", // your API doesn't return customer email
            service: item.service?.name || "Service",
            staff: item.staff?.name || "Staff",
            date: new Date(item.appointment_date).toLocaleDateString("en-US", {
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
          }),
        );
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
        <AppointmentsTable rows={appointments} onRowClick={setSelected} />
      )}
      <DetailsDrawer appointment={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
