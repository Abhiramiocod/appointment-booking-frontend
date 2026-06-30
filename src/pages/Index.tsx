import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DesignColors from "../lib/utils";
import Nav from "../components/Index/Navbar/Nav";
import Hero from "../components/Index/Hero/Hero";
import TrustedBy from "../components/Index/TrustedBy/TrustedBy";
import Features from "../components/Index/Features/Features";
import HowItWorks from "../components/Index/HowItWorks/HowItWorks";
import Pricing from "../components/Index/Pricing/Pricing";
import FAQ from "../components/Index/FAQ/FAQ";
import Footer from "../components/Index/Footer/Footer";

export default function Index() {
    const navigate = useNavigate();

    const onLogin = useCallback(() => {
        navigate("/login");
        window.scrollTo({ top: 0 });
    }, [navigate]);

    useEffect(() => {
        const els = document.querySelectorAll("[data-reveal]");
        els.forEach((el) => {
            (el as HTMLElement).style.opacity = "0";
            (el as HTMLElement).style.transform = "translateY(40px)";
            (el as HTMLElement).style.transition = "opacity 0.8s ease, transform 0.8s ease";
        });
        const obs = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    (e.target as HTMLElement).style.opacity = "1";
                    (e.target as HTMLElement).style.transform = "translateY(0)";
                }
            });
        }, { threshold: 0.1 });
        els.forEach((el) => obs.observe(el));
        return () => obs.disconnect();
    }, []);

    return (
        <div style={{ backgroundColor: DesignColors().surface, backgroundImage: "radial-gradient(at 0% 0%, rgba(70,72,212,0.05) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(144,73,0,0.03) 0px, transparent 50%)", minHeight: "100vh" }}>
            <Nav onLogin={onLogin} />
            <main>
                <div data-reveal><Hero onLogin={onLogin} /></div>
                <div data-reveal><TrustedBy /></div>
                <div data-reveal><Features /></div>
                <div data-reveal><HowItWorks /></div>
                <div data-reveal><Pricing onLogin={onLogin} /></div>
                <div data-reveal><FAQ /></div>
            </main>
            <Footer />
        </div>
    );
}
