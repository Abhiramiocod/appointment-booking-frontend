import React from "react";
import { Check, X } from "lucide-react";

interface PasswordStrengthProps {
  password: string;
}

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const requirements = [
    { label: "8+ characters", met: password.length >= 8 },
    { label: "Uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Lowercase letter", met: /[a-z]/.test(password) },
    { label: "Number", met: /[0-9]/.test(password) },
    { label: "Special character (!@#$%^&*)", met: /[^A-Za-z0-9]/.test(password) },
  ];

  const score = requirements.filter((r) => r.met).length;

  const getStrengthBar = () => {
    if (score <= 1) return { width: "20%", color: "bg-rose-500", label: "Weak" };
    if (score <= 3) return { width: "60%", color: "bg-amber-500", label: "Medium" };
    if (score === 4) return { width: "80%", color: "bg-blue-500", label: "Strong" };
    return { width: "100%", color: "bg-emerald-500", label: "Very Strong" };
  };

  const strength = getStrengthBar();

  if (!password) return null;

  return (
    <div className="space-y-3 mt-3 p-4 bg-slate-50 rounded-xl border border-slate-200/80">
      {/* Strength Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${strength.color}`}
            style={{ width: strength.width }}
          />
        </div>
        <span className="text-xs font-semibold text-slate-700">{strength.label}</span>
      </div>

      {/* Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
        {requirements.map((req, index) => (
          <div key={index} className="flex items-center gap-1.5 text-xs">
            {req.met ? (
              <Check size={14} className="text-emerald-600 shrink-0" />
            ) : (
              <X size={14} className="text-slate-400 shrink-0" />
            )}
            <span className={req.met ? "text-emerald-700 font-medium" : "text-slate-500"}>
              {req.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
