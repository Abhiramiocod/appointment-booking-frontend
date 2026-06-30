import { useState } from "react";
import DesignColors from "../../../lib/utils";
import { glass } from "../../../styles/glass";

export default function HeroBtn({ label, primary, onClick }: { label: string; primary?: boolean; onClick: () => void }) {
    const [hov, setHov] = useState(false);
    return (
        <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            style={primary ? {
                padding: "16px 32px", borderRadius: 12, fontWeight: 700, fontSize: 18, color: DesignColors().onPrimary,
                background: DesignColors().primary, border: "none", cursor: "pointer", transition: "all 0.2s",
                transform: hov ? "scale(0.97)" : "none",
                boxShadow: "0 8px 32px rgba(70,72,212,0.2)",
            } : {
                padding: "16px 32px", borderRadius: 12, fontWeight: 700, fontSize: 18, color: DesignColors().primary,
                ...glass, border: "1px solid rgba(255,255,255,0.4)", cursor: "pointer", transition: "all 0.2s",
                background: hov ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.7)",
            }}>
            {label}
        </button>
    );
}