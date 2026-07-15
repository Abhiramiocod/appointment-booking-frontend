interface StatsProps {
  stats: Array<{
    label: string;
    value: string;
    icon: React.ComponentType<{ size?: number }>;
  }>;
}

export default function Stats({ stats }: StatsProps) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-sm p-6 rounded-2xl flex items-center gap-4 hover:-translate-y-1 hover:shadow-md transition-all cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-indigo-100/60 flex items-center justify-center text-indigo-600">
            <Icon size={20} />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wide text-slate-400 mb-1">
              {label}
            </p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
