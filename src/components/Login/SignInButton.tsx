import { useState } from "react";
import Icon from "./Icons";
import DesignColors from "../../lib/utils";

export default function SignInButton() {
    const [hovered, setHovered] = useState(false);
    const [pressed, setPressed] = useState(false);
    return (
        <button
            type="submit"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => { setHovered(false); setPressed(false); }}
            onMouseDown={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}
            style={{
                width: "100%",
                height: 56,
                background: DesignColors().primary,
                color: DesignColors().onPrimary,
                border: "none",
                borderRadius: 12,
                fontSize: 16,
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                marginTop: 8,
                transition: "all 0.3s ease",
                transform: pressed ? "scale(0.97)" : hovered ? "translateY(-1px)" : "none",
                boxShadow: hovered
                    ? "0 0 15px 2px rgba(70,72,212,0.3)"
                    : "0 4px 16px rgba(70,72,212,0.2)",
            }}
        >
            Sign In
            <Icon name="arrow_forward" style={{ fontSize: 20 }} />
        </button>
    );
}