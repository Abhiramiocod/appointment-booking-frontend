import { useState, useEffect } from "react";
import api from "../../lib/api";
import { Loader2 } from "lucide-react";
import Header from "../../components/Staff/Profile/Header";
import UserAccountCard from "../../components/Staff/Profile/UserAccountCard";
import Form from "../../components/Staff/Profile/Form";

export default function Profile() {
  const userString = localStorage.getItem("user");
  const localUser = userString ? JSON.parse(userString) : null;

  const [phone, setPhone] = useState("");
  const [experienceYears, setExperienceYears] = useState<number | "">("");
  const [bio, setBio] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/staff/profile");
      const data = response.data?.data;
      if (data) {
        setPhone(data.phone || "");
        setExperienceYears(
          data.experience_years !== undefined ? data.experience_years : "",
        );
        setBio(data.bio || "");
      }
    } catch (err: any) {
      console.error("Fetch profile failed", err);
      // If 404, we can ignore since staff profile might not have been created yet
      if (err.response?.status !== 404) {
        setError("Failed to load profile details.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSaving(true);

    try {
      await api.put("/staff/profile", {
        phone,
        experience_years: experienceYears === "" ? 0 : Number(experienceYears),
        bio,
      });

      setSuccess("Profile updated successfully!");
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Failed to update profile. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ padding: "28px 32px", flex: 1, maxWidth: 700 }}>
      {/* Header */}
      <Header />

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 size={32} className="animate-spin text-indigo-600" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* User account card (Read-only) */}
          <UserAccountCard localUser={localUser} />

          {/* Edit form */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                ⚠️ {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-lg">
                ✅ {success}
              </div>
            )}

            <Form
              handleSubmit={handleSubmit}
              phone={phone}
              setPhone={setPhone}
              experienceYears={experienceYears}
              setExperienceYears={setExperienceYears}
              bio={bio}
              setBio={setBio}
              saving={saving}
            />
          </div>
        </div>
      )}
    </div>
  );
}
