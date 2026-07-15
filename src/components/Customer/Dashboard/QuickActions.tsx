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
    } else if (label === "Browse Staff") {
      navigate("/customer/book");
    } else if (label === "My History") {
      navigate("/customer/schedule");
    }
  };

  return (
    <div className="lg:col-span-4">
      <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-sm rounded-2xl p-6 h-full flex flex-col justify-between">
        <div>
          <h4 className="font-bold text-lg mb-6">Quick Actions</h4>
          <div className="space-y-3">
            {quickActions.map(({ label, icon: Icon }) => (
              <button
                key={label}
                onClick={() => handleAction(label)}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-white/60 hover:bg-indigo-50 border border-slate-200 group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className="text-indigo-600" />
                  <span className="font-medium text-sm">{label}</span>
                </div>
                <ChevronRight
                  size={18}
                  className="text-slate-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 p-4 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-200/50 rounded-lg flex items-center justify-center text-indigo-600 shrink-0">
            <Lightbulb size={18} />
          </div>
          <p className="text-xs text-indigo-900 leading-snug">
            Tip: Book with Sarah Jenkins before Friday to get 10% off your next
            session.
          </p>
        </div>
      </div>
    </div>
  );
}
