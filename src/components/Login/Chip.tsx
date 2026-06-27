import Icon from "./Icons";

export default function Chip({
    icon, label, color, bg, border, pulse,
}: {
    icon: string; label: string; color: string; bg: string; border: string; pulse?: boolean;
}) {
    return (
        <span
            style={{
                background: bg,
                border: `1px solid ${border}`,
                borderRadius: 9999,
                padding: "4px 12px",
                fontSize: 12,
                fontFamily: "Geist, sans-serif",
                fontWeight: 600,
                letterSpacing: "0.05em",
                color,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                animation: pulse ? "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite" : "none",
            }}
        >
            <Icon name={icon} fill={1} style={{ fontSize: 12 }} />
            {label}
            <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }`}</style>
        </span>
    );
}