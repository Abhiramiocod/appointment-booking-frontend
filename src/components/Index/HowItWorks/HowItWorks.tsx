import DesignColors from "../../../lib/utils";

export default function HowItWorks() {
    const steps = [
        { n: "01", title: "Connect", desc: "Sync your existing schedules and staff profiles in under 5 minutes.", active: false },
        { n: "02", title: "Customize", desc: "Apply your brand aesthetics and booking logic through our visual editor.", active: false },
        { n: "03", title: "Launch", desc: "Go live with a bespoke booking engine that delights your clients.", active: true },
    ];
    return (
        <section style={{ padding: "128px 0", background: "#fff" }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px", textAlign: "center" }}>
                <h2 style={{ fontSize: 48, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, color: DesignColors().onSurface, margin: "0 0 80px" }}>Three Steps to <span style={{ color: DesignColors().primary }}>Clarity.</span></h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 64, position: "relative" }}>
                    <div style={{ position: "absolute", top: 40, left: "25%", right: "25%", height: 1, background: "rgba(199,196,215,0.3)" }} />
                    {steps.map(({ n, title, desc, active }) => (
                        <div key={n} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, position: "relative", zIndex: 1 }}>
                            <div style={{
                                width: 80, height: 80, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700,
                                ...(active ? { background: DesignColors().primary, color: "#fff", boxShadow: "0 8px 32px rgba(70,72,212,0.3)" } : { background: "#fff", color: DesignColors().primary, boxShadow: "0 4px 20px rgba(0,0,0,0.08)", border: "4px solid rgba(70,72,212,0.05)" })
                            }}>
                                {n}
                            </div>
                            <h3 style={{ fontSize: 24, fontWeight: 600, color: DesignColors().onSurface, margin: 0 }}>{title}</h3>
                            <p style={{ fontSize: 16, lineHeight: 1.6, color: DesignColors().onSurfaceVariant, margin: 0 }}>{desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}