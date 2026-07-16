import { useState, useEffect } from "react";
import api from "../../lib/api";
import { Search, Filter, SortAsc, Users, Calendar, Award, Loader2 } from "lucide-react";

interface Customer {
  id: number;
  name: string;
  email: string;
  total_bookings: number;
  created_at?: string;
}

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [minBookings, setMinBookings] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("name");

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const params: any = {
        search,
        sort_by: sortBy,
      };
      if (minBookings !== "") {
        params.min_bookings = minBookings;
      }
      const response = await api.get("/admin/customers", { params });
      setCustomers(response.data || []);
    } catch (err) {
      console.error("Failed to load customers list:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchCustomers();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, minBookings, sortBy]);

  return (
    <div style={{ padding: "28px 32px", flex: 1, width: "100%" }}>
      {/* Title */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <Users className="text-indigo-600" size={24} />
            Customers Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Browse registered clients, check total bookings, and view contact profiles.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
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

      {/* Customers List Table */}
      {loading ? (
        <div className="bg-white p-12 flex justify-center items-center rounded-2xl border border-slate-200 shadow-sm">
          <Loader2 className="animate-spin text-indigo-600" />
        </div>
      ) : customers.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 shadow-sm">
          <Users className="mx-auto text-slate-300 mb-3" size={32} />
          <p className="text-slate-600 font-bold text-sm">No Customers Found</p>
          <p className="text-slate-400 text-xs mt-1">Try refining your search or filter values.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200">
                  <th className="py-4 px-6 text-[10px] font-semibold tracking-wide text-slate-400">CUSTOMER INFO</th>
                  <th className="py-4 px-6 text-[10px] font-semibold tracking-wide text-slate-400">EMAIL</th>
                  <th className="py-4 px-6 text-[10px] font-semibold tracking-wide text-slate-400">TOTAL BOOKINGS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {customers.map((c) => {
                  const initials = c.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2);

                  return (
                    <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center font-bold text-xs text-indigo-600 border border-indigo-100">
                            {initials}
                          </div>
                          <div>
                            <span className="font-semibold text-sm text-slate-800">{c.name}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-600 font-medium">
                        {c.email}
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200/60 rounded-full text-xs font-bold text-slate-600">
                          <Award size={12} className="text-amber-500" />
                          {c.total_bookings}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
