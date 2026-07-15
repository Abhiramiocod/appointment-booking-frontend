import { useState } from "react";
import api from "../../lib/api";
import Header from "../../components/Staff/ChangePassword/Header";
import Form from "../../components/Staff/ChangePassword/Form";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
  
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (newPassword !== newPasswordConfirmation) {
      setError("New passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.put("/staff/change-password", {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: newPasswordConfirmation,
      });

      setSuccess(response.data.message || "Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setNewPasswordConfirmation("");
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message || 
        "Failed to update password. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "28px 32px", flex: 1, maxWidth: 600 }}>
      {/* Header */}
      <Header />

      {/* Main card */}
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
          currentPassword={currentPassword}
          setCurrentPassword={setCurrentPassword}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          newPasswordConfirmation={newPasswordConfirmation}
          setNewPasswordConfirmation={setNewPasswordConfirmation}
          showCurrent={showCurrent}
          setShowCurrent={setShowCurrent}
          showNew={showNew}
          setShowNew={setShowNew}
          showConfirm={showConfirm}
          setShowConfirm={setShowConfirm}
          loading={loading}
        />
      </div>
    </div>
  );
}
