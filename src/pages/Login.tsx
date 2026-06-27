import { useEffect, useState } from "react";
import DesignColors from "../lib/utils";
import Icon from "../components/Login/Icons";
import { glass } from "../styles/glass";
import SocialButton from "../components/Login/SocialButton";
import SignInButton from "../components/Login/SignInButton";
import Chip from "../components/Login/Chip";

export default function LoginPage({ onBack }: { onBack: () => void }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
    const [emailFocus, setEmailFocus] = useState(false);
    const [passFocus, setPassFocus] = useState(false);

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100,
            });
        };
        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
    }, []);

    const bgStyle: React.CSSProperties = {
        minHeight: "100vh",
        backgroundColor: DesignColors().surface,
        backgroundImage: `
      radial-gradient(at ${mousePos.x}% ${mousePos.y}%, rgba(70,72,212,0.08) 0px, transparent 50%),
      radial-gradient(at 0% 0%, rgba(70,72,212,0.05) 0px, transparent 50%),
      radial-gradient(at 100% 100%, rgba(144,73,0,0.05) 0px, transparent 50%)
    `,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "Inter, sans-serif",
        color: DesignColors().onSurface,
    };

    const inputStyle = (focused: boolean): React.CSSProperties => ({
        width: "100%",
        height: 56,
        background: DesignColors().surfaceLow,
        border: focused ? `1.5px solid ${DesignColors().primary}` : "1.5px solid transparent",
        borderRadius: 12,
        padding: "0 16px",
        fontSize: 16,
        fontFamily: "Inter, sans-serif",
        color: DesignColors().onSurface,
        boxShadow: focused
            ? `0 0 0 2px rgba(70,72,212,0.1), 0 0 8px rgba(70,72,212,0.15)`
            : "none",
        transition: "all 0.2s ease",
    });

    return (
        <div style={bgStyle}>
            {/* Header */}
            <header
                style={{
                    position: "fixed",
                    top: 0,
                    width: "100%",
                    zIndex: 50,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 20px",
                    height: 64,
                }}
            >
                <button
                    onClick={onBack}
                    style={{
                        fontSize: 24,
                        fontWeight: 700,
                        color: DesignColors().primary,
                        fontFamily: "Inter, sans-serif",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        letterSpacing: "-0.01em",
                    }}
                >
                    AuraBooking
                </button>
                <a
                    href="#"
                    style={{
                        color: DesignColors().primary,
                        fontSize: 14,
                        fontWeight: 600,
                        textDecoration: "none",
                    }}
                >
                    Help
                </a>
            </header>

            {/* Main */}
            <main
                style={{
                    width: "100%",
                    maxWidth: 440,
                    padding: "96px 20px 48px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                {/* Brand identity */}
                <div style={{ marginBottom: 40, textAlign: "center" }}>
                    <div
                        style={{
                            width: 64,
                            height: 64,
                            background: DesignColors().primaryContainer,
                            borderRadius: 16,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 24px",
                            boxShadow: "0 8px 24px rgba(70,72,212,0.2)",
                        }}
                    >
                        <Icon name="auto_awesome" fill={1} style={{ fontSize: 32, color: DesignColors().onPrimaryContainer }} />
                    </div>
                    <h1
                        style={{
                            fontSize: 36,
                            fontWeight: 700,
                            letterSpacing: "-0.02em",
                            lineHeight: 1.2,
                            margin: "0 0 8px",
                            color: DesignColors().onSurface,
                        }}
                    >
                        Welcome Back
                    </h1>
                    <p style={{ color: DesignColors().onSurfaceVariant, fontSize: 16, margin: 0 }}>
                        Access your precision booking workspace
                    </p>
                </div>

                {/* Glass card */}
                <div
                    style={{
                        ...glass,
                        width: "100%",
                        padding: "40px",
                        borderRadius: 32,
                        display: "flex",
                        flexDirection: "column",
                        gap: 24,
                    }}
                >
                    {/* Social buttons */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        {[
                            {
                                label: "Apple",
                                src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdeY8YrzJMKj6YBWbYdYIurqy2RDQOnHiHeGXzMx2FRqSeKYmMkcNL4XO3eZdzaeeAnhe4sTja-4Sx2DI0OkBT_WaQ5EQi_FA9jr5BkgzvU_cHTVs1sCgNmqjilZUPgteTgKCWNn8_MZ_Ikamjq8pqfNdihRnoSzvurnCj7fAi8UXHcmqPMBaCNCGOUG2lZ3uMXfpqJlLBNZrUsZuupgwjK1pFAFeyiD04yIknYjz4wfOlTs4dwJK7aYk81I5qCKEpMJGKzSqmic2k",
                            },
                            {
                                label: "Google",
                                src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpJzOb18_8s4Yh4pqqITAmE3fkfI708J_lHgJreMvPiDOhXmzTttE809y2xthycyuL_It8SQXYvYe1MhROQwLBqlaY7lNAGKpLZ5NwOkdC-ECHdegACqG_icDtzfb2zZii4uF1rRFGE7Wd8N5YKo85AA1601rL7ifMQ3QAdQRp-jT6TyMjkJ4QTifhpU5DJN_X1QAs-3F7gcbmXRuwApYqZxv9o8FlFuHZsUsOo1YXvYNo1SUBzJq75zw0TV_AyZYUteHtk4n69Aib",
                            },
                        ].map(({ label, src }) => (
                            <SocialButton key={label} label={label} src={src} />
                        ))}
                    </div>

                    {/* Divider */}
                    <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "4px 0" }}>
                        <div style={{ flex: 1, height: 1, background: "rgba(199,196,215,0.3)" }} />
                        <span
                            style={{
                                fontSize: 12,
                                fontFamily: "Geist, sans-serif",
                                fontWeight: 600,
                                letterSpacing: "0.05em",
                                color: DesignColors().outline,
                                textTransform: "uppercase",
                            }}
                        >
                            Or continue with
                        </span>
                        <div style={{ flex: 1, height: 1, background: "rgba(199,196,215,0.3)" }} />
                    </div>

                    {/* Form */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        {/* Email */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            <label
                                style={{
                                    fontSize: 12,
                                    fontFamily: "Geist, sans-serif",
                                    fontWeight: 600,
                                    letterSpacing: "0.05em",
                                    color: DesignColors().onSurfaceVariant,
                                    textTransform: "uppercase",
                                    paddingLeft: 4,
                                }}
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                                style={inputStyle(emailFocus)}
                            />
                        </div>

                        {/* Password */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingLeft: 4 }}>
                                <label
                                    style={{
                                        fontSize: 12,
                                        fontFamily: "Geist, sans-serif",
                                        fontWeight: 600,
                                        letterSpacing: "0.05em",
                                        color: DesignColors().onSurfaceVariant,
                                        textTransform: "uppercase",
                                    }}
                                >
                                    Password
                                </label>
                                <a href="#" style={{ color: DesignColors().primary, fontSize: 14, fontWeight: 500, textDecoration: "none" }}>
                                    Forgot?
                                </a>
                            </div>
                            <div style={{ position: "relative" }}>
                                <input
                                    type={showPass ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setPassFocus(true)}
                                    onBlur={() => setPassFocus(false)}
                                    style={{ ...inputStyle(passFocus), paddingRight: 48 }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                    style={{
                                        position: "absolute",
                                        right: 16,
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                        color: DesignColors().outlineVariant,
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <Icon name={showPass ? "visibility_off" : "visibility"} />
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <SignInButton />
                    </div>
                </div>

                {/* Register link */}
                <p style={{ marginTop: 32, color: DesignColors().onSurfaceVariant, fontSize: 16 }}>
                    Don't have an account?{" "}
                    <a href="#" style={{ color: DesignColors().primary, fontWeight: 700, textDecoration: "none" }}>
                        Register for free
                    </a>
                </p>

                {/* AI Chips */}
                <div
                    style={{
                        marginTop: 48,
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: 8,
                        maxWidth: 360,
                    }}
                >
                    <Chip
                        icon="bolt"
                        label="High Performance Mode Active"
                        color={DesignColors().primary}
                        bg="rgba(70,72,212,0.08)"
                        border="rgba(70,72,212,0.2)"
                        pulse
                    />
                    <Chip
                        icon="verified_user"
                        label="End-to-End Encryption"
                        color={DesignColors().tertiary}
                        bg="rgba(144,73,0,0.06)"
                        border="rgba(144,73,0,0.2)"
                    />
                </div>
            </main>

            {/* Footer */}
            <footer
                style={{
                    width: "100%",
                    padding: "48px 20px",
                    borderTop: "1px solid rgba(199,196,215,0.2)",
                    background: DesignColors().surfaceContainerLowest,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 24,
                }}
            >
                <div
                    style={{
                        width: "100%",
                        maxWidth: 1280,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 16,
                    }}
                >
                    <span
                        style={{
                            fontSize: 13,
                            fontFamily: "Geist, sans-serif",
                            fontWeight: 500,
                            letterSpacing: "0.05em",
                            color: DesignColors().secondary,
                            textTransform: "uppercase",
                        }}
                    >
                        © 2024 AuraBooking. Precision Minimalist Design.
                    </span>
                    <div style={{ display: "flex", gap: 24 }}>
                        {["Privacy Policy", "Terms of Service", "Contact"].map((link) => (
                            <a
                                key={link}
                                href="#"
                                style={{
                                    fontSize: 14,
                                    color: DesignColors().onSurfaceVariant,
                                    textDecoration: "none",
                                    transition: "color 0.2s",
                                }}
                                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = DesignColors().primary)}
                                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = DesignColors().onSurfaceVariant)}
                            >
                                {link}
                            </a>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
}