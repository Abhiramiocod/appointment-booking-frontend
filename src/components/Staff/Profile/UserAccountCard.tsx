interface UserAccountCardProps {
  localUser: any;
}

export default function UserAccountCard({ localUser }: UserAccountCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex items-center gap-4">
      <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600 text-xl">
        {localUser?.name?.charAt(0).toUpperCase() || "U"}
      </div>
      <div>
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-1.5">
          {localUser?.name || "Abhiram Santhosh"}
          <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">
            Staff
          </span>
        </h2>
        <p className="text-slate-500 text-sm">{localUser?.email}</p>
      </div>
    </div>
  );
}
