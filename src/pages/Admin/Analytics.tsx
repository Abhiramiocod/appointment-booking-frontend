import { useState, useEffect } from "react";
import api from "../../lib/api";
import { BarChart3, TrendingUp, Users, DollarSign, Award, Star, Loader2, Calendar } from "lucide-react";

interface AnalyticsData {
  metrics: {
    total_customers: number;
    total_staff: number;
    total_profit: number;
    completed_appointments: number;
    confirmed_appointments: number;
    pending_appointments: number;
    cancelled_appointments: number;
  };
  monthly_earnings: {
    month: string;
    total: string;
  }[];
  top_services: {
    name: string;
    price: number;
    bookings: number;
    revenue: number;
  }[];
  staff_performance: {
    name: string;
    bookings: number;
    rating: number;
  }[];
}

export default function Analytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await api.get("/admin/analytics");
        setData(response.data);
      } catch (err) {
        console.error("Failed to load analytics statistics:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading || !data) {
    return (
      <div className="flex-1 p-8 flex justify-center items-center h-[80vh]">
        <Loader2 className="animate-spin text-indigo-600" size={32} />
      </div>
    );
  }

  const { metrics, monthly_earnings, top_services, staff_performance } = data;

  const cards = [
    {
      label: "Total Gross Profits",
      value: `$${metrics.total_profit.toLocaleString()}`,
      desc: "Revenue from completed sessions",
      icon: DollarSign,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      label: "Completed Sessions",
      value: String(metrics.completed_appointments),
      desc: "Fulfilled service bookings",
      icon: TrendingUp,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
    },
    {
      label: "Specialists Active",
      value: String(metrics.total_staff),
      desc: "Contracted styling team",
      icon: Award,
      color: "text-amber-600 bg-amber-50 border-amber-100",
    },
    {
      label: "Active Client Base",
      value: String(metrics.total_customers),
      desc: "Registered customer profiles",
      icon: Users,
      color: "text-cyan-600 bg-cyan-50 border-cyan-100",
    },
  ];

  return (
    <div style={{ padding: "28px 32px", flex: 1, width: "100%" }}>
      {/* Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <BarChart3 className="text-indigo-600" size={24} />
          Business Analytics
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Monitor studio performance, check service popularity, and trace gross revenue parameters.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((c, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between"
          >
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{c.label}</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{c.value}</h3>
              <p className="text-[11px] text-slate-500 mt-1">{c.desc}</p>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${c.color}`}>
              <c.icon size={22} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Monthly Earnings */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-base text-slate-800 mb-4 flex items-center gap-2">
            <Calendar size={18} className="text-indigo-600" />
            Revenue Growth (Monthly)
          </h3>
          {monthly_earnings.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-10">No completed transactions to map.</p>
          ) : (
            <div className="space-y-4">
              {monthly_earnings.map((m) => {
                const totalVal = parseFloat(m.total);
                // Calculate percentage relative to max
                const maxVal = Math.max(...monthly_earnings.map((me) => parseFloat(me.total))) || 1;
                const percentage = (totalVal / maxVal) * 100;

                return (
                  <div key={m.month} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-600">
                      <span>{m.month}</span>
                      <span className="font-bold text-slate-800">${totalVal.toFixed(2)}</span>
                    </div>
                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Appointment Status Pie list */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-800 mb-4">Lifecycle Allocations</h3>
            <div className="space-y-3">
              {[
                { label: "Completed", count: metrics.completed_appointments, color: "bg-emerald-500" },
                { label: "Confirmed", count: metrics.confirmed_appointments, color: "bg-indigo-500" },
                { label: "Pending", count: metrics.pending_appointments, color: "bg-amber-500" },
                { label: "Cancelled", count: metrics.cancelled_appointments, color: "bg-slate-400" },
              ].map((item) => {
                const total =
                  metrics.completed_appointments +
                  metrics.confirmed_appointments +
                  metrics.pending_appointments +
                  metrics.cancelled_appointments;
                const pct = total > 0 ? Math.round((item.count / total) * 100) : 0;

                return (
                  <div key={item.label} className="flex items-center justify-between text-xs font-semibold text-slate-600">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                      <span>{item.label}</span>
                    </div>
                    <span className="text-slate-800">{item.count} ({pct}%)</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Top Services */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-base text-slate-800 mb-4">Top Services by Bookings</h3>
          {top_services.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-10">No bookings logged yet.</p>
          ) : (
            <div className="space-y-4">
              {top_services.map((srv, i) => (
                <div key={i} className="flex justify-between items-center text-xs font-semibold">
                  <div>
                    <p className="text-slate-800 font-bold">{srv.name}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{srv.bookings} bookings • ${srv.price} each</p>
                  </div>
                  <span className="text-indigo-600 font-extrabold">${srv.revenue.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Staff Performance */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-base text-slate-800 mb-4">Specialists Leaderboard</h3>
          {staff_performance.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-10">No stylist data available.</p>
          ) : (
            <div className="space-y-4">
              {staff_performance.map((staff, i) => (
                <div key={i} className="flex justify-between items-center text-xs font-semibold">
                  <div>
                    <p className="text-slate-800 font-bold">{staff.name}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{staff.bookings} bookings handled</p>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200/55 px-2 py-0.5 rounded-lg">
                    <Star size={11} className="fill-amber-500 stroke-none" />
                    <span className="font-extrabold text-[11px]">{staff.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
