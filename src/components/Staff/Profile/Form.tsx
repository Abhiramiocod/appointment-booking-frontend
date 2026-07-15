import { Phone, Briefcase, FileText, Loader2 } from "lucide-react";
import { Colors } from "../../../lib/utils";

interface FormProps {
  handleSubmit: (e: React.FormEvent) => void;
  phone: string;
  setPhone: (val: string) => void;
  experienceYears: number | "";
  setExperienceYears: (val: number | "") => void;
  bio: string;
  setBio: (val: string) => void;
  saving: boolean;
}

export default function Form({
  handleSubmit,
  phone,
  setPhone,
  experienceYears,
  setExperienceYears,
  bio,
  setBio,
  saving,
}: FormProps) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Phone */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Phone size={14} className="text-slate-400" />
          Phone Number
        </label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full bg-white rounded-lg px-3.5 py-2 text-sm border focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          style={{ borderColor: "rgba(199,196,215,0.6)" }}
          placeholder="e.g. +1 555-0199"
        />
      </div>

      {/* Experience Years */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Briefcase size={14} className="text-slate-400" />
          Years of Experience
        </label>
        <input
          type="number"
          value={experienceYears}
          onChange={(e) =>
            setExperienceYears(e.target.value === "" ? "" : Number(e.target.value))
          }
          className="w-full bg-white rounded-lg px-3.5 py-2 text-sm border focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          style={{ borderColor: "rgba(199,196,215,0.6)" }}
          placeholder="e.g. 5"
          min="0"
        />
      </div>

      {/* Bio */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <FileText size={14} className="text-slate-400" />
          Biography
        </label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full bg-white rounded-lg px-3.5 py-2.5 text-sm border focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[120px]"
          style={{ borderColor: "rgba(199,196,215,0.6)" }}
          placeholder="Share a short bio with clients..."
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={saving}
        style={{
          background: Colors.primary,
          color: "#fff",
          cursor: saving ? "not-allowed" : "pointer",
        }}
        className="w-full py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 mt-4"
      >
        {saving ? <Loader2 size={16} className="animate-spin" /> : null}
        {saving ? "Saving Changes..." : "Save Changes"}
      </button>
    </form>
  );
}
