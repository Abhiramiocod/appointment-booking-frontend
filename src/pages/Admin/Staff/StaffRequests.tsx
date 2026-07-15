import { useState, useEffect } from "react";
import { Clock, CheckCircle2, XCircle } from "lucide-react";
import StaffKpiCard from "../../../components/Admin/Staffs/StaffRequests/StaffKpiCards";
import StaffFilterBar from "../../../components/Admin/Staffs/StaffRequests/StaffFilterBar";
import StaffRequestTable from "../../../components/Admin/Staffs/StaffRequests/StaffRequestTable";
import StaffRequestModal from "../../../components/Admin/Staffs/StaffRequests/StaffRequestModal";
import { Colors } from "../../../lib/utils";
import api from "../../../lib/api";



export default function StaffRequestsContent() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState("Pending");
  const [sortBy, setSortBy] = useState("Newest First");
  const [search, setSearch] = useState("");

  // modal state: null | { type: 'view'|'reject'|'success', request }
  const [modal, setModal] = useState(null);
  const [rejectNote, setRejectNote] = useState("");

  const closeModal = () => {
    setModal(null);
    setRejectNote("");
  };

  const approve = async (request) => {
    try {
      await api.patch(`/admin/staff/requests/${request.id}/approve`);
      await fetchStaffRequests();
      setModal({ type: "success", request });
    } catch (err) {
      console.error("Approve failed", err);
    }
  };

  const confirmReject = async (request) => {
    try {
      await api.patch(`/admin/staff/requests/${request.id}/reject`, {
        note: rejectNote,
      });
      await fetchStaffRequests();
      closeModal();
    } catch (err) {
      console.error("Reject failed", err);
    }
  };

  const [toast, setToast] = useState<string | null>(null);

  const confirmDelete = async (request: any) => {
    try {
      await api.delete(`/admin/staff/requests/${request.id}`);
      await fetchStaffRequests();
      closeModal();
      setToast(`${request.name}'s request has been deleted.`);
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };



  const pending = requests.filter((r) => r.status === "Pending").length;
  const approvedToday = requests.filter((r) => r.status === "Approved").length;
  const rejectedToday = requests.filter((r) => r.status === "Rejected").length;

  const filtered = requests.filter((r) => {
    const matchesStatus =
      statusFilter === "All" || statusFilter === "All Status" || r.status === statusFilter;
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const fetchStaffRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/admin/staff/requests");
      const normalize = (s: string) =>
        s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : s;
      const data = (response.data.data || []).map((r: any) => ({
        ...r,
        status: normalize(r.status),
      }));
      setRequests(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load staff requests. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffRequests();
  }, []);

  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundColor: Colors.surface }}
    >
      <div className="px-12 py-10 space-y-8 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end flex-wrap gap-4">
          <div>
            <h2
              className="text-2xl font-semibold"
              style={{ color: Colors.onSurface }}
            >
              Staff Requests
            </h2>
            <p className="mt-1" style={{ color: Colors.onSurfaceVariant }}>
              Review and manage incoming staff applications and professional
              credentials.
            </p>
          </div>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StaffKpiCard
            icon={<Clock size={22} fill="currentColor" fillOpacity={0.15} />}
            iconBg="rgba(70,72,212,0.1)"
            iconColor={Colors.primary}
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
            iconColor={Colors.error}
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
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div
              className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: Colors.primary, borderTopColor: "transparent" }}
            />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center py-20 gap-3">
            <p style={{ color: Colors.error }}>{error}</p>
            <button
              onClick={fetchStaffRequests}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white"
              style={{ backgroundColor: Colors.primary }}
            >
              Retry
            </button>
          </div>
        ) : (
          <StaffRequestTable
            filtered={filtered}
            requests={requests}
            setModal={setModal}
            approve={approve}
          />
        )}
      </div>

      {/* Modals */}
      <StaffRequestModal
        modal={modal}
        closeModal={closeModal}
        approve={approve}
        confirmReject={confirmReject}
        confirmDelete={confirmDelete}
        rejectNote={rejectNote}
        setRejectNote={setRejectNote}
        onReject={(request) => setModal({ type: "reject", request })}
      />

      {/* Toast */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 300,
            background: Colors.inverseSurface,
            color: Colors.inverseOnSurface,
            padding: "12px 24px",
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 500,
            boxShadow: "0 8px 32px rgba(0,0,0,0.22)",
            display: "flex",
            alignItems: "center",
            gap: 10,
            animation: "fadeInUp 0.25s ease",
          }}
        >
          <span style={{ fontSize: 16 }}>🗑️</span>
          {toast}
          <style>{`@keyframes fadeInUp { from { opacity:0; transform:translate(-50%,12px); } to { opacity:1; transform:translate(-50%,0); } }`}</style>
        </div>
      )}
    </div>
  );
}
