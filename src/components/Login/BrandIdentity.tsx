import DesignColors from "../../lib/utils";
import Icon from "./Icons";

export default function BrandIdentity() {
    return (
        <div style={{ marginBottom: 40, textAlign: "center" }}>
            <div
                style={{
                    width: 64,
                    height: 64,
                    background: DesignColors().primaryContainer,
                    borderRadius: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 24px",
                    boxShadow: "0 8px 24px rgba(70,72,212,0.2)",
                }}
            >
                <Icon name="auto_awesome" fill={1} style={{ fontSize: 32, color: DesignColors().onPrimaryContainer }} />
            </div>
            <h1
                style={{
                    fontSize: 36,
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                    margin: "0 0 8px",
                    color: DesignColors().onSurface,
                }}
            >
                Login to your account
            </h1>
            <p style={{ color: DesignColors().onSurfaceVariant, fontSize: 16, margin: 0 }}>
                Enter your details below to sign in
            </p>
        </div>
    )
}