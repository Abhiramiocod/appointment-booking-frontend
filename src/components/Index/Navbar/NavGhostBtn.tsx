import { useState } from "react";
import DesignColors from "../../../lib/utils";

export default function NavGhostBtn({ label, onClick }: { label: string; onClick: () => void }) {
    const [hov, setHov] = useState(false);
    return (
        <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            style={{ fontSize: 16, fontWeight: 500, color: DesignColors().onSurfaceVariant, background: hov ? "rgba(70,72,212,0.05)" : "transparent", border: "none", borderRadius: 12, padding: "8px 16px", cursor: "pointer", transition: "all 0.2s" }}>
            {label}
        </button>
    );
}