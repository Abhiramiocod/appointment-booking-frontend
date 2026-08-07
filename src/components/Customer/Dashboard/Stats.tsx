interface StatsProps {
  stats: Array<{
    label: string;
    value: string;
    icon: React.ComponentType<{ size?: number }>;
  }>;
}

export default function Stats({ stats }: StatsProps) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="bg-white/80 backdrop-blur-xl border border-slate-200/80 shadow-sm p-5 sm:p-6 rounded-2xl flex items-center gap-4 hover:-translate-y-1 hover:shadow-md hover:border-blue-200 transition-all duration-200 cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200 shrink-0">
            <Icon size={20} />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase truncate">
              {label}
            </p>
            <p className="text-2xl font-extrabold text-slate-800 tracking-tight mt-0.5 truncate">{value}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

