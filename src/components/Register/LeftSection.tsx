import { Colors } from "../../lib/utils";
import ShaderCanvas from "./ShaderCanvas";

export default function LeftSection() {

    return (
    <section
        className="panel-left"
        style={{
            position: "relative",
            width: "58%",
            minHeight: "100vh",
            overflow: "hidden",
            display: "flex",
            alignItems: "flex-start",
            padding: "56px 64px 64px",
        }}
    >
        {/* Shader background */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <ShaderCanvas />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(70,72,212,0.10) 0%, rgba(252,248,255,0) 100%)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 10, maxWidth: 560 }}>

            {/* Badge */}
            <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
                <div style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "6px 14px", borderRadius: 9999,
                    background: "rgba(255,255,255,0.2)", backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    color: Colors.primary,
                    fontFamily: "Geist, monospace", fontSize: 10, fontWeight: 600, letterSpacing: "0.05em",
                    marginBottom: 24,
                }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>auto_awesome</span>
                    TRUSTED BY 2,000+ LEADERS
                </div>

                <h1 style={{ fontFamily: "Inter", fontSize: "clamp(32px,4vw,46px)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.02em", color: Colors.onSurface, marginBottom: 16 }}>
                    Experience the art of{" "}
                    <span style={{ color: Colors.primary }}>Precision Booking.</span>
                </h1>

                <p style={{ fontSize: 17, lineHeight: 1.5, color: Colors.onSurfaceVariant, maxWidth: 440, marginBottom: 32 }}>
                    Join the world's most elegant scheduling platform. Designed for professionals who value time, clarity, and aesthetic excellence.
                </p>
            </div>

            {/* Feature cards */}
            <div className="animate-slide-up feature-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 32, animationDelay: "0.3s" }}>
                {[
                    { icon: "psychology", title: "AI Intelligence", body: "Smart scheduling that learns your preferences and optimises your day." },
                    { icon: "verified_user", title: "Enterprise Trust", body: "Bank-grade security and reliability for your most critical appointments." },
                ].map(({ icon, title, body }) => (
                    <div key={title} className="glass-card" style={{ padding: 16, borderRadius: "1.25rem" }}>
                        <span className="material-symbols-outlined" style={{ color: Colors.primary, fontSize: 24, marginBottom: 10, display: "block" }}>{icon}</span>
                        <h3 style={{ fontWeight: 700, fontSize: 15, color: Colors.onSurface, marginBottom: 6 }}>{title}</h3>
                        <p style={{ fontSize: 12, color: Colors.onSurfaceVariant, lineHeight: 1.5 }}>{body}</p>
                    </div>
                ))}
            </div>

            {/* Social proof */}
            <div className="animate-slide-up" style={{ display: "flex", alignItems: "center", gap: 16, animationDelay: "0.5s" }}>
                <div style={{ display: "flex" }}>
                    {[

                    ].map((src, i) => (
                        <img key={i} src={src} alt="User" style={{ width: 40, height: 40, borderRadius: "50%", border: "2px solid #fff", marginLeft: i > 0 ? -12 : 0 }} />
                    ))}
                </div>
                <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#904900", fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span style={{ fontWeight: 700, color: Colors.onSurface }}>4.9/5</span>
                    </div>
                    <p style={{ fontSize: 12, color: Colors.onSurfaceVariant }}>from 2,000+ service providers</p>
                </div>
            </div>
        </div>
    </section>
    )
};