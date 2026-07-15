import { Sparkles } from "lucide-react";

export default function CustomerServices() {
  return (
    <div style={{ padding: "28px 32px", flex: 1 }}>
      <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
          <Sparkles size={18} />
        </div>
        Services
      </h1>
      <p className="text-slate-500 text-sm mt-1">
        Browse and discover our premium signature packages and wellness treatments.
      </p>

      <div className="mt-8 text-center text-slate-500 py-12 bg-white rounded-xl border border-slate-200 shadow-sm max-w-lg">
        <p className="font-semibold text-slate-700">Services Catalog Coming Soon</p>
        <p className="text-xs text-slate-400 mt-1">We are updating our selection of luxurious haircuts, beard grooming, and facial therapies.</p>
      </div>
    </div>
  );
}
