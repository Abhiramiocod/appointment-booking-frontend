import React from "react";
import { User, ShieldCheck, Mail, Calendar, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

interface SidebarProps {
  user: any;
}

export default function AccountSidebar({ user }: SidebarProps) {
  const role = user?.role ? user.role.toLowerCase() : "customer";
  const provider = user?.provider ? user.provider.toLowerCase() : "local";
  const isVerified = Boolean(user?.email_verified_at);

  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "N/A";

  // Calculate Profile Completion %
  const requiredFields = [
    { label: "Full Name", value: user?.name },
    { label: "Username", value: user?.username },
    { label: "Email Address", value: user?.email },
    { label: "Phone Number", value: user?.phone },
    { label: "Address", value: user?.address },
    { label: "City & State", value: user?.city },
    { label: "Bio / About", value: user?.bio },
    { label: "Profile Picture", value: user?.image },
  ];

  const completedCount = requiredFields.filter((f) => Boolean(f.value)).length;
  const completionPercentage = Math.round((completedCount / requiredFields.length) * 100);
  const missingFields = requiredFields.filter((f) => !f.value);

  return (
    <div className="space-y-6 sticky top-24">
      {/* Profile Completion Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Profile Completion
          </h4>
          <span className="text-sm font-extrabold text-indigo-600">
            {completionPercentage}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-500 rounded-full"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>

        {/* Missing Information */}
        {missingFields.length > 0 ? (
          <div className="space-y-2">
            <p className="text-[11px] font-semibold text-slate-500">Suggested action items:</p>
            <ul className="space-y-1.5">
              {missingFields.slice(0, 3).map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span>Add {item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
            <CheckCircle2 size={16} />
            <span>Your profile is fully completed!</span>
          </div>
        )}
      </div>

      {/* Account Details Summary Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider pb-3 border-b border-slate-100">
          Account Summary
        </h4>

        <div className="space-y-3 text-xs">
          <div className="flex justify-between items-center py-1">
            <span className="text-slate-500 font-medium">Role</span>
            <span className="font-semibold text-slate-900 capitalize">{role}</span>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-slate-500 font-medium">Provider</span>
            <span className="font-semibold text-slate-900 capitalize">{provider}</span>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-slate-500 font-medium">Email Status</span>
            <span
              className={`font-semibold ${
                isVerified ? "text-emerald-600" : "text-amber-600"
              }`}
            >
              {isVerified ? "Verified" : "Unverified"}
            </span>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-slate-500 font-medium">Member Since</span>
            <span className="font-semibold text-slate-900">{memberSince}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
