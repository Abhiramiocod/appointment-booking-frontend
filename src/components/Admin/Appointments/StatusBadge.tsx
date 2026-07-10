import { statusStyles } from "../../../lib/utils";

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const normalizedStatus =
    status
      ?.replace(/_/g, " ")
      .replace(/\b\w/g, (c: string) => c.toUpperCase()) || "Confirmed";

  const s = statusStyles[normalizedStatus as keyof typeof statusStyles] || statusStyles.Confirmed;

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