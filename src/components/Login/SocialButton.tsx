import { useState } from "react";
import DesignColors from "../../lib/utils";

interface SocialButtonProps {
  label: string;
  src: string;
}

export default function SocialButton({
  label,
  src,
}: SocialButtonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
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
        background: hovered ? DesignColors().surfaceLow : DesignColors().surfaceContainerLowest,
        cursor: "pointer",
        transition: "all 0.2s",
        fontFamily: "Geist, sans-serif",
        fontSize: 13,
        fontWeight: 500,
        color: DesignColors().onSurface,
      }}
    >
      <img
        src={src}
        alt={label}
        style={{
          width: 20,
          height: 20,
          objectFit: "contain",
        }}
      />
      {label}
    </button>
  );
}