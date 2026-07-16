import { ChevronRight, Loader2 } from "lucide-react";

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
  return (
    <div className="space-y-6">
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="animate-spin text-indigo-600" />
        </div>
      ) : staffList.length === 0 ? (
        <p className="text-slate-400 italic text-sm">
          No specialists currently offer this service.
        </p>
      ) : (
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden divide-y divide-slate-100">
          {staffList.map((stf) => (
            <div
              key={stf.id}
              onClick={() => {
                setSelectedStaff(stf);
                setStep(3);
              }}
              className={`p-6 flex items-center gap-6 hover:bg-slate-50/50 transition-colors cursor-pointer ${
                selectedStaff?.id === stf.id ? "bg-indigo-50/40" : ""
              }`}
            >
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center font-bold text-indigo-600 text-lg shrink-0">
                {stf.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-800 text-sm mb-1">{stf.name}</h4>
                <p className="text-slate-400 text-xs mb-2">Specialist • {stf.email}</p>
                <p className="text-xs text-slate-500 line-clamp-2 italic">
                  {stf.staff_profile?.bio || "Professional stylist."}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400">
                <ChevronRight size={16} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
