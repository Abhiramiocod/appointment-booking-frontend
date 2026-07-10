import { ChevronLeft, ChevronRight } from "lucide-react";
import { Colors } from "../../../lib/utils";
import StatusBadge from "./StatusBadge";
import AppointmentDropdown from "./AppointmentDropdown";

import type { AppointmentViewModel } from "../../../types/Admin/Appointments/appointments";

interface AppointmentsTableProps {
  rows: AppointmentViewModel[];
  onRowClick: (row: AppointmentViewModel) => void;
  onEdit: (row: AppointmentViewModel) => void;
  onDelete: (row: AppointmentViewModel) => void;
}

export default function AppointmentsTable({ rows, onRowClick, onEdit, onDelete }: AppointmentsTableProps) {
  const headers = ["Customer", "Service", "Staff", "Date & Time", "Status", ""];
  return (
    <div
      className="rounded-2xl overflow-hidden shadow-sm border"
      style={{
        backgroundColor: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(24px)",
        borderColor: "rgba(199,196,215,0.2)",
      }}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr
              style={{
                backgroundColor: Colors.surfaceContainerLow,
                borderBottom: `1px solid rgba(199,196,215,0.3)`,
              }}
            >
              {headers.map((h, i) => (
                <th
                  key={i}
                  className={`px-6 py-4 text-xs font-semibold uppercase tracking-wider ${
                    i === headers.length - 1 ? "text-right" : ""
                  }`}
                  style={{ color: Colors.onSurfaceVariant }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={row.id}
                onClick={() => onRowClick(row)}
                className="cursor-pointer transition-all"
                style={{
                  borderTop:
                    idx === 0 ? "none" : `1px solid rgba(199,196,215,0.2)`,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(96,99,238,0.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                      style={{
                        backgroundColor: "rgba(96,99,238,0.12)",
                        color: Colors.primary,
                      }}
                    >
                      {row.initials}
                    </div>
                    <div>
                      <div
                        className="font-bold"
                        style={{ color: Colors.onSurface }}
                      >
                        {row.customerName}
                      </div>
                      <div
                        className="text-sm"
                        style={{ color: Colors.onSurfaceVariant }}
                      >
                        {row.customerEmail}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span
                    className="font-medium"
                    style={{ color: Colors.onSurface }}
                  >
                    {row.serviceName}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: Colors.secondaryContainer }}
                    />
                    <span style={{ color: Colors.onSurfaceVariant }}>
                      {row.staffName}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div
                    className="font-medium"
                    style={{ color: Colors.onSurface }}
                  >
                    {row.formattedDate}
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: Colors.onSurfaceVariant }}
                  >
                    {row.formattedTime}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <StatusBadge status={row.status} />
                </td>
                <td className="px-6 py-5 text-right">
                  <div onClick={(e) => e.stopPropagation()}>
                    <AppointmentDropdown
                      onEdit={() => onEdit(row)}
                      onDelete={() => onDelete(row)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        className="p-6 flex items-center justify-between"
        style={{ backgroundColor: Colors.surfaceContainerLow }}
      >
        <span className="text-sm" style={{ color: Colors.onSurfaceVariant }}>
          Showing 1-{rows.length} of 124 appointments
        </span>
        <div className="flex gap-2">
          <button
            disabled
            className="p-2 rounded-lg border disabled:opacity-50"
            style={{
              borderColor: "rgba(199,196,215,0.3)",
              color: Colors.onSurfaceVariant,
            }}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            className="p-2 rounded-lg border transition-all"
            style={{
              borderColor: "rgba(199,196,215,0.3)",
              color: Colors.onSurfaceVariant,
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
