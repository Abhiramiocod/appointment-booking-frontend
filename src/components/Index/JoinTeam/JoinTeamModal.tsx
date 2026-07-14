import { useState, useRef, useEffect } from "react";
import DesignColors from "../../../lib/utils";
import api from "../../../lib/api";

interface Designation {
  id: number;
  name: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  designation_id: string;
  experience: string;
  bio: string;
}

const STEPS = ["Personal Info", "Experience", "Submit"];

type Status = "idle" | "submitting" | "success" | "error";

export default function JoinTeamModal({ onClose }: { onClose: () => void }) {
  const C = DesignColors();
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [designations, setDesignations] = useState<Designation[]>([]);
  const [loadingDesignations, setLoadingDesignations] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    designation_id: "",
    experience: "",
    bio: "",
  });

  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadDesignations() {
      setLoadingDesignations(true);
      try {
        const res = await api.get("/staff/designations");
        setDesignations(res.data.data || res.data || []);
      } catch (err) {
        console.error("Failed to load designations", err);
      } finally {
        setLoadingDesignations(false);
      }
    }
    loadDesignations();
  }, []);

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const canNext = () => {
    if (step === 0) return form.name.trim() && form.email.trim() && form.phone.trim();
    if (step === 1) return form.designation_id && form.experience.trim();
    return true;
  };

  const handleSubmit = async () => {
    setStatus("submitting");
    setErrorMsg("");
    try {
      await api.post("/staff/apply", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        designation_id: Number(form.designation_id),
        experience_years: Number(form.experience),
        cover_letter: form.bio,
      });
      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(
        err?.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  /* ---------- helpers ---------- */
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 12,
    border: `1.5px solid ${C.outlineVariant}`,
    background: C.surface,
    color: C.onSurface,
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 600,
    color: C.outline,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    marginBottom: 6,
    display: "block",
  };

  const primaryBtn: React.CSSProperties = {
    background: `linear-gradient(135deg, ${C.primary}, #7c3aed)`,
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "12px 28px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    transition: "opacity 0.2s, transform 0.15s",
    fontFamily: "inherit",
  };

  /* ---------- render ---------- */
  return (
    <div
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        backgroundColor: "rgba(27,27,35,0.35)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 24,
          width: "100%",
          maxWidth: 520,
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 32px 80px rgba(70,72,212,0.18)",
          position: "relative",
        }}
      >
        {/* ── close ── */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            width: 32,
            height: 32,
            borderRadius: "50%",
            border: "none",
            background: C.surfaceContainer,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            color: C.outline,
            zIndex: 10,
          }}
        >
          ×
        </button>

        {status === "success" ? (
          /* ───────────── SUCCESS ───────────── */
          <div style={{ padding: "48px 40px", textAlign: "center" }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#4648d4,#7c3aed)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
                fontSize: 32,
              }}
            >
              🎉
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: C.onSurface, margin: "0 0 8px" }}>
              Application Submitted!
            </h2>
            <p style={{ color: C.onSurfaceVariant, fontSize: 14, lineHeight: 1.6, marginBottom: 32 }}>
              Thank you, <strong style={{ color: C.onSurface }}>{form.name}</strong>! Our team
              will review your application and reach out to you at{" "}
              <strong style={{ color: C.primary }}>{form.email}</strong> shortly.
            </p>
            <button
              onClick={onClose}
              style={{ ...primaryBtn, width: "100%" }}
            >
              Done
            </button>
          </div>
        ) : (
          <>
            {/* ── header ── */}
            <div
              style={{
                padding: "28px 32px 20px",
                borderBottom: `1px solid ${C.outlineVariant}22`,
              }}
            >
              {/* step pills */}
              <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
                {STEPS.map((s, i) => (
                  <div
                    key={s}
                    style={{
                      flex: 1,
                      height: 4,
                      borderRadius: 99,
                      background:
                        i <= step
                          ? `linear-gradient(90deg,${C.primary},#7c3aed)`
                          : C.outlineVariant + "44",
                      transition: "background 0.4s",
                    }}
                  />
                ))}
              </div>
              <p style={{ fontSize: 11, color: C.outline, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 6px", fontWeight: 600 }}>
                Step {step + 1} of {STEPS.length} · {STEPS[step]}
              </p>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: C.onSurface, margin: 0 }}>
                {step === 0 && "Tell us about yourself"}
                {step === 1 && "Your expertise"}
                {step === 2 && "Final touches"}
              </h2>
            </div>

            {/* ── body ── */}
            <div style={{ padding: "24px 32px" }}>
              {step === 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <label style={labelStyle}>Full Name</label>
                    <input
                      style={inputStyle}
                      placeholder="e.g. Sarah Jenkins"
                      value={form.name}
                      onChange={set("name")}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address</label>
                    <input
                      style={inputStyle}
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={set("email")}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone Number</label>
                    <input
                      style={inputStyle}
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={form.phone}
                      onChange={set("phone")}
                    />
                  </div>
                </div>
              )}

              {step === 1 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <label style={labelStyle}>Desired Role</label>
                    {loadingDesignations ? (
                      <div style={{ fontSize: 13, color: C.outline }}>Loading roles...</div>
                    ) : (
                      <select style={inputStyle} value={form.designation_id} onChange={set("designation_id")}>
                        <option value="" disabled>Select a role…</option>
                        {designations.map((d) => (
                          <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                      </select>
                    )}
                  </div>
                  <div>
                    <label style={labelStyle}>Years of Experience</label>
                    <input
                      style={inputStyle}
                      type="number"
                      min={0}
                      max={50}
                      placeholder="e.g. 5"
                      value={form.experience}
                      onChange={set("experience")}
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div
                    style={{
                      background: `linear-gradient(135deg,rgba(70,72,212,0.06),rgba(124,58,237,0.06))`,
                      borderRadius: 14,
                      padding: "16px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                    }}
                  >
                    {[
                      { label: "Name", value: form.name },
                      { label: "Email", value: form.email },
                      { label: "Phone", value: form.phone },
                      { 
                        label: "Role", 
                        value: designations.find((d) => String(d.id) === String(form.designation_id))?.name || "Selected Role" 
                      },
                      { label: "Experience", value: `${form.experience} years` },
                    ].map(({ label, value }) => (
                      <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                        <span style={{ color: C.outline, fontWeight: 600 }}>{label}</span>
                        <span style={{ color: C.onSurface, fontWeight: 500 }}>{value}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <label style={labelStyle}>Cover Letter</label>
                    <textarea
                      style={{ ...inputStyle, height: 100, resize: "none" } as React.CSSProperties}
                      placeholder="Tell us a bit about your background and what makes you a great fit…"
                      value={form.bio}
                      onChange={set("bio")}
                    />
                  </div>
                  {status === "error" && (
                    <p style={{ fontSize: 13, color: "#ba1a1a", margin: 0 }}>{errorMsg}</p>
                  )}
                </div>
              )}
            </div>

            {/* ── footer ── */}
            <div
              style={{
                padding: "16px 32px 28px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {step > 0 ? (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: 14,
                    fontWeight: 600,
                    color: C.outline,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    padding: "12px 0",
                  }}
                >
                  ← Back
                </button>
              ) : (
                <span />
              )}

              {step < STEPS.length - 1 ? (
                <button
                  onClick={() => setStep((s) => s + 1)}
                  disabled={!canNext()}
                  style={{
                    ...primaryBtn,
                    opacity: canNext() ? 1 : 0.45,
                    cursor: canNext() ? "pointer" : "not-allowed",
                  }}
                >
                  Continue →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={status === "submitting"}
                  style={{
                    ...primaryBtn,
                    opacity: status === "submitting" ? 0.7 : 1,
                    minWidth: 140,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  {status === "submitting" ? (
                    <>
                      <span
                        style={{
                          width: 14,
                          height: 14,
                          border: "2px solid rgba(255,255,255,0.4)",
                          borderTopColor: "#fff",
                          borderRadius: "50%",
                          display: "inline-block",
                          animation: "spin 0.7s linear infinite",
                        }}
                      />
                      Submitting…
                    </>
                  ) : (
                    "Submit Application 🚀"
                  )}
                </button>
              )}
            </div>
          </>
        )}
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}
