import { useState, useEffect } from "react";
import Icon from "../components/Login/Icons";
import DesignColors from "../lib/utils";
import { glass } from "../styles/glass";



// ═════════════════════════════════════════════════════════════════════════════
// LANDING PAGE COMPONENTS
// ═════════════════════════════════════════════════════════════════════════════
function Nav({ onLogin }: { onLogin: () => void }) {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav
            style={{
                position: "fixed", top: 0, width: "100%", zIndex: 50,
                background: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(32px)",
                WebkitBackdropFilter: "blur(32px)",
                borderBottom: "1px solid rgba(255,255,255,0.2)",
                boxShadow: "0 4px 32px rgba(70,72,212,0.05)",
                transition: "padding 0.3s",
                padding: scrolled ? "8px 0" : "16px 0",
            }}
        >
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "center", height: 64 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
                    <a href="#" style={{ fontSize: 28, fontWeight: 700, color: DesignColors().primary, textDecoration: "none", letterSpacing: "-0.02em" }}>AuraBooking</a>
                    <div style={{ display: "flex", gap: 24 }}>
                        {["Solutions", "Pricing", "Resources"].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`}
                                style={{ fontSize: 16, fontWeight: 500, color: DesignColors().onSurfaceVariant, textDecoration: "none", transition: "color 0.2s" }}
                                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = DesignColors().primary)}
                                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = DesignColors().onSurfaceVariant)}
                            >{item}</a>
                        ))}
                    </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <NavGhostBtn label="Sign Up" onClick={onLogin} />
                    <NavPrimaryBtn label="Book Now" onClick={onLogin} />
                </div>
            </div>
        </nav>
    );
}

function NavGhostBtn({ label, onClick }: { label: string; onClick: () => void }) {
    const [hov, setHov] = useState(false);
    return (
        <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            style={{ fontSize: 16, fontWeight: 500, color: DesignColors().onSurfaceVariant, background: hov ? "rgba(70,72,212,0.05)" : "transparent", border: "none", borderRadius: 12, padding: "8px 16px", cursor: "pointer", transition: "all 0.2s" }}>
            {label}
        </button>
    );
}

function NavPrimaryBtn({ label, onClick }: { label: string; onClick: () => void }) {
    const [hov, setHov] = useState(false);
    return (
        <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            style={{ fontSize: 16, fontWeight: 700, color: DesignColors().onPrimary, background: DesignColors().primary, border: "none", borderRadius: 12, padding: "10px 24px", cursor: "pointer", transition: "all 0.2s", transform: hov ? "scale(0.97)" : "none", boxShadow: hov ? "0 0 20px rgba(70,72,212,0.3)" : "none" }}>
            {label}
        </button>
    );
}

function Hero({ onLogin }: { onLogin: () => void }) {
    return (
        <header style={{ paddingTop: 160, paddingBottom: 96, overflow: "hidden" }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px", display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", gap: 64 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "4px 12px", borderRadius: 9999, background: "rgba(96,99,238,0.1)", border: "1px solid rgba(96,99,238,0.2)", width: "fit-content" }}>
                        <span style={{ fontSize: 12, fontFamily: "Geist, sans-serif", fontWeight: 600, letterSpacing: "0.05em", color: DesignColors().primary, textTransform: "uppercase" }}>New: AI Auto-Pilot</span>
                    </div>
                    <h1 style={{ fontSize: 48, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, color: DesignColors().onSurface, margin: 0, maxWidth: 520 }}>
                        Book Appointments <span style={{ color: DesignColors().primary }}>Effortlessly</span>
                    </h1>
                    <p style={{ fontSize: 16, lineHeight: 1.6, color: DesignColors().onSurfaceVariant, margin: 0, maxWidth: 480 }}>
                        AuraBooking is the precision scheduling engine for premium service providers. Automate your workflow with AI-driven insights and a glass-morphic interface designed for speed.
                    </p>
                    <div style={{ display: "flex", gap: 16 }}>
                        <HeroBtn label="Book Now" primary onClick={onLogin} />
                        <HeroBtn label="Learn More" onClick={() => { }} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 16, paddingTop: 16 }}>
                        <div style={{ display: "flex" }}>
                            {[
                                "https://lh3.googleusercontent.com/aida-public/AB6AXuDFwD5RzoRiveylVs-xigziPNJsU0uM5bCqBQYyJcm5qIYzeWxw5ieM9SkltXt-bUntM1ujesSfRUeq_GC5MetizfvO50IzLwjoWbg4QduOs-Kipuna41TxFE5HSNTPfLbPNfIVOoZdJIAVHRXxOZPmEFCz38g2nxGK8bvUkca0meoB6M4Hdg15ylGNknqKhoZRN-jGYjD-ZK8uTvOKuehKFxbtPpi9MnsWfq-_ma4OWiTpClVXqlorge_H9UnxFNdo50ghtEIMdr67",
                                "https://lh3.googleusercontent.com/aida-public/AB6AXuCCa6dax2tU7AK3QtOHfSt5VTUb-OtVsvJl2F65oklK0qYsKUzwSKX7IhQdQyHpsqt3x_VuIaXolPCqArqZzv0ETBKhaP6F-DoLZLvwkuT3mwl7Y-VjO-67v-mPSXc2JgkUARC14ajdtH81jdFMx93p_-bowARBCtYIQdsCd6zVT7QxjZM1GfWORAQBbQ55iInQ7oRUCqC_igvNEgV65TKuwfToMunmPIz6rvytfLRSxin-TOmKXQJoJ0_peqLUJ25c6A13a1OuohJi",
                                "https://lh3.googleusercontent.com/aida-public/AB6AXuB_28whjeVcUcztfwIpCQA8YSBVLEGtu6uW-Taz5nQ1huGw5XpJw_QY1AlkIEYO-ngYIPxoRofST6vOeTCVFYC3fFw2bMKoe0rWxkiyvs3OkdyAQyGJnmUyjeoxGcSkFXLEtxpYQzLEeKYsdGXm1pcfv0MNvMR3VOxWx-xN3lU4D7rVzHxA2ze2D-hRTDJ_n-lyrIZkF9GYxfVvqAABzfscgIIwN9yCLHOu2t9Av8OG1n9oLVcB5-HW6O4O_g7AgaWWtqsO_7FcsnZV",
                            ].map((src, i) => (
                                <img key={i} src={src} alt="avatar" style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", border: `2px solid ${DesignColors().surface}`, marginLeft: i > 0 ? -12 : 0 }} />
                            ))}
                        </div>
                        <p style={{ fontSize: 14, color: DesignColors().onSurfaceVariant, margin: 0 }}>Trusted by <strong style={{ color: DesignColors().onSurface }}>500+</strong> premium clinics globally</p>
                    </div>
                </div>
                <div style={{ position: "relative" }}>
                    <div style={{ position: "absolute", inset: 0, background: "rgba(70,72,212,0.1)", filter: "blur(120px)", borderRadius: "50%" }} />
                    <div style={{ ...glass, padding: 16, borderRadius: 32, position: "relative", zIndex: 1, transform: "rotate(3deg)", transition: "transform 0.7s" }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "rotate(0deg)")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "rotate(3deg)")}
                    >
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJyxdl2ZPd5f1gReK1qaXyf2096yn3Q60WTWT7UUyw_XRY8LeY9mdx0XNGG0vqZt-Th0WZhiIe945msK2C7xFDXsePTt_x558X_uTBI1a9sgCJ_aNzw-saWv6BNTk3vrQ5LhjxxOFDrgqLSehgG2TZwKFz0OWO0LOA9D4eLjGFJvl_QK3U5ud1P5_-vyQ0W_gB2jVzbdxGNZ9j70oEvGJXbRwZlTYTLkC3uyCwvucZNsXyslwhfN2bySpC5pduq2L8uUpAP9kIg85t"
                            alt="AI Interface"
                            style={{ width: "100%", borderRadius: 16 }}
                        />
                    </div>
                    <div style={{ ...glass, position: "absolute", top: -40, left: -40, padding: 16, borderRadius: 16, display: "flex", alignItems: "center", gap: 12, animation: "bounce 3s ease-in-out infinite" }}>
                        <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(70,72,212,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Icon name="event_available" style={{ color: DesignColors().primary }} />
                        </div>
                        <div>
                            <p style={{ fontSize: 12, fontFamily: "Geist, sans-serif", fontWeight: 600, color: DesignColors().onSurfaceVariant, margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>Confirmed</p>
                            <p style={{ fontSize: 16, fontWeight: 700, color: DesignColors().onSurface, margin: 0 }}>New Booking</p>
                        </div>
                        <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }`}</style>
                    </div>
                </div>
            </div>
        </header>
    );
}

