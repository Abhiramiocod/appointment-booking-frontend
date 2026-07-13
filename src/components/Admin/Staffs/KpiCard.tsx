import { Colors } from "../../../lib/utils";

interface KpiCardProps {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  sublabel: string;
  sublabelColor?: string;
}

export default function KpiCard({
  icon,
  iconBg,
  iconColor,
  label,
  value,
  sublabel,
  sublabelColor,
}: KpiCardProps) {
  return (
    <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 shadow-sm rounded-xl p-4 flex items-center gap-3 transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: iconBg, color: iconColor }}
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p
          className="text-[10px] font-semibold uppercase tracking-wide"
          style={{ color: Colors.outline }}
        >
          {label}
        </p>

        <h3
          className="text-xl font-bold leading-tight"
          style={{ color: Colors.onSurface }}
        >
          {value}
        </h3>

        <p
          className="text-xs leading-tight"
          style={{ color: sublabelColor || Colors.onSurfaceVariant }}
        >
          {sublabel}
        </p>
      </div>
    </div>
  );
}
