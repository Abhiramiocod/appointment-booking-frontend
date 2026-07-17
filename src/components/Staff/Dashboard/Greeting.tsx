import { CalendarDays } from "lucide-react";

export default function Greeting() {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const name = user?.name ? user.name.split(" ")[0] : "Staff Member";

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1 text-slate-900">
            Welcome back, {name} 👋
          </h1>
          <p className="text-slate-500 text-sm">Here's what your day looks like.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200/80 shadow-sm self-start sm:self-auto">
          <CalendarDays size={16} className="text-indigo-600" />
          <span className="text-sm font-semibold text-indigo-600">
            {formattedDate}
          </span>
        </div>
      </div>
    </section>
  );
}