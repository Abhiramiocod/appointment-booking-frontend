import { Calendar } from "lucide-react";

export default function Header() {
    return (
        <section className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Calendar size={18} />
            </div>
            Schedule Manager
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage your incoming appointments, confirmations, and requests.
          </p>
        </div>
      </section>
    )
}