import type { LucideIcon } from "lucide-react";

interface StatsProps {
  label: string;
  value: string;
  suffix?: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  fill?: boolean;
}

export default function Stats({ stats }: { stats: StatsProps[] }) {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(
        ({ label, value, suffix, icon: Icon, iconBg, iconColor, fill }) => (
          <div
            key={label}
            className="bg-white p-5 rounded-2xl border border-slate-200/50 shadow-sm hover:shadow-md/5 transition-all flex flex-col justify-between"
          >
            <div>
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-xl mb-4 ${iconBg}`}
              >
                <Icon
                  size={20}
                  className={iconColor}
                  fill={fill ? "currentColor" : "none"}
                  strokeWidth={fill ? 0 : 2.2}
                />
              </div>
              <div className="text-3xl font-extrabold text-slate-800 tracking-tight leading-none">
                {value}
                {suffix && (
                  <span className="text-sm font-semibold text-slate-400 ml-0.5">
                    {suffix}
                  </span>
                )}
              </div>
            </div>
            <div className="text-[9px] font-bold tracking-wider text-slate-400 uppercase mt-2">
              {label}
            </div>
          </div>
        ),
      )}
    </section>
  );
}
