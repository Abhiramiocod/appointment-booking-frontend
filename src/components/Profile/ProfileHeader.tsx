import { useRef } from "react";
import { Camera, Trash2, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import googleLogo from "../../assets/images/google.webp";
import microsoftLogo from "../../assets/images/microsoftlogo.png";

interface ProfileHeaderProps {
  user: any;
  avatarPreview: string | null;
  onAvatarSelect: (file: File) => void;
  onAvatarRemove: () => void;
}

export default function ProfileHeader({
  user,
  avatarPreview,
  onAvatarSelect,
  onAvatarRemove,
}: ProfileHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const role = user?.role ? user.role.toLowerCase() : "customer";
  const provider = user?.provider ? user.provider.toLowerCase() : "local";
  const isVerified = Boolean(user?.email_verified_at);

  const rawAvatar = avatarPreview || user?.image;
  const getImageUrl = (img: string | null | undefined) => {
    if (!img) return null;
    if (img.startsWith("blob:") || img.startsWith("http://") || img.startsWith("https://")) {
      return img;
    }
    const backendUrl = import.meta.env.VITE_API_BASE_URL?.replace("/api", "");
    return `${backendUrl}/storage/${img}`;
  };

  const displayAvatar = getImageUrl(rawAvatar);

  // Role Badge Styling
  const roleBadgeConfig: Record<string, { label: string; bg: string; text: string; border: string }> = {
    admin: { label: "Admin", bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
    staff: { label: "Staff", bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
    customer: { label: "Customer", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  };

  const currentRoleBadge = roleBadgeConfig[role] || roleBadgeConfig.customer;

  // Member Since
  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })
    : "Recently";

  return (
    <div className="relative overflow-hidden bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 mb-8 transition-all">
      {/* Subtle Background Accent Gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
        {/* Avatar Uploader */}
        <div className="relative group shrink-0">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden bg-slate-100 border-4 border-white shadow-md flex items-center justify-center text-slate-700 font-bold text-3xl transition-transform duration-300 group-hover:scale-[1.02]">
            {displayAvatar ? (
              <img
                src={displayAvatar}
                alt={user?.name || "User Avatar"}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.warn("ProfileHeader avatar image failed to load:", displayAvatar);
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white flex items-center justify-center text-4xl font-semibold uppercase tracking-wider">
                {user?.name ? user.name.charAt(0) : "U"}
              </div>
            )}
          </div>

          {/* Hover Overlay Buttons */}
          <div className="absolute inset-0 bg-slate-900/60 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center gap-2 backdrop-blur-[2px]">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2.5 rounded-full bg-white/90 text-slate-800 hover:bg-white hover:scale-110 transition-all shadow-sm cursor-pointer"
              title="Change Photo"
            >
              <Camera size={18} />
            </button>
            {displayAvatar && (
              <button
                type="button"
                onClick={onAvatarRemove}
                className="p-2.5 rounded-full bg-rose-500/90 text-white hover:bg-rose-600 hover:scale-110 transition-all shadow-sm cursor-pointer"
                title="Remove Photo"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                onAvatarSelect(e.target.files[0]);
              }
            }}
          />
        </div>

        {/* User Details */}
        <div className="flex-1 text-center md:text-left space-y-3">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {user?.name || "Account User"}
            </h1>
            {/* Role Badge */}
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${currentRoleBadge.bg} ${currentRoleBadge.text} ${currentRoleBadge.border}`}
            >
              <Sparkles size={12} className="mr-1.5 opacity-70" />
              {currentRoleBadge.label}
            </span>
          </div>

          <p className="text-sm text-slate-500 font-medium">
            @{user?.username || "username"} &bull; {user?.email}
          </p>

          {/* Badges Bar */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1">
            {/* Provider Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-700 shadow-2xs">
              {provider === "google" && (
                <>
                  <img src={googleLogo} alt="Google" className="w-3.5 h-3.5" />
                  <span>Google Account</span>
                </>
              )}
              {provider === "microsoft" && (
                <>
                  <img src={microsoftLogo} alt="Microsoft" className="w-3.5 h-3.5" />
                  <span>Microsoft Account</span>
                </>
              )}
              {provider === "local" && (
                <>
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span>Local Account</span>
                </>
              )}
            </div>

            {/* Email Verification Status Badge */}
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium border ${
                isVerified
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200/80"
                  : "bg-amber-50 text-amber-700 border-amber-200/80"
              }`}
            >
              {isVerified ? (
                <>
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  <span>Email Verified</span>
                </>
              ) : (
                <>
                  <AlertCircle size={13} className="text-amber-600" />
                  <span>Unverified Email</span>
                </>
              )}
            </div>

            {/* Member Since Badge */}
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-500">
              <span>Member since {memberSince}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
