import DesignColors from "../../lib/utils";

interface HeaderProps {
    onBack?: () => void;
}

export default function Header({ onBack }: HeaderProps) {
    return (
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
    )
}