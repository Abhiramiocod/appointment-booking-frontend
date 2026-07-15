import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Colors } from "../../../lib/utils";

interface FormProps {
  handleSubmit: (e: React.FormEvent) => void;
  currentPassword: string;
  setCurrentPassword: (val: string) => void;
  newPassword: string;
  setNewPassword: (val: string) => void;
  newPasswordConfirmation: string;
  setNewPasswordConfirmation: (val: string) => void;
  showCurrent: boolean;
  setShowCurrent: (val: boolean) => void;
  showNew: boolean;
  setShowNew: (val: boolean) => void;
  showConfirm: boolean;
  setShowConfirm: (val: boolean) => void;
  loading: boolean;
}

export default function Form({
  handleSubmit,
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  newPasswordConfirmation,
  setNewPasswordConfirmation,
  showCurrent,
  setShowCurrent,
  showNew,
  setShowNew,
  showConfirm,
  setShowConfirm,
  loading,
}: FormProps) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Current Password */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Current Password
        </label>
        <div className="relative">
          <input
            type={showCurrent ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className="w-full bg-white rounded-lg px-3.5 py-2.5 text-sm border focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            style={{ borderColor: "rgba(199,196,215,0.6)" }}
            placeholder="Enter current password"
          />
          <button
            type="button"
            onClick={() => setShowCurrent(!showCurrent)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* New Password */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          New Password
        </label>
        <div className="relative">
          <input
            type={showNew ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full bg-white rounded-lg px-3.5 py-2.5 text-sm border focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            style={{ borderColor: "rgba(199,196,215,0.6)" }}
            placeholder="Minimum 8 characters"
          />
          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Confirm New Password */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Confirm New Password
        </label>
        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            value={newPasswordConfirmation}
            onChange={(e) => setNewPasswordConfirmation(e.target.value)}
            required
            className="w-full bg-white rounded-lg px-3.5 py-2.5 text-sm border focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            style={{ borderColor: "rgba(199,196,215,0.6)" }}
            placeholder="Re-enter new password"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        style={{
          background: Colors.primary,
          color: "#fff",
          cursor: loading ? "not-allowed" : "pointer",
        }}
        className="w-full py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 mt-4"
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : null}
        {loading ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
}