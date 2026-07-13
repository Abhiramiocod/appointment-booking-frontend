import { useState } from "react";
import { Download, Clock, CheckCircle2, XCircle } from "lucide-react";
import StaffKpiCard from "../../../components/Admin/Staffs/StaffRequests/StaffKpiCards";
import StaffFilterBar from "../../../components/Admin/Staffs/StaffRequests/StaffFilterBar";
import StaffRequestTable from "../../../components/Admin/Staffs/StaffRequests/StaffRequestTable";
import StaffRequestModal from "../../../components/Admin/Staffs/StaffRequests/StaffRequestModal";

// ---- Design tokens ----
const colors = {
  primary: "#4648d4",
  primaryContainer: "#6063ee",
  onSurface: "#1b1b23",
  onSurfaceVariant: "#464554",
  outline: "#767586",
  outlineVariant: "#c7c4d7",
  surface: "#fcf8ff",
  surfaceContainer: "#efecf8",
  surfaceContainerLow: "#f5f2fe",
  surfaceContainerHigh: "#e9e6f3",
  error: "#ba1a1a",
  errorContainer: "#ffdad6",
  onErrorContainer: "#93000a",
};

// ---- Mock data ----
const initialRequests = [
  {
    id: 1,
    name: "Sarah Jenkins",
    email: "s.jenkins@example.com",
    phone: "(555) 012-3456",
    date: "Oct 14, 2023",
    status: "Pending",
    role: "Senior Stylist",
    tags: ["Expert", "8+ Years Experience"],
    bio: "Passionate about precision cutting and avant-garde styling. Looking to join a forward-thinking studio that values artistic freedom and client satisfaction.",
    certifications: ["Master Colorist License", "Advanced Barbering Cert"],
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAmxj2GaLIC0xVTj2qf7RiWqcDj34DaxL31jJZhiY3mcADSbafFYz5zQBte-PwffQhYe_ILYt4ztKaTUcxrqXdL8mWJMbptuSJrj7hZ5VVpCQarwNGoUySeJ1c3jCOuirbmjOdroFL-oKTf9XxYDeDmYXGhZ4k6Eehmt8JIfrWgiGteKj1ZVkN3KEUcVZbzrW9FsWZn2p-FjHfLBjtIKAgwMv_b8AHkPTdEnaMPSGu8qDMcv-NElVeahLtV_FLxICydzDi5QOS6cZJi",
    largeAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDxqCVFp7Lq6VqhV5NbqXOO0eFOH4OhpmL2QkfDziust4EplcWO-MRiWuKODskgwrvnGMVPJaZxVpbnm8UxoTX8aWuMg2Z_GnmKWxHMQ9WHDhoDQKz0veU1_tYUyGsycMCWXOPn739bGvN_SI8eC4WKAzCW8nH3ySr1I9vfOr5Ae03H37ubCvcXJFpNuL3PLlRTu5gFV534l9uNNR4pj52A14UIIhPvsjTa_7wIsHXOjsY7jfLDhNOogiPgBv83YTQRS6t55C3jhRtV",
  },
  {
    id: 2,
    name: "Marcus Thompson",
    email: "m.thompson@example.com",
    phone: "(555) 098-7654",
    date: "Oct 13, 2023",
    status: "Approved",
    role: "Barber",
    tags: ["Skilled", "5+ Years Experience"],
    bio: "Focused on classic barbering with a modern edge.",
    certifications: ["Advanced Barbering Cert"],
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDYFahsQVoxPQM6HQJny0WScnxB6okB_yjVNuiljoHra2crvHpZaHATfOAZU-PqHNA3UVm8SxpzOUmsPqtFWfHyhqf14_SA2u6uzNx0fDj0GYJlgojUBW3-8fOdMClu3Eo3j4S73ZFIQFwhdir7cgBV8I-h_E0WrALS8xbxXnlV4m2QS2Wh4a5kdzdjlCwm9zVSNhs_Lmi-wcwTnU6inL441ntpl8j7Ewup69af2V1QxZyrLddhe8sZf_Sesg06EPfJwmgLoRQj308n",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    email: "e.rodriguez@example.com",
    phone: "(555) 442-1100",
    date: "Oct 12, 2023",
    status: "Rejected",
    role: "Aesthetician",
    tags: ["Expert", "10+ Years Experience"],
    bio: "Specializes in advanced skincare treatments.",
    certifications: ["Medical Aesthetics License"],
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBkUFmT6n1-MT_aVMiq3d4wuxzkkiaUx6dTywZ_ZomNpTD76tGGA_ula0xj4_WHBDaEOre7ZDj6c5_fxt4j8y7tOKWkCjtzfapRllLbWesD4UdypON83MLguFSNpSBIfPAuexUud66AXB3sR7y78r_oXpsOMngY1PN4-tsutkYxvAJQZ0Mna3d1Tjp0zE5gDC9cnC1ZYR9T8CPOe2hL_yqdY1ggX4DJZIRy8DIxNJYaXiO7CfFgQRfNVgOhP6m81lKRuyDOrfpKxwyV",
  },
];

