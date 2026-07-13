import { Lightbulb, Sparkles } from "lucide-react";
import { Colors } from "../../../../lib/utils";

interface TopPerformers {
  name: string;
  rank: number;
  avatar: string;
  satisfaction: number;
  revenue: string;
  badgeColor: string;
}

interface SidebarPerformanceInsightsProps {
  topPerformers: TopPerformers[];
}

export default function SidebarPerformanceInsights({
  topPerformers,
}: SidebarPerformanceInsightsProps) {
  return (
    <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 shadow-sm rounded-xl p-5 sticky top-24">
      <div className="flex items-center justify-between mb-5">
        <h3
          className="text-lg font-semibold"
          style={{ color: Colors.onSurface }}
        >
          Top Performers
        </h3>

        <Sparkles size={18} style={{ color: Colors.primary }} />
      </div>

      <div className="space-y-4">
        {topPerformers.map((p) => (
          <div key={p.name} className="flex items-center gap-3 group">
            <div className="relative shrink-0">
              <div
                className="w-10 h-10 rounded-full overflow-hidden border-2"
                style={{
                  borderColor: p.rank === 1 ? Colors.primary : "transparent",
                }}
              >
                <img
                  className="w-full h-full object-cover"
                  src={p.avatar}
                  alt={p.name}
                />
              </div>

              <div
                className="absolute -bottom-1 -right-1 w-4.5 h-4.5 rounded-full flex items-center justify-center text-[9px] font-bold shadow-sm"
                style={{
                  backgroundColor: p.badgeColor,
                  color: Colors.onSurface,
                }}
              >
                {p.rank}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <p
                className="font-semibold text-sm truncate group-hover:text-[#4646d4] transition-colors"
                style={{ color: Colors.onSurface }}
              >
                {p.name}
              </p>

              <p className="text-[11px]" style={{ color: Colors.outline }}>
                {p.satisfaction}% Satisfaction
              </p>
            </div>

            <div className="text-right">
              <p
                className="font-semibold text-sm"
                style={{
                  color: p.rank === 1 ? Colors.primary : Colors.onSurface,
                }}
              >
                {p.revenue}
              </p>

              <p
                className="text-[10px] uppercase"
                style={{ color: Colors.outline }}
              >
                Revenue
              </p>
            </div>
          </div>
        ))}
      </div>

      <div
        className="mt-6 rounded-xl border p-4"
        style={{
          backgroundColor: "rgba(70,72,212,0.05)",
          borderColor: "rgba(70,72,212,0.1)",
        }}
      >
        <h4
          className="flex items-center gap-2 font-semibold text-sm mb-2"
          style={{ color: Colors.primary }}
        >
          <Lightbulb size={15} />
          AI Insight
        </h4>

        <p
          className="text-xs leading-5"
          style={{ color: Colors.onSurfaceVariant }}
        >
          Staff efficiency is up{" "}
          <span className="font-semibold text-emerald-600">12%</span> this week.
          Recommend opening 4 additional Friday afternoon slots.
        </p>

        <button
          className="mt-3 text-xs font-semibold hover:underline"
          style={{ color: Colors.primary }}
        >
          Apply suggestion
        </button>
      </div>
    </div>
  );
}
