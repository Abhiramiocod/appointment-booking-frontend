import { Colors } from "../../../../lib/utils";
import StatusBadge from "./StatusBadge";

interface MainTableProps {
  filters: string[];
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  staffMembers: any[];
}

export default function MainTable({ staffMembers }: MainTableProps) {
  return (
    <div className="flex-[3] space-y-6">
      <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 shadow-sm rounded-xl overflow-hidden">
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
              {/* <th
                className="px-4 py-3 text-[11px] font-bold uppercase tracking-wide"
                style={{ color: Colors.outline }}
              >
                Performance
              </th> */}
              <th
                className="px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-right"
                style={{ color: Colors.outline }}
              >
                Actions
              </th>
            </tr>
          </thead>

          {/* Removed divide-y */}
          <tbody>
            {staffMembers.map((s) => (
              <tr
                key={s.id || s.name}
                className="hover:bg-[#4646d4]/5 transition-colors border-b last:border-b-0"
                style={{
                  borderColor: "rgba(199,196,215,0.15)",
                }}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full flex-shrink-0 relative">
                      {(s.profile?.profile_photo || s.avatar) ? (
                        <>
                          <img
                            className="w-8 h-8 rounded-full object-cover object-top"
                            src={s.profile?.profile_photo || s.avatar}
                            alt={s.name}
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).style.display = "none";
                              (e.currentTarget.nextElementSibling as HTMLElement)!.style.display = "flex";
                            }}
                          />
                          <div
                            className="w-8 h-8 rounded-full absolute inset-0 items-center justify-center text-xs font-bold text-white"
                            style={{
                              background: "linear-gradient(135deg,#4648d4,#7c3aed)",
                              display: "none",
                            }}
                          >
                            {s.name?.charAt(0)?.toUpperCase() ?? "?"}
                          </div>
                        </>
                      ) : (
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                          style={{ background: "linear-gradient(135deg,#4648d4,#7c3aed)" }}
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
                        {s.role}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3">
                  <StatusBadge
                    status={s.profile?.employment_status || s.status}
                  />
                </td>

                <td className="px-4 py-3">
                  <span className="text-sm font-medium text-slate-700">
                    {s.profile?.experience_years !== undefined &&
                    s.profile?.experience_years !== null
                      ? `${s.profile.experience_years} yrs`
                      : "—"}
                  </span>
                </td>

                {/* <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <Star
                      size={13}
                      className="text-amber-500"
                      fill="currentColor"
                    />
                    <span className="font-semibold text-sm">
                      {s.rating.toFixed(1)}
                    </span>
                    <span
                      className="text-[11px]"
                      style={{ color: Colors.outline }}
                    >
                      ({s.reviews})
                    </span>
                  </div>
                </td> */}

                <td className="px-4 py-3 text-right">
                  <button
                    className="text-xs font-semibold hover:underline"
                    style={{ color: Colors.primary }}
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
