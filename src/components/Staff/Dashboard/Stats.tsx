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
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map(
        ({ label, value, suffix, icon: Icon, iconBg, iconColor, fill }) => (
          <div
            key={label}
            className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm"
          >
            <div
              className={`w-9 h-9 flex items-center justify-center rounded-lg mb-3 ${iconBg}`}
            >
              <Icon
                size={18}
                className={iconColor}
                fill={fill ? "currentColor" : "none"}
                strokeWidth={fill ? 0 : 2}
              />
            </div>
            <div className="text-2xl font-bold tracking-tight">
              {value}
              {suffix && (
                <span className="text-sm font-normal text-slate-400">
                  {suffix}
                </span>
              )}
            </div>
            <div className="text-[10px] font-semibold tracking-wide text-slate-400 uppercase mt-0.5">
              {label}
            </div>
          </div>
        ),
      )}
    </section>
  );
}
