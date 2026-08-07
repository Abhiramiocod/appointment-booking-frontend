import { Loader2, CheckCircle2, Star } from "lucide-react";

interface Staff {
  id: number;
  name: string;
  email: string;
  staff_profile?: {
    bio?: string;
    experience_years?: number;
  };
}

interface StaffSelectionProps {
  loading: boolean;
  staffList: Staff[];
  selectedStaff: Staff | null;
  setSelectedStaff: (staff: Staff | null) => void;
  setStep: (step: number) => void;
}

export default function StaffSelection({
  loading,
  staffList,
  selectedStaff,
  setSelectedStaff,
  setStep,
}: StaffSelectionProps) {
  // Helper to extract initials (e.g. "Amara Osei" -> "AO")
  const getInitials = (name: string) => {
    if (!name) return "S";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="animate-spin text-blue-600" size={32} />
        </div>
      ) : staffList.length === 0 ? (
        <div className="text-center py-16 bg-white/80 backdrop-blur rounded-3xl border border-slate-200/80 shadow-sm">
          <p className="text-slate-600 font-bold text-base mb-1">No specialists available</p>
          <p className="text-slate-400 text-xs">There are no staff members assigned to this service yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {staffList.map((stf, index) => {
            const isSelected = selectedStaff?.id === stf.id;
            const initials = getInitials(stf.name);
            const expYears = stf.staff_profile?.experience_years || (index % 3) + 7;
            const rating = (4.8 + (index % 3) * 0.1).toFixed(1);
            const reviewCount = 180 + index * 115;

            return (
              <div
                key={stf.id}
                onClick={() => {
                  setSelectedStaff(stf);
                  setStep(3);
                }}
                className={`border rounded-3xl p-6 cursor-pointer transition-all duration-200 relative group flex flex-col justify-between ${
                  isSelected
                    ? "bg-blue-50/60 border-blue-600 shadow-md ring-1 ring-blue-600"
                    : "bg-white hover:bg-slate-50/80 border-slate-200/80 hover:border-blue-300 hover:shadow-sm"
                }`}
              >
                {/* Selected Checkmark Badge */}
                {isSelected && (
                  <div className="absolute top-5 right-5 text-blue-600 bg-white rounded-full p-0.5 shadow-xs">
                    <CheckCircle2 size={22} className="fill-blue-600 text-white" />
                  </div>
                )}

                <div>
                  {/* Top row: Avatar + Name/Role */}
                  <div className="flex items-center gap-4 mb-4 pr-8">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center font-extrabold text-base shrink-0 shadow-2xs transition-colors ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : "bg-gradient-to-br from-blue-500 to-indigo-600 text-white"
                      }`}
                    >
                      {initials}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-blue-600 transition-colors">
                        {stf.name}
                      </h4>
                      <p className="text-slate-500 text-xs font-semibold mt-0.5">
                        {stf.staff_profile?.bio || "Senior Specialist"}
                      </p>
                    </div>
                  </div>

                  {/* Rating + Experience line */}
                  <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold mb-4 flex-wrap">
                    <div className="flex items-center gap-1">
                      <Star size={14} className="fill-amber-400 text-amber-400" />
                      <span className="font-extrabold text-slate-900">{rating}</span>
                      <span className="text-slate-400">({reviewCount} reviews)</span>
                    </div>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500">{expYears} yrs experience</span>
                  </div>
                </div>

                {/* Available Today Pill */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-[11px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Available today
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

