import { Colors } from "../../../../lib/utils";

interface StaffKpiCardProps {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
}

export default function StaffKpiCard({
  icon,
  iconBg,
  iconColor,
  label,
  value,
}: StaffKpiCardProps) {
  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-sm rounded-xl p-5 flex items-center gap-5">
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: iconBg, color: iconColor }}
      >
        {icon}
      </div>
      <div>
        <p
          className="text-[11px] font-semibold tracking-wider uppercase opacity-70"
          style={{ color: Colors.onSurfaceVariant }}
        >
          {label}
        </p>
        <p
          className="text-[28px] font-bold leading-tight"
          style={{ color: Colors.onSurface }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
