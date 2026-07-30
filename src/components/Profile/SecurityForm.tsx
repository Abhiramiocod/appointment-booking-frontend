import React, { useState } from "react";
import { Eye, EyeOff, Lock, ExternalLink, ShieldCheck, KeyRound, CheckCircle2 } from "lucide-react";
import googleLogo from "../../assets/images/google.webp";
import microsoftLogo from "../../assets/images/microsoftlogo.png";
import PasswordStrength from "./PasswordStrength";

interface SecurityFormProps {
  user: any;
  onChangePasswordSubmit: (data: any) => Promise<void>;
  saving: boolean;
}

export default function SecurityForm({
  user,
  onChangePasswordSubmit,
  saving,
}: SecurityFormProps) {
  const provider = user?.provider ? user.provider.toLowerCase() : "local";
  const hasPassword = Boolean(user?.has_password);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (newPassword !== confirmPassword) {
      setFormError("New passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setFormError("Password must be at least 8 characters long.");
      return;
    }

    const payload: any = {
      new_password: newPassword,
      new_password_confirmation: confirmPassword,
    };

    if (hasPassword) {
      payload.current_password = currentPassword;
    }

    await onChangePasswordSubmit(payload);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const isOAuthUser = provider === "google" || provider === "microsoft";

  return (
    <div className="space-y-6">
      {/* 1. Linked OAuth Provider Information Banner (If Social Login) */}
      {isOAuthUser && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="p-3 bg-slate-100 rounded-2xl shrink-0">
                <img
                  src={provider === "google" ? googleLogo : microsoftLogo}
                  alt={provider}
                  className="w-7 h-7 object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-slate-900 capitalize">
                    {provider} Identity Linked
                  </h4>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                    <CheckCircle2 size={12} className="mr-1 text-blue-600" />
                    Connected
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {hasPassword
                    ? `You can sign in using either Email & Password or your ${provider === "google" ? "Google" : "Microsoft"} account.`
                    : `You currently sign in with ${provider === "google" ? "Google" : "Microsoft"}. Create a local password below to enable password sign-in.`}
                </p>
              </div>
            </div>

            <a
              href={
                provider === "google"
                  ? "https://myaccount.google.com/security"
                  : "https://account.microsoft.com/security"
              }
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-all shrink-0 cursor-pointer"
            >
              Manage {provider === "google" ? "Google" : "Microsoft"} Account
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      )}

      {/* 2. Password Creation / Change Form Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
            {hasPassword ? <Lock size={20} /> : <KeyRound size={20} />}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {hasPassword ? "Change Password" : "Create Password"}
            </h3>
            <p className="text-xs text-slate-500">
              {hasPassword
                ? "Ensure your account uses a strong password to maintain security."
                : `Set a local password to allow signing in via email & password as well as ${isOAuthUser ? provider : "OAuth"}.`}
            </p>
          </div>
        </div>

        {formError && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl flex items-center gap-2">
            <span>⚠️</span>
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
          {/* Current Password (ONLY required if user already HAS a local password) */}
          {hasPassword && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Current Password *
              </label>
              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm text-slate-800 transition-all pr-10"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          )}

          {/* New Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              {hasPassword ? "New Password *" : "Password *"}
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm text-slate-800 transition-all pr-10"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {/* Password Strength Meter */}
            <PasswordStrength password={newPassword} />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Confirm Password *
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm text-slate-800 transition-all pr-10"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-sm transition-all shadow-sm disabled:opacity-50 cursor-pointer"
            >
              <ShieldCheck size={18} />
              {saving
                ? "Saving..."
                : hasPassword
                ? "Update Password"
                : "Create Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
