import { User, ShieldCheck } from "lucide-react";

interface ProfileTabsProps {
  activeTab: "profile" | "security";
  setActiveTab: (tab: "profile" | "security") => void;
}

export default function ProfileTabs({ activeTab, setActiveTab }: ProfileTabsProps) {
  return (
    <div className="flex border-b border-slate-200 mb-8 gap-2">
      <button
        type="button"
        onClick={() => setActiveTab("profile")}
        className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
          activeTab === "profile"
            ? "border-indigo-600 text-indigo-600 bg-indigo-50/50 rounded-t-xl"
            : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
        }`}
      >
        <User size={18} />
        Profile Details
      </button>

      <button
        type="button"
        onClick={() => setActiveTab("security")}
        className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
          activeTab === "security"
            ? "border-indigo-600 text-indigo-600 bg-indigo-50/50 rounded-t-xl"
            : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
        }`}
      >
        <ShieldCheck size={18} />
        Security & Authentication
      </button>
    </div>
  );
}
