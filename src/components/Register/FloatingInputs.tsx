
type FloatingInputProps = {
    id: string;
    label: string;
    type?: string;
    icon: string;
    right?: React.ReactNode;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FloatingInput({ id, label, type = "text", icon, right, value, onChange }: FloatingInputProps) {
    return (
        <div className="input-wrap">
            <span className="material-symbols-outlined input-icon">{icon}</span>

            <div className="floating-root">
                <input
                    id={id}
                    type={type}
                    placeholder=" "
                    className="floating-input"
                    value={value}
                    onChange={onChange}
                    autoComplete="off"
                />
                <label htmlFor={id} className="floating-label">
                    {label}
                </label>
            </div>

            {right}
        </div>
    );
}