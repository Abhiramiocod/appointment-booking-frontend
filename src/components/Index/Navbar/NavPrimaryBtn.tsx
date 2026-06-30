import { useState } from "react";
import DesignColors from "../../../lib/utils";

export default
    function NavPrimaryBtn({ label, onClick }: { label: string; onClick: () => void }) {
    const [hov, setHov] = useState(false);
    return (
        <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            style={{ fontSize: 16, fontWeight: 700, color: DesignColors().onPrimary, background: DesignColors().primary, border: "none", borderRadius: 12, padding: "10px 24px", cursor: "pointer", transition: "all 0.2s", transform: hov ? "scale(0.97)" : "none", boxShadow: hov ? "0 0 20px rgba(70,72,212,0.3)" : "none" }}>
            {label}
        </button>
    );
}