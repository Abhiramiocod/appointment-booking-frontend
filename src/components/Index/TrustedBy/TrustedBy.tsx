import DesignColors from "../../../lib/utils";

export default function TrustedBy() {
    return (
        <section style={{ padding: "80px 0", borderTop: "1px solid rgba(199,196,215,0.3)", borderBottom: "1px solid rgba(199,196,215,0.3)" }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px", display: "flex", flexDirection: "column", gap: 48 }}>
                <p style={{ textAlign: "center", fontSize: 12, fontFamily: "Geist, sans-serif", fontWeight: 600, letterSpacing: "0.2em", color: DesignColors().onSurfaceVariant, textTransform: "uppercase", margin: 0 }}>Partnering with industry leaders</p>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: 64, opacity: 0.5, filter: "grayscale(1)", transition: "all 0.5s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.filter = "grayscale(0)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.5"; (e.currentTarget as HTMLElement).style.filter = "grayscale(1)"; }}
                >
                    {["MEDICORE", "VITALIS", "PURESPA", "ZENITH", "AETHER"].map((n) => (
                        <span key={n} style={{ fontSize: 24, fontWeight: 800, color: DesignColors().onSurface, letterSpacing: "-0.02em" }}>{n}</span>
                    ))}
                </div>
            </div>
        </section>
    );
}