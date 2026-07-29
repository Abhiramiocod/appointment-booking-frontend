import { Link } from "react-router-dom";
import DesignColors from "../../lib/utils";
import Icon from "./Icons";
import SignInButton from "./SignInButton";


type LoginFormProps = {
    email: string;
    setEmail: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
    showPass: boolean;
    setShowPass: (value: boolean) => void;
    emailFocus: boolean;
    setEmailFocus: (value: boolean) => void;
    passFocus: boolean;
    setPassFocus: (value: boolean) => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function LoginForm({
    email,
    setEmail,
    password,
    setPassword,
    showPass,
    setShowPass,
    emailFocus,
    setEmailFocus,
    passFocus,
    setPassFocus,
    onSubmit,
}: LoginFormProps) {

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
        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
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
                    name="email"
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
                    <Link to="/forgot-password" style={{ color: DesignColors().primary, fontSize: 14, fontWeight: 500, textDecoration: "none" }}>
                        Forgot?
                    </Link>

                </div>
                <div style={{ position: "relative" }}>
                    <input
                    type={showPass ? "text" : "password"}
                    name="password"
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
        </form>
    )
}
