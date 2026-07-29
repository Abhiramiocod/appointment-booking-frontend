import { useState } from "react";
import SocialButton from "./SocialButton";
import GoogleLogo from "../../assets/images/google.webp";
import MicrosoftLogo from "../../assets/images/microsoftlogo.png";

export default function SocialLogin() {
    const [loadingProvider, setLoadingProvider] = useState<"google" | "microsoft" | null>(null);

    const handleGoogleLogin = () => {
        setLoadingProvider("google");
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
        window.location.href = `${apiUrl}/auth/google/redirect`;
    };

    const handleMicrosoftLogin = () => {
        setLoadingProvider("microsoft");
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
        window.location.href = `${apiUrl}/auth/microsoft/redirect`;
    };

    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <SocialButton
                label="Microsoft"
                src={MicrosoftLogo}
                onClick={handleMicrosoftLogin}
                loading={loadingProvider === "microsoft"}
                disabled={loadingProvider !== null && loadingProvider !== "microsoft"}
            />
            <SocialButton
                label="Google"
                src={GoogleLogo}
                onClick={handleGoogleLogin}
                loading={loadingProvider === "google"}
                disabled={loadingProvider !== null && loadingProvider !== "google"}
            />
        </div>
    );
}