import type { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";

interface RecommendedProps {
  recommended: {
    rawService: any;
    icon: LucideIcon;
    name: string;
    desc: string;
    price: string;
  }[];
}

export default function Recommended({ recommended }: RecommendedProps) {
  const navigate = useNavigate();

  if (!recommended || recommended.length === 0) return null;

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 shadow-sm rounded-2xl p-6 sm:p-7 transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-5">
        <h4 className="font-extrabold text-slate-800 text-lg tracking-tight flex items-center gap-2">
          <Sparkles size={18} className="text-blue-600" />
          Recommended Services
        </h4>
        <button
          onClick={() => navigate("/customer/book")}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
        >
          <span>View All</span>
          <ArrowRight size={13} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {recommended.map((item) => (
          <div
            key={item.name}
            className="bg-slate-50/70 hover:bg-white border border-slate-200/70 hover:border-blue-300 rounded-xl p-4 flex flex-col justify-between group transition-all duration-200 shadow-2xs hover:shadow-sm"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200 shadow-2xs">
                  <item.icon size={19} />
                </div>
                <span className="text-blue-600 font-extrabold text-xs bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                  {item.price}
                </span>
              </div>
              <h5 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                {item.name}
              </h5>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                {item.desc}
              </p>
            </div>

            <button
              onClick={() =>
                navigate("/customer/book", {
                  state: { preselectedService: item.rawService },
                })
              }
              className="mt-4 w-full py-2 rounded-lg bg-white group-hover:bg-blue-600 text-slate-700 group-hover:text-white border border-slate-200/80 group-hover:border-blue-600 font-bold text-xs transition-all shadow-2xs active:scale-98"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}


