import { statusStyles } from "../../../lib/utils";

export default function StatusBadge({ status }) {
  const normalizedStatus =
    status
      ?.replace(/_/g, " ")
      .replace(/\b\w/g, c => c.toUpperCase()) || "Confirmed";

  const s = statusStyles[normalizedStatus] || statusStyles.Confirmed;

  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
      style={{ backgroundColor: s.bg, color: s.text }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: s.dot }}
      />
      {normalizedStatus}
    </span>
  );
}