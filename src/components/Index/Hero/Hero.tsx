import DesignColors from "../../../lib/utils";
import { glass } from "../../../styles/glass";
import Icon from "../../Login/Icons";
import HeroBtn from "./HeroBtn";

export default function Hero({ onLogin }: { onLogin: () => void }) {
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
