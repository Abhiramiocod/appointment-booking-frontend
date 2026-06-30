import { useState } from "react";
import DesignColors from "../../../lib/utils";
import Icon from "../../Login/Icons";
import { glassCard } from "../../../styles/glass";

export default function FAQ() {
    const [open, setOpen] = useState<number | null>(0);
    const faqs = [
        { q: "Can I migrate from my current system?", a: "Yes, we provide automated migration tools for most major EHR and booking platforms. Our white-glove support team can also handle the migration for you at no extra cost for Pro and Enterprise plans." },
        { q: "How does the AI scheduling work?", a: 'Our AI analyzes historical booking data, staff preferences, and appointment types to find the "Goldilocks" slots—those that minimize idle time while ensuring your staff isn\'t overwhelmed.' },
        { q: "Is AuraBooking HIPAA compliant?", a: "Absolutely. Security is our foundation. We are fully HIPAA and GDPR compliant, utilizing end-to-end encryption for all patient and appointment data." },
    ];
    return (
        <section style={{ padding: "128px 0", background: DesignColors().surfaceLow }}>
            <div style={{ maxWidth: 768, margin: "0 auto", padding: "0 20px" }}>
                <h2 style={{ fontSize: 48, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, color: DesignColors().onSurface, textAlign: "center", margin: "0 0 64px" }}>Frequently Asked <span style={{ color: DesignColors().primary }}>Questions.</span></h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {faqs.map(({ q, a }, i) => (
                        <div key={i} onClick={() => setOpen(open === i ? null : i)} style={{ ...glassCard, padding: 24, borderRadius: 16, cursor: "pointer" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <h3 style={{ fontSize: 20, fontWeight: 600, color: DesignColors().onSurface, margin: 0, letterSpacing: "-0.01em" }}>{q}</h3>
                                <Icon name="expand_more" style={{ color: open === i ? DesignColors().primary : DesignColors().onSurfaceVariant, transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.3s" }} />
                            </div>
                            {open === i && <p style={{ fontSize: 16, lineHeight: 1.6, color: DesignColors().onSurfaceVariant, margin: "16px 0 0" }}>{a}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}