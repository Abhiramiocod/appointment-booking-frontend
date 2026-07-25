import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
  XCircle,
} from "lucide-react";
import { Colors } from "../../../../lib/utils";
import StatusPill from "./StatusPill";

interface StaffRequestTableProps {
  filtered: any[];
  requests: any[];
  setModal: (modal: any) => void;
  approve: (request: any) => void;
}

export default function StaffRequestTable({
  filtered,
  requests,
  setModal,
  approve,
}: StaffRequestTableProps) {
  return (
    <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 shadow-sm rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr
              style={{
                backgroundColor: "rgba(245,242,254,0.5)",
              }}
            >
              <th
                className="px-4 py-3 text-[11px] font-bold uppercase tracking-wide"
                style={{ color: Colors.outline }}
              >
                Applicant
              </th>
              <th
                className="px-4 py-3 text-[11px] font-bold uppercase tracking-wide"
                style={{ color: Colors.outline }}
              >
                Designation
              </th>
              <th
                className="px-4 py-3 text-[11px] font-bold uppercase tracking-wide"
                style={{ color: Colors.outline }}
              >
                Experience
              </th>
              <th
                className="px-4 py-3 text-[11px] font-bold uppercase tracking-wide"
                style={{ color: Colors.outline }}
              >
                Phone Number
              </th>
              <th
                className="px-4 py-3 text-[11px] font-bold uppercase tracking-wide"
                style={{ color: Colors.outline }}
              >
                Applied Date
              </th>
              <th
                className="px-4 py-3 text-[11px] font-bold uppercase tracking-wide"
                style={{ color: Colors.outline }}
              >
                Status
              </th>
              <th
                className="px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-right"
                style={{ color: Colors.outline }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr
                key={r.id}
                className="hover:bg-[#4646d4]/5 transition-colors border-b last:border-b-0"
                style={{
                  borderColor: "rgba(199,196,215,0.15)",
                }}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    {r.avatar ? (
                      <img
                        className="w-8 h-8 rounded-full object-cover shadow-sm flex-shrink-0"
                        src={r.avatar}
                        alt={r.name}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                          (e.currentTarget.nextElementSibling as HTMLElement)!.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm flex-shrink-0"
                      style={{
                        background: "linear-gradient(135deg,#4648d4,#7c3aed)",
                        display: r.avatar ? "none" : "flex",
                      }}
                    >
                      {r.name?.charAt(0)?.toUpperCase() ?? "?"}
                    </div>
                    <div>
                      <p
                        className="font-semibold text-sm leading-tight"
                        style={{ color: Colors.onSurface }}
                      >
                        {r.name}
                      </p>
                      <p
                        className="text-[12px] leading-tight"
                        style={{ color: Colors.outline }}
                      >
                        {r.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td
                  className="px-4 py-3 text-sm font-medium"
                  style={{ color: Colors.onSurface }}
                >
                  {r.designation?.name || r.role || "—"}
                </td>
                <td
                  className="px-4 py-3 text-sm font-medium text-slate-700"
                >
                  {r.experience_years !== undefined && r.experience_years !== null
                    ? `${r.experience_years} yrs`
                    : r.experience || "—"}
                </td>
                <td
                  className="px-4 py-3 text-sm"
                  style={{ color: Colors.outline }}
                >
                  {r.phone || "—"}
                </td>
                <td
                  className="px-4 py-3 text-sm"
                  style={{ color: Colors.outline }}
                >
                  {r.created_at ? new Date(r.created_at).toLocaleDateString() : r.date || "—"}
                </td>
                <td className="px-4 py-3">
                  <StatusPill status={r.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => setModal({ type: "view", request: r })}
                      className="p-2 rounded-lg transition-colors hover:bg-[#4648d4]/10"
                      style={{ color: Colors.primary }}
                      title="View Request"
                    >
                      <Eye size={20} />
                    </button>
                    {r.status === "Pending" ? (
                      <>
                        <button
                          onClick={() => approve(r)}
                          className="p-2 rounded-lg transition-colors hover:bg-emerald-100"
                          style={{ color: "#059669" }}
                          title="Approve"
                        >
                          <CheckCircle2 size={20} />
                        </button>
                        <button
                          onClick={() =>
                            setModal({ type: "reject", request: r })
                          }
                          className="p-2 rounded-lg transition-colors hover:bg-red-100"
                          style={{ color: Colors.error }}
                          title="Reject"
                        >
                          <XCircle size={20} />
                        </button>
                      </>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-sm"
                  style={{ color: Colors.outline }}
                >
                  No applicants match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div
        className="px-6 py-4 border-t flex items-center justify-between"
        style={{ borderColor: "rgba(199,196,215,0.2)" }}
      >
        <p className="text-sm" style={{ color: Colors.onSurfaceVariant }}>
          Showing 1-{filtered.length} of {requests.length} requests
        </p>
        <div className="flex gap-2">
          <button
            disabled
            className="p-2 border rounded-lg disabled:opacity-50"
            style={{ borderColor: "rgba(199,196,215,0.4)" }}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            className="p-2 border rounded-lg hover:bg-slate-50"
            style={{ borderColor: "rgba(199,196,215,0.4)" }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
