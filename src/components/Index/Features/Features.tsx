import DesignColors from "../../../lib/utils";
import { glassCard } from "../../../styles/glass";
import Icon from "../../Login/Icons";

export default function Features() {
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