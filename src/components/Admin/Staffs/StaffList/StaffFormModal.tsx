import { useState, useEffect } from "react";
import {
  X,
  Loader2,
  Eye,
  EyeOff,
  Copy,
  Check,
  RefreshCw,
  Mail,
  Phone,
  Briefcase,
  Clock,
  Pencil,
} from "lucide-react";
import { Colors } from "../../../../lib/utils";
import api from "../../../../lib/api";
import StatusBadge from "./StatusBadge";

// ── Types ────────────────────────────────────────────────────────────────
type ModalMode = "add" | "edit" | "view";

interface StaffFormModalProps {
  mode: ModalMode;
  staff?: any;            // required for "edit" | "view"
  onClose: () => void;
  onSuccess?: (message: string) => void;
}

// ── Helpers ──────────────────────────────────────────────────────────────
function generatePassword(length = 12): string {
  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%";
  let pass = "";
  for (let i = 0; i < length; i++) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pass;
}

const INPUT_CLS =
  "w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all bg-white";
const LABEL_CLS =
  "block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "on_leave", label: "On Leave" },
  { value: "terminated", label: "Terminated" },
  { value: "suspended", label: "Suspended" },
];

// ── View Panel ───────────────────────────────────────────────────────────
function ViewPanel({
  staff,
  onSwitchToEdit,
}: {
  staff: any;
  onSwitchToEdit: () => void;
}) {
  const [schedule, setSchedule] = useState<any[]>([]);
  const [scheduleLoading, setScheduleLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/admin/staff/${staff.id}/schedule`)
      .then((res) => setSchedule(res.data?.data || res.data || []))
      .catch(() => setSchedule([]))
      .finally(() => setScheduleLoading(false));
  }, [staff.id]);

  const services: any[] = staff.services || staff.profile?.services || [];
  const designation =
    staff.profile?.designation?.name || staff.profile?.designation || "—";
  const experience = staff.profile?.experience_years;
  const employmentStatus = staff.profile?.employment_status || staff.status;
  const avatar = staff.profile?.profile_photo || staff.avatar;

  const scheduleMap: Record<string, any> = {};
  schedule.forEach((entry: any) => {
    const dayVal = entry.day_of_week || entry.day || "";
    const day = String(dayVal).toLowerCase();
    scheduleMap[day] = entry;
  });

  return (
    <div className="p-6 space-y-5">
      {/* Avatar + Name */}
      <div className="flex items-center gap-5">
        {avatar ? (
          <img
            className="w-20 h-20 rounded-2xl object-cover shadow-md flex-shrink-0"
            src={avatar}
            alt={staff.name}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
              (e.currentTarget.nextElementSibling as HTMLElement)!.style.display = "flex";
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
            display: avatar ? "none" : "flex",
          }}
        >
          {staff.name?.charAt(0)?.toUpperCase() ?? "?"}
        </div>
        <div className="min-w-0 flex-1">
          <h4
            className="text-xl font-bold truncate"
            style={{ color: Colors.onSurface }}
          >
            {staff.name}
          </h4>
          {designation !== "—" && (
            <p
              className="text-sm mt-0.5 flex items-center gap-1 font-medium"
              style={{ color: Colors.primary }}
            >
              <Briefcase size={13} />
              {designation}
            </p>
          )}
          {experience !== undefined && experience !== null && (
            <p className="text-xs mt-1" style={{ color: Colors.onSurfaceVariant }}>
              {experience} year{experience !== 1 ? "s" : ""} of experience
            </p>
          )}
        </div>
        <button
          onClick={onSwitchToEdit}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors self-start"
          style={{
            background: "rgba(70,72,212,0.08)",
            color: Colors.primary,
          }}
        >
          <Pencil size={12} />
          Edit
        </button>
      </div>

      {/* Status */}
      <div className="flex items-center gap-3">
        <span
          className="text-[10px] font-bold uppercase tracking-wider"
          style={{ color: Colors.outline }}
        >
          Status
        </span>
        <StatusBadge status={employmentStatus || "inactive"} />
      </div>

      {/* Contact */}
      <div
        className="rounded-xl p-4 space-y-2"
        style={{ backgroundColor: "rgba(239,236,248,0.35)" }}
      >
        {staff.email && (
          <div className="flex items-center gap-2 text-sm" style={{ color: Colors.onSurface }}>
            <Mail size={14} style={{ color: Colors.primary }} />
            {staff.email}
          </div>
        )}
        {staff.profile?.phone && (
          <div className="flex items-center gap-2 text-sm" style={{ color: Colors.onSurface }}>
            <Phone size={14} style={{ color: Colors.primary }} />
            {staff.profile.phone}
          </div>
        )}
      </div>

      {/* Assigned Services */}
      <div className="space-y-2">
        <label
          className="text-[10px] font-bold uppercase tracking-wider block"
          style={{ color: Colors.outline }}
        >
          Assigned Services
        </label>
        {services.length === 0 ? (
          <p className="text-sm" style={{ color: Colors.outline }}>
            No services assigned yet.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {services.map((srv: any) => {
              const srvName = typeof srv === "string" ? srv : srv.name;
              const srvId = typeof srv === "object" ? srv.id : srv;
              return (
                <span
                  key={srvId}
                  className="px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: "rgba(70,72,212,0.1)",
                    color: Colors.primary,
                  }}
                >
                  {srvName}
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Working Hours */}
      <div className="space-y-2">
        <label
          className="text-[10px] font-bold uppercase tracking-wider block"
          style={{ color: Colors.outline }}
        >
          Working Hours
        </label>
        {scheduleLoading ? (
          <div className="flex items-center gap-2 py-2">
            <Loader2 size={14} className="animate-spin" style={{ color: Colors.primary }} />
            <span className="text-xs" style={{ color: Colors.outline }}>
              Loading schedule…
            </span>
          </div>
        ) : schedule.length === 0 ? (
          <p className="text-sm" style={{ color: Colors.outline }}>
            No schedule data available.
          </p>
        ) : (
          <div className="rounded-xl border border-slate-100 overflow-hidden divide-y divide-slate-50">
            {DAYS.map((day) => {
              const entry = scheduleMap[day.toLowerCase()];
              const isOff = !entry || entry.is_day_off || !entry.start_time;
              return (
                <div
                  key={day}
                  className="flex items-center justify-between px-4 py-2.5"
                  style={{ backgroundColor: isOff ? "transparent" : "rgba(70,72,212,0.03)" }}
                >
                  <span
                    className="text-xs font-semibold w-24"
                    style={{ color: isOff ? Colors.outline : Colors.onSurface }}
                  >
                    {day}
                  </span>
                  {isOff ? (
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: "rgba(118,117,134,0.1)",
                        color: Colors.outline,
                      }}
                    >
                      Off
                    </span>
                  ) : (
                    <span
                      className="text-xs font-semibold flex items-center gap-1"
                      style={{ color: Colors.primary }}
                    >
                      <Clock size={11} />
                      {entry.start_time?.slice(0, 5)} – {entry.end_time?.slice(0, 5)}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bio */}
      {staff.profile?.bio && (
        <div className="space-y-1">
          <label
            className="text-[10px] font-semibold tracking-wider uppercase block"
            style={{ color: Colors.outline }}
          >
            Bio
          </label>
          <p
            className="text-sm leading-relaxed whitespace-pre-line"
            style={{ color: Colors.onSurface }}
          >
            {staff.profile.bio}
          </p>
        </div>
      )}
    </div>
  );
}

// ── Form Panel (Add / Edit) ──────────────────────────────────────────────
function FormPanel({
  mode,
  staff,
  onClose,
  onSuccess,
}: {
  mode: "add" | "edit";
  staff?: any;
  onClose: () => void;
  onSuccess?: (message: string) => void;
}) {
  const isEdit = mode === "edit";

  // Form state
  const [name, setName] = useState(staff?.name || "");
  const [email, setEmail] = useState(staff?.email || "");
  const [phone, setPhone] = useState(staff?.profile?.phone || "");
  const [designationId, setDesignationId] = useState(
    String(staff?.profile?.designation?.id || staff?.profile?.designation_id || "")
  );
  const [experienceYears, setExperienceYears] = useState(
    String(staff?.profile?.experience_years ?? "")
  );
  const [employmentStatus, setEmploymentStatus] = useState(
    staff?.profile?.employment_status || "active"
  );
  const [selectedServiceIds, setSelectedServiceIds] = useState<number[]>(
    isEdit
      ? (staff?.services || []).map((s: any) =>
          typeof s === "object" ? s.id : s
        )
      : []
  );
  const [password, setPassword] = useState(isEdit ? "" : generatePassword());
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  // Remote data
  const [designations, setDesignations] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);

  // UI state
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    Promise.all([
      api.get("/admin/designations").catch(() => ({ data: [] })),
      api.get("/admin/services").catch(() => ({ data: [] })),
    ]).then(([desRes, srvRes]) => {
      setDesignations(desRes.data?.data || desRes.data || []);
      setServices(srvRes.data?.data || srvRes.data || []);
    });
  }, []);

  const toggleService = (id: number) => {
    setSelectedServiceIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Full name is required.";
    if (!email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Enter a valid email address.";
    if (!phone.trim()) errs.phone = "Phone number is required.";
    if (!designationId) errs.designation_id = "Designation is required.";
    if (!isEdit && !password.trim()) errs.password = "Password is required.";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }
    setFieldErrors({});
    setError(null);
    setSubmitting(true);

    try {
      if (isEdit) {
        await api.put(`/admin/staff/${staff.id}`, {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          designation_id: Number(designationId),
          experience_years: experienceYears ? Number(experienceYears) : null,
          employment_status: employmentStatus,
          service_ids: selectedServiceIds,
          ...(password ? { password } : {}),
        });
        onSuccess?.(`${name.trim()}'s profile has been updated successfully.`);
      } else {
        await api.post("/admin/staff", {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          password,
          designation_id: Number(designationId),
          experience_years: experienceYears ? Number(experienceYears) : null,
          employment_status: employmentStatus,
          service_ids: selectedServiceIds,
        });
        onSuccess?.(`${name.trim()} has been added as a staff member.`);
      }
    } catch (err: any) {
      const apiErrors = err.response?.data?.errors;
      if (apiErrors && typeof apiErrors === "object") {
        const mapped: Record<string, string> = {};
        Object.entries(apiErrors).forEach(([k, v]) => {
          mapped[k] = Array.isArray(v) ? (v as string[])[0] : String(v);
        });
        setFieldErrors(mapped);
      } else {
        setError(
          err.response?.data?.message ||
            `Failed to ${isEdit ? "update" : "create"} staff member. Please check the form and try again.`
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="overflow-y-auto" style={{ maxHeight: "calc(90vh - 96px)" }}>
      <div className="p-6 space-y-5">
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200/60 text-rose-700 text-xs rounded-xl">
            ⚠️ {error}
          </div>
        )}

        {/* ── Personal ── */}
        <section>
          <h4
            className="text-[10px] font-bold uppercase tracking-widest mb-3"
            style={{ color: Colors.outline }}
          >
            Personal Information
          </h4>
          <div className="space-y-3">
            <div>
              <label className={LABEL_CLS}>Full Name *</label>
              <input
                type="text"
                className={INPUT_CLS}
                placeholder="e.g. Dr. Elena Vance"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {fieldErrors.name && (
                <p className="text-xs text-rose-600 mt-1">{fieldErrors.name}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={LABEL_CLS}>Email *</label>
                <input
                  type="email"
                  className={INPUT_CLS}
                  placeholder="elena@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {fieldErrors.email && (
                  <p className="text-xs text-rose-600 mt-1">{fieldErrors.email}</p>
                )}
              </div>
              <div>
                <label className={LABEL_CLS}>Phone Number *</label>
                <input
                  type="tel"
                  className={INPUT_CLS}
                  placeholder="+1 555 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {fieldErrors.phone && (
                  <p className="text-xs text-rose-600 mt-1">{fieldErrors.phone}</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Professional ── */}
        <section>
          <h4
            className="text-[10px] font-bold uppercase tracking-widest mb-3"
            style={{ color: Colors.outline }}
          >
            Professional Information
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={LABEL_CLS}>Designation *</label>
              <select
                className={INPUT_CLS}
                value={designationId}
                onChange={(e) => setDesignationId(e.target.value)}
              >
                <option value="">Select designation</option>
                {designations.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
              {fieldErrors.designation_id && (
                <p className="text-xs text-rose-600 mt-1">
                  {fieldErrors.designation_id}
                </p>
              )}
            </div>
            <div>
              <label className={LABEL_CLS}>Experience (years)</label>
              <input
                type="number"
                min="0"
                max="50"
                className={INPUT_CLS}
                placeholder="e.g. 5"
                value={experienceYears}
                onChange={(e) => setExperienceYears(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* ── Employment ── */}
        <section>
          <h4
            className="text-[10px] font-bold uppercase tracking-widest mb-3"
            style={{ color: Colors.outline }}
          >
            Employment
          </h4>
          <div>
            <label className={LABEL_CLS}>Employment Status</label>
            <select
              className={INPUT_CLS}
              value={employmentStatus}
              onChange={(e) => setEmploymentStatus(e.target.value)}
            >
              {STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* ── Services ── */}
        {services.length > 0 && (
          <section>
            <h4
              className="text-[10px] font-bold uppercase tracking-widest mb-3"
              style={{ color: Colors.outline }}
            >
              Assigned Services
            </h4>
            <div
              className="rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden"
              style={{ maxHeight: 200, overflowY: "auto" }}
            >
              {services.map((srv) => (
                <label
                  key={srv.id}
                  className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-indigo-50/40 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedServiceIds.includes(srv.id)}
                    onChange={() => toggleService(srv.id)}
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm font-medium text-slate-700">
                    {srv.name}
                  </span>
                  {srv.duration && (
                    <span className="ml-auto text-[11px] text-slate-400">
                      {srv.duration} min
                    </span>
                  )}
                </label>
              ))}
            </div>
          </section>
        )}

        {/* ── Password (Add only, optional on Edit) ── */}
        <section>
          <h4
            className="text-[10px] font-bold uppercase tracking-widest mb-3"
            style={{ color: Colors.outline }}
          >
            {isEdit ? "Change Password" : "Account"}
          </h4>
          <div>
            <label className={LABEL_CLS}>
              {isEdit ? "New Password (leave blank to keep)" : "Temporary Password *"}
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type={showPassword ? "text" : "password"}
                  className={INPUT_CLS + " pr-10"}
                  placeholder={isEdit ? "Leave blank to keep current" : ""}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {!isEdit && (
                <>
                  <button
                    type="button"
                    onClick={handleCopy}
                    title="Copy password"
                    className="px-3 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-500 hover:text-slate-700"
                  >
                    {copied ? (
                      <Check size={15} className="text-emerald-500" />
                    ) : (
                      <Copy size={15} />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPassword(generatePassword())}
                    title="Regenerate password"
                    className="px-3 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-500 hover:text-slate-700"
                  >
                    <RefreshCw size={15} />
                  </button>
                </>
              )}
            </div>
            {fieldErrors.password && (
              <p className="text-xs text-rose-600 mt-1">{fieldErrors.password}</p>
            )}
            {!isEdit && (
              <p className="text-[11px] text-slate-400 mt-1.5">
                Share this temporary password with the staff member. They should
                change it on first login.
              </p>
            )}
          </div>
        </section>
      </div>

      {/* Footer */}
      <div
        className="px-6 pb-6 flex gap-3 border-t border-slate-100 pt-4"
        style={{ position: "sticky", bottom: 0, background: "#fff" }}
      >
        <button
          type="button"
          onClick={onClose}
          style={{
            flex: 1,
            padding: "11px 0",
            borderRadius: 12,
            border: "1.5px solid rgba(199,196,215,0.4)",
            background: "transparent",
            color: Colors.onSurfaceVariant,
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          style={{
            flex: 2,
            padding: "11px 0",
            borderRadius: 12,
            border: "none",
            background: submitting
              ? "rgba(70,72,212,0.5)"
              : "linear-gradient(135deg,#4648d4,#7c3aed)",
            color: "#fff",
            fontWeight: 700,
            fontSize: 14,
            cursor: submitting ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            fontFamily: "inherit",
          }}
        >
          {submitting && (
            <Loader2
              size={16}
              style={{ animation: "spin 0.7s linear infinite" }}
            />
          )}
          {submitting
            ? isEdit
              ? "Saving…"
              : "Creating…"
            : isEdit
            ? "Save Changes"
            : "Create Staff Member"}
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </button>
      </div>
    </form>
  );
}

// ── Header gradient ──────────────────────────────────────────────────────
const HEADER_TITLES: Record<ModalMode, string> = {
  add: "Add New Staff Member",
  edit: "Edit Staff Member",
  view: "Staff Member Profile",
};

// ── Main export ──────────────────────────────────────────────────────────
export default function StaffFormModal({
  mode: initialMode,
  staff,
  onClose,
  onSuccess,
}: StaffFormModalProps) {
  const [mode, setMode] = useState<ModalMode>(initialMode);

  const showGradientHeader = mode !== "view";

  return (
    <div
      className="bg-white rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden"
      style={{ maxHeight: "90vh" }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* ── Header ── */}
      {showGradientHeader ? (
        // Gradient header for Add / Edit
        <div
          style={{
            background: "linear-gradient(135deg,#4648d4,#7c3aed)",
            padding: "20px 24px 16px",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: 11,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Staff Management
            </p>
            <h3
              style={{
                color: "#fff",
                fontSize: 18,
                fontWeight: 800,
                margin: "4px 0 0",
              }}
            >
              {HEADER_TITLES[mode]}
            </h3>
            {staff?.name && mode === "edit" && (
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 4 }}>
                {staff.name}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {/* Tab switcher when viewing existing staff */}
            {mode === "edit" && staff && (
              <button
                onClick={() => setMode("view")}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                View Profile
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/20 transition-colors text-white/80 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      ) : (
        // Plain header for View
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-slate-800 text-lg">
            {HEADER_TITLES[mode]}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* ── Body ── */}
      {mode === "view" ? (
        <div className="overflow-y-auto" style={{ maxHeight: "calc(90vh - 120px)" }}>
          <ViewPanel staff={staff} onSwitchToEdit={() => setMode("edit")} />
          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        <FormPanel
          mode={mode as "add" | "edit"}
          staff={staff}
          onClose={onClose}
          onSuccess={onSuccess}
        />
      )}
    </div>
  );
}
