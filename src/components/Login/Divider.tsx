import DesignColors from "../../lib/utils";

export default function Divider() {
    return (
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
    )
}