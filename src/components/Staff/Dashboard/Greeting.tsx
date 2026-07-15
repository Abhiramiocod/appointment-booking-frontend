import { CalendarDays } from "lucide-react";

export default function Greeting() {
    return (
        <section className="mb-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight mb-1 text-slate-900">
                  Good Morning, Sarah 👋
                </h1>
                <p className="text-slate-500 text-sm">Here's what your day looks like.</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm self-start">
                <CalendarDays size={16} className="text-indigo-600" />
                <span className="text-sm font-semibold text-indigo-600">
                  Monday, Oct 16, 2023
                </span>
              </div>
            </div>
          </section>
    )
}