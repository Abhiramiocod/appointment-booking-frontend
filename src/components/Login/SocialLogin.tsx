import SocialButton from "./SocialButton";
import AppleLogo from "../../assets/images/apple.svg";
import GoogleLogo from "../../assets/images/google.webp";

export default function SocialLogin() {
    const handleGoogleLogin = () => {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
        window.location.href = `${apiUrl}/auth/google/redirect`;
    };

    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <SocialButton
                label="Microsoft"
                src={AppleLogo}
            />
            <SocialButton
                label="Google"
                src={GoogleLogo}
                onClick={handleGoogleLogin}
            />
        </div>
    );
}