import { useState } from "react";
import DesignColors from "../../lib/utils";

interface SocialButtonProps {
  label: string;
  src: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export default function SocialButton({
  label,
  src,
  onClick,
  disabled = false,
  loading = false,
}: SocialButtonProps) {

  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        padding: "12px 16px",
        borderRadius: 12,
        border: "1px solid rgba(199,196,215,0.3)",
        background: hovered && !disabled && !loading ? DesignColors().surfaceLow : DesignColors().surfaceContainerLowest,
        cursor: disabled || loading ? "not-allowed" : "pointer",
        opacity: disabled || loading ? 0.7 : 1,
        transition: "all 0.2s",
        fontFamily: "Geist, sans-serif",
        fontSize: 13,
        fontWeight: 500,
        color: DesignColors().onSurface,
      }}
    >
      {loading ? (
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: "50%",
            border: `2px solid rgba(70, 72, 212, 0.2)`,
            borderTopColor: DesignColors().primary,
            animation: "spin 0.8s linear infinite",
          }}
        />
      ) : (

        <img
          src={src}
          alt={label}
          style={{
            width: 20,
            height: 20,
            objectFit: "contain",
          }}
        />
      )}
      {loading ? "Connecting..." : label}
    </button>
  );
}