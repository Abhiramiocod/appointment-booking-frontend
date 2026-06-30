import DesignColors from "../../../lib/utils";
import Icon from "../../Login/Icons";

export default function Footer() {
    return (
        <footer style={{ background: DesignColors().surfaceContainerHighest, borderTop: `1px solid ${DesignColors().outlineVariant}`, padding: "48px 0" }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 64px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 32 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <span style={{ fontSize: 48, fontWeight: 700, color: DesignColors().onSurface, letterSpacing: "-0.02em" }}>AuraBooking</span>
                    <p style={{ fontSize: 14, color: DesignColors().onSurfaceVariant, margin: 0 }}>© 2024 AuraBooking AI. Precision Minimalist Design.</p>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 32 }}>
                    {["Privacy Policy", "Terms of Service", "Cookie Settings", "API Reference"].map((link) => (
                        <a key={link} href="#" style={{ fontSize: 14, color: DesignColors().onSurfaceVariant, textDecoration: "none", transition: "color 0.2s" }}
                            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = DesignColors().primary)}
                            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = DesignColors().onSurfaceVariant)}>
                            {link}
                        </a>
                    ))}
                </div>
                <div style={{ display: "flex", gap: 16 }}>
                    {["share", "contact_support"].map((ic) => (
                        <a key={ic} href="#" style={{ width: 40, height: 40, borderRadius: "50%", background: DesignColors().surfaceContainerHighest, display: "flex", alignItems: "center", justifyContent: "center", color: DesignColors().onSurface, textDecoration: "none", transition: "all 0.2s" }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(70,72,212,0.1)"; (e.currentTarget as HTMLElement).style.color = DesignColors().primary; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = DesignColors().surfaceContainerHighest; (e.currentTarget as HTMLElement).style.color = DesignColors().onSurface; }}>
                            <Icon name={ic} style={{ fontSize: 20 }} />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}