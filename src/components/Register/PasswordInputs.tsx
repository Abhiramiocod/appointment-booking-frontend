import { useState } from "react";
import { Colors } from "../../lib/utils";

type PasswordInputProps = {
    id: string;
    label: string;
    icon: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function PasswordInput({ id, label, icon, value, onChange }: PasswordInputProps) {
    const [visible, setVisible] = useState(false);
    return (
        <div className="input-wrap">
            <span className="material-symbols-outlined" style={{ color: Colors.onSurfaceVariant, marginRight: 12, fontSize: 22 }}>{icon}</span>
            <div className="floating-root">
                <input id={id} type={visible ? "text" : "password"} placeholder=" " className="floating-input" style={{ paddingRight: 36 }} value={value} onChange={onChange} />
                <label htmlFor={id} className="floating-label">{label}</label>
            </div>
            <button
                type="button"
                onClick={() => setVisible(v => !v)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(70,69,84,0.6)", display: "flex", alignItems: "center", padding: 0, marginLeft: 8 }}
            >
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{visible ? "visibility_off" : "visibility"}</span>
            </button>
        </div>
    );
}