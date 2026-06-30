import SocialButton from "./SocialButton";
import AppleLogo from "../../../public/images/apple.svg";
import GoogleLogo from "../../../public/images/google.webp";

export default function SocialLogin() {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
                {
                    label: "Apple",
                    src: AppleLogo,
                },
                {
                    label: "Google",
                    src: GoogleLogo,
                },
            ].map(({ label, src }) => (
                <SocialButton key={label} label={label} src={src} />
            ))}
        </div>
    )
}