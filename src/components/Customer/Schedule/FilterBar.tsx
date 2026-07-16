interface FilterBarProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  filters?: string[];
}

export default function FilterBar({
  activeFilter,
  setActiveFilter,
  filters = ["All", "Upcoming", "Completed", "Cancelled / Rejected"],
}: FilterBarProps) {
  return (
    <section className="flex items-center gap-3 mb-6 flex-wrap">
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          onClick={() => setActiveFilter(filter)}
          className={`px-4 py-1.5 rounded-lg font-semibold text-xs transition-all ${
            activeFilter === filter
              ? "bg-indigo-600 text-white shadow-sm"
              : "bg-white hover:bg-slate-50 text-slate-500 border border-slate-200/80 shadow-sm"
          }`}
        >
          {filter}
        </button>
      ))}
    </section>
  );
}
