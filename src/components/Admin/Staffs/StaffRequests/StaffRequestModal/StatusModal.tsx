import { useState } from "react";
import { Colors } from "../../../../../lib/utils";
import {
  CheckCircle2,
  CirclePause,
  Palmtree,
  XOctagon,
  ChevronRight,
  Loader2,
} from "lucide-react";

interface StatusOption {
  value: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
  border: string;
}

const STATUS_OPTIONS: StatusOption[] = [
  {
    value: "active",
    label: "Active",
    description: "Staff is actively working",
    icon: <CheckCircle2 size={20} />,
    color: "#059669",
    bg: "rgba(16,185,129,0.08)",
    border: "rgba(16,185,129,0.25)",
  },
  {
    value: "inactive",
    label: "Inactive",
    description: "Staff is currently not working",
    icon: <CirclePause size={20} />,
    color: Colors.outline,
    bg: "rgba(118,117,134,0.08)",
    border: "rgba(118,117,134,0.25)",
  },
  {
    value: "on_leave",
    label: "On Leave",
    description: "Staff is on a scheduled leave",
    icon: <Palmtree size={20} />,
    color: "#b45309",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.25)",
  },
  {
    value: "terminated",
    label: "Terminated",
    description: "Staff employment has been ended",
    icon: <XOctagon size={20} />,
    color: Colors.error,
    bg: "rgba(186,26,26,0.08)",
    border: "rgba(186,26,26,0.25)",
  },
];

interface StatusModalProps {
  modal: {
    type: string;
    request: any;
    currentStatus?: string;
  } | null;
  closeModal: () => void;
  updateStatus: (request: any, newStatus: string) => Promise<void>;
}

export default function StatusModal({
  modal,
  closeModal,
  updateStatus,
}: StatusModalProps) {
  const [selected, setSelected] = useState<string>(
    modal?.currentStatus ?? ""
  );
  const [loading, setLoading] = useState(false);

  if (!modal || modal.type !== "status") return null;

  const r = modal.request;

  const handleSave = async () => {
    if (!selected) return;
    setLoading(true);
    await updateStatus(r, selected);
    setLoading(false);
  };

  const selectedOption = STATUS_OPTIONS.find((o) => o.value === selected);

  return (
    <div
      className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header stripe */}
      <div
        style={{
          background: "linear-gradient(135deg,#4648d4,#7c3aed)",
          padding: "20px 24px 16px",
        }}
      >
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Staff Status
        </p>
        <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 800, margin: "4px 0 0" }}>
          Update Employment Status
        </h3>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 4 }}>
          {r?.name}
        </p>
      </div>

      {/* Status options */}
      <div style={{ padding: "20px 20px 12px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {STATUS_OPTIONS.map((opt) => {
            const isSelected = selected === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => setSelected(opt.value)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "12px 16px",
                  borderRadius: 14,
                  border: `1.5px solid ${isSelected ? opt.border : "rgba(199,196,215,0.3)"}`,
                  background: isSelected ? opt.bg : "transparent",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.18s ease",
                  width: "100%",
                }}
              >
                {/* Icon circle */}
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: isSelected ? opt.bg : "rgba(239,236,248,0.5)",
                    border: `1.5px solid ${isSelected ? opt.border : "transparent"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: isSelected ? opt.color : Colors.outline,
                    flexShrink: 0,
                    transition: "all 0.18s ease",
                  }}
                >
                  {opt.icon}
                </div>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: isSelected ? opt.color : Colors.onSurface,
                      margin: 0,
                    }}
                  >
                    {opt.label}
                  </p>
                  <p style={{ fontSize: 12, color: Colors.outline, margin: 0 }}>
                    {opt.description}
                  </p>
                </div>

                {/* Selected indicator */}
                {isSelected && (
                  <ChevronRight size={16} style={{ color: opt.color, flexShrink: 0 }} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "12px 20px 20px",
          display: "flex",
          gap: 10,
        }}
      >
        <button
          onClick={closeModal}
          style={{
            flex: 1,
            padding: "11px 0",
            borderRadius: 12,
            border: "1.5px solid rgba(199,196,215,0.4)",
            background: "transparent",
            color: Colors.onSurfaceVariant,
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={!selected || loading}
          style={{
            flex: 2,
            padding: "11px 0",
            borderRadius: 12,
            border: "none",
            background: selectedOption
              ? selectedOption.color
              : `linear-gradient(135deg,${Colors.primary},#7c3aed)`,
            color: "#fff",
            fontWeight: 700,
            fontSize: 14,
            cursor: selected && !loading ? "pointer" : "not-allowed",
            opacity: selected && !loading ? 1 : 0.55,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            fontFamily: "inherit",
            transition: "background 0.2s",
          }}
        >
          {loading ? (
            <Loader2 size={16} style={{ animation: "spin 0.7s linear infinite" }} />
          ) : null}
          {loading ? "Updating…" : `Set to ${selectedOption?.label ?? "Status"}`}
          <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
        </button>
      </div>
    </div>
  );
}
