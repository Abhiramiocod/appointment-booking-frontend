import { BadgeCheck, Briefcase, Mail, Phone } from "lucide-react";
import { Colors } from "../../../../../lib/utils";

interface BodyProps {
    r: any;
    tags: string[];
    certifications: string[];
}

export default function Body({ r, tags, certifications }: BodyProps) {
    return (
        <div className="p-6 space-y-5">
            {/* Avatar + name block */}
            <div className="flex items-center gap-5">
                {r.avatar ? (
                    <img
                        className="w-20 h-20 rounded-2xl object-cover shadow-md flex-shrink-0"
                        src={r.avatar}
                        alt={r.name}
                        onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = "none";
                            (
                                e.currentTarget.nextElementSibling as HTMLElement
                            )!.style.display = "flex";
                        }}
                    />
                ) : null}
                <div
                    className="rounded-2xl flex items-center justify-center text-white font-bold shadow-md flex-shrink-0"
                    style={{
                        width: 80,
                        height: 80,
                        fontSize: 32,
                        background: "linear-gradient(135deg,#4648d4,#7c3aed)",
                        display: r.avatar ? "none" : "flex",
                    }}
                >
                    {r.name?.charAt(0)?.toUpperCase() ?? "?"}
                </div>
                <div className="min-w-0">
                    <h4
                        className="text-xl font-bold truncate"
                        style={{ color: Colors.onSurface }}
                    >
                        {r.name}
                    </h4>
                    {(r.designation?.name || r.role) && (
                        <p
                            className="text-sm mt-0.5 flex items-center gap-1 font-medium"
                            style={{ color: Colors.primary }}
                        >
                            <Briefcase size={13} />
                            {r.designation?.name || r.role}
                        </p>
                    )}
                    {r.experience_years !== undefined && r.experience_years !== null && (
                        <p
                            className="text-xs mt-1"
                            style={{ color: Colors.onSurfaceVariant }}
                        >
                            Experience: {r.experience_years} years
                        </p>
                    )}
                    {tags.length > 0 && (
                        <div className="mt-2 flex gap-2 flex-wrap">
                            {tags.map((tag: string) => (
                                <span
                                    key={tag}
                                    className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded"
                                    style={{
                                        backgroundColor: "rgba(70,72,212,0.1)",
                                        color: Colors.primary,
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Contact info */}
            <div
                className="rounded-xl p-4 space-y-2"
                style={{ backgroundColor: "rgba(239,236,248,0.35)" }}
            >
                {r.email && (
                    <div className="flex items-center gap-2 text-sm" style={{ color: Colors.onSurface }}>
                        <Mail size={14} style={{ color: Colors.primary }} />
                        {r.email}
                    </div>
                )}
                {r.phone && (
                    <div className="flex items-center gap-2 text-sm" style={{ color: Colors.onSurface }}>
                        <Phone size={14} style={{ color: Colors.primary }} />
                        {r.phone}
                    </div>
                )}
            </div>

            {/* Bio / Cover Letter */}
            {(r.cover_letter || r.bio) && (
                <div className="space-y-1">
                    <label
                        className="text-xs font-semibold tracking-wider uppercase block"
                        style={{ color: Colors.outline }}
                    >
                        Cover Letter
                    </label>
                    <p
                        className="text-sm leading-relaxed whitespace-pre-line"
                        style={{ color: Colors.onSurface }}
                    >
                        {r.cover_letter || r.bio}
                    </p>
                </div>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
                <div className="space-y-2">
                    <label
                        className="text-xs font-semibold tracking-wider uppercase block"
                        style={{ color: Colors.outline }}
                    >
                        Certifications
                    </label>
                    <ul className="text-sm space-y-1">
                        {certifications.map((cert: string) => (
                            <li key={cert} className="flex items-center gap-2">
                                <BadgeCheck size={15} className="text-emerald-500 flex-shrink-0" />
                                {cert}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}