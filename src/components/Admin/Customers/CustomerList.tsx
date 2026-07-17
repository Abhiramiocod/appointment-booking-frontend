import { Users, Loader2, Award } from "lucide-react";

interface Customer {
  id: number;
  name: string;
  email: string;
  total_bookings: number;
  created_at?: string;
}

interface CustomerListProps {
  loading: boolean;
  customers: Customer[];
}

export default function CustomerList({ loading, customers }: CustomerListProps) {
  if (loading) {
    return (
      <div className="bg-white p-12 flex justify-center items-center rounded-2xl border border-slate-200 shadow-sm">
        <Loader2 className="animate-spin text-indigo-600" />
      </div>
    );
  }

  if (customers.length === 0) {
    return (
      <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 shadow-sm">
        <Users className="mx-auto text-slate-300 mb-3" size={32} />
        <p className="text-slate-600 font-bold text-sm">No Customers Found</p>
        <p className="text-slate-400 text-xs mt-1">Try refining your search or filter values.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-200">
              <th className="py-4 px-6 text-[10px] font-semibold tracking-wide text-slate-400">
                CUSTOMER INFO
              </th>
              <th className="py-4 px-6 text-[10px] font-semibold tracking-wide text-slate-400">
                EMAIL
              </th>
              <th className="py-4 px-6 text-[10px] font-semibold tracking-wide text-slate-400">
                TOTAL BOOKINGS
              </th>
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
  );
}