export default function StaffRequestsContent() {
  const [requests, setRequests] = useState(initialRequests);
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [sortBy, setSortBy] = useState("Newest First");
  const [search, setSearch] = useState("");

  // modal state: null | { type: 'view'|'reject'|'success', request }
  const [modal, setModal] = useState(null);
  const [rejectNote, setRejectNote] = useState("");

  const closeModal = () => {
    setModal(null);
    setRejectNote("");
  };

  const approve = (request) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === request.id ? { ...r, status: "Approved" } : r)),
    );
    setModal({ type: "success", request });
  };

  const confirmReject = (request) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === request.id ? { ...r, status: "Rejected" } : r)),
    );
    closeModal();
  };

  const pending = requests.filter((r) => r.status === "Pending").length;
  const approvedToday = requests.filter((r) => r.status === "Approved").length;
  const rejectedToday = requests.filter((r) => r.status === "Rejected").length;

  const filtered = requests.filter((r) => {
    const matchesStatus =
      statusFilter === "All Status" || r.status === statusFilter;
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundColor: colors.surface }}
    >
      <div className="px-12 py-10 space-y-8 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end flex-wrap gap-4">
          <div>
            <h2
              className="text-2xl font-semibold"
              style={{ color: colors.onSurface }}
            >
              Staff Requests
            </h2>
            <p className="mt-1" style={{ color: colors.onSurfaceVariant }}>
              Review and manage incoming staff applications and professional
              credentials.
            </p>
          </div>
          <button
            className="flex items-center gap-2 bg-white border px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
            style={{
              color: colors.onSurface,
              borderColor: "rgba(199,196,215,0.4)",
            }}
          >
            <Download size={18} />
            Export CSV
          </button>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StaffKpiCard
            icon={<Clock size={22} fill="currentColor" fillOpacity={0.15} />}
            iconBg="rgba(70,72,212,0.1)"
            iconColor={colors.primary}
            label="Pending Requests"
            value={String(pending).padStart(2, "0")}
          />
          <StaffKpiCard
            icon={<CheckCircle2 size={22} />}
            iconBg="rgba(16,185,129,0.1)"
            iconColor="#059669"
            label="Approved Today"
            value={String(approvedToday).padStart(2, "0")}
          />
          <StaffKpiCard
            icon={<XCircle size={22} />}
            iconBg="rgba(186,26,26,0.1)"
            iconColor={colors.error}
            label="Rejected Today"
            value={String(rejectedToday).padStart(2, "0")}
          />
        </div>

        {/* Filters Bar */}
        <StaffFilterBar
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Table */}
        <StaffRequestTable
          filtered={filtered}
          requests={requests}
          setModal={setModal}
          approve={approve}
        />
      </div>

      {/* Modals */}
      <StaffRequestModal
        modal={modal}
        closeModal={closeModal}
        approve={approve}
        confirmReject={confirmReject}
        rejectNote={rejectNote}
        setRejectNote={setRejectNote}
      />
    </div>
  );
}
