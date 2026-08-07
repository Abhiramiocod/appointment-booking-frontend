import { useNavigate } from "react-router-dom";
import { ChevronRight, Lightbulb } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface QuickActionsProps {
  quickActions: {
    label: string;
    icon: LucideIcon;
  }[];
}

export default function QuickActions({ quickActions }: QuickActionsProps) {
  const navigate = useNavigate();

  const handleAction = (label: string) => {
    if (label === "Book New") {
      navigate("/customer/book");
    } else if (label === "My History") {
      navigate("/customer/schedule");
    }
  };

  return (
    <div className="lg:col-span-4">
      <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 shadow-sm rounded-2xl p-6 sm:p-7 h-full flex flex-col justify-between transition-all hover:shadow-md">
        <div>
          <h4 className="font-extrabold text-slate-800 text-lg mb-5 tracking-tight">Quick Actions</h4>
          <div className="space-y-3">
            {quickActions.map(({ label, icon: Icon }) => (
              <button
                key={label}
                onClick={() => handleAction(label)}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-50/70 hover:bg-blue-50/60 border border-slate-200/70 hover:border-blue-200 group transition-all duration-200 text-left active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200/60 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200 shadow-sm">
                    <Icon size={18} />
                  </div>
                  <span className="font-bold text-sm text-slate-700 group-hover:text-blue-600 transition-colors">{label}</span>
                </div>
                <ChevronRight
                  size={16}
                  className="text-slate-400 opacity-60 group-hover:opacity-100 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-blue-50/90 to-indigo-50/90 border border-blue-100/80 flex items-start gap-3.5 shadow-sm">
          <div className="w-9 h-9 bg-blue-600 text-white rounded-lg flex items-center justify-center shrink-0 shadow-sm mt-0.5">
            <Lightbulb size={17} />
          </div>
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-blue-900 mb-0.5">Special Tip</p>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Book with your favorite specialist ahead of time to lock in optimal time slots.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

