import { UserSearch } from "lucide-react";
import { Colors } from "../../../../lib/utils";

interface StaffFilterBarProps {
  search: string;
  setSearch: (search: string) => void;
  statusFilter: string;
  setStatusFilter: (statusFilter: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
}

export default function StaffFilterBar({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
}: StaffFilterBarProps) {
  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-sm rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="relative">
          <UserSearch
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: Colors.outlineVariant }}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search applicant name..."
            className="bg-white rounded-lg pl-9 py-2 text-sm w-64 border focus:ring-2 focus:outline-none"
            style={{ borderColor: "rgba(199,196,215,0.4)" }}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white rounded-lg px-3 py-2 text-sm border focus:ring-2 focus:outline-none"
          style={{ borderColor: "rgba(199,196,215,0.4)" }}
        >
          <option>All Status</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm" style={{ color: Colors.onSurfaceVariant }}>
          Sort by:
        </span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-white rounded-lg px-3 py-2 text-sm border focus:ring-2 focus:outline-none"
          style={{ borderColor: "rgba(199,196,215,0.4)" }}
        >
          <option>Newest First</option>
          <option>Oldest First</option>
          <option>Name A-Z</option>
        </select>
      </div>
    </div>
  );
}
