import type { LucideIcon } from "lucide-react";

interface RecommendedProps {
  recommended: {
    icon: LucideIcon;
    name: string;
    desc: string;
    price: string;
  }[];
}

export default function Recommended({ recommended }: RecommendedProps) {
  return (
    <div className="lg:col-span-4 space-y-4">
      <h4 className="font-bold text-xl px-2">Recommended for You</h4>
      <div className="grid grid-cols-1 gap-4">
        {recommended.map(({ icon: Icon, name, desc, price }) => (
          <div
            key={name}
            className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-sm p-5 rounded-2xl flex flex-col justify-between group hover:border-indigo-300 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                <Icon size={18} />
              </div>
              <span className="text-indigo-600 font-bold">{price}</span>
            </div>
            <div>
              <h5 className="font-bold">{name}</h5>
              <p className="text-xs text-slate-500 mt-1">{desc}</p>
            </div>
            <button className="mt-6 w-full py-2.5 rounded-xl border border-indigo-200 text-indigo-600 font-bold text-sm hover:bg-indigo-600 hover:text-white transition-colors">
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
