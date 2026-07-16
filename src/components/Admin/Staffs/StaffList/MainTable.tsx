import { useEffect, useRef, useState } from "react";
import {
  Eye,
  Pencil,
  Scissors,
  MoreVertical,
  Activity,
  UserX,
  Trash2,
} from "lucide-react";
import { Colors } from "../../../../lib/utils";
import StatusBadge from "./StatusBadge";

interface MainTableProps {
  filters: string[];
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  staffMembers: any[];
  setModal: (modal: any) => void;
  onEdit?: (staff: any) => void;
  onManageServices?: (staff: any) => void;
  onChangeStatus?: (staff: any) => void;
  onDeactivate?: (staff: any) => void;
  onDelete?: (staff: any) => void;
}

import { X } from "lucide-react";

/* ── Service chips with modal ───────────────────────────────────────── */
function ServiceChips({ services }: { services: any[] }) {
  const MAX_VISIBLE = 2;
  const [showModal, setShowModal] = useState(false);

  if (!services || services.length === 0) {
    return <span className="text-xs text-slate-400">—</span>;
  }

  const visible = services.slice(0, MAX_VISIBLE);
  const overflow = services.slice(MAX_VISIBLE);

  return (
    <div className="flex flex-wrap items-center gap-1">
      {visible.map((srv: any) => {
        const name = typeof srv === "string" ? srv : srv.name;
        const key = typeof srv === "object" ? srv.id : name;
        return (
          <span
            key={key}
            className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
            style={{
              backgroundColor: "rgba(70,72,212,0.1)",
              color: Colors.primary,
            }}
          >
            {name}
          </span>
        );
      })}
      {overflow.length > 0 && (
        <>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="px-2 py-0.5 rounded-full text-[10px] font-bold cursor-pointer hover:bg-slate-200 transition-colors"
            style={{
              backgroundColor: "rgba(118,117,134,0.12)",
              color: Colors.outline,
            }}
          >
            +{overflow.length} More
          </button>
          
          {showModal &&
            createPortal(
              <div
                className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
                onClick={() => setShowModal(false)}
              >
                <div
                  className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                    <h4 className="font-bold text-slate-800 text-sm">Assigned Services</h4>
                    <button
                      onClick={() => setShowModal(false)}
                      className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="p-5 max-h-[300px] overflow-y-auto space-y-2">
                    {services.map((srv: any) => {
                      const name = typeof srv === "string" ? srv : srv.name;
                      const key = typeof srv === "object" ? srv.id : name;
                      return (
                        <div
                          key={key}
                          className="px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between"
                          style={{
                            backgroundColor: "rgba(70,72,212,0.06)",
                            color: Colors.primary,
                          }}
                        >
                          <span>{name}</span>
                          {srv.duration && (
                            <span className="text-[10px] opacity-70">
                              {srv.duration} min
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50 flex justify-end">
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-lg transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>,
              document.body
            )}
        </>
      )}
    </div>
  );
}

import { createPortal } from "react-dom";

function ActionsMenu({
  staff,
  onView,
  onEdit,
  onManageServices,
  onChangeStatus,
  onDeactivate,
  onDelete,
}: {
  staff: any;
  onView: () => void;
  onEdit: () => void;
  onManageServices: () => void;
  onChangeStatus: () => void;
  onDeactivate: () => void;
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, right: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node) &&
        (!menuRef.current || !menuRef.current.contains(e.target as Node))
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleOpen = () => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setMenuPos({
        top: rect.bottom + window.scrollY + 4,
        right: window.innerWidth - rect.right - window.scrollX,
      });
    }
    setOpen((v) => !v);
  };

  const action = (fn: () => void) => {
    setOpen(false);
    fn();
  };

  const menuItems = [
    {
      label: "View Profile",
      icon: <Eye size={14} />,
      fn: () => action(onView),
      color: Colors.primary,
    },
    {
      label: "Edit",
      icon: <Pencil size={14} />,
      fn: () => action(onEdit),
      color: Colors.onSurfaceVariant,
    },
    {
      label: "Change Status",
      icon: <Activity size={14} />,
      fn: () => action(onChangeStatus),
      color: Colors.onSurfaceVariant,
    },
    {
      label: "Delete",
      icon: <Trash2 size={14} />,
      fn: () => action(onDelete),
      color: Colors.error,
    },
  ];

  return (
    <div ref={ref} className="inline-block">
      <button
        ref={btnRef}
        onClick={handleOpen}
        className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-700"
        title="Actions"
      >
        <MoreVertical size={16} />
      </button>

      {open &&
        createPortal(
          <div
            ref={menuRef}
            className="absolute z-[200] rounded-xl shadow-xl border border-slate-100 py-1 min-w-[170px]"
            style={{
              top: `${menuPos.top}px`,
              right: `${menuPos.right}px`,
              background: "#fff",
            }}
          >
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={item.fn}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold hover:bg-slate-50 transition-colors text-left"
                style={{ color: item.color }}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
}


/* ── Main component ──────────────────────────────────────────────────── */
export default function MainTable({
  filters,
  activeFilter,
  setActiveFilter,
  sortBy,
  setSortBy,
  staffMembers,
  setModal,
  onEdit,
  onManageServices,
  onChangeStatus,
  onDeactivate,
  onDelete,
}: MainTableProps) {
  return (
    <div className="flex-[3] space-y-6">
      <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 shadow-sm rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr style={{ backgroundColor: "rgba(245,242,254,0.5)" }}>
                <th
                  className="px-4 py-3 text-[11px] font-bold uppercase tracking-wide"
                  style={{ color: Colors.outline }}
                >
                  Staff Member
                </th>
                <th
                  className="px-4 py-3 text-[11px] font-bold uppercase tracking-wide"
                  style={{ color: Colors.outline }}
                >
                  Status
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
                  Services
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
              {staffMembers.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-10 text-center text-sm"
                    style={{ color: Colors.outline }}
                  >
                    No staff members found.
                  </td>
                </tr>
              )}
              {staffMembers.map((s) => (
                <tr
                  key={s.id || s.name}
                  className="hover:bg-[#4646d4]/5 transition-colors border-b last:border-b-0"
                  style={{ borderColor: "rgba(199,196,215,0.15)" }}
                >
                  {/* Staff Member cell */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full flex-shrink-0 relative">
                        {s.profile?.profile_photo || s.avatar ? (
                          <>
                            <img
                              className="w-8 h-8 rounded-full object-cover object-top"
                              src={s.profile?.profile_photo || s.avatar}
                              alt={s.name}
                              onError={(e) => {
                                (
                                  e.currentTarget as HTMLImageElement
                                ).style.display = "none";
                                (
                                  e.currentTarget
                                    .nextElementSibling as HTMLElement
                                )!.style.display = "flex";
                              }}
                            />
                            <div
                              className="w-8 h-8 rounded-full absolute inset-0 items-center justify-center text-xs font-bold text-white"
                              style={{
                                background:
                                  "linear-gradient(135deg,#4648d4,#7c3aed)",
                                display: "none",
                              }}
                            >
                              {s.name?.charAt(0)?.toUpperCase() ?? "?"}
                            </div>
                          </>
                        ) : (
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                            style={{
                              background:
                                "linear-gradient(135deg,#4648d4,#7c3aed)",
                            }}
                          >
                            {s.name?.charAt(0)?.toUpperCase() ?? "?"}
                          </div>
                        )}
                      </div>

                      <div>
                        <p
                          className="font-semibold text-sm leading-tight"
                          style={{ color: Colors.onSurface }}
                        >
                          {s.name}
                        </p>
                        <p
                          className="text-[12px] leading-tight capitalize"
                          style={{ color: Colors.outline }}
                        >
                          {s.profile?.designation?.name || s.role}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <StatusBadge
                      status={s.profile?.employment_status || s.status}
                    />
                  </td>

                  {/* Experience */}
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-slate-700">
                      {s.profile?.experience_years !== undefined &&
                      s.profile?.experience_years !== null
                        ? `${s.profile.experience_years} yrs`
                        : "—"}
                    </span>
                  </td>

                  {/* Services */}
                  <td className="px-4 py-3">
                    <ServiceChips
                      services={s.services || s.profile?.services || []}
                    />
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 text-right">
                    <ActionsMenu
                      staff={s}
                      onView={() => setModal({ type: "view", request: s })}
                      onEdit={() => onEdit?.(s)}
                      onManageServices={() => onManageServices?.(s)}
                      onChangeStatus={() =>
                        onChangeStatus
                          ? onChangeStatus(s)
                          : setModal({
                              type: "status",
                              request: s,
                              currentStatus:
                                s.profile?.employment_status ||
                                s.status ||
                                "active",
                            })
                      }
                      onDeactivate={() =>
                        onDeactivate
                          ? onDeactivate(s)
                          : setModal({
                              type: "status",
                              request: s,
                              currentStatus: "inactive",
                            })
                      }
                      onDelete={() => onDelete?.(s)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
