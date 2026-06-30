import { useState } from "react";
import DesignColors from "../../../lib/utils";
import Icon from "../../Login/Icons";
import { glassCard } from "../../../styles/glass";

export default function PricingCard({ label, price, period, features, cta, btnStyle, popular, onCta }: any) {
    const [hovBtn, setHovBtn] = useState(false);
    return (
        <div style={{
            padding: 40, borderRadius: 40, display: "flex", flexDirection: "column", gap: 32, position: "relative", overflow: "hidden",
            ...(popular ? { background: DesignColors().inverseSurface, color: DesignColors().inverseOnSurface, transform: "translateY(-24px)", boxShadow: "0 24px 64px rgba(0,0,0,0.2)" } : { ...glassCard })
        }}>
            {popular && (
                <div style={{ position: "absolute", top: 24, right: 24, background: DesignColors().primary, padding: "4px 12px", borderRadius: 9999, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#fff" }}>Popular</div>
            )}
            <div>
                <h4 style={{ fontSize: 12, fontFamily: "Geist, sans-serif", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: popular ? DesignColors().outlineVariant : DesignColors().onSurfaceVariant, margin: "0 0 8px" }}>{label}</h4>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                    <span style={{ fontSize: 36, fontWeight: 700, color: popular ? "#fff" : DesignColors().onSurface }}>{price}</span>
                    {period && <span style={{ color: popular ? DesignColors().outlineVariant : DesignColors().onSurfaceVariant }}>{period}</span>}
                </div>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
                {features.map((f: string) => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 16, color: popular ? DesignColors().inverseOnSurface : DesignColors().onSurfaceVariant }}>
                        <Icon name="check_circle" style={{ color: DesignColors().primary, fontSize: 20 }} />{f}
                    </li>
                ))}
            </ul>
            <button onClick={onCta} onMouseEnter={() => setHovBtn(true)} onMouseLeave={() => setHovBtn(false)}
                style={{
                    width: "100%", padding: "16px", borderRadius: 12, fontWeight: 700, fontSize: 16, cursor: "pointer", transition: "all 0.2s",
                    transform: hovBtn ? "scale(0.97)" : "none",
                    ...(btnStyle === "filled" ? { background: DesignColors().primary, color: "#fff", border: "none", boxShadow: "0 8px 24px rgba(70,72,212,0.2)" }
                        : btnStyle === "outline" ? { background: "transparent", color: DesignColors().primary, border: `1px solid ${DesignColors().primary}` }
                            : { background: "transparent", color: DesignColors().onSurface, border: `1px solid ${DesignColors().outline}` }),
                }}>
                {cta}
            </button>
        </div>
    );
}