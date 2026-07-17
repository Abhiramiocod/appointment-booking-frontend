import { Search, Filter, SortAsc } from "lucide-react";

interface FilterBarProps {
  search: string;
  setSearch: (val: string) => void;
  minBookings: string;
  setMinBookings: (val: string) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
}

export default function FilterBar({
  search,
  setSearch,
  minBookings,
  setMinBookings,
  sortBy,
  setSortBy,
}: FilterBarProps) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 mb-6">
      {/* Search */}
      <div className="relative flex-1">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full pl-10 pr-4 py-2 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm transition-all"
        />
      </div>

      {/* Min Bookings Filter */}
      <div className="flex items-center gap-2">
        <Filter size={14} className="text-slate-500" />
        <select
          value={minBookings}
          onChange={(e) => setMinBookings(e.target.value)}
          className="border border-slate-200 focus:border-indigo-500 rounded-xl text-sm py-2 px-3 bg-white"
        >
          <option value="">All Booking Levels</option>
          <option value="1">1+ Bookings</option>
          <option value="5">5+ Bookings</option>
          <option value="10">10+ Bookings</option>
        </select>
      </div>

      {/* Sorting Filter */}
      <div className="flex items-center gap-2">
        <SortAsc size={14} className="text-slate-500" />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-slate-200 focus:border-indigo-500 rounded-xl text-sm py-2 px-3 bg-white"
        >
          <option value="name">Sort by Name</option>
          <option value="bookings_count">Sort by Bookings</option>
          <option value="created_at">Sort by Registration</option>
        </select>
      </div>
    </div>
  );
}
