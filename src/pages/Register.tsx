import type React from "react";
import { useState } from "react";
import LeftSection from "../components/Register/LeftSection";
import RightSection from "../components/Register/RightSection";
import api from "../lib/api";
import { useNavigate } from "react-router-dom";

// ---------- Main component ----------
export default function RegisterPage() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [status, setStatus] = useState("idle"); // idle | loading | done

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await api.post("/register", {
                name,
                username,
                email,
                password,
                password_confirmation: confirmPassword,
            });

            const { user, token } = response.data;

            // Save authentication
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            // Redirect to customer dashboard
            navigate("/customer");
        } catch (error: any) {
            console.error(error);

            if (error.response?.data?.errors) {
                console.log(error.response.data.errors); // Laravel validation errors
            }

            // Show error message/toast here
        }
    };

    return (
        <>
            <div className="layout" style={{ display: "flex", minHeight: "100vh" }}>

                {/* ── LEFT: Brand panel ── */}
                <LeftSection />

                {/* ── RIGHT: Registration form ── */}
                <RightSection handleSubmit={handleSubmit} status={status} setStatus={setStatus} name={name} username={username} email={email} password={password} confirmPassword={confirmPassword} setName={setName} setUsername={setUsername} setEmail={setEmail} setPassword={setPassword} setConfirmPassword={setConfirmPassword} />
            </div>
        </>
    );
}
