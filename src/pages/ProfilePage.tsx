import React, { useState, useEffect } from "react";
import api from "../lib/api";
import { Loader2 } from "lucide-react";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileTabs from "../components/Profile/ProfileTabs";
import ProfileForm from "../components/Profile/ProfileForm";
import SecurityForm from "../components/Profile/SecurityForm";
import AccountSidebar from "../components/Profile/AccountSidebar";
import Toast from "../components/Toast";

export default function ReusableProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [designations, setDesignations] = useState<any[]>([]);

  const [activeTab, setActiveTab] = useState<"profile" | "security">("profile");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Avatar file upload preview & state
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [removeAvatar, setRemoveAvatar] = useState(false);

  // Form State
  const [formData, setFormData] = useState<any>({});
  const [initialData, setInitialData] = useState<any>({});
  const [isDirty, setIsDirty] = useState(false);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Fetch current user and staff designations
  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const userRes = await api.get("/user");
      const u = userRes.data?.user;
      if (u) {
        setUser(u);
        localStorage.setItem("user", JSON.stringify(u));

        // Prepare flat form object
        const flatForm = {
          name: u.name || "",
          username: u.username || "",
          email: u.email || "",
          phone: u.phone || u.staff_profile?.phone || "",
          dob: u.dob || "",
          gender: u.gender || "",
          address: u.address || "",
          city: u.city || "",
          state: u.state || "",
          country: u.country || "",
          postal_code: u.postal_code || "",
          bio: u.bio || u.staff_profile?.bio || "",
          // Staff fields
          designation_id: u.staff_profile?.designation_id || "",
          experience_years: u.staff_profile?.experience_years ?? "",
          specialization: u.staff_profile?.specialization || "",
          license_number: u.staff_profile?.license_number || "",
          working_since: u.staff_profile?.working_since || "",
          // Customer fields
          preferred_contact_method: u.preferred_contact_method || "email",
          emergency_contact: u.emergency_contact || "",
          medical_notes: u.medical_notes || "",
          preferred_language: u.preferred_language || "English",
        };

        setFormData(flatForm);
        setInitialData(flatForm);
      }

      // Fetch designations if user is staff or admin
      if (u?.role === "staff" || u?.role === "admin") {
        try {
          const desigRes = await api.get("/staff/designations");
          setDesignations(desigRes.data?.data || desigRes.data || []);
        } catch (e) {
          // ignore designation load failure if unassigned
        }
      }
    } catch (err: any) {
      console.error("Failed to load user profile", err);
      showToast("Failed to load profile details.", "error");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchProfileData();
  }, []);

  // Track dirty changes
  useEffect(() => {
    const hasFormChanged = JSON.stringify(formData) !== JSON.stringify(initialData);
    const hasAvatarChanged = Boolean(avatarFile) || removeAvatar;
    setIsDirty(hasFormChanged || hasAvatarChanged);
  }, [formData, initialData, avatarFile, removeAvatar]);

  // Handle Form Change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  // Avatar handlers
  const handleAvatarSelect = (file: File) => {
    setAvatarFile(file);
    setRemoveAvatar(false);
    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
  };

  const handleAvatarRemove = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
    setRemoveAvatar(true);
  };

  // Profile Form Submit
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const data = new FormData();
      data.append("_method", "PUT");

      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== undefined) {
          data.append(key, formData[key]);
        }
      });

      if (avatarFile) {
        data.append("avatar", avatarFile);
      }

      if (removeAvatar) {
        data.append("remove_avatar", "1");
      }

      const res = await api.post("/user", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedUser = res.data?.user;
      if (updatedUser) {
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      setAvatarFile(null);
      setAvatarPreview(null);
      setRemoveAvatar(false);
      setInitialData(formData);
      setIsDirty(false);

      showToast("Profile updated successfully!", "success");
    } catch (err: any) {
      console.error("Update profile error", err);
      const msg = err.response?.data?.message || "Failed to update profile. Please try again.";
      showToast(msg, "error");
    } finally {
      setSaving(false);
    }
  };

  // Security Form Password Update Submit
  const handleChangePasswordSubmit = async (passwordData: any) => {
    setSaving(true);
    try {
      const res = await api.post("/change-password", passwordData);
      const updatedUser = res.data?.user;
      if (updatedUser) {
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
      showToast(res.data?.message || "Password updated successfully!", "success");
    } catch (err: any) {
      console.error("Change password error", err);
      const msg = err.response?.data?.message || "Failed to update password.";
      showToast(msg, "error");
    } finally {
      setSaving(false);
    }
  };


  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 size={36} className="animate-spin text-indigo-600 mb-3" />
        <p className="text-sm font-semibold text-slate-500">Loading your profile settings...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Modern Profile Header */}
      <ProfileHeader
        user={user}
        avatarPreview={avatarPreview}
        onAvatarSelect={handleAvatarSelect}
        onAvatarRemove={handleAvatarRemove}
      />

      {/* Tabs Bar */}
      <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Grid: Left Tab Content (2 Cols) | Right Desktop Sidebar (1 Col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2">
          {activeTab === "profile" ? (
            <ProfileForm
              user={user}
              designations={designations}
              formData={formData}
              onChange={handleChange}
              onSubmit={handleProfileSubmit}
              saving={saving}
              isDirty={isDirty}
            />
          ) : (
            <SecurityForm
              user={user}
              onChangePasswordSubmit={handleChangePasswordSubmit}
              saving={saving}
            />
          )}
        </div>

        {/* Right Desktop Account Information & Completion Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <AccountSidebar user={user} />
        </div>
      </div>
    </div>
  );
}