function HeroBtn({ label, primary, onClick }: { label: string; primary?: boolean; onClick: () => void }) {
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

function TrustedBy() {
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

const glassCard: React.CSSProperties = {
    background: "rgba(255,255,255,0.7)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    border: "1px solid rgba(255,255,255,0.4)",
    boxShadow: "0 8px 32px 0 rgba(31,38,135,0.07)",
};

function Features() {
    return (
        <section style={{ padding: "128px 0" }} id="solutions">
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, marginBottom: 80 }}>
                    <div style={{ maxWidth: 640 }}>
                        <h2 style={{ fontSize: 48, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, color: DesignColors().onSurface, margin: "0 0 24px" }}>Designed for <span style={{ color: DesignColors().primary }}>Performance.</span></h2>
                        <p style={{ fontSize: 16, lineHeight: 1.6, color: DesignColors().onSurfaceVariant, margin: 0 }}>Everything you need to run a high-velocity booking service, without the cognitive overhead.</p>
                    </div>
                    <a href="#" style={{ color: DesignColors().primary, fontWeight: 700, display: "flex", alignItems: "center", gap: 8, textDecoration: "none", whiteSpace: "nowrap" }}>
                        View all features <Icon name="arrow_forward" />
                    </a>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 24 }}>
                    {/* AI Scheduling */}
                    <div style={{ gridColumn: "span 8", ...glassCard, padding: 40, borderRadius: 40, position: "relative", overflow: "hidden" }}
                        className="feature-card-hover">
                        <div style={{ position: "relative", zIndex: 1 }}>
                            <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(70,72,212,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 32 }}>
                                <Icon name="auto_awesome" fill={1} style={{ fontSize: 28, color: DesignColors().primary }} />
                            </div>
                            <h3 style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.01em", color: DesignColors().onSurface, margin: "0 0 16px" }}>AI-Driven Smart Scheduling</h3>
                            <p style={{ fontSize: 16, lineHeight: 1.6, color: DesignColors().onSurfaceVariant, margin: 0, maxWidth: 400 }}>Our neural engine predicts peak hours and suggests optimal gaps to maximize your daily revenue and clinician well-being.</p>
                        </div>
                        <div style={{ position: "absolute", top: 0, right: 0, width: "45%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <div style={{ ...glassCard, width: 240, height: 288, padding: 16, borderRadius: 16, transform: "rotate(6deg)" }}>
                                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                    <div style={{ height: 24, width: "75%", borderRadius: 9999, background: "rgba(70,72,212,0.1)" }} />
                                    <div style={{ height: 80, borderRadius: 12, border: "1px solid rgba(70,72,212,0.1)", background: "rgba(70,72,212,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <span style={{ color: DesignColors().primary, fontWeight: 700 }}>94% Efficiency</span>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                        <div style={{ height: 8, borderRadius: 9999, background: "rgba(199,196,215,0.2)" }} />
                                        <div style={{ height: 8, width: "66%", borderRadius: 9999, background: "rgba(199,196,215,0.2)" }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Multi-platform */}
                    <div style={{ gridColumn: "span 4", background: DesignColors().primary, padding: 40, borderRadius: 40, color: DesignColors().onPrimary }}>
                        <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 32 }}>
                            <Icon name="devices" style={{ fontSize: 28, color: "#fff" }} />
                        </div>
                        <h3 style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.01em", margin: "0 0 16px" }}>Multi-Platform Sync</h3>
                        <p style={{ fontSize: 16, lineHeight: 1.6, opacity: 0.8, margin: "0 0 40px" }}>Real-time synchronization across iOS, Android, and Web with native-feel interfaces.</p>
                        <div style={{ display: "flex", gap: 16 }}>
                            {["phone_iphone", "tablet_mac", "desktop_windows"].map((ic) => (
                                <Icon key={ic} name={ic} style={{ fontSize: 36, color: "#fff", opacity: 0.5 }} />
                            ))}
                        </div>
                    </div>

                    {/* Analytics */}
                    <div style={{ gridColumn: "span 4", ...glassCard, padding: 40, borderRadius: 40 }}>
                        <div style={{ width: 56, height: 56, borderRadius: 16, background: "#dae2fd", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 32 }}>
                            <Icon name="monitoring" style={{ fontSize: 28, color: "#5c647a" }} />
                        </div>
                        <h3 style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.01em", color: DesignColors().onSurface, margin: "0 0 16px" }}>Advanced Analytics</h3>
                        <p style={{ fontSize: 16, lineHeight: 1.6, color: DesignColors().onSurfaceVariant, margin: 0 }}>Deep-dive into booking trends, cancellation rates, and customer lifetime value with automated reporting.</p>
                    </div>

                    {/* Integration */}
                    <div style={{ gridColumn: "span 8", ...glassCard, padding: 40, borderRadius: 40, display: "flex", gap: 40, alignItems: "center" }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ width: 56, height: 56, borderRadius: 16, background: DesignColors().surfaceContainerHighest, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 32 }}>
                                <Icon name="api" style={{ fontSize: 28, color: DesignColors().onSurface }} />
                            </div>
                            <h3 style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.01em", color: DesignColors().onSurface, margin: "0 0 16px" }}>Ecosystem Integration</h3>
                            <p style={{ fontSize: 16, lineHeight: 1.6, color: DesignColors().onSurfaceVariant, margin: 0 }}>Connect seamlessly with Stripe, Google Calendar, and your existing EHR software via our robust API.</p>
                        </div>
                        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                            {["payments", "event", "mail"].map((ic) => (
                                <div key={ic} style={{ aspectRatio: "1", ...glassCard, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", filter: "grayscale(1)", transition: "filter 0.3s", cursor: "pointer" }}
                                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.filter = "grayscale(0)")}
                                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.filter = "grayscale(1)")}
                                >
                                    <Icon name={ic} style={{ fontSize: 32, color: DesignColors().primary }} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function HowItWorks() {
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

function Pricing({ onLogin }: { onLogin: () => void }) {
    const plans = [
        { label: "Basic", price: "$49", period: "/mo", features: ["Up to 3 clinicians", "Standard Analytics", "Web Widget"], cta: "Start Free Trial", style: "outline" as const },
        { label: "Pro", price: "$129", period: "/mo", features: ["Up to 15 clinicians", "AI Smart Scheduling", "Custom Branding", "SMS Reminders"], cta: "Get Started", style: "filled" as const, popular: true },
        { label: "Enterprise", price: "Custom", period: "", features: ["Unlimited Clinicians", "Dedicated Support", "API Access"], cta: "Contact Sales", style: "ghost" as const },
    ];
    return (
        <section style={{ padding: "128px 0" }} id="pricing">
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px" }}>
                <div style={{ textAlign: "center", marginBottom: 80 }}>
                    <h2 style={{ fontSize: 48, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, color: DesignColors().onSurface, margin: "0 0 16px" }}>Pricing for Every <span style={{ color: DesignColors().primary }}>Scale.</span></h2>
                    <p style={{ fontSize: 16, color: DesignColors().onSurfaceVariant, margin: 0 }}>Transparent plans designed for clinics of all sizes.</p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, alignItems: "center" }}>
                    {plans.map(({ label, price, period, features, cta, style: btnStyle, popular }) => (
                        <PricingCard key={label} label={label} price={price} period={period} features={features} cta={cta} btnStyle={btnStyle} popular={popular} onCta={onLogin} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function PricingCard({ label, price, period, features, cta, btnStyle, popular, onCta }: any) {
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

function FAQ() {
    const [open, setOpen] = useState<number | null>(0);
    const faqs = [
        { q: "Can I migrate from my current system?", a: "Yes, we provide automated migration tools for most major EHR and booking platforms. Our white-glove support team can also handle the migration for you at no extra cost for Pro and Enterprise plans." },
        { q: "How does the AI scheduling work?", a: 'Our AI analyzes historical booking data, staff preferences, and appointment types to find the "Goldilocks" slots—those that minimize idle time while ensuring your staff isn\'t overwhelmed.' },
        { q: "Is AuraBooking HIPAA compliant?", a: "Absolutely. Security is our foundation. We are fully HIPAA and GDPR compliant, utilizing end-to-end encryption for all patient and appointment data." },
    ];
    return (
        <section style={{ padding: "128px 0", background: DesignColors().surfaceLow }}>
            <div style={{ maxWidth: 768, margin: "0 auto", padding: "0 20px" }}>
                <h2 style={{ fontSize: 48, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, color: DesignColors().onSurface, textAlign: "center", margin: "0 0 64px" }}>Frequently Asked <span style={{ color: DesignColors().primary }}>Questions.</span></h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {faqs.map(({ q, a }, i) => (
                        <div key={i} onClick={() => setOpen(open === i ? null : i)} style={{ ...glassCard, padding: 24, borderRadius: 16, cursor: "pointer" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <h3 style={{ fontSize: 20, fontWeight: 600, color: DesignColors().onSurface, margin: 0, letterSpacing: "-0.01em" }}>{q}</h3>
                                <Icon name="expand_more" style={{ color: open === i ? DesignColors().primary : DesignColors().onSurfaceVariant, transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.3s" }} />
                            </div>
                            {open === i && <p style={{ fontSize: 16, lineHeight: 1.6, color: DesignColors().onSurfaceVariant, margin: "16px 0 0" }}>{a}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Footer() {
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

function LandingPage({ onLogin }: { onLogin: () => void }) {
    // scroll reveal
    useEffect(() => {
        const els = document.querySelectorAll("[data-reveal]");
        els.forEach((el) => {
            (el as HTMLElement).style.opacity = "0";
            (el as HTMLElement).style.transform = "translateY(40px)";
            (el as HTMLElement).style.transition = "opacity 0.8s ease, transform 0.8s ease";
        });
        const obs = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    (e.target as HTMLElement).style.opacity = "1";
                    (e.target as HTMLElement).style.transform = "translateY(0)";
                }
            });
        }, { threshold: 0.1 });
        els.forEach((el) => obs.observe(el));
        return () => obs.disconnect();
    }, []);

    return (
        <div style={{ backgroundColor: DesignColors().surface, backgroundImage: "radial-gradient(at 0% 0%, rgba(70,72,212,0.05) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(144,73,0,0.03) 0px, transparent 50%)", minHeight: "100vh" }}>
            <Nav onLogin={onLogin} />
            <main>
                <div data-reveal><Hero onLogin={onLogin} /></div>
                <div data-reveal><TrustedBy /></div>
                <div data-reveal><Features /></div>
                <div data-reveal><HowItWorks /></div>
                <div data-reveal><Pricing onLogin={onLogin} /></div>
                <div data-reveal><FAQ /></div>
            </main>
            <Footer />
        </div>
    );
}

export default LandingPage;
