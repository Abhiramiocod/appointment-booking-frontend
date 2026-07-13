export default function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { dot: string; text: string; bg: string; label: string }> = {
    active: {
      dot: "bg-emerald-500",
      text: "text-emerald-600",
      bg: "bg-emerald-500/10",
      label: "Active",
    },
    active_ui: {
      dot: "bg-emerald-500",
      text: "text-emerald-600",
      bg: "bg-emerald-500/10",
      label: "Active",
    },
    on_leave: {
      dot: "bg-amber-500",
      text: "text-amber-600",
      bg: "bg-amber-500/10",
      label: "On Leave",
    },
    on_break: {
      dot: "bg-amber-500",
      text: "text-amber-600",
      bg: "bg-amber-500/10",
      label: "On Break",
    },
    offline: {
      dot: "bg-slate-400",
      text: "text-slate-500",
      bg: "bg-slate-400/10",
      label: "Offline",
    },
  };

  const key = status ? status.toLowerCase() : "offline";
  const s = map[key] || {
    dot: "bg-slate-400",
    text: "text-slate-500",
    bg: "bg-slate-400/10",
    label: status || "Offline",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${s.bg} ${s.text}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${s.dot} ${key === "active" ? "animate-pulse" : ""}`}
      />
      {s.label}
    </span>
  );
}

