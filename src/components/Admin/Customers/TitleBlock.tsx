import { Users } from "lucide-react";

export default function TitleBlock() {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <Users className="text-indigo-600" size={24} />
          Customers Management
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Browse registered clients, check total bookings, and view contact profiles.
        </p>
      </div>
    </div>
  );
}
