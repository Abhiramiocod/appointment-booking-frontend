import React from "react";
import { User, Mail, Phone, Calendar, MapPin, Globe, Award, Briefcase, FileText, HeartPulse } from "lucide-react";

interface ProfileFormProps {
  user: any;
  designations: any[];
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  saving: boolean;
  isDirty: boolean;
}

export default function ProfileForm({
  user,
  designations,
  formData,
  onChange,
  onSubmit,
  saving,
  isDirty,
}: ProfileFormProps) {
  const role = user?.role ? user.role.toLowerCase() : "customer";
  const provider = user?.provider ? user.provider.toLowerCase() : "local";
  const isSocialUser = provider === "google" || provider === "microsoft";

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* 1. Basic Information Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
            <User size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Basic Information</h3>
            <p className="text-xs text-slate-500">Personal details and identification.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm text-slate-800 transition-all"
              placeholder="e.g. Jane Doe"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Username *
            </label>
            <input
              type="text"
              name="username"
              required
              value={formData.username || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm text-slate-800 transition-all"
              placeholder="e.g. janedoe"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              readOnly={isSocialUser}
              disabled={isSocialUser}
              value={formData.email || ""}
              onChange={onChange}
              className={`w-full px-4 py-3 rounded-xl border text-sm transition-all ${
                isSocialUser
                  ? "bg-slate-100 border-slate-200 text-slate-500 cursor-not-allowed"
                  : "border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-800"
              }`}
            />
            {isSocialUser && (
              <p className="text-[11px] text-slate-400 mt-1.5 font-medium">
                Managed by {provider === "google" ? "Google" : "Microsoft"} Account
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm text-slate-800 transition-all"
              placeholder="+1 (555) 000-0000"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm text-slate-800 transition-all"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm text-slate-800 transition-all"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Bio / About You
          </label>
          <textarea
            name="bio"
            rows={3}
            value={formData.bio || ""}
            onChange={onChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm text-slate-800 transition-all resize-none"
            placeholder="Write a brief description about yourself..."
          />
        </div>
      </div>

      {/* 2. Address & Location Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
            <MapPin size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Address & Location</h3>
            <p className="text-xs text-slate-500">Contact and mailing address.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Street Address */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Street Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm text-slate-800 transition-all"
              placeholder="e.g. 123 Innovation Way, Suite 400"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm text-slate-800 transition-all"
              placeholder="e.g. San Francisco"
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              State / Province
            </label>
            <input
              type="text"
              name="state"
              value={formData.state || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm text-slate-800 transition-all"
              placeholder="e.g. California"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={formData.country || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm text-slate-800 transition-all"
              placeholder="e.g. United States"
            />
          </div>

          {/* Postal Code */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Postal / Zip Code
            </label>
            <input
              type="text"
              name="postal_code"
              value={formData.postal_code || ""}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm text-slate-800 transition-all"
              placeholder="e.g. 94107"
            />
          </div>
        </div>
      </div>

      {/* 3. STAFF Specific Section */}
      {role === "staff" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <Briefcase size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Staff Professional Information</h3>
              <p className="text-xs text-slate-500">Designation, credentials, and work history.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Designation */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Designation / Title
              </label>
              <select
                name="designation_id"
                value={formData.designation_id || ""}
                onChange={onChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm text-slate-800 transition-all"
              >
                <option value="">Select Designation</option>
                {designations.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Experience Years */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Years of Experience
              </label>
              <input
                type="number"
                name="experience_years"
                min="0"
                value={formData.experience_years ?? ""}
                onChange={onChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm text-slate-800 transition-all"
                placeholder="e.g. 5"
              />
            </div>

            {/* Specialization */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Specialization
              </label>
              <input
                type="text"
                name="specialization"
                value={formData.specialization || ""}
                onChange={onChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm text-slate-800 transition-all"
                placeholder="e.g. Dermatology, Hair Styling"
              />
            </div>

            {/* License Number */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                License Number (Optional)
              </label>
              <input
                type="text"
                name="license_number"
                value={formData.license_number || ""}
                onChange={onChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm text-slate-800 transition-all"
                placeholder="e.g. LIC-994820"
              />
            </div>

            {/* Working Since */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Working Since
              </label>
              <input
                type="date"
                name="working_since"
                value={formData.working_since || ""}
                onChange={onChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm text-slate-800 transition-all"
              />
            </div>
          </div>
        </div>
      )}

      {/* 4. CUSTOMER Specific Section */}
      {role === "customer" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
              <HeartPulse size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Preferences & Medical Context</h3>
              <p className="text-xs text-slate-500">Customize your service experience and contact preferences.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Preferred Contact Method */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Preferred Contact Method
              </label>
              <select
                name="preferred_contact_method"
                value={formData.preferred_contact_method || "email"}
                onChange={onChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm text-slate-800 transition-all"
              >
                <option value="email">Email</option>
                <option value="sms">SMS / Phone</option>
                <option value="whatsapp">WhatsApp</option>
              </select>
            </div>

            {/* Preferred Language */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Preferred Language
              </label>
              <input
                type="text"
                name="preferred_language"
                value={formData.preferred_language || "English"}
                onChange={onChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm text-slate-800 transition-all"
                placeholder="e.g. English, Spanish"
              />
            </div>

            {/* Emergency Contact */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Emergency Contact
              </label>
              <input
                type="text"
                name="emergency_contact"
                value={formData.emergency_contact || ""}
                onChange={onChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm text-slate-800 transition-all"
                placeholder="Name & Phone Number (e.g. John Doe - +1 555 123 456)"
              />
            </div>

            {/* Medical Notes */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Medical Notes / Allergies (Optional)
              </label>
              <textarea
                name="medical_notes"
                rows={3}
                value={formData.medical_notes || ""}
                onChange={onChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm text-slate-800 transition-all resize-none"
                placeholder="Mention any allergies, health conditions, or preferences for your appointments..."
              />
            </div>
          </div>
        </div>
      )}

      {/* Save Action Bar */}
      <div className="sticky bottom-6 z-20 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200 p-4 shadow-lg flex items-center justify-between gap-4">
        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          {isDirty ? "⚠️ You have unsaved changes." : "All changes saved."}
        </span>
        <button
          type="submit"
          disabled={!isDirty || saving}
          className="w-full sm:w-auto px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-sm transition-all shadow-md disabled:opacity-40 disabled:shadow-none cursor-pointer flex items-center justify-center gap-2"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
