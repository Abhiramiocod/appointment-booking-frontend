import { User } from "lucide-react";

export default function Header() {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
        <User className="text-indigo-600" size={24} />
        My Profile
      </h1>
      <p className="text-slate-500 text-sm mt-1">
        Manage your contact information, credentials, and biography details.
      </p>
    </div>
  );
}
