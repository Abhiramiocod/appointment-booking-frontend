interface FilterItem {
  id: string;
  label: string;
  count?: number;
}

interface FilterBarProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  filters?: FilterItem[];
}

export default function FilterBar({
  activeFilter,
  setActiveFilter,
  filters = [
    { id: "All", label: "All" },
    { id: "Upcoming", label: "Upcoming" },
    { id: "Completed", label: "Completed" },
    { id: "Cancelled", label: "Cancelled" },
  ],
}: FilterBarProps) {
  return (
    <section className="flex items-center gap-2 mb-6 flex-wrap border-b border-slate-200/80 pb-3">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.id;
        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
              isActive
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-slate-100/70 hover:bg-slate-200/70 text-slate-600 border border-slate-200/60"
            }`}
          >
            <span>{filter.label}</span>
            {filter.count !== undefined && (
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-slate-200/80 text-slate-700"
                }`}
              >
                {filter.count}
              </span>
            )}
          </button>
        );
      })}
    </section>
  );
}

