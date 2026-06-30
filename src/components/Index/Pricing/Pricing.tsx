import DesignColors from "../../../lib/utils";
import PricingCard from "./PricingCard";

export default function Pricing({ onLogin }: { onLogin: () => void }) {
    const plans = [
        { label: "Basic", price: "$49", period: "/mo", features: ["Up to 3 clinicians", "Standard Analytics", "Web Widget"], cta: "Start Free Trial", style: "outline" as const },
        { label: "Pro", price: "$129", period: "/mo", features: ["Up to 15 clinicians", "AI Smart Scheduling", "Custom Branding", "SMS Reminders"], cta: "Get Started", style: "filled" as const, popular: true },
        { label: "Enterprise", price: "Custom", period: "", features: ["Unlimited Clinicians", "Dedicated Support", "API Access"], cta: "Contact Sales", style: "ghost" as const },
    ];
    return (
        <section style={{ padding: "128px 0" }} id="pricing">
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px" }}>
                <div style={{ textAlign: "center", marginBottom: 80 }}>
                    <h2 style={{ fontSize: 48, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, color: DesignColors().onSurface, margin: "0 0 16px" }}>Pricing for Every <span style={{ color: DesignColors().primary }}>Scale.</span></h2>
                    <p style={{ fontSize: 16, color: DesignColors().onSurfaceVariant, margin: 0 }}>Transparent plans designed for clinics of all sizes.</p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, alignItems: "center" }}>
                    {plans.map(({ label, price, period, features, cta, style: btnStyle, popular }) => (
                        <PricingCard key={label} label={label} price={price} period={period} features={features} cta={cta} btnStyle={btnStyle} popular={popular} onCta={onLogin} />
                    ))}
                </div>
            </div>
        </section>
    );
}