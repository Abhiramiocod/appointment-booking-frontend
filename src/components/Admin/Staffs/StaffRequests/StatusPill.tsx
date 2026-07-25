import { Colors } from "../../../../lib/utils";

export default function StatusPill({ status }: { status: string }) {
  const map: Record<string, { bg: string; text: string; dot: string }> = {
    Pending: { bg: "#fef3c7", text: "#b45309", dot: "#f59e0b" },
    Approved: { bg: "#d1fae5", text: "#047857", dot: "#10b981" },
    Rejected: { bg: Colors.errorContainer, text: Colors.onErrorContainer, dot: Colors.error },
  };
  const s = map[status] || map.Pending;
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
      style={{ backgroundColor: s.bg, color: s.text }}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-2" style={{ backgroundColor: s.dot }} />
      {status}
    </span>
  );
}