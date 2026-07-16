import { useState, useEffect } from "react";
import { X, Loader2, Scissors } from "lucide-react";
import { Colors } from "../../../../lib/utils";
import api from "../../../../lib/api";

interface ManageServicesModalProps {
  staff: any;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export default function ManageServicesModal({
  staff,
  onClose,
  onSuccess,
}: ManageServicesModalProps) {
  const [allServices, setAllServices] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const srvRes = await api.get("/admin/services");
        const services: any[] = srvRes.data?.data || srvRes.data || [];
        setAllServices(services);

        // Pre-select services already assigned to this staff member
        const currentServices: any[] =
          staff.services || staff.profile?.services || [];
        const currentIds = currentServices.map((s: any) =>
          typeof s === "number" ? s : s.id
        );
        setSelectedIds(currentIds);
      } catch (err) {
        console.error("Failed to load services", err);
        setError("Could not load services. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [staff]);

  const toggleService = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSave = async () => {
    setError(null);
    setSubmitting(true);
    try {
      await api.put(`/admin/staff/${staff.id}/services`, {
        service_ids: selectedIds,
      });
      onSuccess(`${staff.name}'s services have been updated successfully.`);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Failed to update services. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const staffName = staff.name;
  const designation =
    staff.profile?.designation?.name ||
    staff.profile?.designation ||
    staff.role ||
    "Staff Member";

  return (
    <div
      className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
      style={{ maxHeight: "90vh" }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header stripe */}
      <div
        style={{
          background: "linear-gradient(135deg,#4648d4,#7c3aed)",
          padding: "20px 24px 16px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <div>
          <p
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Staff Management
          </p>
          <h3
            style={{ color: "#fff", fontSize: 18, fontWeight: 800, margin: "4px 0 0" }}
          >
            Manage Services
          </h3>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 4 }}>
            {staffName} — {designation}
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-white/20 transition-colors text-white/80 hover:text-white"
        >
          <X size={18} />
        </button>
      </div>

      {/* Body */}
      <div
        className="overflow-y-auto"
        style={{ maxHeight: "calc(90vh - 180px)" }}
      >
        {error && (
          <div className="mx-4 mt-4 p-3 bg-rose-50 border border-rose-200/60 text-rose-700 text-xs rounded-xl">
            ⚠️ {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2
              size={28}
              className="animate-spin"
              style={{ color: Colors.primary }}
            />
          </div>
        ) : allServices.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Scissors size={32} style={{ color: Colors.outlineVariant }} />
            <p className="text-sm font-medium" style={{ color: Colors.outline }}>
              No services configured yet.
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-1">
            <p
              className="text-[11px] mb-3"
              style={{ color: Colors.onSurfaceVariant }}
            >
              Check the services this staff member is qualified to perform.
            </p>
            {allServices.map((srv) => {
              const isChecked = selectedIds.includes(srv.id);
              return (
                <label
                  key={srv.id}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all hover:bg-indigo-50/50"
                  style={{
                    border: `1.5px solid ${isChecked ? "rgba(70,72,212,0.3)" : "rgba(199,196,215,0.3)"}`,
                    background: isChecked
                      ? "rgba(70,72,212,0.05)"
                      : "transparent",
                    marginBottom: 6,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleService(srv.id)}
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-semibold leading-tight"
                      style={{
                        color: isChecked ? Colors.primary : Colors.onSurface,
                      }}
                    >
                      {srv.name}
                    </p>
                    {srv.description && (
                      <p
                        className="text-[11px] leading-tight mt-0.5 line-clamp-1"
                        style={{ color: Colors.outline }}
                      >
                        {srv.description}
                      </p>
                    )}
                  </div>
                  {srv.duration && (
                    <span
                      className="text-[10px] font-semibold shrink-0"
                      style={{ color: Colors.outline }}
                    >
                      {srv.duration} min
                    </span>
                  )}
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        className="px-6 pb-6 flex gap-3 border-t border-slate-100 pt-4"
        style={{ position: "sticky", bottom: 0, background: "#fff" }}
      >
        <button
          type="button"
          onClick={onClose}
          style={{
            flex: 1,
            padding: "11px 0",
            borderRadius: 12,
            border: "1.5px solid rgba(199,196,215,0.4)",
            background: "transparent",
            color: Colors.onSurfaceVariant,
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={submitting || loading}
          style={{
            flex: 2,
            padding: "11px 0",
            borderRadius: 12,
            border: "none",
            background:
              submitting || loading
                ? "rgba(70,72,212,0.5)"
                : "linear-gradient(135deg,#4648d4,#7c3aed)",
            color: "#fff",
            fontWeight: 700,
            fontSize: 14,
            cursor: submitting || loading ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            fontFamily: "inherit",
          }}
        >
          {submitting && (
            <Loader2 size={16} style={{ animation: "spin 0.7s linear infinite" }} />
          )}
          {submitting ? "Saving…" : "Save Changes"}
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </button>
      </div>
    </div>
  );
}
