import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DesignColors from "../lib/utils";
import Header from "../components/Login/Header";
import BrandIdentity from "../components/Login/BrandIdentity";
import SocialLogin from "../components/Login/SocialLogin";
import Divider from "../components/Login/Divider";
import LoginForm from "../components/Login/LoginForm";
import { glass } from "../styles/glass";
import api from "../lib/api";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
    const [emailFocus, setEmailFocus] = useState(false);
    const [passFocus, setPassFocus] = useState(false);

    const onBack = useCallback(() => {
        navigate("/");
        window.scrollTo({ top: 0 });
    }, [navigate]);

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

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await api.post("/login", {
                email,
                password,
            });

            const { user, token } = response.data;

            // Save auth
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            // Navigate by role
            switch (user.role) {
                case "admin":
                    navigate("/admin");
                    break;

                case "staff":
                    navigate("/staff");
                    break;

                case "customer":
                    navigate("/customer");
                    break;

                default:
                    navigate("/");
            }
        } catch (error) {
            console.error(error);
            // Show error toast/message
        }
    };

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

    return (
        <div style={bgStyle}>
            {/* Header */}
            <Header onBack={onBack} />

            {/* Main */}
            <main
                style={{
                    width: "100%",
                    maxWidth: 440,
                    padding: "40px 16px 48px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                {/* Brand identity */}
                <BrandIdentity />

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
                    <SocialLogin />

                    {/* Divider */}
                    <Divider />

                    {/* Form */}
                    <LoginForm
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        showPass={showPass}
                        setShowPass={setShowPass}
                        emailFocus={emailFocus}
                        setEmailFocus={setEmailFocus}
                        passFocus={passFocus}
                        setPassFocus={setPassFocus}
                        onSubmit={handleLogin}
                    />
                </div>

                {/* Register link */}
                <p style={{ marginTop: 32, color: DesignColors().onSurfaceVariant, fontSize: 16 }}>
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        style={{
                            color: DesignColors().primary,
                            fontWeight: 700,
                            textDecoration: "none",
                        }}
                    >
                        Register for free
                    </Link>
                </p>
            </main>
        </div>
    );
}
