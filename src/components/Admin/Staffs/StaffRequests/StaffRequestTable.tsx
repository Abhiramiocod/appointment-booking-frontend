import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Trash2,
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
    <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-sm rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr
              className="border-b"
              style={{
                backgroundColor: "rgba(239,236,248,0.3)",
                borderColor: "rgba(199,196,215,0.2)",
              }}
            >
              <th
                className="px-6 py-4 text-xs font-semibold uppercase tracking-wider"
                style={{ color: Colors.onSurfaceVariant }}
              >
                Applicant
              </th>
              <th
                className="px-6 py-4 text-xs font-semibold uppercase tracking-wider"
                style={{ color: Colors.onSurfaceVariant }}
              >
                Phone Number
              </th>
              <th
                className="px-6 py-4 text-xs font-semibold uppercase tracking-wider"
                style={{ color: Colors.onSurfaceVariant }}
              >
                Applied Date
              </th>
              <th
                className="px-6 py-4 text-xs font-semibold uppercase tracking-wider"
                style={{ color: Colors.onSurfaceVariant }}
              >
                Status
              </th>
              <th
                className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-right"
                style={{ color: Colors.onSurfaceVariant }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody
            className="divide-y"
            style={{ borderColor: "rgba(199,196,215,0.1)" }}
          >
            {filtered.map((r) => (
              <tr
                key={r.id}
                className="hover:bg-slate-50/60 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      className="w-9 h-9 rounded-full object-cover shadow-sm"
                      src={r.avatar}
                      alt={r.name}
                    />
                    <div>
                      <p
                        className="font-semibold leading-tight"
                        style={{ color: Colors.onSurface }}
                      >
                        {r.name}
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: Colors.onSurfaceVariant }}
                      >
                        {r.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td
                  className="px-6 py-4 text-sm"
                  style={{ color: Colors.onSurfaceVariant }}
                >
                  {r.phone}
                </td>
                <td
                  className="px-6 py-4 text-sm"
                  style={{ color: Colors.onSurfaceVariant }}
                >
                  {r.date}
                </td>
                <td className="px-6 py-4">
                  <StatusPill status={r.status} />
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
                    ) : (
                      <button
                        className="p-2 rounded-lg transition-colors hover:bg-red-100"
                        style={{ color: Colors.error }}
                        title="Delete"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-10 text-center text-sm"
                  style={{ color: Colors.onSurfaceVariant }}
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
