import { useEffect, useState } from "react";
import DesignColors from "../../../lib/utils";
import NavGhostBtn from "./NavGhostBtn";
import NavPrimaryBtn from "./NavPrimaryBtn";

export default function Nav({ onLogin, onApplyStaff }: { onLogin: () => void; onApplyStaff: () => void }) {
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
                    <NavGhostBtn label="Join as Staff" onClick={onApplyStaff} />
                    <NavGhostBtn label="Login" onClick={onLogin} />
                    <NavPrimaryBtn label="Book Now" onClick={onLogin} />
                </div>
            </div>
        </nav>
    );
}