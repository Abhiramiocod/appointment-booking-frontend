export default function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { dot: string; text: string; bg: string }> = {
    Active: {
      dot: "bg-emerald-500",
      text: "text-emerald-600",
      bg: "bg-emerald-500/10",
    },
    "On Break": {
      dot: "bg-amber-500",
      text: "text-amber-600",
      bg: "bg-amber-500/10",
    },
    Offline: {
      dot: "bg-slate-400",
      text: "text-slate-500",
      bg: "bg-slate-400/10",
    },
  };
  const s = map[status] || map.Offline;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${s.bg} ${s.text}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${s.dot} ${status === "Active" ? "animate-pulse" : ""}`}
      />
      {status}
    </span>
  );
}
