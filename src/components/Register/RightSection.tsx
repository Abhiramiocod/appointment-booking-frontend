import { Colors } from "../../lib/utils";
import googleIcon from "../../assets/images/google.webp";
import microsoftIcon from "../../assets/images/microsoftlogo.png"
import FloatingInput from "./FloatingInputs";
import PasswordInput from "./PasswordInputs";
import { Link } from "react-router-dom";

interface RightSectionProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  status: string;
  setStatus: (status: string) => void;
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  setName: (name: string) => void;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
}   

export default function RightSection({ handleSubmit, status, name, username, email, password, confirmPassword, setName, setUsername, setEmail, setPassword, setConfirmPassword }: RightSectionProps) {
    return (
        <section
                    className="panel-right animate-fade-in"
                    style={{
                        width: "42%",
                        background: Colors.surfaceContainerLow,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "32px 48px",
                    }}
                >
                    <div style={{ width: "100%", maxWidth: 440 }}>

                        {/* Header */}
                        <header style={{ marginBottom: 24 }}>
                            {/* Mobile icon (hidden on desktop via CSS) */}
                            <div className="brand-mobile-icon" style={{ display: "none", justifyContent: "center", marginBottom: 24 }}>
                                <div style={{ width: 48, height: 48, background: Colors.primary, borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(70,72,212,0.3)" }}>
                                    <span className="material-symbols-outlined" style={{ color: "#fff", fontSize: 24 }}>auto_awesome</span>
                                </div>
                            </div>

                            {/* Desktop brand name */}
                            <div className="brand-desktop" style={{ fontFamily: "Inter", fontSize: 24, fontWeight: 700, color: Colors.primary, marginBottom: 8 }}>AuraBooking</div>

                            <h2 style={{ fontSize: 28, fontWeight: 700, color: Colors.onSurface, marginBottom: 6 }}>Create account</h2>
                            <p style={{ fontSize: 13, color: Colors.onSurfaceVariant, lineHeight: 1.45 }}>
                                Join today and start booking appointments seamlessly.
                            </p>
                        </header>

                        {/* Form */}
                        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>

                            <FloatingInput id="fullname" label="Full Name" icon="person" value={name} onChange={(e) => setName(e.target.value)} />
                            <FloatingInput id="username" label="Username" icon="alternate_email" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <FloatingInput id="email" label="Email Address" icon="mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <PasswordInput id="password" label="Password" icon="lock" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <PasswordInput id="confirm-password" label="Confirm Password" icon="lock_reset" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                            {/* Notice */}
                            <div style={{ background: "rgba(70,72,212,0.05)", borderRadius: "0.75rem", padding: 12, display: "flex", alignItems: "flex-start", gap: 10, border: "1px solid rgba(70,72,212,0.12)" }}>
                                <span className="material-symbols-outlined" style={{ color: Colors.primary, fontSize: 18, marginTop: 1 }}>info</span>
                                <p style={{ fontSize: 11, color: Colors.onSurfaceVariant, lineHeight: 1.45 }}>
                                    All new registrations create a Customer account. Staff/Admin roles are assigned by system administrators after verification.
                                </p>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className={`btn-primary${status === "done" ? " success" : ""}`}
                                disabled={status !== "idle"}
                                style={{ marginTop: 4 }}
                            >
                                {status === "idle" && (<>Create Account <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_forward</span></>)}
                                {status === "loading" && (<><span className="material-symbols-outlined spin">progress_activity</span> Creating…</>)}
                                {status === "done" && (<><span className="material-symbols-outlined">check_circle</span> Account Created!</>)}
                            </button>

                            {/* Divider */}
                            <div className="divider">
                                <div className="divider-line" />
                                <span className="divider-label">OR CONTINUE WITH</span>
                                <div className="divider-line" />
                            </div>

                            {/* Social buttons */}
                            <div className="social-row" style={{ display: "flex", gap: 12 }}>
                                <button
                                    type="button"
                                    className="btn-social"
                                    onClick={() => {
                                        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
                                        window.location.href = `${apiUrl}/auth/google/redirect`;
                                    }}
                                >
                                    <img
                                        alt="Google"
                                        src={googleIcon}
                                        style={{ width: 18, height: 18 }}
                                    />
                                    Google
                                </button>
                                <button type="button" className="btn-social">
                                    <img
                                        alt="Microsoft"
                                        src={microsoftIcon}
                                        style={{ width: 18, height: 18 }}
                                    />
                                    Microsoft
                                </button>
                            </div>
                        </form>

                        {/* Footer */}
                        <footer style={{ marginTop: 24, textAlign: "left" }}>
                            <p style={{ fontSize: 14, color: Colors.onSurfaceVariant }}>
                                Already have an account?{" "}
                                <Link to="/login" className="link-underline" style={{ color: Colors.primary, fontWeight: 600, marginLeft: 4 }}>Sign In</Link>
                            </p>
                        </footer>

                    </div>
                </section>
    )
}